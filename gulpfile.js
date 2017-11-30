var autoprefixer =  require('gulp-autoprefixer');
var browserSync =   require('browser-sync').create();
var del =           require('del');
var concat =        require('gulp-concat');
var fileinclude =   require('gulp-file-include');
var gulp =          require('gulp');
var gulpSequence =  require('gulp-sequence');
var gutil =         require('gulp-util');
var rename =        require("gulp-rename");
var sourcemaps =    require('gulp-sourcemaps');
var sass =          require('gulp-sass');


var module = {
  atoms: {}
}
var markup = {
  highlight: {}
}
var path = {
  dist: {},
  css: {}
};
var page = {
  styleguideHome: {}
}

module.atoms = {
  logoYourAvon:     "_includes/modules/atoms/images/logo-your-avon.html.twig"
}

path.dist = {
  css:              "dist/css"
};
path.src = {
  docsAssets:       "src/styleguide/docs-assets/**/*",
  examplesHtml:     "src/styleguide/examples/**/*.html",
  examplesCss:      "src/styleguide/examples/**/*.css",
  examplesJpg:      "src/styleguide/examples/**/*.jpg",
  fonts:            "src/fonts/*",
  html:             "src/**/*.html",
  images:           "src/images/**/*",
  js:               "src/js/**/*.js", 
  sass:             "src/sass/**/*.scss",
  twig:             "src/**/*.twig",
  styleguide:       "src/styleguide/*.twig"
};

path.staticFilesToCopy = [
  path.src.docsAssets,
  path.src.examplesHtml,
  path.src.examplesCss,
  path.src.examplesJpg,
  path.src.fonts,
  path.src.images,
  path.src.js
];

page.styleguideHome = {
  title: 'Styleguide CSS',
  slug: 'styleguide-css'
}
markup.highlight = {
  markup: '<pre><code class="language-markup"><script type="text/plain">',
  css: '<pre><code class="language-css"><script type="text/plain">',
  end: '</script></code></pre>',
}

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist']);
});

gulp.task('copy', function() {
  gulp.src(path.staticFilesToCopy, {base: "src"})
    .pipe(gulp.dest('dist/'));
});

gulp.task('compile', function () {
  'use strict';
  var twig = require('gulp-twig');
  return gulp.src(path.src.twig)
      .pipe(twig({
          data: {
              highlightMarkup:  markup.highlight.markup,
              highlightCss:     markup.highlight.css,
              endhighlight:     markup.highlight.end,
              module: {
                atom: {
                  image: {
                    logoYourAvon: "_includes/modules/atoms/images/logo-your-avon.html.twig"
                  }
                },
                template: "_includes/module.html.twig",
                molecules :{
                  navigation: {
                    primary: "_includes/modules/molecules/navigation/primary.html.twig"
                  }
                },
                organism :{
                  global: {
                    header: "_includes/modules/organisms/global/header.html.twig"
                  }
                }
              }           
          }
      }))
      .pipe(rename({
          // Change .html.twig to just .twig
          extname: ''
      }))
      .pipe(gulp.dest('./dist/'));
});
 
gulp.task('default', ['compile']);

// gulp.task('fileinclude', function() {
//   gulp.src([path.src.html]).pipe(fileinclude({
//       prefix: '@@',
//       basepath: '@file'
//     }))

//     .pipe(gulp.dest('./dist/'));
// });

gulp.task('sass', function(){
  return gulp.src(path.src.sass)
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(path.dist.css))
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
  gulp.watch([path.staticFilesToCopy, path.src.sass]).on('change', browserSync.reload);
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(path.staticFilesToCopy, ['copy']);
  gulp.watch(path.src.sass, ['sass']);
  gulp.watch(path.src.twig, ['compile']);
  // gulp.watch([path.src.html], ['fileinclude']);
});

gulp.task('build', gulpSequence('clean', 'sass', 'compile', 'copy'));
gulp.task('default', gulpSequence('build', 'watch', 'server'));




