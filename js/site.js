/*
 * Code by Ildar Sagdejev ( http://www.tknomad.com )
 */
console.log("JavaScript code is running");

function iconAnimate(icon) {
  var i,
    h = icon.height(),
    x = icon.stop(true).css("background-position").split(" "),
    lastStep = -1;

  //
  // Some browsers report background-position as
  // "<x> <y>", others as "left <x> top <y>"
  //
  x = x[0] === "left" ? x[1] : x[0];

  $({ i: 0 }).animate(
    { i: 10.9 },
    {
      duration: 500,
      step: function (step) {
        /* round the step off for discrete frame jumps */
        step = ~~step;

        if (step != lastStep) {
          lastStep = step;
          icon.css("background-position", x + " " + h * step + "px");
        }
      },
      complete: function () {
        icon.css("background-position", x + " 0");
      },
    }
  );
}

var mirrorOpts = {
  gap: 3,
  height: 0.23,
};

var showcase;

function showcaseInit() {
  showcase = $("#showcase");

  showcase.Cloud9Carousel({
    yRadius: 48,
    speed: 3,
    mirror: mirrorOpts,
    buttonLeft: $("#nav-left"),
    buttonRight: $("#nav-right"),
    bringToFront: true,
    onRendered: showcaseUpdated,
    onLoaded: function () {
      var loading = $("#loading").fadeOut(800, function () {
        loading.remove();
        showcase.unwrap();
      });

      showcase.css("visibility", "visible");
      showcase.css("display", "none");
      showcase.fadeIn(1500, function () {
        $("#expand > button").one("click");
      });

      setTimeout(function () {
        $("#expand > button").animate({ opacity: 1 }, 800);
      }, 700);
    },
  });

  $(".nav-button").click(showcaseArrowClicked);

  showcaseInitSwipe();
}

function showcaseInitSwipe() {
  showcase
    .on("swiperight", function () {
      $("#nav-left").click();
    })
    .on("swipeleft", function () {
      $("#nav-right").click();
    })
    .on("movestart", function (e) {
      if (
        (e.distX > e.distY && e.distX < -e.distY) ||
        (e.distX < e.distY && e.distX > -e.distY)
      ) {
        e.preventDefault();
      }
    });
}

function showcaseUpdated(showcase) {
  $("#caption").text(showcase.nearestItem().alt);

  var c = Math.cos((showcase.floatIndex() % 1) * 2 * Math.PI);
  $("#caption").css("opacity", 0.5 + 0.5 * c);
}

function showcaseArrowClicked(event) {
  var hi = $(event.target).closest(".nav-button").find(".blink-overlay");

  hi.stop();
  hi.css("opacity", "0");
  hi.css("display", "block");
  hi.animate({ opacity: "0.7" }, 80, "swing", function () {
    hi.animate({ opacity: "0" }, 160, "swing");
  });
}

// Main Section
$(function () {
  showcaseInit();
});
