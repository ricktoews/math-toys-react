import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import PythagHelper from './pythag-helper';
import { showTriples, makeCList, checkSquare, findNextSquareLayer } from './pythag-check-c';
import styled from 'styled-components';
import '../../css/pythag.scss';

var cData = makeCList(100);

const STARTING = 20;
var SQUARE_WIDTH = 11;

function PythagC(props) {
	const [ squareSide, setSquareSide ] = useState(5);
	const [ layerSquareCount, setLayerSquareCount ] = useState(0);
	const [ selectedLayer, setSelectedLayer ] = useState();
	const [ isSquare, setIsSquare ] = useState(false);
	const [ aSquares, setASquares] = useState([]);
	const [ aSquaredConfig, setASquaredConfig] = useState('wraparound');
	const [ squareEls, setSquareEls ] = useState();
	var [triple, setTriple] = useState({ });
	var [triples, setTriples] = useState([]);

	var cSide = squareSide * SQUARE_WIDTH + 1;
	var triple = { c: squareSide };
	var squares = PythagHelper.makeSquares(triple, 'c');
	SQUARE_WIDTH = Math.max(STARTING - (5*parseInt(triple.c/10,10)) + 1, 5);
	PythagHelper.setSquareWidth(SQUARE_WIDTH);

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
		var pythagC;
		var triples = [];
		if (el.dataset && el.dataset.c) {
			let abCol = el.childNodes[2];
			let ab = Array.from(abCol.getElementsByClassName('ab'));
			pythagC = 1*el.dataset.c;
			ab.forEach(item => {
				let triple = { a: 1*item.dataset.a, b: 1*item.dataset.b, c: pythagC, isPrimitive: item.dataset.primitive };
				triples.push(triple);
			});

		} else {
			pythagC = el.value;
		}
		setSquareSide(pythagC);
		setTriples(triples);
	}

	const handleTripletSelect = e => {
		e.preventDefault();
		var el = e.currentTarget;
		console.log('dataset',el);
		var triple = el.dataset.triple.split(',');
		console.log('triple',triple, triple.length);
		setTriple({ a: triple[0], b: triple[1], c: triple[2] });
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
	<div className="container">
          <div className="row">
            <div className="col">
{/*		<div>Square side <input className="input" id="square-side" onChange={handleSetSide} value={squareSide} /></div> */}
{ triples.length > 0 && showTriples(triples) }
		<Button style={{display:'none'}} onClick={toggleAHandler}>Arrange</Button>
		<CSquare className="c-squared" onMouseOver={selectLayer}>
              { squares.map((square, ndx) => {
                  return square;
                }) }
              {/* aSquares.map((square, ndx) => {
                  return square;
                }) */}
		</CSquare> 
            </div>
            <div className="col">
              <div className="table-wrapper-scroll-y" style={{ height: "calc(100vh - 100px)", overflowY: "scroll", border: "1px solid #ccc" }}>
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
			  <div className="ab" data-primitive={p.isPrimitive} data-a={p.a} data-b={p.b} key={pKey}>{p.equation}</div>
			) } ) }
                      </td>
	            </tr>
	            );
		} ) }
	          </tbody>
	        </Table>
              </div>
            </div>
          </div>
       	</div>
	);
}

export default PythagC
