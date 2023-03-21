// Utilites
function classTogglerGroup(array: Element[], className: string, event: string | undefined = 'click'):void{
  array.forEach((el):void=>{
    if(event){
      el.addEventListener(event , (clickedEl):void =>{
        array.forEach((el):void =>{el.classList.remove(className)});
        let clickedElement: Element= clickedEl.target as Element;
        clickedElement.classList.add(className);
      })
    }else{
      el.classList.add(className)
    }
  })
}
function assignGroupListener(array: Element[], func: any, event: string | undefined = 'click'):void{
  array.forEach((el):void=>{
    if(event){
      el.addEventListener(event , (El):void =>{
        func()
      })
    }
  })
}
// Easy selector helper function
const select = (el: any, all = false) => {
  el = el.trim()
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}
// Easy event listener function
const on = (type:string, el: String, listener:any, all = false) => {
  if (all) {
    select(el, all).forEach((e: any )=> e.addEventListener(type, listener))
  } else {
    select(el, all).addEventListener(type, listener)
  }
}
// ------------------ Modal 
const myModal = new bootstrap.Modal('#discountModal')
myModal.show();
// coping discount code
function copyValue(element: any) {
  let copyText: any = element.innerText;
  navigator.clipboard.writeText(copyText);
  // updating tooltip content 
  if (element.hasAttribute('data-bs-toggle') && element.getAttribute('data-bs-toggle') == 'tooltip'){
    const tooltip = bootstrap.Tooltip.getInstance('.modal .code-box h3') // Returns a Bootstrap tooltip instance
    tooltip.setContent({ '.tooltip-inner': 'Copied!' })
  }
}

// ------------------ navigation bar
let navItems = document.querySelectorAll("nav .bar ul li.nav-item a");
navItems.forEach(item=> item.addEventListener('click',(e:any)=>{navItems.forEach(item=>item.classList.remove('active')); e.target.classList.add('active'); }));

// window listener to close navigation bar
let nav: any = document.querySelector('header nav');
function toggleNav(): void{nav.classList.toggle('expanded')}
Array.from(document.querySelectorAll('header .bar li a')).forEach(link=>link.addEventListener('click', e=>toggleNav()))
document.addEventListener('click', e=>{
  let clickedElement: any = e.target;
  if (!clickedElement.matches('header nav *') && nav.classList.contains('expanded')){
    nav.classList.remove('expanded');
  }
});
// updating active links on scroll 
const navbarlinksActive = () => {
  let position = window.scrollY + 200;
  navItems.forEach((navItem: any) => {
    if (!navItem.hash) return
    let section = select(navItem.hash)
    if (!section) return
    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      navItem.classList.add('active')
    } else {
      navItem.classList.remove('active')
    }
  })
}
window.addEventListener('load', navbarlinksActive);
document.addEventListener('scroll', navbarlinksActive);

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
let productsContainer: any = document.querySelector(".store .products-container");
let products = document.querySelectorAll(".store .products-container .product");

if (productsContainer) {
  let productsIsotope = new Isotope(productsContainer, {
    itemSelector: '.product',
    layoutMode: 'fitRows'
  });
  let portfolioFilters = Array.from(document.querySelectorAll('#products-filters li button'));

  on('click', '#products-filters li button', function(e: Event) {
    e.preventDefault();
    portfolioFilters.forEach(function(el) {
      el.classList.remove('active');
    });
    let currentFilter = e.target as Element;
    currentFilter.classList.add('active');

    productsIsotope.arrange({
      filter: currentFilter.getAttribute('data-filter')
    });
  }, true);
}

// ------------------contact form
let contactForm: any = document.querySelector(".contact form");
const handleSubmit: any = (event: any) => {
  event.preventDefault();

  const myForm = event.target;
  const formData: any = new FormData(myForm);
  
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      myForm.innerHTML = `
    <h3 style="text-align: center; margin: auto; ">${myForm.getAttribute('data-submit-message')}</h3>
    `
    })
    .catch((error) => alert(error));
};

contactForm.addEventListener("submit", handleSubmit);
document.getElementById("newsletter-form")?.addEventListener("submit", handleSubmit);





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
// progress Scrollup Button
progressScrollTopBtn({backgroundColor:  'transparent', color: 'var(--text-black-white)', strokeColor: 'var(--main-color)'})