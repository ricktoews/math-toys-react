import React from 'react';
import styled from 'styled-components';

const cSide = 60;
const cColor = '#cccccc';
const cBorder = '1px solid #333';
const bSide = 43;
const bColor = '#aaaaaa';
const bBorder = '1px solid #333';
const aSide = cSide - bSide;
const aColor = '#999';
const aBorder = '1px solid #333';

const CSquare = styled.div`
	position: relative;
	width: ${cSide}px;
	height: ${cSide}px;
	background-color: ${cColor};
	margin-bottom: 10px;
`;

const BSquare = styled.div`
	position: absolute;
	right: 0px;
	bottom: 0px;
	width: ${bSide}px;
	height: ${bSide}px;
	background-color: ${bColor};
`;

const ASquare = styled.div`
	position: absolute;
	left: 0px;
	top: 0px;
	width: ${aSide}px;
	height: ${aSide}px;
	background-color: ${aColor};
`;


function PythagIllus(props) {
	const { colors } = props;
	return (
		<CSquare style={{ backgroundColor: colors.c }}>
		  <ASquare style={{ backgroundColor: colors.a }} />
		  <BSquare style={{ backgroundColor: colors.b }} />
		</CSquare>
	);
}

export default PythagIllus;
