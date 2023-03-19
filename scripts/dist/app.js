"use strict";
var _a;
// Utilites
function classTogglerGroup(array, className, event = 'click') {
    array.forEach((el) => {
        if (event) {
            el.addEventListener(event, (clickedEl) => {
                array.forEach((el) => { el.classList.remove(className); });
                let clickedElement = clickedEl.target;
                clickedElement.classList.add(className);
            });
        }
        else {
            el.classList.add(className);
        }
    });
}
function assignGroupListener(array, func, event = 'click') {
    array.forEach((el) => {
        if (event) {
            el.addEventListener(event, (El) => {
                func();
            });
        }
    });
}
/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
    el = el.trim();
    if (all) {
        return [...document.querySelectorAll(el)];
    }
    else {
        return document.querySelector(el);
    }
};
/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
    if (all) {
        select(el, all).forEach((e) => e.addEventListener(type, listener));
    }
    else {
        select(el, all).addEventListener(type, listener);
    }
};
// ------------------Modal 
const myModal = new bootstrap.Modal('#discountModal');
myModal.show();
// coping discount code
function copyValue(element) {
    let copyText = element.innerText;
    navigator.clipboard.writeText(copyText);
    // updating tooltip content 
    if (element.hasAttribute('data-bs-toggle') && element.getAttribute('data-bs-toggle') == 'tooltip') {
        const tooltip = bootstrap.Tooltip.getInstance('.modal .code-box h3'); // Returns a Bootstrap tooltip instance
        tooltip.setContent({ '.tooltip-inner': 'Copied!' });
    }
}
// ------------------navigation bar
let navItems = document.querySelectorAll("nav .bar ul li.nav-item a");
navItems.forEach(item => item.addEventListener('click', (e) => { navItems.forEach(item => item.classList.remove('active')); e.target.classList.add('active'); }));
// window listener to close navigation bar
let nav = document.querySelector('header nav');
function toggleNav() { nav.classList.toggle('expanded'); }
Array.from(document.querySelectorAll('header .bar li a')).forEach(link => link.addEventListener('click', e => toggleNav()));
document.addEventListener('click', e => {
    let clickedElement = e.target;
    if (!clickedElement.matches('header nav *') && nav.classList.contains('expanded')) {
        nav.classList.remove('expanded');
    }
});
// ------------------ landing
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
// ------------------Store Section
// product filteration
let productsContainer = document.querySelector(".store .products-container");
let products = document.querySelectorAll(".store .products-container .product");
if (productsContainer) {
    let productsIsotope = new Isotope(productsContainer, {
        itemSelector: '.product',
        layoutMode: 'fitRows'
    });
    let portfolioFilters = Array.from(document.querySelectorAll('#products-filters li button'));
    on('click', '#products-filters li button', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
            el.classList.remove('active');
        });
        let currentFilter = e.target;
        currentFilter.classList.add('active');
        productsIsotope.arrange({
            filter: currentFilter.getAttribute('data-filter')
        });
    }, true);
}
/*
  ------------------contact form
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
        myForm.innerHTML = `
    <h3 style="text-align: center; margin: auto; ">${myForm.getAttribute('data-submit-message')}</h3>
    `;
    })
        .catch((error) => alert(error));
};
contactForm.addEventListener("submit", handleSubmit);
(_a = document.getElementById("newsletter-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleSubmit);
/*
  ------------------packages initialization
*/
// pureCounter
new PureCounter({
    selector: '.purecounter',
    once: true,
    repeat: false,
});
// Animate On Scroll
AOS.init();
// initializing bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
