import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
          Arithmophile {this.title}
      </header>
    );
  }
}

export default withRouter(Masthead);
