/**
 * NavTabsScrollable - js behavior for horizontally scrolling nav tabs
 */

var NavTabsScrollable = (function () {

  var SETTINGS = {
    navBarTravelling: false,
    navBarTravelDirection: "",
    navBarTravelDistance: 150
  };

  var els = {
    scrollableTabsNav: document.getElementById("scrollableTabsNav"),
    scrollableTabsNavContents: document.getElementById("scrollableTabsNavContents"),
    pnAdvancerLeft: document.querySelector(".scrollable-tabs-advancer-left"),
    pnAdvancerRight: document.querySelector(".scrollable-tabs-advancer-right")
  };

  var init = function() {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    // let's check to see if it's worth initializing
    if(els.scrollableTabsNav) {
      _addListeners();
    } else {
      return;
    }
  };

  var _addListeners = function () {
    console.log('ADD LISTENERZZZZ');
  };



els.scrollableTabsNav.setAttribute("data-overflowing", determineOverflow(els.scrollableTabsNavContents, els.scrollableTabsNav));

// Handle the scroll of the horizontal container
var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scroll_pos) {
  els.scrollableTabsNav.setAttribute("data-overflowing", determineOverflow(els.scrollableTabsNavContents, els.scrollableTabsNav));
}


els.scrollableTabsNav.addEventListener("scroll", function () {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});


els.pnAdvancerLeft.addEventListener("click", function () {
  // If in the middle of a move return
  if (SETTINGS.navBarTravelling === true) {
    return;
  }
  // If we have content overflowing both sides or on the left
  if (determineOverflow(els.scrollableTabsNavContents, els.scrollableTabsNav) === "left" || determineOverflow(
      els.scrollableTabsNavContents, els.scrollableTabsNav) === "both") {
    // Find how far this panel has been scrolled
    var availableScrollLeft = els.scrollableTabsNav.scrollLeft;
    // If the space available is less than two lots of our desired distance, just move the whole amount
    // otherwise, move by the amount in the settings
    if (availableScrollLeft < SETTINGS.navBarTravelDistance * 2) {
      els.scrollableTabsNavContents.style.transform = "translateX(" + availableScrollLeft + "px)";
    } else {
      els.scrollableTabsNavContents.style.transform = "translateX(" + SETTINGS.navBarTravelDistance + "px)";
    }
    // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
    els.scrollableTabsNavContents.classList.remove("nav-tabs--scrollable-no-transition");
    // Update our settings
    SETTINGS.navBarTravelDirection = "left";
    SETTINGS.navBarTravelling = true;
  }
  // Now update the attribute in the DOM
  els.scrollableTabsNav.setAttribute("data-overflowing", determineOverflow(els.scrollableTabsNavContents, els.scrollableTabsNav));
});

els.pnAdvancerRight.addEventListener("click", function () {
  // If in the middle of a move return
  if (SETTINGS.navBarTravelling === true) {
    return;
  }
  // If we have content overflowing both sides or on the right
  if (determineOverflow(els.scrollableTabsNavContents, els.scrollableTabsNav) === "right" || determineOverflow(
      els.scrollableTabsNavContents, els.scrollableTabsNav) === "both") {
    // Get the right edge of the container and content
    var navBarRightEdge = els.scrollableTabsNavContents.getBoundingClientRect().right;
    var navBarScrollerRightEdge = els.scrollableTabsNav.getBoundingClientRect().right;
    // Now we know how much space we have available to scroll
    var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);
    // If the space available is less than two lots of our desired distance, just move the whole amount
    // otherwise, move by the amount in the settings
    if (availableScrollRight < SETTINGS.navBarTravelDistance * 2) {
      els.scrollableTabsNavContents.style.transform = "translateX(-" + availableScrollRight + "px)";
    } else {
      els.scrollableTabsNavContents.style.transform = "translateX(-" + SETTINGS.navBarTravelDistance + "px)";
    }
    // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
    els.scrollableTabsNavContents.classList.remove("nav-tabs--scrollable-no-transition");
    // Update our settings
    SETTINGS.navBarTravelDirection = "right";
    SETTINGS.navBarTravelling = true;
  }
  // Now update the attribute in the DOM
  els.scrollableTabsNav.setAttribute("data-overflowing", determineOverflow(els.scrollableTabsNavContents, els.scrollableTabsNav));
});

els.scrollableTabsNavContents.addEventListener(
  "transitionend",
  function () {
    // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
    var styleOfTransform = window.getComputedStyle(els.scrollableTabsNavContents, null);
    var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
    // If there is no transition we want to default to 0 and not null
    var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
    els.scrollableTabsNavContents.style.transform = "none";
    els.scrollableTabsNavContents.classList.add("nav-tabs--scrollable-no-transition");
    // Now lets set the scroll position
    if (SETTINGS.navBarTravelDirection === "left") {
      els.scrollableTabsNav.scrollLeft = els.scrollableTabsNav.scrollLeft - amount;
    } else {
      els.scrollableTabsNav.scrollLeft = els.scrollableTabsNav.scrollLeft + amount;
    }
    SETTINGS.navBarTravelling = false;
  },
  false
);

// Handle setting the currently active link
els.scrollableTabsNavContents.addEventListener("click", function (e) {
  var links = [].slice.call(document.querySelectorAll(".scrollable-tabs-item"));
  links.forEach(function (item) {
    item.setAttribute("aria-selected", "false");
  });
  e.target.setAttribute("aria-selected", "true");
});

function determineOverflow(content, container) {
  var containerMetrics = container.getBoundingClientRect();
  var containerMetricsRight = Math.floor(containerMetrics.right);
  var containerMetricsLeft = Math.floor(containerMetrics.left);
  var contentMetrics = content.getBoundingClientRect();
  var contentMetricsRight = Math.floor(contentMetrics.right);
  var contentMetricsLeft = Math.floor(contentMetrics.left);
  if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
    return "both";
  } else if (contentMetricsLeft < containerMetricsLeft) {
    return "left";
  } else if (contentMetricsRight > containerMetricsRight) {
    return "right";
  } else {
    return "none";
  }
}

/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 *
 * @license MIT, see https://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */


(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    factory((root.dragscroll = {}));
  }
}(this, function (exports) {
  var _window = window;
  var _document = document;
  var mousemove = 'mousemove';
  var mouseup = 'mouseup';
  var mousedown = 'mousedown';
  var EventListener = 'EventListener';
  var addEventListener = 'add' + EventListener;
  var removeEventListener = 'remove' + EventListener;
  var newScrollX, newScrollY;

  var dragged = [];
  var reset = function (i, el) {
    for (i = 0; i < dragged.length;) {
      el = dragged[i++];
      el = el.container || el;
      el[removeEventListener](mousedown, el.md, 0);
      _window[removeEventListener](mouseup, el.mu, 0);
      _window[removeEventListener](mousemove, el.mm, 0);
    }

    // cloning into array since HTMLCollection is updated dynamically
    dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
    for (i = 0; i < dragged.length;) {
      (function (el, lastClientX, lastClientY, pushed, scroller, cont) {
        (cont = el.container || el)[addEventListener](
          mousedown,
          cont.md = function (e) {
            if (!el.hasAttribute('nochilddrag') ||
              _document.elementFromPoint(
                e.pageX, e.pageY
              ) == cont
            ) {
              pushed = 1;
              lastClientX = e.clientX;
              lastClientY = e.clientY;

              e.preventDefault();
            }
          }, 0
        );

        _window[addEventListener](
          mouseup, cont.mu = function () { pushed = 0; }, 0
        );

        _window[addEventListener](
          mousemove,
          cont.mm = function (e) {
            if (pushed) {
              (scroller = el.scroller || el).scrollLeft -=
                newScrollX = (-lastClientX + (lastClientX = e.clientX));
              scroller.scrollTop -=
                newScrollY = (-lastClientY + (lastClientY = e.clientY));
              if (el == _document.body) {
                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                scroller.scrollTop -= newScrollY;
              }
            }
          }, 0
        );
      })(dragged[i++]);
    }
  };


  if (_document.readyState == 'complete') {
    reset();
  } else {
    _window[addEventListener]('load', reset, 0);
  }

  exports.reset = reset;
}));



})();
