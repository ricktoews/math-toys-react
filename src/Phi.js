import React, { useState } from 'react';

/* REST call; should be external */
const api_call = '//localhost:8081/phi/';
function fetchPhiPower(p) {
  let url = api_call + p;
  return fetch(url).then(res => res.json()).then(res => {
    return res;
  });
}

/*
 * function Phi, which uses state.
 */
function Phi(props) {
  const [ phiPowers, setPhiPowers ] = useState([]);

  const { power } = props.match.params;
  fetchPhiPower(power).then(res => {
    let decorated = decoratePhiPowers(res);
    setPhiPowers(decorated);
  });

  const decoratePhiPowers = data => {
    let decorated = data.map(item => {
      item.sqrt5_real = Math.round(item.sqrt5 * 5**.5 * 100000) / 100000;
      return item;
    });
    return decorated;
  }

  return (
    <div>
      <h1>Get power of phi: {power}</h1>
      <ul>
      {phiPowers.map((phi, ndx) => (
        <li key={ndx}>({phi.sqrt5}√5 + {phi.whole}) / 2 [{phi.sqrt5_real}]</li>
      ))}
      </ul>
    </div>
  );
}

export default Phi;
