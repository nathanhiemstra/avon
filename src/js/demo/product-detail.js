/**
 * ProductDetail - scripts related to the product detail page
 * @return {init} [description]
 */


var ProductDetail = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // initilize tabCollapse - converts tabs and tab panes to accordion on mobile
    $('#pdpTabs').tabCollapse();

    // grab the DOM els we need
    $els = {
      socialIcons:                  $('#pdp-imgs__social'),
      socialIconsContainerDesktop:  $('#pdp-imgs__social-desktop'),
      socialIconsContainerMobile:   $('#pdp-imgs__social-mobile'),
      customerSelectInput:          $('#pdpCustomerSelect'),
      customerSelectTrigger:        $('#pdpCustomerSelect + .form-control-feedback')
    };

    _addListeners();
    _cloneSocialIcons();
  };

  // private methods
  var _addListeners = function () {

    $els.customerSelectTrigger.on('click', _handleDropdownClick);

    // Customer input select auto-complete - https://github.com/devbridge/jQuery-Autocomplete
    $els.customerSelectInput.autocomplete({
      // serviceUrl: '/autocomplete/data/somepath', // ajax
      lookup: FAKE_CUSTOMER_DATA, // no ajax, just a js object located in fakeData.js
      onSelect: function (suggestion) {
        // console.log('You selected: ' + suggestion.value);
        // _handleItemEntrySelection(this, suggestion);
        $(this).val(suggestion.value);
      },
      formatResult: function (suggestion, currentVal) {
        return _constructItemTemplate(suggestion);
      },
      onHide: function() {
        // re-add click listener on down arrow
        $els.customerSelectTrigger.on('click', _handleDropdownClick);
      },
      showOnFocus: true,
      minChars: 0,
      maxHeight: 400,
      showNoSuggestionNotice: false,
      noSuggestionNotice: 'Sorry, nothing matches that query',
      triggerSelectOnValidInput: false,
      preserveInput: true
    });

  };


  // handle customer dropdown arrow click
  var _handleDropdownClick = function(e) {
    $els.customerSelectInput.focus();
    $els.customerSelectTrigger.off();
  };

  // When page loads, make copy of icons in other part of markup for mobile view.
  // Couldn't acvieve this with CSS
  var _cloneSocialIcons = function() {
    $els.socialIcons.clone().appendTo($els.socialIconsContainerMobile).addClass('visible-xs mt-5');
  };

  // construct the html for predictive search template
  var _constructItemTemplate = function(suggestion) {
    return '<div class="item border-bottom p-4">' +
      '<a href="javascript:void(0)">' +
        '<div class="row">' +
          '<div class="col col-xs-12">' +
            '<p class="title m-0">' + suggestion.value + '</p>' +
          '</div>' +
        '</div>' +
      '</a>' +
    '</div>';
  };

  return {
    init: init
  };

})();
