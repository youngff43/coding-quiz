//Global Variables//

var questions = document.getElementById("questions");
var lastQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");
var endQuizDiv = document.getElementById("end-quiz");
var startPageDiv = document.getElementById("front-page");
var timerInterval; 
var actualTimer = document.getElementById("timer");
var totalTime = 60;
var actualQuiz = document.getElementById("quiz");
var highScoreInitials = document.getElementById("highscore-initials")
var endScore = document.getElementById("score");
var startQuizButton = document.getElementById("start-button");
var submitScoreButton = document.getElementById("submit-score");
var correct;
var score = 0;
var overallHighscore = document.getElementById("overall-highscore");
var totalPage = document.getElementById("total-page");
var finalButtons = document.getElementById("final-buttons");

//Quiz Questions//
var quizQuestions = [{
    question: "What does HTML stand for?",
    choiceA: "Hyperlinks and Text Markup Language",
    choiceB: "Home Tool Markup Language",
    choiceC: "Hyper Text Markup Language",
    choiceD: "Hard Tools Mean Less",
    corrrectAnswer: "C"},
{
    question: "What is the correct HTML element for the largest heading?",
    choiceA: "<head>",
    choiceB: "<header>",
    choiceC: "<h6>",
    choiceD: "<h1>",
    corrrectAnswer: "D"},
{
    question: "What does CSS stand for?",
    choiceA: "Computer Style Sheets",
    choiceB: "Creative Style Sheets",
    choiceC: "Cascading Style Sheets",
    choiceD: "Colorful Style Sheets",
    corrrectAnswer: "C"},
{
    question: "How is document type initialized in HTML5.?",
    choiceA: "</DOCTYPE HTML>",
    choiceB: "</DOCTYPE>",
    choiceC: "<!DOCTYPE HTML>",
    choiceD: "</DOCTYPE html>",
    corrrectAnswer: "C"},
{
    question: "Which of the following HTML Elements is used for making any text bold ?",
    choiceA: "<b>",
    choiceB: "<p>",
    choiceC: "<i>",
    choiceD: "<li>",
    corrrectAnswer: "A"},
{
    question: "Which of the following characters indicate closing of a tag?",
    choiceA: ".",
    choiceB: "/",
    choiceC: "//",
    choiceD: "!",
    corrrectAnswer: "B"},
{
    question: "How many attributes are there in HTML5?",
    choiceA: "1",
    choiceB: "2",
    choiceC: "3",
    choiceD: "4",
    corrrectAnswer: "B"},
{
    question: "Which of the following attributes is used to add a link to any element?",
    choiceA: "link",
    choiceB: "ref",
    choiceC: "href",
    choiceD: "<newref",
    corrrectAnswer: "C"},
{
    question: "Whats the purpose of using div tags in HTML?",
    choiceA: "for creating different styles",
    choiceB: "for creating different sections",
    choiceC: "for adding headings",
    choiceD: "for adding titles",
    corrrectAnswer: "B"},
{
    question: "Which of the following elements can be used in HTML to create a table?",
    choiceA: "<table> , <tbody> , <trow>",
    choiceB: "<table> , <tb> , <trow>",
    choiceC: "<table> , <tbody> , <tr>",
    choiceD: "All of the above",
    corrrectAnswer: "D"},
];

//Sets up the questions and answers//

 function generateQuizQuestion(){
    endQuizDiv.style.display = "none";
    if (currentQuestionIndex === lastQuestionIndex) {
        return endScore();
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
    startPageDiv.style.display = "none";
    generateQuizQuestion();
    
//Starting the timer//

timerInterval = startInterval(function() {
    totalTime--;
    actualTimer.textContent = "Time Left:" + totalTime;

    if(timeLeft === 0) {
        clearInterval(timerInterval);
        endScore();
    }
}, 1000);
actualQuiz.style.display ="block";
}

//Showing the end score//

function endScore(){
    actualQuiz.style.display = "none"
    endQuizDiv.style.display = "flex";
    clearInterval(timerInterval);
    highScoreInitials.value = "";
    endScore.innerHTML = "Your final score is " + score;
}

submitScoreButton.addEventListener("click", function highScore(){

    if(highScoreInitials.value === "") {
        alert("Cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highScoreInitials.value.trim();
        var highScore = {
            name : currentUser,
            score : score
    };

    endQuizDiv.style.display = "none";
    overallHighscore.style.display = "flex";
    totalPage.style.display = "block";
    finalButtons.style.display = "flex";

    savedHighscores.push(highScore);
    localStorage.setItem("savedHighScores", JSON.stringify(savedHighscores));
    showHighscores();

}

});


startQuizButton.addEventListener("click",startQuiz);