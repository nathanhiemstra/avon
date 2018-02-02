/**
 * CartCheckboxes - handles all shopping cart checkbox behavior
 * @return {init}
 */

var CartCheckboxes = (function () {

  var $els = {};
  var totalNumChecked = 0;

  // public methods
  var init = function () {
    // grab the DOM els we need
    $els = {
      checkboxList: $('.list-group--checkboxed'),
      selectAllCheckbox: $('.list-group--checkboxed .checkbox-select-all'),
      checkboxes: $('.list-group--checkboxed input[type=checkbox]:not(.checkbox-select-all)'),
      checkoutBtn: $('.checkout-order-total .btn')
    };

    totalNumChecked = $els.checkboxes.length;

    _addListeners();
    _updateCheckoutBtn();

  };

  // private methods
  var _addListeners = function () {

    $els.selectAllCheckbox.click(function (e) {
      _toggleSelectAll(this);
      _updateCheckoutBtn();
    });

    $els.checkboxes.click(function(e) {
      _handleCheckbox(this);
      _updateCheckoutBtn();
    });

  };

  var _toggleSelectAll = function (el) {

    if (el.checked) {
      $els.checkboxes.each(function () {
        this.checked = true;
      });
      totalNumChecked = $els.checkboxes.length;
    } else {
      $els.checkboxes.each(function () {
        this.checked = false;
      });
      totalNumChecked = 0;
    }

  };

  var _handleCheckbox = function(el) {

    var totalCheckboxes = $els.checkboxes.length;
    var numChecked = 0;

    $els.checkboxes.each(function () {

      if(this.checked) numChecked++;

      if(numChecked === 0) {
        $els.selectAllCheckbox.prop('indeterminate', false);
        $els.selectAllCheckbox.prop('checked', false);
      } else if(numChecked === totalCheckboxes) {
        $els.selectAllCheckbox.prop('indeterminate', false);
        $els.selectAllCheckbox.prop('checked', true);
      } else {
        $els.selectAllCheckbox.prop('indeterminate', true);
      }

    });

    totalNumChecked = numChecked;

  };

  var _updateCheckoutBtn = function() {
    var btnText = '';

    switch (totalNumChecked) {
      case 0:
        $els.checkoutBtn.attr('disabled', 'disabled');
        btnText = 'Checkout';
        break;
      case $els.checkboxes.length:
        $els.checkoutBtn.attr('disabled', false);
        btnText = 'Checkout - All Carts';
        break;
      default:
        $els.checkoutBtn.attr('disabled', false);
        btnText = 'Checkout - ' + totalNumChecked + ' Carts';
    }

    $els.checkoutBtn.html(btnText);

  };

  return {
    init: init
  };

})();
