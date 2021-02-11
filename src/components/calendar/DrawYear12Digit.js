import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const yearTemplate = [0,3,3,6,1,4,6,2,5,0,3,5];
const leapTemplate = [0,3,4,0,2,5,0,3,6,1,4,6];

const isLeap = year => {
	var result = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	return result;
}


const calcJan = year => {
	var yearOffset = year % 400;
	var centuryYears = Math.floor(yearOffset / 100);

	// Need century years, to subtract non-leap years. If the requested year is itself such a year, don't include it.
	// Why? (I'll get back to you on that.)
	if (year % 400 > 0 && year % 100 === 0) centuryYears--;
	var leapYears = Math.ceil(yearOffset / 4) - centuryYears;

	// Gregorian calendar.
	// 6 is the magic number. It just happens that 6 is the number for January in a % 400 === 0 year.
	var jan = 6 + yearOffset + leapYears;

	// Make sure 0 <= jan < 7.
	jan = jan % 7;

	return jan;
}

const calc12DigitYear = year => {
	var jan = calcJan(year);
	var yearDigits = [];
	var template = isLeap(year) ? leapTemplate : yearTemplate;
	yearDigits = template.map(d => (d+jan)%7);
	return yearDigits;
}

const Year = styled.div`
	position: relative;
	margin: 1px;
	margin-bottom: 3px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(4, 1fr);

	> div {
		cursor: pointer;
		font-size: .6rem;
		text-align: center;
	}

	.year-label {
		grid-column: 1/4;
		font-weight: bold;
		color: #6C84AA;
	}
`;

const Friday13thWrapper = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	grid-column: 1/4;
	grid-row: 2/6;
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
`;

const Friday13th = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 15px;
	height: 15px;
	font-size: .7rem;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.circleBg};
	color: ${({ theme }) => theme.circleColor};
	
`;

function DrawYear12Digit(props) {
	const { handleYearClick, year } = props;
	var digits = calc12DigitYear(year);
	var isLeap = digits[1] !== digits[2];
	var janDigit = digits[0];
	var friday13Count = digits.filter(d => d === 0).length;

	return (
	<>
	 <Year className="year-block" data-year={year} data-leap={isLeap} data-jan={janDigit} onClick={handleYearClick}>
	   <Friday13thWrapper className="fridays-13th-count"><Friday13th>{friday13Count}</Friday13th></Friday13thWrapper>
	   <div className="year-label" >{year}</div>
	   { digits.map((d, key) => <div key={key} className={d===0?'friday-13th':''}>{d}</div>) }
	 </Year>
	</>
	);
}

export default DrawYear12Digit;
