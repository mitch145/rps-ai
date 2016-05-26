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
		// Get ai response
		aiMove = getaiMove();
		playRound(aiMove);

		// Add move to array
		this.moves.push({
			playerMove: this.currentMove,
			aiMove: 'Scissors'
		});

		// Scroll to bottom of terminal element
		var elem = document.getElementById('news-feed');
		elem.scrollTop = elem.scrollHeight;
		console.log(this.moves);
	};

	getAIMove = function(){
		if(this.aiChoice == 'count1'){
			aiMove = countAIMove();
		} else if(this.aiChoice == 'random'){
			aiMove = randomAIMove();
		} else if(this.aiChoice == 'count2'){
			aiMove = countAILimitedMove();
		}
		// else if(this.aiChoice =='pattern'){
		//	aiMove = this.patternAIMove();
		// }
		return aiMove;
	};

	randomAIMove = function(){
		min = 1;
		max = 3;
		aiMove = Math.floor(Math.random() * (max - min + 1) + min);
		console.log("AI Logic: Just joking, it's random.");
		if (aiMove == 1){
			return 'rock';
		} else if (aiMove == 2){
			return 'paper';
		} else {
			return 'scissors';
		}
	};






	// Enable tooltips for score panel
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});
});