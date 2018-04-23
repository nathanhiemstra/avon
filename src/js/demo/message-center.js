/**
 * MessageCenter - Demo js for Message Center page
 * @return {init} [description]
 */


var MessageCenter = (function () {

  var $els = {};
  var msgReadClass = 'reverse-bg'; // class that will be added to 'read' items

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      msgItems: $('.container--msg-center').find('.msg-center-messages [data-toggle="collapse"]')
    };

    _addListeners();
  };

  // private methods
  var _addListeners = function () {
    $els.msgItems.on('show.bs.collapse', function() {
      $(this).parent().removeClass(msgReadClass);
    });
    $els.msgItems.on('hide.bs.collapse', function() {
      $(this).parent().addClass(msgReadClass);
    });
  };

  return {
    init: init
  };

})();
