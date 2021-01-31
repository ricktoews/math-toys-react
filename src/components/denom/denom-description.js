	var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113];
	function getDC(denom, num) {
		var api = '/dc/' + denom;
		if (num) api += '/' + num;
		var url = 'https://arithmo-rest.toewsweb.net' + api;

		return fetch(url).then(res => res.json()).then(res => {
			console.log('getDC', denom, res);
			return res;
		});
	}


	/*
	 * Supplement REST payload.
	 */
	function addDenominatorFactors(recip) {
		var denom = recip.denom;
		var factors = [];
		var maxFactor = Math.floor(denom / 2);
		for (var i = 0; primes[i] <= maxFactor; i++) {
			while (denom % primes[i] === 0) {
				denom /= primes[i];
				factors.push(primes[i]);
			}
		}

		recip.factors = factors;
	}

	function _isComplementary(repeating) {
		var result = false;
		if (repeating.length % 2 === 0) {
			let half = repeating.length / 2;
			let partA = parseInt(repeating.substr(0, half), 10);
			let partB = parseInt(repeating.substr(half), 10);
			let sum = partA + partB + 1;
			if (Math.log10(sum) === parseInt(Math.log10(sum), 10)) {
				result = true;
			}
		}
		return result;
	}

	function _isFullReptend(recip) {
		return recip.repeating === recip.reducedDenom - 1;
	}

	function _getComplementType(recip) {
		var complementType = '';

		if (recip.repeating === 0) {
			complementType = 'none';
		} else if (recip.parts.partB > '') {
			complementType = 'internal';
		} else {
			complementType = 'external';
		}

		return complementType;
	}

	function _isHybrid(recip) {
		return (recip.repeating > 0 && recip.repeating < recip.length);
	}

	function addMetaData(item) {
		var meta = {
			fullReptend: _isFullReptend(item),
			complementType: _getComplementType(item),
			hybrid: _isHybrid(item)
		};
		item.metaData = meta;
	}

	function addParts(item) {
		var preLength = item.decimal.length - item.repeating;
		item.parts = {pre:'', partA:'', partB:''};
		item.parts.pre = item.decimal.substr(0, preLength);
		var repeating = item.decimal.substr(preLength);
		if (_isComplementary(repeating)) {
			item.parts.partA = repeating.substr(0, item.repeating / 2);
			item.parts.partB = repeating.substr(item.repeating / 2);
		} else {
			item.parts.partA = repeating;
		}
	}

	function getDecimal(denom, num) {
		return getDC(denom, num).then((data) => {
			console.log('getDecimal data', data);
			addDenominatorFactors(data[0]);
			data.forEach((item) => {
				addParts(item);
				addMetaData(item);
			});

			return data;
		});
	};

export default getDecimal;
