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
		// Scrolls to bottom of terminal element
		var elem = document.getElementById('news-feed');
		elem.scrollTop = elem.scrollHeight;
		console.log(this.moves);
	};

	// Enable tooltips for score panel
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});
});