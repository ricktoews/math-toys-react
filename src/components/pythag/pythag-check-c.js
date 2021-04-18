/*
 * The approach is to check the wrapping on two sides of the square whose side is c.
 * Example: if c = 5, the first layer is 9, because there are 9 squares from TR to BL.
 * The second layer is 7, because once you remove the 9 squares, you have a 4x4 square.
 * The outer layer is always side x 2 - 1.
 */
function checkWrap(c) {
	var layers = [];
	for (let i = c; i >= 2; i--) {
		let layer = i*2 - 1;
		layers.push(layer);
	}
	return layers;
}

function findSquares(layers) {
	var squares = [];
	var sum = 0;
	layers.forEach(l => {
		sum += l;
		if (Math.sqrt(sum) === Math.ceil(Math.sqrt(sum))) {
			squares.push(sum);
		}
	});
	return squares;
}

function organizeSquares(c, squares) {
	var squared = c*c;
	var organized = [];
	while (squares.length > 0) {
		let sq = squares.shift();
		let diff = squared - sq;
		let compNdx = squares.findIndex(s => s === diff);
		squares.splice(compNdx, 1);

		let a = Math.sqrt(sq);
		let b = Math.sqrt(diff);
		let pythag = `${a}^2 + ${b}^2 (${sq} + ${diff})`;
		organized.push({pythag});
	}
	return organized;
}

export const checkSquare = c => {
	let layers = checkWrap(c);
	let squares = findSquares(layers);
//	let organized = organizeSquares(c, squares);
	return {
		layers, squares
	}
}

export const findNextSquareLayer = (el, squareSide) => {
	var c = squareSide * 1; // Force c to type int.
	var ndx = el.id.substr(2) * 1; // Extract the ndx from the element ID, and force it to type int.
	var row = Math.ceil((ndx + 1) / c); // e.g., with 5x5, ndx 7: ceil(8 / 5) is row 2
	var col = ndx % c + 1; // e.g., 5x5, ndx 7: 8 % 5 is col 3.
	var cornerRC = Math.min(row, col);

	// Corner index of current layer. Now, find next square layer, if there is one.
	var cornerNdx = (cornerRC - 1) * c + (cornerRC - 1); // e.g., (3, 3) is (2 * 5) + (2), or ndx 12;
	var foundSquareLayer = false;
	var sqEl;
	while (!foundSquareLayer && cornerNdx + 1 < c*c) {	
		sqEl = document.querySelector(`#c-${cornerNdx}`);
		foundSquareLayer = sqEl.dataset.isSquare === 'true';
		if (!foundSquareLayer) cornerNdx += (c + 1);
	}

	var nextSquareLayer = foundSquareLayer ? sqEl.dataset.layer : -1;
console.log('Found square?', foundSquareLayer, sqEl.dataset.layer);
	return nextSquareLayer;
}
