import React from 'react';
import styled from 'styled-components';
import DrawMonth from './DrawMonth'; // Do we need this?

const CalendarLayoutPlaceholder = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	padding-top: 80px;
	background: rgba(128,128,128,.5);
`;

const CalendarLayoutWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100vw;
`;

const CalendarMonthGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	padding: 5px;
	background: black;
	color: white;
	border-radius: 10px;

	.year-header {
		grid-area: 1 / 1 / 1 / 4;
		display: flex;
		font-size: .9rem;
		justify-content: space-between;
	}
`;

const CalendarCloseButton = styled.div`
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.calendarCloseBg};
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const make12DigitString = months => {
	var digits = months.map(m => m.blanks);
	var digitStr = digits.join(' ');
	return digitStr;
};

const CalendarLayout = React.forwardRef((props, ref) => {
console.log('CalendarLayout props', props);
	return (
		  <CalendarLayoutPlaceholder ref={ref}>
		    <CalendarLayoutWrapper>
		      <CalendarMonthGrid>
		        <div className="year-header">
	                  <div>{props.months[0].year}</div>
                          <CalendarCloseButton onClick={props.hideCalendar}></CalendarCloseButton>
                        </div>
	          { props.months.map((m, key) => <DrawMonth key={key} monthData={m} />) }
		      </CalendarMonthGrid>
		    </CalendarLayoutWrapper>
		  </CalendarLayoutPlaceholder>
	);
});

export default CalendarLayout;
