/**
 * SecondaryNav - handles all secondary nav behavior
 * @return {init} [description]
 */

var SecondaryNav = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      navContainer: $('.navbar-secondary'),
      outerCollapsible: $('#secondary-nav-collapse-1'),
      nestedCollapsible: $('#secondary-nav-collapse-2')
      // allCollapsibles: $( $('.navbar-secondary').find('[data-toggle="collapse"]').data('target') )
    };

    _addListeners();

  };

  // private methods
  var _addListeners = function () {

    // console.log($els.outerCollapsible);

    _checkWindowSize();
    $(window).resize(function() {
      _checkWindowSize();
    });

    // prevent nested collapsibles from firing events on the parent
    $els.nestedCollapsible.on('hide.bs.collapse', function(e) {
      e.stopPropagation();
    });
    $els.nestedCollapsible.on('show.bs.collapse', function(e) {
      e.stopPropagation();
    });

    $els.outerCollapsible.on('hide.bs.collapse', function (e) {
      $els.navContainer.addClass('collapsed');
    });

    $els.outerCollapsible.on('show.bs.collapse', function (e) {
      $els.navContainer.removeClass('collapsed');
    });

  };

  var _checkWindowSize = function() {
    if ($(window).width() < 992) {
      // $els.outerCollapsible.collapse('hide');
      // $els.outerCollapsible.addClass('collapsed');
      // $els.navContainer.addClass('collapsed');
    } else {
      $els.outerCollapsible.collapse('show');
      // $els.outerCollapsible.removeClass('collapsed');
      // $els.navContainer.removeClass('collapsed');
    }
  };

  return {
    init: init
  };

})();
