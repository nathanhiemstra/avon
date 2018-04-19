/**
 * Brochures - handles all brochure view behavior
 * @return {init} [description]
 */

var Brochures = (function () {

  var $els = {};
  // var totalSteps = 0;
  // var currentStep = 1;

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      gridView: $('.brochure-grid-view'),
      detailView: $('.brochure-detail-view'),
      brochureGridItems: $('.brochure-item'),
      backBtn: $('.brochures-back-btn'),
      brochureContainer: $('.brochure-container')
      // brochureCarousel: $('#brochure-carousel'),
      // brochureSlides: $('#brochure-carousel .item'),
      // brochureProgress: $('#brochure-carousel-progress'),
      // brochureProgressBar: $('#brochure-carousel-progress .progress-bar'),
      // mobileNav: $('.brochure-mobile-nav'),
      // desktopNav: $('.brochure-desktop-nav')
    };

    // totalSteps = $els.brochureSlides.length;
    // currentStep = $els.brochureCarousel.find('.item.active').data('step');

    _addListeners();
    // _updateProgress(null);

  };

  // private methods
  var _addListeners = function () {

    $els.brochureGridItems.on('click', function() {
      _toggleView();
    });

    $els.backBtn.on('click', function() {
      _toggleView();
    });

    // $els.brochureContainer.on('click', function() {
    //   _toggleModal();
    // });

    // $els.brochureCarousel.on('slide.bs.carousel', function (e) {
    //   _updateProgress(e);
    // });

  };

  var _toggleView = function() {
    $els.gridView.toggleClass('hidden');
    $els.detailView.toggleClass('hidden');
    $els.backBtn.toggleClass('hidden');
  };

  // var _toggleModal = function() {
  //   console.log('Show Modal');
  // };

  // var _updateProgress = function(e) {
  //   if(e) currentStep = $(e.relatedTarget).data('step');
  //   // console.log('CURRENT STEP :: ', currentStep);
  //
  //   var stepWidth = (1 / totalSteps) * 100;
  //
  //   $els.brochureProgressBar.css({
  //     width: stepWidth + '%',
  //     transform: 'translateX(' + (currentStep - 1) * 100 + '%)'
  //   });
  // };

  return {
    init: init
  };

})();
