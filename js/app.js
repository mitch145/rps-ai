angular.module('RockPaperScissorsApp', [])
.controller("GameController", function($scope) {

	// Variable declarations
	this.aiChoice = 'random';


	this.printChoice = function(){
		console.log(this.aiChoice);
	};

	// Enable tooltips
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});
});