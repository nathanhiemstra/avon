var gulp =          require('gulp');
var concat =        require('gulp-concat');
var fileinclude =   require('gulp-file-include');
var sourcemaps =    require('gulp-sourcemaps');
var del =           require('del');
var sass =          require('gulp-sass');
var gulpSequence =  require('gulp-sequence');
var gutil =         require('gulp-util');
var autoprefixer =  require('gulp-autoprefixer');
var browserSync =   require('browser-sync').create();

var path = {
  css:              "dist/css",
  home:             "src/index.html",
  html:             "src/*.html",
  images:           "src/images/**/*",
  javascript:       "src/javascript/**/*.js", 
  partials:         "src/_partials/**/*.html",
  sass:             "src/sass/**/*.scss"
};

path.filesToCopyNotSass = [
  path.html,
  path.images,
  path.javascript
];

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist']);
});

gulp.task('copy', function() {
  gulp.src(path.filesToCopyNotSass, {base: "src"})
    .pipe(gulp.dest('dist/'));
});

gulp.task('fileinclude', function() {
  gulp.src([
    './src/widget-demo.html'
  ]).pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function(){
  return gulp.src(path.sass)
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(path.css))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      directory: false
    }
  });
  gulp.watch([path.filesToCopyNotSass, path.sass]).on('change', browserSync.reload);
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(path.filesToCopyNotSass, ['copy']);
  gulp.watch(path.sass, ['sass']);
  gulp.watch([path.partials, path.html], ['fileinclude']);
});

gulp.task('build', gulpSequence('clean', 'sass', 'fileinclude', 'copy'));
gulp.task('default', gulpSequence('build', 'watch', 'server'));




