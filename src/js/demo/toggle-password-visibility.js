/**
 * BackToTop - handles all 'back to top' button behavior
 * @return {init} [description]
 */

var TogglePasswordVisibility = ( function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      toggleablePasswords: $( '[toggle-password-visibility]' )
    };
    _addListeners();
  };




  // private methods
  var _addListeners = function () {

    $els.toggleablePasswords.on('click', function () {
      _togglePasswordVisibility( this );
  
    });

  };

  var _togglePasswordVisibility = function ( clickedItem ) {

    var targetId = $(clickedItem).attr( 'toggle-password-visibility' );
    var $target = $('#' + targetId);
    if ( $target.is(":password") ){
        $target.prop('type', 'text');
    } else {
        $target.prop('type', 'password');
    }
    
  };



  return {
    init: init
  };

} )();
