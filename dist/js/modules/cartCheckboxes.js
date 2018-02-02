/**
 * CartCheckboxes - handles all shopping cart checkbox behavior
 * @return {init}
 */

var CartCheckboxes = (function () {

  var $els = {};
  var $checkboxes;
  var totalNumChecked = 0;
  var totalPrice = 0;
  var totalDiscount = 0;

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
    $checkboxes = $els.carts.find('input[type=checkbox]');

    _addListeners();
    _updateCheckoutTotals();

  };

  // private methods
  var _addListeners = function () {

    $els.selectAllCheckbox.on('click', function (e) {
      _toggleSelectAll(this);
      _updateCheckoutTotals();
    });

    $checkboxes.on('click', function(e) {
      _handleCheckbox(this);
      _updateCheckoutTotals();
    });

  };

  var _toggleSelectAll = function (el) {

    if (el.checked) {
      $checkboxes.each(function () {
        this.checked = true;
      });
      totalNumChecked = $els.carts.length;
    } else {
      $checkboxes.each(function () {
        this.checked = false;
      });
      totalNumChecked = 0;
    }

  };

  var _handleCheckbox = function() {

    var totalCheckboxes = $els.carts.length;
    var numChecked = 0;


    // loop through each cart
    $checkboxes.each(function () {

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

  var _updateCheckoutTotals = function() {

    // handle checkout totals
    totalPrice = 0;
    totalDiscount = 0;

    $els.carts.each(function() {
      var $this = $(this);
      var checkbox = $this.find('input[type=checkbox]');
      if(checkbox[0].checked) {
        totalPrice += parseFloat($this.find('.cart-total').data('total'));
        totalDiscount += parseFloat($this.find('.cart-discount').data('discount'));
      }
    });

    $els.checkoutSubtotal.html('$' + totalPrice.toFixed(2));
    $els.checkoutDiscount.html('$' + totalDiscount.toFixed(2));

    // handle checkout button text
    var btnText = '';

    switch (totalNumChecked) {
      case 0: // None selected
        $els.checkoutBtn.attr('disabled', 'disabled');
        btnText = 'Checkout';
        break;
      case $els.carts.length: // All selected
        $els.checkoutBtn.attr('disabled', false);
        btnText = 'Checkout - All Carts';
        break;
      default: // Some selected
        $els.checkoutBtn.attr('disabled', false);
        btnText = 'Checkout - ' + totalNumChecked + (totalNumChecked === 1 ? ' Cart' : ' Carts');
    }

    $els.checkoutBtn.html(btnText);

  };

  var _getCartTotals = function(el) {

  };

  return {
    init: init
  };

})();
