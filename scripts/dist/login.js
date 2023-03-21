"use strict";
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
// Easy selector helper function
const select = (el, all = false) => {
    el = el.trim();
    if (all) {
        return [...document.querySelectorAll(el)];
    }
    else {
        return document.querySelector(el);
    }
};
// Easy event listener function
const on = (type, el, listener, all = false) => {
    if (all) {
        select(el, all).forEach((e) => e.addEventListener(type, listener));
    }
    else {
        select(el, all).addEventListener(type, listener);
    }
};
// ------------------ navigation bar
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
// updating active links on scroll 
const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navItems.forEach((navItem) => {
        if (!navItem.hash)
            return;
        let section = select(navItem.hash);
        if (!section)
            return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            navItem.classList.add('active');
        }
        else {
            navItem.classList.remove('active');
        }
    });
};
window.addEventListener('load', navbarlinksActive);
document.addEventListener('scroll', navbarlinksActive);
// ------------ Login section
const swiper = new Swiper('.reviews-swiper .swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 50000,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: '.next',
        prevEl: '.previous',
    },
});
