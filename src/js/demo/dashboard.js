/**
 * ProductFilters
 * @return {init} [description]
 */


var dashboardDemo = (function () {

  var $els = {};

  // public methods
  var init = function () {

    // grab the DOM els we need
    $els = {
      changeWidgetTriggers:   $('.container--dashboard #widgets-my .change-widget-trigger'),
      carouselIndicators:     $('#select-widget-modal .carousel-indicators'),
      selectWidgetTrigger:    $('#select-widget-modal #select-widget-trigger')
    };

    var candidateForChangeNum;

    _addListeners();
  };

  // private methods
  var _addListeners = function () {

     // Click change widget trigger
    $els.changeWidgetTriggers.on('click', function() {
      _markCandidateForChange(this);
    });

     // When "Select Widget" is clicked,
    $els.selectWidgetTrigger.on('click', function() {
      _swapWidget();
    });

  };

  // Mark which of "My Widgets" is candidate for change
  var _markCandidateForChange = function(itemClicked) {
    var $parent = $(itemClicked).parents('.toolbar');
    candidateForChangeNum = ($('.badge', $parent ).text() -1);
  };


  var _swapWidget = function(itemClicked) {
    // Find out which widget is currently visible
    var currentVisibleWidgetNum = ($els.carouselIndicators.find('.active').data('slide-to') + 1);

    // Update the "candidate" widget with the selected widget
    $('.container--dashboard #widgets-my .widget-img:eq(' + candidateForChangeNum + ')').attr('src','images/fpo/home/' + currentVisibleWidgetNum + '.png');
  };




  return {
    init: init
  };

})();
