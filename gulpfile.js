const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create()

gulp.task('serve', () => {
  browserSync.init({ 
  server: {
    index: 'index.html'
  }
});
gulp.watch('scss/**/*.scss',['sass'])
gulp.watch('.scss/*').on('change', browserSync.reload)
});

gulp.task('sass',()=>{
return gulp.src('scss/styles.scss')
.pipe(sass())
.pipe(gulp.dest('css'))
.pipe(browserSync.stream());
});

gulp.task('default', ['serve','sass'])