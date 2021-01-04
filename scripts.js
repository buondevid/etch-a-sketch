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
	Array.from(allGridDiv).forEach((e) => e.addEventListener('mouseover', () => e.classList.add('black')));
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
	const number = gridRange.value; // giving number user's input value
	gridWrapper.innerHTML = '';
	createGrid(number);
	gridWrapper.setAttribute('style', `grid-template: repeat(${number}, 1fr) / repeat(${number}, 1fr);`); // resizing grid
});

function getRandom() {
	return Math.floor(Math.random() * 256);
}

function rainbow() {
	Array.from(allGridDiv).forEach(
		(e) => {
			e.removeEventListener('mouseover', () => e.classList.add('black'));
			e.addEventListener('mouseover',
				() => e.setAttribute('style', `background-color: rgb(${getRandom()}, ${getRandom()}, ${getRandom()})`));
		},
	);
}

function shades() {
	Array.from(allGridDiv).forEach(
		(e) => {
			e.removeEventListener('mouseover', () => e.classList.add('black'));
			e.removeEventListener('mouseover',
				() => e.setAttribute('style', `background-color: rgb(${getRandom()}, ${getRandom()}, ${getRandom()})`))
			e.addEventListener('mouseover',
				() => e.setAttribute('style', `background-color: rgba(0, 0, 0, ${0.1}`));
		},
	);
}
