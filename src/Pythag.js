import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { renderToString } from 'react-dom/server';
import { Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import PythagHelper from './pythag-helper';
import InfoPanel from './InfoPanel';

import './pythag.css';

const STARTING = 20;

function Pythag(props) {
	var [corner, setCorner] = useState(1);
	var [triple, setTriple] = useState({ });
	var [triples, setTriples] = useState([]);

	var SQUARE_WIDTH = PythagHelper.SQUARE_WIDTH;
  
	useEffect(() => {
		processCorner();
	}, [corner]);

	// Need to be clear on exactly when this fires. Look up useEffect, second parameter.
	useEffect(() => {
		console.log('useEffect to call arrangeA, wraparound');
		PythagHelper.arrangeA(triple, 'wraparound');
	});

	SQUARE_WIDTH = Math.max(STARTING - (5*parseInt(triple.c/10,10)) + 1, 5);
	PythagHelper.setSquareWidth(SQUARE_WIDTH);
  
	PythagHelper.MOVE_DELAY = 500 - (150*parseInt(triple.c/10,10));

	const processCorner = () => {
		if (corner) {
			PythagHelper.getPythagData(corner).then(res => {
				let triple = res[0];
				setTriple({ a: triple.a, b: triple.b, c: triple.c });
				setTriples(res);
			});
		}
	}

	const handleDropdown = e => {
		var el = e.currentTarget;
		setCorner(el.dataset.corner);
	}

	const handleClick = e => {
		e.preventDefault();
		processCorner();
	}

	const handleBlur = e => {
		e.preventDefault();
		var el = e.target;
		setCorner(el.value);
	};

	const handleTripletSelect = e => {
		e.preventDefault();
		var el = e.currentTarget;
		var triple = el.dataset.triple.split(',');
		setTriple({ a: triple[0], b: triple[1], c: triple[2] });
}

  // Mainly added to see that it works. It does!
	function playHandler(e) {
		e.preventDefault();
		var el = e.target;
		PythagHelper.arrangeA(triple, 'wraparound');
	}

	const resetHandler = e => {
		e.preventDefault();
		PythagHelper.arrangeA(triple, 'square');
	}

	var cSide = triple.c * SQUARE_WIDTH + 1;
	var squares = PythagHelper.makeSquares(triple, 'c');
	var aSquares = PythagHelper.makeSquares(triple, 'a', 'a-square');
	var bSquares = PythagHelper.makeSquares(triple, 'b', 'b-square');
	var bPositions = [];
  return (
    <div className="Pythagorean-Toy">
      <Container>
        <Row>
          <Col>
            <h2 className="math-primary">Pythagorean Toy</h2>
          </Col>
        </Row>
        <Row>
          <Col>
	        <InputGroup className="pythag-a">
	  
            <Dropdown>
	          <Dropdown.Toggle variant="success" style={{ backgroundColor: "#66866b" }}>
	            Corner size (Currently {corner})
	          </Dropdown.Toggle>

	          <Dropdown.Menu>
	  { [1, 2, 3, 8, 9].map(side => {
	            return <Dropdown.Item key={side} data-corner={side} onClick={handleDropdown}>{side}</Dropdown.Item>
	  }) }
	          </Dropdown.Menu>
	          <InfoPanel id="corner-info" />
	        </Dropdown>
            </InputGroup>


	        <p style={{marginTop: "10px" }}>
	          <Button variant="secondary" onClick={playHandler}>{corner}<sup>2</sup> + 2 x {corner}x{triple.b}</Button> = <Button variant="secondary" onClick={resetHandler}>{triple.a}<sup>2</sup></Button>
	        </p>

            { triple.a && (

            <div className="c-squared" style={{ margin: '40px 0', height: cSide + 'px', width: cSide + 'px' }}>
              { squares.map((square, ndx) => {
                  return square;
                }) }
              { bSquares.map((square, ndx) => {
                  let pos = parseInt(square.props.style.top) + '-' + parseInt(square.props.style.left);
                  bPositions.push(pos);
                  return square;
                }) }
              { aSquares.map((square, ndx) => {
                  let pos = parseInt(square.props.style.top) + '-' + parseInt(square.props.style.left);
                  if (bPositions.indexOf(pos) !== -1) {
                      square.props.style.opacity = '.8';
				  }
                  return square;
                }) }
		      <div className="c-label" style={{}}><PythagHelper.Square type="c" value={triple.c} /></div>
		      <div className="b-label" style={{}}><PythagHelper.Square type="b" value={triple.b} /></div>
		      <div className="a-label" style={{}}><PythagHelper.Square type="a" value={triple.a} /></div>
            </div> 

			) }

          </Col>
          <Col>

            { triple.a && (
	        <Table variant="math" bordered hover>
	          <thead>
	            <tr>
	              <th>Triple</th>
	              <th>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></th>
	              <th>Primitive</th>
	            </tr>
	          </thead>
	          <tbody>
	            {triples.map((t, key) => (
	            <tr key={key} onClick={handleTripletSelect} data-triple={`${t.a},${t.b},${t.c}`}>
	              <td>({t.a}, {t.b}, {t.c})</td>
	              <td>{t.a*t.a} + {t.b*t.b} = {t.c*t.c}</td>
	              <td>{t.isPrimitive?'Yes':'No'}</td>
	            </tr>
                ))}
	          </tbody>
	        </Table>
			) }
	  
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Pythag
