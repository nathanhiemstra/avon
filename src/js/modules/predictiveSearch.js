/**
 * Predictive search - handles all product search behavior
 * @return {init} [description]
 */

var PredictiveSearch = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      searchInputMobile: $('#mobile-search-input'),
      searchInputDesktop: $('#desktop-header-search'),
      searchBtn: $('#mobile-search-toggle'),
      searchNavbar: $('#mobile-header-navbar'),
      menuButton: $('.navbar-header .navbar-toggle'),
      plMobile: $('.navbar--primary-nav > .container > .navbar-header .predictive-list'),
      plDesktop: $('.navbar--primary-nav > .container > .navbar-right .predictive-list'),
      searchOverlay: $('.container--search-results .main-content-overlay')
    };

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    // mobile
    $els.searchBtn.on('click', _toggleSearchExpand);
    $els.searchInputMobile
      .focus(function () {
        _togglePredictiveSearch();
      })
      .blur(function () {
        _togglePredictiveSearch();
        _toggleSearchExpand();
      })
      .keyup(function () {
        _runFilters($els.searchInputMobile);
      });

    // desktop
    $els.searchInputDesktop
      .focus(function () {
        _togglePredictiveSearch();
        _toggleSearchExpand();
      })
      .blur(function () {
        _togglePredictiveSearch();
        _toggleSearchExpand();
      })
      .keyup(function (e) {
        _runFilters($els.searchInputDesktop);
      });
  };

  var _runFilters = function (inputEl) {
    var input = inputEl.val().toUpperCase();
    var predItemsMobile = $els.plMobile.find('li');
    var predItemsDesktop = $els.plDesktop.find('li');

    filterList(predItemsMobile);
    filterList(predItemsDesktop);

    function filterList(items) {
      var itemTitle;
      // Loop through all items, and hide those that don't match the search query
      for (i = 0; i < items.length; i++) {
        itemTitle = $(items[i]).find('.title').text();
        if (itemTitle.toUpperCase().indexOf(input) > -1) {
          $(items[i]).addClass('show').removeClass('hidden');
        } else {
          $(items[i]).addClass('hidden').removeClass('show');
        }
      }
    };
  };

  var _togglePredictiveSearch = function() {
    if($els.plMobile.hasClass('expanded')) {
      // expanded, let's collapse
      $els.plMobile.removeClass('expanded').addClass('collapsed');
      $els.plDesktop.removeClass('expanded').addClass('collapsed');
    } else {
      // collapsed, let's expand
      $els.plMobile.removeClass('collapsed').addClass('expanded');
      $els.plDesktop.removeClass('collapsed').addClass('expanded');
    }
  };

  var _toggleSearchExpand = function () {
    // mobile
    if($els.searchNavbar.hasClass('expanded')) {
      // expanded, let's collapse
      $els.searchNavbar.removeClass('expanded').addClass('collapsed');
      $els.searchOverlay.removeClass('show').addClass('hidden');
      $els.searchInputMobile.addClass('invisible');

      $els.menuButton.removeClass('hidden').addClass('show');
    } else {
      // collapsed, let's expand
      $els.searchNavbar.removeClass('collapsed').addClass('expanded');
      $els.searchOverlay.removeClass('hidden').addClass('show');
      $els.searchInputMobile.removeClass('invisible');

      $els.menuButton.removeClass('show').addClass('hidden');

      $els.searchInputMobile.focus();
    }

    // desktop
    if($els.searchInputDesktop.hasClass('expanded')) {
      $els.searchInputDesktop.removeClass('expanded').addClass('collapsed');
    } else {
      $els.searchInputDesktop.removeClass('collapsed').addClass('expanded');
    }
  };

  // var _toggleExpand = function ($el) {
  //   $el.toggleClass('collapsed').toggleClass('expanded');
  // }

  // var _toggleDisplay = function ($el) {
  //   $el.toggleClass('hidden').toggleClass('show');
  // };

  // var _toggleVisibility = function ($el) {
  //   $el.toggleClass('invisible');
  // }

  return {
    init: init
  };

})();
