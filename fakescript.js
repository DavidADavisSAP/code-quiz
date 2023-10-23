/**
 * @description Code Quiz project
 * @author Amirah Yasmin
 * Created on (place date here)
 */
// Variables to handle the startQuizDiv, startQuizButton, savedHighscores and showHighscore method (function).
var startQuizDiv = document.getElementById("startQuizDiv");
var startQuizButton = document.getElementById("startQuizButton");
var savedHighscores = document.getElementById("savedHighscores");
savedHighscores.addEventListener("click", saveScore);


// quizBody - a reference to the quizBody div
var quizBody = document.getElementById("quizBody");


// quizTimer - displays the amount of time remaining.
var quizTimer = document.getElementById ("quizTimer");


// questionsEl - a reference to the question element
var questionsEl = document.getElementById("questionsEl");


// questionscontainer - a reference to the questions container. This container has the buttons for A,B,C and D. And results
var questionscontainer = document.getElementById("questionscontainer");
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");
/**
 * Amirah, you have no reference to the result ID in the html.  You need...
 * var result = document.getElementById("result");
 * Place it directly under buttonD
 */


// gameoverDiv - is a reference to the gameoverDiv
var gameoverDiv = document.getElementById("gameoverDiv");


// fianlScoreEl - is an element which will contain the final score
var finalScoreEl = document.getElementById("finalScoreEl");


// initials - a reference to an input which will hold the user's initials
var initials = document.getElementById ("initials");


// submitScoreButton - a button for submitting the score
var submitScoreButton = document.getElementById("submitScoreButton");


// highscoreDiv - a reference to the div which holds the high score display and its header
var highscoreDiv = document.getElementById("highscoreDiv");
var highscoreDisplayScore = document.getElementById("highscoreDisplayScore");
var highScoreHeader = document.getElementById("highscore-header");
var highscoreDisplayName = document.getElementById ("highscoreDisplayName");


// endGameBtns - a div which holds the end game buttons: playAgain, clearHighscore, saveScore
var endGameBtns = document.getElementById ("endGameBtns");
var playAgain = document.getElementById ("playAgain");
var clearHighscore = document.getElementById ("clearHighscore");
var saveScore = document.getElementById ("saveScore");


/**
 * Amirah, what are these variables for?  There are no HTML elements with IDs that match the value within the quotation marks.
 */
var highscoreInputName = document.getElementById("highscoreInputName");
var highscoreContainer = document.getElementById ("highscoreContainer");
var endQuiz = document.getElementById ("endQuiz")
var currentQuestionIndex = 0;





// Quiz questions array
  var quizQuestions = [
    
    // quizQuestions array (first array element has index 0).
    {
      question: "What does WWW stand for?",
      choiceA : "A. Word Walt Water",
      choiceB : "B. When We Would",
      choiceC : "C. World Wide Web",
      choiceD : "D.None of the above",
      correctAnswer: "C"
    },

    // quizQuestions array (second array element has index 1).
    {
      question: " What are Arrays in JavaScript used to store?",
      choiceA : "A. Numbers & strings",
      choiceB : "B. Other arrays",
      choiceC : "C. Booleans",
      choiceD : "D. All of the above",
      correctAnswer: "D"
    },

    // quizQuestions array (third array element has index 2).
    {
      question : "Commonly used data types do not include:",
      choiceA: "A. strings",
      choiceB: "B. booleans",
      choiceC: "C. numbers",
      choiceD: "D. alerts",
      correctAnswer: "D"
    },

    // quizQuestions array (fourth array element has index 3).
    {
      question : "What's the HTML tag for creating an ordered list?",
      choiceA:"A. <p>",
      choiceB: "B. <ol>",
      choiceC:"C. <ul>",
      choiceD: "D. None of the above",
      correctAnswer: "B"
    },

    // quizQuestions array (five array element has index 4).
    {
      question : "String values must be enclosed within ______ when being assigned to variables.",
      choiceA: "A. commas",
      choiceB: "B. curly brackets",
      choiceC: "C. quotes",
      choiceD: "D. parentheses",
      correctAnswer: "C"
    },
  ];


// global variables

// finalQuestionIndex - an expression which provides a value for the number of questions.
var finalQuestionIndex = quizQuestions.length;

// References for handling the quiz's time values
var timeLeft = 70; // initial time
var timerInterval;
var score = 0;
var correct;


// this function generates questions & answers
function generateQuizQuestion(){
  if (currentQuestionIndex===finalQuestionIndex){
    return showScore();
  }

  var currentQuestion = quizQuestions[currentQuestionIndex];
  
  questionsEl.textContent = currentQuestion.question;
  buttonA.textContent = currentQuestion.choiceA;
  buttonB.textContent = currentQuestion.choiceB;
  buttonC.textContent = currentQuestion.choiceC;
  buttonD.textContent = currentQuestion.choiceD;
};


// start quiz starts the timer & displays first question
function startQuiz() {
  questionscontainer.style.display = "block";
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  generateQuizQuestion();

  // timer
  timerInterval = setInterval(function() {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if(timeLeft === 0) {
      clearInterval(timerInterval);
      return showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}


// Function to show final score page
function showScore(){
  quizBody.style.display = "none"
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
}


// click button to show high scores
submitScoreButton.addEventListener("click", function savedHighscores() {
  if(highscoreInputName.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score
    };
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    gameoverDiv.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
  };
});


function generatesavedHighscores() {
  const savedHighscores= JSON.parse(localStorage.getItem("savedHighscores")) || [];
  highscoreDisplayScore.innerHTML = "";
  highscoreDisplayName.innerHTML = "";
  for (var i = 0; i < savedHighscores.length; i++) {
    var newScoreSpan = document.createElement("li");
    var newNameSpan = document.createElement("li");
    newScoreSpan.textContent = savedHighscores[i].score;
    newNameSpan.textContent = savedHighscores[i].name;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}


// Function to check selected answer
function checkAnswer(selectedAnswer) {
 
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

  if (selectedAnswer === correct && currentQuestionIndex !== finalQuestionIndex){ 
    score++;
    alert("That is correct!")
    currentQuestionIndex++;
    generatequizQuestion();
  
  } else if (selectedAnswer !== correct && currentQuestionIndex !== finalQuestionIndex){
    alert("That Is Incorrect.")
    currentQuestionIndex++;
    timeLeft -= 10; // Time penalty for incorrect answer
    generatequizQuestion()
  } else{
    showScore();
  }
}


// this function times quiz out
function endQuiz() {
  clearInterval(timerInterval);
  questionscontainer.innerHTML = "Quiz over!";
  submitScoreButton.style.display = "block";
}


// this function displays high score page
function generateHighscores(){
  startQuizDiv.style.display = "none"
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDisplayScore.style.display = "block";
  endGameBtns.style.display = "flex";
  generateHighscores();
}


// this functions starts quiz over
function replayQuiz(){
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 70;
  score = 0;
  currentQuestionIndex = 0;
}


// function saves user intials and score
function submitScore() {
  var initials = highscoreInputName.value.trim(); // Get user initials
  if (initials === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    // ... (your existing code for saving score)

    // Save initials along with the score
    var currentHighscore = {
        name: initials,
        submitScore: score
    }      
   }
}


// event listeners for buttons
startQuizButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", submitScore);
buttonA.addEventListener("click", function () { checkAnswer('A'); });
buttonB.addEventListener("click", function () { checkAnswer('B'); });
buttonC.addEventListener("click", function () { checkAnswer('C'); });
buttonD.addEventListener("click", function () { checkAnswer('D'); });


function init() {
  questionscontainer.style.display = "none";
} 

init();