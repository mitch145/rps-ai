angular.module('Game',[])
	.service('GameManager', function(){
		// Score
		this.score = {
			scores: [0,0,0],
			scorePercent: ["0%", "0%", "0%"],
			totalGames: 0,
			result: 'N/A'
		};
		// List of moves
		this.moves = {
			'rock' : {id: 'rock', name: 'Rock', beats: 'scissors', icon: 'fa-hand-rock-o'},
			'paper' : {id: 'paper', name: 'Paper', beats: 'rock', icon: 'fa-hand-paper-o'},
			'scissors' : {id: 'scissors', name: 'Scissors', beats: 'paper', icon: 'fa-hand-scissors-o'}
		};
		// Possible results
		this.results = {
			'tie' : {id: 'tie', message: 'Tie!'},
			'playerWin' : {id: 'playerWin', message: 'Player Wins!'},
			'aiWin' : {id: 'aiWin', message: 'AI Wins!'}
		};
		// Play round
		this.playRound = function(playerMove){
			aiMove = this.setAIMove();
			
			result = this.resolveWinner(playerMove, aiMove);
			this.score.totalGames++;
			
			this.calculateScorePercent();
			this.score.result = result;
		};
		this.setAIMove = function(aiMove){
			aiMove = this.randomInt(1,3);
			if (aiMove == 1){
				return this.moves['rock'];
			} else if (aiMove == 2){
				return this.moves['paper'];
			} else {
				return this.moves['scissors'];
			}
		};
		this.randomInt = function(min, max){
			randomNum = Math.floor(Math.random() * (max - min + 1) + min);
			return randomNum;
		}

		this.resolveWinner = function(playerMove, aiMove){
			console.log("Player: " + playerMove.name);
			console.log("AI: " + aiMove.name);
			if (playerMove == aiMove){
				this.score.scores[1]++;
				return this.results['tie'];
			} else if (playerMove.beats == aiMove.id){
				this.score.scores[0]++;
				return this.results['playerWin'];
			} else if (aiMove.beats == playerMove.id){
				this.score.scores[2]++;
				return this.results['aiWin'];
			}
		};

		this.calculateScorePercent = function(){
			console.log("score: "+this.score.scores);
			console.log("totalGames "+this.score.totalGames);
			if(this.score.scores[0] !== 0){
				this.score.scorePercent[0] = ((this.score.scores[0]/this.score.totalGames)*100) + "%";
			} else {
				this.score.scorePercent[0] = "0%";
			}
			if(this.score.scores[2] !== 0){
				this.score.scorePercent[2] = ((this.score.scores[2]/this.score.totalGames)*100) + "%";
			} else {
				this.score.scorePercent[2] = "0%";
			}
			if(this.score.scores[1] !== 0){
				this.score.scorePercent[1] = ((this.score.scores[1]/this.score.totalGames)*100) + "%";
			} else {
				this.score.scorePercent[1] = "0%";
			}
			console.log(this.score.scorePercent);
		};
		// Update score
		this.updateScore = function(){};
	});