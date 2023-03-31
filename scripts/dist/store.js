"use strict";
var _a, _b;
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
// filters
classTogglerGroup(document.querySelectorAll('.optional-filters .sort .dropdown .dropdown-item'), 'active', 'click');
// store 
let products = document.querySelectorAll(".store .products-container .product");
if (document.querySelector(".store .products-container")) {
    let portfolioFilters = Array.from(document.querySelectorAll('#products-filters li button'));
    let productsIsotope = new Isotope(".store .products-container", {
        itemSelector: '.product',
        layoutMode: 'fitRows',
        getSortData: { price: '.price parseInt' },
    });
    loadProducts(10, productsIsotope);
    on('click', '#products-filters li button', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
            el.classList.remove('active');
        });
        let currentFilter = e.target;
        currentFilter.classList.add('active');
        let activeFilter = '';
        portfolioFilters.forEach(filter => filter.classList.contains('active') ? activeFilter = filter.getAttribute('data-filter') : '');
        // arrangeProducts(".store .products-container", activeFilter,)
        // fot trial
        arrangeProducts(productsIsotope, activeFilter, '.filtered-out');
        // ============Async arranging funstion
        // function detectAvailableProducts() {
        //   return new Promise(resolve => {
        //     setTimeout(() => {
        //       console.log(Array.from(document.querySelectorAll(".store .products-container .product")).filter((product) => {return product.style.display != 'none'}).length);
        //     }, 550);
        //   });
        // }
        // async function asyncCall() {
        //   await detectAvailableProducts();
        // }
        // asyncCall().then(
        //   productsIsotope.arrange({
        //     filter: activeFilter.replace(' ', '').concat(':not(.filtered-out)'),
        //     console: console.log('wh')
        //   }));
    }, true);
    // calling the arranging functin
    function arrangeProducts(isotopeElement, activeFilter, userOptionalRemoveFilter = '.filtered-out') {
        var _a;
        let productsContainer = document.querySelector(".store .products-container");
        activeFilter = activeFilter.replace(' ', '');
        let optionalRemoveFilter = userOptionalRemoveFilter;
        optionalRemoveFilter = `:not(${optionalRemoveFilter.replace(' ', '')})`;
        let finalSelector = activeFilter.concat(optionalRemoveFilter);
        let defaultItemSelector = finalSelector.concat(isotopeElement.options.itemSelector.replace(' ', ''));
        // optoinal filters preparation
        function getMaxPrice() {
            let allPrices = Array.from(document.querySelectorAll(".store .products-container .product .price")).map(price => { return parseInt(price.innerText); });
            return Math.max(...allPrices);
        }
        function getMinPrice() {
            let allPrices = Array.from(document.querySelectorAll(".store .products-container .product .price")).map(price => { return parseInt(price.innerText); });
            return Math.min(...allPrices);
        }
        let optionalFilters = new Object;
        optionalFilters = {
            filterPrice: () => {
                let products = document.querySelectorAll(".store .products-container .product");
                products.forEach(product => {
                    let price = parseInt(product.querySelector('.price').innerText);
                    if (price > getMaxPrice() || price < getMinPrice()) {
                        product.classList.add(userOptionalRemoveFilter.replace('.', ''));
                    }
                });
            }
        };
        optionalFilters.filterPrice();
        // getting available products count
        function getAvailableCount() {
            return productsContainer.querySelectorAll(defaultItemSelector).length;
        }
        function isAvailable(item) {
            let testContainer = document.createElement('div');
            testContainer.appendChild(item);
            return testContainer.querySelector(defaultItemSelector) ? item : false;
        }
        //  appending extra products...
        function appendExtraProducts(number) {
            if (getAvailableCount() < number) {
                // console.log(number - getAvailableCount())
                for (let i = getAvailableCount(); i < number; i = getAvailableCount()) {
                    // loadProducts(1,isotopeElement);
                    let clone = isAvailable(getProduct());
                    if (clone) {
                        productsContainer.append(clone);
                        isotopeElement.appended(clone);
                    }
                }
            }
            isotopeElement.layout();
        }
        appendExtraProducts(10);
        isotopeElement.arrange({
            filter: finalSelector,
            console: console.log("filtering")
        });
        let activeSortType = (_a = document.querySelector(".optional-filters .sort .dropdown .dropdown-item.active")) === null || _a === void 0 ? void 0 : _a.getAttribute('data-sort');
        sortByPrice(activeSortType);
    }
    arrangeProducts(productsIsotope, '*');
    // sorting by price
    function sortByPrice(direction) {
        if ((direction === null || direction === void 0 ? void 0 : direction.replace(' ', '')) == 'ascending') {
            productsIsotope.arrange({
                sortAscending: true,
                sortBy: 'price',
            });
            productsIsotope.layout();
        }
        else if ((direction === null || direction === void 0 ? void 0 : direction.replace(' ', '')) == 'descending') {
            productsIsotope.arrange({
                sortBy: 'price',
                sortAscending: false,
            });
        }
    }
    (_a = document.querySelector('#sort-high-low')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => { sortByPrice('descending'); });
    (_b = document.querySelector('#sort-low-high')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => { sortByPrice('ascending'); });
    // products appending function
    function loadProducts(number, isotopeElement) {
        let productsContainer = document.querySelector(".store .products-container");
        for (let i = 0; i < number; i++) {
            let clone = products[Math.round(Math.random() * (products.length - 1))].cloneNode(true);
            productsContainer.append(clone);
            isotopeElement.appended(clone);
        }
        isotopeElement.layout();
    }
    function getProduct() {
        let products = Array.from(document.querySelectorAll(".store .products-container .product"));
        let clone = products[Math.round(Math.random() * (products.length - 1))].cloneNode(true);
        return clone;
    }
}
// progress Scrollup Button
progressScrollTopBtn({ backgroundColor: 'var(--light-color-alt)', color: 'var(--text-black-white)', strokeColor: 'var(--main-color)' });
