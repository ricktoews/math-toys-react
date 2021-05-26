import React from 'react';

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

export const getLayers = triple => {
    var layerSum = 0;
    var aSquared = triple[0] * triple[0];
    var s = 1*triple[2];
    var layer = 0;
    while (layerSum < aSquared && s > 0) {
        layer++;
        layerSum += s + s - 1;
        s--;
    }
    return layer;
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

function layers(c) {
	var result = [];
	var layerSum = 0;
	var layer = c * 2 - 1;
	// All this does is start with the outer layer and work our way in.
	// Whenever the sum of the layers is a square, note it.
	while (layer > 5) {
		layerSum += layer;
		if (Math.sqrt(layerSum) === parseInt(Math.sqrt(layerSum), 10)) {
			result.push(layerSum);
		}
		layer -= 2;
	}
	return result;
}

function isPrimitive(a, b) {
	[a, b] = [Math.min(a, b), Math.max(a, b)];
	var safety = 50;
	while (a > 1 && safety > 0) {
		[a, b] = [b%a, a];
		safety--;
	}

	return a === 1;
}

function makeEquation(a, b) {
	var primitive = isPrimitive(a, b);
	var primitiveMark = primitive ? <span> &#183;</span> : <span></span>;
	return <div>{a}<sup>2</sup> + {b}<sup>2</sup> ({a*a} + {b*b}) {primitiveMark}</div>;
}

export const makeCList = maxC => {
	var cList = [];
	var pythag = [];
	for (let c = 5; c < 400; c++) {
		let a_squares = layers(c);
		if (a_squares.length > 0) {
			let used = {};
			a_squares.forEach(a_squared => {
				let a = Math.pow(a_squared, .5);
				let b = Math.pow(c*c - a_squared, .5);
				if (!used[a] && !used[b]) {
					pythag.push({ a, b, equation: makeEquation(a, b), isPrimitive: isPrimitive(a, b) });
				}
				used[a] = true;
				used[b] = true;
			});
		}

		if (pythag.length > 0) {
			cList.push({ c, pythag });
		}
		pythag = [];
	}
	return cList;
}

/*
const showTriples = (triples) => {
	var c = triples[0].c;

	var triplesHeader = <div className="triple-c">Given c = {c} ({c}<sup>2</sup> = {c*c}):</div>;

	var triplesBody = triples.map((item, key) => {

		var primitiveMark = item.isPrimitive === 'true' ? <span> &#183;</span> : <span></span>;
		return (<div key={key} onMouseOver={handleTripletSelect} className="pythag-triple">
			{item.a}<sup>2</sup> + {item.b}<sup>2</sup> ({item.a*item.a} + {item.b*item.b}) {primitiveMark}
		</div>)
		}
	);

	return <div>{triplesHeader}{triplesBody}</div>;

}
*/
