function HanoiGraphics(hObj) {
  var currentMove = 0;

  function relocate(from, to, item) {
    var fromTower = document.getElementById("tower-" + from);
    var toTower = document.getElementById("tower-" + to);
    var itemToMove = document.getElementById("disc-" + item);
    toTower.insertBefore(itemToMove, toTower.firstChild);
  }

  function initiateMove() {
    if (currentMove < hObj.towerStates.length) {
      var from = hObj.towerStates[currentMove].from;
      var to = hObj.towerStates[currentMove].to;
      var item = hObj.towerStates[currentMove].item;
      relocate(from, to, item);
      console.log(hObj.towerStates[currentMove++]);
    } else {
      console.log("We are done, actually.");
    }
  }

  function loadTower() {
    var discs = hObj.getStackHeight();
    currentMove = 0;
    var startingTower = document.getElementById("tower-0");
    for (let i = discs - 1; i >= 0; i--) {
      var discElContainer = document.createElement("div");
      var discEl = document.createElement("div");
      discElContainer.className = "disc";
      discElContainer.id = "disc-" + i;
      discElContainer.appendChild(discEl);
      startingTower.insertBefore(discElContainer, startingTower.firstChild);
    }
    document.getElementById("move").addEventListener("click", initiateMove);
    document.getElementById("reset").addEventListener("click", resetHanoi);
  }

  window.addEventListener("load", loadTower);
}
