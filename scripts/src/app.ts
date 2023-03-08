// navigation bar
let navItems = document.querySelectorAll("nav .bar ul li.nav-item a")
navItems.forEach(item=> item.addEventListener('click',(e:any)=>{navItems.forEach(item=>item.classList.remove('active')); e.target.classList.add('active'); }));
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