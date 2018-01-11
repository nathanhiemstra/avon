$(document).ready(function () {

  ////////////////////////////////////////////////////////
  // VARIABLES
  ////////////////////////////////////////////////////////


  var selectors = {
    main: "#avon-poc",
    triggers: {
      drawerOrderSummary: ".trigger-drawer-order-summary"
    },
    drawers: {
      all: '[data-toggle="drawer"]',
      orderSummary: ".drawer-order-summary"
    }
  }
  var $objects = {
    window: $(window),
    document: $(document),
    body: $('body'),
    main: $(selectors.main),
    triggers: {
      drawerOrderSummary: $(selectors.main).find(selectors.triggers.drawerOrderSummary)
    },
    drawers: {
      all: $(selectors.main).find(selectors.drawers.all),
      orderSummary: $(selectors.main).find(selectors.drawers.orderSummary)
    }
  }



  ////////////////////////////////////////////////////////
  // FUNCTIONS
  ////////////////////////////////////////////////////////


  function toggleDrawer(clickedItem) {
    var targetId = $(clickedItem).attr("href");
    $(targetId).toggleClass('drawer-expanded');
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
