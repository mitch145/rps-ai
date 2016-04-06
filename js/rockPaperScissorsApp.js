angular.module('RockPaperScissorsApp', [])
	.controller('RockPaperScissorsController', function($scope) {

		// Enable tooltips
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});

		// List of moves
		$scope.moves = {
			'rock' : {id: 'rock', name: 'Rock', beats: 'scissors', icon: 'fa-hand-rock-o'},
			'paper' : {id: 'paper', name: 'Paper', beats: 'rock', icon: 'fa-hand-paper-o'},
			'scissors' : {id: 'scissors', name: 'Scissors', beats: 'paper', icon: 'fa-hand-scissors-o'}
		};

		// Possible results
		$scope.results = {
			'tie' : {id: 'tie', message: 'Tie!'},
			'playerWin' : {id: 'playerWin', message: 'Player Wins!'},
			'aiWin' : {id: 'aiWin', message: 'AI Wins!'}
		};

		// Scorekeeping setup
		$scope.score = {
			scores: [0,0,0],
			scorePercent: ["0%", "0%", "0%"],
			totalGames: 0
		};

		$scope.rock = function rock(){
			playRound($scope.moves['rock']);
		};
		$scope.paper = function paper(){
			playRound($scope.moves['paper']);
		};
		$scope.scissors = function scissors(){
			playRound($scope.moves['scissors']);
		};

		function playRound(playerMove){
			aiMove = setAIMove();
			
			result = resolveWinner(playerMove, aiMove);
			$scope.score.totalGames++;
			
			calculateScorePercent();
			$scope.result = result;
		}

		function setAIMove(aiMove){
			aiMove = randomInt(1,3);
			if (aiMove == 1){
				return $scope.moves['rock'];
			} else if (aiMove == 2){
				return $scope.moves['paper'];
			} else {
				return $scope.moves['scissors'];
			}
		}

		function randomInt(min, max){
			randomNum = Math.floor(Math.random() * (max - min + 1) + min);
			return randomNum;
		}

		function resolveWinner(playerMove, aiMove){
			console.log("Player: " + playerMove.name);
			console.log("AI: " + aiMove.name);
			if (playerMove == aiMove){
				$scope.score.scores[1]++;
				return $scope.results['tie'];
			} else if (playerMove.beats == aiMove.id){
				$scope.score.scores[0]++;
				return $scope.results['playerWin'];
			} else if (aiMove.beats == playerMove.id){
				$scope.score.scores[2]++;
				return $scope.results['aiWin'];
			}
		}

		function calculateScorePercent(){
			console.log("score: "+$scope.score.scores);
			console.log("totalGames "+$scope.score.totalGames);
			if($scope.score.scores[0] != 0){
				$scope.score.scorePercent[0] = (($scope.score.scores[0]/$scope.score.totalGames)*100) + "%";
			} else {
				$scope.score.scorePercent[0] = "0%";
			}
			if($scope.score.scores[2] != 0){
				$scope.score.scorePercent[2] = (($scope.score.scores[2]/$scope.score.totalGames)*100) + "%";
			} else {
				$scope.score.scorePercent[2] = "0%";
			}
			if($scope.score.scores[1] != 0){
				$scope.score.scorePercent[1] = (($scope.score.scores[1]/$scope.score.totalGames)*100) + "%";
			} else {
				$scope.score.scorePercent[1] = "0%";
			}
			console.log($scope.score.scorePercent);
		}
});