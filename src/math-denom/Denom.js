import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import DenomDescription from './DenomDescription';
import Expansion from './Expansion';
import prep from './denom-helper';
import getDenomDesc from './denom-description';
import './Denom.css';

function fetchDenomDesc(denom) {
	return getDenomDesc(denom);
}

function fetchDenom(denom) {
  var url = '//arithmo.toewsweb.net:3000/denom_byexpansion/' + denom;
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
    this.state = { denom: null, groups: [], groupCount: '', expansions: {}, forDisplay: null, factors: {}, flags: {}, denomData: {} };
    this.displayNumerator = this.displayNumerator.bind(this);
    this.numeratorState = this.numeratorState.bind(this);
    this.setDenom = this.setDenom.bind(this);
    this.selectDenom = this.selectDenom.bind(this);
    this.showNumeratorState = {};
  }

  componentDidMount() {
    this.getDenomData();
    this.getDenomDesc();
  }

  getDenomDesc() {
	  let denom = this.denom;
	  return fetchDenomDesc(denom).then(res => {
		var data = res && res[0];
		var metaData = data && data.metaData || {};
		var flags = {
			isFullReptend: metaData.fullReptend,
			internalComplement: metaData.complementType === 'internal',
			externalComplement: metaData.complementType === 'external',
			hybrid: metaData.hybrid,
			resolves: metaData.complementType === 'none',
			isPrime: data && data.factors.length === 0
		};
		  console.log('flags', flags);
		  console.log('denomData', data);
		  this.setState({ flags: flags, denomData: data });
	  });
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
      this.setState({ denom: denom, dressed: res.dressed, groupCount: res.groupCount, groups: res.groups, expansions: res.expansions, factors: res.factors });
    });
  }

  /*
   * Set forDisplay.
   */
  displayNumerator(stateVars) {
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
    let route = '/denom/' + this.denomField;
    this.denom = this.denomField;
    this.getDenomDesc();
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

  /*
   * Format list of factors for this denominator.
   */
  formatFactors(factors) {
    let f = Object.keys(factors).sort((a, b) => a-b);
    let factorEls = (
      <div>
      {f.map((factor, key) => {
        return <span key={key}>{factor}<sup>{factors[factor]}</sup></span>;
      })}
      </div>
    );

    return factorEls;
  }

  render() {
    const { denom, dressed, groups, groupCount, expansions, factors } = this.state;
    if (!denom) {
      return (
      <Container>
        <Row>
          <Col>
            <h2 className="math-primary">Denominators</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup>
              <FormControl placeholder="denominator" id="input-denom" onChange={this.setDenom}/>
              <InputGroup.Append>
                <Button variant="info" onClick={this.selectDenom}>Calculate</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>

          <Col>
          </Col>
        </Row>
      </Container>
    )
    } else {
      return (
      <Container>
        <Row>
          <Col>
            <h2 className="math-primary">Denominators</h2>
          </Col>
        </Row>
        <Row>
          <Col style={{minWidth: "50%"}}>
            <Table variant="math">
              <thead>
              <tr>
                <th>Denominator</th>
                <th>Factors</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <InputGroup>
                    <FormControl placeholder="denominator" id="input-denom" onChange={this.setDenom}/>
                    <InputGroup.Append>
                      <Button variant="info" onClick={this.selectDenom}>Calculate</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </td>
                <td>
                  {this.formatFactors(factors)}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  {groupCount} for fractions having a denominator of {denom}:
                </td>
              </tr>
                  {groups.map((g, key) => {
                    let showNumerators = !!this.showNumeratorState[g.expansion];
                    return (
              <tr key={key}>
                <td colSpan="2">
                      <Expansion key={key} showNumerators={showNumerators} numeratorState={this.numeratorState} displayNumerator={this.displayNumerator} item={g} expansions={expansions} denom={denom} />
                </td>
              </tr>
                      )
                    } )
                  }
              
              </tbody>
            </Table>
          </Col>

          <Col style={{minWidth: "50%"}}>
            <DenomDescription flags={this.state.flags} denomData={this.state.denomData} />
            <h2>{this.state.fraction}</h2>
            <div className="expansion">
            {this.state.forDisplay}
            </div>
          </Col>
        </Row>
      </Container>
    )
	}

  }
}

export default withRouter(Denom);
