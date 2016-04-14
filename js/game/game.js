angular.module('Game',[])
	.service('GameManager', function(){
		// Scorekeeping setup
		this.score = {
			scores: [0,0,0],
			scorePercent: ["0%", "0%", "0%"],
			totalGames: 0,
			result: 'N/A'
		};
		// List of possible moves
		this.moves = {
			'rock' : {id: 'rock', name: 'Rock', beats: 'scissors', icon: 'fa-hand-rock-o'},
			'paper' : {id: 'paper', name: 'Paper', beats: 'rock', icon: 'fa-hand-paper-o'},
			'scissors' : {id: 'scissors', name: 'Scissors', beats: 'paper', icon: 'fa-hand-scissors-o'}
		};
		// Code for move history
		// 0 = rock, 1 = paper, 2 = scissors
		this.playerMoves = [];
		// Placeholder code for move history
		this.aiMove = this.moves['rock'];
		// Possible results
		this.results = {
			'tie' : {id: 'tie', message: 'Tie!'},
			'playerWin' : {id: 'playerWin', message: 'Player Wins!'},
			'aiWin' : {id: 'aiWin', message: 'AI Wins!'}
		};
		this.ai = {
			current: 'random',
			'random' : {
				id: 'random',
				name: 'Random'
			},
			'count' : {
				id: 'count',
				name: 'Basic'
			}
		};

		// AI Choice
		this.chooseAI = function(aiChoice){
			this.ai.current = aiChoice;
		};

		// Play round
		this.playRound = function(playerMove){
			this.playerMoves[this.playerMoves.length] = playerMove.id;
			aiMove = this.setAIMove();
			this.score.result = this.resolveWinner(playerMove, aiMove);
			this.score.totalGames++;
			this.calculateScorePercent();
			this.playerMove = playerMove;
		this.aiMove = aiMove;
		};

		this.resolveWinner = function(playerMove, aiMove){
			console.log("Player: " + playerMove.name);
			console.log("AI - "+this.ai[this.ai.current].name+": " + aiMove.name);
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
			console.log("Score: "+this.score.scores);
			console.log("TotalGames "+this.score.totalGames);
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
		};

		this.setAIMove = function(){
			if(this.ai.current == 'count'){
				aiMove = this.countAIMove();
			} else if(this.ai.current == 'random'){
				aiMove = this.randomAIMove();
			}
			return aiMove;
		};
		this.randomAIMove = function(){
			min = 1;
			max = 3;
			aiMove = Math.floor(Math.random() * (max - min + 1) + min);
			console.log("AI Logic: Just joking, it's random.")
			if (aiMove == 1){
				return this.moves['rock'];
			} else if (aiMove == 2){
				return this.moves['paper'];
			} else {
				return this.moves['scissors'];
			}
		};

		this.countAIMove = function (){
			rock = 0;
			paper = 0;
			scissors = 0;
			for(i=0; i<this.playerMoves.length; i++){
				if(this.playerMoves[i] == 'rock'){
					rock++;
				} else if(this.playerMoves[i] == 'paper'){
					paper++;
				} else if(this.playerMoves[i] == 'scissors'){
					scissors++;
				}
			}
			console.log("Ai Logic - " + "Rock: "+ rock + " - Paper: "+paper + " - Scissors: " + scissors);
			if(rock > paper){
				// rock > paper, scissors unknown
				if (rock > scissors) {
					// rock highest, return paper
					return this.moves['paper'];
				} else if(scissors > paper){
					// scissors highest, return rock
					return this.moves['rock'];
				}
			} else {
				// default - program will bias to paper if even, return scissors
				return this.moves['scissors'];
			}
			
		};

	});