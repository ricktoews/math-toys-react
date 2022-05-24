import React, { useEffect, useRef, useState } from 'react';

function LetterControls(props) {
	const [letter, setLetter] = useState(props.letter);
	const [position, setPosition] = useState(props.position);
	const [status, setStatus] = useState('-');

	const wrapLetterButtons = useRef();

	function hideStatusButtons() {
		wrapLetterButtons.current.classList.remove('show');
		wrapLetterButtons.current.classList.add('hide');
	}

	useEffect(() => {
		if (wrapLetterButtons.current) {
			if (props.clear) {
				hideStatusButtons();
			}
		}
	}, [props.clear]);

	const handleGreenClick = e => {
		hideStatusButtons();
		setStatus('G');
		let evalData = { position, status: 'G' }
		props.setEvaluation(evalData);
	}

	const handleGrayClick = e => {
		hideStatusButtons();
		setStatus('-');
		let evalData = { position, status: '-' }
		props.setEvaluation(evalData);
	}

	const handleYellowClick = e => {
		hideStatusButtons();
		setStatus('Y');
		let evalData = { position, status: 'Y' }
		props.setEvaluation(evalData);
	}

	const handleLetterLeave = e => {
		var classList = Array.from(e.target.classList);
		if (classList.indexOf('wrap-letter') !== -1) {
			let t = setTimeout(hideStatusButtons, 500);
		}
	}

	const handleLetterEnter = e => {
		props.clearStatusButtons(props.position);
		wrapLetterButtons.current.classList.remove('hide');
		wrapLetterButtons.current.classList.add('show');
	}

	/*
	  Remove letter buttons, as scoring is done by the app.
	*/
	return (
	<div>
	  <div className="wrap-letter-control">
	    {false && props.final && (
            <div ref={wrapLetterButtons} className="wrap-letter-buttons">
	      <div className="btn green-button" onClick={handleGreenClick}></div>
	      <div className="btn gray-button" onClick={handleGrayClick}></div>
	      <div className="btn yellow-button" onClick={handleYellowClick}></div>
	    </div>
	    )}

	    {false && props.final ? (
	      <div className="wrap-letter" onMouseLeave={handleLetterLeave} onMouseEnter={handleLetterEnter}><div className="letter">{letter}</div></div>
	    ) : (
	      <div className="wrap-letter"><div className="letter">{letter}</div></div>
	    ) }
	  </div>
	</div>
	);
}

export default LetterControls;
