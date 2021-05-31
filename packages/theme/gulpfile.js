'use strict';

// CSS编译
const { series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

//css
function compile() {
    return src(['./super/*.scss', './src/*.scss', './src/index.scss'])
        .pipe(sass.sync())
        .pipe(autoprefixer({
            browsers: ['ie > 9', 'last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(dest('./css'));
}

//字体
function copyfont() {
    return src(['./super/fonts/**', './src/fonts/**'])
        .pipe(cssmin())
        .pipe(dest('./css/fonts'));
}

exports.build = series(compile, copyfont);