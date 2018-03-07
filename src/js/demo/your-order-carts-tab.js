/**
 * YourOrderCartsTab - handles all behavior for 'Carts' tab on Your Order Page
 * @return {init}
 */

var YourOrderCartsTab = (function () {

  var $els = {};
  var $checkboxes;
  var totalNumChecked = 0;
  var totalPrice = 0;
  var totalDiscount = 0;
  var totalsOff = false;

  // public methods
  var init = function () {
    // grab the DOM els we need
    $els = {
      selectAllCheckbox: $('.list-group--checkboxed .checkbox-select-all :checkbox'),
      carts: $('.list-group--checkboxed .single-cart-item'),
      checkoutBtn: $('.checkout-order-total .btn'),
      subtotal: $('.checkout-order-total .subtotal'),
      offersTotal: $('.checkout-order-total .offers-total'),
      discountTotal: $('.checkout-order-total .discount'),
      updateTotalsLink: $('.checkout-order-total .update-totals-link'),
      fixedBottomSummary: $('.navbar-fixed-bottom--order-summary')
    };

    totalNumChecked = $els.carts.length;
    $checkboxes = $els.carts.find('input[type=checkbox]');

    _addListeners();
    _updateCheckoutTotals();
    _calculateBottomPadding();

  };

  // private methods
  var _addListeners = function () {

    $els.selectAllCheckbox.change(function () {
      totalsOff = true;
      _toggleSelectAll(this);
      _toggleUpdateTotals();
    });

    $checkboxes.change(function () {
      totalsOff = true;
      _handleCheckbox(this);
      _toggleUpdateTotals();
    });

    $els.updateTotalsLink.on('click', function () {
      totalsOff = false;
      _updateCheckoutTotals();
      _toggleUpdateTotals();
    });

    $(window).resize(function () {
      _calculateBottomPadding();
    });

  };

  var _toggleUpdateTotals = function () {
    if (totalsOff) {
      // show update link
      $els.updateTotalsLink.removeClass('out').addClass('in');
      _zeroOutTotals();
    } else {
      // hide update link
      $els.updateTotalsLink.addClass('out').removeClass('in');
    }
  };

  var _toggleSelectAll = function (el) {

    if (el.checked) {
      $checkboxes.each(function () {
        this.checked = true;
        $(this).closest('.single-cart-item').removeClass('inactive');
      });
      totalNumChecked = $els.carts.length;
    } else {
      $checkboxes.each(function () {
        this.checked = false;
        $(this).closest('.single-cart-item').addClass('inactive');
      });
      totalNumChecked = 0;
    }

  };

  var _handleCheckbox = function () {

    var totalCheckboxes = $els.carts.length;
    var numChecked = 0;

    // loop through each cart
    $checkboxes.each(function () {

      // count number checked and set active / inactive states
      if (this.checked) {
        $(this).closest('.single-cart-item').removeClass('inactive');
        numChecked++;
      } else {
        $(this).closest('.single-cart-item').addClass('inactive');
      }

      // set checkbox states
      if (numChecked === 0) {
        $els.selectAllCheckbox.prop('indeterminate', false);
        $els.selectAllCheckbox.prop('checked', false);
      } else if (numChecked === totalCheckboxes) {
        $els.selectAllCheckbox.prop('indeterminate', false);
        $els.selectAllCheckbox.prop('checked', true);
      } else {
        $els.selectAllCheckbox.prop('indeterminate', true);
      }

    });

    totalNumChecked = numChecked;

  };

  var _zeroOutTotals = function () {
    $els.subtotal.html('$-');
    $els.offersTotal.html('$-');
    $els.discountTotal.html('$-');

    totalsOff = true;
  };

  var _updateCheckoutTotals = function () {

    // handle checkout totals
    totalPrice = 0;
    totalDiscount = 0;

    $els.carts.each(function () {
      var $this = $(this);
      var checkbox = $this.find('input[type=checkbox]');
      if (checkbox[0].checked) {
        totalPrice += parseFloat($this.find('.cart-total').data('total'));
        totalDiscount += parseFloat($this.find('.cart-discount').data('discount'));
      }
    });

    $els.subtotal.html('$' + totalPrice.toFixed(2));
    $els.offersTotal.html('$' + totalPrice.toFixed(2)); // TODO :: <-- calculate this
    $els.discountTotal.html('$' + totalDiscount.toFixed(2));

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

    totalsOff = false;

  };

  var _calculateBottomPadding = function () {
    // var isVisible = $els.fixedBottomSummary
    var footerHeight = $els.fixedBottomSummary.outerHeight();
    $('body').css('padding-bottom', footerHeight);
  };

  return {
    init: init
  };

})();
