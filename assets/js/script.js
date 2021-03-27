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
    gameContentEl.style.visibility = "hidden";
}

var gameContentEl = document.querySelector(".gameInProgress");

var currentQuestion = 0;
var score = 0;
var timeLeft = 90;

var questionNumEl = document.getElementById("questionNum");
var questionContentEl = document.getElementById("questionContent");
var choicesEls = document.getElementsByClassName("choiceText");
var timerEl = document.getElementById("seconds");
var scoreEl = document.getElementById("scoreCount");
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



function checkAnswer(picked){
    // check for correct answer
    var resultString = "";
    if(questions[currentQuestion-1].correct == picked){
        score += 10;
        resultString = "CORRECT! +10 Score";
    }
    else {
        timeLeft -= 10;
        resultString = "WRONG! -10 Time";
    }
    resultEl.textContent = resultString;
    setTimeout(function(){
        resultEl.textContent = "";
    }, 1000);
    
    updateScore();
    renderQuestion();
}

/* renders next question:
1.) increment current question number
2.) display question number and Q&A content
*/
function renderQuestion(){
    if(currentQuestion <= questions.length){
        currentQuestion++;
        // display question number
        questionNumEl.textContent = currentQuestion;
        // display question content
        questionContentEl.textContent = questions[currentQuestion-1].q;
        // sets text content for answer choices
        for(var i=0; i < 4; i++){
            choicesEls[i].textContent = questions[currentQuestion-1].a[i];
        }
    }
    else{
        gameOver();
    }
}

function updateScore(){
    scoreEl.textContent = score;
}

/* starts the countdown:
1.) create time interval of one second
2.) end game once time left hits 0 */
function countdown(){   
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
    
        if(timeLeft === 0){
            clearInterval(timeInterval);
            gameOver();
        }
      }, 1000);
}

/* starts a new game:
1.) hide new game button and make the game elements visible
2.) reset score and render first question
3.) start the countdown */
function startGame(){
    console.log(gameContentEl);
    gameContentEl.style.visibility = "visible";
    newGameButtonEl.style.visibility = "hidden";
    score = 0;
    renderQuestion();
    countdown();
}

function gameOver(){
    
}

function renderLeaderboard(){

}

init();