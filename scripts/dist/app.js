"use strict";
// navigation bar
let navItems = document.querySelectorAll("nav .bar ul li.nav-item a");
navItems.forEach(item => item.addEventListener('click', (e) => { navItems.forEach(item => item.classList.remove('active')); e.target.classList.add('active'); }));
// landing
const swiper = new Swiper('.sneaker-swiper .swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    effect: "flip",
});
/*
   packages initialization
*/
// pureCounter
new PureCounter({
    selector: '.purecounter',
    once: true,
    repeat: false,
});
// Animate On Scroll
AOS.init();
