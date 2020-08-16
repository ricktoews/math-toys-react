angular.module('MathApp')

.directive('targetcode', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			element.on('blur', function(e) { 
				var el = e.target;
				scope.mycode = el.value;
			});
		}
	};
})

.directive('black', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			element.on('blur', function(e) { 
				var el = e.target;
				scope.black = parseInt(el.value, 10);
			});
		}
	};
})

.directive('white', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			element.on('blur', function(e) { 
				var el = e.target;
				scope.white = parseInt(el.value, 10);
			});
		}
	};
})

.controller('MasterCtrl', function($state, $scope) {
	var perms = permutations.build(6, 4);
	var code = permutations.choose(perms);
	$scope.oops = false;
	$scope.notyet = true;
	$scope.entries = [];
	$scope.code = code;
	$scope.solved = false;
	$scope.score = { black: 0, white: 0 };

	$scope.handleAccept = () => {
		perms = filter_perms($scope.black, $scope.white, $scope.code);
		$scope.entries.push({ code: $scope.code, black: $scope.black, white: $scope.white, pool: perms });
		update_perms(perms);
		$scope.code = permutations.choose(perms);

		// Process marked correct
		if ($scope.black === 4) {
			perms = permutations.build(6, 4);
			update_perms(perms);
			$scope.oops = false;
			$scope.code = permutations.choose(perms);
			$scope.notyet = true;
			$scope.solved = true;
			$scope.score = { black: 0, white: 0 };
		}
		
		else if (perms.length === 0) {
			$scope.oops = true;
		}
	}

	$scope.handleBegin = () => {
		$scope.notyet = false;
		$scope.solved = false;
		$scope.entries = [];
	};

	$scope.handleGetTarget = () => {
		$scope.entries.forEach((entry, ndx) => {
			let score = score_guess($scope.mycode, entry.code);
			console.log(`compare ${$scope.mycode} with ${entry.code}: `, score, entry.black, entry.white);
			if (score.black !== entry.black || score.white !== entry.white) {
				let row = document.getElementById('attempt-' + ndx);
				row.style.color = 'red';
				let correction = row.querySelector('.correction');
				correction.innerHTML = `Correction: black ${score.black}; white ${score.white}`;
			}
		});
	};
});
