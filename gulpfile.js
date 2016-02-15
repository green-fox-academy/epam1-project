'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var jasmine = require('gulp-jasmine');
var sass = require('gulp-sass');
var Server = require('karma').Server;

gulp.task('default', function () {
  console.log('Watching files for changes... It is running, dont worry mate!');
  watch([
    './public/*.js',
    './server/*.js',
    './spec/backendSpec/*.js',
    './spec/frontendSpec/*.js'],
      batch(function (events, done) {
    gulp.start('lint', done);
    gulp.start('test', done);
  }));
});

gulp.task('lint', function () {
  return gulp.src([
    './public/*.js',
    './server/*.js',
    './spec/backendSpec/*.js',
    './spec/frontendSpec/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('backendTest', function() {
  return gulp.src('spec/backendSpec/*.js')
    .pipe(jasmine());
});

gulp.task('frontendTest', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('sass', function () {
  return gulp.src('./public/style/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/style/.css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
