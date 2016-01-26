module.exports = function(config) {
	config.set({

		basePath: "../",

		files: [
			"www/lib/angular/angular.js",
			"www/lib/angular-mocks/angular-mocks.js",
			"www/lib/lodash/dist/lodash.min.js",
			"www/js/gameController.js",
			"www/js/patterns.js",
			"www/js/rules.js",
			"www/js/game.js",
			"test/unit/**/*.js"
		],

		frameworks: ["jasmine"],

		browsers: ["PhantomJS"],

		plugins: [
			"karma-phantomjs-launcher",
			"karma-jasmine"
		]

	});
};
