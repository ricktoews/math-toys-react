import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import DrawYear12Digit from './DrawYear12Digit';
import CalendarLayout from './CalendarLayout';
import YearMenu from './YearMenu';
import { generateMonthData } from './calendar-helper';

const MenuBar = styled.div`
	position: fixed;
	z-index: 1;
	top: 50px;
	left: 0;
	width: 100vw;
	display: flex;
	justify-content: center;
	background-color: black;
	border-top: 1px solid white;
	height: 20px;
	font-size: .8rem;
	color: white;

	div {
		cursor: pointer;
		margin: 0 10px;
	}
`;

const YearGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(10, 35px);

	.fridays-13th-count {
		opacity: 0;
		transition-duration: 1s;
	}

	&.show-friday-13th-count {
		.fridays-13th-count {
			opacity: 1;
		}
	}

	&.show-friday-13th {
		.friday-13th {
			color: red;
		}
	}

	.current-year {
		background-color: ${({ theme }) => theme.calendarCurrentBg};
	}
	.matching-year {
		background-color: #ccc;
	}
	.mostly-matching-year {
		background-color: #eee;
	}
`;

function Calendar(props) {
	const [ yearBlocks, setYearBlocks ] = useState([]);
	const [ showFriday13thCount, setShowFriday13thCount ] = useState(false);
	const [ showFriday13th, setShowFriday13th ] = useState(false);
	const [ monthData, setMonthData ] = useState(null);
	const [ showYearMenu, setShowYearMenu ] = useState(false);
	const [ yearObj, setYearObj ] = useState({});
	const [ yearRect, setYearRect ] = useState();
	const [ lastYearClicked, setLastYearClicked ] = useState();

	const yearGridRef = useRef();
	const calendarLayoutRef = React.createRef();

	useEffect(() => {
		var els = Array.from(document.querySelectorAll('.year-block'));
		setYearBlocks(els);

		const today = new Date();
		const currentYear = ''+today.getFullYear();
		var currentYearEl;
		els.forEach(el => {
			if (el.dataset.year === currentYear) {
			currentYearEl = el;
			el.classList.add('current-year');
			}
		});
		currentYearEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
	}, []);


	/*
	  Process menu that pops up for selected year.
	  Options are:
	    Calendar: Display conventional calendar for year.
	    Matching: Highlight years that match, or mostly match, selected year.
	*/
	const handleYearMenu = e => {
		var el = e.currentTarget;
console.log(el.dataset);
		var opt = el.dataset.opt;
		var { year, matchJan, matchIsLeap } = yearObj;
		switch (opt) {
			case 'calendar':
				var data = generateMonthData({ year, janDigit: matchJan, isLeap: matchIsLeap === 'true' });
				if (calendarLayoutRef.current) calendarLayoutRef.current.style.display = 'block';
				console.log('handleYearClick', data[0]);
				setMonthData(data);
				break;
			case 'matching':
				// Highlight exactly matching years.
				var matchingYearBlocks = yearBlocks.filter(yb => yb.dataset.jan === matchJan && yb.dataset.leap === matchIsLeap);
				matchingYearBlocks.forEach(yb => yb.classList.add('matching-year'));

				// Highlight mostly matching years.
				// The "leap" value is passed as a string, not a boolean.
				var notLeapVal = el.dataset.leap === 'true' ? 'false' : 'true';
				// To explain the setting for janVal:
				// If the selected year is a leap year, mostly matching years will be non-leap years, with
				// the number for January one greater than the number for January of the selected year.
				// Example: selected 401 means mostly matching 511.
				// Likewise, if the selected year is a non-leap year, mostly matching years will be leap years,
				// with January one less than the January for the selected year.
				var janVal = (el.dataset.leap === 'true' ? 1*matchJan + 1 : 1*matchJan + 6) % 7;

				// Note yb.dataset.jan == janVal. Using == instead of === because dataset.jan is a string, janVal is a number.
				var mostlyMatchingYearBlocks = yearBlocks.filter(yb => yb.dataset.jan == janVal && yb.dataset.leap === notLeapVal);
				mostlyMatchingYearBlocks.forEach(yb => yb.classList.add('mostly-matching-year'));
				break;
		}
		setShowYearMenu(false);
	}

	/*
	  When you click on a year, highlight the years whose configurations exactly match.
	  Also, highlight years whose configurations mostly match (March - December).
	*/
	const handleYearClick = e => {
		// First, housekeeping: clear previous matching years.
		yearBlocks.forEach(yb => yb.classList.remove('matching-year'));
		yearBlocks.forEach(yb => yb.classList.remove('mostly-matching-year'));

		// Get info from clicked year.
		e.preventDefault();
		var el = e.currentTarget;

		var year = el.dataset.year;
		var matchJan = el.dataset.jan;
		var matchIsLeap = el.dataset.leap;
		setYearObj({ year, matchJan, matchIsLeap });
		var data = generateMonthData({ year, janDigit: matchJan, isLeap: matchIsLeap === 'true' });
		var yearElData = el.getBoundingClientRect();
		setYearRect(yearElData);
		if (lastYearClicked === year) {
			setShowYearMenu(!showYearMenu);
		} else {
			setShowYearMenu(true);
		}
		setLastYearClicked(year);
	}

	const toggleFriday13thCount = () => {
		if (showFriday13thCount) {
			yearGridRef.current.classList.remove('show-friday-13th-count');
		} else {
			yearGridRef.current.classList.add('show-friday-13th-count');
		}
		setShowFriday13thCount(!showFriday13thCount);		
	}

	const toggleFriday13th = () => {
		if (showFriday13th) {
			yearGridRef.current.classList.remove('show-friday-13th');
		} else {
			yearGridRef.current.classList.add('show-friday-13th');
		}
		setShowFriday13th(!showFriday13th);		
	}

	const closeCalendarLayout = () => {
		calendarLayoutRef.current.style.display = 'none';
	}

	var postDates = [
		{ days: 31, year: 2021, month: 1, day: 30, blanks: 5 },
		{ days: 28, year: 2021, month: 2, day: 30, blanks: 1 },
		{ days: 31, year: 2021, month: 3, day: 30, blanks: 1 },
		{ days: 30, year: 2021, month: 4, day: 30, blanks: 4 },
		{ days: 31, year: 2021, month: 5, day: 30, blanks: 6 },
		{ days: 30, year: 2021, month: 6, day: 30, blanks: 2 },
		{ days: 31, year: 2021, month: 7, day: 30, blanks: 4 },
		{ days: 31, year: 2021, month: 8, day: 30, blanks: 0 },
		{ days: 30, year: 2021, month: 9, day: 30, blanks: 3 },
		{ days: 31, year: 2021, month: 10, day: 30, blanks: 5 },
		{ days: 30, year: 2021, month: 11, day: 30, blanks: 1 },
		{ days: 31, year: 2021, month: 12, day: 30, blanks: 3 }
	];

	var rangeLength = 800;
	var startingYear = 1600;
	var years = Array.from({length: rangeLength}, (n, offset) => startingYear + offset);
	return (
		<>
	      <Container>
	        <Row>
	          <Col>
	            <MenuBar>
                      <div onClick={toggleFriday13thCount}>Fridays the 13th Count</div>
{/* <div onClick={toggleFriday13th}>Fridays the 13th</div> */}
	            </MenuBar>
	            <YearGrid ref={yearGridRef} className="year-grid">
	            { years.map((y, key) => <DrawYear12Digit key={key} year={y} handleYearClick={handleYearClick} /> ) }
	            </YearGrid>

	          </Col>
	        </Row>
	      </Container>
		  { monthData ? <CalendarLayout ref={calendarLayoutRef} months={monthData} hideCalendar={closeCalendarLayout} /> : null }
	          { showYearMenu ? <YearMenu className="year-menu" rect={yearRect} handleYearMenu={handleYearMenu} /> : null }
		</>
	);
}

export default Calendar;
