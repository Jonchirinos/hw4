// Global Variables
const startBtn = document.getElementById("start");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const timerElement = document.getElementById("timer");
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
const scoreBtn = document.getElementById("initials");

let score = 0;
let questionIndex = 0;
let timerCount = 20;
let isWin = false;

// Functions
function startGame() {
    // clear out previous questions
    answersDiv.textContent = "";
    // Show first question with answers
    questionDiv.innerHTML = questions[questionIndex].title;
    // Loop through answers
    questions[questionIndex].answers.forEach((answer) => {
        // Create element button, add attributes value and text, add click event, and append button to the answers div
        const answerBtn = document.createElement("button");
        answerBtn.textContent = answer;
        answerBtn.setAttribute("value", answer);
        answerBtn.onclick = answerClick;
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
        alert("You Somehow Guessed The Right Answer");
        // add time to timer
        timerCount = timerCount + 2;

        score = score + 2;
        // move to next question or end game
        questionIndex++;
        if (questions.length > questionIndex) {
            startGame();
        } else {
            endGame();
        }
    } else {
        // let user know they were wrong
        alert("WRONG");
        // TODO subtract time from timer
        timerCount = timerCount - 2;

        score = score - 2;
    }
}

// End quiz

// set timer
function startTimer() {
    // The setTimer function starts and stops the timer and triggers winGame() and loseGame()
    // Sets timer
    startGame();
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (isWin && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                alert("You Win!");
                let initials = prompt(`Your Score Is ${score}! Enter Your initials Here`);
                localStorage.setItem("playerScore", score);
                localStorage.setItem("initials", initials);
                // winGame();
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            // loseGame();
            alert("You lost!");
        }
    }, 1000);
}
function endGame() {
    isWin = true;
}
// Save high score
function displayScores() {
    localStorage.getItem("playerScore");
    localStorage.getItem("initials");
}
// Initialization- start
startBtn.addEventListener("click", startTimer);
