/**
 * Modals - scripts related to modals
 *        - includes functionality for modal switching / navigation bewtween
 *        - modals
 * @return {init} [description]
 */


var Modals = ( function () {

  var $els = {};
  var breadcrumbs = [];

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      body: $( 'body' ),
      modalTriggers: $( '[data-toggle="modal"]' ),
      modalPopoverCombos: $( '[data-popover-modal-combo]' ),
      copyInputBtns: $('.copy-input-btn')
    };

    _addListeners();
  };



  // private methods
  var _addListeners = function () {

    $els.modalTriggers.on('click', function(e) {
      _handleModalOpen(e);
    });

    if( $els.modalPopoverCombos.length ) {
      _updateDataToggles();
      $( window ).resize( function () {
        _updateDataToggles();
      } );
      $els.copyInputBtns.on('click', _checkTarget);
    }

    $els.modalPopoverCombos.on( 'show.bs.popover', function () {
      $( this ).addClass( 'open' );
    } );

    $els.modalPopoverCombos.on( 'hide.bs.popover', function () {
      $( this ).removeClass( 'open' );
    } );

    $( document ).on( 'newModalsAvailable', function ( e ) {
      // console.log('newModalsAvailable');
      // turn off the event
      $( document ).off( 'newModalsAvailable' );
      // new dynamically created modal triggers are available - let's reset
      init();
    } );

    // reset video source to prevent play / pause nonsense
    $( '#product-video' ).on( 'hidden.bs.modal', function () {
      var video = $( this ).find( "iframe" );
      var videoSrc = video.attr( "src" );
      video.attr( "src", "" );
      video.attr( "src", videoSrc );
    } );

    // If product video modal is triggered by nav dot, manually call slide-to
    // This is necessary because we can't have multiple data-target attrs
    $( '#product-video' ).on( 'show.bs.modal', function ( e ) {
      var $trigger = $( e.relatedTarget );
      var $carousel = $trigger.closest( '.carousel' );
      var slideTo = $trigger.data( 'slide-to' );
      $carousel.carousel( slideTo );
    } );

  };

  var _checkTarget = function ( e ) {
    var $target = $( e.target );
    var hasPopover = $target.closest( '.popover' ).length;
    var isTrigger = $target.closest( '[data-toggle="popover"]' ).length;
    var isCopyBtn = $target.hasClass('copy-input-btn');

    if(isCopyBtn) {
      e.preventDefault();
      var $input = $target.closest('form').find('input[readonly]');
      _copyInputToClipboard($target, $input);
    } else if(isTrigger || hasPopover) {
      return;
    } else {
      $els.modalPopoverCombos.popover( 'hide' );
    }

  };

  var _copyInputToClipboard = function(target, inputEl) {
    var valToCopy = inputEl.select();
    document.execCommand('copy');

    // Update button class and text
    target.addClass('btn-success').html('Copied!');
    setTimeout(function() {
      target.removeClass('btn-success').html('Copy');
    }, 3000);

  };

  var _updateDataToggles = function () {
    var windowWidth = $( window ).width();
    var mobileWidth = 940; // note: this must match sass var $breakpoint-header

    if( windowWidth > mobileWidth ) {
      // TABLET / DESKTOP - add popover in place of modal
      $els.modalPopoverCombos.attr( 'data-toggle', 'popover' );
      $els.modalPopoverCombos.popover()
        .data( 'bs.popover' )
        .tip()
        .addClass( 'popover--box popover--noshadow' );

      // add listener on document so we can close popover on click outside
      $( document ).on( 'click', _checkTarget );

    } else {
      // MOBILE - add modal in place of popover
      $els.modalPopoverCombos.attr( 'data-toggle', 'modal' );
      $els.modalPopoverCombos.popover( 'destroy' );

      // clean up document listener
      $( document ).unbind( 'click', _checkTarget );
    }
  };

  var _showPopover = function ( itemClicked ) {
    $( itemClicked ).popover( 'show' );
  };

  var _hidePopover = function ( itemClicked ) {
    $( itemClicked ).popover( 'hide' );
  };

  var _handleModalOpen = function ( e ) {

    var modalOpen = false;

    // loop through all modals and check if ANY are open
    $.each( $els.modalTriggers, function ( i, val ) {
      var target = $( this ).data( 'target' );
      var targetData = $( target ).data( 'bs.modal' );

      // return if no data, we're done here
      if( !targetData ) return;

      // if there's a visible modal, take note
      if( ( targetData || {} ).isShown ) {
        modalOpen = true;
      }
    } );

    // if there's a modal already open, let's handle the switch
    if( modalOpen ) _handleModalSwitch( e );

  };

  var _handleModalSwitch = function ( e ) {
    // console.log( 'Modal is nested' );
    // loop through triggers
    $.each( $els.modalTriggers, function ( i, val ) {
      var curTarget = $( this ).data( 'target' );
      var destTarget = $( e.currentTarget ).data( 'target' );
      var destTargetDt = $( e.currentTarget ).data( 'target-desktop' );
      var $curTarget = $( curTarget );
      var $destTarget = $( destTarget );
      var curTargetData = $curTarget.data( 'bs.modal' );
      var direction = $( e.currentTarget ).data( 'direction' );
      var movingBack = false;
      var destHasBackButton = $destTarget.find( '[data-direction="back"]' ).length;

      // check if shown
      if( ( curTargetData || {} ).isShown ) {

        // hide current
        $curTarget.modal( 'hide' );

        // handle breadcrumbs
        if( direction !== 'back' ) {
          // going deeper, add a breadcrumb
          breadcrumbs.push( curTarget );
          movingBack = false;
        } else {
          // going back, remove a breadcrumb
          breadcrumbs.pop();
          movingBack = true;
        }

        // wait for current to be hidden
        $curTarget.on( 'hidden.bs.modal', function ( e ) {
          // clean up nested classes
          $curTarget.removeClass( 'nested' );
          // wait for destination modal to be shown, then update body class
          $destTarget.on( 'shown.bs.modal', function ( e ) {
            $els.body.addClass( 'modal-open' );
          } );
        } );

        // we're launching a modal from a modal so let's add a class to the target
        $destTarget.on( 'show.bs.modal', function ( e ) {
          // if moving back to first item in breadcrumb, don't add nested class
          if( movingBack && breadcrumbs.length < 2 ) return;
          // otherwise, add nested class
          $destTarget.addClass( 'nested' );
        } );

        // if destination modal has a back button, set it's target based on breadcrumbs
        if( destHasBackButton ) {
          backTarget = breadcrumbs[ breadcrumbs.length - 1 ];
          $destTarget.find( '[data-direction="back"]' ).attr( 'data-target', backTarget );
        }

      }
    } );
  };



  return {
    init: init
  };

} )();
