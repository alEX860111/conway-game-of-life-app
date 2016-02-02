angular.module("game")
	.factory("rules", [function() {
		return {
			survives: function survives(state, numAliveNeighbors) {
				if (numAliveNeighbors === 3) {
					return true;
				}
				if (numAliveNeighbors === 2) {
					return state;
				}
				return false;
			}
		};
	}]);
