angular.module('RockPaperScissorsApp', [])
.controller("GameController", function($scope) {

	// Variable declarations
	// Choice of ai in start menu
	this.aiChoice = 'random';
	// Whether game has started (passed through selection menu) or not, false by default
	this.gameStarted = true;
	// Current move selected by player
	this.currentMove = 'rock';
	// Previous moves
	this.moves = [];

	this.makeMove = function(){
		this.moves.push(this.currentMove + " v. N/A");
		console.log(this.moves);
	};

	// Enable tooltips
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});
});