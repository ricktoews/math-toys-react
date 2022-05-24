import React, { useEffect, useState } from 'react';
import LetterControls from './LetterControls';
import PatternEntry from './PatternEntry';
import { getGreenYellowPattern } from './utils/word-tools';

function WordWithControls(props) {
	const [letters, setLetters] = useState(props.guess.split(''));
	const [pattern, setPattern] = useState(['-', '-', '-', '-', '-']);
	const [pool, setPool] = useState(props.initialPool);
	const [clearExcept, setClearExcept] = useState();

	useEffect(() => {
		if (props.final) {
			let _p = getGreenYellowPattern(props.word, props.guess);
//			console.log(props.word, props.guess, _p);
			setPattern(_p);
		}
	}, []);

	function isComplete(p) {
		var statuses = p.filter(item => item !== 'G');
		return statuses.length === 0;
	}

	const clearStatusButtons = currentButton => {
		setClearExcept(currentButton);
	}

	const setEvaluation = data => {
		let _p = pattern.slice(0);
		_p[data.position] = data.status;
		setPattern(_p);
	}

	const submitPattern = e => {
//		var guess = props.guess;
		props.submitAttempt(pattern);
	}

	return (
	<div className="wrap-word-controls">
          <div className="pool-size">Random selection from {props.poolSize} words</div>
	  {letters.map((letter, ndx) => {
	  let clear = clearExcept !== ndx;
	  return <LetterControls key={ndx} clear={clear} letter={letter} position={ndx} clearStatusButtons={clearStatusButtons} setEvaluation={setEvaluation} final={props.final}/>
	  })}
          <PatternEntry pattern={pattern} submitPattern={submitPattern} final={props.final}/>
	</div>
	);
}

export default WordWithControls;
