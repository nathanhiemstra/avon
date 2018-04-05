/**
 * Pagination - handles demo behavior for pagination
 *            - looks for the attr: data-pagination-target which should
 *            - point to a class attached to exactly two tables
 * @return {init}
 */

var Pagination = (function () {

  var $els = {};
  var targetClass = '';
  var $targets;

  // public methods
  var init = function () {

    // grab the DOM els we need

    $els = {
      pagination: $('[data-pagination-target]'),
      pagePrev: $('.pagination .page-prev'),
      pageNext: $('.pagination .page-next'),
      pageItems: $('.pagination li:not(.page-next):not(.page-prev)')
    };

    targetClass = $els.pagination.data('pagination-target');
    targets = $('.' + targetClass);

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
    targets.toggleClass('hidden');
  };

  return {
    init: init
  };

})();
