const gridWrapper = document.getElementById('grid-wrapper');
const allGridDiv = document.getElementsByClassName('grid-div');
let gridDiv;

// creates grid and tracks hover
function createGrid(n) {
	const powNumber = n ** 2;
	for (let i = 0; i < powNumber; i++) {
		gridDiv = document.createElement('div');
		gridDiv.classList.add('grid-div');
		gridWrapper.appendChild(gridDiv);
	}
	/* Array.from(allGridDiv).forEach((e) => e.addEventListener('mouseover', () => e.classList.add('black'))); */
}
createGrid(16);

/* ----------- EVENT DELEGATION to color grid - alternative method ----------

gridWrapper.addEventListener(
	'mouseover', (e) => {
		if (e.target.matches('.grid-div')) { e.target.classList.add('black'); }
	},
)
-------------------------------------------------------------------------- */

const gridRange = document.getElementById('square-range');
const pRange = document.getElementById('p-range');

gridRange.addEventListener('mouseup', () => {
	pRange.textContent = gridRange.value; // update Input Range p.value
	const number = gridRange.value; // assignin to Number user's input value
	gridWrapper.innerHTML = '';	// delete all div
	createGrid(number); // create new grid with user's input
	gridWrapper.setAttribute('style', `grid-template: repeat(${number}, 1fr) / repeat(${number}, 1fr);`); // resizing grid
});

function getRandom() {
	return Math.floor(Math.random() * 256);
}

/* function rainbow() {
	Array.from(allGridDiv).forEach(
		(e) => {
			e.removeEventListener('mouseover', () => e.classList.add('black'));
			e.addEventListener('mouseover',
				() => e.setAttribute('style', `background-color: rgb(${getRandom()}, ${getRandom()}, ${getRandom()})`));
		},
	);
} */

/* function shades() {
	Array.from(allGridDiv).forEach(
		(e) => {
			e.removeEventListener('mouseover', () => e.classList.add('black'));
			e.removeEventListener('mouseover',
				() => e.setAttribute('style', `background-color: rgb(${getRandom()}, ${getRandom()}, ${getRandom()})`));
			e.addEventListener('mouseover',
				() => e.setAttribute('style', `background-color: rgba(0, 0, 0, ${0.1}`));
		},
	);
} */

let color;
const buttons = document.querySelectorAll('.buttons');

buttons.forEach((e) => e.addEventListener('click', () => {
	color = e.textContent.toLowerCase();
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
							let currentOpacity = +(g.style.backgroundColor.slice(-4, -1));
							console.log(currentOpacity);
							if (currentOpacity <= 0.9) {
								g.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.2})`;
								
								
							}
						} else { g.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; }
					});
			},
		);
	}
}));
