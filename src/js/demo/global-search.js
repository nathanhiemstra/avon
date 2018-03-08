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
      searchInput : $('.primary-nav__search-input')
    };

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    //
    // https://github.com/devbridge/jQuery-Autocomplete
    //

    $els.searchInput.autocomplete({
      // NOTE :: the 'serviceUrl' below should be used in production, for
      //      :: now we're using fake data with 'lookup'
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
      beforeRender: function(container, suggestions) {
        console.log(container);
        $(container).append('<a id="all-results-link" class="link-primary border-top">View all results</button>');
      },
      appendTo: $els.searchContainer,
      maxHeight: 400,
      width: 372,
      showNoSuggestionNotice: true,
      noSuggestionNotice: 'Nothing matches that search',
      triggerSelectOnValidInput: false,
      preserveInput: true
    });

    $els.searchBtn.on('click', _toggleSearchExpand);

    $els.searchInput.blur(function () {
      _toggleSearchExpand();
    });

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
  };

  var _constructItemTemplate = function(suggestion) {
    return '<div class="item border-bottom p-3">' +
        '<a href="' + suggestion.itemUrl + '" class="link-plain">' +
          '<div class="row d-flex align-items-center flex-fill">' +
            '<div class="col col-xs-2 col-sm-3 pr-0">' +
              '<img src="' + suggestion.imgUrl + '" class="product-img img-responsive">' +
            '</div>' +
            '<div class="col col-xs-10 col-sm-9 pl-3">' +
              '<p class="title">' + suggestion.value + '</p>' +
              '<p>' +
                '<span class="sale-price mr-4">' + suggestion.salePrice + '</span>' +
                '<span class="reg-price small strike-through">Regular Price: ' + suggestion.salePrice + '</span>' +
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
