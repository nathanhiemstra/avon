/**
 * ProductFilters
 * @return {init} [description]
 */


//   $('body').on('click', function (e) {
//     //only buttons
//     if ($(e.target).data('toggle') !== 'popover'
//         && $(e.target).parents('.popover.in').length === 0) { 
//         $('.popover-email-combo').popover('hide');
//     }
//     //buttons and icons within buttons
//     /*
//     if ($(e.target).data('toggle') !== 'popover'
//         && $(e.target).parents('[data-toggle="popover"]').length === 0
//         && $(e.target).parents('.popover.in').length === 0) { 
//         $('[data-toggle="popover"]').popover('hide');
//     }
//     */
// });


var EmailSms = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      popoverEmailCombo: $('.popover-email-combo')
    };

    _addListeners();
  };



  // private methods
  var _addListeners = function () {


    $els.popoverEmailCombo.on('click', function(e) {

      var windowWidth = $( window ).width();
      var mobileWidth = 768;

      if ( windowWidth < mobileWidth ) {

        // MOBILE
        // Trigger email
        var address = $( this ).data( 'email' );
        _sendEmail(address);

      } else {

        // TABLET / DESKTOP
        _showPopover(this);
      }

    });


    $els.popoverEmailCombo.focusout(function( e ) {
      _hidePopover(this);
    });

  };


  // FUNCTIONS
  
  var _showPopover = function( itemClicked) {
    $(itemClicked).popover('show');
  };

  var _hidePopover = function( itemClicked) {
    $(itemClicked).popover('hide');
  };

  var _sendEmail = function( address ) {
    window.location.href = 'mailto:' + address;
  };



  return {
    init: init
  };

})();





$('body').on('click', function (e) {

  console.log('e: ',e); 
  console.log('$(e.target): ',$(e.target).parent()); 
    //only buttons
    // if ($(e.target).data('toggle') !== 'popover') { 
    //     $('[data-toggle="popover"]').popover('hide');
    // }
    //buttons and icons within buttons
    /*
    if ($(e.target).data('toggle') !== 'popover'
        && $(e.target).parents('[data-toggle="popover"]').length === 0
        && $(e.target).parents('.popover.in').length === 0) { 
        $('[data-toggle="popover"]').popover('hide');
    }
    */
});