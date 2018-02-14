/**
 * Brochures - handles all brochure view behavior
 * @return {init} [description]
 */

console.log('Hello'); 

var ProductFilters = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      filterCheckboxes: $('.aside-product-filters .checkbox'),
    };

    console.log('init'); 

    _addListeners();
  };

  // private methods
  var _addListeners = function () {

    $els.filterCheckboxes.on('click', function() {
      _updateBadgeCount(this);
    });

  };

  var _updateBadgeCount = function(itemClicked) {
    console.log('itemClicked: ',itemClicked); 
  };


  return {
    init: init
  };

})();



