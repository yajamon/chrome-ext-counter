"use strict";

const fs = require("node:fs/promises");
const { watch } = require("node:fs");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "src");
const destination = path.join(root, "dest");

function validateManifest(manifest) {
    if (manifest.manifest_version !== 3) {
        throw new Error("src/manifest/manifest.json must use Manifest V3.");
    }
    if ("browser_action" in manifest || "page_action" in manifest) {
        throw new Error("Manifest V2 action keys are not supported.");
    }
    if (!manifest.action || !manifest.action.default_popup) {
        throw new Error("The Manifest V3 action must define a default_popup.");
    }
}

function compileTypeScript() {
    const compilerPath = path.join(root, "node_modules", "typescript", "bin", "tsc");
    const result = spawnSync(process.execPath, [compilerPath, "--project", path.join(source, "tsconfig.json")], {
        cwd: root,
        stdio: "inherit",
    });
    if (result.error) {
        throw result.error;
    }
    if (result.status !== 0) {
        throw new Error("TypeScript compilation failed.");
    }
}

async function build() {
    const manifestPath = path.join(source, "manifest", "manifest.json");
    const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
    validateManifest(manifest);

    await fs.mkdir(destination, { recursive: true });

    await Promise.all([
        compileTypeScript(),
        fs.cp(path.join(source, "html"), path.join(destination, "html"), { recursive: true }),
        fs.cp(path.join(source, "css"), path.join(destination, "css"), { recursive: true }),
        fs.cp(path.join(source, "img"), path.join(destination, "img"), { recursive: true }),
        fs.copyFile(manifestPath, path.join(destination, "manifest.json")),
    ]);

    const popupPath = path.join(destination, manifest.action.default_popup);
    await fs.access(popupPath);
    const popupHtml = await fs.readFile(popupPath, "utf8");
    const popupResources = [...popupHtml.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/g)];
    if (popupResources.length === 0) {
        throw new Error("The popup must reference its local scripts and stylesheet.");
    }
    for (const [, resourcePath] of popupResources) {
        await fs.access(path.resolve(path.dirname(popupPath), resourcePath));
    }

    for (const iconPath of Object.values(manifest.icons || {})) {
        await fs.access(path.join(destination, iconPath));
    }
    const actionIcons = manifest.action.default_icon;
    for (const iconPath of (typeof actionIcons === "string" ? [actionIcons] : Object.values(actionIcons || {}))) {
        await fs.access(path.join(destination, iconPath));
    }

    process.stdout.write("Built Manifest V3 extension in dest/.\n");
}

async function main() {
    await build();
    if (!process.argv.includes("--watch")) {
        return;
    }

    let timer;
    let building = false;
    let queued = false;
    const rebuild = async () => {
        if (building) {
            queued = true;
            return;
        }
        building = true;
        do {
            queued = false;
            try {
                await build();
            } catch (error) {
                process.stderr.write(`${error.stack || error}\n`);
            }
        } while (queued);
        building = false;
    };

    const watcher = watch(source, { recursive: true }, () => {
        clearTimeout(timer);
        timer = setTimeout(rebuild, 150);
    });
    watcher.on("error", (error) => {
        process.stderr.write(`Source watcher failed: ${error.message}\n`);
        process.exitCode = 1;
    });
    process.stdout.write("Watching src/ for changes. Press Ctrl+C to stop.\n");
}

main().catch((error) => {
    process.stderr.write(`${error.stack || error}\n`);
    process.exitCode = 1;
});
