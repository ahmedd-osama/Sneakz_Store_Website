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
contact form
*/
let contactForm = document.querySelector(".contact form");
const handleSubmit = (event) => {
    event.preventDefault();
    const myForm = event.target;
    const formData = new FormData(myForm);
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
        .then(() => {
        contactForm.innerHTML = `
    <h3 style="text-align: center; margin: auto; ">Your message was sent succesfully</h3>
    `;
    })
        .catch((error) => alert(error));
};
contactForm.addEventListener("submit", handleSubmit);
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
