// Global variables
var currentQuestion;
var score;
var timeLeft;
var timeInterval;

// Question set 
var questions = [
    {
        q: "What German rock band released their debut album \"Monster Movie\" in 1969?",
        a: ["Scorpions", "Can", "NEU!", "Nektar"],
        correct: 1
    },
    {
        q: "Who was the lead vocalist of British punk band The Fall?",
        a: ["Mark E. Smith", "Robert Smith", "Elliott Smith", "Morrissey"],
        correct: 0
    },
    {
        q: "What song by David Bowie was performed by Nirvana at their famous MTV Unplugged in New York show?",
        a: ["Space Oddity", "Rebel Rebel", "The Man Who Sold the World", "Heroes"],
        correct: 2
    },
    {
        q: "What is the title of Black Sabbath's third full-length album?",
        a: ["Paranoid", "Master of Reality", "Sabbath Bloody Sabbath", "Heaven and Hell"],
        correct: 1
    },
    {
        q: "What is the name of the zany pop/rock band founded by the brothers Mael?",
        a: ["T. Rex", "Queen", "Roxy Music", "Sparks"],
        correct: 3
    },
    {
        q: "What power duo consists of John Lennon's son Sean and Primus bassist/vocalist Les Claypool?",
        a: ["The Claypool Lennon Conspiracy", "The Claypool Lennon Delirium", "The Claypool Lennon Duo", "The Claypool Lennon Project"],
        correct: 1
    },
    {
        q: "What metal band won a Grammy for their single \"B.Y.O.B.\"?",
        a: ["Korn", "System of a Down", "Slipknot", "Deftones"],
        correct: 1
    },
    {
        q: "What band released the album \"Yoshimi Battles the Pink Robots\" in 2002?",
        a: ["of Montreal", "Animal Collective", "Deerhunter", "The Flaming Lips"],
        correct: 3
    },
    {
        q: "What musical genre was pioneered in part by Brian Eno?",
        a: ["Techno", "Dubstep", "Ambient", "Country"],
        correct: 2
    },
    {
        q: "Who was the original vocalist of Pink Floyd before he was forced to quit the band?",
        a: ["Syd Barrett", "Roger Waters", "David Gilmour", "Richard Wright"],
        correct: 0
    }
];

// stats elements
var statsBoxEl = document.getElementById("statsBox");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
var timerEl = document.getElementById("seconds");
var scoreEl = document.getElementById("scoreCount");

// all content below page banner
var gameInProgressEl = document.getElementById("gameInProgress");

// displays question number or game over
var gameStatusEl = document.getElementById("gameStatus");

// includes questionContent and answer choice list
var qaEl = document.getElementById("qa");

// displays question text
var questionContentEl = document.getElementById("questionContent");

// answer choice list and items
var choiceListEl = document.getElementById("choiceList");
var choicesEls = document.getElementsByClassName("choiceText");
// answer choice buttons
var choiceAbuttonEl = document.getElementById("choiceA");
var choiceBbuttonEl = document.getElementById("choiceB");
var choiceCbuttonEl = document.getElementById("choiceC");
var choiceDbuttonEl = document.getElementById("choiceD");

// new game button
var newGameButtonEl = document.getElementById("newGame");

// score submission form
var initialsFormEl = document.getElementById("initialsForm");
var initialsTextBoxEl = document.getElementById("initialsTextBox");
var submitButtonEl = document.getElementById("submitButton");

// leaderboard
var leaderboardEl = document.getElementById("leaderboard");
var leaderboardListEl = document.getElementById("leaderboardList");
var leaderboardListItemsEls = document.getElementsByClassName("lbItem");

// listener for new game button
newGameButtonEl.addEventListener("click", startGame);

choiceAbuttonEl.addEventListener("click", function(){ checkAnswer(0); })
choiceBbuttonEl.addEventListener("click", function(){ checkAnswer(1); })
choiceCbuttonEl.addEventListener("click", function(){ checkAnswer(2); })
choiceDbuttonEl.addEventListener("click", function(){ checkAnswer(3); })

// format page for initial page load
function init(){
    questionContentEl.textContent = "Press the button to start the game:";
    statsBoxEl.style.visibility = "hidden";
    choiceListEl.style.display = "none";
    correctEl.style.visibility = "hidden";
    correctEl.textContent = "+10 pts";
    wrongEl.style.visibility = "hidden";
    initialsFormEl.style.display = "none";
    leaderboardEl.style.display = "none";
    
}

/* checkAnswer
* takes in an integer 0-3 representing answer choices A-D respectively
* increases score if matching correct answer, else decreases time
* displays message accordingly for 1 sec
* updates score and renders next question
*/
function checkAnswer(picked){
    correctEl.style.visibility = "hidden";
    wrongEl.style.visibility = "hidden";
    // check for correct answer
    if(questions[currentQuestion-1].correct == picked){
        score += 10;
        updateScore();
        // correctEl.textContent = "CORRECT! +10 points";
        correctEl.style.visibility = "visible";
    }
    else {
        if(timeLeft >= 10)
            timeLeft -= 10;
        else
            timeLeft = 0;
        updateTimer();
        // wrongEl.textContent = "WRONG! -10 sec";
        wrongEl.style.visibility = "visible";
    }
    setTimeout(function(){
        correctEl.style.visibility = "hidden";
        wrongEl.style.visibility = "hidden";
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
    scoreEl.textContent = score;
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
    timeInterval = setInterval(function () {
        
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
    questionContentEl.style.display = "initial";
    choiceListEl.style.display = "initial";
    statsBoxEl.style.visibility = "visible";
    leaderboardEl.style.display = "none";
    newGameButtonEl.style.display = "none";
    correctEl.textContent = "+10 pts";
    // clear leaderboard items
    while(leaderboardListEl.firstChild) {
        leaderboardListEl.removeChild(leaderboardListEl.firstChild);
    }
    score = 0;
    currentQuestion = 0;
    nextQuestion();
    countdown();
    updateTimer();
    updateScore();
    
}

function gameOver(){
    // stop game timer
    clearInterval(timeInterval);
    // award time bonus
    setTimeout(function(){
        timeBonus();
        
    }, 1000);
    
    gameStatusEl.textContent = "Game Over!";
    questionContentEl.textContent = "Calculating score...";
    questionContentEl.style.display = "initial";
    choiceListEl.style.display = "none";
}

/* timeBonus
Award a bonus point for every 5 seconds remaining */
function timeBonus(){
    var bonus = 0;
    var timeSubtracted = 0;
    correctEl.style.visibility = "visible";
    correctEl.textContent = "";
    // subtract time as bonus points are added
    timeInterval = setInterval(function(){
        if(timeLeft > 0){
            timeLeft--;
            timeSubtracted++;
            if(timeSubtracted % 5 === 0){
                bonus++;
                score++;
                updateScore();
            }
            updateTimer();
            correctEl.textContent = "BONUS: +" + bonus;          
        }      
        else{
            // once bonus is added, show the submission form
            clearInterval(timeInterval);
            questionContentEl.textContent = "Enter your initials:";
            initialsFormEl.style.display = "flex";
            // hide bonus text after 2 seconds
            setTimeout(function(){
                correctEl.style.visibility = "hidden";
                
            }, 2000);
        }
    }, 20);
}

// after clicking submit, hide the form and retrieve top scores
submitButtonEl.addEventListener("click", function(){
    initialsFormEl.style.display = "none";
    questionContentEl.style.display = "none";
    // create score submission object
    var scoreSubmission = {
        initials: initialsTextBoxEl.value,
        score: score
    };
    // retrieve high scores
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    // if empty, initialize it with current submission
    if(!highScores){
        highScores = [scoreSubmission];
    }
    // else, add current submission to end of array
    else {
        highScores.push(scoreSubmission);
    }
    // re-sort scores with new submission
    highScores = updateLeaderboard(highScores);
    // take the sorted array and remove the last item (lowest score)
    if(highScores.length > 5){
        highScores.pop();
    }
    // show leaderboard
    renderLeaderboard(highScores);
    // save new top 5 list to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
});

// sort the array containing the retrieved top 5 scores AND the current submission
function updateLeaderboard(scores){
    // comparison function to sort by score
    function compare(a, b){
        if(a.score < b.score){
            return 1;
        }
        if(a.score > b.score){
            return -1;
        }
        return 0;
    }
    // sort using comparison function
    return scores.sort(compare);
}

function renderLeaderboard(items){
    leaderboardEl.style.display = "initial";
    // loop through array items and display them on the leaderboard
    for(var i = 0; i < items.length; i++){
        var item = document.createElement("li");
        item.innerHTML = items[i].initials + "<span>" + items[i].score + "</span>";
        leaderboardListEl.appendChild(item);
    }
    newGameButtonEl.style.display = "initial";
}

init();