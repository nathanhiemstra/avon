/**
 * Item Entry - handles all behavior related to Item Entry Drawer
 * // TODO :: rename this file item-entry.js
 * @return {init} [description]
 */

var FormDemo = (function () {

  var $els = {};
  var itemEntryObj = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      itemEntryDrawer: $('#drawer-item-entry'),
      itemEntrySearchInput: $('#itemEntryProduct'),
      itemEntryCustomer: $('#itemEntryCustomer'),
      itemEntryQty: $('#itemEntryQty'),
      itemEntryAdd: $('#itemEntryAdd'),
      itemEntryContent: $('#drawer-item-entry .drawer-content'),
      itemEntryList: $('.item-entry-content--list'),
      itemEntryAddAllBtns: $('.item-entry-total .btn').add('#itemEntryAddAll')
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

    $els.itemEntryAdd.on('click', function(e) {
      e.preventDefault();
      _handleItemEntry(itemEntryObj);
      itemEntryObj = {};
      // alert('Add item to list: ' + itemEntryObj.qty + 'X ' + itemEntryObj.product + ' for ' + itemEntryObj.customer);
      $(this).html('<span class="lt-icon lt-checkmark" aria-hidden="true"></span>');
      $(this).addClass('btn-primary');
    });

    $els.itemEntryAddAllBtns.on('click', function() {
      $('html').toggleClass('drawer-open');
      $els.itemEntryDrawer.toggleClass('drawer-expanded');
      $els.drawerBackdrop.toggleClass('fade').toggleClass('in');

      // show alert message demo
      $('#global-alert-msg').removeClass('collapsed');
      setTimeout(function() {
        $('#global-alert-msg').addClass('collapsed');
      }, 5000);
    });

  };

  var _handleItemEntry = function(obj) {
    _clearItemEntryForm();
    $els.itemEntryList.removeClass('hidden');
    $els.itemEntryContent.css('height', '100vh');
  };

  var _clearItemEntryForm = function() {
    // TODO :: below is for demo purposes only, should never be used in production
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
    }, 3000);
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

  return {
    init: init
  };

})();
