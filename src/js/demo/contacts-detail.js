/**
 * VibeContacts
 * @return {init} [description]
 */

var VibeContacts = (function() {
  var $els = {};
  var detailsHidden;

  // public methods
  var init = function() {
    // grab the DOM els we need
    $els = {
      editContactBtn: $('.page--contacts-detail .edit-contact-btn'),
      editContactValue: $('.page--contacts-detail .edit-contact-value'),
      editContactForm: $('.page--contacts-detail .edit-contact-form'),
      editContactCancelBtn: $('.page--contacts-detail .edit-contact-cancel'),
      editContactSaveBtn: $('.page--contacts-detail .edit-contact-save'),
      contactDetails: $('.page--contacts-detail .contact-details'),
      detailItemsEditBtns: $('.page--contacts-detail .contact-detail-table .item-edit'),
      detailItemsCancelBtns: $('.page--contacts-detail .contact-detail-table .btn-cancel'),
      detailItemsSaveBtns: $('.page--contacts-detail .contact-detail-table .btn-save')
    };

    detailsHidden = $els.contactDetails.hasClass('d-none');

    _addListeners();
  };

  // private methods
  var _addListeners = function() {
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

    // detail edit buttons
    $els.detailItemsEditBtns.on('click', function(e) {
      var $this = $(this);
      var $form = $this.siblings('.item-edit-form');
      var $firstInput = $($form.find('input')[0]);
      console.log($firstInput);
      // toggle element visiblilty
      $this.addClass('invisible');
      $this.siblings('.item-content').addClass('d-none');
      $form.removeClass('d-none');
      // focus input
      if($firstInput.length) $firstInput.select().focus();
    });

    $els.detailItemsCancelBtns.on('click', function() {
      var $parent = $(this).closest('.contact-detail-item');
      // toggle element visiblilty
      $parent.find('.item-edit').removeClass('invisible');
      $parent.find('.item-content').removeClass('d-none');
      $parent.find('.item-edit-form').addClass('d-none');
    });

    $els.detailItemsSaveBtns.on('click', function() {
      var $parent = $(this).closest('.contact-detail-item');
      // toggle element visiblilty
      $parent.find('.item-edit').removeClass('invisible');
      $parent.find('.item-content').removeClass('d-none');
      $parent.find('.item-edit-form').addClass('d-none');

      _handleSaveEdit();
    });
  };

  var _handleEditContact = function() {
    $els.editContactBtn.addClass('d-none');
    $els.editContactValue.addClass('d-none');
    $els.editContactForm.removeClass('d-none');
    $els.editContactForm.find('input:first-of-type').select().focus();

    // hide details on edit if visible
    if (!detailsHidden) {
      $els.contactDetails.addClass('d-none');
    }
  };

  var _handleCancelEdit = function() {
    $els.editContactBtn.removeClass('d-none');
    $els.editContactValue.removeClass('d-none');
    $els.editContactForm.addClass('d-none');

    // show details on cancel edit if visible before
    if (!detailsHidden) {
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
