import React, { useState, useEffect } from 'react';
import { permutations } from './perms.js';
import { score_guess, filter_perms, update_perms  } from './filter_perms.js';
/*
 * function Mastermind
 */
function Mastermind(props) {

	var perms = permutations.build(6, 4);
	var code = permutations.choose(perms);
	const [ state, setState ] = useState({ black: 0, white: 0, code: code });
	const [ flags, setFlags ] = useState({ notyet: false, solved: false, oops: false, entries: [], score: { black: 0, white: 0 }});

	const handleBlack = e => {
		setState({ ...state, black: 1*e.currentTarget.value });
	}

	const handleWhite = e => {
		setState({ ...state, white: 1*e.currentTarget.value });
	}

	const handleAccept = () => {
		perms = filter_perms(state.black, state.white, state.code);
		flags.entries.push({ code: state.code, black: state.black, white: state.white, pool: perms });
		update_perms(perms);
		setState({ code: permutations.choose(perms) });

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
		var mycode = state.mycode;
		entries.forEach((entry, ndx) => {
			let score = score_guess(mycode, entry.code);
            console.log(`compare ${mycode} with ${entry.code}: `, score, entry.black, entry.white);
            if (score.black !== entry.black || score.white !== entry.white) {
                let row = document.getElementById('attempt-' + ndx);
                row.style.color = 'red';
                let correction = row.querySelector('.correction');
                correction.innerHTML = `Correction: black ${score.black}; white ${score.white}`;
            }
		});
	};
  return (
<div class="container">
  <div class="row">
    <div class="col-md-4">
	  { flags.notyet && (<div>
        <p>The code will contain four letters in the range of A-F. A letter can be used any number of times, so that there are 1,296 possible codes. You will choose the code; the computer will guess, based on your feedback. Click Begin when you have chosen.</p>
        <p><button onClick={handleBegin} className="btn btn-info">Begin</button></p>
      </div> ) }
      <div className="info-column">
	    { !flags.notyet && !flags.solved && (<div>
		  <table className="table table-bordered">
            <tr className="success">
              <th>Code</th>
              <th>Black</th>
              <th>White</th>
              <th></th>
            </tr>
            <tr>
              <td>{state.code}</td>
              <td><input type="text" size="1" onBlur={handleBlack} black /></td>
              <td><input type="text" size="1" onBlur={handleWhite} white /></td>
              <td><button className="btn" onClick={handleAccept}>Accept</button></td>
            </tr>
          </table>
        </div> ) }

	    { flags.solved && (<div>
          <p>Solved!</p>
        </div>) }

	    { flags.oops && (<div>
          <p>Um. OK. So... Something seems to have gone wrong. Based on the feedback you've given me, there aren't any codes left for me to pick from. Not sure how that happened, but ...</p>
          <p>To investigate and find out what you did wrong--yes YOU--let's have the code you chose.</p>
          <p><input type="text" size="6" targetcode /> <button class="btn" onClick={handleGetTarget}>Enter</button></p>
        </div> ) }
      </div>
    </div>
    <div className="col-md-8">
      <div>
        <table className="table table-bordered">
          <tr className="success">
            <th>Round</th>
            <th>Code Entry</th>
            <th>Score</th>
            <th>Pool</th>
          </tr>
	  { flags.entries.map((entry, key) => {
          return (<tr key={key} id={'attempt-' + key}>
            <td>{key}</td>
            <td>{entry.code}</td>
            <td>Correct position: {entry.black}<br/>Correct Elements: {entry.white}<div className="correction"></div></td>
            <td>
              Pool size: {entry.pool.length}
			  { entry.pool.length <= 10 && (
              <div>
                {entry.pool}
              </div>) }
            </td>
          </tr>)
	  } ) }
        </table>
      </div>
    </div>
  </div>
</div>

  );
}

export default Mastermind;

