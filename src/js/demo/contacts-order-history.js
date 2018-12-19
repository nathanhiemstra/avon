/**
 * ContactOrderHistory
 * @return {init} [description]
 */

var ContactOrderHistory = (function() {
  var $els = {};

  // public methods
  var init = function() {
    // grab the DOM els we need
    $els = {
      chartContainer: $('.order-history-chart')
    };

    _addListeners();
    _constructChart();
  };

  // private methods
  var _addListeners = function() {};

  var _constructChart = function() {
    var data = {
      labels: ['Color', 'Other', 'Health & Wellness', 'Rest', 'Fashion', 'Fragrance', 'Personal Care', 'Skin Care'],
      series: [23.13, 21.88, 17.84, 13.17, 10.15, 5.1, 4.9, 3.82]
    };

    var options = {
      labelInterpolationFnc: function(value) {
        return value;
      },
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      plugins: [Chartist.plugins.legend()]
    };

    var responsiveOptions = [
      // [
      //   'screen and (min-width: 640px)',
      //   {
      //     chartPadding: 30,
      //     labelOffset: 100,
      //     labelDirection: 'explode',
      //     labelInterpolationFnc: function(value) {
      //       return value;
      //     }
      //   }
      // ],
      // [
      //   'screen and (min-width: 1024px)',
      //   {
      //     labelOffset: 80,
      //     chartPadding: 20
      //   }
      // ]
    ];

    var orderHistoryChart = new Chartist.Pie('.order-history-chart', data, options, responsiveOptions);

    orderHistoryChart.on('created', function(e) {
      // interval hack - there's no event to listen for when legend is ready
      var timer = setInterval(function() {
        var legendItems = $('.ct-legend li');

        // return if not ready
        if(!legendItems.length) return;

        // clear when ready
        clearInterval(timer);

        // append percentage values to legend list
        for(var i = 0; i < data.series.length; i++) {
          $(legendItems[i]).append('<span>' + data.series[i].value + '%</span>');
        }

        // we only need this listener once
        orderHistoryChart.off('created');

      }, 250);
    });

    // orderHistoryChart.on('draw', function(e) {
    //   console.log('DRAW!');
    // });

    // orderHistoryChart.on('optionsChanged', function(e) {
    //   console.log('OPTIONS CHANGED!');
    // });
  };

  return {
    init: init
  };
})();
