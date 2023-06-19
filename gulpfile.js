const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

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

    gulp.watch('src/scss/*.scss', gulp.series('sass'));
    gulp.watch('dist/*.html').on('change', browserSync.reload);
  })
);

gulp.task('default', gulp.series('serve'));
