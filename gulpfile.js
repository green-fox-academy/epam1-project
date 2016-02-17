'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var jasmine = require('gulp-jasmine');
var sass = require('gulp-sass');
var jscs = require('gulp-jscs');
var Server = require('karma').Server;

var sourceFiles = [
  './public/*.js',
  './server/*.js',
  './spec/backendSpec/*.js',
  './spec/frontendSpec/*.js',
];

gulp.task('default', function () {
  console.log('Watching files for changes... It is running, dont worry mate!');
  watch(sourceFiles,
      batch(function (events, done) {
    gulp.start('lint', done);
    gulp.start('jscsLint', done);
  }));
});

gulp.task('lint', function () {
  return gulp.src(sourceFiles)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscsLint', function () {
  return gulp.src(sourceFiles)
  .pipe(jscs())
  .pipe(jscs.reporter());
});

gulp.task('backendTest', function () {
  return gulp.src('spec/backendSpec/*.js')
    .pipe(jasmine());
});

gulp.task('frontendTest', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  }, done).start();
});

gulp.task('sass', function () {
  return gulp.src('./public/style/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/style/.css'));
});

gulp.task('sass:watch', function () {
  console.log('i am watching your sass beach');
  gulp.watch('./public/style/*.scss', ['sass']);
});
