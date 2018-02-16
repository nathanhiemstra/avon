/**
 * Brochures - handles all brochure view behavior
 * @return {init} [description]
 */


var ProductFilters = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      filterCheckboxes: $('.aside-product-filters .checkbox-group :checkbox'),
      checkboxGroup:    $('.aside-product-filters .checkbox-group'),
      collapseBody:     $('.aside-product-filters .filter-collapse--body'),
      modal:            $('.aside-product-filters #product-filter-modal'),
      containerDesktop: $('.aside-product-filters #product-filter-container'),
      containerModal:   $('.aside-product-filters #product-filter-modal .modal-body'),
      form:             $('.aside-product-filters #product-filters-form'),
    };

    _addListeners();
  };

  // private methods
  var _addListeners = function () {
    
    // Before modal begin to open
    $els.modal.on('show.bs.modal', function() {
      _moveMarkupToModal();
    })

    // After modal finishes closing
    $els.modal.on('hidden.bs.modal', function() {
      _moveMarkupOutOfModal();
    });

    $els.collapseBody.on('show.bs.collapse', function (e) {
      _preventCollapsedForDesktop(e);
    });

    $els.checkboxGroup.on('click', function() {
      _updateBadgeCount(this);
    });

    
    // Before show begins
    $els.collapseBody.on('show.bs.collapse', function (e) {
      _preventCollapsedForDesktop(e);
    });

    // Before collapse begins
    $els.collapseBody.on('hide.bs.collapse', function (e) {
      _preventCollapsedForDesktop(e);
    });

    // After collapse finished
    $els.collapseBody.on('hidden.bs.collapse', function () {
      _cleanupCollapsedForDesktop(this);
    });

  };

  // When modal opens move filters into it
  var _moveMarkupToModal = function() {
    $els.form.detach().appendTo($els.containerModal)
  };

  // When modal closes move back to default location
  var _moveMarkupOutOfModal = function() {
    $els.form.detach().appendTo($els.containerDesktop)
  };


  var _updateBadgeCount = function(itemClicked) {
    
    // Find out how many checkboxes are checked
    var $parent = $(itemClicked).parents('.form-group');
    var $badge = $('.badge',$parent );
    var checkedCount = $( "input:checked" ,$parent).length;
    
    // Update number in badge
    $badge.text( checkedCount );
    if ( checkedCount == 0 ) {
      $badge.addClass('d-none');
    } else {
      $badge.removeClass('d-none');
    }
  };

  var _preventCollapsedForDesktop = function(e) {

    // See if we're at "mobile" width by testing if this icon is visible
    var numberOfVisibeIcons = $('.aside-product-filters .filter-collapse--icon:eq(0):visible').length;
    
    // If we're wider than mobile width, prevent collapse
    if (numberOfVisibeIcons == 0) {
      e.preventDefault();
    }
  }
  
  var _cleanupCollapsedForDesktop = function(itemCollpsed) {
    // Remove inline style height:0 so if browser window is widened past mobile, checkboxes in a collapsed become visible
    $(itemCollpsed).css( "height", "" );
  }


  return {
    init: init
  };

})();

