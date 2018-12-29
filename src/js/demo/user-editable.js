/**
 * UserEditable
 * @return {init} [description]
 */


var UserEditable = (function () {

  var $els = {};
  var selector = {};

  // public methods
  var init = function () {

    console.log('Hello');

    // grab the DOM els we need

    selector = {
      itemContainer:          '.user-editable--item',
      savedContentContainer:  '.user-editable--content',
      editableContainer:      '.user-editable--editable'
    }

    $els = {
      savedContentContainer:    $('.user-editable--item ' + selector.savedContentContainer),
      editableContainer:        $('.user-editable--item ' + selector.editableContainer),
      editTrigger:              $('.user-editable--item .user-editable--cta-edit'),
      saveCancelTrigger:        $('.user-editable--item .user-editable--cta-save, .user-editable--item .user-editable--cta-cancel'),
    };

    _addListeners();
    _savedMode();
  };

  // private methods
  var _addListeners = function () {

    $els.editTrigger.on('click', function( e ) {
        _editableMode( this );
    });

    $els.saveCancelTrigger.on('click', function( e ) {
        _savedMode( this );
    });

  };


  // FUNCTIONS

  var _editableMode = function( itemClicked ) {
    var $parent = $( itemClicked ).parents( selector.itemContainer );
    var $editableContainer = $parent.find( selector.editableContainer );
    var $savedContainer = $parent.find( selector.savedContentContainer );
    $editableContainer.removeClass('d-none');
    $savedContainer.addClass('d-none');
  };

  var _savedMode = function( itemClicked ) {

    if ( itemClicked ) {
      // Put only the items into "Saved Mode" that are related to the button that was clicked
      var $parent = $( itemClicked ).parents( selector.itemContainer );
      var $editableContainer = $parent.find( selector.editableContainer );
      var $savedContainer = $parent.find( selector.savedContentContainer );
    }  else {
      // Put all items into "Saved Mode"
      var $editableContainer = $els.editableContainer;
      var $savedContainer = $els.savedContentContainer;
    }
    $editableContainer.addClass('d-none');
    $savedContainer.removeClass('d-none');
  };


  return {
    init: init
  };

})();
