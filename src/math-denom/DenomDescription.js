import React from 'react';

function buildDescription({flags, denomData}) {
	var descCode = [];

	if (!flags.resolves && !flags.hybrid) {
		if (flags.isFullReptend) {
			descCode.push((<div>
<p>This denominator ({denomData.denom}) is what is known as a full-reptend prime; that is, the length of the period is the denominator - 1 ({denomData.repeating} in this case), which is the maximum possible length.</p>

<p>The period of such a denominator is always internally complementary: if its digits are divided into two groups of equal length, the sum of those groups is an integer consisting entirely of 9s.</p>
			</div>));
		}

		if (!flags.isFullReptend && flags.isPrime && flags.internalComplement) {
			descCode.push((<div>
<p>This denominator is not a full-reptend prime: the length of the period ({denomData.repeating}) is less than the denominator - 1. However, it is still internally complemented: the period can be split into two groups of an equal number of digits, and the sum of these two groups is a number consisting entirely of 9s.</p>

<p>It is also worth noting that, while the length of the period is less than the maximum possible length (denominator - 1, or {denomData.denom - 1}), it is a factor of that length.</p>
			</div>));
		}

		if (!flags.hybrid && !flags.resolves && !flags.isPrime) {
			descCode.push((<div>
<p>The number {denomData.denom} has factors {denomData.factors && denomData.factors.join(', ')}. When the denominator's factors do not include 2 or 5, the entire period repeats, though the denominator is not prime. When the fraction cannot be simplified, the period length is {denomData.repeating}.</p>
			</div>));
		}

		if (flags.externalComplement) {
			descCode.push((<div>
<p>This denominator has periods that cannot be split into two complementary groups. Instead, each period is complemented by the period of another fraction with the same denominator. The period length is {denomData.repeating}.</p>
			</div>));
		}
	}

	if (flags.resolves) {
		if (!flags.isPrime) {
			descCode.push((<div>
<p>The number {denomData.denom} has factors {denomData.factors.join(', ')}. When the denominator does not have factors other than 2 or 5, the period resolves. The length of this decimal is {denomData.repeating}.</p>
			</div>));
		} else {
			descCode.push((<div>
<p>The number {denomData.denom} is prime and is also a factor of the base (10). When the denominator is 2 or 5, or does not have factors other than 2 or 5, the period resolves.</p>
			</div>));
		}
	}

	if (flags.hybrid) {
		descCode.push((<div>
<p>The number {denomData.denom} has factors {denomData.factors && denomData.factors.join(', ')}. When the denominator's factors include 2 or 5, as well as any other prime number, the periods of the non-reducible fractions are hybrids, in that they begin with a group that resolves and then continue with a group that repeats. This second group can be internally or externally complementary. In the case of {denomData.denom}, it is <span ng-show="flags.externalComplement">externally</span><span ng-show="flags.internalComplement">internally</span> complementary.</p>

		</div>));
	}

	return descCode;
}

function DenomDescription(props) {
	var description = buildDescription(props);
	return description;
}

export default DenomDescription;
