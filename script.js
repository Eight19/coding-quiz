//Screens that will be displayed during the quiz//
var quizContainer = document.querySelector("#quizContainer");
var buttonContainer = document.querySelector("#buttonContainer");
var startScreen = document.querySelector("#startScreen");
var quizScreen = document.querySelector("#quizScreen");
var endScreen = document.querySelector("#endScreen");
var topScoreScreen = document.querySelector("#topScoreScreen");
var scoreLabel = document.querySelector("#scoreLabel");
var initialsInput = document.querySelector("#initials");
var enterScore = document.querySelector("#enterScore");
var retakeQuiz = document.querySelector("#retakeQuiz");
var timeEl = document.querySelector("#time");

var index = 0;
//Clock Set-Up//
var secondsLeft = 100;
var timerInterval;

//Added Questions//
//Added  answers to choose from and correct answers for each question//
var questions = [

    {text: "Commonly used data types do not include ____",
    choices: ["Strings","Booleans","Alerts","Numbers"],
    correctAnswer: 1    
},
    {text: "The condition of an if/else statement is enclosed within ____",
    choices: ["Curly Brackets","Parenthesis","Square Brackets","Quotes"],
    correctAnswer: 0
},

    {text: "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["Parenthesis", "Curly Brackets", "Quotes", "Commas"],
    correctAnswer: 3        
},

    {text: "A very useful tool used during development and debugging for printing content to the debugger is",
    choices: ["For loops", "Terminal/bash", "Console.log", "Javascript"],
    correctAnswer: 3       
},

    {text: "Arrays in Javascript can be used to store booleans.",
    choices: ["True", "False", "Sometimes true", "Sometimes false"],
    correctAnswer: 0
   },
];
//Quiz clock will start//
var startClock = function() {
    console.log("Clock Started");
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
    }, 1000);
};

var displayQuestion = function() {
    var currentQuestion = questions[index];

    quizScreen.querySelector("h2").textContent = currentQuestion.text;
    buttonContainer.innerHTML = null; 
    
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var buttonEl = document.createElement("button");
        buttonEl.textContent = currentQuestion.choices[i];
        buttonEl.dataset.id = i;
        buttonContainer.appendChild(buttonEl);
    }

    console.log("Question Displayed");
};
//Created function to stop clock once quiz ends//
var displayEndScreen = function() {
    console.log("Display End Screen");
    var topScores = {
        score: secondsLeft,
        initials: initialsInput.value.trim(),
    }//Save Top Scores to Local Storage//
    var topScoresList = JSON.parse(localStorage.getItem("topScores")) || [];
    topScoresList.push(topScores);
    localStorage.setItem("topScores", JSON.stringify(topScoresList));

    for (var i = 0; i < topScoresList.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = topScoresList[i].initials + ": " + topScoresList
        [i].score;
        topScoreScreen.querySelector("ul").appendChild(listItem);
    }



    hideAllScreens();
    endScreen.style.display = "block";
    scoreLabel.textContent = secondsLeft;
    clearInterval(timerInterval);
};
//Progresses quiz forward from page-to-page//
var nextPage = function(element) {
    var correct = element.dataset.id === questions[index].correct;
    
    if (index >= questions.length - 1) { 
        displayEndScreen();
        return;
    }
    
    if (correct) {
        console.log("Correct")
    } else {
        console.log("Incorrect");
        console.log("Deduct Time");
    }

    index++;
    displayQuestion();
};

var hideAllScreens = function() {
    var sections = document.querySelectorAll("section");
    console.log(sections);
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display ="none";
    }
};
startBtn.addEventListener("click", function() {
    startClock();
    displayQuestion();
    hideAllScreens();    
    quizScreen.style.display = "block";
});

buttonContainer.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("button")) {
        nextPage(element);
    } 
});

enterScore.addEventListener("click", function() {
    console.log("SEND THE SCORE TO LOCAL STORAGE");
    hideAllScreens();
    topScoreScreen.style.display = "block";
});

retakeQuiz.addEventListener("click", function() {
    console.log("Display the Start Screen");
    //INDEX RESET
    //CLOCK RESET
    hideAllScreens();
    startScreen.style.display = "block";
});

hideAllScreens();
startScreen.style.display = "block";

timeEl.textContent = secondsLeft;
