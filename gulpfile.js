/**
 * @file gulpfile.js
 * @author Will Steinmetz
 * This file runs the gulp tasks for the jQuery notific8 plug-in.
 */

// require modules
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

// styles task
gulp.task('styles', function () {
    return gulp.src('src/sass/jquery.notific8.scss')
        .pipe(sass({
            style: 'expanded',
            loadPath: [__dirname + '/src/sass']
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('src/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});

// scripts task
gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// clean up task
gulp.task('clean', function () {
    return gulp.src(['dist', 'src/css'], {read: false})
        .pipe(clean());
});

// cleanup task
gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts');
});

// watch task
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('src/sass/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);
});