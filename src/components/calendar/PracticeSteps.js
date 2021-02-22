import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Error, X, CheckMark } from './steps-icons';
import { initStepDict, addDictItem, fillIn } from './steps-helpers';

const monthOffsets = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];

var randYear = parseInt(Math.random() * 100, 10) + 2000;

const targetDate = { month: 3, date: 14, year: randYear };


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
		initStepDict(stepsData);
		var el = document.querySelector('.step-input');
console.log('useEffect el', el);
	}, []);

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
		addDictItem(label, expected);
		setSteps(steps);
		setUpdate(!update);
	}

	return (
	        <div className="steps-container">
	{ props.steps.map((s, key) => {
		return (
	                <div>
		{ s.section && key > 0 ? <hr /> : null }
	                  <div>
	                  <span>{s.prompt} </span>
	                  <input data-label={s.label} type="numeric" pattern="\d*" className="step-input" onBlur={handleStep} />
	                  { s.correct ? <CheckMark /> : null }
	                  { s.correct === false ? <X /> : null }
	                  </div>
	                  <div>
	                  { s.correct === false ? <Error>HINT: {s.filledInHint}</Error> : null }
	                  </div>
	                </div>
		);
	}) }
	        </div>
	);

}

export default PracticeSteps;
