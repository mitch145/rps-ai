angular.module('RockPaperScissorsApp', [])
.controller("GameController", function($scope) {

	// Variable declarations
	// Choice of ai in start menu
	this.aiChoice = 'Basic 2';
	// Whether game has started (passed through selection menu) or not, false by default
	this.gameStarted = false;
	// Current move selected by player
	this.currentMove = 'rock';
	// Previous moves
	this.moves = [];
	// Score percentages
	this.scorePercent = ['33%', '34%', '33%'];
	// Initialise name
	this.name = '';

	this.makeMove = function(){
		// Get ai response
		aiMove = getaiMove(this.aiChoice, this.moves);
		winner = resolveWinner(aiMove, this.currentMove);

		// Add move to array
		this.moves.push({
			playerMove: this.currentMove,
			aiMove: aiMove,
			winner: winner
		});

		// Scroll to bottom of terminal element
		var elem = document.getElementById('news-feed');
		elem.scrollTop = elem.scrollHeight;

		// Update score percentages
		this.calculateScorePercent();
	};

	getaiMove = function(aiChoice, moves){
		if(aiChoice == 'Basic 1'){
			aiMove = countAIMove(moves);
		} else if(aiChoice == 'Random'){
			aiMove = randomAIMove();
		} else if(aiChoice == 'Basic 2'){
			aiMove = countAILimitedMove(moves);
		}
		// else if(this.aiChoice =='pattern'){
		//	aiMove = this.patternAIMove();
		// }
		return aiMove;
	};

	resolveWinner = function(aiMove, playerMove){
		if(playerMove == aiMove){
			return 'Tie';
		} else if (playerMove == 'Rock'){
			if (aiMove == 'Paper'){
				return 'AI Win';
			} else if (aiMove == 'Scissors'){
				return 'Player Win';
			}
		} else if (playerMove == 'Paper'){
			if (aiMove == 'Scissors'){
				return 'AI Win';
			} else if (aiMove == 'Rock'){
				return 'Player Win';
			}
		} else if (playerMove == 'Scissors'){
			if (aiMove == 'Rock'){
				return 'AI Win';
			} else if (aiMove == 'Paper'){
				return 'Player Win';
			}
		}
	};

	randomAIMove = function(){
		min = 1;
		max = 3;
		aiMove = Math.floor(Math.random() * (max - min + 1) + min);
		// console.log("AI Logic: Just joking, it's random.");
		if (aiMove == 1){
			return 'Rock';
		} else if (aiMove == 2){
			return 'Paper';
		} else {
			return 'Scissors';
		}
	};

	countAIMove = function (moves){
		rock = 0;
		paper = 0;
		scissors = 0;
		for(i=0; i<moves.length; i++){
			if(moves[i].playerMove == 'Rock'){
				rock++;
			} else if(moves[i].playerMove == 'Paper'){
				paper++;
			} else if(moves[i].playerMove == 'Scissors'){
				scissors++;
			}
		}
		// console.log("Ai Logic - " + "Rock: "+ rock + " - Paper: "+paper + " - Scissors: " + scissors);
		if(rock > paper){
			if (scissors > rock) {
				// scissors greatest
				return 'Rock';
			} else {
				// rock greatest
				return 'Paper';
			}
		} else if(scissors > paper) {
			// scissors greatest
			return 'Rock';
		} else {
			// paper greatest
			return 'Scissors';
		}
	};

	countAILimitedMove = function (moves){
		rock = 0;
		paper = 0;
		scissors = 0;

		numMovesToCount = 10;
		if(moves.length > numMovesToCount){
			startIndex = moves.length-numMovesToCount;
		} else {
			startIndex = 0;
		}
		for(i=startIndex; i<moves.length; i++){
			if(moves[i].playerMove == 'Rock'){
				rock++;
			} else if(moves[i].playerMove == 'Paper'){
				paper++;
			} else if(moves[i].playerMove == 'Scissors'){
				scissors++;
			}
		}
		// console.log("Ai Logic - " + "Rock: "+ rock + " - Paper: "+paper + " - Scissors: " + scissors);
		if(rock > paper){
			if (scissors > rock) {
				// scissors greatest
				return 'Rock';
			} else {
				// rock greatest
				return 'Paper';
			}
		} else if(scissors > paper) {
			// scissors greatest
			return 'Rock';
		} else {
			// paper greatest
			return 'Scissors';
		}
	};

	// Calculates the score as a percentage
	this.calculateScorePercent = function(){
			
			playerWins = 0;
			aiWins = 0;
			ties = 0;

			for(i = 0; i < this.moves.length; i++){
				if(this.moves[i].winner == 'AI Win'){
					aiWins++;
				} else if(this.moves[i].winner == 'Player Win'){
					playerWins++;
				} if(this.moves[i].winner == 'Tie'){
					ties++;
				}
			}
			if(playerWins !== 0){
				this.scorePercent[0] = ((playerWins/this.moves.length)*100);
			} else {
				this.scorePercent[0] = 0;
			}
			if(aiWins !== 0){
				this.scorePercent[2] = ((aiWins/this.moves.length)*100);
			} else {
				this.scorePercent[2] = 0;
			}
			if(ties !== 0){
				this.scorePercent[1] = ((ties/this.moves.length)*100);
			} else {
				this.scorePercent[1] = 0;
			}
	};


	// Firebase
	
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCyJMeTo0e83l_3_NZF_zP4jTJvQPMg-VQ",
		authDomain: "rockpaperscissors-da86b.firebaseapp.com",
		databaseURL: "https://rockpaperscissors-da86b.firebaseio.com",
		storageBucket: "rockpaperscissors-da86b.appspot.com",
	};
	firebase.initializeApp(config);

	// Get a ref to the database service
	var database = firebase.database();

	
	// Initialise $scope.todos
	database.ref('scores/').once('value', function(snapshot) {
		$scope.$apply(function() {
			
			$scope.scores = [];
			snapshot.forEach(function(childSnapshot) {
				$scope.scores.push(childSnapshot.val());
			});
			console.log($scope.scores);
		});
	});


	this.uploadHighscore = function uploadHighscore() {	
		// Calculate score
		playerWins = 0;
		aiWins = 0;
		ties = 0;
		for(i = 0; i < this.moves.length; i++){
			if(this.moves[i].winner == 'AI Win'){
				aiWins++;
			} else if(this.moves[i].winner == 'Player Win'){
				playerWins++;
			} if(this.moves[i].winner == 'Tie'){
				ties++;
			}
		}

		// Get a key for a new Post.
		var newPostKey = database.ref().child('posts').push().key;

		// A post entry.
		var postData = {
			key: newPostKey,
			name: this.name,
			moves: this.moves,
			playerWins: playerWins,
			aiWins: aiWins,
			ties: ties,
			scorePercent: this.scorePercent,
			ai: this.aiChoice
		};

		// Reset Stuff

		// Choice of ai in start menu
		this.aiChoice = 'Basic 2';
		// Whether game has started (passed through selection menu) or not, false by default
		this.gameStarted = false;
		// Current move selected by player
		this.currentMove = 'rock';
		// Previous moves
		this.moves = [];
		// Score percentages
		this.scorePercent = ['33%', '34%', '33%'];

		// Write the new post's data
		var updates = {};
		updates['/scores/' + newPostKey] = postData;

		return database.ref().update(updates);
	};

	// Watch the firebase database
	firebase.database().ref('scores/').on('value', function(snapshot){
		$scope.scores = snapshot.val();

		$scope.scores = [];
		snapshot.forEach(function(childSnapshot) {
			$scope.scores.push(childSnapshot.val());
		});
		console.log($scope.scores);
		// console.log($scope.todos.length);
		// for(i = 0; i < $scope.todos.length; i++){
		//   console.log($scope.todos[i].body);
		// }
		console.log("finished watch without crashing");
	});

	$scope.testFunction = function(){
		console.log($scope.scores[0].name);
	}

	// Enable tooltips for score panel
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});
});