//appending google API
const googleApi = document.createElement('link');
googleApi.setAttribute('rel', 'stylesheet');
googleApi.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0');
document.head.appendChild(googleApi);
// Structure
const defaultIcon = '<span class="material-symbols-outlined"> arrow_upward </span>';
const defaultBtnHTML = `
<svg class="progress-container" style = 'overflow: visible; margin: 0 auto; display: flex; justify-content: center; aspect-ratio: 1/1; ' width = "100%" height = "100%" >
<g style = 'position: relative;'>
  <circle class="progress"  r = "50%"/>
  </g>
</svg>
<div class='progress-text'> up</div>
`

function progressScrollTopBtn(options = {}){
  // ----------Options
  // setting up variables 
  const {
  parentSelector: parentSelector = 'body',
  triggerOffset: triggerOffset = 1000,
  innerHTML: innerHTML = defaultIcon,
  customBtnCss: customBtnCss = '',
  customTextCss: customTextCss = '',
  elementId: elementId = 'scroll-up-with-progress',
  backgroundColor: backgroundColor = '#000',
  color: color ='#fff',
  strokeColor: strokeColor ='#90CAF9',
  strokeWidth: strokeWidth,
  transitionSpeed: transitionSpeed = 700,
  transitionTimingFunction: transitionTimingFunction = 'ease',

  } = options;
  // ----------Element 
  // creating the container element
  newScrollBtn = document.createElement('div');
  // assiging the default ID or the ID provided by User 
  newScrollBtn.setAttribute('id', elementId)
  newScrollBtn.innerHTML = defaultBtnHTML;

  // ----------Elements Selection
  // selecting different elements
  let scrollUpBtn = newScrollBtn;
  let progress = scrollUpBtn.querySelector('.progress');
  let text = scrollUpBtn.querySelector('.progress-text');

  // ----------Text
  // updating the text or HTML if provided by user  
  text.innerHTML = `${innerHTML}`;

  // ----------Appending Element to document
  // appending the element to the parent selector | default = 'body'
  document.querySelector(parentSelector).appendChild(newScrollBtn);

  // ----------Styling
  // updating the style of elements
  scrollUpBtn.setAttribute('style',`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed !important;
  bottom: 25px;
  right: -100%;
  z-index: 1000;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${backgroundColor};
  font-size: 1.225rem;
  cursor: pointer;
  transition: right ${transitionSpeed.toString()}ms ${transitionTimingFunction};
  ${customBtnCss}
  `);
  progress.setAttribute('style', `
  fill:none;
  stroke: ${strokeColor};
  stroke-linecap: round;
  transform-origin: center;
  transform: rotate(-90deg) translate(50%, 50%);;
  `);
  text.setAttribute('style',`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  aspect-ratio: 1/1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  color: ${color};
  ${customTextCss}
  `);
  // ----------On Load
  // adding a load event listener to update the location and the progress of the btn
  window.addEventListener('load', ()=> {
    scrollUpBtn.style.width =  `${Math.round(text.getBoundingClientRect().width)}px`;
    progress.style['stroke-width'] = `${strokeWidth || (0.09 * Math.round(text.getBoundingClientRect().width)).toString() + 'px'}`;
    updateProgress(window.scrollY, document.body.getBoundingClientRect().height - window.innerHeight);
});

  // ----------On Click
  // assiging event listener to the scrollup btn;
  scrollUpBtn.onclick = ()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
}

  // ----------On Scroll
    // assigning scroll event Listenr to the window to update the position of the button 
    window.addEventListener('scroll', ()=>{
        window.scrollY >= triggerOffset ? scrollUpBtn.style.right = '25px' : scrollUpBtn.style.right = '-150%';
        updateProgress(window.scrollY, document.body.getBoundingClientRect().height - window.innerHeight)
    });

  // ----------UI update
  // setting the updating algorethem;
    function updateProgress (value, max) {
      let percentatge = Math.ceil(Math.round(parseInt(value))/Math.round(parseInt(max)) *100)/100;
      // getting the Maximum value of the angles by multipling the width of the circle by 3.14 and then getting the current angle by multipling by the percentage
      var angle = Math.round((progress.getBoundingClientRect().width*3.14) * percentatge);
        progress.setAttribute("stroke-dasharray", angle + ", 20000");
    }
}
