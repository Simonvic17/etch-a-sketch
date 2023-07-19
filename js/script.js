const grid = document.getElementById('grid')
const DEFAULT_SIZE = 20

let currentSize = DEFAULT_SIZE

function setGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for(let i = 0; i < size ** 2; i++) {
        const gridEl = document.createElement('div')
        gridEl.classList.add('grid-el')
        grid.append(gridEl)

        // This will add a border on top and left
        gridEl.classList.add('border-top-left')
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
    const lastItems = Array.from(gridItems.slice(-`${size}`));
    for(let i = 0; i < lastItems.length; i++) {
        lastItems[i].setAttribute('data-bottom', 'true');
        lastItems[i].classList.toggle('border-bottom')
    }
}

window.onload = () =>{
    setGrid(DEFAULT_SIZE)
}