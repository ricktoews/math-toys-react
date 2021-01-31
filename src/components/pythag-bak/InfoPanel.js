import React, { useState } from 'react';
import styled from 'styled-components';
import PythagIllus from './PythagIllus';
import Help from '../Help';

const infoHeight = 500;
const infoBg = '#eee';
const infoBorder = '2px solid #417941';

const Info = styled.div`
	position: absolute;
	z-index: 200;
	height: 500px;
	background-color: #ffffff;
	border: 2px solid #417941;
	padding: 15px;
	overflow: scroll;
	font-size: 12px;
	border-radius: 10px;
	box-shadow: 1px 1px 6px grey;
	font-family: roboto;
	color: #a1a131;
	top: 57px;

	.close-overlay {
		position: absolute;
		top: 8px;
		right: 8px;
		width: 16px;
		height: 16px;
		color: purple;
		cursor: pointer;
	}
`;

const info = {

	corner: (props) => {
		return (
			<div>

	        <p>Corner. Why corner?</p>

	        <p>OK, check out this square--the one containing the green square positioned in its lower right corner, with a yellow wrap-around. Notice the small, yellow-gray square in the upper left. The "corner" value is one side of that square. We will use it as the basis for finding Pythagorean triples</p>

	        <PythagIllus colors={{ c: "yellow", b: "green", a: "#cccc00" }}/>

	        <p>Each side of the large square is <i>c</i>, so that the large square's area is <i>c^2</i>. Likewise, each side of the green square is <i>b</i>, so that its area is <i>b^2</i>.</p>

	        <p>That leaves the yellow wrap-around area. Since its area is <i>c^2 - b^2</i>, it must be <i>a^2</i> to complete the Pythagorean triple (a, b, c). So how do we calculate it?</p>

	        <p>We start with the yellow-gray square. Each side is <i>c - b</i>. Let's call that <i>n</i>. So the area of the small square is <i>n^2</i>, and the areas of the yellow sections above and to the left of the green square are each <i>b x n</i>. So the total area of the yellow wrap-around is <i>n^2 + 2bn</i>. It will be more convenient to express that as a product than as a sum, so: <i>n(n + 2b)</i>.</p>

	        <p>So now, what we need to do is find values for <i>n</i> and <i>b</i> such that <i>n(n + 2b)</i> is an integer square.</p>

	        <p>If <i>n</i> is a square, then we just need to find values of <i>(n + 2b)</i> that are also square. Say <i>n</i> = 1. What squares can be expressed as <i>1 + 2b</i>? These are just the odd squares, right? (Well, odd squares greater than 1, of course, because <i>b</i> can't be 0.) So, 9, 25, 49, &c. Setting (1 + 2<i>b</i>) to any of those, and solving for <i>b</i>, we get <i>b</i> = 4, <i>b</i> = 12, <i>b</i> = 24, &c. Since <i>n</i> = 1, the area of the wrap-around in each case is 9, 25, 49, &c., yielding values of <i>a</i>: 3, 5, 7, &c. With the values of <i>a</i> and <i>b</i>, we can calculate <i>c</i>: (a = 3, b = 4, c = 5), (a = 5, b = 12, c = 13), (a = 7, b = 24, c = 25), &c.</p>
			</div>
		);
	}
};

function InfoPanel(props) {
	const [state, setState] = useState({ show: false });
	const infoWidth = props.isMobile ? '340px' : '760px';
	const infoLeft = props.isMobile ? '0px' : '160px';

	const handleHelpButton = e => {
		console.log('handleHelpButton');
		setState({ show: !state.show });
	}

	const handleClickClose = e => {
		e.preventDefault();
		var el = e.currentTarget.parentNode;
		console.log('close', el);
	   	setState({ show: !state.show });
	};

	return !state.show ? (<Help action={handleHelpButton} />) : (
		<Info style={{ width: infoWidth, left: infoLeft, transitionDuration: '1s', opacity: state.show ? 1 : 0 }}>
          <div className="close-overlay" onClick={handleClickClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="bi bi-x-circle-fill" fill="currentColor" id="x-circle-fill"><path fillRule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z"></path></svg>
          </div>

		{info.corner()}
		</Info>
	);
}

export default InfoPanel;
