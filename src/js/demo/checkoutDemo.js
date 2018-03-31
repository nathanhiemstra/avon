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
    _calculateBottomPadding();
    _checkWidthAndMoveSummary();

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

    $(window).resize(function () {
      _calculateBottomPadding();
      _checkWidthAndMoveSummary();
    });

    if($els.affixAside.length) {
      console.log('FUCK :: ', $els.affixAside.data('offset-top'));
      var toTop = $els.affixAside.offset().top - 32;
      $els.affixAside.data('offset-top', toTop);
        console.log('NOW :: ', $els.affixAside.data('offset-top'));
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

  var _calculateBottomPadding = function () {
    var footerHeight = $els.splitContainerBottom.outerHeight();
    $('body').css('padding-bottom', footerHeight);
  };

  var _checkWidthAndMoveSummary = function () {

    if($(window).width() > 991) {
      // desktop view
      $els.splitContainerBottom.addClass('invisible');

      // move summary block to sidebar
      $els.splitContainerContent.detach().appendTo($els.splitContainerDesktop);

      // move 'checkout' & 'refresh' buttons to sidebar summary
      $els.splitContainerButtons.detach().appendTo($els.splitContainerDesktop);
      $els.splitContainerBottom.addClass('invisible');
    } else {
      // mobile view
      $els.splitContainerBottom.removeClass('invisible');

      // move summary block to top of page
      $els.splitContainerContent.detach().appendTo($els.splitContainerMobile);

      // move 'checkout' & 'refresh' buttons to fixed bottom nav
      $els.splitContainerButtons.detach().appendTo($els.splitContainerBottom);
      $els.splitContainerBottom.removeClass('invisible');
    }

    _calculateBottomPadding();
  };

  return {
    init: init
  };

})();
