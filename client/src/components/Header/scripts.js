import $ from "jquery";

$(function () {
  // init feather icons
  window.feather.replace();

  //toggle scroll menu
  var scrollTop = 0;
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    //adjust menu background
    if (scroll > 80) {
      if (scroll > scrollTop) {
        $(".smart-scroll").addClass("scrolling").removeClass("up");
      } else {
        $(".smart-scroll").addClass("up");
      }
    } else {
      // remove if scroll = scrollTop
      $(".smart-scroll").removeClass("scrolling").removeClass("up");
    }

    scrollTop = scroll;

    // adjust scroll to top
    if (scroll >= 600) {
      $(".scroll-top").addClass("active");
    } else {
      $(".scroll-top").removeClass("active");
    }
    return false;
  });

  // scroll top top
  $(".scroll-top").click(function () {
    $("html, body").stop().animate(
      {
        scrollTop: 0,
      },
      50
    );
  });
});
