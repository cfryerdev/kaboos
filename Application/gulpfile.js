/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    merge = require('merge-stream'),
    minify = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps');

// Define the paths
var paths = {
  appJs: [
      'website/scripts/app.js',
      'website/scripts/app.routes.js',
      'website/scripts/app.modules.js',
      'website/scripts/Shared/**/*.js',
      'website/scripts/Components/**/*.js'
  ],
  appCss: [
      'website/content/**/*.css',
      'website/content/style/main.css'
  ],
  buildDest: "website/_build",
  concatJsName: "kaboos.scripts.js",
  concatCssName: "kaboos.styles.css"
};

// Clean the directory
gulp.task("clean:all", function (cb) {
    console.log('  -- Executing Clean.');
    rimraf(paths.buildDest, cb);
});

// Minify the js libs
gulp.task("min:js", function () {
    console.log('  -- Executing JS Minification.');
    return gulp.src(paths.appJs)
        .pipe(concat(paths.concatJsName))
        // .pipe(gulp.dest('website/dest'))
        // .pipe(uglify())
        .pipe(gulp.dest(paths.buildDest));
});

// Minify the js libs
gulp.task("min:css", function () {
    console.log('  -- Executing CSS Minification.');
    return gulp.src(paths.appCss)
        .pipe(concat(paths.concatCssName))
        .pipe(minify())
        .pipe(gulp.dest(paths.buildDest));
});

// Watch the js files
// gulp.task('watch:js', function() {
//     gulp.watch(paths.appJs, ['js']);
// });

// Simplify the tasks
gulp.task("default", ["clean:all", "min:js", "min:css"]);
