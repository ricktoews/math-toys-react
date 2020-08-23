import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = styled.nav`
	position: absolute;
	z-index: 100;
    left: 0px;
    transform: translate(-50%,-50%);
	width: 100px;
	height: 100px;
	border: 1px solid ##711270;
	background-color: #c448c4;
	opacity: 1;
	border-radius: 50%;
	color: white;
	text-align:left;
`;

const sideBarStyle = {
	hide: {
		transitionTimingFunction: 'ease',
		transitionDuration: '1s',
		width: '150px',
		height: '150px',
		opacity: .5,
	},
	show: {
		transitionTimingFunction: 'ease',
		transitionDuration: '1s',
		width: '500px',
		height: '500px',
		opacity: 1,
	}
};

function Menu(props) {

	function handleTransitionEnd(e) {
		props.handleTransitionEnd(e.currentTarget);
	}

	function handleClick(e) {
		console.log('Menu handleClick');
		props.toggle();
	}


	let visibility = props.visible ? 'show' : 'hide';
	return <Sidebar onTransitionEnd={handleTransitionEnd} style={sideBarStyle[visibility]} />
}

export default Menu;
