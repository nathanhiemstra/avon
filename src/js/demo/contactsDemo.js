/**
 * ContactsDemo
 * @return {init} [description]
 */


var ContactsDemo = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      actionLinksDisableable: $('.page--contacts-list .action-items .disableable'),
      actionLinksToggleTrigger: $('.page--contacts-list #contact-list-toggle-all')
    };

    _addListeners();
  };

  // private methods
  var _addListeners = function () {

     $els.actionLinksToggleTrigger.change(function () {
      _actionLinksToggle();
    });

  };

  // Toggle disableable links
  var _actionLinksToggle = function( trigger ) {

    if ( $els.actionLinksToggleTrigger.prop('checked') == true ) {
      $els.actionLinksDisableable.removeClass( 'link-disable' );
    } else {
      $els.actionLinksDisableable.addClass( 'link-disable' );
    }
  };

  return {
    init: init
  };

})();
