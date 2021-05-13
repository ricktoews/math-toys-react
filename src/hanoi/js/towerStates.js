
  function calcLargestTop() {
    var largestTop = Math.max.apply(
      null,
      foundation.map(item => {
        return item[0] === undefined ? 1000 : item[0];
      })
    );
    return largestTop;
  }

  function getPermissibleFrom() {
    var permissibleFrom = [];
    var largestTop = calcLargestTop();

    for (let i = 0; i < 3; i++) {
      let filter = true;
      // Rules:
      // 1. From tower cannot be the most recent destination tower.
      if (i === lastTo) {
        filter = false;
        // 2. From tower cannot be empty.
      } else if (foundation[i].length === 0) {
        filter = false;
        // 3. Topmost item on From tower cannot be the largest item to be moved, unless there is an available empty tower.
      } else if (foundation[i][0] === largestTop) {
        filter = false;
      }
      if (filter) {
        permissibleFrom.push(i);
      }
    }

    // There will never be more than one permissible From option. For the first move:
    // Two towers are empty, so there's only one possible From. Subsequenty:
    // There will always be a most recent destination (1). In addition, there will
    // either be an empty tower (2), or the item just moved will have uncovered an item
    // that is larger than it (3). Either way, there will be two towers that the rules
    // preclude: Most Recent, and (Empty OR Largest Item)
    return permissibleFrom[0];
  }



  function getWorkingHeight(tower) {
    var current = tower[0];
    var towerNdx = 1;
    while (tower[towerNdx] - current === 1) {
      current = tower[towerNdx];
      towerNdx++;
    }
    var workingHeight = towerNdx;
    return workingHeight;
  }

  function getPermissibleTo(moveFrom) {
    var itemSize = foundation[moveFrom][0];
    var permissibleTo = [];

    for (let i = 0; i < 3; i++) {
      let filter = true;
      // Rules:
      // 1. Destination tower must be different from Origin tower.
      if (i === moveFrom) {
        filter = false;
      } else if (itemSize !== -1 && foundation[i][0] < itemSize) {
        // 2. Top item on Destination tower must be smaller than top item on Origin tower.
        filter = false;
      }
      // There are additional rules, but they're more complex and are dealt with below.

      if (filter) {
        permissibleTo.push(i);
      }
    }

    // The above rules will definitely exclude one of the three towers, since one of them must be the Origin tower.
    // However, it is common for the item on both of the remaining towers to be larger than the item on the Origin tower.
    // At such times, additional rules must be applied.

    // Additional Rules:
    // 3. If difference between item on potential Destination tower and item being moved is 1, that potential Destination must be used.
    // 4. Otherwise, determine the Destination tower according to whether the "working height" of the Origin tower is odd or even.
    //    The "working height" is the number of consecutive items, which may be different from the number of actual items; e.g.,
    //    0, 1, 2, 4 would have a "working height" of 3.
    //    If the working height is odd, the Destination tower is the same as it was for the last move.
    //    If the working height is even, the Destination tower is different from what it was for the last move.
    //
    // If there are two permissible destinations at this point, they must be checked for the applicability of Rule 3.
    // If there is only one destination, performing this check will have no effect. (Either the item will be one less
    // than the top item on the destination, and permissibleTo will be redundantly assigned, or the difference will
    // be more than one, and permissibleTo will not be altered.)
    permissibleTo.forEach(f => {
      if (foundation[f][0] - foundation[moveFrom][0] === 1) {
        permissibleTo = [f];
      }
    });

    if (permissibleTo.length === 2) {
      // If we still have two possible destinations, use Rule 4 to select the Destination tower.
      if (getWorkingHeight(foundation[moveFrom]) % 2 === 1) {
        permissibleTo = [lastTo];
      } else {
        permissibleTo = permissibleTo.filter(item => {
          return item !== lastTo;
        });
      }
    }

    // There is guaranteed to be just one permissible To tower at this point.

    return permissibleTo[0];
  }

