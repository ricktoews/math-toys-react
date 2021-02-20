import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styled from 'styled-components';

const Error = styled.div`
	color: red
`;

const monthOffsets = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];

var randYear = parseInt(Math.random() * 100, 10) + 2000;

console.log('random year', randYear);
const targetDate = { month: 3, date: 14, year: randYear };

const X = () => {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>);
}

const CheckMark = () => {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg>);
};



function getIntegerInput(e) {
	var el = e.currentTarget;
	var val = parseInt(el.value, 10);
	var label = el.dataset.label;
	return { label, val };
}

function PracticeSteps(props) {
	const { stepsData } = props;
	const [ steps, setSteps ] = useState(props.steps);
	const [ update, setUpdate ] = useState(false);

	useEffect(() => {
		var el = document.querySelector('.step-input');
console.log('useEffect el', el);
	}, []);

	function getVal(label) {
		label = label.substr(1, label.length - 2);
		var valueStep = steps.find(s => s.label === label);	
		var val = valueStep ? valueStep.filledInExpected : stepsData[label];
		if (val === undefined) {
			try {
				val = eval(label);
			} catch (e) {
			}
		}

		return val;
	}

	// Negative lookbehind. Don't match if preceded by a letter.
	// From https://stackoverflow.com/questions/9306202/regex-for-matching-something-if-it-is-not-preceded-by-something-else
	const needsFillingInRe = /(?<!\w)\[.*\]/;
	const fillInRe = /(?<!\w)\[[^\[\]]*?\]/g;

	function fillIn(str) {
		var shortCircuit = false;
		while (!shortCircuit && str.match(needsFillingInRe)) {
			let _str = str.replaceAll(fillInRe, m => { return getVal(m); });
			// Protect against infinite loop.
			if (_str === str) {
				shortCircuit = true;
			} else {
				str = _str;
			}
		}

		return str;
	}

	const handleStep = e => {
		var { label, val } = getIntegerInput(e);
		if (isNaN(val)) return;

		var currentStep = steps.find(s => s.label === label);
		if (currentStep.reduce) { val %= 7; }
		currentStep.input = val;

		var correct, expected, hint;
		expected = eval(fillIn(currentStep.expected));
		hint = fillIn(currentStep.hint);
		correct = val === expected;
		currentStep.correct = correct;
		currentStep.filledInExpected = expected;
		currentStep.filledInHint = hint;
		setSteps(steps);
		setUpdate(!update);
	}

	return (
	        <>
	        <Table>
	          <tbody>
	            <tr>
	              <td>
	{ props.steps.map((s, key) => {
		return (
	                <div>
		{ s.section && key > 0 ? <hr /> : null }
	                  <div>
	                  <span>{s.prompt} </span>
	                  <input data-label={s.label} type="text" className="step-input" onBlur={handleStep} />
	                  { s.correct ? <CheckMark /> : null }
	                  { s.correct === false ? <X /> : null }
	                  </div>
	                  <div>
	                  { s.correct === false ? <Error>HINT: {s.filledInHint}</Error> : null }
	                  </div>
	                </div>
		);
	}) }
	              </td>
	            </tr>
	          </tbody>
	        </Table>
	        </>
	);

}

export default PracticeSteps;
