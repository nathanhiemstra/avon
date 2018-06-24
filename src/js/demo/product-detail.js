/**
 * ProductDetail - scripts related to the product detail page
 * @return {init} [description]
 */


var ProductDetail = ( function () {

  var $els = {};
  var customerDropSelectedValue = '';
  var focusedElement;

  // public methods
  var init = function () {

    // initilize tabCollapse - converts tabs and tab panes to accordion on mobile
    $( '#pdpTabs' ).tabCollapse();

    // grab the DOM els we need
    $els = {
      socialIcons: $( '#pdp-imgs__social' ),
      socialIconsContainerDesktop: $( '#pdp-imgs__social-desktop' ),
      socialIconsContainerMobile: $( '#pdp-imgs__social-mobile' ),
      customerSelectContainer: $( '.customer-select-autocomplete' ),
      customerSelectInput: $( '#pdpCustomerSelect' ),
      customerSelectTrigger: $( '#pdpCustomerSelect + .form-control-feedback' ),
      autocompleteHost: $( '#pdpCustomerSelect' ).closest( '.form-group' )
    };

    $( '#pdp-images .carousel-inner a' ).click( function ( e ) {
      $( '#product-image img' ).attr( 'src', $( this ).data( 'src' ) )
    } );

    _addListeners();
    _cloneSocialIcons();
  };

  // private methods
  var _addListeners = function () {

    // get current value for input
    // DEV NOTE :: demo only, this will be different in production
    //          :: we'll need to get the last customer shopped fof or
    //          :: default to current user (You)
    customerDropSelectedValue = 'You (Rosa Stone)';
    $els.customerSelectInput.val( customerDropSelectedValue );

    // This is desired functionality but breaks lots of things since
    // autocomplete relies on focus
    // $els.customerSelectInput.focus().select();

    $els.customerSelectInput.on( 'focus', function () {
      // be sure we're at the top - DEV NOTE :: this should only hgappen on Item Entry, not PDP
      // if( $( window ).width() < 768 ) {
      //   $( 'html,body' ).scrollTop( 0 );
      // }

      // turn off listeners on trigger
      $els.customerSelectTrigger.off();
      if( focusedElement == $els.customerSelectTrigger ) return; // already focused, return so user can now place cursor at specific point in input.
      focusedElement = $els.customerSelectTrigger;
      setTimeout( function () {
        $els.customerSelectInput.val( '' ).focus();
      }, 50 ); //select all text in any field on focus for easy re-entry. Delay sightly to allow focus to "stick" before selecting.

    } ).on( 'blur', function () {
      focusedElement = null;
    } );

    $els.customerSelectTrigger.on( 'click', _handleDropdownClick );

    // Customer input select auto-complete - https://github.com/devbridge/jQuery-Autocomplete
    $els.customerSelectInput.autocomplete( {
      // serviceUrl: '/autocomplete/data/somepath', // ajax
      lookup: FAKE_CUSTOMER_DATA, // no ajax, just a js object located in fakeData.js
      onSelect: function ( suggestion ) {
        // save the selected value, fall back to default and set
        customerDropSelectedValue = suggestion.value;
        if( !customerDropSelectedValue ) customerDropSelectedValue = 'You (Rosa Stone)';
        // set the input value to selected
        $els.customerSelectInput.val( customerDropSelectedValue );

        if( $( '#item-entry-line-number' ).length ) {
          // move focus to line number and highlight
          $( '#item-entry-line-number' ).focus().select();
          // select on ios
          $( '#item-entry-line-number' )[ 0 ].selectionStart = 0;
          $( '#item-entry-line-number' )[ 0 ].selectionEnd = $( '#item-entry-line-number' ).val().length;
        }

      },
      formatResult: function ( suggestion, currentVal ) {
        return _constructItemTemplate( suggestion );
      },
      onHide: function ( e ) {
        // set the selected item
        $els.customerSelectInput.val( customerDropSelectedValue );

        // re-add click listener on down arrow
        setTimeout( function () {
          $els.customerSelectTrigger.off().on( 'click', _handleDropdownClick );
        }, 100 );
        $els.customerSelectContainer.removeClass( 'autocomplete-open' );
        $( 'body' ).removeClass( 'modal-open' );
      },
      beforeRender: function ( container, suggestions ) {
        // add a class to the container
        $els.customerSelectContainer.addClass( 'autocomplete-open' );

        // add a class to the body on mobile to prevent bg scrolling
        if( $( window ).width() < 768 ) {
          $( 'body' ).addClass( 'modal-open' );
        }

        // add a class to the previously selected item
        $( '.autocomplete-suggestions' ).find( '.autocomplete-suggestion:contains("' +
          customerDropSelectedValue + '")' ).addClass(
          'selected' );

        // append 'add a customer' button if we have suggestions
        $( container )
          .append(
            '<div class="autocomplete-suggestion-footer"><a id="autocomplete-add-customer-link" class="link-primary" data-toggle="modal" data-target="#add-new-customer-modal">Add a new customer<span class="lt-icon lt-plus lt-medium"></span></a></div>'
          );

        // hide suggestions when apended link is clicked
        $( '#autocomplete-add-customer-link' ).on( 'click', function ( e ) {
          e.preventDefault();
          $els.customerSelectInput.autocomplete( 'hide' );
        } );

        // a new modal trigger was just created, let's tell everyone about it
        setTimeout( function () {
          $( document ).trigger( 'newModalsAvailable' );
        }, 0 );
      },
      appendTo: $els.autocompleteHost,
      width: $els.autocompleteHost.width(),
      showOnFocus: true,
      minChars: 0,
      maxHeight: $( window ).height(),
      showNoSuggestionNotice: true,
      noSuggestionNotice: '<h6>No matches for that name</h6><p>Please check your entry and try again, or add a new customer below.</p>',
      triggerSelectOnValidInput: true,
      preserveInput: true,
      autoSelectFirst: true,
      tabDisabled: true
    } );

  };


  // handle customer dropdown arrow click
  var _handleDropdownClick = function ( e ) {
    e.preventDefault();
    $els.customerSelectTrigger.off();
    $els.customerSelectInput.focus();
  };

  // When page loads, make copy of icons in other part of markup for mobile view.
  // Couldn't acvieve this with CSS
  var _cloneSocialIcons = function () {
    $els.socialIcons.clone().appendTo( $els.socialIconsContainerMobile ).addClass( 'visible-xs mt-5' );
  };

  // construct the html for predictive search template
  var _constructItemTemplate = function ( suggestion ) {
    return '<div class="item">' +
      '<a href="javascript:void(0)">' +
      '<div class="row">' +
      '<div class="col col-xs-12">' +
      '<p class="title m-0">' + suggestion.value + '</p>' +
      '</div>' +
      '</div>' +
      '</a>' +
      '</div>';
  };

  return {
    init: init
  };

} )();
