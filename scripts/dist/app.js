"use strict";
// navigation bar
let navItems = document.querySelectorAll("nav .bar ul li.nav-item a");
navItems.forEach(item => item.addEventListener('click', (e) => { navItems.forEach(item => item.classList.remove('active')); e.target.classList.add('active'); }));
let nav = document.querySelector('header nav');
function toggleNav() { nav.classList.toggle('expanded'); }
Array.from(document.querySelectorAll('header .bar li a')).forEach(link => link.addEventListener('click', e => toggleNav()));
document.addEventListener('click', e => {
    let clickedElement = e.target;
    if (!clickedElement.matches('header nav *') && nav.classList.contains('expanded')) {
        nav.classList.remove('expanded');
    }
});
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
