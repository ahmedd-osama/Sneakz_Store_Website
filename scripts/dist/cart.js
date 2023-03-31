"use strict";
var _a, _b;
// static
classTogglerGroup(select('#cart .payment .payment-methods .payment-method', true), 'active', 'click');
//cart 
let userCart = {
    items: [
        {
            itemData: {
                url: 'product.html',
                id: 'prod001',
                price: 300,
                name: 'Nike Air Jordon 1 High Fly',
                size: '36 EU - 4US',
                imgUrl: 'images/products/product/0.webp'
            },
            itemQuantity: 1,
        },
        {
            itemData: {
                url: 'product.html',
                id: 'prod002',
                price: 280,
                name: 'Nike Air Jordon 1 Low Fly',
                size: '36 EU - 4US',
                imgUrl: 'images/products/product/3.webp'
            },
            itemQuantity: 2,
        },
    ],
    getItemCount: () => {
        return userCart.items.length;
    },
    getTotalPrice: () => {
        var _a;
        let totalPrice = 0;
        userCart.items.forEach(item => { totalPrice = totalPrice + (item.itemData.price * item.itemQuantity); });
        userCart.getExtraExpenses() ? (_a = userCart.getExtraExpenses()) === null || _a === void 0 ? void 0 : _a.forEach(elem => totalPrice = totalPrice + elem.value) : '';
        return totalPrice;
    },
    getSubTotalPrice: () => {
        let subtotalPrice = 0;
        userCart.items.forEach(item => { subtotalPrice = subtotalPrice + (item.itemData.price * item.itemQuantity); });
        return subtotalPrice;
    },
    getExtraExpenses: () => {
        if (userCart.items.length > 0) {
            return [{ name: 'shipping', value: 10 }];
        }
        else {
            return undefined;
        }
    },
    increaseItem: (id) => {
        id ? userCart.items.map((item) => { item.itemData.id == id ? item.itemQuantity++ : ''; }) : '';
    },
    decreaseItem: (id) => {
        id ? userCart.items.map((item) => { item.itemData.id == id ? item.itemQuantity <= 1 ? userCart.removeItem(id) : item.itemQuantity-- : ''; }) : '';
    },
    removeItem: (id) => {
        id ? userCart.items.map((item, index) => { item.itemData.id == id ? userCart.items.splice(index, 1) : ''; }) : '';
        return;
    }
    // get: ()=>{
    // },
};
let updateCart = () => {
    var _a;
    let itemsEl = select('.cart.section #cart .items');
    let invoiceDetails = select('.cart-container .invoice-details');
    let totalPriceEls = select('.cart-container .total-price', true);
    let subtotalPriceEls = select('.cart-container .subtotal-price', true);
    // uppending and updating items section
    itemsEl.innerHTML = '';
    userCart.items.forEach(item => {
        let quantity = item.itemQuantity;
        let id = item.itemData.id;
        let price = item.itemData.price;
        let size = item.itemData.size;
        let name = item.itemData.name;
        let imgUrl = item.itemData.imgUrl;
        let href = item.itemData.url;
        let itemEl = document.createElement('div');
        itemEl.classList.add('item');
        itemEl.setAttribute('data-item-id', id);
        itemEl.innerHTML = `
      <div class ="remove-btn" data-item-id = "${id}" data-action = "decrease" onclick="userCart.removeItem('${id}'); updateCart()">Remove <i class="fa-solid fa-x"></i></div>
      <div class="product-img "><a href="${href}"><img src="${imgUrl}" alt="${name}"></a></div>
      <div class="info">
        <h4 href="products.html"><a href="${href}" style="color: var(--text);">${name}</a></h4>
        <p class="sub-text">${size}</p>
        <p class="sub-text">${price}$</p>
      </div>
      <div class="wrapper ">
        <div class="counter">
          <btn  class="counter-item" data-item-id = "${id}" data-action = "decrease" onclick="userCart.decreaseItem('${id}'); updateCart()">-</btn>
          <p class="counter-item">${quantity}</p>
          <btn class="counter-item" data-item-id = "${id}" data-action = "increase" onclick="userCart.increaseItem('${id}'); updateCart()">+</btn>
        </div>
      </div>
    `;
        itemsEl.appendChild(itemEl);
    });
    // updating invoice and extra expenses 
    totalPriceEls.forEach((el) => { el.innerHTML = userCart.getTotalPrice(); });
    subtotalPriceEls.forEach((el) => { el.innerHTML = userCart.getSubTotalPrice(); });
    //Extra Invoice Items
    invoiceDetails.querySelectorAll('.extra-expense').forEach((item) => item.remove());
    userCart.getExtraExpenses() ? (_a = userCart.getExtraExpenses()) === null || _a === void 0 ? void 0 : _a.forEach((expense) => {
        let name = expense.name;
        let value = expense.value;
        let invoiceItemEl = document.createElement('div');
        invoiceItemEl.classList.add('invoice-item');
        invoiceItemEl.classList.add('extra-expense');
        invoiceItemEl.innerHTML = `
    <p class="sub-text">${name}</p>
    <p><span class="total-price ">${value}</span>$</p>
    `;
        invoiceDetails.appendChild(invoiceItemEl);
    }) : '';
};
updateCart();
// initializing  swiper
const cartSwiper = new Swiper("#cart .cart-swiper", {
    direction: 'horizontal',
    loop: false,
    allowTouchMove: false,
    slidesPerView: 1,
    spaceBetween: 1000,
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
});
// cartSwiper.slideNext(500, true)
(_a = select('.next-sec-btn', true)) === null || _a === void 0 ? void 0 : _a.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (userCart.items.length > 0) {
            cartSwiper.slideNext();
            window.scroll(top);
        }
    });
});
(_b = select('.prev-sec-btn', true)) === null || _b === void 0 ? void 0 : _b.forEach((btn) => {
    btn.addEventListener('click', () => {
        cartSwiper.slidePrev();
    });
});
cartSwiper.on('slideChange', () => {
    let cart = document.querySelector('#cart');
    cart.style.height = `${Math.round(cartSwiper.slides[cartSwiper.activeIndex].getBoundingClientRect().height) + 50}px`;
});
