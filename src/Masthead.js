import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

class Masthead extends Component {
  constructor(props) {
    super(props);
    let path = this.props.location.pathname;
    this.title = this.setTitle(path);
  }

  setTitle(path) {
    let title = 'Home';

    if (path === '/') {
      title = '- Home';
    } else if (/denom/.test(path)) {
      title = '- Denominator Analyzer';
    }
    return title;
  }

  render() {
    return (
      <header className="App-header">
        <div>The Avocational Arithmophile</div>
		<Nav>
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/pythag">Pythagorean Triples</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/denom">Denominators</Nav.Link>
          </Nav.Item>
        </Nav>
      </header>
    );
  }
}

export default withRouter(Masthead);
