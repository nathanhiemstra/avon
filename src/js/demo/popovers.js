/**
 * PopoverCustomizer
 * @return {init} [description]
 */



var PopoverCustomizer = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      popoverOverride: $('.popover-override')
    };

    _addListeners();
  };



  // private methods
  var _addListeners = function () {

    $els.popoverOverride.on('click', function(e) {

      var windowWidth = $( window ).width();
      var mobileWidth = 768;

       // TABLET / DESKTOP
      if ( windowWidth > mobileWidth ) {

        // Prevent default anchor behavior (email or call)
        event.preventDefault();

        // Trigger popover
        _showPopover(this);
      }

    });

    // Sincer we're opening the popover programaticall, we must close it programatically
    $els.popoverOverride.focusout(function( e ) {
      _hidePopover(this);
    });

  };


  // FUNCTIONS
  
  var _showPopover = function(itemClicked) {
    $(itemClicked).popover('show');
  };

  var _hidePopover = function(itemClicked) {
    $(itemClicked).popover('hide');
  };




  return {
    init: init
  };

})();




