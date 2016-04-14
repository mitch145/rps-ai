angular.module('RockPaperScissorsApp', ['Game'])
	.controller('GameController', function($scope, GameManager) {
		this.game = GameManager;
		this.choice = true; // set to true for normal gameplay, and false to skip the ai selection
		// Send move to game service
		this.sendMove = function(move){
			this.game.playRound(GameManager.moves[move]);
			this.lastPlayerMove = this.game.playerMoves[this.game.playerMoves.length-1];
		};

		// Send choice of AI
		this.sendAIChoice = function(aiChoice){
			this.game.chooseAI(aiChoice);
		};

		// Finalise/submit choice of AI
		this.finaliseAIChoice = function(){
			this.choice = false;
		};
		
		// Enable tooltips
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});

});