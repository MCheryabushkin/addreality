'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    cru = require('gulp-css-rework-url'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    modifyCssUrls = require('gulp-modify-css-urls'),
    path = require('path'),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    mainBowerFiles = require('main-bower-files'),
    browserSync = require('browser-sync').create(),
    browserSyncReload = browserSync.reload,
    rename = require("gulp-rename");

var custom_path = {
    src: {
        style: 'css/src/style.scss',
        js: 'js/src/scripts.js'
    },
    build: {
        js: 'js/',
        style: 'css/'
    },
    watch: {
        style: 'css/src/**/*.scss',
        js: 'js/src/**/*.js'
    },
    root: {
        src: '/'
    }
};


gulp.task('style:build', function () {
    gulp.src(custom_path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(custom_path.build.style));

});


gulp.task('js:build', function () {
    gulp.src(custom_path.src.js) //Найдем наш main файл
        .pipe(plumber())
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(custom_path.build.js)) //Выплюнем готовый файл в build
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write('.')) //Пропишем карты
        .pipe(gulp.dest(custom_path.build.js)) //Выплюнем готовый файл в build


});


gulp.task('watch', function () {
    gulp.watch([custom_path.watch.js], ['js:build']).on('change', browserSyncReload);
    gulp.watch([custom_path.watch.style], ['style:build']).on('change', browserSyncReload);
});



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on("change", browserSyncReload);
    gulp.watch("*.css").on("change", browserSyncReload);
});

gulp.task('default', ['watch', 'browser-sync']);