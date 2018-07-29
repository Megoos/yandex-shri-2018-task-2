$(function() {
  var section = $(".mv__playlist-list"),
    display = $(".mv__playlist-cont"),
    scrollBar = $(".mv__pl-scrolbar-inner"),
    scrollPosition = 0;

  var scrollBarTransform = function(elHeight, marginTop, heightBlock) {
    scrollBar.css({
      height: elHeight + "%"
    });

    var heightBarPx = scrollBar.innerHeight(),
      barWindow = (heightBlock - heightBarPx) * marginTop;

    scrollBar.css({
      "margin-top": barWindow + "px"
    });
  };

  var heightSection = section.outerHeight(),
    heighDisplay = display.outerHeight(),
    heightBar = heightSection / heighDisplay * 100;

  scrollBarTransform(heightBar, 0, heightSection);

  var performTransition = function(scroll) {
    heightSection = section.outerHeight();
    heighDisplay = display.outerHeight();
    var workWindow = heightSection - heighDisplay;
    heightBar = heightSection / heighDisplay * 100;

    scrollPosition += scroll;

    if (scrollPosition > 0) scrollPosition = 0;

    if (scrollPosition <= workWindow) scrollPosition = workWindow;

    scrollBarTransform(heightBar, scrollPosition / workWindow, heightSection);

    var position = scrollPosition + "px";
    console.log(position);

    display.css({
      transform: "translateY(" + position + ")",
      "-webkit-transform": "translateY(" + position + ")"
    });
  };

  section.on({
    wheel: function(e) {
      var deltaY = e.originalEvent.deltaY / -10;
      performTransition(deltaY);
    },
    mouseenter: function() {
      $("html,body").on("mousewheel", function(e) {
        e.preventDefault();
      });
    },
    mouseleave: function() {
      $("html,body").off("mousewheel");
    }
  });

  var ts;
  section.bind("touchstart", function(e) {
    ts = e.originalEvent.touches[0].clientY;
  });

  section.bind("touchmove", function(e) {
    var te = e.originalEvent.changedTouches[0].clientY;
    performTransition((te - ts) / 20);
  });
});
