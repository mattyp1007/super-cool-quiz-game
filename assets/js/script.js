// Global variables
var currentQuestion;
var score;
var timeLeft;

// Question set 
var questions = [
    {
        q: "?",
        a: ["*Option A", "Option B", "Option C", "Option D"],
        correct: 0
    },
    {
        q: "?",
        a: ["Option A", "Option B", "Option C", "*Option D"],
        correct: 3
    },
    {
        q: "?",
        a: ["Option A", "Option B", "*Option C", "Option D"],
        correct: 2
    },
    {
        q: "?",
        a: ["Option A", "*Option B", "Option C", "Option D"],
        correct: 1
    },
    {
        q: "?",
        a: ["Option A", "Option B", "*Option C", "Option D"],
        correct: 2
    }
];

function init(){
    gameInProgressEl.style.visibility = "hidden";
}



var statsEl = document.getElementById("stats");
var qaEl = document.getElementById("qa");
var gameInProgressEl = document.getElementById("gameInProgress");
var gameStatusEl = document.getElementById("gameStatus");
var questionContentEl = document.getElementById("questionContent");
var choicesEls = document.getElementsByClassName("choiceText");
var timerEl = document.getElementById("seconds");
var scoreEl = document.getElementById("score");
var resultEl = document.getElementById("result");
var newGameButtonEl = document.getElementById("newGame");

var choiceAbuttonEl = document.getElementById("choiceA");
var choiceBbuttonEl = document.getElementById("choiceB");
var choiceCbuttonEl = document.getElementById("choiceC");
var choiceDbuttonEl = document.getElementById("choiceD");


newGameButtonEl.addEventListener("click", function(){ startGame(); })

choiceAbuttonEl.addEventListener("click", function(){ checkAnswer(0); })
choiceBbuttonEl.addEventListener("click", function(){ checkAnswer(1); })
choiceCbuttonEl.addEventListener("click", function(){ checkAnswer(2); })
choiceDbuttonEl.addEventListener("click", function(){ checkAnswer(3); })


/* checkAnswer
* takes in an integer 0-3 representing answer choices A-D respectively
* increases score if matching correct answer, else decreases time
* displays message accordingly for 1 sec
* updates score and renders next question
*/
function checkAnswer(picked){
    // check for correct answer
    var resultString = "";
    if(questions[currentQuestion-1].correct == picked){
        score += 10;
        updateScore();
        resultString = "CORRECT! +10 Score";
    }
    else {
        timeLeft -= 10;
        updateTimer();
        resultString = "WRONG! -10 Time";
    }
    resultEl.textContent = resultString;
    setTimeout(function(){
        resultEl.textContent = "";
    }, 1000);

    nextQuestion();
}
/* nextQuestion
* increment question number
* if not at the end then render question, else end game */
function nextQuestion(){
    currentQuestion++;
    if(currentQuestion <= questions.length){
        renderQuestion();
    }
    else{
        gameOver();
    }
}

/* renderQuestion:
* display question number and content
*/
function renderQuestion(){
    // display question number
    gameStatusEl.textContent = "Question " + currentQuestion;
    // display question content
    questionContentEl.textContent = questions[currentQuestion-1].q;
    // sets text content for answer choices
    for(var i=0; i < 4; i++){
        choicesEls[i].textContent = questions[currentQuestion-1].a[i];
    }
}

function updateScore(){
    scoreEl.textContent = "Score: " + score;
}
function updateTimer(){
    timerEl.textContent = timeLeft;  
}
/* countdown
* create time interval of one second
* update timer each interval
* end game once time left hits 0
*/
function countdown(){  
    timeLeft = 90; 
    var timeInterval = setInterval(function () {
        
        timeLeft--;
        updateTimer();
        if(timeLeft <= 0 ){
            clearInterval(timeInterval);
            gameOver();
        }
      }, 1000);
}

/* startGame
* hide new game button and display game elements
* reset score and render first question
* start the countdown
*/
function startGame(){
    gameInProgressEl.style.visibility = "visible";
    newGameButtonEl.style.visibility = "hidden";
    score = 0;
    currentQuestion = 0;
    nextQuestion();
    countdown();
    updateTimer();
    updateScore();
}

function gameOver(){
    statsEl.style.visibility = "hidden";
    qaEl.style.visibility = "hidden";
    gameStatusEl.textContent = "Game Over!";

}

function renderLeaderboard(){

}

init();