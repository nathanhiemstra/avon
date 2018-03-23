/**
 * ProductFilters
 * @return {init} [description]
 */


var dashboard = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      changeWidgetTriggers:   $('.container--dashboard #widgets-my .change-widget-trigger'),
      changeWidgetGroup:      $('#carousel-select-widget-modal .widget-img'),
      myCurrentWidgetGroup:    $('.container--dashboard #widgets-my .widget-img'),
      selectWidgetTrigger:    $('#select-widget-modal #select-widget-trigger'),
      
      

    };

    _addListeners();
  };

  // private methods
  var _addListeners = function () {

  
    // $els.checkboxGroup.on('click', function() {
    //   _updateBadgeCount(this);
    // });


    // Click change widget trigger

    // Mark which of "My Widgets" is candidate for change

    // When "Select Widget" is clicked, find out which widget was chosen and update 

    // Update the "candidate" widget wit teh selected widget

  };

  // When modal opens move filters into it
  // var _moveMarkupToModal = function() {
  //   $els.form.detach().appendTo($els.containerModal)
  // };

  // // When modal closes move back to default location
  // var _moveMarkupOutOfModal = function() {
  //   $els.form.detach().appendTo($els.containerDesktop)
  // };


  // var _updateBadgeCount = function(itemClicked) {

  //   // Find out how many checkboxes are checked
  //   var $parent = $(itemClicked).parents('.form-group');
  //   var $badge = $('.badge',$parent );
  //   var checkedCount = $( "input:checked" ,$parent).length;

  //   // Update number in badge
  //   $badge.text( checkedCount );
  //   if ( checkedCount == 0 ) {
  //     $badge.addClass('d-none');
  //   } else {
  //     $badge.removeClass('d-none');
  //   }
  // };

  // var _preventCollapsedForDesktop = function(e) {

  //   // See if we're at "mobile" width by testing if this icon is visible
  //   var numberOfVisibeIcons = $('.aside-product-filters .filter-collapse--icon:eq(0):visible').length;

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
