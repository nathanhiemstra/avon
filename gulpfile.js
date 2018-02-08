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
var prefix = {
  elements:         "_includes/elements/",
  groups:           "_includes/groups/",
  modules:          "_includes/modules/",
  templates:        "_includes/templates/"
}

path.dist = {
  css:              "dist/css"
};
path.src = {
  docsAssets:       "src/styleguide/docs-assets/**/*",
  examplesHtml:     "src/styleguide/examples/**/*.html",
  examplesCss:      "src/styleguide/examples/**/*.css",
  examplesJpg:      "src/styleguide/examples/**/*.jpg",
  fonts:            "src/fonts/**/*",
  html:             "src/**/*.html",
  images:           "src/images/**/*",
  js:               "src/js/**/*.js",
  json:             "src/js/**/*.json",
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
  path.src.js,
  path.src.json,
];

page.styleguideHome = {
  title:  'Styleguide CSS',
  slug:   'styleguide-css'
}
markup.highlight = {
  css:        '<pre><code class="language-css"><script type="text/plain">',
  markup:     '<pre><code class="language-markup"><script type="text/plain">',
  javascript: '<pre><code class="language-javascript"><script type="text/plain">',
  twig:       '<pre><code class="language-twig"><script type="text/plain">',
  sass:       '<pre><code class="language-sass"><script type="text/plain">',
  end:        '</script></code></pre>'
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
          base: './src',
          data: {
            highlightCss:         markup.highlight.css,
            highlightMarkup:      markup.highlight.markup,
            highlightJavascript:  markup.highlight.javascript,
            highlightTwig:        markup.highlight.twig,
            highlightSass:        markup.highlight.sass,
            endhighlight:         markup.highlight.end,
            layouts: {
              base:               '_layouts/base.html.twig',
              columns12:          '_layouts/columns-12.html.twig',
              columns9x3:         '_layouts/columns-9x3.html.twig',
              columns3x9:         '_layouts/columns-3x9.html.twig',
              themes: {
                checkout:         '_layouts/theme-checkout.html.twig',
                yourOrder:        '_layouts/theme-your-order.html.twig'
              },
              utility: {
                modal:            '_layouts/modal.html.twig',
              }
            },
            components: {
              elements: {
                forms: {
                  checkbox:         prefix.elements + "forms/checkbox.html.twig",
                  errorMessage:     prefix.elements + "forms/error-message.html.twig",
                  label:            prefix.elements + "forms/label.html.twig",
                  input:            prefix.elements + "forms/input.html.twig",
                  radio:            prefix.elements + "forms/radio.html.twig",
                  select:           prefix.elements + "forms/select.html.twig",
                  selectWrapper: {
                    start:          '<div class="form-group has-feedback d-inline-block">',
                    end:            '  <span class="glyphicon glyphicon-play form-control-feedback"></span>\r\n</div>'
                  }
                },
                images: {
                  logoYourAvon:     prefix.elements + "images/logo-your-avon.html.twig"
                },
                ratings: {
                  selected:         prefix.groups + "ratings/selected.html.twig",
                  unselected:       prefix.groups + "ratings/unselected.html.twig"
                }
              },
              groups: {
                forms: {
                  checkboxAndLabel: prefix.groups + "forms/checkbox-and-label.html.twig",
                  errorMessage:     prefix.groups + "forms/error-message.html.twig",
                  inputAndLabel:    prefix.groups + "forms/input-and-label.html.twig",
                  selectAndLabel:   prefix.groups + "forms/select-and-label.html.twig",
                  radioAndLabel:    prefix.groups + "forms/radio-and-label.html.twig"
                },
                navigation: {
                  breadcrumbs:      prefix.groups + "navigation/breadcrumb.html.twig"
                },

                ratings: {
                  unit:             prefix.groups + "ratings/unit.html.twig"
                },

                social: {
                  links:            prefix.groups + "social/social-links.html.twig"
                },

                yourOrder: {
                  personsOrderLi:   prefix.groups + "your-order/single-cart-li.html.twig",
                  singleProductTr:  prefix.groups + "your-order/single-product-tr.html.twig"
                },
              },
              modules: {
                brochures: {
                  header:         prefix.modules + "brochures/header.html.twig",
                  gridView:       prefix.modules + "brochures/grid-view.html.twig",
                  detailView:     prefix.modules + "brochures/detail-view.html.twig",
                  quickLook:      prefix.modules + "brochures/quick-look.html.twig"
                },
                checkout: {
                  chooseType:       prefix.modules + "checkout/choose-type.html.twig",
                  header:           prefix.modules + "checkout/header.html.twig",
                  itemizedCheckout: prefix.modules + "checkout/itemized-checkout.html.twig",
                  reviewComplete:   prefix.modules + "checkout/review-complete.html.twig",
                  quickCheckout:    prefix.modules + "checkout/quick-checkout.html.twig",
                },
                global: {
                  footer:         prefix.modules + "global/footer.html.twig",
                  header:         prefix.modules + "global/header.html.twig",
                  drawer: {
                    header:       prefix.modules + "global/drawer-header.html.twig"
                  }
                },
                product: {
                  detail: {
                    addToOrder:   prefix.modules + "product/detail/add-to-order.html.twig",
                    details:      prefix.modules + "product/detail/details.html.twig",
                    images:       prefix.modules + "product/detail/images.html.twig"
                  },
                  filters: {
                    productCategories: prefix.modules + "product/filters/product-categories.html.twig",
                    productFeatures: prefix.modules + "product/filters/product-features.html.twig",
                    productFilters: prefix.modules + "product/filters/product-filters.html.twig"
                  },
                  list: {
                    productList:      prefix.modules + "product/list/product-list.html.twig",
                    productListItem:  prefix.modules + "product/list/product-list-item.html.twig"
                  },
                  landing: {
                    landingFilter:    prefix.modules + "product/landing/landing-filter.html.twig",
                    body:             prefix.modules + "product/landing/landing-body.html.twig"
                  }
                },
                search: {
                  searchResults:  prefix.modules + "search/search-results-body.html.twig",
                  searchInput:    prefix.modules + "search/search-input.html.twig",
                  searchInputDt:  prefix.modules + "search/search-input-desktop.html.twig"
                },
                yourOrder: {
                  drawer:         prefix.modules + "your-order/order-summary.html.twig",
                  tabNav:         prefix.modules + 'your-order/tab-nav.html.twig',
                  tabContent:     prefix.modules + 'your-order/tab-content.html.twig',
                  tabPane: {
                    products:     prefix.modules + 'your-order/tab-panel-carts.html.twig',
                    incentives:   prefix.modules + 'your-order/tab-panel-offers.html.twig',
                  },
                  total:          prefix.modules + 'your-order/order-total.html.twig'
                },
              }
            },
            pages: {

              brochures: {
                landing:      'brochures.html'
              },
              checkout: {
                review: {
                  complete:   'checkout-review-complete.html'
                },
                chooseType:   'checkout-choose-type.html',
              },
              home:           'home.html',
              login:          'login.html',
              product: {
                category:     'product-categories.html',
                detail:       'product-detail.html',
                landing:      'product-landing.html',
                list:         'product-list.html'
              },
              yourOrder:      'your-order.html',
              search: {
                results:      'search-results.html'
              }
            },
            styleguide: {
              item:     "styleguide/_includes/example-template.html.twig",
              snippet:  "styleguide/_includes/snippet.html.twig"
            },
            fpo: {
              image: '<img src="images/utility/placeholder.png" alt="" class="img-responsive">',
              paragraph: "Lorem ipsum dolor sit amet, erant dolor phaedrum ad vel, usu mundi consequuntur ne. In pri ceteros pericula argumentum, at eum veri congue consequat, no quot nibh mea. Natum aliquam pericula at vis, congue efficiendi cu mea. Tibique commune gubergren et usu, usu ne sadipscing voluptatibus comprehensam, te wisi tritani his. Ornatus comprehensam eu sed, sit nisl eruditi ocurreret.",
              person: {
                1: 'You (Rosa Stone)',
                2: 'Kory Rasmussen',
                3: 'Tisha Pennington',
                4: 'Phoebe Pope',
                5: 'Helen Hicks'
              },
              sentence: "Lorem ipsum dolor sit amet, erant dolor phaedrum.",
              sku: "&lt;000-000&gt;",
              video: '<img src="images/fpo/video.png" alt="" class="img-responsive">',
            },
            code: {
              hideHeaderFooter: "<style>.global-header, .global-footer {display: none;} main {margin-top: 15px;} </style>"
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
    .pipe(sourcemaps.init())
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      notify: false,
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
});

gulp.task('build', gulpSequence('clean', 'sass', 'compile', 'copy'));
gulp.task('default', gulpSequence('build', 'watch', 'server'));
