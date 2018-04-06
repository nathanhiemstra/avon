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

      subtotal: $('.checkout-order-total .subtotal'),
      offersTotal: $('.checkout-order-total .offers-total'),
      discountTotal: $('.checkout-order-total .discount'),

      checkoutSummary: $('section.checkout-order-total'),

      checkoutBtn: $('#carts-checkout-btn'),
      refreshOrderBtn: $('#carts-refresh-btn'),
      cartsRefreshMsg: $('#carts-refresh-msg'),
      cartsButtons: $('#carts-buttons'),
      cartsDetails: $('#carts-details'),
      cartsSummaryContainerDesktop: $('#carts-summary-container-dt'),
      cartsSummaryContainerMobile: $('#carts-summary-container-mobile'),
      cartsBtnsFixedContainer: $('#carts-fixed-btns-container'),
      cartsPromoAlert: $('#carts-promo-alert'),
      cartsRefreshAlert: $('#carts-refresh-alert'),

      columnQty: $('.single-cart-item .t-qty'),

      // els for row highlighting demo
      qtyInputs: $('[data-initial-value]')
    };

    totalNumChecked = $els.carts.length;
    $checkboxes = $els.carts.find('input[type=checkbox]');

    _addListeners();
    _updateCheckoutTotals();
    _checkQtyInputs();

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

    $els.refreshOrderBtn.on('click', function () {
      totalsOff = false;
      _updateCheckoutTotals();
      _toggleUpdateTotals();

      // loop qty inputs, set data-initial-value to current value, remove all
      // row highlights
      $.each($els.qtyInputs, function(i, val) {
        var parentRow = $(this).closest('tr');
        var curValue = $(this).val();

        $(this).data('initial-value', curValue);
        $(this).attr('data-initial-value', curValue);
        parentRow.removeClass('highlight-row');
      });

      _checkQtyInputs();

    });

  };

  var _checkQtyInputs = function() {
    // loop qty inputs, check if current val is differnet from initial, toggle
    // highlight-row class
    $.each($els.qtyInputs, function(i, val) {
      var parentRow = $(this).closest('tr');

      $(this).off().on('change textInput input blur', function() {
        if($(this).val() !== $(this).data('initial-value').toString()) {
          parentRow.addClass('highlight-row');
          totalsOff = true;
          _toggleUpdateTotals();
        } else {
          parentRow.removeClass('highlight-row');
          if($('.highlight-row').length < 1) {
            totalsOff = false;
            _toggleUpdateTotals();
          }
        }
      });

    });
  };

  var _toggleUpdateTotals = function () {
    if (totalsOff) {
      // hide checkout button and carts promo
      $els.checkoutBtn.removeClass('in').addClass('out');
      $els.cartsPromoAlert.removeClass('in').addClass('out');
      // show 'refresh order' button and messaging
      $els.checkoutBtn.on('transitionend',function() {
        $(this).addClass('hidden');
        $els.cartsPromoAlert.addClass('hidden');

        $els.refreshOrderBtn.removeClass('hidden out').addClass('in');
        $els.cartsRefreshMsg.removeClass('hidden out').addClass('in');
        $els.cartsRefreshAlert.removeClass('hidden out').addClass('in');
      });
      _zeroOutTotals();
    } else {
      // hide 'refresh order' button and messaging
      $els.refreshOrderBtn.removeClass('in').addClass('out');
      $els.cartsRefreshMsg.removeClass('in').addClass('out');
      $els.cartsRefreshAlert.removeClass('in').addClass('out');

      $els.refreshOrderBtn.on('transitionend',function() {
        $(this).addClass('hidden');
        $els.cartsRefreshMsg.addClass('hidden');
        $els.cartsRefreshAlert.addClass('hidden');

        // show checkout button and carts promo
        $els.checkoutBtn.removeClass('hidden out').addClass('in');
        $els.cartsPromoAlert.removeClass('hidden out').addClass('in');
      });
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
    // $els.subtotal.html('$&mdash;.&mdash;');
    $els.offersTotal.html('$&mdash;.&mdash;');
    $els.discountTotal.html('$&mdash;.&mdash;');

    totalsOff = true;
  };

  var _updateCheckoutTotals = function () {

    // handle checkout totals
    totalPrice = 0;
    totalDiscount = 10;

    $els.carts.each(function () {
      var $this = $(this);
      var checkbox = $this.find('input[type=checkbox]');
      if (checkbox[0].checked) {
        totalPrice += parseFloat($this.find('.cart-total').data('total'));
        // totalDiscount += parseFloat($this.find('.cart-discount').data('discount'));
      }
    });

    $els.subtotal.html('$' + totalPrice.toFixed(2));
    $els.offersTotal.html('$' + (totalPrice - totalDiscount).toFixed(2) );
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

  return {
    init: init
  };

})();
