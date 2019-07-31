"use strict";

// countdown start of code
var countDownDate = new Date("July 26, 2019 18:00:00").getTime();
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




$(document).ready(function(){
  //slider with thumbnail
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

  //reviews slider on mobile
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


  //animate scroll to any content (cope/paste)
  $('a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 500);
    }
});
});




// faq items
var questions = document.querySelectorAll('.faq__item-question');

var removeClassActive = function(questions) {
  for (var i = 0; i < questions.length; i++) {
    questions[i].classList.remove('active');
  }
};


var addquestionClickHandler = function (question) {
  question.addEventListener('click', function () {
    if (question.classList.contains('active')) {
      question.classList.remove('active');
    } else {
      removeClassActive(questions);
      question.classList.add('active');
    }
  });
};

for (var i = 0; i < questions.length; i++) {
  addquestionClickHandler(questions[i]);
}
//end of faq items



//height animation for any element (cope/paste)
function slidetoggle() {
  var _this = this;

  document.querySelectorAll(this.getAttribute('data-slidetoggle')).forEach(function (el) {
    var ch = el.clientHeight,
        sh = el.scrollHeight,
        isCollapsed = !ch,
        noHeightSet = !el.style.height;
    el.style.height = (isCollapsed || noHeightSet ? sh : 0) + "px";
    if (noHeightSet) return slidetoggle.call(_this);
  });
}

document.querySelectorAll("[data-slidetoggle]").forEach(function (el) {
  return el.addEventListener('click', slidetoggle);
});
//end of height animation



var popup = document.querySelector('#popup');
var closeBtn = popup.querySelector('#close-btn');
closeBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.style.display = 'none';
});
