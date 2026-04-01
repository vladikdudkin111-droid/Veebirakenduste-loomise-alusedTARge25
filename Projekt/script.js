// 🔀 TABID
function showTab(tabId) {
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });
    document.getElementById(tabId).classList.add("active");
}

// =====================
// 🧠 VIKTORIIN
// =====================
const questions = [
    { question: "Eesti pealinn?", answers: ["Tallinn", "Tartu", "Narva"], correct: 0 },
    { question: "2 + 2?", answers: ["3", "4", "5"], correct: 1 },
    { question: "Lumi värv?", answers: ["Sinine", "Valge", "Roheline"], correct: 1 }
];

let currentQuestion = 0;
let score = 0;
let playerQuiz = "";

function handleInput() {
    console.log("Sisestamine...");
}

function startQuiz() {
    playerQuiz = document.getElementById("playerName").value;

    if (playerQuiz.length < 2) {
        alert("Nimi peab olema vähemalt 2 tähemärki!");
        return;
    }

    currentQuestion = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;
    document.getElementById("progress").textContent =
        `Küsimus ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("ans0").textContent = q.answers[0];
    document.getElementById("ans1").textContent = q.answers[1];
    document.getElementById("ans2").textContent = q.answers[2];
}

function checkAnswer(index) {
    if (index === questions[currentQuestion].correct) {
        score++;
        document.getElementById("quizResult").textContent = "✅ Õige!";
    } else {
        document.getElementById("quizResult").textContent = "❌ Vale!";
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        setTimeout(showQuestion, 800);
    } else {
        document.getElementById("quizResult").textContent =
            `🏁 Lõpp! Skoor: ${score}/${questions.length}`;
        saveQuizResult();
    }
}

function saveQuizResult() {
    let scores = JSON.parse(localStorage.getItem("quizScores")) || [];

    scores.push({ name: playerQuiz, score: score });

    localStorage.setItem("quizScores", JSON.stringify(scores));
    displayQuizScores();
}

function displayQuizScores() {
    const list = document.getElementById("quizScores");
    list.innerHTML = "";

    let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    scores.sort((a, b) => b.score - a.score);

    scores.forEach(s => {
        const li = document.createElement("li");
        li.textContent = `${s.name} — ${s.score}`;
        list.appendChild(li);
    });
}

function clearQuizScores() {
    localStorage.removeItem("quizScores");
    displayQuizScores();
}

// =====================
// 🎯 ARVA NUMBER
// =====================
let randomNumber;
let guessAttempts = 0;
let playerGuess = "";

function startGuess() {
    playerGuess = document.getElementById("playerGuessName").value;

    if (playerGuess.length < 2) {
        alert("Sisesta nimi!");
        return;
    }

    randomNumber = Math.floor(Math.random() * 5) + 1;
    guessAttempts = 0;

    document.getElementById("guessProgress").textContent =
        `${playerGuess}, alusta!`;

    document.getElementById("guessResult").textContent = "";
    document.getElementById("guessInput").value = "";
}

function checkGuess() {
    const guess = Number(document.getElementById("guessInput").value);

    if (guess < 1 || guess > 5) {
        alert("Sisesta number 1 kuni 5!");
        return;
    }

    guessAttempts++;

    let correct = false;

    if (guess === randomNumber) {
        correct = true;
        document.getElementById("guessResult").textContent =
            `🎉 Õige! Katsed: ${guessAttempts}`;
    } else {
        document.getElementById("guessResult").textContent = "❌ Vale!";
    }

    saveGuessResult(correct);
    randomNumber = Math.floor(Math.random() * 5) + 1;
}

function saveGuessResult(correct) {
    let scores = JSON.parse(localStorage.getItem("guessScores")) || [];

    scores.push({
        name: playerGuess,
        result: correct
    });

    localStorage.setItem("guessScores", JSON.stringify(scores));
    displayGuessScores();
}

function displayGuessScores() {
    const list = document.getElementById("guessScores");
    list.innerHTML = "";

    let scores = JSON.parse(localStorage.getItem("guessScores")) || [];

    scores.forEach(s => {
        const li = document.createElement("li");
        li.textContent = `${s.name} — ${s.result ? "✔" : "✖"}`;
        list.appendChild(li);
    });
}

function clearGuessScores() {
    localStorage.removeItem("guessScores");
    displayGuessScores();
}

// ▶ LOAD
window.addEventListener("load", () => {
    displayQuizScores();
    displayGuessScores();
    showTab("home");
});