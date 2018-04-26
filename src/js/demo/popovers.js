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
      popoverAnchorCombo: $('[data-popover-anchor-combo="true"]')
    };

    _addListeners();
  };



  // private methods
  var _addListeners = function () {

    $els.popoverAnchorCombo.on('click', function(e) {
      var windowWidth = $( window ).width();
      var mobileWidth = 768;

       // TABLET / DESKTOP
      if ( windowWidth > mobileWidth ) {

        // Prevent default anchor behavior (email or call)
        event.preventDefault();

        // Trigger popover
        // Note: This popover is not triggered like others with a normal click because because in the markeup we use: data-trigger="manual"
        _showPopover(this);
      }
    });

    // Since we're opening the popover programatically, we must close it programatically
    $els.popoverAnchorCombo.focusout(function( e ) {
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
