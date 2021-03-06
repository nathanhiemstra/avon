$( document ).ready( function () {

  if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0) {
    /* Microsoft Internet Explorer detected, add class to document. */
    $("html").addClass("isIE");
  }





  ////////////////////////////////////////////////////////
  // VARIABLES
  ////////////////////////////////////////////////////////

  var selectors = {
    main: "#avon-poc",
    triggers: {
      drawerOrderSummary: ".trigger-drawer-order-summary",
      drawerItemEntry: ".trigger-drawer-item-entry",

    },
    yourOrder: {
      offers: {
        list: '#your-order-offers',
        details: '#your-order-offer-details',
        showDetails: '.view-offer-details',
        hideDetails: '.back-to-all-offers'
      }
    },
    drawers: {
      all: '[data-toggle="drawer"]',
      demoToggle: '[data-toggle="drawer-demo"]',
      itemEntry: ".drawer-item-entry",
      orderSummary: ".drawer-order-summary",
    },
    datePicker: {
      trigger: ".lt-calendar",
      target: ".demo-datepicker-from-angular"
    },
    tooltips: '[data-toggle="tooltip"]',
    myContacts: {
      affix: '.page--contacts-detail [data-spy="affix"]'
    },
    contactsList: {
      affix: '.page--contacts-list [data-spy="affix"]'
    },
    modals: {
      all: '.modal'
    }

  };

  var $objects = {
    window: $( window ),
    document: $( document ),
    html: $( 'html' ),
    body: $( 'body' ),
    globalHeader: $( '.global-header' ),
    main: $( selectors.main ),
    triggers: {
      drawerOrderSummary: $( selectors.main ).find( selectors.triggers.drawerOrderSummary ),
      drawerItemEntry: $( selectors.main ).find( selectors.triggers.drawerItemEntry )
    },
    yourOrder: {
      offers: {
        list: $( selectors.main ).find( selectors.yourOrder.offers.list ),
        details: $( selectors.main ).find( selectors.yourOrder.offers.details ),
        showDetails: $( selectors.main ).find( selectors.yourOrder.offers.showDetails ),
        hideDetails: $( selectors.main ).find( selectors.yourOrder.offers.hideDetails )
      }
    },
    drawers: {
      all: $( selectors.drawers.all ),
      demoToggle: $( selectors.drawers.demoToggle ),
      orderSummary: $( selectors.main ).find( selectors.drawers.orderSummary ),
      itemEntry: $( selectors.main ).find( selectors.drawers.itemEntry )
    },
    modals: {
      all: $( selectors.modals.all )
    },
    datePicker: {
      trigger: $( selectors.main ).find( selectors.datePicker.trigger ),
      target: $( selectors.main ).find( selectors.datePicker.target )
    },
    tooltips: $( selectors.main ).find( selectors.tooltips )
    // backDrop: $(selectors.backDrop)
  };

  var mobileOrTablet = navigator.userAgent.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i);


  ////////////////////////////////////////////////////////
  // FUNCTIONS
  ////////////////////////////////////////////////////////


  function checkModalScrollable( modal ) {
    var $modal = $(modal);
    var $container = $(modal).find('.modal-body');
    var containerHeight = $container.innerHeight();
    var contentHeight = $container.prop('scrollHeight');

    // If the modal has scrolling content, add a border to the footer,
    if ( contentHeight > containerHeight ) {
      $modal.addClass('modal-scrollable');
    } else {
      $modal.removeClass('modal-scrollable');
    }
  }

  function toggleDrawer( clickedItem ) {
    var targetId = $( clickedItem ).attr( 'href' ) || $( clickedItem ).data( 'target' );
    var targetEl = $( targetId );
    var isDrawerTypeHidden = targetEl.hasClass( 'drawer-hidden' );
    var isExpanded = targetEl.hasClass( 'drawer-expanded' );
    var hideBackdrop = targetEl.hasClass( 'drawer-transparent-backdrop' );

    var backdropAdded = $( '.drawer-backdrop' ).length;
    var backdropDiv;

    if( backdropAdded ) {
      $( '.drawer-backdrop' ).remove();
    } else {
      backdropDiv = $( '<div class="drawer-backdrop in" href="' + targetId + '"></div>' ).appendTo( $objects.globalHeader );
    }

    if(hideBackdrop) {
      $('.drawer-backdrop').addClass('transparent');
      $('.drawer-backdrop').off().on('click', function(e) {
        toggleDrawer($(this));
      });
    }

    // if(!hideBackdrop) $objects.html.toggleClass( 'drawer-open' );

    if( isDrawerTypeHidden ) {
      // backdropDiv.toggleClass('fade').toggleClass('in');
      if( isExpanded ) {
        setTimeout( function () {
          // completely hide after delay
          targetEl.css( 'opacity', 0 );
        }, 500 );
      } else {
        targetEl.css( 'opacity', 1 );
      }
    }
    targetEl.toggleClass( 'drawer-expanded' );

  }

  function tooltipInit() {
    $objects.tooltips.tooltip();
  }

  // YOUR OFFERS
  function yourOrderOffersShowDetails() {
    $objects.yourOrder.offers.list.addClass( 'hide' );
    $objects.yourOrder.offers.details.removeClass( 'hide' );
  }

  function yourOrderOffersHideDetails() {
    $objects.yourOrder.offers.list.removeClass( 'hide' );
    $objects.yourOrder.offers.details.addClass( 'hide' );
  }


  function toggleDatePicker( itemClicked ) {
    var $parent = $( itemClicked ).parents( '.form-group' );
    var $target = $parent.find( selectors.datePicker.target );
    $target.toggleClass( 'd-none' );
  }




  ////////////////////////////////////////////////////////
  // LISTENERS
  ////////////////////////////////////////////////////////

  $objects.modals.all.on('shown.bs.modal', function ( e ) {
    checkModalScrollable( this );
  })

  $objects.drawers.all.on( "click", function () {
    toggleDrawer( $( this ) );
  } );

  $objects.drawers.demoToggle.on( "click", function ( e ) {
    var targetId = $( this ).data( 'target' );
    $( targetId ).toggleClass( 'hidden' );
  } );

  $( '[data-tab-select]' ).on( 'change', function ( e ) {
    var $optionSelected = $( "option:selected", this );
    $optionSelected.tab( 'show' );
  } );

  // LOADER BUTTONS DEMO
  $( '.btn-loader' ).on( 'click', function () {
    var $this = $( this );
    $this.button('loading');
    $this.addClass( 'loading' );
    setTimeout( function () {
      $this.addClass('loaded');
      setTimeout(function() {
        $this.removeClass('loading loaded');
        $this.button('reset');
        $('#item-entry-line-number').val('').focus();
      }, 1500);
    }, 2500 );
  } );

  // necessary to prevent form submitting and allow our button animation demo
  $( ".form-item-entry" ).submit( function ( e ) {
    e.preventDefault();
  } );



  // YOUR OFFERS
  $objects.yourOrder.offers.showDetails.on( "click", function () {
    yourOrderOffersShowDetails();
  } );

  $objects.yourOrder.offers.hideDetails.on( "click", function () {
    yourOrderOffersHideDetails();
  } );

  // DATEPICKER
  $objects.datePicker.trigger.on( "click", function ( e ) {
    toggleDatePicker( this );
  } );

  // ITEM ENTRY
  var $itemEntryLineNum = $( '#item-entry-line-number' );

  $itemEntryLineNum.on( 'keyup', function ( e ) {

    // return if selection is made within input
    var selection = window.getSelection().toString();
    if( selection !== '' ) {
      return;
    }

    // return if arrow keys are pressed
    if( $.inArray( event.keyCode, [ 38, 40, 37, 39 ] ) !== -1 ) {
      return;
    }

    var $this = $( this );
    var input = $this.val();

    input = input.replace( /[\W\s\._\-]+/g, '' );

    var split = 1,
      chunk = [];

    for( var i = 0, len = input.length; i < len; i += split ) {
      split = ( i >= 3 && i <= 7 ) ? 3 : 3;
      chunk.push( input.substr( i, split ) );
    }

    $this.val( function () {
      return chunk.join( "-" ).toUpperCase();
    } );

    if( this.value.length == this.maxLength ) {
      $( '#item-entry-quantity' ).select();
      $( '#item-entry-quantity' )[0].selectionStart = 0;
      $( '#item-entry-quantity' )[0].selectionEnd = $( '#item-entry-quantity' ).val().length;
      $( '#item-entry-campaign' ).removeAttr( 'disabled' );
      $( '#item-entry-btn-add-future' ).removeAttr( 'disabled' );
      $( '#item-entry-btn-add' ).removeAttr( 'disabled' );
    }

  } );


  // POPOVERS
  $( '[data-toggle="popover"]:not(#popover-cart):not([data-popover-modal-combo])' ).popover();

  // TOOLTIPS
  tooltipInit();

  // SPLIT CONTENT
  $( '[data-split-content]' ).contentSplit();

  // handle cart popover and add a custom class for styling
  var cartPopover = $( "#popover-cart" );

  if( cartPopover.length ) {
    $( "#popover-cart" )
      .popover( {
        html: true,
        content: function () {
          var id = $( this ).attr( 'id' );
          return $( '#' + id + '-content' ).html();
        }
      } )
      .data( 'bs.popover' )
      .tip()
      .addClass( 'popover--box popover--noshadow' );

    // hide cart popover on body click
    $( 'body' ).on( 'click', function ( e ) {
      if( $( e.target ).data( 'toggle' ) !== 'popover' &&
        $( e.target ).parents( '.popover.in' ).length === 0 ) {
        $( '#popover-cart' ).popover( 'hide' );
      }
    } );
  }

  // Check to see if we have an 'auto-height' sticky footer
  // If so, we need some padding on <body>
  var stickyFooter = $( '.navbar-fixed-bottom--auto-height' );
  var hasStickyFooter = stickyFooter.length;
  var stickyFooterHeight = 0;

  if( hasStickyFooter ) {
    var footerHeight = stickyFooter.outerHeight();
    $( 'body' ).css( 'padding-bottom', footerHeight );
  }



  // Expand / Collpase All functoinality for accordions
  // Usage: 1) add 'data-toggle-all' attribute to a button or link on a page with
  // accordions 2) profit
  $( 'a[data-toggle-all="accordion"]' ).on( 'click', function ( e ) {
    e.preventDefault();
    if( $( this ).hasClass( 'expand-all' ) ) {
      $( this ).removeClass( 'expand-all' ).addClass( 'hide-all' ).text( 'Hide all' );
      $( '.panel-collapse' ).addClass( 'in' ).css( 'height', 'auto' );
      $( 'a[data-toggle="collapse"]' ).removeClass( 'collapsed' );
    } else {
      $( this ).removeClass( 'hide-all' ).addClass( 'expand-all' ).text( 'Expand all' );
      $( '.panel-collapse' ).removeClass( 'in' ).css( 'height', '0' );
      $( 'a[data-toggle="collapse"]' ).addClass( 'collapsed' );
    }
  } );


  // Add new account modal radio button shows 'add new account' content
  $( '#select-account-modal-add-new' ).on( 'change', function () {
    if( this.checked ) {
      $( '#select-account-modal-add-new-details' ).removeClass( 'd-none' );
    }
  } );
  $( '#select-account-modal-existing-1' ).on( 'change', function () {
    if( this.checked ) {
      $( '#select-account-modal-add-new-details' ).addClass( 'd-none' );
    }
  } );



  // Check to see if there's scrollable tab nav on the page
  // if so, let's init the js
  if( $( '#scrollableTabsNav' ).length ) NavTabsScrollable.init();

  // Print links
  var printLinks = $('.print-link');
  if(printLinks.length) {
    printLinks.on('click', function(e) {
      // check for expand all button
      var expandBtn = $('.expand-all');
      if(expandBtn.length) {
        expandBtn.trigger('click');
      }
      setTimeout(function() {
        window.print();
      }, 0);
    });
  }

  // Progress Steps
  $('[multi-step-progress]').progressSteps({
    currentStep: 1
  });

  // selectpicker
  if(mobileOrTablet) {
    // if mobile or tablet, enable native select for selectpicker
    $('.selectpicker').selectpicker('mobile');
  }

  // prevent title pop up on hover (override default browser behavior)
  $('.selectpicker').on('loaded.bs.select', function (e) {
    var selectPickerBtns = $('.bootstrap-select').find('button');

    selectPickerBtns.mouseover(function () {
      $this = $(this);
      $this.data('title', $this.attr('title'));
      $this.attr('title', '');
    }).mouseout(function () {
        $this = $(this);
        $this.attr('title', $this.data('title'));
    });
  });

  // radio select combos
  $('.radio-select-combo').on('click', function() {
    var $radio = $(this).find('input[type="radio"]');
    var $collapse = $('#collapse-cc-details');

    // check the radio button if selectpicker clicked
    $radio.prop('checked', true);

    // show credit card details
    if($collapse.length && !$collapse.hasClass('in')) {
      $collapse.collapse('show');
    }
  });

  // scroll expanded accordion items into view
  $('.panel-collapse').on('shown.bs.collapse', function (e) {
    var $panel = $(this).closest('.panel');
    var panelPos = $panel.offset().top;
    var scrollPos = $(document).scrollTop();
    // if the top of the panel is out of frame, scroll into view
    if(panelPos < scrollPos) {
      $('html,body').animate({
        scrollTop: $panel.offset().top
      }, 200);
    }
  });

  // My Contacts affix buttons
  if($(selectors.myContacts.affix).length) {
    var affix = $(selectors.myContacts.affix);
    var affixContainer = affix.parent();
    var toTop = affix.offset().top;
    affixContainer.css({
      'min-width': '1px',
      'height': affix.height()
    });
    affix.data('offset-top', toTop);
  }

  // Contact list afftx buttons
  if($(selectors.contactsList.affix).length) {
    var affix = $(selectors.contactsList.affix);
    var affixContainer = affix.parent();
    var toTop = affix.offset().top;
    affixContainer.css({
      'min-width': '1px',
      'height': affix.height()
    });
    affix.data('offset-top', toTop);
  }


  // INIT OTHER DEMO SCRIPTS
  if( typeof BackToTop !== 'undefined' ) BackToTop.init();
  if( typeof Brochures !== 'undefined' ) Brochures.init();
  if( typeof CheckoutDemo !== 'undefined' ) CheckoutDemo.init();
  if( typeof ContactsDemo !== 'undefined' ) ContactsDemo.init();
  if( typeof ContactOrderHistory !== 'undefined' ) ContactOrderHistory.init();
  if( typeof FormDemo !== 'undefined' ) FormDemo.init();
  if( typeof GlobalSearch !== 'undefined' ) GlobalSearch.init();
  if( typeof OnilinePresence !== 'undefined' ) OnilinePresence.init();
  if( typeof Pagination !== 'undefined' ) Pagination.init();
  if( typeof ProductDetail !== 'undefined' ) ProductDetail.init();
  if( typeof ProductFilters !== 'undefined' ) ProductFilters.init();
  if( typeof SecondaryNav !== 'undefined' ) SecondaryNav.init();
  if( typeof Register !== 'undefined' ) Register.init();
  if( typeof YourOrderCartsTab !== 'undefined' ) YourOrderCartsTab.init();
  if( typeof dashboardDemo !== 'undefined' ) dashboardDemo.init();
  if( typeof PopoverCustomizer !== 'undefined' ) PopoverCustomizer.init();
  if( typeof Modals !== 'undefined' ) Modals.init();
  if( typeof MessageCenter !== 'undefined' ) MessageCenter.init();
  if( typeof Sticky !== 'undefined' ) Sticky.init();
  if( typeof TogglePasswordVisibility !== 'undefined' ) TogglePasswordVisibility.init();
  if( typeof NbaDrawer !== 'undefined' ) NbaDrawer.init();
  if( typeof VibeContacts !== 'undefined' ) VibeContacts.init();
  if( typeof UserEditable !== 'undefined' ) UserEditable.init();


} );
