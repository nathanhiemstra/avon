/**
 * ProductDetail - scripts related to the product detail page
 * @return {init} [description]
 */


var ProductDetail = ( function () {

  var $els = {};

  // public methods
  var init = function () {

    // initilize tabCollapse - converts tabs and tab panes to accordion on mobile
    $( '#pdpTabs' ).tabCollapse();

    // grab the DOM els we need
    $els = {
      socialIcons: $( '#pdp-imgs__social' ),
      socialIconsContainerDesktop: $( '#pdp-imgs__social-desktop' ),
      socialIconsContainerMobile: $( '#pdp-imgs__social-mobile' ),
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

  var test = function(param) {
    // console.log('show modal instead of dropdown :: ', param);
    if($(window).width() < 768) {
      // console.log('show the modal version');
    } else {
      // console.log('show the normal dropdown');
    }
  };

  // private methods
  var _addListeners = function () {

    $els.customerSelectInput.on('focus', function() {
      $els.customerSelectTrigger.off();
      // test('open');
    });
    $els.customerSelectTrigger.on( 'click', _handleDropdownClick );

    // Customer input select auto-complete - https://github.com/devbridge/jQuery-Autocomplete
    $els.customerSelectInput.autocomplete( {
      // serviceUrl: '/autocomplete/data/somepath', // ajax
      lookup: FAKE_CUSTOMER_DATA, // no ajax, just a js object located in fakeData.js
      onSelect: function ( suggestion ) {
        // console.log('You selected: ' + suggestion.value);
        // _handleItemEntrySelection(this, suggestion);
        $( this ).val( suggestion.value );
        console.log('focus on the next input');
        $('#item-entry-line-number').focus().select();
      },
      formatResult: function ( suggestion, currentVal ) {
        return _constructItemTemplate( suggestion );
      },
      onHide: function (e) {
        console.log('on hide');
        // re-add click listener on down arrow
        setTimeout(function() {
          console.log('readd events');
          $els.customerSelectTrigger.off().on( 'click', _handleDropdownClick );
        }, 100);
        test('close');
      },
      beforeRender: function ( container, suggestions ) {
        // only show 'view all results' button if we have suggestions
        if( suggestions.length ) {
          $( container )
            .append(
              '<a id="autocomplete-add-customer-link" class="link-primary" data-toggle="modal" data-target="#add-new-customer-modal">Add a new customer<span class="lt-icon lt-plus lt-medium"></span></a>'
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
      maxHeight: 244,
      showNoSuggestionNotice: false,
      noSuggestionNotice: 'Sorry, nothing matches that query',
      triggerSelectOnValidInput: false,
      preserveInput: true
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
