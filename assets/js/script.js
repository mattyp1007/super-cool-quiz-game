// Question set 
var questions = [
    {
        q: "What question number is this?",
        a: ["1", "13", "6", "0"],
        correct: 0
    },
    {
        q: "This is question 2.",
        a: ["Option A", "Option B", "Option C", "Option D"],
        correct: 3
    }
];
var questionNumEl = document.getElementById("questionNum");
var questionContentEl = document.getElementById("questionContent");
var choicesEls = document.getElementsByClassName("choiceText");
var timerEl = document.getElementById("seconds");
var scoreEl = document.getElementById("scoreCount");
var choiceAbuttonEl = document.getElementById("choiceA");
var choiceBbuttonEl = document.getElementById("choiceB");
var choiceCbuttonEl = document.getElementById("choiceC");
var choiceDbuttonEl = document.getElementById("choiceD");

var currentQuestion = 0;
var score = 0;

choiceAbuttonEl.addEventListener("click", function(){ checkAnswer(0); })
choiceBbuttonEl.addEventListener("click", function(){ checkAnswer(1); })
choiceCbuttonEl.addEventListener("click", function(){ checkAnswer(2); })
choiceDbuttonEl.addEventListener("click", function(){ checkAnswer(3); })

function checkAnswer(picked){
    // check for correct answer
    if(questions[currentQuestion-1].correct == picked){
        score += 10;
    }
    else {
        score -= 5;
    }
    updateScore();
    renderQuestion();
}

function renderQuestion(){
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

function updateScore(){
    scoreEl.textContent = score;
}


function countdown(){
    var timeLeft = 10;
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
    
        if(timeLeft === 0){
          clearInterval(timeInterval);
        //   gameOver();
        }
      }, 1000);
}

function startGame(){
    
    renderQuestion();
    countdown();
}

startGame();