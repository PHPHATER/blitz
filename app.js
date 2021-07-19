const select = el => document.querySelector(el)
const hasClass = (el, className) => (el.classList ? el.classList.contains(className) : !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')));
const addClass = (el, className) => {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += ' ' + className;
};
const removeClass = (el, className) => {
  if (el.classList) el.classList.remove(className);
  else if (hasClass(el, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
};


// vars 
const ROOT = select('#bingo-blitz')
const GAME = select('#game')
const MENU = select('#start-screen')


// initial setup
const toMenu = () => {
  addClass(ROOT, 'menu')
}

const startGame = () => {
  removeClass(ROOT, 'menu')
  addClass(ROOT, 'game')
}

const triggerFail = () => {

}

const triggerWin = () => {

}


// page loaded 
document.addEventListener('DOMContentLoaded', toMenu, false)
