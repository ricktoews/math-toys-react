import React from 'react';
import styled from 'styled-components';
import DrawMonth from './DrawMonth'; // Do we need this?

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
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: green;
`;

const CalendarLayout = React.forwardRef((props, ref) => {
	return (
		  <CalendarLayoutPlaceholder ref={ref}>
		    <CalendarLayoutWrapper>
		      <CalendarMonthGrid>
		        <div /><div /><div style={{display: 'flex', justifyContent: 'flex-end'}}><CalendarCloseButton onClick={props.hideCalendar} /></div>
	          { props.months.map((m, key) => <DrawMonth key={key} monthData={m} />) }
		      </CalendarMonthGrid>
		    </CalendarLayoutWrapper>
		  </CalendarLayoutPlaceholder>
	);
});

export default CalendarLayout;
