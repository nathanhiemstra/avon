/**
 * Global Search - handles global product search behavior
 * including expand / collapse of search bar and predictive search
 * in various places
 * @return {init} [description]
 */

var GlobalSearch = (function () {

  var $els = {};
  var autoCompleteOptions = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      searchParent: $('.navbar--primary-nav'),
      searchContainer: $('.primary-nav__search'),
      searchBtn: $('.primary-nav__search span'),
      searchInput : $('.primary-nav__search-input'),
      // searchInputMobile: $('#mobile-search-input'),
      // searchInputDesktop: $('#primary-nav__search-input'),
      // searchBtn: $('#mobile-search-toggle'),
      // searchNavbar: $('#mobile-header-navbar'), // TODO :: update this for auto-complete demo
      // drawerBackdrop: $('.drawer-backdrop')
    };

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    //
    // https://github.com/devbridge/jQuery-Autocomplete
    //

    // $els.itemEntrySearchInput.autocomplete({
    //   // serviceUrl: '/autocomplete/data/somepath', // ajax
    //   lookup: FAKE_PRODUCTS, // no ajax, just a js object
    //   onSelect: function (suggestion) {
    //     console.log('You selected: ' + suggestion.value);
    //     _handleItemEntrySelection(this, suggestion);
    //     $(this).val(suggestion.sku);
    //   },
    //   formatResult: function (suggestion, currentVal) {
    //     return _constructItemTemplate(suggestion);
    //   },
    //   maxHeight: 400,
    //   showNoSuggestionNotice: true,
    //   noSuggestionNotice: 'Sorry, nothing matches that query',
    //   triggerSelectOnValidInput: false,
    //   preserveInput: true
    // });

    $els.searchInput.autocomplete({
      // serviceUrl: '/autocomplete/data/somepath', // ajax
      lookup: FAKE_PRODUCTS,
      onSelect: function (suggestion) {
        console.log('You selected: ' + suggestion.value);
        // _handleSearchInputSelection(this, suggestion);
        // $(this).val('');
      },
      formatResult: function (suggestion, currentVal) {
        return _constructItemTemplate(suggestion);
      },
      appendTo: $els.searchNavbar,
      maxHeight: 400,
      showNoSuggestionNotice: true,
      noSuggestionNotice: 'Sorry, nothing matches that query',
      triggerSelectOnValidInput: false,
      preserveInput: true
    });

    // $els.searchInputDesktop.autocomplete({
    //   lookup: FAKE_PRODUCTS,
    //   onSelect: function (suggestion) {
    //     console.log('You selected: ' + suggestion.value);
    //     // _handleSearchInputSelection(this, suggestion);
    //     // $(this).val('');
    //   },
    //   formatResult: function (suggestion, currentVal) {
    //     return _constructItemTemplate(suggestion);
    //   },
    //   maxHeight: 400,
    //   showNoSuggestionNotice: true,
    //   noSuggestionNotice: 'Sorry, nothing matches that query',
    //   triggerSelectOnValidInput: false,
    //   preserveInput: true
    // });

    $els.searchBtn.on('click', _toggleSearchExpand);

    // $els.searchInput.blur(function () {
    //   _toggleSearchExpand();
    // });

    // desktop
    // $els.searchInputDesktop
    //   .focus(function () {
    //     _toggleSearchExpand();
    //   })
    //   .blur(function () {
    //     _toggleSearchExpand();
    //   });
  };

  var _toggleSearchExpand = function (e) {

    var isExpanded = $els.searchParent.hasClass('search-expanded');
    var animationTime = 200; // NOTE :: it's important that this matches $ui-animation-time scss variable

    if(isExpanded) {
      // add / remove collapsing class
      $els.searchParent.addClass('collapsing');
      setTimeout(function() {
        $els.searchParent.removeClass('collapsing');
      }, animationTime);
    } else {
      // add / remove expanding class
      $els.searchParent.addClass('expanding');
      setTimeout(function() {
        $els.searchParent.removeClass('expanding');
        $els.searchInput.focus();
      }, animationTime);
    }


    // show / hide
    $els.searchParent.toggleClass('search-expanded');
    // $els.searchInput.toggleClass('hidden');

    // $els.searchContainer.animate({
    //   width: "100%"
    // }, 150, function() {
    //   console.log('COMPLETE');
    // });

    // if($els.searchNavbar.hasClass('expanded')) {
    //   // expanded, let's collapse
    //   $els.searchNavbar.removeClass('expanded').addClass('collapsed');
    //   // $els.drawerBackdrop.removeClass('in').addClass('fade');
    //   $els.searchInputMobile.addClass('invisible');
    // } else {
    //   // collapsed, let's expand
    //   $els.searchNavbar.removeClass('collapsed').addClass('expanded');
    //   // $els.drawerBackdrop.removeClass('fade').addClass('in');
    //   $els.searchInputMobile.removeClass('invisible');
    //
    //   $els.searchInputMobile.focus();
    // }

    // if($els.searchInputDesktop.hasClass('expanded')) {
    //   $els.searchInputDesktop.removeClass('expanded').addClass('collapsed');
    // } else {
    //   $els.searchInputDesktop.removeClass('collapsed').addClass('expanded');
    // }
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
