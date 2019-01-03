/**
 * OnilinePresence
 * @return {init} [description]
 */


var OnilinePresence = (function () {

  var $els = {};
  var isEnrolledRadioChecked;


  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      isInProgress:                 $('.page--online-presence .item--let-find-me .enroll-item--in-progress'),
      isEnrolled:                   $('.page--online-presence .item--let-find-me .enroll-item--enrolled'),
      isNotEnrolled:                $('.page--online-presence .item--let-find-me .enroll-item--not-enrolled'),
      enrollmentStartTrigger:       $('.page--online-presence .item--let-find-me .enroll-item--start-enrollment-trigger'),
      enrollmentCancelTrigger:      $('.page--online-presence .item--let-find-me .user-editable--cta-cancel'),
      enrollmentSaveTrigger:        $('.page--online-presence .item--let-find-me .user-editable--cta-save'),
      enrollRadio:                  $('.page--online-presence #online-presence-enrollment-status-enrolled'),
      enrollStatusContainer:        $('.page--online-presence .item--let-find-me  .enrollment-status--container'),
      userEditableLetMeFindTrigger: $('.page--online-presence .item--let-find-me .user-editable--cta-edit'),
    };

    _addListeners();
    _unenroll();
  };

  // private methods

  ////////////////////////////////////////////
  // LISTENERS
  ////////////////////////////////////////////

  var _addListeners = function () {

    // START ENROLLMENT
    $els.enrollmentStartTrigger.on('click', function() {
      _startEnrollment();
    });

    // CANCEL
    $els.enrollmentCancelTrigger.on('click', function() {

      // Are we enrolled?
      if ( $els.enrollStatusContainer.hasClass('is-enrolled') ) {
        _enroll();

        // Set the radio back to what it was
        $els.enrollRadio.prop("checked", true);
      } else {
        _unenroll();

        // Set the radio back to what it was
        $els.enrollRadio.prop("checked", false);
      }
    });

    // SAVE
    $els.enrollmentSaveTrigger.on('click', function() {
      _getEnrolledRadioChecked();
      if ( isEnrolledRadioChecked ) {
        _enroll();
      } else {
        _unenroll();
      }
    });

  };


  ////////////////////////////////////////////
  // FUNCTIONS
  ////////////////////////////////////////////

  // RECORED CURRENT ENROLLED STATE
  var _getEnrolledRadioChecked = function() {
     // Is the radio "Enrolled" checked?
    isEnrolledRadioChecked = $els.enrollRadio.prop("checked");
    return isEnrolledRadioChecked;
  }


  // RESET
  var _resetEnrolled = function() {

    // Hide "Not Enrolled" stuff
    $els.isNotEnrolled.addClass('d-none');

    // Hide "In Progress" stuff
    $els.isInProgress.addClass('d-none');

    // Hide "Enrolled" stuff
    $els.isEnrolled.addClass('d-none');

  }

  // UNENROLL
  var _unenroll = function() {
    _resetEnrolled();

    // Show "Not Enrolled" stuff
    $els.isNotEnrolled.removeClass('d-none');

    // Add this so we'll know what to do if they click CANCEL
    $els.enrollStatusContainer.removeClass('is-enrolled');
  };

  // START ENROLLMENT
  var _startEnrollment = function() {
    _resetEnrolled();

    // Show "In Progress" stuff
    $els.isInProgress.removeClass('d-none');

    // Assume this is the first time they're enrolling and:
    // 1. Switch to "edit" mode.
    $els.userEditableLetMeFindTrigger.trigger('click');

    // 2. Set make hidden "Enroll" radio button checked
    $els.enrollRadio.prop("checked", true);

  };

  // ENROLL
  var _enroll = function() {
    _resetEnrolled();

     // Show "Enrolled" stuff
    $els.isEnrolled.removeClass('d-none');

    // Add this so we'll know what to do if they click CANCEL
    $els.enrollStatusContainer.addClass('is-enrolled');

  };

  return {
    init: init
  };

})();
