import React, { Component } from 'react';

class Numerator extends Component {
  constructor(props) {
    super(props);
    this.numerator = props.numerator;
    this.expansion = props.expansion;
    this.action = props.action;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.action(this.expansion);

  }

  render() {
    return <span onClick={this.handleClick}>{this.numerator}</span>
  }
}

export default Numerator;
