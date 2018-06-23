/**
 * ProductDetail - scripts related to the product detail page
 * @return {init} [description]
 */


var ProductDetail = ( function () {

  var $els = {};
  var customerDropSelectedIndex = 0;

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

    // This, for some reason, breaks focus functionality on customer select on ios
    // It doesn't open the mobile customer select on initial focus
    // $els.customerSelectInput.focus();
    // $els.customerSelectInput[0].selectionStart = 0;
    // $els.customerSelectInput[0].selectionEnd = $els.customerSelectInput.val().length;
    var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent ) && !window.MSStream;
    var focusedElement;

    if(iOS) {
      console.log('IOS IOS IOS');
    }

    $els.customerSelectInput.on( 'focus', function () {
      $( 'html,body' ).scrollTop( 0 );
      $els.customerSelectTrigger.off();
      if( focusedElement == this ) return; //already focused, return so user can now place cursor at specific point in input.
      focusedElement = this;
      setTimeout( function () {
        if(iOS) {
          $els.customerSelectInput[0].selectionStart = 0;
          $els.customerSelectInput[0].selectionEnd = $els.customerSelectInput.val().length;
        } else {
          focusedElement.select();
        }
      }, 50 ); //select all text in any field on focus for easy re-entry. Delay sightly to allow focus to "stick" before selecting.
    } ).on( 'blur', function () {
      focusedElement = null;
    } );

    // $els.customerSelectInput.on( 'focus', function () {
    //   $('html,body').scrollTop(0);
    //   $els.customerSelectTrigger.off();
    // } );
    $els.customerSelectTrigger.on( 'click', _handleDropdownClick );

    // Customer input select auto-complete - https://github.com/devbridge/jQuery-Autocomplete
    $els.customerSelectInput.autocomplete( {
      // serviceUrl: '/autocomplete/data/somepath', // ajax
      lookup: FAKE_CUSTOMER_DATA, // no ajax, just a js object located in fakeData.js
      onSelect: function ( suggestion ) {
        customerDropSelectedIndex = $( '.autocomplete-suggestion:contains(' + suggestion.value + ')' ).attr(
          'data-index' );
        $( this ).val( suggestion.value );
        $( '#item-entry-line-number' ).focus().select();
      },
      formatResult: function ( suggestion, currentVal ) {
        return _constructItemTemplate( suggestion );
      },
      onHide: function ( e ) {
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

        if( $( window ).width() < 768 ) {
          $( 'body' ).addClass( 'modal-open' );
        }

        // add a class to the previously selected item
        $( '.autocomplete-suggestions' ).find( '[data-index="' + customerDropSelectedIndex + '"]' ).addClass(
          'selected' );

        // only show 'view all results' button if we have suggestions
        if( suggestions.length ) {
          $( container )
            .append(
              '<div class="autocomplete-suggestion-footer"><a id="autocomplete-add-customer-link" class="link-primary" data-toggle="modal" data-target="#add-new-customer-modal">Add a new customer<span class="lt-icon lt-plus lt-medium"></span></a></div>'
            );

          // hide suggestions when apended link is clicked
          $( '#autocomplete-add-customer-link' ).on( 'click', function ( e ) {
            e.preventDefault();
            $els.customerSelectInput.autocomplete( 'hide' );
          } );
        } else {
          $( container )
            .find( '.autocomplete-suggestion:last-of-type' )
            .css( 'padding-bottom', 0 );
        }

        // a new modal trigger was just created, let's tell everyone about it
        setTimeout( function () {
          $( document ).trigger( 'newModalsAvailable' );
        }, 0 );
      },
      appendTo: $els.autocompleteHost,
      showOnFocus: true,
      minChars: 0,
      maxHeight: $( window ).height(),
      showNoSuggestionNotice: true,
      noSuggestionNotice: 'Sorry, nothing matches that query',
      triggerSelectOnValidInput: false,
      preserveInput: true
    } );

  };


  // handle customer dropdown arrow click
  var _handleDropdownClick = function ( e ) {
    console.log( 'drop click' );
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
