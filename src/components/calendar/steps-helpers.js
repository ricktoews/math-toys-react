var _dict = {};

export function initStepDict(dict) {
	_dict = Object.assign(_dict, dict);
}

export function addDictItem(key, val) {
	_dict[key] = val;
}


function getVal(label) {
	label = label.substr(1, label.length - 2);
	var val = _dict[label];
	if (val === undefined) {
		try {
			val = eval(label);
		} catch (e) {
		}
	}

	return val;
}

// Negative lookbehind. Don't match if preceded by a letter.
// From https://stackoverflow.com/questions/9306202/regex-for-matching-something-if-it-is-not-preceded-by-something-else
// Update: Can't yet use this, as it's not supported in Safari / iOS Chrome.
// const needsFillingInRe = /(?<!\w)\[.*\]/;
// const fillInRe = /(?<!\w)\[[^\[\]]*?\]/g;
const needsFillingInRe = /\{.*\}/;
const fillInRe = /\{[^\{\}]*?\}/g;

export const fillIn = (str) => {
	var shortCircuit = false;
	while (!shortCircuit && str.match(needsFillingInRe)) {
		let _str = str.replaceAll(fillInRe, m => { return getVal(m); });
		// Protect against infinite loop.
		if (_str === str) {
			shortCircuit = true;
		} else {
			str = _str;
		}
	}

	return str;
}


