import React, { useState } from 'react';

import './pythag.css';

const SQUARE_WIDTH = 21;
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
    squares.push(<div id={id} key={i} className={ className } style={{ top: pos.top + 'px', left: pos.left + 'px' }}></div>);
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
	  } )(squareMoved), 500 * squareMoved);
      squareMoved++;
    }
    
  }
}

function Pythag(props) {
  const triple = { a: 8, b: 15, c: 17 };
  var cSide = triple.c * SQUARE_WIDTH + 1;
  var squares = makeSquares(triple, 'c');
  var aSquares = makeSquares(triple, 'a', 'a-square');
  var bSquares = makeSquares(triple, 'b', 'b-square');
  setTimeout(() => { moveASquares(triple) }, 1000);
  return (
    <div>
      <h1>Draw Squares within Square</h1>
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
      </div>
    </div>
  );
}

export default Pythag
