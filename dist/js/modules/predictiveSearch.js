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
      predictiveList: $('#predictive-list'),
      resultsList: $('#search-results-list'),
      searchOverlay: $('.container--search-results .main-content-overlay')
    };

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    $els.searchBtn.on('click', _toggleSearchExpand);

    $els.searchInputMobile
      .focus(function () {})
      .blur(function () {
        _toggleExpand($els.searchNavbar);
        _toggleVisibility($els.searchInputMobile);
        _toggleDisplay($els.searchOverlay);
        _toggleDisplay($els.menuButton);
        _toggleExpand($els.predictiveList);
        $els.searchBtn.on('click', _toggleSearchExpand);
      })
      .keyup(function () {
        _runFilters();
      });

    $els.searchInputDesktop
      .keyup(function() {
        _runFilters();
      });
  };

  var _runFilters = function () {
    var input = $els.searchInputMobile.val().toUpperCase();
    var predItems = $els.predictiveList.find('li');
    var resultItems = $els.resultsList.find('li');

    filterList(predItems);
    filterList(resultItems);

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

  var _toggleSearchExpand = function () {
    _toggleExpand($els.searchNavbar);
    _toggleVisibility($els.searchInputMobile);
    _toggleDisplay($els.searchOverlay);
    _toggleDisplay($els.menuButton);
    $els.searchBtn.off('click');
    $els.searchInputMobile.one('keypress', function () {
      // first keypress
      _toggleExpand($els.predictiveList);
    });
  };

  var _toggleExpand = function ($el) {
    $el.toggleClass('collapsed').toggleClass('expanded');
  }

  var _toggleDisplay = function ($el) {
    $el.toggleClass('hidden').toggleClass('show');
  };

  var _toggleVisibility = function ($el) {
    $el.toggleClass('invisible');
  }

  // Toggle predictive search list under search input
  // function togglePredictiveSearch() {
  //   $els.predictiveList.toggleClass('collapsed').toggleClass('expanded');
  // }

  return {
    init: init
  };

})();
