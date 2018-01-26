/**
 * CheckoutDemo - handles all checkout behavior
 * @return {init} [description]
 */

var CheckoutDemo = (function () {

  var $els = {};
  var currentView = '';

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      payMethodForm: $('#payment-method-form'),
      payMethodInputs: $('#payment-method-form input[type=radio]'),
      creditCardDiv: $('.quick-checkout-cc'),
      avonQuikpayDiv: $('.quick-checkout-aq'),
      avonCreditDiv: $('.quick-checkout-ac'),
      summaryDiv: $('.quick-checkout-summary'),
      submitBtn: $('.quick-checkout-submit')
    };

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    $els.payMethodInputs.change(function() {
        currentView = this.value;
        _switchView();
    });

    $els.submitBtn.on('click', function() {
        currentView = 'Summary';
        _switchView();
    });

  };

  var _switchView = function() {

    // hide all
    $els.creditCardDiv.addClass('hidden');
    $els.avonQuikpayDiv.addClass('hidden');
    $els.avonCreditDiv.addClass('hidden');
    $els.summaryDiv.addClass('hidden');

    // show form
    $els.payMethodForm.removeClass('hidden');

    switch (currentView) {
      case 'Credit Card':
        $els.creditCardDiv.removeClass('hidden');
        break;
      case 'Avon Quikpay':
        $els.avonQuikpayDiv.removeClass('hidden');
        break;
      case 'Avon Credit':
        $els.avonCreditDiv.removeClass('hidden');
        break;
      case 'Summary':
        $els.summaryDiv.removeClass('hidden');
        $els.payMethodForm.addClass('hidden');
        break;
      default:
        $els.creditCardDiv.removeClass('hidden');

    }

  };

  return {
    init: init
  };

})();
