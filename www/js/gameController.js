angular.module("game", [])
	.controller("gameController", ["$scope", "$timeout", "$window", "patterns", "gameService", function($scope, $timeout, $window, patterns, gameService) {
		$scope.gameOver = false;
		$scope.active = false;
		$scope.locked = true;

		$scope.minSize = 1;
		$scope.maxSize = $window.screen.width / 5;
		$scope.size = 30;

		$scope.roundsPerSecond = 10;
		$scope.round = 0;

		$scope.rows = undefined;
		var nextRows = undefined;

		$scope.patterns = patterns;
		$scope.selectedPattern = $scope.patterns[0];

		$scope.toggleLocked = function() {
			$scope.locked = !$scope.locked;
		};

		$scope.$watch("roundsPerSecond", function() {
			$scope.updateInterval = 1000 / $scope.roundsPerSecond;
		});

		$scope.$watch("active", function() {
			$scope.buttonValue = $scope.active ? "Pause" : "Play";
		});

		$scope.loadPattern = function() {
			$scope.rows = _.cloneDeep($scope.selectedPattern.rows);
			nextRows = _.cloneDeep($scope.rows);
			$scope.gameOver = false;
			$scope.size = $window.screen.width / $scope.rows.length;
		};

		$scope.$watch("selectedPattern", $scope.loadPattern);

		$scope.$watch("gameOver", function() {
			stop();
		});

		$scope.toggleActive = function() {
			if ($scope.active) {
				stop();
			} else {
				start();
			}
		};

		function start() {
			$scope.active = true;
			$scope.gameOver = false;
			play();
		}

		function stop() {
			$scope.active = false;
		}

		function play() {
			if ($scope.active) {
				var tmpRows = $scope.rows;
				$scope.gameOver = gameService.evolve($scope.rows, nextRows);
				$scope.rows = nextRows;
				nextRows = tmpRows;
				$timeout(play, $scope.updateInterval);
				$scope.round++;
			}
		}

		$scope.changeCellState = function(rowIdx, colIdx) {
			if (!$scope.locked) {
				$scope.rows[rowIdx][colIdx] = !$scope.rows[rowIdx][colIdx];
				$scope.gameOver = false;
			}
		};

		$scope.resetBoard = function() {
			gameService.reset($scope.rows);
			$scope.gameOver = false;
			$scope.round = 0;
		};

	}]);
