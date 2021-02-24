'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
 
var ejs = require("gulp-ejs")
sass.compiler = require('node-sass');
var concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

function makeCss(){
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./www/css'));
}

function makePage(){
  return gulp.src("./src/pages/*.html")
    .pipe(ejs({
        msg: "Hello Gulp!"
    }))
    .pipe(gulp.dest("./www"));
}

function watch() {

  browserSync.init({
      server: "./www"
  });

  gulp.watch("./src/**/*.html", makePage);
  gulp.watch('./src/**/*.scss', makeCss);
  gulp.watch("./www").on('change', browserSync.reload);
}

// module.exports.makeCss = makeCss;
module.exports.watch = watch;