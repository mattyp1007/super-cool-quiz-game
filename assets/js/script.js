// Question set 
var questions = [
    {
        q: "This is question 1.",
        a: ["Option A", "Option B", "Option C", "Option D"],
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
var choicesEls = document.getElementsByClassName("choice");
var timerEl = document.getElementById("seconds");
console.log(timerEl);

function renderQuestion(qNum){
    // display question number
    questionNumEl.textContent = qNum;
    // display question content
    questionContentEl.textContent = questions[qNum-1].q;
    // sets text content for answer choices
    for(var i=0; i < 4; i++){
        choicesEls[i].textContent = questions[qNum-1].a[i];
    }
}

function checkAnswer(picked){
    // check for correct answer
}
function countdown(){
    var timeLeft = 90;
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
    renderQuestion(2);
    countdown();
}

startGame();