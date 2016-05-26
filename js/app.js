angular.module('RockPaperScissorsApp', [])
.controller("GameController", function($scope) {

	// Variable declarations
	// Choice of ai in start menu
	this.aiChoice = 'random';
	// Whether game has started (passed through selection menu) or not
	this.gameStarted = false;
	// Current move selected by player
	this.currentMove = 'rock';


	// Enable tooltips
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});
});