/**
 * BackToTop - handles all 'back to top' button behavior
 * @return {init} [description]
 */

var BackToTop = ( function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      button: $( '.btn-back-to-top' )
    };

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    $( window ).scroll( _checkScroll );
    $els.button.on( 'click', _handleClick );

  };

  var _checkScroll = function ( e ) {
    var winHeight = $( window ).height();

    if( $( this ).scrollTop() > winHeight ) {
      $els.button.removeClass( 'invisible' );
    } else {
      $els.button.addClass( 'invisible' );
    }
  };

  var _handleClick = function ( e ) {
    e.preventDefault();
    $( 'html' ).animate( { scrollTop: 0 }, 300 );
  };

  return {
    init: init
  };

} )();
