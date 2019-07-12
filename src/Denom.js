import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import prep from './denom-helper';
import './Denom.css';

function fetchDenom(denom) {
  var url = 'http://localhost:8080/denom_byexpansion/' + denom;
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(res => {
      return prep(denom, res);
    })
}

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

class Expansion extends Component {
  constructor(props) {
    super(props);
    this.setNumerator = this.setNumerator.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  formatNumeratorList(numerators) {
    let expansions = this.props.expansions;
    let formatted = (
      <div className="numerator">
      {numerators.map(numerator => (
        <Numerator key={numerator} expansion={expansions[numerator]} action={this.setNumerator} numerator={numerator}/>
       )
	  )}
      </div>
    );
    return formatted
  }

  expansionForDisplay(data) {
    let { nonRepeat, repeat } = data;
    let repeatStr = '';
    let times = 100;
    for (let i = 0; i < times; i++) {
      repeatStr += repeat;
    }
    let forDisplay;
    if (repeat.length % 2 === 0) {
      let repeata = repeat.substr(0, repeat.length / 2);
      let repeatb = repeat.substr(repeat.length / 2);
      forDisplay = <span><span className="non-repeat">{nonRepeat}</span><span className="repeat-a">{repeata}</span><span className="repeat-b">{repeatb}</span><span className="to-infinity">{repeatStr}</span></span>
    } else {
      forDisplay = <span><span className="non-repeat">{nonRepeat}</span><span className="repeat">{repeat}</span><span className="to-infinity">{repeatStr}</span></span>
    }
    return forDisplay;
  }

  setNumerator(expansionData) {
    let fraction = <span className="fraction"><span className="numerator">{expansionData.numerator}</span> / <span className="denominator">{this.props.denom}</span></span>;
    let forDisplay = this.expansionForDisplay(expansionData);
    this.props.updateDisplay({ fraction, forDisplay });
  }

  handleClick(e) {
    let thisEl = e.target;
    let numeratorsEl = thisEl.nextSibling;
    let els = Array.from(document.getElementsByClassName('numerators'));
    els.forEach(el => { el.classList.remove('show-numerators'); el.classList.add('hide-numerators'); });
    numeratorsEl.classList.remove('hide-numerators');
    numeratorsEl.classList.add('show-numerators');
    console.log('click', this, e.target.nextSibling);
  }

  render() {
    const g = this.props.item;
    return (
      <div key={g.expansion}>
      <h3 onClick={this.handleClick}>{g.expansion}</h3>
        <div className="numerators hide-numerators">
        {this.formatNumeratorList(g.numerators)}
        </div>
      </div>
    );
  }
}

class Denom extends Component {
  constructor(props) {
    super(props);
    this.denom = props.match.params.denom;
    this.state = { denom: null, info: {}, expansions: {}, forDisplay: null };
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  componentDidMount() {
    let denom = this.denom;
    fetchDenom(denom).then(res => {
      res.expansions.sort((a, b) => a.numerator - b.numerator);
      let expansions = res.expansions;
      expansions.unshift({});
      this.setState({ denom: denom, info: res, expansions });
    });
  }

  updateDisplay(stateVars) {
    this.setState({ ...stateVars });
  }


  render() {
    const { denom, info, expansions } = this.state;
    if (!denom) {
      return <div className="content"><h1>Denom page</h1></div>
	} else {
      return (
      <div className="content">
        <div className="flex-container">
          <div className="left-side">
            <h2>{denom}ths</h2>
            <p>{info.groupCount} for fractions having a denominator of {denom}:</p>
            <p>The numerators for these are:</p>
            {info.groups.map(g => (
              <Expansion key={g.expansion} updateDisplay={this.updateDisplay} item={g} expansions={expansions} denom={denom} />
            ) )}
          </div>
          <div className="right-side">
            <h2>The Big Show</h2>
            <div>
            {this.state.fraction}
            </div>
            <div>
            {this.state.forDisplay}
            </div>
          </div>
        </div>
      </div>
    )
	}

  }
}

export default withRouter(Denom);
