angular.module('RockPaperScissorsApp', ['Game'])
	.controller('GameController', function($scope, GameManager) {
		this.game = GameManager;
		this.choice = true;
		// Send move to game service
		this.sendMove = function(move){
			this.game.playRound(GameManager.moves[move]);
			console.log(this.game.playerMove);
		};

		this.sendAIChoice = function(aiChoice){
			this.game.chooseAI(aiChoice);
		};

		this.finaliseAIChoice = function(){
			this.choice = false;
		};
		
		// Enable tooltips
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});

});