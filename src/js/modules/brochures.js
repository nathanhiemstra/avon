/**
 * Brochures - handles all brochure view behavior
 * @return {init} [description]
 */

var Brochures = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      gridView: $('.brochure-grid-view'),
      detailView: $('.brochure-detail-view'),
      brochureGridItems: $('.brochure-item'),
      backBtn: $('.brochures-back-btn'),
      mobileNav: $('.brochure-mobile-nav'),
      desktopNav: $('.brochure-desktop-nav')
    };

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    $els.brochureGridItems.on('click', function() {
      $els.gridView.toggleClass('hidden');
      $els.detailView.toggleClass('hidden');
      $els.backBtn.toggleClass('hidden');
    });

    $els.backBtn.on('click', function() {
      $els.gridView.toggleClass('hidden');
      $els.detailView.toggleClass('hidden');
      $(this).toggleClass('hidden');
    });

  };

  return {
    init: init
  };

})();
