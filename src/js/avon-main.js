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
      orderSummary: ".drawer-order-summary",
      itemEntry: ".drawer-item-entry"
    },
    overlay: ".global-content-overlay"
  }
  var $objects = {
    window: $(window),
    document: $(document),
    html: $('html'),
    body: $('body'),
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
      all: $(selectors.main).find(selectors.drawers.all),
      orderSummary: $(selectors.main).find(selectors.drawers.orderSummary),
      itemEntry: $(selectors.main).find(selectors.drawers.itemEntry)
    },
    overlay: $(selectors.overlay)
  }

  console.log('selectors: ',selectors);



  ////////////////////////////////////////////////////////
  // FUNCTIONS
  ////////////////////////////////////////////////////////


  function toggleDrawer(clickedItem) {
    var targetId = $(clickedItem).attr("href");
    var targetEl = $(targetId);
    var isDrawerTypeHidden = targetEl.hasClass('drawer-hidden');
    var isExpanded = targetEl.hasClass('drawer-expanded');

    $objects.html.toggleClass('drawer-open');

    if (isDrawerTypeHidden) {
      $objects.overlay.toggleClass('hidden');
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


  $('[data-tab-select]').on('change', function (e) {
    var $optionSelected = $("option:selected", this);
    $optionSelected.tab('show')
  });


  // YOUR OFFERS
  console.log('$objects.yourOrder.offers.showDetails: ',$objects.yourOrder.offers.showDetails);
  $objects.yourOrder.offers.showDetails.on("click", function () {
    yourOrderOffersShowDetails();
    console.log('showDetails');

  });

  $objects.yourOrder.offers.hideDetails.on("click", function () {
    yourOrderOffersHideDetails();
    console.log('hideDetails');
  });



  ////////////////////////////////////////////////////////
  // INIT
  ////////////////////////////////////////////////////////

  $(document).ready(function () {
    $('[data-toggle="popover"]').popover();
  });

  CheckoutDemo.init();
  FormDemo.init();
  Brochures.init();

});
