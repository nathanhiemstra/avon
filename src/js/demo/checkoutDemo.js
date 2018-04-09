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
      submitBtn: $('.quick-checkout-submit'),

      affixAside: $('.affix--aside-col-4'),
      splitContainerMobile: $('[data-split-content="mobile"]'),
      splitContainerDesktop: $('[data-split-content="desktop"]'),
      splitContainerBottom: $('[data-split-content="bottom"]'),
      splitContainerButtons: $('[data-split-content="buttons"]'),
      splitContainerContent: $('[data-split-content="content"]')

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

    if($els.affixAside.length) {
      var toTop = $els.affixAside.offset().top - 32;
      $els.affixAside.data('offset-top', toTop);
    }

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
