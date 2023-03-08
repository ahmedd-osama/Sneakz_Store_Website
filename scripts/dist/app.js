"use strict";
// navigation bar
let navItems = document.querySelectorAll("nav .bar ul li.nav-item a");
navItems.forEach(item => item.addEventListener('click', (e) => { navItems.forEach(item => item.classList.remove('active')); e.target.classList.add('active'); }));
