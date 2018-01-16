/**
 * Predictive search - handles all product search input behavior
 * @return {init} [description]
 */

var PredictiveSearch = (function () {

  var $els = {};
  var autoCompleteOptions = {};
  var itemEntryObj = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      searchInputMobile: $('#mobile-search-input'),
      searchInputDesktop: $('#desktop-header-search'),
      searchBtn: $('#mobile-search-toggle'),
      searchNavbar: $('#mobile-header-navbar'),
      menuButton: $('.navbar-header .navbar-toggle'),
      globalOverlay: $('.global-content-overlay'),

      itemEntryDrawer: $('#drawer-item-entry'),
      itemEntrySearchInput: $('#itemEntryProduct'),
      itemEntryCustomer: $('#itemEntryCustomer'),
      itemEntryQty: $('#itemEntryQty'),
      itemEntryAdd: $('#itemEntryAdd'),
      itemEntryContent: $('#drawer-item-entry .drawer-content'),
      itemEntryList: $('.item-entry-content--list'),
      itemEntryAddAllBtns: $('.item-entry-total button')
    };

    itemEntryObj = {
      customer: undefined,
      product: undefined,
      qty: undefined
    }

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    //
    // https://github.com/devbridge/jQuery-Autocomplete
    //

    $els.itemEntrySearchInput.autocomplete({
      // serviceUrl: '/autocomplete/data', // ajax
      lookup: FAKE_PRODUCTS, // no ajax, just a js object
      onSelect: function (suggestion) {
        console.log('You selected: ' + suggestion.value);
        _handleItemEntrySelection(this, suggestion);
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

    $els.searchInputDesktop.autocomplete({
      lookup: FAKE_PRODUCTS,
      onSelect: function (suggestion) {
        console.log('You selected: ' + suggestion.value);
        // _handleSearchInputSelection(this, suggestion);
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

    $els.itemEntryCustomer.on('change', function() {
      // console.log($(this).val());
      itemEntryObj.customer = $(this).val();
      _checkBtnState();
    });

    $els.itemEntryQty.on('change', function() {
      // console.log($(this).val());
      itemEntryObj.qty = $(this).val();
      _checkBtnState();
    });

    $els.itemEntryAdd.on('click', function() {
      _handleItemEntry(itemEntryObj);
      itemEntryObj = {};
      // alert('Add item to list: ' + itemEntryObj.qty + 'X ' + itemEntryObj.product + ' for ' + itemEntryObj.customer);
      $(this).html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
      $(this).addClass('btn-primary');
    });

    $els.itemEntryAddAllBtns.on('click', function() {
      console.log('BTN CLICKED :: ');
      $('html').toggleClass('drawer-open');
      $els.itemEntryDrawer.toggleClass('drawer-expanded');
      $els.globalOverlay.toggleClass('hidden');
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

  var _handleItemEntry = function(obj) {
    _clearItemEntryForm();
    $els.itemEntryList.removeClass('hidden');
    $els.itemEntryContent.css('height', '100vh');
  };

  var _clearItemEntryForm = function() {
    // TODO :: below is for demo purposes only
    setTimeout(function() {
      $els.itemEntrySearchInput.val('');
      $els.itemEntrySearchInput.next('.selected-item').text('');
      $els.itemEntryQty.find('option').prop('selected', function() {
          return this.defaultSelected;
      });
      $els.itemEntryCustomer.find('option').prop('selected', function() {
          return this.defaultSelected;
      });
      $els.itemEntryAdd.html('Add Item');
      $els.itemEntryAdd.prop('disabled', true);
      $els.itemEntryAdd.removeClass('btn-primary');
    }, 500);
  };

  var _toggleSearchExpand = function () {
    // mobile
    if($els.searchNavbar.hasClass('expanded')) {
      // expanded, let's collapse
      $els.searchNavbar.removeClass('expanded').addClass('collapsed');
      $els.globalOverlay.removeClass('show').addClass('hidden');
      $els.searchInputMobile.addClass('invisible');

      $els.menuButton.removeClass('hidden').addClass('show');
    } else {
      // collapsed, let's expand
      $els.searchNavbar.removeClass('collapsed').addClass('expanded');
      $els.globalOverlay.removeClass('hidden').addClass('show');
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

  var _handleItemEntrySelection = function(input, item) {
    console.log(input, item);
    $(input).val('');
    $(input).next('.selected-item').text(item.value);
    itemEntryObj.product = item.value;
    _checkBtnState();
  };

  var _checkBtnState = function() {
    var hasUndefined = Object.keys(itemEntryObj).some(function(key) {
      if(itemEntryObj[key] === undefined) return true;
      return false;
    });
    if(!hasUndefined) {
      $els.itemEntryAdd.prop('disabled', false);
      $els.itemEntryAddAllBtns.prop('disabled', false);
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
