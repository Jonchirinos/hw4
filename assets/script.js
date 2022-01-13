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
        title: "What is God's last name?",
        answers: ["Smith", "Angel", "Blaine"],
        correct: "Smith",
    },
];
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
    }
}
// End quiz
function endGame() {
    isWin = true;
    alert("Game Over, you suck");
}

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
                alert(timerCount);

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
// Save high score
// Initialization- start
startBtn.addEventListener("click", startTimer);
