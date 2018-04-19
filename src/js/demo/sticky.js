/**
 * Sticky - makes items stick to the top of the page
 * @return {init} [description]
 */


var Sticky = (function () {


  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      stickyTarget: $('.alert-page-level.alert-dismissable'),
      closeTrigger: $('.alert-page-level.alert-dismissable .close')
    };

    // Variables
    var stickyTargetOffset = $els.stickyTarget.offset();
    var stickyTargetOffsetTop = stickyTargetOffset.top;

    _addListeners(stickyTargetOffsetTop);
  };

  // private methods
  var _addListeners = function (stickyTargetOffsetTop) {
    
    window.onscroll = function() { _toggleSticky(stickyTargetOffsetTop) };
  
    $els.closeTrigger.on('click', function(e) {
     var _dsimissAlert(this);
    });


  };

  


  // Toggle sticky class
  var _toggleSticky = function(stickyTargetOffsetTop) {
    // TODO: figure out why "stickyTargetOffsetTop" isn't available globally right here and why I have to pass it into this fucntion.
    if (window.pageYOffset >= stickyTargetOffsetTop) {
      $els.stickyTarget.addClass("sticky");
    } else {
      $els.stickyTarget.removeClass("sticky");
    }
  };


  // Dismiss alert
  var _dsimissAlert = function(itemClicked) {
    // TODO find out what is triggering the close an preventing the animation
    $(itemClicked).addClass("collapsed");
  };



  return {
    init: init
  };

})();
