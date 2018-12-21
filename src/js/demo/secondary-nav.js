/**
 * SecondaryNav - handles all secondary nav behavior
 * @return {init} [description]
 */

var SecondaryNav = (function() {
  var $els = {};
  var firstRun = true;
  var menuBreakpoint = 1024;

  // public methods
  var init = function() {
    // grab the DOM els we need
    $els = {
      navContainer: $('.navbar-secondary'),
      outerCollapsible: $('#secondary-nav-collapse-1'),
      nestedCollapsible: $('#secondary-nav-collapse-2'),
      menuItems: $('[data-toggle="tab"]'),
      menuTitle: $('#menuTitle')
    };

    _addListeners();
  };

  // private methods
  var _addListeners = function() {
    $els.menuItems.on('click', function(e) {
      _handleItemClick($(this));
    });

    // prevent nested collapsibles from firing events on the parent
    $els.nestedCollapsible.on('hide.bs.collapse', function(e) {
      e.stopPropagation();
    });
    $els.nestedCollapsible.on('show.bs.collapse', function(e) {
      e.stopPropagation();
    });

    // Outer (main) collapsible events
    $els.outerCollapsible.on('hide.bs.collapse', function(e) {
      $els.navContainer.addClass('collapsed');
    });
    $els.outerCollapsible.on('show.bs.collapse', function(e) {
      $els.navContainer.removeClass('collapsed');
    });

    // handle resize
    _checkWindowSize();
    $(window).on('resize', function() {
      _checkWindowSize();
    });

  };

  var _handleItemClick = function(clickedItem) {
    // update menu 'title'
    $els.menuTitle.html(clickedItem.html());

    // close the nav when tapped on mobile
    if ($(window).width() < menuBreakpoint) {
      $els.outerCollapsible.collapse('hide');
    }
  };

  var _checkWindowSize = function() {
    if ($(window).width() < menuBreakpoint) {
      // prevent menu from showing on page load
      if(firstRun) {
        firstRun = false;
        return;
      }
      $els.outerCollapsible.collapse('hide');
    } else {
      $els.outerCollapsible.collapse('show');
    }
  };

  return {
    init: init
  };
})();
