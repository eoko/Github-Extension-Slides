'use strict';

var gulp = require('gulp'),
  connect = require('gulp-connect'),
  bowerFiles = require('main-bower-files'),
  inject = require('gulp-inject'),
  es = require('event-stream'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  del = require('del');

gulp.task('clean', function() {
  return del(['build/**/*'])
});

gulp.task('connect', function() {
  connect.server({
    root: './build',
    livereload: true,
    port: 8888
  });
});

gulp.task('build_html', ['build_bower', 'build_js', 'build_scss', 'build_img'], function () {
  return gulp.src('./src/index.html')
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
    .pipe(inject(es.merge(
      gulp.src('./build/css/**/*.css'),
      gulp.src('./build/js/**/*.js')
    ), {ignorePath: 'build'}))
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

gulp.task('build_js', function () {
  return gulp.src(['./src/js/**/*.js'])
    .pipe(gulp.dest('./build/js'));
});

gulp.task('build_img', function () {
  return gulp.src(['./src/img/**/*'])
    .pipe(gulp.dest('./build/img'));
});

gulp.task('build_scss', function () {
  return gulp.src(['./src/scss/**/*.scss'])
    .pipe(sass({includePaths: ['./public/css']}).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
});

gulp.task('build_bower', function () {
  return gulp.src(['bower_components/**/*'])
    .pipe(gulp.dest('./build/bower_components/.'))
});

gulp.task('watch', ['build', 'connect'], function (cb) {
  watch('src/**/*', function () {
    gulp.start('build', cb)
  });
});

gulp.task('build', ['clean'], function() {
  gulp.start('build_html');
});

gulp.task('default', function() {
  gulp.start('watch');
});