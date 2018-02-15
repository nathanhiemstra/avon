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
      collapseBody:     $('.aside-product-filters .filter-collapse--body')
    };

    _addListeners();
  };

  // private methods
  var _addListeners = function () {
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

  var _updateBadgeCount = function(itemClicked) {
    
    // Find out how many checkboxes are checked
    var $parent = $(itemClicked).parents('.form-group');
    var $badge = $('.badge',$parent );
    var checkedCount = $( "input:checked" ,$parent).length;
    
    // Update number in badge
    $badge.text( checkedCount );
    if ( checkedCount == 0 ) {
      $badge.addClass('hidden-xs');
    } else {
      $badge.removeClass('hidden-xs');
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

