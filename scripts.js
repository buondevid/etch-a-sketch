const gridWrapper = document.getElementById('grid-wrapper');
const allGridDiv = document.getElementsByClassName('grid-div');
let gridDiv;

function resetGrid() {
	gridWrapper.innerHTML = '';
}

function getRandom() {
	return Math.floor(Math.random() * 361);
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

/* ----------------------- Functions to color the grid ---------------------- */
function rubberOver() {
	this.setAttribute('style', 'background-color: whitesmoke');
}

function rainbowOver() {
	this.setAttribute('style', `background-color: hsl(${getRandom()}, 100%, 50%)`);
}

function blackOver() {
	this.setAttribute('style', 'background-color: black');
}

function shadesOver() {
	if (this.style.backgroundColor.match(/rgba/)) {
		const currentOpacity = +(this.style.backgroundColor.slice(-4, -1));
		if (currentOpacity <= 0.89) {
			this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
		} else if (currentOpacity === 1);
	} else this.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.1)');
}

/* ---------- Event listener on buttons to select which color/function to use ---------- */

let color;
const buttons = document.querySelectorAll('.buttons');

buttons.forEach((b) => b.addEventListener('click', () => {
	let colorFunc;
	color = b.textContent.toLowerCase();
	console.log(color);

	if (color === 'rubber') {
		colorFunc = rubberOver;
	} else if (color === 'rainbow') {
		colorFunc = rainbowOver;
	} else if (color === 'black') {
		colorFunc = blackOver;
	} else if (color === 'shades') {
		colorFunc = shadesOver;
	}

	Array.from(allGridDiv).forEach(
		(grid) => {
			grid.removeEventListener('mouseover', rubberOver);
			grid.removeEventListener('mouseover', rainbowOver);
			grid.removeEventListener('mouseover', blackOver);
			grid.removeEventListener('mouseover', shadesOver);

			grid.addEventListener('mouseover', colorFunc);
		},
	);
}));

/* ------------------------ Buttons' events listeners old version bugged and discarded-------------
buttons.forEach((b) => b.addEventListener('click', () => {
	color = b.textContent.toLowerCase();

	if (color === 'rubber') {
		Array.from(allGridDiv).forEach(
			(grid) => {
				grid.addEventListener('mouseover',
					() => grid.setAttribute('style', 'background-color: whitesmoke'));
			},
		);
	} else if (color === 'rainbow') {
		Array.from(allGridDiv).forEach(
			(grid) => {
				grid.addEventListener('mouseover',
					() => grid.setAttribute('style', `background-color: hsl(${getRandom()}, 100%, 50%)`));
			},
		);
	} else if (color === 'black') {
		Array.from(allGridDiv).forEach(
			(grid) => {
				grid.addEventListener('mouseover',
					() => grid.setAttribute('style', 'background-color: black'));
			},
		);
	} else if (color === 'shades') {
		Array.from(allGridDiv).forEach(
			(grid) => {
				grid.removeEventListener('mouseover',
					() => grid.setAttribute('style', 'background-color: whitesmoke'));
				grid.removeEventListener('mouseover',
					() => grid.setAttribute('style', 'background-color: black'));
				grid.removeEventListener('mouseover',
					() => grid.setAttribute('style', `background-color: hsl(${getRandom()}, 100%, 50%)`));
				grid.addEventListener('mouseover',
					() => {
						if (grid.style.backgroundColor.match(/rgba/)) {
							const currentOpacity = +(grid.style.backgroundColor.slice(-4, -1));
							if (currentOpacity <= 0.9) {
								grid.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
							}
						} else if (!grid.style.backgroundColor.match(/rgb/)) grid.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.1)');
					});
			},
		);
	}
})); */
