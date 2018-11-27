/**
 * BackToTop - handles all 'back to top' button behavior
 * @return {init} [description]
 */

var NbaDrawer = (function() {
  var $els = {};
  var nbaCurrentSlide;
  var nbaTotalSlides;

  // public methods
  var init = function() {
    // grab the DOM els we need
    $els = {
      nbaDrawer: $('#nbaDrawer'),
      nbaCarousel: $('#nbaCarousel'),
      nbaCarouselControls: $('#nbaCarousel .carousel-controls'),
      nbaCurrentSlideTxt: $('#nbaCarousel .carousel-index > .current-slide'),
      nbaTotalSlidesTxt: $('#nbaCarousel .carousel-index > .total-slides'),
      nbaBadgeTxt: $('#nbaDrawer .badge.item-count'),
      nbaMessaging: $('#nbaCarousel .carousel-msg'),
      nbaMsgCover: $('#nbaCarousel .carousel-msg .carousel-msg_cover'),
      nbaMsgCompleteTxt: $('#nbaCarousel .carousel-msg .carousel-msg_complete')
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
    _updateNbaSlideIndex(nbaCurrentSlide, nbaTotalSlides);

    _addListeners();
  };

  // private methods
  var _addListeners = function() {
    // listen for carousel 'slid'
    $els.nbaCarousel.off().on('slid.bs.carousel', function(e) {
      _handleSlid(e.target);
    });

    // Demo message dismissal -
    // DEV NOTE: This is for demo purposes, code may be different in production environment
    $els.nbaCarousel.find('.item').each(function() {
      var $item = $(this);
      $item.find('a.item_dismiss').off().on('click', function() {
        _dismissSlide();
      });
    });

    // add listener on document so we can close drawer on click outside
    // $(document).on('click', _checkTarget);
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
      // Show success message, then re-init
      $els.nbaMessaging.addClass('reveal');
      $els.nbaMsgCover.addClass('reveal');

      // hide success message after 3 seconds
      setTimeout(function() {
        $els.nbaMessaging.removeClass('reveal');
        $els.nbaMsgCover.removeClass('reveal');

        // remove the active element and add class to next
        setTimeout(function() {
        }, 250);
        activeEl.remove();
        nextEl.addClass('active');

        // reset carousel
        $els.nbaCarousel.carousel('pause').removeData();
        _initCarousel(nextIndexInit);
      }, 250);

    }
  };

  // update indexes
  var _handleSlid = function(target) {
    nbaCurrentSlide =
      $(target)
        .find('.active')
        .index();
    nbaTotalSlides = $(target).find('.item').length;

    _updateNbaSlideIndex();
  };

  // update slide counter text in DOM
  var _updateNbaSlideIndex = function() {
    $els.nbaCurrentSlideTxt.text(nbaCurrentSlide + 1);
    $els.nbaTotalSlidesTxt.text(nbaTotalSlides);
    $els.nbaBadgeTxt.text(nbaTotalSlides);

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

  var _checkTarget = function(e) {
    var $target = $(e.target);
    // var hasPopover = $target.closest('.popover').length;
    // var isTrigger = $target.closest('[data-toggle="popover"]').length;
    // var isCopyBtn = $target.hasClass('copy-input-btn');

    // if (isCopyBtn) {
    //   e.preventDefault();
    //   var $input = $target.closest('form').find('input[readonly]');
    //   _copyInputToClipboard($target, $input);
    // } else if (isTrigger || hasPopover) {
    //   return;
    // } else {
    //   $els.modalPopoverCombos.popover('hide');
    // }
  };

  return {
    init: init
  };
})();
