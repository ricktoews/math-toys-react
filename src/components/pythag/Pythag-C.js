import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import PythagHelper from './pythag-helper';
import { checkSquare, findNextSquareLayer } from './pythag-check-c';
import styled from 'styled-components';
import '../../css/pythag.css';

const cData = [
	{ c: 5, pythag: ['3^2 + 4^2 (9 + 16)'] },
	{ c: 10, pythag: ['6^2 + 8^2 (36 + 64)'] },
	{ c: 13, pythag: ['5^2 + 12^2 (25 + 144)'] },
	{ c: 15, pythag: ['9^2 + 12^2 (81 + 144)'] },
	{ c: 17, pythag: ['8^2 + 15^2 (64 + 225)'] },
	{ c: 20, pythag: ['12^2 + 16^2 (144 + 256)'] },
	{ c: 25, pythag: ['7^2 + 24^2 (49 + 576)', '15^2 + 20^2 (225 + 400)' ] },
	{ c: 26, pythag: ['10^2 + 24^2 (100 + 576)'] },
];

var SQUARE_WIDTH = 11;

function PythagC(props) {
	const [ squareSide, setSquareSide ] = useState(5);
	const [ layerSquareCount, setLayerSquareCount ] = useState(0);
	const [ selectedLayer, setSelectedLayer ] = useState();
	const [ isSquare, setIsSquare ] = useState(false);
	const [ aSquares, setASquares] = useState([]);
	const [ aSquaredConfig, setASquaredConfig] = useState('wraparound');
	const [ squareEls, setSquareEls ] = useState();

	var cSide = squareSide * SQUARE_WIDTH + 1;
	var triple = { c: squareSide };
	var squares = PythagHelper.makeSquares(triple, 'c');

	useEffect(() => {
		var colors = ['#C31D2E', '#FD5510', '#F6EC6B', '#627656', '#1B666E'];
		var starting = squareSide - 2;
		var currentColor = 'none';
		var nextLayer = 0;
		while (starting > 0) {
			var pinPoint = squareSide * (starting - 1) + starting - 1;
			var el = document.getElementById('c-'+pinPoint);
			if (el.dataset.isSquare === 'true') {
				currentColor = colors[colors.length - ++nextLayer];
			}
			var classes = Array.from(el.classList);
			var layerClass = classes.find(c => c.substr(0, 6) === 'layer-');
			var layerEls = Array.from(document.querySelectorAll('.' + layerClass));
			layerEls.forEach(layerEl => layerEl.style.backgroundColor = currentColor);
			starting--;
		}
	}, [squareSide]);


	useEffect(() => {
//console.log('Layer square count', layerSquareCount);
	}, [layerSquareCount]);

	useEffect(() => {
		var cSquareEls = document.querySelectorAll('.c-squared > div');
		cSquareEls = Array.from(cSquareEls);

		cSquareEls.forEach(sq => {
//			sq.classList.remove('highlight-layer');
		});

		var cLayerSquares = cSquareEls.filter(sq => 1*sq.dataset.layer <= 1*selectedLayer);
		cLayerSquares.forEach(sq => {
			sq.classList.add('highlight-layer');
		});

	}, [selectedLayer]);

	var CSquare = styled.div`
		display: inline-block;
		margin: 40px 0;
		height: ${cSide}px;
		width: ${cSide}px;
	`;

	const handleSetSide = e => {
		var el = e.currentTarget;
		var side;
		if (el.dataset && el.dataset.c) {
			side = el.dataset.c;
		} else {
			side = el.value;
		}
		setSquareSide(side);
	}

	// Select the next square layer, if there is one.
	const selectLayer = e => {
		var el = e.target;
		var checkSquareData = checkSquare(squareSide);

		// Starting at the selected layer, check for isSquare, and keep pealing layers until one is found.
		var nextSquareLayer = findNextSquareLayer(el, squareSide);
		if (nextSquareLayer === selectedLayer) return;
		var layers = checkSquareData.layers.slice(0, nextSquareLayer);

		var count = layers.reduce((a, cv) => a+cv, 0);
		var isSq = Math.sqrt(count) === Math.ceil(Math.sqrt(count));

		var a = PythagHelper.makeSquares(triple, 'a', 'a-square');
		setASquares(a);
		setSelectedLayer(nextSquareLayer); // This is what changes the layer setting and causes the highlight class to be applied.
		setLayerSquareCount(count);
		setIsSquare(isSq);
	};

	const toggleAHandler = e => {
		e.preventDefault();
		var triple = { c: squareSide, a: Math.ceil(Math.sqrt(layerSquareCount)) };

		if (aSquaredConfig === 'wraparound') {
			setASquaredConfig('square');   
			PythagHelper.arrangeA(triple, 'square');
		} else {
			setASquaredConfig('wraparound');   
			PythagHelper.arrangeA(triple, 'wraparound');
		}
	}
	return (
	<Container>
		<div>Square side <input className="input" id="square-side" onChange={handleSetSide} value={squareSide} /></div>
		<div>c^2 = {squareSide}^2 = {squareSide*squareSide}</div>
		<div>a^2 = {layerSquareCount}</div>
		<div>b^2 = {squareSide*squareSide - layerSquareCount}</div>
		{/* <div>Squares in selected layer(s) {layerSquareCount} {isSquare?'square':'not a square'}</div> */}
		<Button style={{display:'none'}} onClick={toggleAHandler}>Arrange</Button>
		<CSquare className="c-squared" onMouseOver={selectLayer}>
              { squares.map((square, ndx) => {
                  return square;
                }) }
              {/* aSquares.map((square, ndx) => {
                  return square;
                }) */}
		</CSquare> 
	        <Table variant="math" bordered hover>
	          <thead>
	            <tr>
	              <th>c</th>
	              <th>c<sup>2</sup></th>
	              <th>a, b</th>
	            </tr>
	          </thead>
	          <tbody>
		{ cData.map((item, key) => {
		    return (
	            <tr key={key} data-c={item.c} onClick={handleSetSide}>
	              <td>{item.c}</td>
	              <td>{item.c*item.c}</td>
	              <td>
			{ item.pythag.map((p, pKey) => {
			return (
			  <div key={pKey}>{p}</div>
			) } ) }
                      </td>
	            </tr>
	            );
		} ) }
	          </tbody>
	        </Table>
       	</Container>
	);
}

export default PythagC
