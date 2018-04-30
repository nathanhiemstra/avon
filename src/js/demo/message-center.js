/**
 * MessageCenter - Demo js for Message Center page
 * @return {init} [description]
 */


var MessageCenter = (function () {

  var $els = {};
  var msgReadClass = 'reverse-bg'; // class that will be added to 'read' items

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      msgItems: $('.container--msg-center').find('.msg-center-messages .content'),
      searchForms: $('.container--msg-center').find('form.page-search'),
      searchInputs: $('.container--msg-center').find('form.page-search input'),
      closeBtns: $('.container--msg-center').find('.input-close-btn')
    };

    _addListeners();
  };

  // private methods
  var _addListeners = function () {

    // prevent search form from doing anything on submit
    $els.searchForms.on('submit', function(e) {
      e.preventDefault();
    });

    // remove class on item collapse
    $els.msgItems.on('show.bs.collapse', function() {
      $(this).parent().removeClass(msgReadClass);
    });

    // add class on item expand
    $els.msgItems.on('hide.bs.collapse', function() {
      $(this).parent().addClass(msgReadClass);
    });

    // clear forms when close button clicked
    $els.closeBtns.on('click', function() {
      $(this).parent().siblings('input').val('');
    });

  };

    // add autocomplete demo to search inputs
  //   $els.searchInputs.autocomplete({
  //     // NOTE :: the 'serviceUrl' below should be used in production, for
  //     //      :: now we're using fake data with 'lookup'
  //     // serviceUrl: '/autocomplete/data/somepath', // ajax
  //     lookup: FAKE_PRODUCTS,
  //     onSelect: function (suggestion) {
  //       // console.log('You selected: ' + suggestion.value);
  //       // _handleSearchInputSelection(this, suggestion);
  //       // $(this).val('');
  //     },
  //     formatResult: function (suggestion, currentVal) {
  //       return _constructMessageSearchItem(suggestion);
  //     },
  //     // beforeRender: function(container, suggestions) {
  //     //   // only show 'view all results' button if we have suggestions
  //     //   if(suggestions.length) {
  //     //     $(container)
  //     //       .append('<a id="autocomplete-all-results-link" class="link-primary border-top">View all results</a>');
  //     //   } else {
  //     //     $(container)
  //     //       .find('.autocomplete-suggestion:last-of-type')
  //     //       .css('padding-bottom', 0);
  //     //   }
  //     // },
  //     maxHeight: 400,
  //     showNoSuggestionNotice: true,
  //     noSuggestionNotice: 'Nothing matches that search',
  //     triggerSelectOnValidInput: false,
  //     preserveInput: true
  //   });
  // };

  // var _constructMessageSearchItem = function(suggestion) {
  //   return '<div class="item border-bottom p-3">' +
  //       '<a href="' + suggestion.itemUrl + '" class="link-plain">' +
  //         '<div class="d-flex align-items-center flex-fill">' +
  //           '<div>' +
  //             '<p class="title">' + suggestion.value + '</p>' +
  //             '<p>' +
  //               '<!-- DEVELOPER NOTE :: If "Regular price" is not shown here, remove .text-primary to make the price black -->' +
  //               '<span class="sale-price text-primary mr-4">' + suggestion.salePrice + '</span>' +
  //               '<span class="reg-price small text-muted">Regular Price: <span class="strike-through">' + suggestion.regPrice + '</span></span>' +
  //             '</p>' +
  //           '</div>' +
  //         '</div>' +
  //       '</a>' +
  //     '</div>';
  // };

  return {
    init: init
  };

})();
