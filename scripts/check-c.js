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

var tally = 0;
var total = 0;
for (let c = 5; c <= 100; c++) {
	let layers = checkWrap(c);
	let squares = findSquares(layers);
	let organized = organizeSquares(c, squares);
	if (organized.length > 0) {
		console.log(`c = ${c}, c^2 = ${c*c}`, organized);
		tally++;
	}
	total++;
}
