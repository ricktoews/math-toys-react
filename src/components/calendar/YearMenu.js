import React from 'react';
import styled from 'styled-components';

const MenuWidth = 125;

const ArrowBottom = styled.div`
	position: absolute;
	bottom: -30px;
	left: 48px;
	margin-bottom: 15px;
	border-top: 15px solid #ddd;
	border-right: 15px solid transparent;
	border-left: 15px solid transparent;
`;

const ArrowTop = styled.div`
	position: absolute;
	top: -30px;
	left: 48px;
	margin-top: 15px;
	border-bottom: 15px solid black;
	border-right: 15px solid transparent;
	border-left: 15px solid transparent;
`;

const CalendarMenu = styled.div`
	position: absolute;
	background-color: #ddd;
	
	width: ${MenuWidth}px;
	font-size: .8rem;
	
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;

		li:first-child {
			color: white;
			background: black;
		}

		li {
			padding: 0 2px;
			cursor: pointer;
		}

		li:hover {
			background-color: #eee;
		}
	}
`;

const calcX = x => {
	const offsetX = -48;
	var newX = 1*x + offsetX;
	if (newX < 0) {
		newX = 0;
	}
	else if (newX + MenuWidth > window.innerWidth) {
		newX = window.innerWidth - MenuWidth;
	}
	return newX + 'px';
}

const calcY = y => {
	if (y > 143) {
		var offsetY = 72;
		var newY = window.scrollY + y - 2*offsetY;
		return newY + 'px';
	} else {
		var offsetY = -4;
		var newY = window.scrollY + y - 2*offsetY;
		return newY + 'px';
	}
}

function YearMenu(props) {
	const { rect, handleYearMenu } = props;

	const offsetX = 50;
	const positionStyle = { top: calcY(rect.y), left: calcX(rect.x) };
	var arrowStyle = {};
	if (rect.x < 20) {
		arrowStyle = { left: '20px' };
	} else if (rect.x > 330) {
		arrowStyle = { left: (MenuWidth - 40) + 'px' };
	}

	return (
	  <CalendarMenu style={positionStyle}>
	    { rect.y > 143 ? <ArrowBottom style={arrowStyle}/> : <ArrowTop style={arrowStyle}/> }
	    <ul>
	      <li>Menu</li>
	      <li onClick={handleYearMenu} data-opt="calendar">Standard Calendar</li>
	      <li onClick={handleYearMenu} data-opt="matching">Matching Years</li>
	    </ul>
	  </CalendarMenu>
	);
}

export default YearMenu;
