const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('handlebars', function () {
  options = {
    batch: ['./src/components'],
  };

  return gulp
    .src('src/templates/*.hbs')
    .pipe(handlebars(null, options))
    .pipe(
      rename(function (path) {
        path.extname = '.html';
      })
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp
    .src('src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task(
  'serve',
  gulp.series('sass', function () {
    browserSync.init({
      server: './dist/',
    });

    gulp.watch(['src/scss/*.scss', 'src/components/*.scss'], gulp.series('sass'));
    gulp.watch(['src/components/*.hbs', 'src/templates/*.hbs'], gulp.series('handlebars'));
    gulp.watch('dist/*.html').on('change', browserSync.reload);
  })
);

gulp.task('default', gulp.series('serve'));
