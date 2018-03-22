/**
 * Modals - scripts related to modals
 *        - includes functionality for modal switching / navigation bewtween
 *        - modals
 * @return {init} [description]
 */


var Modals = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      body: $('body'),
      modalTriggers: $('[data-toggle="modal"]')
    };

    _addListeners();
  };



  // private methods
  var _addListeners = function () {

    $els.modalTriggers.on('click', function (e) {
      _handleModalOpen(e);
    });

  };



  var _handleModalOpen = function (e) {

    var modalOpen = false;

    // loop through all modals and check if ANY are open
    $.each($els.modalTriggers, function (i, val) {
      var target = $(this).data('target');
      var targetData = $(target).data('bs.modal');

      // return if no data, we're done here
      if (!targetData) return;

      // if there's a visible modal, take note
      if ((targetData || {}).isShown) {
        modalOpen = true;
      }
    });

    // if there's a modal already open, let's handle the switch
    if (modalOpen) _handleModalSwitch(e);

  };



  var _handleModalSwitch = function (e) {

    // loop through triggers
    $.each($els.modalTriggers, function (i, val) {
      var curTarget = $(this).data('target');
      var destTarget = $(e.target).data('target');
      var $curTarget = $(curTarget);
      var $destTarget = $(destTarget);
      var curTargetData = $curTarget.data('bs.modal');
      var destHasBackButton = $destTarget.find('[data-direction="back"]').length;

      // check if shown
      if ((curTargetData || {}).isShown) {
        // hide current
        $curTarget.modal('hide');
        // wait for current to be hidden
        $curTarget.on('hidden.bs.modal', function (e) {
          // wait for destination modal to be shown, then update body class
          $destTarget.on('shown.bs.modal', function (e) {
            $els.body.addClass('modal-open');
          });
        });

        // if destination modal has a back button, set it's target to the modal
        // currently being closed
        if (destHasBackButton) {
          $destTarget.find('[data-direction="back"]').attr('data-target', curTarget);
        }
      }
    });
  };



  return {
    init: init
  };

})();
