import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Expansion from './Expansion';
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

class Denom extends Component {
  constructor(props) {
    super(props);
    this.denom = props.match.params.denom;
    this.state = { denom: null, groups: [], groupCount: '', expansions: {}, forDisplay: null };
    this.displayNumerator = this.displayNumerator.bind(this);
    this.numeratorState = this.numeratorState.bind(this);
    this.setDenom = this.setDenom.bind(this);
    this.selectDenom = this.selectDenom.bind(this);
    this.showNumeratorState = {};
  }

  componentDidMount() {
    this.getDenomData();
  }

  /*
   * Perform the REST call that gets the denominator data, and set the component's state.
   * Sort expansions by numerator,
   * Sort groups by expansion,
   * Initialize showNumerator states,
   * Update component state for denom, groups, expansions.
   */
  getDenomData() {
    let denom = this.denom;
    return fetchDenom(denom).then(res => {
      // Sort decimal expansions by numerator.
      res.expansions.sort((a, b) => a.numerator - b.numerator);
      // Sort expansion groups numerically. The sort compares the strings, since all are the same length.
      res.groups.sort((a, b) => a.expansion < b.expansion ? -1 : 1);
      // Initialize the display numerators flags to false.
      res.groups.forEach(g => { this.showNumeratorState[g.expansion] = false; });
      // Just to sync numerator with index. Otherwise, index 0 would be 1/x.
      res.expansions.unshift({});
      this.setState({ denom: denom, dressed: res.dressed, groupCount: res.groupCount, groups: res.groups, expansions: res.expansions });
    });
  }

  /*
   * Set forDisplay.
   */
  displayNumerator(stateVars) {
          console.log('set forDisplay', stateVars);
    this.setState({ ...stateVars });
  }

  /*
   * Maintain the list of expansion toggle states. The state determines whether the numerators for
   * the expansion should be displayed or not.
   * The default is false for all expansions. When an expansion is clicked, the display of its numerators
   * is toggled. The numerator display can be open for only one expansion at a time.
   */
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

  /*
   * Handle selection of denominator, once it has been entered.
   */
  selectDenom() {
    console.log('selectDenom', this.denomField, this.props);
    let route = '/denom/' + this.denomField;
    this.denom = this.denomField;
    this.getDenomData().then(res => {
      this.props.history.push(route);
    });
  }

  /*
   * As the value in the denominator input field changes, keep track of it in the component,
   * so when the user has entered his selection, the event handler can get the value from the component.
   */
  setDenom(e) {
    this.denomField = e.target.value;
  }

  render() {
    const { denom, dressed, groups, groupCount, expansions } = this.state;
    if (!denom) {
      return <div className="content"><h1>Denom page</h1></div>
    } else {
      return (
      <div className="content">
        <div className="flex-container">
          <div className="left-side">
            <input type="text" id="input-denom" onChange={this.setDenom} /> <button id="select-button" onClick={this.selectDenom}>Go</button>
            <h2>The {dressed}</h2>
            <p>{groupCount} for fractions having a denominator of {denom}:</p>
            {groups.map(g => {
              let showNumerators = !!this.showNumeratorState[g.expansion];
              return (
                <Expansion key={g.expansion} showNumerators={showNumerators} numeratorState={this.numeratorState} displayNumerator={this.displayNumerator} item={g} expansions={expansions} denom={denom} />
                )
              } )
            }
          </div>

          <div className="right-side">
            <h2>{this.state.fraction}</h2>
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
