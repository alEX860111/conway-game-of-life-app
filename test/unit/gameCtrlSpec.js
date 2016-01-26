describe("gameController", function() {

	angular.isDate();

	var gameService;

	var $interval;

	var scope;

	beforeEach(function() {
		module("game");
	});

	beforeEach(inject(function(_gameService_) {
		gameService = _gameService_;
		spyOn(gameService, "evolve").and.callThrough();;
		spyOn(gameService, "reset").and.callThrough();;
	}));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller("gameController", {
			$scope: scope
		});
		scope.$apply();
	}));

	it("defaults", function() {
		expect(scope.gameOver).toBe(false);
		expect(scope.isActive).toBe(false);
		expect(scope.size).toEqual(30);
		expect(scope.roundsPerSecond).toEqual(10);
		expect(scope.round).toEqual(0);
		expect(scope.buttonValue).toEqual("Play");
		expect(scope.rows).toBeDefined();
	});

	it("toggle buttonValue", function() {
		scope.isActive = true;
		scope.$apply();
		expect(scope.buttonValue).toEqual("Pause");
		scope.isActive = false;
		scope.$apply();
		expect(scope.buttonValue).toEqual("Play");
	});

	it("resetBoard", function() {
		scope.gameOver = true;
		expect(gameService.reset.calls.count()).toEqual(0);

		scope.resetBoard();

		expect(scope.gameOver).toEqual(false);

		expect(gameService.reset).toHaveBeenCalled();
		expect(gameService.reset.calls.count()).toEqual(1);
	});

	it("changeCellState", function() {
		scope.gameOver = true;

		scope.changeCellState(2, 3);

		expect(scope.gameOver).toEqual(false);
	});

	it("toggleActive", function() {
		scope.isActive = false;
		scope.gameOver = true;

		scope.toggleActive();

		expect(scope.isActive).toEqual(true);
		expect(scope.gameOver).toEqual(false);

		expect(scope.gameOver).toEqual(false);
		expect(gameService.evolve).toHaveBeenCalled();
	});

});
