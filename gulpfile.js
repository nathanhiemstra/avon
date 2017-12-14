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
  components:       "_includes/components/",
  elements:         "_includes/components/elements/",
  groups:           "_includes/components/groups/",
  modules:          "_includes/components/modules/",
  templates:        "_includes/components/templates/"
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
            components: {
              elements: {
                forms: {
                  checkbox:         prefix.elements + "forms/checkbox.html.twig",
                  errorMessage:     prefix.elements + "forms/error-message.html.twig",
                  label:            prefix.elements + "forms/label.html.twig",
                  input:            prefix.elements + "forms/input.html.twig",
                  radio:            prefix.elements + "forms/radio.html.twig",
                  select:           prefix.elements + "forms/select.html.twig"
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
                checkoutV2: {
                  orderSummary:                 prefix.modules + "checkout-v2/order-summary.html.twig",
                  orderSummaryTabProducts:      prefix.modules + "checkout-v2/order-summary-tab-products.html.twig",
                  orderSummaryTabIncentives:    prefix.modules + "checkout-v2/order-summary-tab-incentives.html.twig",
                  review: {
                    item: {
                      cart:                     prefix.modules + "checkout-v2/review-item-cart.html.twig",
                      shipTo:                   prefix.modules + "checkout-v2/review-item-ship-to.html.twig",
                      shipMethod:               prefix.modules + "checkout-v2/review-item-ship-method.html.twig",
                      payMethod:                prefix.modules + "checkout-v2/review-item-pay-method.html.twig"
                    },
                    drawer: {
                      orderTotal:               prefix.modules + "checkout-v2/drawer-total-order.html.twig"
                    },
                    tab: {
                      cart:                     prefix.modules + "checkout-v2/tab-review-cart.html.twig"
                    }
                  },
                  triage:                       prefix.modules + "checkout-v2/triage.html.twig"
                },
                global: {
                  footer:           prefix.modules + "global/footer.html.twig",
                  header:           prefix.modules + "global/header.html.twig"
                },
                product: {
                  detail: {
                    details:       prefix.modules + "product/detail/details.html.twig",
                    features:      prefix.modules + "product/detail/features.html.twig",
                    header:        prefix.modules + "product/detail/header.html.twig",
                    images:        prefix.modules + "product/detail/images.html.twig"
                  }
                },
                productV2: {
                  detail: {
                    addToOrder:    prefix.modules + "product-v2/detail/add-to-order.html.twig",
                    details:       prefix.modules + "product-v2/detail/details.html.twig"
                    
                  }
                }
              }
            },
            pages: {
              checkoutV2: {
                review: {
                  itemized: 'checkout-review-itemized-v2.html',
                  complete: 'checkout-review-complete-v2.html'
                }
              },
              productV2: {
                detail: 'product-detail-v2.html'
              }
            },
            styleguide: {
              item: "styleguide/_includes/module.html.twig"
            },
            fpo: {
              image: '<img src="images/utility/placeholder.png" alt="" class="img-responsive">',
              sku: "&lt;000-000&gt;",
              paragraph: "Lorem ipsum dolor sit amet, erant dolor phaedrum ad vel, usu mundi consequuntur ne. In pri ceteros pericula argumentum, at eum veri congue consequat, no quot nibh mea. Natum aliquam pericula at vis, congue efficiendi cu mea. Tibique commune gubergren et usu, usu ne sadipscing voluptatibus comprehensam, te wisi tritani his. Ornatus comprehensam eu sed, sit nisl eruditi ocurreret.",
              sentence: "Lorem ipsum dolor sit amet, erant dolor phaedrum."
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
});

gulp.task('build', gulpSequence('clean', 'sass', 'compile', 'copy'));
gulp.task('default', gulpSequence('build', 'watch', 'server'));




