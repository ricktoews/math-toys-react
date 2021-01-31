import primes from './data/primes';

function factor(denom) {
  let fuse = 0, circuit_breaker = 1000;
  let factors = {};
  let primeNdx = 0;
  for (let primeNdx = 0, maxNdx = primes.length; primeNdx < maxNdx; primeNdx++) {
    let prime = primes[primeNdx];
    if (denom === 1 || fuse > circuit_breaker) break;
    while (denom % prime === 0) {
      if (factors[prime] === undefined) factors[prime] = 0;
      factors[prime]++;
      denom /= prime;
      fuse++;
    }
  }
  return factors;
}

function dressDenom(denom) {
  let lastDigit = denom % 10;
  let lastDigits = denom % 100;
  let outfit = 'ths';
  if (lastDigits !== 11 && lastDigit === 1) {
    outfit = 'sts';
  } else if (lastDigits !== 12 && lastDigit === 2) {
    outfit = 'nds';
  } else if (lastDigits !== 13 && lastDigit === 3) {
    outfit = 'rds';
  }
  return denom + outfit;
}


function classifyDenom(denom) {
  let classifications = {
    primeWithBase: true,
    partComposite: false,
    allComposite: false
  };
  let sentence = '';
  if (classifications.primeWithBase) {
    sentence = 'This denominator is a prime number that does not divide the number base, so the decimal expansion of any fraction is an infinitely repeating period.';
  } else if (classifications.partComposite) {
    sentence = 'This denominator has one or more factors that divide the base, as well as one or more that do not. Non-reducible fractions will begin with one or more non-repeating digits, followed by a repeating period. Reducible fractions will behave according to their reduced denominators.';
  } else if (classifications.allComposite) {
    sentence = 'This denominator has no factors that do not divide the base, so the decimal expansion for all fractions will resolve.';
  }
}

function groupExpansions(expansionData) {
  let groups = [];
  let expansions = Object.keys(expansionData);
  expansions.forEach(expansion => {
    let numerators = expansionData[expansion].map(specs => specs.numerator);
    groups.push({ expansion, numerators, numeratorList: numerators.join(', ') });
  });
  return groups;
}

const numWord = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
function getGroupCount(groups) {
  let prettyCount = '';
  let countPhrase;
  if (groups.length < 10) {
    prettyCount = numWord[groups.length];
  } else {
    prettyCount = groups.length;
  }
  if (groups.length === 1) {
    countPhrase = `There is one group of expansions`;
  } else {
    countPhrase = `There are ${prettyCount} groups of expansions`;
  }
  return countPhrase;
}

function buildExpansionRecipe(expansionSeries, specs) {
  let expansion = expansionSeries.substr(specs.position-1) + expansionSeries.substr(0, specs.position-1);
  let nonRepeat, repeat;
  if (specs.beginRepeat === -1) {
    nonRepeat = expansion;
    repeat = '';
  } else {
    nonRepeat = expansion.substr(0, specs.beginRepeat-1);
    repeat = expansion.substr(specs.beginRepeat-1);
  }
  let recipe = {
    numerator: specs.numerator,
    expansion,
    nonRepeat,
    repeat
  };
  return recipe;
}

function buildExpansions(expansionData) {
  let expansions = Object.keys(expansionData);
  let recipes = [];
  expansions.forEach(expansion => {
    let expansionSpecList = expansionData[expansion];
    expansionSpecList.forEach(specs => {
      recipes.push(buildExpansionRecipe(expansion, specs));
    });
  });
  return recipes;
}

function prepDenomInfo(denom, expansionData) {
  let info = {};
  info.dressed = dressDenom(denom);
  info.groups = groupExpansions(expansionData);
  info.groupCount = getGroupCount(info.groups);
  info.expansions = buildExpansions(expansionData);
  info.factors = factor(denom);
  return info;
}

export default prepDenomInfo;
