$(document).ready(function () {

  ////////////////////////////////////////////////////////
  // VARIABLES
  ////////////////////////////////////////////////////////


  var selectors = {
    main: "#avon-poc",
    triggers: {
      drawerOrderSummary: ".trigger-drawer-order-summary",
      drawerItemEntry: ".trigger-drawer-item-entry"
    },
    drawers: {
      all: '[data-toggle="drawer"]',
      orderSummary: ".drawer-order-summary",
      itemEntry: ".drawer-item-entry"
    }
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
    drawers: {
      all: $(selectors.main).find(selectors.drawers.all),
      orderSummary: $(selectors.main).find(selectors.drawers.orderSummary),
      itemEntry: $(selectors.main).find(selectors.drawers.itemEntry)
    }
  }



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



  ////////////////////////////////////////////////////////
  // INIT
  ////////////////////////////////////////////////////////

  $(document).ready(function () {
    $('[data-toggle="popover"]').popover();
  });

  PredictiveSearch.init();

});
