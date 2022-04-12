const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
var gcmq = require('gulp-group-css-media-queries');

const rename = require("gulp-rename");
const concat = require('gulp-concat');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const uglify = require('gulp-uglify');

const imagemin = require('gulp-imagemin');

const browserSync = require('browser-sync').create();

const path = {
    src: {
        styles: './src/styles/**/*.scss',
        scripts: './src/scripts/**/*.js',
        images: './src/images/**/*'
    },
    dist: {
        styles: './',
        scripts: './',
        images: './images/'
    }
};


function buildStyles() {
    return gulp.src(path.src.styles)
        .pipe(concat('style.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.styles));
};

function buildScripts() {
    return gulp.src(path.src.scripts)
        .pipe(concat('script.js'))
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.scripts));
}

function buildImages() {
    return gulp.src(path.src.images)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(path.dist.images));
}

function watchChanges() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(path.src.styles, {
            usePolling: true
        },
        function (done) {
            buildStyles();
            browserSync.reload();
            done();
        });

    gulp.watch(path.src.scripts, {
            usePolling: true
        },
        function (done) {
            buildScripts();
            browserSync.reload();
            done();
        });
    gulp.watch(path.src.images, {
            usePolling: true
        },
        function (done) {
            buildImages();
            browserSync.reload();
            done();
        });
}

function browserSyncStart() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}



exports.buildStyles = buildStyles;
exports.buildScripts = buildScripts;
exports.buildImages = buildImages;
exports.watch = watchChanges;

exports.default = watchChanges;
