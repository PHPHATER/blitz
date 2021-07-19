const select = el => document.querySelector(el)
const selectAll = el => document.querySelectorAll(el)
const existDOM = el => (typeof el !== 'undefined' && el !== null ? true : false);
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

let anyOpened = false

const dishesArray = ['./images/win1.png', './images/win2.png', './images/faildish.png']

const closePlates = () => {
  selectAll('.plate').forEach(plate => {
    removeClass(plate, 'opened')
    if (existDOM(plate.querySelector('.bingo-blitz__dish'))) {
      plate.querySelector('.bingo-blitz__dish').remove()
    }
  })
}

// initial setup
const toMenu = (cls) => {
  removeClass(ROOT, 'game')
  if (cls) {
    setTimeout(() => {
      removeClass(ROOT, cls)
    }, 600);
  }
  addClass(ROOT, 'menu')
  closePlates()
  anyOpened = false
}

const startGame = () => {
  removeClass(ROOT, 'menu')
  addClass(ROOT, 'game')
}

const openPlate = plate => {
  if (!anyOpened) {
    const randomDish = dishesArray[Math.floor(Math.random() * dishesArray.length)]
    const dish = `
    <img class="bingo-blitz__dish" src="${randomDish}" alt="Dish Result" />
    `
    plate.innerHTML += dish
    
    
    addClass(plate, 'opened')
    anyOpened = true
    
    if (randomDish === dishesArray[dishesArray.length - 1]) {
      triggerFail()
    } else {
      triggerWin()
    }
  }
}



const triggerFail = () => {
  addClass(ROOT, 'fail')
  setTimeout(() => {
    toMenu('fail')
  }, 3000);
}

const triggerWin = () => {
  addClass(ROOT, 'win')
  setTimeout(() => {
    toMenu('win')
  }, 3000);
}


// page loaded 
document.addEventListener('DOMContentLoaded', toMenu(false), false)
