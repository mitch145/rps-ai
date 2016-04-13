angular.module('RockPaperScissorsApp', ['Game'])
	.controller('GameController', function($scope, GameManager) {
		this.game = GameManager;

		this.sendMove = function(move){
			this.game.playRound(GameManager.moves[move]);
		};
		
		// Enable tooltips
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});

});