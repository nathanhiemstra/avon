/**
 * ProductDetail - scripts related to the product detail page
 * @return {init} [description]
 */


var ProductDetail = (function () {

  var $els = {};
  var tempModalEvent = null;

  // public methods
  var init = function () {

    // initilize tabCollapse - converts tabs and tab panes to accordion on mobile
    $('#pdpTabs').tabCollapse();

    // grab the DOM els we need
    $els = {
      viewOffersLink:               $('[data-target="#product-offers-modal"]'),
      offersModalBackBtn:           $('#offers-modal-back-btn'),
      offersModal:                  $('#product-offers-modal'),
      quickShopModal:               $('#quick-shop-modal'),
      socialIcons:                  $('#pdp-imgs__social'),
      socialIconsContainerDesktop:  $('#pdp-imgs__social-desktop'),
      socialIconsContainerMobile:   $('#pdp-imgs__social-mobile'),
    };

    _addListeners();
    _cloneSocialIcons();
  };

  // private methods
  var _addListeners = function () {

    $els.viewOffersLink.on('click touchstart', function(e) {
      _handleOffersModalOpen();
    });

    $els.offersModalBackBtn.on('click touchstart', function(e) {
      _handleOffersModalOpen();
    });

    $els.offersModal.on('hidden.bs.modal', function (e) {
      // if Quick Shop modal is visible, back button was clicked, re-add 'modal-open' to body
      if( ($els.quickShopModal.data('bs.modal') || {}).isShown ) {
        // wait for Quick Shop modal to be shown, then add 'modal-open' to body
        $els.quickShopModal.on('shown.bs.modal', function(e) {
          $('body').addClass('modal-open');
        });
      }
    });

  };

  // When page loads, make copy of icons in other part of markup for mobile view.
  // Couldn't acvieve this with CSS
  var _cloneSocialIcons = function() {
    $els.socialIcons.clone().appendTo($els.socialIconsContainerMobile).addClass('visible-xs mt-5');
  };

  // If Quick Shop modal is open, close Quick Shop and open Offers modal with back button visible
  // If Quick Ship modal is not open, Offers modal displays without back button
  var _handleOffersModalOpen = function() {

    tempModalEvent = null;

    var quickShopIsOpen = ($els.quickShopModal.data('bs.modal') || {}).isShown;
    var offersIsOpen = ($els.offersModal.data('bs.modal') || {}).isShown;

    if(quickShopIsOpen) {
      // hijack offers modal
      $els.offersModal.off('show.bs.modal');
      // close Quick Shop modal
      $els.quickShopModal.modal('hide');
      // wait for hidden, then show offers modal
      tempModalEvent = $els.quickShopModal.on('hidden.bs.modal', function(e) {
        $els.offersModal.modal('show');
      });
      // show back button in offers modal
      $els.offersModalBackBtn.css('display', 'block');

    } else {
      // hide back button in offers modal
      $els.offersModalBackBtn.css('display', 'none');
    }

    if(offersIsOpen) {
      // close Offers modal
      $els.offersModal.modal('hide');
      // show Quick Shop modal
      $els.quickShopModal.modal('show');
    }
  };

  return {
    init: init
  };

})();
