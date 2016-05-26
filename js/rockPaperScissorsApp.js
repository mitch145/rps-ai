angular.module('RockPaperScissorsApp', ['Game'])
	.controller('GameController', function($scope, GameManager) {
		this.game = GameManager;
		this.choice = true; // set to true for normal gameplay, and false to skip the ai selection
		// Send move to game service
		this.sendMove = function(move){
			this.game.playRound(GameManager.moves[move]);
			this.lastPlayerMove = this.game.playerMoves[this.game.playerMoves.length-1];
		};

		

		// Finalise/submit choice of AI
		this.beginGame = function(){
			this.choice = false;
		};
		

});