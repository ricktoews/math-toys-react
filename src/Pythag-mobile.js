import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';



import './pythag.css';

const STARTING = 20;
var SQUARE_WIDTH = 21;
var MOVE_DELAY = 500;

function Square(props) {
  var className = 'square';
  if (props.type === 'a') { className += ' a-square'; }
  else if (props.type === 'b') { className += ' b-square'; }
  return (
    <div style={{ position: 'relative' }}>
      <div className={ className } style={{
      display: 'none',
      width: (SQUARE_WIDTH - 1) + 'px',
      height: (SQUARE_WIDTH - 1) + 'px',
      border: '1px solid black'
    }}></div>
      <div>{props.type}<span>2</span> = {props.value} x {props.value} ({props.value*props.value})</div>
    </div>
  );
}


/*
 * function Pythag, which uses state.
 */
function squarePosition(row, col) {
  var top = (row - 1) * SQUARE_WIDTH, left = (col - 1) * SQUARE_WIDTH;
  return { top, left };
}

function resetASquares(triple) {
	var size = triple.a;
	var totalSquares = size * size;
	for (let i = 0; i < totalSquares; i++) {
		let r = Math.ceil((i + 1) / size), c = (i % size) + 1;
		let pos = squarePosition(r, c);
		let id = `a-${i}`;
		let el = document.querySelector('#' + id);
		el.style.transition = '.5s';
		el.style.top = pos.top + 'px';
		el.style.left = pos.left + 'px';
	}
}


function makeSquares(triple, letter, squareType = '') {
	var size = triple[letter];
	var squares = [];
	let className = 'square';
	if (squareType) className += ' ' + squareType;
	var totalSquares = size * size;
	var offset = letter === 'b' ? triple.c - triple.b : 0;
	var backgroundColor = { a: 'rbga(223, 240, 184, .9)', b: '#dff0b8', c: 'rgba(223, 240, 184, .5)' };

	for (let i = 0; i < totalSquares; i++) {
		let r = Math.ceil((i + 1) / size) + offset, c = (i % size) + 1 + offset;
		let pos = squarePosition(r, c);
		let id = `${letter}-${i}`;
		squares.push(<div id={id} key={i} className={ className } style={{ 
			top: pos.top + 'px', 
			left: pos.left + 'px',
			width: (SQUARE_WIDTH - 1) + 'px',
			height: (SQUARE_WIDTH - 1) + 'px',
		}}></div>);
	}

	return squares;
}

function getASides(triple) {
  var topWidth = triple.b;
  var topHeight = triple.c - triple.b;
  var totalSquares = triple.c * triple.c;
  var aSides = [];
  for (let i = 0; i < totalSquares; i++) {
    let row = Math.ceil((i + 1) / triple.c), col = (i % triple.c) + 1;
    if (col > triple.a && row <= triple.c - triple.b ||
        col <= triple.c - triple.b && row > triple.a) {
      let moveToRow = Math.ceil((i + 1) / triple.c);
      let moveToCol = (i % triple.c) + 1;
      aSides.push({ row: moveToRow - 1, col: moveToCol - 1 });
    }
  }
return aSides;
}

function moveSquare(id, triple, squareMoved) {
  var aSides = getASides(triple);
  var dest = { top: aSides[squareMoved].row * SQUARE_WIDTH, left: aSides[squareMoved].col * SQUARE_WIDTH };
  var el = document.querySelector('#' + id);
  el.style.transition = '1s';
  el.style.transform = 'rotate(360deg)';
  el.style.top = dest.top + 'px';
  el.style.left = dest.left + 'px';
}

function moveASquares(triple) {
  var aThickness = triple.c - triple.b;
  var squareMoved = 0;
  var totalSquares = triple.a * triple.a;
  var moveFn = [];
  for (let i = 0; i < totalSquares; i++) {
    let r = Math.ceil((i + 1) / triple.a), c = (i % triple.a) + 1;
    if (r > aThickness & c > aThickness) {
      setTimeout( (squareMoved => { 
        return () => { moveSquare('a-' + i, triple, squareMoved) }; 
	  } )(squareMoved), MOVE_DELAY * squareMoved);
      squareMoved++;
    }
    
  }
}

function getPythagData(a) {
  const url = 'http://arithmo.toewsweb.net:3000/pythag/' + a;
  return fetch(url).then(res => res.json()).then(res => { return res; });
}

function Pythag(props) {
  var [corner, setCorner] = useState(0);
  var [triple, setTriple] = useState({ });
  var [triples, setTriples] = useState([]);

  SQUARE_WIDTH = Math.max(STARTING - (5*parseInt(triple.c/10,10)) + 1, 5);
  
  MOVE_DELAY = 500 - (150*parseInt(triple.c/10,10));
  console.log('square width', SQUARE_WIDTH);

	const handleClick = e => {
		e.preventDefault();
		if (corner) {
			getPythagData(corner).then(res => {
				let triple = res[0];
				setTriple({ a: triple.a, b: triple.b, c: triple.c });
				setTriples(res);
			});
		}
	}

	const handleBlur = e => {
		e.preventDefault();
		var el = e.target;
		console.log('handleBlur; corner', el.value);
		setCorner(el.value);
	};

	const handleTripletSelect = e => {
		e.preventDefault();
		var el = e.currentTarget;
		console.log('dataset',el);
		var triple = el.dataset.triple.split(',');
		console.log('triple',triple, triple.length);
		setTriple({ a: triple[0], b: triple[1], c: triple[2] });
	}

  // Mainly added to see that it works. It does!
	function playHandler(e) {
		e.preventDefault();
		var el = e.target;
		moveASquares(triple);
	}

	const resetHandler = e => {
		e.preventDefault();
		resetASquares(triple);
	}

	var cSide = triple.c * SQUARE_WIDTH + 1;
	var squares = makeSquares(triple, 'c');
	var aSquares = makeSquares(triple, 'a', 'a-square');
	var bSquares = makeSquares(triple, 'b', 'b-square');
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
              <InputGroup.Prepend>
                <InputGroup.Text>Corner (c - b)</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl placeholder="" aria-label="" aria-describedby="" onBlur={handleBlur}/>
              <InputGroup.Append>
                <Button variant="info" onClick={handleClick}>Calculate</Button>
              </InputGroup.Append>
            </InputGroup>

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
		      <div className="c-label" style={{}}><Square type="c" value={triple.c} /></div>
		      <div className="b-label" style={{}}><Square type="b" value={triple.b} /></div>
		      <div className="a-label" style={{}}><Square type="a" value={triple.a} /></div>
            </div> 

			) }

            { triple.a && (<div className="pythag-buttons" style={{marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
				<Button onClick={playHandler} variant="secondary">Rearrange A<sup>2</sup></Button>
				<Button onClick={resetHandler} variant="secondary">Reset</Button>
			</div>)}

          </Col>
        </Row>
        <Row>
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
