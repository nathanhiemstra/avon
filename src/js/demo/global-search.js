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
        return _constructGlobalSearchItem(suggestion);
      },
      beforeRender: function(container, suggestions) {
        // only show 'view all results' button if we have suggestions
        if(suggestions.length) {
          $(container)
            .append('<a id="autocomplete-all-results-link" class="link-primary border-top">View all results</a>');
        } else {
          $(container)
            .find('.autocomplete-suggestion:last-of-type')
            .css('padding-bottom', 0);
        }
      },
      appendTo: $els.searchContainer,
      maxHeight: 400,
      width: 373,
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

  var _constructGlobalSearchItem = function(suggestion) {
    return '<div class="item border-bottom p-3">' +
        '<a href="' + suggestion.itemUrl + '" class="link-plain">' +
          '<div class="d-flex align-items-center flex-fill">' +
            '<div>' +
              '<p class="title">' + suggestion.value + '</p>' +
              '<p>' +
                '<!-- DEVELOPER NOTE :: If "Regular price" is not shown here, remove .text-primary to make the price black -->' +
                '<span class="sale-price text-primary mr-4">' + suggestion.salePrice + '</span>' +
                '<span class="reg-price small text-muted">Regular Price: <span class="strike-through">' + suggestion.regPrice + '</span></span>' +
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
