"use strict";

// countdown start of code
var countDownDate = new Date("September 2, 2019 18:00:00").getTime();
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
  $('a[href^="#"]:not(a[href="#"])').on('click', function(event) {
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



// height animation for any element (cope/paste)
// function slidetoggle() {
//   var _this = this;

//   document.querySelectorAll(this.getAttribute('data-slidetoggle')).forEach(function (el) {
//     var ch = el.clientHeight,
//         sh = el.scrollHeight,
//         isCollapsed = !ch,
//         noHeightSet = !el.style.height;
//     el.style.height = (isCollapsed || noHeightSet ? sh : 0) + "px";
//     if (noHeightSet) return slidetoggle.call(_this);
//   });
// }

// document.querySelectorAll("[data-slidetoggle]").forEach(function (el) {
//   return el.addEventListener('click', slidetoggle);
// });
//end of height animation


// show faq content
var showFaqBtn = document.querySelector('a[href="#faq"]');
var faq = document.querySelector('#faq');
showFaqBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  faq.classList.toggle("active");
});




//popup special offer
var popup1 = document.querySelector('#popup-offer');
var openPopup1Btn = document.querySelector('#open-popup-offer-btn');
var closePopup1Link = document.querySelector('#close-popup-offer-btn');
var popup1Overlay = document.querySelector('#popup-offer-overlay');
var popup1CloseBtn = document.querySelector('#popup-offer-close-btn');

if (openPopup1Btn) {
  openPopup1Btn.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup1.classList.add('active');
    popup1Overlay.classList.add('active');
  });
}

var closePopup1 = function(element) {
  element.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup1.classList.remove('active');
    popup1Overlay.classList.remove('active');
  });
};

closePopup1(closePopup1Link);
closePopup1(popup1Overlay);
closePopup1(popup1CloseBtn);

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (popup1.classList.contains("active")) {
      popup1.classList.remove("active");
      popup1Overlay.classList.remove("active");
    }
  }
});

// setTimeout( function() {
//   popup1.classList.add('active');
//   popup1Overlay.classList.add('active');
// }, 20000);

// toogle order summary on mobile
var orderSummaryBtn = document.querySelector('.order__summary-label');
orderSummaryBtn.classList.remove('active');
orderSummaryBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  orderSummaryBtn.classList.toggle("active");
});


//set product summary table


//set price in mobile order button
var orderPricevalueNodes = document.querySelectorAll('.order__price-value');
var orderedProductName = document.querySelector('.order__summary-product-name');
var orderSection = document.querySelector('.order');

var productBtnMobile = document.querySelector('.products__btn--mobile');

productBtnMobile.addEventListener('click', function (evt) {
  orderSection.classList.add('active');
  var productChecked = document.querySelector('.products__item input:checked + label');
  var productPriceValue = productChecked.querySelector('.product__price-value').innerHTML;
  var productName = productChecked.querySelector('.product__title').innerHTML;
  orderedProductName.innerHTML = productName;
  for (var i = 0; i < orderPricevalueNodes.length; i++) {
    orderPricevalueNodes[i].innerHTML = productPriceValue;
  }
});
// end of price in mobile order button


//polyfill for Element.closest()
if (!Element.prototype.closest) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  Element.prototype.closest = function (s) {
    var el = this;
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);
    return null;
  };
}
//end of polyfill


//set price in desktop order buttons
var productsBtnsDesktop = document.querySelectorAll('.products__btn--desktop');

var productsBtnsDesktopClickHandler = function (button) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    orderSection.classList.add('active');
    var orderedProductItem = button.closest(".products__item");
    var orderedInput = orderedProductItem.querySelector('input[name="cleartv"]');
    orderedInput.checked = true;
    var productPriceValue = orderedProductItem.querySelector('.product__price-value').innerHTML;
    var productName = orderedProductItem.querySelector('.product__title').innerHTML;
    orderedProductName.innerHTML = productName;
    for (var i = 0; i < orderPricevalueNodes.length; i++) {
      orderPricevalueNodes[i].innerHTML = productPriceValue;
    }
  });
};

for (var i = 0; i < productsBtnsDesktop.length; i++) {
  productsBtnsDesktopClickHandler(productsBtnsDesktop[i]);
}
// end of price in desktop order buttons
