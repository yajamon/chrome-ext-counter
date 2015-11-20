/// <reference path="typings/gulp/gulp.d.ts" />
/// <reference path="typings/gulp-typescript/gulp-typescript.d.ts" />
/// <reference path="typings/gulp-less/gulp-less.d.ts" />

var gulp = require('gulp');
var ts  = require('gulp-typescript');
var less = require('gulp-less');

// config

var path = {
    src : {
        html: "src/html/**/*.html",
        ts: "src/ts/**/*.ts",
        less: "src/less/**/*.less",
        img: "src/img/**/*.*",
        manifest:"src/manifest/manifest.json",
        vendor: {
            jquery: "node_modules/jquery/dist/jquery.min.js",
        },
    },
    dest : {
        html: "dest/html/",
        js: "dest/js/",
        css: "dest/css/",
        img: "dest/img/",
        root: "dest/",
        vendor: {
            root: "dest/vendor/",
            jquery: "dest/vendor/jquery/",
        },
    }
};

var tsProject = ts.createProject('src/tsconfig.json', {out: "app.js"});

// main tasks

gulp.task('build', [
    'build:html',
    'build:ts',
    'build:less',
    'build:img',
    'build:manifest',
    'build:vendor'
]);

gulp.task('watch', [
    'watch:html',
    'watch:ts',
    'watch:less',
    'watch:img',
    'watch:manifest'
]);

// sub tasks

gulp.task('build:html', function(){
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dest.html));
});

gulp.task('build:ts', function(){
    var tsResult = gulp.src(path.src.ts)
        .pipe(ts(tsProject));
    
    tsResult.js.pipe(gulp.dest(path.dest.js));
});

gulp.task('build:less', function(){
    gulp.src(path.src.less)
        .pipe(less())
        .pipe(gulp.dest(path.dest.css));
});

gulp.task('build:img', function(){
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dest.img));
});

gulp.task('build:manifest', function () {
    gulp.src(path.src.manifest)
        .pipe(gulp.dest(path.dest.root));
});

gulp.task('build:vendor', function (){
    gulp.src(path.src.vendor.jquery)
        .pipe(gulp.dest(path.dest.vendor.jquery));
});

gulp.task('watch:html', function(){
    gulp.watch(path.src.html, ['build:html']);
});

gulp.task('watch:ts', function(){
    gulp.watch(path.src.ts, ['build:ts']);
});

gulp.task('watch:less', function(){
    gulp.watch(path.src.less, ['build:less']);
});

gulp.task('watch:img', function(){
    gulp.watch(path.src.img, ['build:img']);
});

gulp.task('watch:manifest', function(){
    gulp.watch(path.src.manifest, ['build:manifest']);
});
