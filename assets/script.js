// Global Variables

//
const restart = document.getElementById("restart");
const highContainer = document.getElementById("high-container");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const timerElement = document.getElementById("timer");
const scoreDiv = document.getElementById("high");
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

let score = 0;
let questionIndex = 0;
let timerCount = 20;
let isWin = false;
let initials = "";

// Functions
function startGame() {
    onClick = startBtn.style.visibility = "hidden";
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
        alert("Magic!");
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
        alert("INCORRECT");
        //subtract time from timer
        timerCount = timerCount - 2;

        score = score - 2;
    }
}

function endGame() {
    isWin = true;
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
                let highScore = JSON.parse(localStorage.getItem("windowStorage")) || [];
                alert("You Win!");
                let initials = prompt(`Your Score Is ${score}! Enter Your initials Here`);
                console.log(score);
                let userScore = {
                    initials: initials,
                    score: score,
                };
                highScore.push(userScore);

                localStorage.setItem("windowStorage", JSON.stringify(highScore));
                checkHighScore();
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
// Save high score
function checkHighScore() {
    let userScore = JSON.parse(localStorage.getItem("windowStorage")) || [];
    console.log(userScore);
    userScore.sort(compare);
    scoreDiv.innerHTML = "";
    if (userScore.length === 0) {
        scoreDiv.innerHTML = "No new High Score";
    } else {
        // highScore.sortOn(userScore);
        userScore.forEach((user) => {
            scoreDiv.innerHTML += `<li>${user.initials} had a high score of ${user.score}!</li>`;
            // checkHighScore();
        });
    }
}
function compare(a, b) {
    if (a.score > b.score) {
        return -1;
    }
    if (a.score < b.score) {
        return 1;
    }
    return 0;
}

function resetQuiz() {
    localStorage.clear();
    location.reload();
}
checkHighScore();

// Initialization- start
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetQuiz);
