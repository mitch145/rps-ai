angular.module('RockPaperScissorsApp', [])
	.controller('RockPaperScissorsController', function($scope) {
		
		//Constant declarations
		var ROCK = "Rock";
		var PAPER = "Paper";
		var SCISSORS = "Scissors";

		var TIE = "Tie!";
		var PLAYERWIN = "Player wins!"
		var AIWIN = "AI wins!"

		//Scorekeeping
		$scope.score = [0,0,0];

		$scope.rock = function rock(){
			playRound(ROCK);
		};
		$scope.paper = function paper(){
			playRound(PAPER);
		};
		$scope.scissors = function scissors(){
			playRound(SCISSORS);
		};

		function playRound(playerMove){
			$scope.playerMove = playerMove;
			console.log("Player: "+playerMove);
			aiMove = randomMove(3, 1);
			$scope.aiMove = aiMove;
			console.log("AI: "+aiMove);
			result = resolveWinner(playerMove, aiMove);
			$scope.result = result;
			console.log(result);
		}

		function randomMove(){
			min = 1;
			max = 3;
			move = Math.floor(Math.random() * (max - min + 1) + min);
			if(move == 1){
				return ROCK;
			} else if (move == 2){
				return PAPER;
			} else {
				return SCISSORS;
			}
		}

		function resolveWinner(playerMove, aiMove){
			if (playerMove == ROCK){
				if (aiMove == ROCK){
					$scope.score[1]++;
					return TIE;
				} else if (aiMove == PAPER){
					$scope.score[2]++;
					return AIWIN;
				} else if (aiMove == SCISSORS){
					$scope.score[0]++;
					return PLAYERWIN;
				}
			} else if (playerMove == PAPER){
				if (aiMove == ROCK){
					$scope.score[0]++;
					return PLAYERWIN;
				} else if (aiMove == PAPER){
					$scope.score[1]++;
					return TIE;
				} else if (aiMove == SCISSORS){
					$scope.score[2]++;
					return AIWIN;
				}
				
			} else if (playerMove == SCISSORS){
				if (aiMove == ROCK){
					$scope.score[2]++;
					return AIWIN;
				} else if (aiMove == PAPER){
					$scope.score[0]++;
					return PLAYERWIN;
				} else if (aiMove == SCISSORS){
					$scope.score[1]++;
					return TIE;
				}
				
			}
		}
});