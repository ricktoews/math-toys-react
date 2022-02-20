import React, { useState, useEffect } from 'react';
import { permutations } from './perms.js';
import { score_guess, filter_perms, update_perms  } from './filter_perms.js';
import CodePicker from './CodePicker';
import ScorePegs from './ScorePegs';
import '../../css/mastermind-appsolves.scss';

const ColorMap = {
	'A': 'red',
	'B': 'green',
	'C': 'yellow',
	'D': 'blue',
	'E': 'purple',
	'F': 'black',
};

function codeToPegs(code) {
	var symbols = code.split('');
	var pegEls = [];
	symbols.forEach((symbol, ndx) => {
		let classes = 'code-peg ' + 'peg-' + (ColorMap[symbol] || 'blank');
		let pegEl = <div key={ndx} className={classes}></div>
		pegEls.push(pegEl);
	});
	var colorCodeHTML = (<div className="peg-wrapper">
						{ pegEls.map(item => item) }
						 </div>);

	return colorCodeHTML;
}

function evaluateCurrentAttempt(userColors, attempt) {
	var blackTally = 0, whiteTally = 0;
	var letters = attempt.split('');
	var attemptColors = letters.map(letter => ColorMap[letter]);
	// Tally black;
	attemptColors.forEach((color, ndx) => {
		if (color !== '' && color === userColors[ndx]) {
			blackTally += 1;
			attemptColors[ndx] = '';
			userColors[ndx] = '';
		}
	});
	attemptColors.forEach((color, ndx) => {
		if (color !== '' && userColors.indexOf(color) !== -1) {
			let n = userColors.indexOf(color);
			userColors[n] =  '';
			attemptColors[ndx] = '';
			whiteTally += 1;
		}
	});
	return { blackTally, whiteTally };
}

/*
 * function AppSolves. Mastermind, but the app solves the code.
 */
function AppSolves(props) {

	var perms = permutations.build(6, 4);
	var code = permutations.choose(perms);
	const [ userCodeColors, setUserCodeColors ] = useState([]);
	const [ tallies, setTallies ] = useState({ blackTally: 0, whiteTally: 0 });
	const [ codeSelected, setCodeSelected ] = useState(false);
	const [ state, setState ] = useState({ black: 0, white: 0, code: 'xxxx' });
	const [ flags, setFlags ] = useState({ notyet: false, solved: false, oops: false, entries: [], score: { black: 0, white: 0 }});
	const [ mycode, setMyCode ] = useState('');

	const handleBlack = e => {
		setState({ ...state, black: 1*e.currentTarget.selectedIndex });
	}

	const handleWhite = e => {
		setState({ ...state, white: 1*e.currentTarget.selectedIndex });
	}

	const chosenCode = pegList => {
// lots of code in here that's shared with handleAccept and needs to be moved to a function that would be called from both places.
		setFlags({ ...flags, notyet: false, solved: false, entries: [] });
console.log('chosenCode', pegList);
		var colors = pegList.map(item => item.substr(4));
		setUserCodeColors(colors);
		var code = permutations.choose(perms);
		setCodeSelected(true);
		var _tallies = evaluateCurrentAttempt(colors.slice(0), code);
		setState({ black: _tallies.blackTally, white: _tallies.whiteTally, code: code });
	};

	const handleAccept = () => {
console.log('handleAccept; black', state.black, 'white', state.white);
		perms = filter_perms(state.black || 0, state.white || 0, state.code);
		flags.entries.push({ code: state.code, black: state.black, white: state.white, pool: perms });
		update_perms(perms);
		var code = permutations.choose(perms);
		var _tallies = evaluateCurrentAttempt(userCodeColors.slice(0), code);
		setState({ black: _tallies.blackTally, white: _tallies.whiteTally, code: code });

		if (state.black === 4) {
			perms = permutations.build(6, 4);
			update_perms(perms);
			setState({ code: permutations.choose(perms) });
			setFlags({
				...flags,
				oops: false,
				notyet: true,
				solved: true,
				score: { black: 0, white: 0 }
			});
			setCodeSelected(false);
		} else if (perms.length === 0) {
			setFlags({ ...flags, oops: true });
		}
	};

	const handleBegin = (e) => {
		e.preventDefault();
		setFlags({ ...flags, notyet: false, solved: false, entries: [] });
	};


	const handleGetTarget = e => {
		e.preventDefault();
		var entries = flags.entries;
            console.log(`handleGetTarget mycode ${mycode}, entries`, entries);
		entries.forEach((entry, ndx) => {
			let score = score_guess(mycode, entry.code);
            console.log(`compare ${mycode} with ${entry.code}: `, score, entry.black, entry.white);
/*
			// Believed to pertain to correction, which shouldn't apply anymore, given self-scoring.
            if (score.black !== entry.black || score.white !== entry.white) {
                let row = document.getElementById('feedback-' + ndx);
                row.style.color = 'red';
                let correction = row.querySelector('.correction');
                if (correction) { correction.innerHTML = `Correction: black ${score.black}; white ${score.white}`; }
            }
*/
		});
	};

  return (
<div className="container">
  <CodePicker chosenCode={chosenCode} codeSelected={codeSelected} />
  <div className="row">
    <div className="col-md-4">
	  { false && flags.notyet && (<div>
        <p>The code will contain four letters in the range of A-F. A letter can be used any number of times, so that there are 1,296 possible codes. You will choose the code; the computer will guess, based on your feedback. Click Begin when you have chosen.</p>
        <p><button onClick={handleBegin} className="btn btn-info">Begin</button></p>
      </div> ) }
      <div className="info-column">
	    { !flags.notyet && !flags.solved && (<div>
          <table className="table table-bordered">
            <thead>
            <tr className="success">
              <th>Code</th>
              <th>Score</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
   	  { flags.entries.map((entry, key) => {
          return (<tr key={key} id={'attempt-' + key}>
            <td>{codeToPegs(entry.code)}</td>
            <td><ScorePegs black={entry.black} white={entry.white} /></td>
            <td></td>
          </tr>)
	  } ) }
            <tr>
              <td>{codeToPegs(state.code)}</td>
              <td><ScorePegs black={state.black} white={state.white} /></td>
              <td><button className="btn btn-info" onClick={handleAccept}>Accept</button></td>
            </tr>
            </tbody>
          </table>
        </div> ) }

	    { flags.solved && (<div>
          <p>Solved!</p>
        </div>) }

      </div>
    </div>
    <div className="col-md-8">
      <div>
        <table className="table table-bordered">
          <thead>
          <tr className="success">
            <th>Round</th>
            <th>Code Entry</th>
            <th>Score</th>
            <th>Pool</th>
          </tr>
          </thead>
          <tbody>
	  { flags.entries.map((entry, key) => {
          return (<tr key={key} id={'feedback-' + key}>
            <td>{key}</td>
            <td>{codeToPegs(entry.code)}</td>
            <td><ScorePegs black={entry.black} white={entry.white}/></td>
            <td>
              Pool size: {entry.pool.length}
			  { entry.pool.length <= 10 && (
              <div>
                {/*entry.pool.join(', ')*/}
                {entry.pool.map((item, ndx) => {
                  return <div key={ndx}>{codeToPegs(item)}</div>;
                })}
              </div>) }
            </td>
          </tr>)
	  } ) }
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  );
}

export default AppSolves;

