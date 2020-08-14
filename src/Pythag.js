import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import './pythag.css';

const STARTING = 20;
var SQUARE_WIDTH = 21;
var MOVE_DELAY = 500;

/*
 * function Pythag, which uses state.
 */
function squarePosition(row, col) {
  var top = (row - 1) * SQUARE_WIDTH, left = (col - 1) * SQUARE_WIDTH;
  return { top, left };
}

function makeSquares(triple, letter, squareType = '') {
  var size = triple[letter];
  var squares = [];
  let className = 'square';
  if (squareType) className += ' ' + squareType;
  var totalSquares = size * size;
  var offset = letter === 'b' ? triple.c - triple.b : 0;

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
  const url = 'http://localhost:8081/pythag/' + a;
  return fetch(url).then(res => res.json()).then(res => { return res; });
}

function Pythag(props) {
  var [triple, setTriple] = useState({ });
  var [triples, setTriples] = useState([]);

  SQUARE_WIDTH = STARTING - (5*parseInt(triple.c/10,10)) + 1;
  MOVE_DELAY = 500 - (150*parseInt(triple.c/10,10));
  console.log('move delay', MOVE_DELAY);

  function handleBlur(e) {
    e.preventDefault();
    var el = e.target;
    getPythagData(el.value).then(res => {
      let triple = res[0];
      setTriple({ a: triple[0], b: triple[1], c: triple[2] });
      setTriples(res);
    });
  }

  function clickHandler(e) {
    e.preventDefault();
    var el = e.target;
    console.log(el.dataset);
    var triple = el.dataset.triple.split(',');
    console.log(triple, triple.length);
    setTriple({ a: triple[0], b: triple[1], c: triple[2] });
  }

  var cSide = triple.c * SQUARE_WIDTH + 1;
  var squares = makeSquares(triple, 'c');
  var aSquares = makeSquares(triple, 'a', 'a-square');
  var bSquares = makeSquares(triple, 'b', 'b-square');
  setTimeout(() => { moveASquares(triple) }, 1000);
  return (
    <div className="Pythagorean-Toy" style={{ backgroundColor: '#ddd' }}>
      <Container>
        <Row>
          <Col>
            <h2 className="text-primary">Pythagorean Toy</h2>
            <InputGroup className="pythag-a">
              <InputGroup.Prepend>
                <InputGroup.Text id="a-input">a=</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl placeholder="" aria-label="" aria-describedby="a-input" onBlur={handleBlur}/>
            </InputGroup>

            {triples.map((t, key)  => <Button key={key} onClick={clickHandler} data-triple={t} variant="primary">{t.join(', ')}</Button>)}
          </Col>
          <Col>
      { triple.a && (
            <div className="c-squared" style={{ height: cSide + 'px', width: cSide + 'px' }}>
              { squares.map((square, ndx) => {
                  return square;
                }) }
              { bSquares.map((square, ndx) => {
                  return square;
                }) }
              { aSquares.map((square, ndx) => {
                  return square;
                }) }
            </div> ) }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Pythag
