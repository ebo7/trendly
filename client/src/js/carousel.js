import $ from "jquery";
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
$(function () {
  $(".carousel").slick({
    infinite: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  });
});
