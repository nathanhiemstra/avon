/**
 * VibeContacts
 * @return {init} [description]
 */


var VibeContacts = (function () {

  var $els = {};
  var detailsHidden;

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      editContactBtn: $('.edit-contact-btn'),
      editContactValue: $('.edit-contact-value'),
      editContactForm: $('.edit-contact-form'),
      editContactCancelBtn: $('.edit-contact-cancel'),
      editContactSaveBtn: $('.edit-contact-save'),
      contactDetails: $('.contact-details')
    };

    detailsHidden = $els.contactDetails.hasClass('d-none');

    _addListeners();
  };

  // private methods
  var _addListeners = function () {

    // edit button
    $els.editContactBtn.on('click', function(e) {
      e.preventDefault();
      _handleEditContact();
    });

    // cancel button
    $els.editContactCancelBtn.on('click', function(e) {
      e.preventDefault();
      _handleCancelEdit();
    });

    // save button
    $els.editContactSaveBtn.on('click', function(e) {
      e.preventDefault();
      _handleSaveEdit();
    });
  };

  var _handleEditContact = function() {
    $els.editContactBtn.addClass('d-none');
    $els.editContactValue.addClass('d-none');
    $els.editContactForm.removeClass('d-none');
    $els.editContactForm.find('input:first-of-type').select().focus();

    // hide details on edit if visible
    if(!detailsHidden) {
      $els.contactDetails.addClass('d-none');
    }
  };

  var _handleCancelEdit = function() {
    $els.editContactBtn.removeClass('d-none');
    $els.editContactValue.removeClass('d-none');
    $els.editContactForm.addClass('d-none');

    // show details on cancel edit if visible before
    if(!detailsHidden) {
      $els.contactDetails.removeClass('d-none');
    }
  };

  var _handleSaveEdit = function() {
    console.log('DEV NOTE :: handle saving the edit here');
  };

  return {
    init: init
  };

})();
