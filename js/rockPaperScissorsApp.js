angular.module('RockPaperScissorsApp', ['Game'])
	.controller('GameController', function($scope, GameManager) {
		this.game = GameManager;
		this.score = GameManager.score;
		console.log(this.score);
		this.rock = function(){
			GameManager.playRound(GameManager.moves['rock']);
		};
		this.paper = function(){
			GameManager.playRound(GameManager.moves['paper']);
		};
		this.scissors = function(){
			GameManager.playRound(GameManager.moves['scissors']);
		};
		// Enable tooltips
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});

});