import React from 'react';
import styled from 'styled-components';
import DrawMonth from './DrawMonth'; // Do we need this?
import close from '../../close.svg';

const CalendarLayoutPlaceholder = styled.div`
	position: fixed;
	top: 80px;
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
`;

const CalendarLayout = React.forwardRef((props, ref) => {
	return (
		  <CalendarLayoutPlaceholder ref={ref}>
		    <CalendarLayoutWrapper>
		      <CalendarMonthGrid>
		        <div /><div /><div style={{display: 'flex', justifyContent: 'flex-end'}}><CalendarCloseButton onClick={props.hideCalendar}></CalendarCloseButton></div>
	          { props.months.map((m, key) => <DrawMonth key={key} monthData={m} />) }
		      </CalendarMonthGrid>
		    </CalendarLayoutWrapper>
		  </CalendarLayoutPlaceholder>
	);
});

export default CalendarLayout;
