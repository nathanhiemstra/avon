/**
 * VibeContacts
 * @return {init} [description]
 */

var VibeContacts = (function() {
  var $els = {};
  var detailsHidden;
  var $currentTab;

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
      detailItemsEditBtns: $('.page--contacts-detail .contact-detail-list .item-edit'),
      detailItemsCancelBtns: $('.page--contacts-detail .contact-detail-list .btn-cancel'),
      detailItemsSaveBtns: $('.page--contacts-detail .contact-detail-list .btn-save'),
      customSalesTaxRadio: $('.page--contacts-detail .sales-tax-radio'),
      customSalesTaxInput: $('.page--contacts-detail #salesTaxCustomPercent'),
      headerHr: $('.page--contacts-detail > .container--page > hr'),
      followUpsCollapseTrigger: $('#mc-follow-ups [data-toggle="collapse"]'),
      followUpsCollapse: $('#followUpsCompletedItems')
    };

    detailsHidden = $els.contactDetails.hasClass('d-none');
    $currentTab = $($('.navbar-secondary .list-group-item.active a').attr('href'));

    _addListeners();
  };

  // private methods
  var _addListeners = function() {
    // DEV NOTE :: This is unfortunate but we need to hide the <hr> in the header only when
    //          :: tab pane contains a 'header button' and screen is tablet landscape
    // hide the header <hr> when there's a header button in the tab pane
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
      var href = $(e.target).attr('href');
      $currentTab = $(href);

      _checkHeaderHr($currentTab);
    });

    _checkHeaderHr($currentTab);
    $(window).on('resize', function() {
      _checkHeaderHr($currentTab);
    });

    // Follow-ups completed items collapse
    $els.followUpsCollapse.on('show.bs.collapse', function(e) {
      $els.followUpsCollapseTrigger.find('.lt-expand-circle').addClass('d-none');
      $els.followUpsCollapseTrigger.find('.lt-collapse-circle').removeClass('d-none');
    });
    $els.followUpsCollapse.on('hide.bs.collapse', function(e) {
      $els.followUpsCollapseTrigger.find('.lt-expand-circle').removeClass('d-none');
      $els.followUpsCollapseTrigger.find('.lt-collapse-circle').addClass('d-none');
    });

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

    // Custom sales tax radio button
    $els.customSalesTaxRadio.on('change', function(e) {
      if($(this).find(':checked').attr('id') === 'salesTaxCustom') {
        $els.customSalesTaxInput.prop('disabled', false);
        $els.customSalesTaxInput.select().focus();
      } else {
        $els.customSalesTaxInput.prop('disabled', true);
      }
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

  var _checkHeaderHr = function(tab) {
    var windowWidth = $(window).width();
    var isTabletPortrait = windowWidth >= 768 && windowWidth < 1024;
    var hasHeaderBtn = tab.find('.btn-header').length;

    if(hasHeaderBtn) {
      if(isTabletPortrait) {
        $els.headerHr.addClass('invisible');
      } else {
        $els.headerHr.removeClass('invisible');
      }
    } else {
      $els.headerHr.removeClass('invisible');
    }
  };

  return {
    init: init
  };
})();
