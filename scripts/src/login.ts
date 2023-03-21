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