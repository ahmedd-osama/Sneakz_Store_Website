// navigation bar
let navItems = document.querySelectorAll("nav .bar ul li.nav-item a");
navItems.forEach(item=> item.addEventListener('click',(e:any)=>{navItems.forEach(item=>item.classList.remove('active')); e.target.classList.add('active'); }));

let nav: any = document.querySelector('header nav');
function toggleNav(): void{nav.classList.toggle('expanded')}
Array.from(document.querySelectorAll('header .bar li a')).forEach(link=>link.addEventListener('click', e=>toggleNav()))

document.addEventListener('click', e=>{
  let clickedElement: any = e.target;
  if (!clickedElement.matches('header nav *') && nav.classList.contains('expanded')){
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
      contactForm.innerHTML = `
    <h3 style="text-align: center;">Your message was sent succesfully</h3>
    `
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