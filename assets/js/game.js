//Global Variables//

var questions = document.getElementById("questions");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var endQuizDiv = document.getElementById("end-quiz");
var actualTimer = document.getElementById("timer");
var actualQuiz = document.getElementById("quiz");
var highScoreInitials = document.getElementById("highscore-initials");
var endScore = document.getElementById("end-score");
var startQuizButton = document.getElementById("start-button");
var submitScoreButton = document.getElementById("submit-score");
var overallHighscore = document.getElementById("overall-highscore");
var totalPage = document.getElementById("total-page");
var finalButtons = document.getElementById("final-buttons");
var highScoresScore = document.getElementById("highscore-score");
var beginningQuiz = document.getElementById("beginning-quiz");
var answerResult = document.getElementById("answer-result");
var highscoreName = document.getElementById("initials")

//Quiz Questions//
var quizQuestions = [{
    question: "What does HTML stand for?",
    choiceA: "Hyperlinks and Text Markup Language",
    choiceB: "Home Tool Markup Language",
    choiceC: "Hyper Text Markup Language",
    choiceD: "Hard Tools Mean Less",
    correctAnswer: "c"},
{
    question: "What is the correct HTML element for the largest heading?",
    choiceA: 'head',
    choiceB: "header",
    choiceC: "h6",
    choiceD: "h1",
    correctAnswer: "d"},
{
    question: "What does CSS stand for?",
    choiceA: "Computer Style Sheets",
    choiceB: "Creative Style Sheets",
    choiceC: "Cascading Style Sheets",
    choiceD: "Colorful Style Sheets",
    correctAnswer: "c"},
{
    question: "How is document type initialized in HTML5.?",
    choiceA: "/DOCTYPE HTML",
    choiceB: "/DOCTYPE",
    choiceC: "!DOCTYPE HTML",
    choiceD: "/DOCTYPE html",
    correctAnswer: "c"},
{
    question: "Which of the following HTML Elements is used for making any text bold ?",
    choiceA: "b",
    choiceB: "p",
    choiceC: "i",
    choiceD: "li",
    correctAnswer: "a"},
{
    question: "Which of the following characters indicate closing of a tag?",
    choiceA: ".",
    choiceB: "/",
    choiceC: "//",
    choiceD: "!",
    correctAnswer: "b"},
{
    question: "How many attributes are there in HTML5?",
    choiceA: "1",
    choiceB: "2",
    choiceC: "3",
    choiceD: "4",
    correctAnswer: "b"},
{
    question: "Which of the following attributes is used to add a link to any element?",
    choiceA: "link",
    choiceB: "ref",
    choiceC: "href",
    choiceD: "newref",
    correctAnswer: "c"},
{
    question: "Whats the purpose of using div tags in HTML?",
    choiceA: "create different styles",
    choiceB: "create different sections",
    choiceC: "add headings",
    choiceD: "add titles",
    correctAnswer: "b"},
{
    question: "Which of the following elements can be used in HTML to create a table?",
    choiceA: "table, tbody, trow",
    choiceB: "table, tb, trow",
    choiceC: "table, tbody, tr",
    choiceD: "All of the above",
    correctAnswer: "d"},
];

var lastQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var totalTime = 75;
var timerInterval; 
var correct;
var score = 0;
//Sets up the questions and answers//

function generateQuizQuestion(){
    endQuizDiv.style.display = "none";
    if (currentQuestionIndex === lastQuestionIndex){
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
 };

//Starting the quiz//

function startQuiz(){
    endQuizDiv.style.display = "none";
    beginningQuiz.style.display = "none";
    actualQuiz.style.display ="block";
    generateQuizQuestion();
    
//Starting the timer//

timerInterval = setInterval(function() {
    totalTime--;
    actualTimer.textContent = "Time Left:" + totalTime;

    if(totalTime === 0) {
        clearInterval(timerInterval);
        showScore();
    }
}, 1000);
}

//Showing the end score//

function showScore(){
    actualQuiz.style.display = "none"
    endQuizDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreName.value = "";
    endScore.innerHTML = "Your final score is " + score;
}

submitScoreButton.addEventListener("click", function highScore(){

    if(highscoreName.value === " ") {
        alert("Cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreName.value.toUpperCase();
        var currentHighScore = {
            name : currentUser,
            score : score
    };

    endQuizDiv.style.display = "none";
    overallHighscore.style.display = "flex";
    totalPage.style.display = "block";
    finalButtons.style.display = "flex";

    savedHighscores.push(currentHighScore);
    savedHighscores.sort(function(a,b){
        return b.score-a.score
    })
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    showHighscores();

}

});

//Makes the high scores//

function showHighscores(){
    highScoreInitials.innerHTML = " ";
    highScoresScore.innerHTML = " ";
    var allScores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<allScores.length; i++) {
        var currentPlayer = document.createElement("li");
        var currentScore = document.createElement("li");
        currentPlayer.textContent = allScores[i].name;
        currentScore.textContent = allScores[i].score;
        highScoreInitials.appendChild(currentPlayer);
        highScoresScore.appendChild(currentScore);
    }
}

function viewScore(){
    beginningQuiz.style.display = "none"
    endQuizDiv.style.display = "none";
    overallHighscore.style.display = "flex";
    totalPage.style.display = "block";
    finalButtons.style.display = "flex";
    showHighscores();
}

//Clearing the table//

function clearTable(){
    window.localStorage.clear();
    highScoreInitials.textContent = " ";
    highScoresScore.textContent = " ";
}

//Checking answers//

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    answerResult.style.display = "block";
    var result = document.createElement("result");
    answerResult.appendChild(result);
    setTimeout(function () {
        result.style.display = "none";
    }, 1000);

    if (answer === correct && currentQuestionIndex !== lastQuestionIndex){
        score++;
        result.textContent = "You are Correct!";
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== lastQuestionIndex){
        result.textContent = "Wrong!";
        currentQuestionIndex++;
        totalTime = totalTime - 5;
        generateQuizQuestion();
    }else{
        showScore();
    }
}
function replayQuiz() {
    overallHighscore.style.display = "none";
    endQuizDiv.style.display = "none";
    beginningQuiz.style.display = "flex"
    score = 0;
    currentQuestionIndex = 0;
    totalTime = 75;
}

startQuizButton.addEventListener("click",startQuiz);