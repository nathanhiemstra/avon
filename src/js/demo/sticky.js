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
      stickyTarget: $('.alert-level-header.alert-dismissable')
    };

    // Variables
    var stickyTargetOffset = $els.stickyTarget.offset();

    // if there's no target, we're done here
    if(!stickyTargetOffset) return;

    var stickyTargetOffsetTop = stickyTargetOffset.top;

    _addListeners(stickyTargetOffsetTop);
  };

  // private methods
  var _addListeners = function (stickyTargetOffsetTop) {
    window.onscroll = function() { _toggleSticky(stickyTargetOffsetTop) };
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



  return {
    init: init
  };

})();
