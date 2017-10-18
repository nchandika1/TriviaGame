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

// Trivia Array and the Index into the array
var triviaQuestion = 0;
var questionArray = [trivia1, trivia2];

// Counters for the score
var rightCount = 0;
var wrongCount = 0;
var unAnsweredCount = 0;

/******* TIMER RELATED DECLARATIONS ********/
/* There are two timers:  
	Time Remaining:  Runs when the trivia question is displayed
					 Status goes to unanswered if the timer expires
	Display Answer Time:  When the player's response is displayed, 
						  Window is displayed for few seconds before 
						  moving on to next question
*/

// Constant to define the timer for trivia question
const timeRemainingInSeconds = 15 //15 seconds
// Constant to define the timer for result display...
// before moving onto the next questions
const answerWindowTimeout = 3000 //3 seconds

// Timer to store the result display timer
var displayAnswerTimer;

// Timer to store the trivia countdown timer
var timeRemainingTimer;

/******************************************/

function resetValues() {
	triviaQuestion = 0; // Question Index
	rightCount = 0; // Right answer count
	wrongCount = 0; // Wrong answer count
	unAnsweredCount = 0; // Unanswered count
}

function displayTimeRemaining() {
	// Function that displays countdown Timer on the screen

	var seconds = timeRemainingInSeconds;
	timeRemainingTimer = setInterval(function() {
		// Attach to the elemnt for display
		$("#time-remaining").html(seconds);
		seconds--;
		if (seconds < 0) {
			clearInterval(timeRemainingTimer); // Disable Timer
			unAnsweredCount++; // Update counter

			// Get the next trivia question
			//??????????????????????
			// display answer window here with unanswered response
			displayTriviaResponse("unanswered");
			//renderNextTriviaQuestion();
		}
	}, 1000); // 1 second countdown
}

function displayFinalScore() {
	// Displays final score for the player
	// Also display "Start Over" to play again

	// Let us empty out the screen first
	$("#trivia-display").empty();

	$("#trivia-display").html("<div id=\"score-text\"></div>");
	$("#score-text").html("<h3>Your final score is:</h3>");
	$("#score-text").append("<p>Correct Answers: " + rightCount + "</p>");
	$("#score-text").append("<p>Wrong Answers: " + wrongCount + "</p>");
	$("#score-text").append("<p>Unanswered: " + unAnsweredCount + " </p>");
	$("#score-text").append("<button id=\"start-over-btn\" class=\"start-over\">Start Over</button>");

	$("#start-over-btn").click(function() {
		// User pressed Start Over button, so start the game again
		resetValues();
		renderTriviaQuestion();
	});
}

function displayAnswerWindowTimeout() {
	// Function to execute when the timer expires on the answer window
	console.log("displayAnswerWindowTimeout");	

	// Clear the timer first
	clearTimeout(displayAnswerTimer);

	// Move on to the next question or reach the end
	renderNextTriviaQuestion();
}

function displayTriviaResponse(answer) {
	// Function creates the screen to indicate to the player the answer
	// is correct or incorrect before movign on to the next question.

	// Let us empty out the screen first
	$("#trivia-display").empty();

	switch (answer) {
		case "correct":
			$("#trivia-display").html("<p><strong>Correct Answer!</strong></p");
			break;
		case "incorrect":
			$("#trivia-display").html("<p><strong>Incorrect Answer!</strong></p>");
			$("#trivia-display").append("<p>Correct Answer is : " + questionArray[triviaQuestion].answer + "</p>");
			break;
		case "unanswered":
			$("#trivia-display").html("<p></strong>Time's Up!</strong></p>");
			$("#trivia-display").append("<p>Correct Answer is : " + questionArray[triviaQuestion].answer + "</p>");
			break;
	}

	// Display this screen only for 3s and then move on to the next Trivia
	// Question after the timer expires.
	displayAnswerTimer = setTimeout(displayAnswerWindowTimeout, answerWindowTimeout);
}

function checkAnswer(event) {
	// Check if the player's selection is the right answer
	console.log("checkAnswer: " + event.data.param1);

	// Disable the "Time Remaining" timer since the user selected a choice.
	clearInterval(timeRemainingTimer);

	var correct_answer = questionArray[triviaQuestion].answer;
	var player_choice = event.data.param1;
	if (player_choice == correct_answer) {
		rightCount++; // Increment correct answer count;
		console.log("Answer: Correct!");

		// Display to the player that the answer is CORRECT!
		displayTriviaResponse("correct");

	} else {
		wrongCount++;
		console.log("Answer: Incorrect!");

		// Display to the player that the answer is INCORRECT!
		displayTriviaResponse("incorrect");
	}
}

function renderNextTriviaQuestion() {
	// Function that tries to get the next Trivia question unless it reaches the end
	// Move on to the next question or reach the end
	triviaQuestion++;
	if (triviaQuestion == questionArray.length) {
		displayFinalScore();
		console.log("Game Over");
	} else {
		renderTriviaQuestion();
		console.log("Next question");
	}
}

function renderTriviaQuestion() {
	// Function to display Trivia Question and initiat the click functions	
	console.log("renderTriviaQuestion #: " + triviaQuestion);

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

	// After displaying the Trivia question, 
	// set Seconds Remaining Timer
	displayTimeRemaining();
	
	// Click Functions for the Options and pass the button indicator to the function
	$("#option1").click({param1: questionArray[triviaQuestion].option1}, checkAnswer);
	$("#option2").click({param1: questionArray[triviaQuestion].option2}, checkAnswer);
	$("#option3").click({param1: questionArray[triviaQuestion].option3}, checkAnswer);
}

function startGame() {
	console.log("startGame");
	console.log(questionArray);

	// Get the first Trivia question
	renderTriviaQuestion();
}

// Main function:  Run when the "Start" is clicked
$("#start-button").click(startGame);