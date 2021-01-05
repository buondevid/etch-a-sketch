const gridWrapper = document.getElementById('grid-wrapper');
const allGridDiv = document.getElementsByClassName('grid-div');
let gridDiv;

function resetGrid() {
	gridWrapper.innerHTML = '';
}

function getRandom() {
	return Math.floor(Math.random() * 256);
}

/* ---------------------- creates grid  e runs default --------------------- */
function createGrid(n) {
	const powNumber = n ** 2;
	for (let i = 0; i < powNumber; i++) {
		gridDiv = document.createElement('div');
		gridDiv.classList.add('grid-div');
		gridWrapper.appendChild(gridDiv);
	}
}
createGrid(16);

/* -----------------Alternatives: Html5 collection to color-----------------------------

Array.from(allGridDiv).forEach((e) => e.addEventListener('mouseover', () => e.classList.add('black')));

 -------------EVENT DELEGATION to color grid - alternative method-------

gridWrapper.addEventListener(
	'mouseover', (e) => {
		if (e.target.matches('.grid-div')) { e.target.classList.add('black'); }
	},
)
-------------------------------------------------------------------------- */

const gridRange = document.getElementById('square-range');
const pRange = document.getElementById('p-range');

/* ------------------------------ Reset button ------------------------------ */
document.getElementById('reset').addEventListener('click', () => {
	resetGrid(); createGrid(gridRange.value);
});

/* ----------------------- Input listener to resize the board ----------------------- */
gridRange.addEventListener('mouseup', () => {
	pRange.textContent = gridRange.value; // update Input Range p.value
	const number = gridRange.value; // assignin to Number user's input value
	resetGrid();	// delete all div
	createGrid(number); // create new grid with user's input
	gridWrapper.setAttribute('style', `grid-template: repeat(${number}, 1fr) / repeat(${number}, 1fr);`); // resizing grid
});

let color;
const buttons = document.querySelectorAll('.buttons');

/* ------------------------ Buttons' events listeners ----------------------- */
buttons.forEach((b) => b.addEventListener('click', () => {
	color = b.textContent.toLowerCase();
	if (color === 'rubber') {
		Array.from(allGridDiv).forEach(
			(grid) => {
				grid.classList.remove('black');
				grid.addEventListener('mouseover',
					() => grid.setAttribute('style', 'background-color: white'));
			},
		);
	} else if (color === 'rainbow') {
		Array.from(allGridDiv).forEach(
			(grid) => {
				grid.classList.remove('black');
				grid.addEventListener('mouseover',
					() => grid.setAttribute('style', `background-color: rgb(${getRandom()}, ${getRandom()}, ${getRandom()})`));
			},
		);
	} else if (color === 'black') {
		Array.from(allGridDiv).forEach(
			(grid) => {
				grid.classList.remove('black');
				grid.addEventListener('mouseover',
					() => grid.setAttribute('style', 'background-color: black'));
			},
		);
	} else if (color === 'shades') {
		Array.from(allGridDiv).forEach(
			(g) => {
				g.addEventListener('mouseover',
					() => {
						if (g.style.backgroundColor.match(/rgba/)) {
							const currentOpacity = +(g.style.backgroundColor.slice(-4, -1));
							g.classList.add('darken');
							if (currentOpacity <= 0.9 || g.classList.contains('darken')) {
								g.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
							}
						} else if (!g.style.backgroundColor.match(/rgb/)) { g.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; }
					});
			},
		);
	}
}));
