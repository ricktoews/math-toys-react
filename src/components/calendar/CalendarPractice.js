import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import PracticeSteps from './PracticeSteps';
import styled from 'styled-components';

import { steps } from './calendar-steps-data';
import { formatDate } from './steps-helpers';

const stepsData = {};
var randYear = parseInt(Math.random() * 100, 10) + 2000;
stepsData.targetYear = randYear;
stepsData.targetMonth = parseInt(Math.random() * 12, 10) + 1;
stepsData.targetDate = parseInt(Math.random() * 28, 10) + 1;


function CalendarPractice(props) {
	const firstFieldRef = useRef();

	return (
	<>
	  <Container>
	    <Row>
	      <Col>
	        <div>
	          <div className="date-prompt">Find the day of the week for { formatDate(stepsData) }.</div>
	          <PracticeSteps stepsData={stepsData} steps={steps} />
	        </div>
	      </Col>
	    </Row>
	  </Container>
	</>

	);
}

export default CalendarPractice;
