const {src, dest, series, parallel, watch} = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))
const del = require('del')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

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
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename('styles.css'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
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

const removeJsFolder = () => {
  return del('dist/js')
}

const styles = () => {
  return src('src/static/css/**/*.css')
    .pipe(dest('dist/css/'))
}

const removeStyles = () => {
  return del('dist/css')
}

const removeFontsFolder = () => {
  return del('dist/fonts')
}

const fonts = () => {
  return src('src/static/fonts/**/*.*')
    .pipe(dest('dist/fonts'))
}

const images = () => {
  return src('src/static/img/**/*.*')
    .pipe(dest('dist/img'))
}

const serve = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })

  watch('src/static/scss/*.scss', convertScssToCss)
  watch('src/static/js/libs/**/*.js', series(removeJsFolder, parallel(concatLibsScripts, scripts)))
  watch('src/static/css/**/*.css', series(removeStyles, parallel(styles, convertScssToCss)))
  watch('src/static/js/*.js', scripts)
  watch('src/static/fonts/**/*.*', series(removeFontsFolder, fonts))
  watch('src/static/img/*.*', images)
  watch('src/pug/*.pug').on('change', series(convertPugToHtml, browserSync.reload))
}

exports.default = series(
  removeDistFolder,
  convertPugToHtml,
  parallel(fonts, convertScssToCss, scripts, concatLibsScripts),
  parallel(images),
  serve
)