/**
 * ProductFilters
 * @return {init} [description]
 */


  // function sendEmail(address) {

  //   // Trigger message
  //   window.location.href = 'mailto:' + address;
  // }




  // $(".popover-email-combo").on( "click", function ( e ) {

  //   var width = $( window ).width();
  //   // If we're on mobile, suppress the popover and just trigger the email. 
  //   if ( width > 768 ) {
  //       $(this).popover('show');
  //   } else {
  //     var address = $( this ).data( 'email' );
  //     // console.log('address: ',address); 
  //     sendEmail(address);
  //   }
    

  // } );




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

      if ( windowWidth > mobileWidth ) {
        // If we're on mobile send email
        var address = $( this ).data( 'email' );
        _sendEmail(address);
      } else {
        // If we're on tablet or desktop show popover
        _showPopover(this);
      }

    });
  };

  // FUNCTIONS
  
  var _showPopover = function( itemClicked) {
    $(itemClicked).popover('show');
  };

  var _sendEmail = function( address ) {
    window.location.href = 'mailto:' + address;
  };



  return {
    init: init
  };

})();
