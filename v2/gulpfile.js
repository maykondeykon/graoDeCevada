const gulp = require('gulp');
const gulpimagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const rewriteImagePath = require('gulp-rewrite-image-path');
const replace = require('gulp-string-replace');
const cleanCSS = require('gulp-clean-css');
const jshint = require('gulp-jshint');
const csslint = require('gulp-csslint');

gulp.task('default', ['clean',], function () {
    gulp.start('copy','copy-fonts','copy-img', 'build-img', 'merge-css', 'merge-js', 'html-replace', 'replace-img');
});

gulp.task('copy', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-fonts', function () {
    return gulp.src('../fonts/**/*')
        .pipe(gulp.dest('dist/js/fonts'));
});

gulp.task('copy-img', function () {
    return gulp.src('../img/**/*')
        .pipe(gulp.dest('dist/js/img'));
});

gulp.task('build-img', function () {
    gulp.src('../img/**/*')
        .pipe(gulpimagemin())
        .pipe(gulp.dest('dist/imagens'));
});

gulp.task('replace-img', function () {
    gulp.src('/*.html')
        .pipe(replace('../img', 'imagens'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('merge-css', function () {
    gulp.src(['../font-awesome-4.7.0/css/font-awesome.min.css',
        '../bootstrap-3.3.7/css/bootstrap.min.css', '../css/style_v2.css'])
        .pipe(concat('site.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('merge-js', function () {
    gulp.src(['../js/jquery-min.js', '../js/tether.min.js',
        '../bootstrap-3.3.7/js/bootstrap.min.js', '../js/scripts.js'])
        .pipe(concat('site.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html-replace', function () {
    gulp.src('*.html')
        .pipe(htmlReplace({ css: 'css/site.css', js: 'js/site.js' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('rewriteImagePath', function () {
    gulp.src('dist/**/*.html')
        .pipe(rewriteImagePath({ path: 'imagens' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('merge-css', function () {
    gulp.src(['../font-awesome-4.7.0/css/font-awesome.min.css',
        '../bootstrap-3.3.7/css/bootstrap.min.css', '../css/style_v2.css'])
        .pipe(concat('site.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('jshint',function(){
    return gulp.src('../js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('csslint', function(){
    gulp.src(['../font-awesome-4.7.0/css/font-awesome.min.css',
        '../bootstrap-3.3.7/css/bootstrap.min.css', '../css/style_v2.css'])
        .pipe(csslint())
        .pipe(csslint.formatter());
});