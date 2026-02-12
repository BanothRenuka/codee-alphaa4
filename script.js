const words = [
    { word: "Hello", translation: "Hola", grammar: "Greeting" },
    { word: "Thank you", translation: "Gracias", grammar: "Phrase" },
    { word: "Good Morning", translation: "Buenos días", grammar: "Greeting" },
    { word: "Eat", translation: "Comer", grammar: "Verb" }
];

let lessonIndex = 0;
let cardIndex = 0;
let quizIndex = 0;
let score = localStorage.getItem("score") || 0;

// Show Sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Daily Lesson
function nextLesson() {
    lessonIndex = (lessonIndex + 1) % words.length;
    displayLesson();
}

function displayLesson() {
    const word = words[lessonIndex];
    document.getElementById("dailyWord").innerHTML =
        `<strong>${word.word}</strong> - ${word.translation} (${word.grammar})`;
}

displayLesson();

// Flashcards
function flipCard() {
    document.getElementById("cardFront").classList.toggle("hidden");
    document.getElementById("cardBack").classList.toggle("hidden");
}

function nextCard() {
    cardIndex = (cardIndex + 1) % words.length;
    displayCard();
}

function displayCard() {
    document.getElementById("cardFront").innerText = words[cardIndex].word;
    document.getElementById("cardBack").innerText = words[cardIndex].translation;
    document.getElementById("cardFront").classList.remove("hidden");
    document.getElementById("cardBack").classList.add("hidden");
}

displayCard();

// Quiz
function displayQuestion() {
    document.getElementById("question").innerText =
        `Translate: ${words[quizIndex].word}`;
    document.getElementById("score").innerText = "Score: " + score;
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = words[quizIndex].translation;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById("result").innerText = "Correct!";
        score++;
    } else {
        document.getElementById("result").innerText =
            "Wrong! Correct answer: " + correctAnswer;
    }

    localStorage.setItem("score", score);
    quizIndex = (quizIndex + 1) % words.length;
    document.getElementById("answer").value = "";
    displayQuestion();
}

displayQuestion();
