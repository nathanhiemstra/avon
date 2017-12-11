
$(document).ready(function() {

////////////////////////////////////////////////////////
// VARIABLES
////////////////////////////////////////////////////////


  var selectors = {
    main:                       "#avon-poc",
    triggers: {
      drawerOrderSummary:       ".trigger-drawer-order-summary"
    },
    drawers: {
      orderSummary:             ".drawer-order-summary"
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
      orderSummary:         $(selectors.main).find(selectors.drawers.orderSummary)
    }
  }



  ////////////////////////////////////////////////////////
  // FUNCTIONS
  ////////////////////////////////////////////////////////

  // function deepFind(obj, path) {
  //   var paths = path.split('.'),
  //     current = obj,
  //     i;

  //   for (i = 0; i < paths.length; ++i) {
  //     if (current[paths[i]] == undefined) {
  //       return undefined;
  //     } else {
  //       current = current[paths[i]];
  //     }
  //   }
  //   return current;
  // }

 
 


  ////////////////////////////////////////////////////////
  // LISTENERS
  ////////////////////////////////////////////////////////


  $objects.triggers.drawerOrderSummary.on("click", function() {
    $objects.drawers.orderSummary.toggleClass('drawer-expanded');
  });


  ////////////////////////////////////////////////////////
  // INT
  ////////////////////////////////////////////////////////

 


});