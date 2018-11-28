/**
 * BackToTop - handles all 'back to top' button behavior
 * @return {init} [description]
 */

var NbaDrawer = (function() {
  var $els = {};
  var nbaCurrentSlide;
  var nbaTotalSlides;
  var firstRun = true;

  // public methods
  var init = function() {
    // grab the DOM els we need
    $els = {
      nbaDrawer: $('#nba-drawer'),
      nbaCarousel: $('#nba-carousel'),
      nbaCarouselControls: $('#nba-carousel .carousel-controls'),
      nbaCurrentSlideTxt: $('#nba-carousel .carousel-index > .current-slide'),
      nbaTotalSlidesTxt: $('#nba-carousel .carousel-index > .total-slides'),
      nbaBadgeTxt: $('#nba-drawer .badge.item-count'),
      nbaMessaging: $('#nba-carousel .carousel-msg'),
      nbaMsgCover: $('#nba-carousel .carousel-msg .carousel-msg_cover'),
      nbaMsgCompleteTxt: $('#nba-carousel .carousel-msg .carousel-msg_complete')
    };

    // _checkWindowSize();
    // $(window).on('resize', function() {
    //   _checkWindowSize();
    // });

    // initialize the carousel
    _initCarousel();
  };

  // DEV NOTE :: if you'd like to show the expanded state of the drawer based on some condition,
  //          :: simply add 'drawer-expanded class as seen below
  // var _checkWindowSize = function() {
  //   // expand drawer by default on desktop, collapse on mobile
  //   if($(window).width() < 768) {
  //     $els.nbaDrawer.removeClass('drawer-expanded');
  //   } else {
  //     $els.nbaDrawer.addClass('drawer-expanded');
  //   }
  // };

  var _initCarousel = function(startIndex) {
    if(!startIndex) startIndex = 0;
    nbaCurrentSlide = startIndex;
    nbaTotalSlides = $els.nbaCarousel.find('.item').length;

    // manually init carousel
    $els.nbaCarousel
      .carousel({ interval: false })
      .carousel(startIndex);

    // set initial values in the DOM
    _updateNbaSlideIndex();

    _addListeners();
  };

  // private methods
  var _addListeners = function() {
    // dispose any previous listeners
    $els.nbaCarousel.off();

    // listen for carousel 'slid'
    $els.nbaCarousel.on('slid.bs.carousel', function(e) {
      _handleSlid(e.target);
    });

    // listen for carousel 'slide'
    $els.nbaCarousel.on('slide.bs.carousel', function(e) {
      _handleSlide(e.target);
    });

    // Demo message dismissal -
    // DEV NOTE: This is for demo purposes, code may be different in production environment
    $els.nbaCarousel.find('.item').each(function() {
      var $item = $(this);
      $item.find('a.item-dismiss').off().on('click', function() {
        _dismissSlide();
      });
    });
  };

  // dismiss the current slide
  var _dismissSlide = function() {
    var currentIndex = $els.nbaCarousel.find('.active').index();
    var nextIndex;
    var nextIndexInit;
    var isLastSlide = nbaTotalSlides === 1;

    if(currentIndex === nbaTotalSlides - 1) {
      // if last item, set indexes back to 0
      nextIndex = 0;
      nextIndexInit = 0;
    } else {
      // advance to next item (nextIndexInit gets set to current index
      // because current will be deleted from DOM)
      nextIndex = currentIndex + 1;
      nextIndexInit = currentIndex;
    }

    // grab the active and next items
    var activeEl = $els.nbaCarousel.find('.item.active');
    var nextEl = $els.nbaCarousel.find('.item').eq(nextIndex);

    // animate indicators
    $els.nbaCurrentSlideTxt.removeClass('in').addClass('out');
    $els.nbaTotalSlidesTxt.removeClass('in').addClass('out');
    $els.nbaBadgeTxt.removeClass('in').addClass('out');

    setTimeout(function() {
      $els.nbaTotalSlidesTxt.removeClass('out').addClass('in');
    }, 500);

    setTimeout(function() {
      $els.nbaBadgeTxt.removeClass('out').addClass('in');
    }, 600);

    // re-init carousel
    if(isLastSlide) {
      // update number of items
      nbaTotalSlides = 0;

      // Show complete message
      $els.nbaMessaging.addClass('reveal');
      $els.nbaMsgCompleteTxt.addClass('reveal');

      // remove the active element
      activeEl.remove();

      // zero-out counters, remove badge
      $els.nbaCurrentSlideTxt.text(0);
      $els.nbaTotalSlidesTxt.text(0);
      $els.nbaBadgeTxt.text(0);
      $els.nbaBadgeTxt.addClass('d-none');

      // update slide index
      _updateNbaSlideIndex();
    } else {
      // transition, then re-init
      $els.nbaMessaging.addClass('reveal');
      $els.nbaMsgCover.addClass('reveal');
      activeEl.addClass('out');
      nextEl.addClass('in');

      // hide success message after 3 seconds
      setTimeout(function() {
        $els.nbaMessaging.removeClass('reveal');
        $els.nbaMsgCover.removeClass('reveal');

        // remove the active element and add class to next
        activeEl.remove();
        nextEl.addClass('active');

        // reset carousel
        $els.nbaCarousel.carousel('pause').removeData();
        _initCarousel(nextIndexInit);
      }, 350);

    }
  };

  // update indexes
  var _handleSlid = function(target) {
    setTimeout(function() {
      $els.nbaCurrentSlideTxt.removeClass('out').addClass('in');
    }, 150);

    nbaCurrentSlide =
      $(target)
        .find('.active')
        .index();
    nbaTotalSlides = $(target).find('.item').length;

    _updateNbaSlideIndex();
  };

  // handle slide
  var _handleSlide = function(target) {
    $els.nbaCurrentSlideTxt.removeClass('in').addClass('out');
  };

  // update slide counter text in DOM
  var _updateNbaSlideIndex = function() {
    setTimeout(function() {
      // animate in
      if(!firstRun) {
        $els.nbaCurrentSlideTxt.removeClass('out').addClass('in');
      } else {
        firstRun = false;
      }

      // update txt values
      $els.nbaCurrentSlideTxt.text(nbaCurrentSlide + 1);
      $els.nbaTotalSlidesTxt.text(nbaTotalSlides);
      $els.nbaBadgeTxt.text(nbaTotalSlides);
    }, 150);

    if(nbaTotalSlides < 1) {
      // No current actions available
      // add class to carousel
      $els.nbaDrawer.addClass('no-items');
      // hide all counters
      $els.nbaBadgeTxt.addClass('d-none');
      $els.nbaCarouselControls.addClass('d-none');
      // show messaging
      $els.nbaMessaging.addClass('reveal');
      $els.nbaMsgCompleteTxt.addClass('reveal');
    }
  };

  return {
    init: init
  };

})();
