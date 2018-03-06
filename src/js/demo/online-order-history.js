/**
 * OnlineOrderHistory - handles all Online Order History page behavior
 * @return {init} [description]
 */

var OnlineOrderHistory = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      pagePrev: $('.pagination .page-prev'),
      pageNext: $('.pagination .page-next'),
      pageItems: $('.pagination li:not(.page-next):not(.page-prev)'),
      tables: $('.table')
    };

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    $els.pagePrev.on('click', function() {
      if($(this).hasClass('disabled')) return;
      _toggleView();
    });

    $els.pageNext.on('click', function() {
      if($(this).hasClass('disabled')) return;
      _toggleView();
    });

    $els.pageItems.on('click', function() {
      if( $(this).hasClass('disabled') || $(this).hasClass('active') ) return;
      $els.pageItems.removeClass('active');
      $(this).addClass('active');
      _toggleView();
    });

  };

  // demo - simply toggles the table view back and forth
  var _toggleView = function() {
    $els.tables.toggleClass('hidden');
  };

  return {
    init: init
  };

})();
