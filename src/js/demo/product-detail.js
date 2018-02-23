/**
 * ProductDetail - scripts related to the product detail page
 * @return {init} [description]
 */


var ProductDetail = (function () {

  var $els = {};

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
  };

  // private methods
  var _addListeners = function () {

    $( document ).ready(function() {
        _cloneSocialIcons();
    });

    $els.viewOffersLink.on('click touchstart', function(e) {
      _handleOffersModalOpen();
    });

    $els.offersModalBackBtn.on('click touchstart', function(e) {
      _handleOffersModalOpen();
    });

  };



  // When page loads, make copy of icons in other part of markup. Couldn't acvieve this with CSS
  var _cloneSocialIcons = function() {
    $els.socialIcons.clone().appendTo($els.socialIconsContainerMobile)
    
  };



  // If Quick Shop modal is open, close Quick Shop and open Offers modal with back button visible
  // If Quick Ship modal is not open, Offers modal displays without back button
  var _handleOffersModalOpen = function() {

    var quickShopIsOpen = ($els.quickShopModal.data('bs.modal') || {}).isShown;
    var offersIsOpen = ($els.offersModal.data('bs.modal') || {}).isShown;

    if(quickShopIsOpen) {
      // close Quick Shop modal
      $els.quickShopModal.modal('hide');
      // show back button in offers modal
      $els.offersModalBackBtn.css('display', 'block');

    } else {
      // hide back button in offers modal
      $els.offersModalBackBtn.css('display', 'none');
    }

    if(offersIsOpen) {
      // close Quick Shop modal
      $els.offersModal.modal('hide');
      // show quick shop modal
      $els.quickShopModal.modal('show');
    }
  };

  return {
    init: init
  };

})();
