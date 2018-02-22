$(document).ready(function () {

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
        list:         '#your-order-offers',
        details:      '#your-order-offer-details',
        showDetails:  '.view-offer-details',
        hideDetails:  '.back-to-all-offers'
      }
    },
    drawers: {
      all: '[data-toggle="drawer"]',
      demoToggle: '[data-toggle="drawer-demo"]',
      itemEntry: ".drawer-item-entry",
      orderSummary: ".drawer-order-summary",
    }
    // backDrop: ".drawer-backdrop"
  }
  var $objects = {
    window: $(window),
    document: $(document),
    html: $('html'),
    body: $('body'),
    globalHeader: $('.global-header'),
    main: $(selectors.main),
    triggers: {
      drawerOrderSummary: $(selectors.main).find(selectors.triggers.drawerOrderSummary),
      drawerItemEntry: $(selectors.main).find(selectors.triggers.drawerItemEntry)
    },
    yourOrder: {
      offers: {
        list:           $(selectors.main).find(selectors.yourOrder.offers.list),
        details:        $(selectors.main).find(selectors.yourOrder.offers.details),
        showDetails:    $(selectors.main).find(selectors.yourOrder.offers.showDetails),
        hideDetails:    $(selectors.main).find(selectors.yourOrder.offers.hideDetails)
      }
    },
    drawers: {
      all: $(selectors.drawers.all),
      demoToggle: $(selectors.drawers.demoToggle),
      orderSummary: $(selectors.main).find(selectors.drawers.orderSummary),
      itemEntry: $(selectors.main).find(selectors.drawers.itemEntry)
    }
    // backDrop: $(selectors.backDrop)
  }

  // $objects.backDrop.addClass('hidden');



  ////////////////////////////////////////////////////////
  // FUNCTIONS
  ////////////////////////////////////////////////////////


  function toggleDrawer(clickedItem) {
    var targetId = $(clickedItem).attr('href') || $(clickedItem).data('target') ;
    var targetEl = $(targetId);
    var isDrawerTypeHidden = targetEl.hasClass('drawer-hidden');
    var isExpanded = targetEl.hasClass('drawer-expanded');

    var backdropAdded = $('.drawer-backdrop').length;
    var backdropDiv;

    if ( backdropAdded ) {
      $('.drawer-backdrop').remove();
    } else {
      backdropDiv = $('<div class="drawer-backdrop in"></div>').appendTo($objects.globalHeader);
    }

    $objects.html.toggleClass('drawer-open');

    if (isDrawerTypeHidden) {
      // backdropDiv.toggleClass('fade').toggleClass('in');
      if (isExpanded) {
        setTimeout(function () {
          // completely hide after delay
          targetEl.css('opacity', 0);
        }, 500);
      } else {
        targetEl.css('opacity', 1);
      }
    }
    targetEl.toggleClass('drawer-expanded');

  }



  // YOUR OFFERS
  function yourOrderOffersShowDetails() {
    $objects.yourOrder.offers.list.addClass('hide');
    $objects.yourOrder.offers.details.removeClass('hide');
  }

  function yourOrderOffersHideDetails() {
    $objects.yourOrder.offers.list.removeClass('hide');
    $objects.yourOrder.offers.details.addClass('hide');
  }



  ////////////////////////////////////////////////////////
  // LISTENERS
  ////////////////////////////////////////////////////////


  $objects.drawers.all.on("click", function () {
    toggleDrawer($(this));
  });

  $objects.drawers.demoToggle.on("click", function (e) {
    var targetId = $(this).data('target');
    $(targetId).toggleClass('hidden');
  });

  $('[data-tab-select]').on('change', function (e) {
    var $optionSelected = $("option:selected", this);
    $optionSelected.tab('show')
  });


  // YOUR OFFERS
  $objects.yourOrder.offers.showDetails.on("click", function () {
    yourOrderOffersShowDetails();
  });

  $objects.yourOrder.offers.hideDetails.on("click", function () {
    yourOrderOffersHideDetails();
  });



  ////////////////////////////////////////////////////////
  // INIT
  ////////////////////////////////////////////////////////

  $(document).ready(function () {
    $('[data-toggle="popover"]').popover();

    // !! DEVELOPER NOTE !!
    // this script is required for tabs to collapse into an accordion
    // Currently being used on product detail page
    $('#pdpTabs').tabCollapse();

  });

  if(typeof Brochures !== 'undefined') Brochures.init();
  if(typeof CartCheckboxes !== 'undefined') CartCheckboxes.init();
  if(typeof CheckoutDemo !== 'undefined') CheckoutDemo.init();
  if(typeof FormDemo !== 'undefined') FormDemo.init();
  if(typeof ProductFilters !== 'undefined') ProductFilters.init();

});
