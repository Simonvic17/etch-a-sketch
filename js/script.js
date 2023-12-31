const DEFAULT_SIZE = 20
const DEFAULT_COLOR = '#0000FF'
const DEFAULT_MODE = 'color'
const DEFAULT_BG_COLOR = '#FFFFFF'
const grid = document.getElementById('grid')
const pickColor = document.getElementById("color")
const rainbowColor = document.getElementById("rainBow")
const eraseColor = document.getElementById("erase")
const resetColor = document.getElementById('resetColor')
const sizeInput = document.getElementById('size')

let currentSize = DEFAULT_SIZE
let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentBgColor = DEFAULT_BG_COLOR

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

let color = document.getElementById('bg-color')
color.addEventListener("input", ()=>{
 let bgColor = grid.style.background = color.value
  setBgColor(bgColor)
})

function setBgColor(newBg) {
  currentBgColor = newBg
}
// Function that generates grids in html
function setGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for(let i = 0; i < size ** 2; i++) {
        const gridEl = document.createElement('div');
        gridEl.classList.add('grid-el');
        gridEl.addEventListener("mouseover", changeColor);
        gridEl.addEventListener("mousedown", changeColor);
        grid.append(gridEl);

        // This will add a border on top and left
        gridEl.classList.add('border-top-left');
    }

    // In order to avoid duplicated borders while creating grids
    // We have to add borders on some sides
    // This will create a right border of the last grid items
    const rightItems = document.querySelectorAll(`.grid-el:nth-child(${currentSize}n)`);
    for(let i = 0; i < rightItems.length; i++) {
        rightItems[i].setAttribute('data-right', 'true');
        rightItems[i].classList.toggle('border-right');
    }

    // This will create a bottom border of the last bottom grid items
    let gridItems = document.querySelectorAll('.grid-el');
    const lastItems = Array.from(gridItems).slice(-`${size}`);
    for(let i = 0; i < lastItems.length; i++) {
        lastItems[i].setAttribute('data-bottom', 'true');
        lastItems[i].classList.toggle('border-bottom')
    }
}

pickColor.oninput = (e) => setCurrentColor(e.target.value)
pickColor.onclick = () => setCurrentMode('color')
rainbowColor.onclick = () => setCurrentMode('rainbow')
eraseColor.onclick = () => setCurrentMode("eraser")
resetColor.onclick = () => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)


function reloadGrid() {
    let clearGrid = () => (grid.innerHTML = '')
    clearGrid()
    setGrid(currentSize)
}


function setCurrentSize(newSize) {
    currentSize = newSize
  }

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}
  
  function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
  }

// Track mouse to change color
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeColor(e) {
    if(e.type === 'mouseover' && !mouseDown) return;
    switch (currentMode) {
        case 'color':
            e.target.style.backgroundColor = currentColor; 
            break;
        case 'rainbow':
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})` 
            break;
        case 'eraser':
            e.target.style.backgroundColor = currentBgColor; 
            break;
        default:
            break;
    }
}

// Activate Button alternatively
function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowColor.classList.remove('active')
    } else if (currentMode === 'color') {
    pickColor.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraseColor.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowColor.classList.add('active')
    } else if (newMode === 'color') {
      pickColor.classList.add('active')
    } else if (newMode === 'eraser') {
      eraseColor.classList.add('active')
    }
}


window.onload = () =>{
    setGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}