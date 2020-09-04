import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Router from './Router';
import Masthead from './Masthead';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const PrimaryNav = styled.ul`
	position:absolute;
	z-index:0;
	left: 10px;
	list-style-type: none;
	margin: 0;
	padding: 0;
	opacity: 0;
	line-height: 2;

	l>li {
	}

	li:hover {
		cursor: pointer;
	}
	li>a {
		color: white;
		font-size: 14px;
		text-shadow: 1px 1px 1px #5f0764;
		transition: .25s;
	}
	li>a:hover {
		color: white;
		font-size: 14px;
		text-decoration: none;
		transition: .25s;
	}
`;

const menuOpts = [
	{ label: 'Home', link: '/' },
	{ label: 'Pythagorean Triples', link: '/pythag' },
	{ label: 'Denominators', link: '/denom' },
];

function App() {
	const [state, setState] = useState(false);

	const  toggleMenu = e => {
		console.log('getting here', state);
		if (state) {
			var ul = document.querySelector('ul');
			ul.style.transition = '.5s';
			ul.style.opacity = 0;
			ul.style.zIndex = 0;
		}
		setState(!state);
	}

	function handleClick(e) {
		console.log('handleClick from App');
		toggleMenu();
	}

	function handleTransitionEnd(el) {
		var opacity = el.style.opacity;
		if (opacity === '1') {
			var ul = document.querySelector('ul');
			ul.style.opacity = 1;
			ul.style.zIndex = 100;
		}
	}

	return (
	<div>
	<Sidebar visible={state} options={menuOpts} handleTransitionEnd={handleTransitionEnd} />
	<Masthead toggle={toggleMenu} />
	<PrimaryNav>
		{menuOpts.map((opt, key) => <li key={key}><Link to={opt.link} onClick={handleClick}>{opt.label}</Link></li>) }
	</PrimaryNav>
    <Container>
	  <Row>
        <Col>
          <Router />
        </Col>
      </Row>
    </Container>
	</div>
  );
}

export default App;
