const { src, dest, series, parallel, watch } = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass')(require('sass')),
  del = require('del')
  concat = require('gulp-concat')

const convertPugToHtml = () => {
  return src('src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('dist'))
}

const convertScssToCss = () => {
  return src('src/static/scss/modules.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'))
}

const removeDistFolder = () => {
  return del('dist')
}

// we can set manual sequence
const concatLibsScripts = () => {
  return src('src/static/js/libs/**/*.js')
    .pipe(concat('libs.js'))
    .pipe(dest('dist/js/libs'))
}

const scripts = () => {
  return src(['src/static/js/main.js'])
    .pipe(concat('scripts.js'))
    .pipe(dest('dist/js'))
}

exports.default = scripts