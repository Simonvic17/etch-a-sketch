const grid = document.getElementById('grid')

function setGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for(let i = 0; i < size ** 2; i++) {
        const gridEl = document.createElement('div')
        gridEl.classList.add('grid-el')
        grid.append(gridEl)
    }
}

window.onload = () =>{
    setGrid(16)
}