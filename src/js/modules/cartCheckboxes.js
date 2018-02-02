/**
 * CartCheckboxes - handles all shopping cart checkbox behavior
 * @return {init}
 */

var CartCheckboxes = (function () {

  var $els = {};
  var totalNumChecked = 0;
  var allChecked = false;

  // public methods
  var init = function () {
    // grab the DOM els we need
    $els = {
      checkboxList: $('.list-group--checkboxed'),
      selectAllCheckbox: $('.list-group--checkboxed .checkbox-select-all'),
      checkboxes: $('.list-group--checkboxed input[type=checkbox]:not(.checkbox-select-all)'),
      checkoutBtn: $('.checkout-order-total .btn')
    };

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    $els.selectAllCheckbox.click(function (e) {
      _toggleSelectAll(this);
    });

    $els.checkboxes.click(function(e) {
      _handleCheckbox(this);
    });

  };

  var _toggleSelectAll = function (el) {

    if (el.checked) {
      $els.checkboxes.each(function () {
        this.checked = true;
      });
      allChecked = true;
    } else {
      $els.checkboxes.each(function () {
        this.checked = false;
      });
      allChecked = false;
    }

    _updateCheckoutBtn();

  };

  var _handleCheckbox = function(el) {

    var totalCheckboxes = $els.checkboxes.length;
    var numChecked = 0;

    $els.checkboxes.each(function () {
      if(this.checked) {
        numChecked++;
      }
      if(numChecked === 0) {
        $els.selectAllCheckbox.prop('indeterminate', false);
        $els.selectAllCheckbox.prop('checked', false);
        allChecked = false;
      } else if(numChecked === totalCheckboxes) {
        $els.selectAllCheckbox.prop('indeterminate', false);
        $els.selectAllCheckbox.prop('checked', true);
        allChecked = true;
      } else {
        $els.selectAllCheckbox.prop('indeterminate', true);
        allChecked = false;
      }
    });

    totalNumChecked = numChecked;
    _updateCheckoutBtn();

  };

  var _updateCheckoutBtn = function() {
    var btnText = '';

    if(allChecked) {
      $els.checkoutBtn.html('Checkout - All Carts');
    } else if(totalNumChecked > 0) {
      if(totalNumChecked === 1) {
        $els.checkoutBtn.html('Checkout - ' + totalNumChecked + ' Cart');
      } else {
        $els.checkoutBtn.html('Checkout - ' + totalNumChecked + ' Carts');
      }
    } else {
      $els.checkoutBtn.html('Checkout Nothing');
    }


  };

  return {
    init: init
  };

})();
