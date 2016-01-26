angular.module("game")
	.factory("gameService", ["survives", function(survives) {
		"use strict";

		function confineIndex(idx, size) {
			var MIN_IDX = 0;
			var MAX_IDX = size - 1;

			if (idx > MAX_IDX) {
				return MIN_IDX;
			}
			if (idx < MIN_IDX) {
				return MAX_IDX;
			}
			return idx;
		}

		function getAliveCount(rows, rowIdx, colIdx) {
			var row = rows[confineIndex(rowIdx, rows.length)];
			return Number(row[confineIndex(colIdx, row.length)]);
		}

		return {
			reset: function(rows) {
				for (var rowIdx = 0; rowIdx < rows.length; rowIdx++) {
					for (var colIdx = 0, row = rows[rowIdx]; colIdx < row.length; colIdx++) {
						row[colIdx] = false;
					}
				}
			},
			evolve: function(rows, nextRows) {
				var gameOver = true;
				for (var rowIdx = 0; rowIdx < rows.length; rowIdx++) {
					for (var colIdx = 0, row = rows[rowIdx]; colIdx < row.length; colIdx++) {
						var numAliveNeighbors = 0;
						numAliveNeighbors += getAliveCount(rows, rowIdx - 1, colIdx - 1);
						numAliveNeighbors += getAliveCount(rows, rowIdx - 1, colIdx);
						numAliveNeighbors += getAliveCount(rows, rowIdx - 1, colIdx + 1);

						numAliveNeighbors += getAliveCount(rows, rowIdx, colIdx - 1);
						numAliveNeighbors += getAliveCount(rows, rowIdx, colIdx + 1);

						numAliveNeighbors += getAliveCount(rows, rowIdx + 1, colIdx - 1);
						numAliveNeighbors += getAliveCount(rows, rowIdx + 1, colIdx);
						numAliveNeighbors += getAliveCount(rows, rowIdx + 1, colIdx + 1);
						var cellSurvives = survives(rows[rowIdx][colIdx], numAliveNeighbors);
						if (cellSurvives) {
							gameOver = false;
						}
						nextRows[rowIdx][colIdx] = cellSurvives;
					}
				}
				return gameOver;
			}
		};

	}]);
