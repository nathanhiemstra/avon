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
      viewOffersLink:     $('[data-target="#product-offers-modal"]'),
      offersModalBackBtn: $('#offers-modal-back-btn'),
      offersModal:        $('#product-offers-modal'),
      quickShopModal:     $('#quick-shop-modal'),
    };

    _addListeners();
  };

  // private methods
  var _addListeners = function () {

    $els.viewOffersLink.on('click touchstart', function(e) {
      _handleOffersModalOpen();
    });

    $els.offersModalBackBtn.on('click touchstart', function(e) {
      _handleOffersModalOpen();
    });

  };

  // If Quick Shop modal is open, close Quick Shop and open Offers modal with back button visible
  // If Quick Ship modal is not open, Offers modal displays without back button
  var _handleOffersModalOpen = function() {

    var quickShopIsOpen = ($els.quickShopModal.data('bs.modal') || {}).isShown;
    var offersIsOpen = ($els.offersModal.data('bs.modal') || {}).isShown;

    if(quickShopIsOpen) {
      console.log('quick shop OPEN');
      // close Quick Shop modal
      $els.quickShopModal.modal('hide');

      // show back button in offers modal
      $els.offersModalBackBtn.css('display', 'block');

    } else {
      console.log('quick shop NOT OPEN');

      // hide back button in offers modal
      $els.offersModalBackBtn.css('display', 'none');
    }

    if(offersIsOpen) {
      console.log('offers OPEN');
      // close Quick Shop modal
      $els.offersModal.modal('hide');

      // show quick shop modal
      $els.quickShopModal.modal('show');
    }
    // if(quickShopIsOpen && modalSwitchInProgress) {
    //
    //   console.log('Quick Shop is open -- hide and show offers');
    //   // close Quick Shop modal
    //   $els.quickShopModal.modal('hide');
    //
    //   // After modal finishes closing
    //   $els.quickShopModal.on('hidden.bs.modal', function() {
    //     console.log('open = true ----- modal done hiding');
    //     quickShopIsOpen = false;
    //     modalSwitchInProgress = true;
    //
    //     // open Offers modal
    //     $els.offersModal.modal('show');
    //
    //     // show back button in Offers modal
    //     $els.offersModalBackBtn.css('display', 'block');
    //   });
    // } else {
    //   console.log('open = false');
    //   // hide back button in Offers modal
    //   $els.offersModalBackBtn.css('display', 'none');
    // }
  };

  // When modal opens move filters into it
  // var _moveMarkupToModal = function() {
  //   $els.form.detach().appendTo($els.containerModal)
  // };

  // When modal closes move back to default location
  // var _moveMarkupOutOfModal = function() {
  //   $els.form.detach().appendTo($els.containerDesktop)
  // };


  // var _updateBadgeCount = function(itemClicked) {
  //
  //   // Find out how many checkboxes are checked
  //   var $parent = $(itemClicked).parents('.form-group');
  //   var $badge = $('.badge',$parent );
  //   var checkedCount = $( "input:checked" ,$parent).length;
  //
  //   // Update number in badge
  //   $badge.text( checkedCount );
  //   if ( checkedCount == 0 ) {
  //     $badge.addClass('d-none');
  //   } else {
  //     $badge.removeClass('d-none');
  //   }
  // };

  // var _preventCollapsedForDesktop = function(e) {
  //
  //   // See if we're at "mobile" width by testing if this icon is visible
  //   var numberOfVisibeIcons = $('.aside-product-filters .filter-collapse--icon:eq(0):visible').length;
  //
  //   // If we're wider than mobile width, prevent collapse
  //   if (numberOfVisibeIcons == 0) {
  //     e.preventDefault();
  //   }
  // }

  // var _cleanupCollapsedForDesktop = function(itemCollpsed) {
  //   // Remove inline style height:0 so if browser window is widened past mobile, checkboxes in a collapsed become visible
  //   $(itemCollpsed).css( "height", "" );
  // }


  return {
    init: init
  };

})();
