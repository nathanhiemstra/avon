/**
 * CartCheckboxes - handles all shopping cart checkbox behavior
 * @return {init}
 */

var CartCheckboxes = (function () {

  var $els = {};
  var $checkboxes;
  var totalNumChecked = 0;

  // public methods
  var init = function () {
    // grab the DOM els we need
    $els = {
      checkboxList: $('.list-group--checkboxed'),
      selectAllCheckbox: $('.list-group--checkboxed .checkbox-select-all'),
      carts: $('.list-group--checkboxed .single-cart-item'),
      checkoutBtn: $('.checkout-order-total .btn'),
      checkoutSubtotal: $('.checkout-order-total .subtotal'),
      checkoutDiscount: $('.checkout-order-total .discount')
    };

    totalNumChecked = $els.carts.length;
    checkboxes = $els.carts.find('input[type=checkbox]');

    _addListeners();
    _updateCheckoutBtn();

  };

  // private methods
  var _addListeners = function () {

    $els.selectAllCheckbox.click(function (e) {
      _toggleSelectAll(this);
      _updateCheckoutBtn();
    });

    checkboxes.click(function(e) {
      _handleCheckbox(this);
      _updateCheckoutBtn();
    });

  };

  var _toggleSelectAll = function (el) {

    if (el.checked) {
      checkboxes.each(function () {
        this.checked = true;
      });
      totalNumChecked = $els.carts.length;
    } else {
      checkboxes.each(function () {
        this.checked = false;
      });
      totalNumChecked = 0;
    }

  };

  var _handleCheckbox = function(el) {

    var totalCheckboxes = $els.carts.length;
    var numChecked = 0;

    checkboxes.each(function () {

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
      case $els.carts.length:
        $els.checkoutBtn.attr('disabled', false);
        btnText = 'Checkout - All Carts';
        break;
      default:
        $els.checkoutBtn.attr('disabled', false);
        btnText = 'Checkout - ' + totalNumChecked + (totalNumChecked === 1 ? ' Cart' : ' Carts');
    }

    $els.checkoutBtn.html(btnText);

  };

  return {
    init: init
  };

})();
