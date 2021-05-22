const itemCount = 4;
const itemsInPerm = Math.sqrt(itemCount);

const pool = [];
for (let i = 1; i <= itemCount; i++) {
		pool.push(i);
}

// Initialize permutation indexes.
var itemPos = [];
for (let i = 0; i < itemsInPerm; i++) {
	itemPos[i] = i;
}
var permutations = [];


var permutation = [];
itemPos.forEach(pos => {
	permutation.push(pool[pos]);
});
permutations.push(permutation);

if (itemPos[permNdx] < itemsInPerm - 1) {
	itemPos[permNdx]++;
} else {
}
