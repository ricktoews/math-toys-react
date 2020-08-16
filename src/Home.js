import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import MathJax from 'react-mathjax-preview'
import './Home.css';

export default () => {
  return (
    <div>
      <article>
        <h4>July 27, 2020</h4>

        <p class="article-title">Prime Powers of 2 and Mersenne Primes</p>

        <p>So a Mersenne prime is a prime number of the form 2^n - 1. All known perfect numbers are based on Mersenne primes. I was toying one night with why the power of 2 for a Mersenne prime must itself be prime. I'm sure an algebraic proof would show that 2^n - 1 is factorable (and therefore not prime) if n is composite. But it was a different approach that occurred to me as I was lying there.</p>

        <p>Think of 2^n - 1 in its binary representation. It's just a repdigit of n 1s, right? So if n is composite--say axb--then 2^n - 1 can be described as a groups of b 1s, which is itself obviously composite. To illustrate, suppose n is 15 with a = 3, b = 5. Then 2^15 - 1 = 111111111111111, or 3 groups of 5 1s. Any number whose digits form multiple groups of the same pattern of digits can be expressed as a multiple of that pattern of digits--and therefore not a prime number.</p>
      </article>
 
      <article>
        <h4>July 24, 2020</h4>

        <p class="article-title">Golden Ratio Fiddlings</p>

        <p>So I've not explored this much yet, but it's looking curious to me.</p>

        <p>Familiar: phi, the Golden Ratio, in its fractional form is <math><mfrac><mrow><mn>1</mn><mo>+</mo><msqrt><mn>5</mn></msqrt></mrow><mrow><mn>2</mn></mrow></mfrac></math>.</p>

        <p>The powers of phi have interested me in their fractional form, with 2 as the constant denominator (even when it's possible to reduce): <math><mfrac><mrow><mi>a</mi><mo>+</mo><mi>b</mi><msqrt><mn>5</mn></msqrt></mrow><mrow><mn>2</mn></mrow></mfrac></math>, since each <math><mi>a</mi></math> and <math><mi>b</mi></math> is the sum of the previous two, so that each <math><mi>a</mi></math> is a Lucas number and each <math><mi>b</mi></math> is a Fibonacci number&mdash; so: 
	  <MathJax math={`
<math>
  <mfrac>
    <mrow><mn>1</mn><mo>+</mo><mn>1</mn><msqrt><mn>5</mn></msqrt></mrow>
    <mrow><mn>2</mn></mrow>
  </mfrac>
</math>,
<math>
  <mfrac>
    <mrow><mn>3</mn><mo>+</mo><mn>1</mn><msqrt><mn>5</mn></msqrt></mrow>
    <mrow><mn>2</mn></mrow>
  </mfrac>
</math>,
<math>
  <mfrac>
    <mrow><mn>4</mn><mo>+</mo><mn>2</mn><msqrt><mn>5</mn></msqrt></mrow>
    <mrow><mn>2</mn></mrow>
  </mfrac>
</math>,
<math>
  <mfrac>
    <mrow><mn>7</mn><mo>+</mo><mn>3</mn><msqrt><mn>5</mn></msqrt></mrow>
    <mrow><mn>2</mn></mrow>
  </mfrac>
</math>`} />.
</p>

        <p>The interesting thing is that as that as these powers increase, the ratio of <math><mfrac><mi>a</mi><mi>b</mi></mfrac></math> approaches <math><msqrt><mn>5</mn></msqrt></math>, 2.236067977499...:</p>
<Table variant="math" bordered>
  <tr class="success text-success">
    <th>Power</th>
    <th>Fractional Form</th>
    <th><MathJax math={`<math><mfrac><mtext>a (Lucas number)</mtext><mtext>b (Fibonacci number)</mtext></mfrac></math>`} /></th>
    <th><MathJax math={`<math><mtext>Approximation to </mtext><msqrt><mn>5</mn></msqrt></math>`} /></th>
  </tr>
  <tr>
    <td>phi<sup>4</sup></td>
    <td><MathJax math={`<math><mfrac><mrow><mn>7</mn><mo>+</mo><mn>3</mn><msqrt><mn>5</mn></msqrt></mrow><mrow><mn>2</mn></mrow></mfrac></math>`} /></td>
    <td><MathJax math={`<math><mfrac><mn>7</mn><mn>3</mn></mfrac></math>`} /></td>
    <td>2.3333...</td>
  </tr>
  <tr>
    <td>phi<sup>7</sup></td>
    <td><MathJax math={`<math><mfrac><mrow><mn>29</mn><mo>+</mo><mn>13</mn><msqrt><mn>5</mn></msqrt></mrow><mrow><mn>2</mn></mrow></mfrac></math>`} /></td>
    <td><MathJax math={`<math><mfrac><mn>29</mn><mn>13</mn></mfrac></math>`} /></td>
    <td>2.23076923...</td>
  </tr>
  <tr>
    <td>phi<sup>19</sup></td>
    <td><MathJax math={`<math><mfrac><mrow><mn>9349</mn><mo>+</mo><mn>4181</mn><msqrt><mn>5</mn></msqrt></mrow><mrow><mn>2</mn></mrow></mfrac></math>`} /></td>
    <td><MathJax math={`<math><mfrac><mn>9349</mn><mn>4181</mn></mfrac></math>`} /></td>
    <td>2.236067926333413...</td>
  </tr>
  <tr>
    <td>phi<sup>39</sup></td>
    <td><MathJax math={`<math><mfrac><mrow><mn>141422324</mn><mo>+</mo><mn>63245986</mn><msqrt><mn>5</mn></msqrt></mrow><mrow><mn>2</mn></mrow></mfrac></math>`} /></td>
    <td><MathJax math={`<math><mfrac><mn>141422324</mn><mn>63245986</mn></mfrac></math>`} /></td>
    <td>2.2.2360679774997894...</td>
  </tr>
</Table>

        <p>Playing with other sequences in which each element is the sum of the previous two, I see that the ratios appear to approach some irrational (I assume) real number, but it's not evident to me that it's a number that can be expressed tidily. 2.23067977499... is irrational but what the decimal form approximates is precisely the square root of 5.</p>

        <p>So why should it be that the ratios of a/b in increasingly larger powers of phi approach a number that's not just another of the infinitely many undistinguished irrational numbers out there but is instead the square root of an integer? And I suspect I'm looking at a slipknot.</p>

      </article>

      <article>
        <h4>July 16, 2020</h4>

        <p class="article-title">Fibonacci Numbers as Sums of Products of Fibonacci Numbers</p>

        <p>Let (a, b) be two consecutive fibonacci numbers, and let (c, d) be two consecutive Fibonacci numbers. (a, b) can overlap (c, d). The number ac + bd is a Fibonacci number. Examples: (a=3, b=5), (c=8, d=13). Then ac = 24, bd = 65, ac + bd = 89.</p>

        <p>I don't have a proof that this always works, though I'm pretty sure it does.</p>

      </article>

      <article>
        <h4>July 15, 2020</h4>

        <p class="article-title">Reciprocals of Composite Denominators</p>

        <p>I've long known that when a denominator is prime (other than 2, 5), the period length of the reciprocal is the smallest 9s reptend that the number divides. For 7, that's 6; for 31, it's 15; for 41, it's 5; and so on. I don't believe there can be a pattern: it just depends on which value 10^n - 1 that prime number happens to divide. Of course, this number will be either one less than the prime number (as with 7), or a factor of that (as with 31 and 41). If the number is even, the period is internally complementary--that is, the sum of its two halves is a 9s reptend. For 1/7, the period is 142857, and 142 + 857 = 999.</p>

        <p>Today's observation has to do with the length of the period for the reciprocal of a composite number whose factors, again, do not include 2 and 5. For these, the period length is also the minimum 9s reptend that the denominator will divide.</p>

        <p>Today, I realized that the length of a composite denominator's period is determined by the lengths of the periods of the prime factors of that denominator. For example, consider 287 as the denominator. I chose this because 287 is 7 x 41, and 1/7 has a period length of 6, while 1/41 has a period length of 5. It is therefore expected that 1/287 has a period length of 30, because 30 is 6x5. And so it has: 1/287 = .003484320557491289198606271777...</p>

        <p>I needed to be satisfied that there was a reason why this should work. Since the minimum 9s reptend that 7 divides is 999999 (7x142957), and the minimum one that 41 divides is 99999 (41x2439), what must be the minimum 9s reptend that 287 divides? It would be the shortest one that's divisible by both 7 and 41, so it must be the smallest 9s reptend whose length is divisible by both 6 and 5. The least common multiple of 6 and 5 is 30.</p>

      </article>

      <article>
        <h4>June 29, 2020</h4>

        <p class="article-title">Description of Periodic Decimals of Reciprocals of Prime Numbers</p>

        <p>Let p be the denominator, a prime number that is not a factor of the base. So in base 10, p is not 2 or 5.</p>

        <p>Observations:</p>

        <ul>
          <li>The maximum period length is (p-1).</li>
          <li>The period length is the minimum n, such that 10^n - 1 is a multiple of p.</li>
          <li>The period length is either (p-1) or a factor of (p-1).</li>
          <li>If the period length is even, the period can be split into two parts, the sum of which is 10^x - 1, where x is one half the period length.</li>
        </ul>

        <p>I actually did find it a little tiresome to try to defend some of these; however, I think I succeeded--or at least was confident of navigating there.</p>

        <p>Two classic examples: 1/7, whose period is 142857; and 1/13, with period 076923.</p>

        <p>For 7, the maximum period length is 6, and the period length actually is 6.</p>

        <p>For 13, the maximum period length would be 12; however, the actual period length is 6, a factor of 12.</p>

        <p>For both 7 and 13, 10^6 - 1, or 999999, is the minimum such number of which they're factors. 9, 99, 999, 9999, and 99999 all leave remainders when divided by either 7 or 13.</p>

        <p>Since the period lengths are even (both 6), they can be split in half, and the sum of the halves is 10^x - 1, where x is half the period length, or 3 in this case. So, for 7: 142 + 857 = 999. For 13: 076 + 923 = 999.</p>

        <p>In many cases, the period length is odd, so you don't get complementary halves. The determining factor is the smallest 9s repdigit (10^n - 1) the prime number happens to divide. For example, not only do 7 and 13 divide 999999: 37 also divides it, as do 3 and 11. However, the period lengths of 1/3, 1/11, and 1/37 are 1, 2, and 3, since 3 divides 10^1 - 1, 11 divides 10^2 - 1, and 37 divides 10^3 - 1.</p>

      </article>

    </div>
  )
}

