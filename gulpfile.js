'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
 
var ejs = require("gulp-ejs")
sass.compiler = require('node-sass');
var concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

function makeCss(){
  return gulp.src(['./src/partials/base.scss','./src/**/*.scss'])
    .pipe(concat('style.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./www/css'));
}

function makePage(){
  return gulp.src("./src/pages/*.html")
    .pipe(ejs())
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