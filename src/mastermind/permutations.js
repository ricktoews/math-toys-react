'use strict';

var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function buildDigits(count) {
    var list = '';
    for (var i = 0; i < count; i++) {
        list += letters.charAt(i);
	}
    return list
}


function product() {
  var args = Array.prototype.slice.call(arguments); // makes array from arguments
console.log('product args', args);
  return args.reduce(function tl (accumulator, value) {
    var tmp = [];
    accumulator.forEach(function (a0) {
      for (let a1 = 0; a1 < value; a1++) {
        tmp.push(a0.concat(a1));
      }
    });
    return tmp;
  }, [[]]);
}

function build(symbols, places) {
    var perms = [];
    var digits = buildDigits(symbols);
	var repeat = places
    for (var num in product(digits, repeat)) {
        let perm = ''.join(num);
        perms.push(perm);
    }
console.log('perms', perms);
    return perms
}

const permutations = {
	build
};

export { permutations };
