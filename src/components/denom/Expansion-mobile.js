import React, { Component } from 'react';
import Numerator from './Numerator-mobile';

function test9sComp(str) {
  let halfway = str.length / 2,
      [ part1, part2 ] = [ str.substr(0, halfway), str.substr(halfway) ],
      result = true;

  for (let i = 0; i < halfway; i++) {
    let sum = 1*part1[i] + 1*part2[i];
    if (sum !== 9) {
      result = false;
    }
  }
  return result;
}


class Expansion extends Component {
  constructor(props) {
    super(props);
    this.setNumerator = this.setNumerator.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = { expansion: '' }
  }

  componentWillReceiveProps() {
console.log('Expansion will receive props; props', this.props.item, 'state.expansion', this.state.expansion);
      this.setState({ expansion: this.props.item.expansion });
  }

  componentDidUpdate() {
  }

  componentDidMount() {
  }

  formatNumeratorList(numerators) {
    let expansions = this.props.expansions;
    let formatted = (
      <div className="numerator-mobile">
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
//    let maxLength = 1000;
    let maxLength = 2 * repeat.length;
    // Create a bunch of periods, followed by '...'.
    // Suggestion: make it truncate if the maxlength is exceeded by more than some amount.
    if (repeat.length > 0) {
      while (repeatStr.length < maxLength) {
        repeatStr += repeat;
      }
    }
    repeatStr = repeatStr.substr(0, maxLength) + '...';
   
    let forDisplay;
    if (repeat.length % 2 === 0) {
      let repeata = repeat.substr(0, repeat.length / 2);
      let repeatb = repeat.substr(repeat.length / 2);
      // Ad hoc test for a complementary period. We should clean this up.
      if (test9sComp(repeat)) {
        forDisplay = <span><span className="non-repeat">{nonRepeat}</span><span className="repeat-a">{repeata}</span><span className="repeat-b">{repeatb}</span><span className="to-infinity">{repeatStr}</span></span>
      } else {
        forDisplay = <span><span className="non-repeat">{nonRepeat}</span><span className="repeat">{repeat}</span><span className="to-infinity">{repeatStr}</span></span>
      }
    } else {
      forDisplay = <span><span className="non-repeat">{nonRepeat}</span><span className="repeat">{repeat}</span><span className="to-infinity">{repeatStr}</span></span>
    }
    return forDisplay;
  }

  setNumerator(expansionData) {
    let fraction = <span className="fraction"><span className="numerator">{expansionData.numerator}</span> / <span className="denominator">{this.props.denom}</span></span>;
    let forDisplay = this.expansionForDisplay(expansionData);
console.log('update expansion');
this.setState({expansion: forDisplay});
//    this.props.displayNumerator({ fraction, forDisplay });
  }

  handleClick(e) {
    this.props.numeratorState(this.props.item);
    this.render();
  }

  render() {
    const g = this.props.item;
    const exp = this.state.expansion;
    const numClass = this.props.showNumerators ? 'show-numerators' : 'hide-numerators';
    return (
      <div key={g.expansion}>
      <span className="expansion-mobile" onClick={this.handleClick}>{this.state.expansion}</span>
        <div className={numClass}>
        {this.formatNumeratorList(g.numerators)}
        </div>
      </div>
    );
  }
}

export default Expansion;
