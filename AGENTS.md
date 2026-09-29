# Repository Guidelines

## Project Structure

- `src/manifest/manifest.json` is the Chrome Manifest V3 manifest.
- `src/ts/` contains the TypeScript counter app, organized by `core`, `model`, `view`, `template`, and `controller`.
- `src/html/`, `src/css/`, and `src/img/` contain the popup page, plain CSS, and icons.
- `scripts/build.js` compiles TypeScript and copies the app assets into `dest/`. Treat `dest/` as generated output; edit files under `src/` instead.
- There is currently no test directory or test framework.

## Build and Development

Use Node.js 20 or newer.

```sh
npm install       # install the TypeScript compiler
npm run build     # create the unpacked extension in dest/
npm run watch     # rebuild when source files change
```

For a browser smoke check, load `dest/` as an unpacked extension from `chrome://extensions`.

## Coding Style

Use four spaces for indentation in TypeScript, JavaScript, JSON, and CSS. Keep TypeScript files grouped by role and use descriptive lower camel case names, such as `counterController.ts`. The app uses global namespaces and classic scripts. If adding a TypeScript file, update the ordered script references in `src/html/index.html` so its dependencies load before its consumers. Keep styles as plain CSS; no CSS preprocessor is configured.

Keep the manifest on version 3. Add Chrome permissions only when the feature requires them. Extension scripts and styles should remain local to the package.

## Testing

No automated test command is configured. Run `npm run build` for compiler and packaging validation. For UI or behavior changes, also load the generated extension in Chrome and exercise the affected popup flow.

## Commits and Pull Requests

Recent commit subjects are short and action-oriented, often written in Japanese (for example, `READMEを更新する`). Keep changes focused and use a concise imperative subject. Pull requests should describe the user-visible change, link a related issue when one exists, include screenshots for popup UI changes, and report the build or browser checks performed.
