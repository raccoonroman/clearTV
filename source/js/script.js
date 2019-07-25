"use strict";

// countdown start of code
var countDownDate = new Date("July 25, 2019 21:00:00").getTime();
var countDownNode1 = document.getElementById("countdown-desktop");
var countDownNode2 = document.getElementById("countdown-mobile");
var colonNode = "<span class=\"countdown__colon\"> : </span>";
var countDownNodeContent = countDownNode1.innerHTML;

var getHours = function(distance) {
  return Math.floor((distance / (1000 * 60 * 60)));
}

var getMinutes = function(distance) {
  return Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
}

var getSeconds = function(distance) {
  return Math.floor((distance % (1000 * 60)) / 1000);
}

var build2Digits = function(fun, distance) {
  return fun(distance) >= 10 ? fun(distance) : "0" + fun(distance);
}

var build2DigitsNode = function(fun, distance) {
  return "<span class=\"countdown__digits\">" + build2Digits(fun, distance) + "</span>";
}

var getTimer = function(distance) {
  return build2DigitsNode(getHours, distance) + colonNode + build2DigitsNode(getMinutes, distance) + colonNode + build2DigitsNode(getSeconds, distance);
}

// Update the count down every 1 second
var updateTime = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  countDownNode1.innerHTML = getTimer(distance);
  countDownNode2.innerHTML = getTimer(distance);

  var unlock = function(distance) {
    if (distance <= 1000) {
      clearInterval(updateTime);
      countDownNode1.innerHTML = countDownNodeContent;
      countDownNode2.innerHTML = countDownNodeContent;
    }
  }

  unlock(distance);
}, 1000);
//countdown end of code



//slider with thumbnail
$(document).ready(function(){
  $('.about__slider-for').slick({
    slidesToShow: 1,
    arrows: false,
    fade: true,
    asNavFor: '.about__slider-nav'
  });
  $('.about__slider-nav').slick({
    slidesToShow: 4,
    arrows: false,
    asNavFor: '.about__slider-for',
    focusOnSelect: true
  });


  $('.reviews__list').slick({
  dots: true,
  mobileFirst: true,
  infinite: false,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 768,
      settings: "unslick"
    },
  ]
});
});

