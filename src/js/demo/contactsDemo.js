/**
 * ContactsDemo
 * @return {init} [description]
 */


var ContactsDemo = (function () {

  var $els = {};
  var autoCompleteDropSelectedValue = '';
  var autoCompleteInputId = '#autocomplete-contact-list';
  var autoCompleteMaxHeight;

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      actionLinksDisableable:   $('.page--contacts-list .action-items .disableable'),
      actionLinksToggleTrigger: $('.page--contacts-list #contact-list-toggle-all'),
      autoCompleteInput:        $( autoCompleteInputId ),
      autoCompleteCloseTrigger: $( autoCompleteInputId + '+ .lt-close' ),
      autoCompleteContainer:    $( autoCompleteInputId ).closest( '.autocomplete-container' ),
      autoCompleteParent:       $( autoCompleteInputId ).closest( '.autocomplete-container' ).parent()
    };

    _addListeners();
  };

  ///////////////////////////////////
  // LISTENERS
  ///////////////////////////////////

  // private methods
  var _addListeners = function () {

    // ACTION LINKS
    $els.actionLinksToggleTrigger.change(function () {
      _actionLinksToggle();
    });

    // AUTO COMPLETE
    if( $( window ).width() < 768 ) {
      autoCompleteMaxHeight = $( window ).height() - $('.modal-header').outerHeight(true) - $('.contact-list-autocomplete > .input-group').outerHeight(true) - 15;
    } else {
      autoCompleteMaxHeight = 256;
    }
    // get current value for input
    // DEV NOTE :: demo only, this will be different in production
    autoCompleteDropSelectedValue = 'Ms. Happyfancy';
    $els.autoCompleteInput.val( autoCompleteDropSelectedValue );
    $els.autoCompleteInput.on( 'focus', function () {
      // be sure we're at the top
      if( $( window ).width() < 768 ) {
        $( 'html,body' ).scrollTop( 0 );
      }
      // clear input on focus
      $els.autoCompleteInput.val('');
    } ).on( 'blur', function () {
      // $els.autoCompleteInput.autocomplete('hide');
    } );

    // NOTE :: for demo only, in production with real data, this button will show and hide when autocoimplete is open
    $els.autoCompleteCloseTrigger.css('display', 'none');

    // Customer input select auto-complete - https://github.com/devbridge/jQuery-Autocomplete
    $els.autoCompleteInput.autocomplete( {
      // serviceUrl: '/autocomplete/data/somepath', // ajax
      lookup: FAKE_CUSTOMER_DATA, // no ajax, just a js object located in fakeData.js
      onSelect: function ( suggestion ) {
        // save the selected value, fall back to default and set
        autoCompleteDropSelectedValue = suggestion.value;
        if( !autoCompleteDropSelectedValue ) autoCompleteDropSelectedValue = 'Ms. Happyfancy';
        // set the input value to selected
        $els.autoCompleteInput.val( autoCompleteDropSelectedValue );
      },
      formatResult: function ( suggestion, currentVal ) {
        return _constructItemTemplate( suggestion );
      },
      onHide: function ( e ) {
        // set the selected item
        $els.autoCompleteInput.val( autoCompleteDropSelectedValue );
        // remove class on container
        $els.autoCompleteContainer.removeClass( 'autocomplete-open' );
        // remove class on body
        $( 'body' ).removeClass( 'modal-open' );
      },
      beforeRender: function ( container ) {
        // add a class to the container
        $els.autoCompleteContainer.addClass( 'autocomplete-open' );
        // add a class to the body on mobile to prevent bg scrolling
        if( $( window ).width() < 768 ) {
          $( 'body' ).addClass( 'modal-open' );
        }
        // add a class to the previously selected item
        $( '.autocomplete-suggestions' ).find( '.autocomplete-suggestion:contains("' +
          autoCompleteDropSelectedValue + '")' ).addClass(
          'selected' );

        // NOTE :: we shouldn't need the below in this treatment but leaving for now just in case
        // append button if we have suggestions
        // $( container )
        //   .append(
        //     '<div class="text-center autocomplete-suggestion-footer"><a href="#" id="autocomplete-footer-cta" class="link-primary">View all results</a></div>'
        //   );

        // hide suggestions when apended link is clicked
        // $( '#autocomplete-footer-cta' ).on( 'click', function ( e ) {
        //   e.preventDefault();
        //   $els.autoCompleteInput.autocomplete( 'hide' );
        // } );

        // a new modal trigger was just created, let's tell everyone about it
        // setTimeout( function () {
        //   $( document ).trigger( 'newModalsAvailable' );
        // }, 0 );
      },
      appendTo: $els.autoCompleteContainer,
      width: $els.autoCompleteParent.outerWidth(true),
      minChars: 0,
      maxHeight: autoCompleteMaxHeight,
      showNoSuggestionNotice: true,
      noSuggestionNotice: '<h6>No matches for that name</h6><p>Please check your entry and try again.</p>',
      triggerSelectOnValidInput: true,
      autoSelectFirst: true
      // showOnFocus: false,
      // autoSelectFirst: true,
      // preserveInput: true,
      // tabDisabled: true
    } );

  };

  ///////////////////////////////////
  // FUNCTIONS
  ///////////////////////////////////

  // Toggle disableable links
  var _actionLinksToggle = function( trigger ) {

    if ( $els.actionLinksToggleTrigger.prop('checked') == true ) {
      $els.actionLinksDisableable.removeClass( 'link-disable' );
    } else {
      $els.actionLinksDisableable.addClass( 'link-disable' );
    }
  };

  // AUTOCOMPLETE
   // handle customer dropdown arrow click
  // var _handleDropdownClick = function ( e ) {
  //   e.preventDefault();
  //   $els.autoCompleteOpenTrigger.off();
  //   $els.autoCompleteInput.focus();
  // };



// construct the html for predictive search template

// NOTE: Alternative ways teh avatar might look:
// <span class="avatar">T</span>
// <span class="avatar avatar--color-1">T</span>

  var _constructItemTemplate = function ( suggestion ) {
    return '<div class="item">' +
      '<a href="javascript:void(0)">' +
      '<div class="row">' +
      '<div class="col col-xs-12">' +
      '<span class="avatar mr-3"><img src="/images/fpo/img_avatar_square.png"></span>' +
      '<span class="title m-0">' + suggestion.value + '</span>' +
      '</div>' +
      '</div>' +
      '</a>' +
      '</div>';
  };





  return {
    init: init
  };

})();
