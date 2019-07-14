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
          console.log('Expansion constructor');
  }

  componentDidUpdate() {
          console.log('Expansion componentDidUpdate');
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
    this.props.displayNumerator({ fraction, forDisplay });
  }

  handleClick(e) {
    this.props.numeratorState(this.props.item);
    this.render();
  }

  render() {
    const g = this.props.item;
    const numClass = this.props.showNumerators ? 'show-numerators' : 'hide-numerators';
    return (
      <div key={g.expansion}>
      <h3 onClick={this.handleClick}>{g.expansion}</h3>
        <div className={numClass}>
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
    this.displayNumerator = this.displayNumerator.bind(this);
    this.numeratorState = this.numeratorState.bind(this);
    this.showNumeratorState = {};
  }

  componentDidMount() {
    let denom = this.denom;
    fetchDenom(denom).then(res => {
      res.expansions.sort((a, b) => a.numerator - b.numerator);
      let expansions = res.expansions;
      expansions.unshift({});
      res.groups.forEach(g => { this.showNumeratorState[g.expansion] = false; });
      this.setState({ denom: denom, info: res, expansions });
    });
  }

  componentDidUpdate() {
          console.log('Denom componentDidUpdate');
  }

  displayNumerator(stateVars) {
    this.setState({ ...stateVars });
  }

  numeratorState(item) {
    let allExpansions = Object.keys(this.showNumeratorState);
    allExpansions.forEach(exp => {
      if (exp !== item.expansion) {
        this.showNumeratorState[exp] = false;
      }
    });
    this.showNumeratorState[item.expansion] = !this.showNumeratorState[item.expansion];
    this.setState({ dummy: true });
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
            {info.groups.map(g => {
              let showNumerators = !!this.showNumeratorState[g.expansion];
              return (
                <Expansion key={g.expansion} showNumerators={showNumerators} numeratorState={this.numeratorState} displayNumerator={this.displayNumerator} item={g} expansions={expansions} denom={denom} />
                )
              } )
            }
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
