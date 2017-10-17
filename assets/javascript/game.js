var trivia1 = {
	question: "What is the baseball team from San Francisco?",
	option1: "Giants",
	option2: "Red Sox",
	option3: "Dodgers",
	answer: "Giants"
}

var trivia2 = {
	question: "How many world series did Giants win since 2010?",
	option1: "One",
	option2: "Two",
	option3: "Three",
	answer: "Three"
}

var triviaQuestion = 0;
var questionArray = [trivia1, trivia2];
var rightCount = 0;
var wrongCount = 0;
var unAnsweredCount = 0;
const timeoutSeconds = 5000 //30 seconds
const timeoutAnswerStatus = 3000 //3 seconds

function resetValues() {
	triviaQuestion = 0;
	rightCount = 0;
	wrongCount = 0;
	unAnsweredCount = 0;
}

function displayFinalScore() {
	// Displays final score for the player
	// Also display "Start Over" to play again

	// Let us empty out the screen first
	$("#trivia-display").empty();

	$("#trivia-display").empty();	
	$("#trivia-display").html("<div id=\"score-text\"></div>");
	$("#score-text").html("<p> You final score is:</p>");
	$("#score-text").append("<p> Correct Answers: " + rightCount + "</p>");
	$("#score-text").append("<p> Wrong Answers: " + wrongCount + "</p>");
	$("#score-text").append("<p> Unanswered: " + unAnsweredCount + " </p>");
	$("#score-text").append("<button id=\"start-over-btn\" class=\"start-over\">Start Over</button>");

	$("#start-over-btn").click(function() {
		resetValues();
		getTriviaScreen();
	});
}

function checkAnswer(event) {
	// Check if the player's selection is the right answer

	console.log("checkAnswer2: " + event.data.param1);
	var correct_answer = questionArray[triviaQuestion].answer;
	var choice = event.data.param1;
	if (choice == correct_answer) {
		rightCount++;
		console.log("correct answer!");
	} else {
		wrongCount++;
		console.log("wrong answer!");
	}

	triviaQuestion++;
	if (triviaQuestion == questionArray.length) {
		displayFinalScore();
		console.log("Game Over");
	} else {
		getTriviaScreen();
		console.log("Next question");
	}
}

function timeoutAction() {
	console.log("Time's Up!");
	unAnsweredCount++;
	triviaQuestion++;
	if (triviaQuestion == questionArray.length) {
		displayFinalScore();
		console.log("Game Over");
	} else {
		getTriviaScreen();
		console.log("Next question");
	}
}

function getTriviaScreen() {

	// Let us empty out the screen first
	$("#trivia-display").empty();

	// Display the trivia question

	$("#trivia-display").addClass("question-display");	
	$("#trivia-display").html("<p><strong>Time Remaining: <span id=\"time-remaining\"></span>"+"</strong></p");
	$("#trivia-display").append("<p><em>" + questionArray[triviaQuestion].question + "</em></p>");
	$("#trivia-display").append("<hr>");
	$("#trivia-display").append("<div id=\"option-btn\"></div>");
	$("#option-btn").html("<p id=\"option1\">" + questionArray[triviaQuestion].option1 + "</p>");
	$("#option-btn").append("<p id=\"option2\">" + questionArray[triviaQuestion].option2 + "</p>");
	$("#option-btn").append("<p id=\"option3\">" + questionArray[triviaQuestion].option3 + "</p>");

	// Set Timer now
	setTimeout(timeoutAction, timeoutSeconds);
	//Click Functions for the Options
	console.log(questionArray[triviaQuestion].option1);
	$("#option1").click({param1: questionArray[triviaQuestion].option1}, checkAnswer);
	$("#option2").click({param1: questionArray[triviaQuestion].option2}, checkAnswer);
	$("#option3").click({param1: questionArray[triviaQuestion].option3}, checkAnswer);


}

function startGame() {
	getTriviaScreen();
	console.log("startGame");
	console.log(trivia1);
	console.log(trivia2);
}

$("#start-button").click(startGame);