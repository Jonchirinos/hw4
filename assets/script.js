// Global Variables

// link to logic
const highContainer = document.getElementById("high-container");
// link to logic start button
const startBtn = document.getElementById("start");
// link to logic reset button
const resetBtn = document.getElementById("reset");
// link to logic to questions
const questionDiv = document.getElementById("question");
// link to logic correct answers
const answersDiv = document.getElementById("answers");
// link to logic to proper timer functionality
const timerElement = document.getElementById("timer");
// link to high ID tag
const scoreDiv = document.getElementById("high");
// contains array of questions and answers
const questions = [
    {
        title: "What is David Blaine's first name?",
        answers: ["David", "Chris", "Joe Exotic"],
        correct: "David",
    },
    {
        title: "Where Was David Blaine Born?",
        answers: ["New Jersey", "New York", "California"],
        correct: "New York",
    },
    {
        title: "What is color is David Blaine's Hair?",
        answers: ["Purple", "Black", "Brown"],
        correct: "Brown",
    },
    {
        title: "How old is David Blaine?",
        answers: ["38", "48", "44"],
        correct: "48",
    },
    {
        title: "What is David Blaine Actual Last Name?",
        answers: ["Perez", "White", "Blaine"],
        correct: "White",
    },
    {
        title: "Is David Blaine the Greatest Magician Alive?",
        answers: ["Yes", "No"],
        correct: "Yes",
    },
];
// score variable which changed based on users answer
let score = 0;
// Question index being pulled from
let questionIndex = 0;
//amount of time user has to answer questions
let timerCount = 25;
let isWin = false;
let initials = "";

// Functions
// start game function
function startGame() {
    // hides start button after clicking
    onClick = startBtn.style.visibility = "hidden";
    // clear out previous questions
    answersDiv.textContent = "";
    // Show first question with answers
    questionDiv.innerHTML = questions[questionIndex].title;
    // Loop through answers
    questions[questionIndex].answers.forEach((answer) => {
        // Create element button, add attributes value and text, add click event, and append button to the answers div
        const answerBtn = document.createElement("button");
        // pulls answers from question array and populate buttons with text
        answerBtn.textContent = answer;
        // add the attributes value and text to the correct answer
        answerBtn.setAttribute("value", answer);
        // add click event
        answerBtn.onclick = answerClick;
        // append button to the answers div
        answersDiv.appendChild(answerBtn);
    });
}

// Answer click function
function answerClick() {
    // Determine the answer the user chose
    let chosenAnswer = this.value;
    // verify to see if answer is correct
    if (chosenAnswer === questions[questionIndex].correct) {
        // let user know they got the right answer
        alert("Magic!");
        // add time to timer
        timerCount = timerCount + 2;
        // add 2 points to user score
        score = score + 2;
        // move to next question or end game
        questionIndex++;
        // if question array is greater than 0, then the game starts
        if (questions.length > questionIndex) {
            startGame();
        } else {
            // if the question array reaches 0, end game
            endGame();
        }
    } else {
        // let user know they were wrong
        alert("INCORRECT");
        //subtract time from timer
        timerCount = timerCount - 2;
        // subtract 2 points from score
        score = score - 2;
    }
}

// end game function
function endGame() {
    isWin = true;
}

// The startTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    startGame();
    timer = setInterval(function () {
        // timer pulls a number
        timerCount--;
        // timer is displayed in html
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (isWin && timerCount > 0) {
                let highScore = JSON.parse(localStorage.getItem("windowStorage")) || [];
                alert("You Win!");
                // alerts user of victory followed by prompt asking for initials to append to highscore table
                let initials = prompt(`Your Score Is ${score}! Enter Your initials Here`);
                console.log(score);
                // assigns initials and score to userScore
                let userScore = {
                    initials: initials,
                    score: score,
                };
                // pushes the userScore into the highScore array to be displayed
                highScore.push(userScore);
                // local storage for saving scores
                localStorage.setItem("windowStorage", JSON.stringify(highScore));
                // runs checkHighscore function to see where it should properly append
                checkHighScore();
                // clears timer
                clearInterval(timer);
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            // loseGame();
            alert("You lost!");
            endGame();
        }
    }, 1000);
}
// check high score function
function checkHighScore() {
    let userScore = JSON.parse(localStorage.getItem("windowStorage")) || [];
    console.log(userScore);
    // compares with previous locally stored scores
    userScore.sort(compare);
    // turns initials and and score into a string
    scoreDiv.innerHTML = "";
    // if user gets 0 points than they do not get a high score
    if (userScore.length === 0) {
        // display message saying no new high score
        scoreDiv.innerHTML = "No new High Score";
    } else {
        // appends final score to the li in the index html
        userScore.forEach((user) => {
            scoreDiv.innerHTML += `<li>${user.initials} had a high score of ${user.score}!</li>`;
        });
    }
}

// function to compare previously stored scores and sort accordingly
function compare(a, b) {
    if (a.score > b.score) {
        return -1;
    }
    if (a.score < b.score) {
        return 1;
    }
    return 0;
}

// reset quiz function
function resetQuiz() {
    localStorage.clear();
    location.reload();
}
// run checkHighScore function
checkHighScore();

// Initialization- start
// event listener to start timer and game
startBtn.addEventListener("click", startTimer);
// event listener to reset quiz
resetBtn.addEventListener("click", resetQuiz);
