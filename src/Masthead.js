import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Hamburger from './Hamburger';

function Masthead(props) {
    var path = props.location.pathname;

    return (
      <header className="App-header">
		<Hamburger toggle={props.toggle} />
        <div className="masthead">The Avocational Arithmophile</div>
		<Nav style={{ left: '200px', display: 'none' }}>
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/pythag">Pythagorean Triples</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/denom">Denominators</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/phi">Phi</Nav.Link>
          </Nav.Item>
        </Nav>
      </header>
    );
}

export default withRouter(Masthead);
