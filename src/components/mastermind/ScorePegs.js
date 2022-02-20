import React, { useState, useRef, useEffect } from 'react';

const CODE_LENGTH = 4;
const INIT_SCORE_PEGS = Array(CODE_LENGTH).fill('');

// make array of mastermind score pegs.
// type will be 'black' or 'white'.
function makePegArray(type, quantity) {
console.log('makePegArray of type', type, quantity);
	var scorePegs = INIT_SCORE_PEGS.slice(0);
	for (let q = 0; q < quantity; q++) {
		scorePegs[q] = type;
	}
	return scorePegs;
}

function ScorePegs(props) {
	const [ type, setType ] = useState('');
	const [ quantity, setQuantity ] = useState(0);

	useEffect(() => {
		setQuantity(props.quantity);
		setType(props.type);
	}, [props.quantity, props.type] );

	const pegs = makePegArray(type, quantity);
console.log(quantity, type, 'pegs this round', pegs);
	return (
	<div className="score-peg-wrapper">
	{ pegs.map((peg, ndx) => {
		var classes = 'score-peg';
		if (peg !== '') {
			// if peg !== '', peg === 'black' or peg === 'white'
			classes += ` score-${peg}`;
		}
		return <div key={ndx} className={classes}></div>
	})}
	</div>
	);
}

export default ScorePegs;
