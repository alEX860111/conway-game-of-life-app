describe("rules", function() {

	var rules;

	beforeEach(function() {
		module("game");
	});

	beforeEach(inject(function(_rules_) {
		rules = _rules_;
	}));

	describe("survives", function() {
		it("Any alive cell with fewer than two alive neighbours dies, as if caused by under-population.", function() {
			expect(rules.survives(true, 0)).toEqual(false);
			expect(rules.survives(true, 1)).toEqual(false);
		});

		it("Any alive cell with two or three alive neighbours lives on to the next generation.", function() {
			expect(rules.survives(true, 2)).toEqual(true);
			expect(rules.survives(true, 3)).toEqual(true);
		});

		it("Any alive cell with more than three alive neighbours dies, as if by overcrowding.", function() {
			expect(rules.survives(true, 4)).toEqual(false);
		});

		it("Any dead cell with exactly three alive neighbours becomes an alive cell, as if by reproduction", function() {
			expect(rules.survives(false, 0)).toEqual(false);
			expect(rules.survives(false, 1)).toEqual(false);
			expect(rules.survives(false, 2)).toEqual(false);
			expect(rules.survives(false, 3)).toEqual(true);
			expect(rules.survives(false, 4)).toEqual(false);
		});
	});

});
