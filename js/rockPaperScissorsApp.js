angular.module('RockPaperScissorsApp', [])
	.controller('RockPaperScissorsController', function($scope) {
		$(function () {
			$('[data-toggle="tooltip"]').tooltip()
		});
		//Constant declarations
		var ROCK = 'Rock';
		var PAPER = "Paper";
		var SCISSORS = "Scissors";

		$scope.rockIcon = "fa-hand-rock-o";
		$scope.paperIcon = "fa-hand-paper-o";
		$scope.scissorsIcon = "fa-hand-scissors-o";

		var TIE = "Tie!";
		var PLAYERWIN = "Player wins!";
		var AIWIN = "AI wins!";

		$scope.scorePercent = ["0%", "0%", "0%"];

		//Scorekeeping
		$scope.score = [0,0,0];
		$scope.totalGames = 0;

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
			setPlayerMove(playerMove);
			aiMove = setAIMove();
			
			result = resolveWinner(playerMove, aiMove);
			$scope.totalGames++;
			
			calculateScorePercent();
			$scope.result = result;
		}

		function setPlayerMove(playerMove){
			$scope.playerMove = playerMove;
			if (playerMove == ROCK){
				$scope.playerIcon = $scope.rockIcon;
			} else if (playerMove == PAPER){
				$scope.playerIcon = $scope.paperIcon;
			} else {
				$scope.playerIcon = $scope.scissorsIcon;
			}
		}

		function setAIMove(aiMove){
			aiMove = randomMove(3, 1);
			$scope.aiMove = aiMove;
			if ($scope.aiMove == ROCK){
				$scope.aiIcon = $scope.rockIcon;
			} else if ($scope.aiMove == PAPER){
				$scope.aiIcon = $scope.paperIcon;
			} else {
				$scope.aiIcon = $scope.scissorsIcon;
			}
			return aiMove;
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

		function calculateScorePercent(){
			console.log("score: "+$scope.score);
			console.log("totalGames "+$scope.totalGames);
			if($scope.score[0] != 0){
				$scope.scorePercent[0] = (($scope.score[0]/$scope.totalGames)*100) + "%";
			} else {
				$scope.scorePercent[0] == "0%"
			}
			if($scope.score[2] != 0){
				$scope.scorePercent[2] = (($scope.score[2]/$scope.totalGames)*100) + "%";
			} else {
				$scope.scorePercent[2] == "0%"
			}
			if($scope.score[1] != 0){
				$scope.scorePercent[1] = (($scope.score[1]/$scope.totalGames)*100) + "%";
			} else {
				$scope.scorePercent[1] == "0%"
			}
			console.log($scope.scorePercent);
		}
});