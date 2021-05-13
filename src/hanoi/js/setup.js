const el = document.getElementById('app');

function towerHeightSelect(min, max) {
	const code = [
		'<select id="discs">', 
		'<option>Tower Height</option>'
	];
	for (item = min; item <= max; item++) {
		code.push(`<option value="${item}">${item}</option>`);
	}
	code.push('</select>');

	return code.join('');
}

heightSelectorCode = towerHeightSelect(2, 9);

const layout = `
    <div class="page-title">
      <h1>Towers of Hanoi</h1>
    </div>
    <div class="controls">
      ${heightSelectorCode}
      <button id="move">Move</button>
      <button id="reset">Reset</button>
    </div>

    <div class="game-container">
      <div class="game-area">

        <div class="tower" id="tower-0">
          <div class="base"></div>
        </div>

        <div class="tower" id="tower-1">
          <div class="base"></div>
        </div>

        <div class="tower" id="tower-2">
          <div class="base"></div>
        </div>

      </div>
    </div>

    <div class="report-container">
	  <table>
	    <thead>
		  <tr>
		    <th>Move</th>
		    <th>Tower 1</th>
		    <th>Tower 2</th>
		    <th>Tower 3</th>
		  </tr>
	    </thead>
		<tbody>
		</tbody>
	  </table>
    </div>
`;
el.innerHTML = layout;

document.getElementById("move").addEventListener("click", initiateMove);
document.getElementById("reset").addEventListener("click", resetHanoi);
document.getElementById("discs").addEventListener("change", handleSetDiscs);

const baseRGB = [0, 0, 255];
function calcColor(item) {
	var factor = item*3;

	var r = baseRGB[0]*factor / 10;
	var g = baseRGB[1]*factor / 10;
	var b = baseRGB[2]*factor / 10;

	return [r, g, b];
}

function clearReport() {
	var reportEl = document.querySelector('.report-container tbody');
	while (reportEl.firstChild && reportEl.firstChild.className !== 'base') {
		reportEl.removeChild(reportEl.firstChild);
	}
}

function clearTowers() {
	for (let tower = 0; tower < 3; tower++) {
		let towerEl = document.getElementById('tower-' + tower);
		while (towerEl.firstChild && towerEl.firstChild.className !== 'base') {
			towerEl.removeChild(towerEl.firstChild);
		}
	}
}

function loadTower(discs) {
	clearTowers();
	currentMove = 0;
	var startingTower = document.getElementById("tower-0");
	for (let i = discs - 1; i >= 0; i--) {
		var [r, g, b] = calcColor(i);
		var discElContainer = document.createElement("div");
		var discEl = document.createElement("div");
		discEl.style = `background-color: rgb(${r}, ${g}, ${b})`;
		discElContainer.className = "disc";
		discElContainer.id = "disc-" + i;

		discElContainer.appendChild(discEl);
		startingTower.insertBefore(discElContainer, startingTower.firstChild);
	}
}


function relocate(from, to, item) {
	var fromTower = document.getElementById("tower-" + from);
	var toTower = document.getElementById("tower-" + to);
	var itemToMove = document.getElementById("disc-" + item);
	console.log('relocating', itemToMove, itemToMove.style);
	toTower.insertBefore(itemToMove, toTower.firstChild);
	//timerHandle = setTimeout(initiateMove, 200);
}

function initiateMove() {
	if (currentMove < towerStates.length) {
		var from = towerStates[currentMove].from;
		var to = towerStates[currentMove].to;
		var item = towerStates[currentMove].item;
		relocate(from, to, item);
		console.log(towerStates[currentMove++]);
	} else {
		console.log("We are done, actually.");
	}
}

var timerHandle;
var foundation;
var reportRows;
var currentMove;
var lastFrom, lastTo;
var towerStates;
var moveCount;

function handleSetDiscs(e) {
	var selectedDiscs = 1*e.target.value;
	setDiscs(selectedDiscs);
}

function setDiscs(selectedDiscs) {
	foundation = [[], [], []];
	towerStates = [];
	reportRows = [];
	clearReport();
	if (timerHandle) { clearTimeout(timerHandle); }
	currentMove = 0;
	moveCount = 0;
	lastFrom = lastTo = -1;
	loadTower(selectedDiscs);
	foundation[0] = [...Array(selectedDiscs).keys()];
	start();
}



function resetHanoi() {
	var el = document.getElementById('discs');
	var selectedDiscs = 1*el.value;
	setDiscs(selectedDiscs);
}

function start() {
	var target = foundation[0].length % 2 === 1 ? 2 : 1;
	towerStates = [];
	console.log('Beginning tower states', towerStates);
	console.log('Start; target', target);
	return calcMoves(0, target);
}

function calcMoves(from, to) {
	lastFrom = from;
	lastTo = to;
	var item = foundation[from].shift();
	foundation[to].unshift(item);
	towerStates.push({ from: from, to: to, item: item });
	moveCount++;
	console.log(`Status # ${moveCount}: ${JSON.stringify(foundation[0])} || ${JSON.stringify(foundation[1])} || ${JSON.stringify(foundation[2])}`);
	reportRows.push(addToReport(moveCount, foundation));
	if (foundation[0].length === 0 && foundation[1].length === 0) {
		console.log("We seem to be finished.");
		console.log("Ending tower states", towerStates);
		var el = document.querySelector('.report-container tbody');
		reportRows.forEach(row => { el.appendChild(row); });
	} else if (moveCount < 300) {
	    let moveFrom = getPermissibleFrom();
	    let moveTo = getPermissibleTo(moveFrom);
	    calcMoves(moveFrom, moveTo);
	}
}


function addToReport(item, towers) {
	console.log('addToReport', item, towers);

	var itemNumberEl = document.createElement('td');
	itemNumberEl.innerHTML = `#${item}`;

	var tower1El = document.createElement('td');
	tower1El.innerHTML = towers[0].join(', ');
	var tower2El = document.createElement('td');
	tower2El.innerHTML = towers[1].join(', ');
	var tower3El = document.createElement('td');
	tower3El.innerHTML = towers[2].join(', ');

	var itemRowEl = document.createElement('tr');
	itemRowEl.appendChild(itemNumberEl);
	itemRowEl.appendChild(tower1El);
	itemRowEl.appendChild(tower2El);
	itemRowEl.appendChild(tower3El);

	return itemRowEl;

}

