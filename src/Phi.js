import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import MathJax from 'react-mathjax-preview';

/* REST call; should be external */
const api_call = '//arithmo-rest.toewsweb.net/phi/powers/';
function fetchPhiPower(p) {
	let url = api_call + p;
	return fetch(url).then(res => res.json()).then(res => {
		return res;
	});
}

const maxPower = 30;


function PhiFraction(props) {
	return (
<MathJax math={`<math>
  <mfrac>
    <mrow>
      <mn>` + props.whole + `</mn><mo>+</mo><mn>` + props.sqrt_5_coef + `</mn><msqrt><mn>5</mn></sqrt>
    </mrow>
    <mrow>
      <mn>` + props.denom + `</mn>
    </mrow>
  </mfrac>
</math>`} />
	);
}

function PhiFractionVariant(props) {
	return (
<MathJax math={`<math>
  <mfrac>
    <mrow>
      <mn>` + props.whole + `</mn><mo>+</mo><mn>` + props.sqrt_5_mult + `</mn>
    </mrow>
    <mrow>
      <mn>` + props.denom + `</mn>
    </mrow>
  </mfrac>
</math>`} />
	);
}


const inline_math = {
	display: 'inline-block'
};

//fetchPhiPower(maxPower);
/*
 * function Phi, which uses state.
 */
function Phi(props) {
	const [ phiPowers, setPhiPowers ] = useState([]);

	fetchPhiPower(maxPower).then(res => {
		let decorated = decoratePhiPowers(res);
		setPhiPowers(decorated);
	});

	const decoratePhiPowers = data => {
		let decorated = data.map(item => {
			item.sqrt_5_mult = (item.sqrt_5_coef * Math.sqrt(5)).toFixed(4);
			item.fib_approx = item.fib_approx.toFixed(4);
			return item;
		});
		return decorated;
	}

	return (
<Container>
  <Row>
    <Col style={{ width: "50%" }}>
      <h4>Phi</h4>

      <article>
        <div>Phi is calculated as <MathJax style={inline_math} component={'span'} math={`<math><mfrac><mrow><mn>1</mn><mo>+</mo><msqrt><mn>5</mn></msqrt></mrow><mrow><mn>2</mn></mrow></mfrac></math>`} />. The table shows this, represented in three ways, for the first 30 powers of phi.</div>

        <div><strong>Phi<sup>n</sup></strong>. The fractional form of phi raised to the <MathJax style={inline_math} math={`<math><mi>n</mi></math>`} />th power&mdash;but with a slight twist. For each fraction, the denominator of 2 is kept, even when it's possible to simplify. The reason for doing this is to preserve continuity of the coefficient of <MathJax style={inline_math} math={`<math><msqrt><mn>5</mn></msqrt></math>`} /> for each power. Notice that each of these is the <MathJax style={inline_math} math={`<math><mi>n</mi></math>`} />th Fibonacci number.</div>

        <div><strong>Variant</strong>. This column represents phi as a fraction, but with <MathJax style={inline_math} math={`<math><mi>n</mi><msqrt><mn>5</mn></msqrt></math>`} /> multiplied out and approximated. Notice that as the powers increase, this approximation approaches the number to the left, to which it is being added.</div>

        <div><strong>Approx</strong>. This is the Variant divided by <MathJax style={inline_math} math={`<math><msqrt><mn>5</mn></msqrt></math>`} />. It also improves as an approximation of the <MathJax style={inline_math}style={inline_math}  math={`<math><mi>n</mi></math>`} />th Fibonacci number, the large the value of <MathJax style={inline_math} math={`<math><mi>n</mi></math>`} />.</div>

        <div id="phi-sqrt-5-coef">Notice also that for each power of phi, the coefficient of <MathJax style={inline_math} math={`<math><msqrt><mn>5</mn></msqrt></math>`} /> is the corresponding Fibonacci number.</div>
      </article>

    </Col>
    <Col style={{ width: "50%" }}>
      <Table variant="math" bordered>
        <thead>
        <tr>
          <th>Power</th>
          <th>Phi<sup>n</sup></th>
          <th>Variant</th>
          <th>Approx</th>
          <th>Fibonacci</th>
        </tr>
        </thead>
        <tbody>
        { phiPowers.map((phi, key) => { return (
        <tr key={key}>
          <td>{phi.power}</td>
          <td><PhiFraction whole={phi.whole} sqrt_5_coef={phi.sqrt_5_coef} denom={phi.denom} /></td>
          <td><PhiFractionVariant whole={phi.whole} sqrt_5_mult={phi.sqrt_5_mult} denom={phi.denom} /></td>
          <td><span className="fib-approx">{phi.fib_approx}</span></td>
          <td><span className="phi-fib">{phi.sqrt_5_coef}</span></td>
        </tr>
        ); }) }
        </tbody>
      </Table>

    </Col>
  </Row>
</Container>
  );
}

export default Phi;
