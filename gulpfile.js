const gulp = require('gulp'),
  fs = require('fs'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  sassGlob = require('gulp-sass-glob'),
  sourcemaps = require('gulp-sourcemaps'),
  csso = require('gulp-csso'),
  autoprefixer = require('gulp-autoprefixer'),
  cssunit = require('gulp-css-unit');

// server
gulp.task('server', function() {
  browserSync.init({
    open: false,
    notify: false,
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('sass', () => {
  return gulp
    .src('./src/styles/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 version'],
        cascade: false
      })
    )
    .pipe(
      cssunit({
        type: 'px-to-rem',
        rootSize: 16
      })
    )
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(reload({ stream: true }));
});

gulp.task('html', () => {
  // let locals = require('./content.json');

  gulp
    .src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'html', 'server', 'watch']);
