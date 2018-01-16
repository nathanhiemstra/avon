/**
 * Predictive search - handles all product search input behavior
 * @return {init} [description]
 */

var PredictiveSearch = (function () {

  var $els = {};
  var autoCompleteOptions = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      searchInputMobile: $('#mobile-search-input'),
      searchInputDesktop: $('#desktop-header-search'),
      searchInputItemEntry: $('#itemEntryProduct'),
      searchBtn: $('#mobile-search-toggle'),
      searchNavbar: $('#mobile-header-navbar'),
      menuButton: $('.navbar-header .navbar-toggle'),
      // plMobile: $('.navbar--primary-nav > .container > .navbar-header .predictive-list'),
      // plDesktop: $('.navbar--primary-nav > .container > .navbar-right .predictive-list'),
      searchOverlay: $('.container--search-results .main-content-overlay')
    };

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    //
    // https://github.com/devbridge/jQuery-Autocomplete
    //

    $els.searchInputItemEntry.autocomplete({
      // serviceUrl: '/autocomplete/data', // ajax
      lookup: FAKE_PRODUCTS, // no ajax, just a js object
      onSelect: function (suggestion) {
        console.log('You selected: ' + suggestion.value);
        // $(this).val('');
      },
      formatResult: function (suggestion, currentVal) {
        return _constructItemTemplate(suggestion);
      },
      maxHeight: 400,
      showNoSuggestionNotice: true,
      noSuggestionNotice: 'Sorry, nothing matches that query',
      triggerSelectOnValidInput: false,
      preserveInput: true
    });

    $els.searchInputMobile.autocomplete({
      lookup: FAKE_PRODUCTS,
      onSelect: function (suggestion) {
        console.log('You selected: ' + suggestion.value);
        // $(this).val('');
      },
      formatResult: function (suggestion, currentVal) {
        return _constructItemTemplate(suggestion);
      },
      width: 'auto',
      appendTo: $els.searchNavbar,
      maxHeight: 400,
      showNoSuggestionNotice: true,
      noSuggestionNotice: 'Sorry, nothing matches that query',
      triggerSelectOnValidInput: false,
      preserveInput: true
    });

    $els.searchInputDesktop.autocomplete({
      lookup: FAKE_PRODUCTS,
      onSelect: function (suggestion) {
        console.log('You selected: ' + suggestion.value);
        // $(this).val('');
      },
      formatResult: function (suggestion, currentVal) {
        return _constructItemTemplate(suggestion);
      },
      maxHeight: 400,
      showNoSuggestionNotice: true,
      noSuggestionNotice: 'Sorry, nothing matches that query',
      triggerSelectOnValidInput: false,
      preserveInput: true
    });

    // mobile
    $els.searchBtn.on('click', _toggleSearchExpand);
    $els.searchInputMobile
      .blur(function () {
        _toggleSearchExpand();
      });

    // desktop
    $els.searchInputDesktop
      .focus(function () {
        _toggleSearchExpand();
      })
      .blur(function () {
        _toggleSearchExpand();
      });
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

  var _constructItemTemplate = function(suggestion) {
    return '<div class="item border-bottom p-4">' +
        '<a href="' + suggestion.itemUrl + '">' +
          '<div class="row">' +
            '<div class="col col-xs-2 col-sm-3">' +
              '<img src="' + suggestion.imgUrl + '" class="product-img img-responsive">' +
            '</div>' +
            '<div class="col col-xs-10 col-sm-9">' +
              '<p class="title">' + suggestion.value + '</p>' +
              '<p>' +
                '<span class="sale-price">' + suggestion.salePrice + '</span>' +
                '<span class="reg-price small">Regular Price: ' + suggestion.salePrice + '</span>' +
              '</p>' +
              '<p>' +
                '<span class="rating small">' +
                  '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>' +
                  '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>' +
                  '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>' +
                  '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>' +
                  '<span class="num-ratings">' + suggestion.numRatings + '</span>' +
                '</span>' +
                '<span class="stock small"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> ' + suggestion.stockStatus + '</span>' +
              '</p>' +
            '</div>' +
          '</div>' +
        '</a>' +
      '</div>';
  };

  return {
    init: init
  };

})();
