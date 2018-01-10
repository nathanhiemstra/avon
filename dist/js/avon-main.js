
$(document).ready(function() {

////////////////////////////////////////////////////////
// VARIABLES
////////////////////////////////////////////////////////


  var selectors = {
    main:                       "#avon-poc",
    triggers: {
      drawerOrderSummary:       ".trigger-drawer-order-summary",
      searchInput:              "#mobile-search-input"
    },
    drawers: {
      all:                      '[data-toggle="drawer"]',
      orderSummary:             ".drawer-order-summary"
    },
    overlays: {
      searchOverlay:            ".container--search-results .main-content-overlay"
    }
  }
  var $objects = {
    window: $(window),
    document: $(document),
    body: $('body'),
    main: $(selectors.main),
    triggers: {
      drawerOrderSummary:   $(selectors.main).find(selectors.triggers.drawerOrderSummary)
    },
    drawers: {
      all:                  $(selectors.main).find(selectors.drawers.all),
      orderSummary:         $(selectors.main).find(selectors.drawers.orderSummary)
    },
    overlays: {
      searchOverlay:        $(selectors.overlays.searchOverlay)
    }
  }

  // Listener to toggle content overlay on focus and blur of search input
  $(selectors.triggers.searchInput)
    .focus(function() {
      toggleContentOverlay($objects.overlays.searchOverlay);
    })
    .blur(function() {
      toggleContentOverlay($objects.overlays.searchOverlay);
    });



  ////////////////////////////////////////////////////////
  // FUNCTIONS
  ////////////////////////////////////////////////////////


  function toggleDrawer(clickedItem) {
    var targetId = $(clickedItem).attr("href");
    $(targetId).toggleClass('drawer-expanded');
  }

  // Toggle content overlay where $el is overlay
  function toggleContentOverlay($el) {
    $el.toggleClass('hidden').toggleClass('show');
  }



  ////////////////////////////////////////////////////////
  // LISTENERS
  ////////////////////////////////////////////////////////


  $objects.drawers.all.on("click", function() {
    toggleDrawer($(this));
  });


  $('[data-tab-select]').on('change', function (e) {
    var $optionSelected = $("option:selected", this);
    $optionSelected.tab('show')
  });



  ////////////////////////////////////////////////////////
  // INT
  ////////////////////////////////////////////////////////

  $(document).ready(function(){
    $('[data-toggle="popover"]').popover();
  });


});
