import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './Sidebar';

const menuOpts = [
	{ label: 'Home', link: '/' },
	{ label: 'Pythagorean Triples', link: '/pythag' },
	{ label: 'Denominators', link: '/denom' },
];

const NavComponent = styled.div`
	z-index: 100;
`;

const MenuBtnContainer = styled.div`
	position:absolute;
	z-index: 200;
	left: 0px;
	top: 50%;
	transform: translateY(-50%);
`;

const MenuButton = styled.div`
	margin-left: 10px;
	width: 21px;
	height: 21px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	cursor: pointer;
	
	div {
		height: 3px;
		background-color: white;
	}
`;

function Hamburger(props) {
	const [state, setState] = useState(false);

	const  toggleMenu = e => {
		e.preventDefault();
		props.toggle();
		setState(!state);
	}

	return <NavComponent>
		<MenuBtnContainer>
			<MenuButton onClick={toggleMenu}>
				<div />
				<div />
				<div />
			</MenuButton>
		</MenuBtnContainer>
		{/*<Menu visible={state} options={menuOpts} toggle={toggleMenu}/>*/}
	</NavComponent>
}

export default Hamburger;
