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
              themes: {
                checkout:         '_layouts/theme-checkout.html.twig'
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
                  primary:          prefix.groups + "navigation/primary.html.twig",
                  breadcrumbs:      prefix.groups + "navigation/breadcrumb.html.twig"
                },
                checkout: {
                  personsOrder:     prefix.groups + "checkout/persons-order.html.twig",
                  personsOrderTr:   prefix.groups + "checkout/persons-order-tr.html.twig",
                  productSummary:   prefix.groups + "checkout/product-summary.html.twig",
                  orderSummary:     prefix.groups + "checkout/order-summary.html.twig"
                },
                ratings: {
                  unit:             prefix.groups + "ratings/unit.html.twig"
                },
                tables: {
                  ordersCheckout: {
                    tr:             prefix.groups + "tables/orders-checkout-tr.html.twig"
                  },
                  ordersReview: {
                    tr:             prefix.groups + "tables/orders-review-tr.html.twig"
                  }
                }
              },
              modules: {
                checkout: {
                  chooseType:                   prefix.modules + "checkout/choose-type.html.twig",
                  header:                       prefix.modules + "checkout/header.html.twig",
                  orderSummary:                 prefix.modules + "checkout/order-summary.html.twig",
                  orderSummaryTabProducts:      prefix.modules + "checkout/order-summary-tab-products.html.twig",
                  orderSummaryTabIncentives:    prefix.modules + "checkout/order-summary-tab-incentives.html.twig",
                  order: {
                    summary:      prefix.modules + "checkout/order-summary.html.twig",
                    total:        prefix.modules + "checkout/order-total.html.twig"
                  },
                  review: {
                    order: {
                      navTab:       prefix.modules + 'checkout/review/order/nav-tab.html.twig',
                      tabContent:   prefix.modules + 'checkout/review/order/tab-content.html.twig',
                      tabPane: {
                        products:   prefix.modules + 'checkout/review-order-tab-panel-products.html.twig',
                        incentives: prefix.modules + 'checkout/review-order-tab-panel-incentives.html.twig',
                      }
                    },
                    item: {
                      cart:       prefix.modules + "checkout/review-item-cart.html.twig",
                      shipTo:     prefix.modules + "checkout/review-item-ship-to.html.twig",
                      shipMethod: prefix.modules + "checkout/review-item-ship-method.html.twig",
                      payMethod:  prefix.modules + "checkout/review-item-pay-method.html.twig"
                    },
                    drawer: {
                      orderTotal: prefix.modules + "checkout/drawer-total-order.html.twig"
                    },
                    tab: {
                      cart:       prefix.modules + "checkout/tab-review-cart.html.twig"
                    }
                  },
                  triage:         prefix.modules + "checkout/triage.html.twig"
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
                  }                 
                },
                v1: {
                  product: {
                    detail: {
                      details:    prefix.modules + "v1/product/detail/details.html.twig",
                      features:   prefix.modules + "v1/product/detail/features.html.twig",
                      header:     prefix.modules + "v1/product/detail/header.html.twig",
                      images:     prefix.modules + "v1/product/detail/images.html.twig"
                    }
                  }
                }
              }
            },
            pages: {
              checkout: {
                review: {
                  complete: 'checkout-review-complete.html',
                  order:    'checkout-review-order.html'
                },
                chooseType: 'checkout-choose-type.html',
              },
              product: {
                detail:      'product-detail.html'
              }
            },
            styleguide: {
              item:     "styleguide/_includes/module.html.twig",
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




