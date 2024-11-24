const quizData = [
    {
        question: "Hitunglah:",
        image: "QT/QT1/S1.png", // Gambar soal
        a: "22", // Gambar untuk jawaban a
        b: "20", // Gambar untuk jawaban b
        c: "18", // Gambar untuk jawaban c
        d: "16", // Gambar untuk jawaban d
        correct: "d",
        explanation: "<img src='QT/QT1/J1.png' alt='J1'>"
    },
    {
        question: "Hitunglah:",
        image: "QT/QT2/S2.png", // Gambar soal
        a: "ln(2)", // Gambar untuk jawaban a
        b: "ln(5)-ln(2)", // Gambar untuk jawaban b
        c: "ln(5)", // Gambar untuk jawaban c
        d: "ln(10)-ln(2)", // Gambar untuk jawaban d
        correct: "b",
        explanation: "<img src='QT/QT2/J2.png' alt='J2'>"
    },
    {
        question: "Hitunglah:",
        image: "QT/QT3/S3.png", // Gambar soal
        a: "0", // Gambar untuk jawaban a
        b: "1", // Gambar untuk jawaban b
        c: "2", // Gambar untuk jawaban c
        d: "3", // Gambar untuk jawaban d
        correct: "b",
        explanation: "<img src='QT/QT3/J3.png' alt='J3'>"
    },
    {
        question: "Hitunglah:",
        image: "QT/QT4/S4.png", // Gambar soal
        a: "35/12", // Gambar untuk jawaban a
        b: "37/11", // Gambar untuk jawaban b
        c: "33/12", // Gambar untuk jawaban c
        d: "37/12", // Gambar untuk jawaban d
        correct: "d",
        explanation: "<img src='QT/QT4/J4.png' alt='J4'>"
    },
    {
        question: "Hitunglah:",
        image: "QT/QT5/S5.png", // Gambar soal
        a: "6", // Gambar untuk jawaban a
        b: "7", // Gambar untuk jawaban b
        c: "8", // Gambar untuk jawaban c
        d: "9", // Gambar untuk jawaban d
        correct: "c",
        explanation: "<img src='QT/QT5/J5.png' alt='J5'>"
    }
];

const quiz = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const result = document.getElementById('result');
const explanationBtn = document.getElementById('show-explanation');
const tryAgainBtn = document.getElementById('try-again');

let currentQuiz = 0;
let score = 0;

// Load quiz question
function loadQuiz() {
    const currentData = quizData[currentQuiz];
    quiz.innerHTML = `
        <br>
        <br>
        <h1> LATIHAN SOAL INTEGRAL TAK TENTU </h1>
        <h2>${currentData.question}</h2>
        ${currentData.image ? `<img src="${currentData.image}" alt="Question Image" style="width: 100%; height: auto; margin-bottom: 10px;">` : ""}
        <label>
            <input type="radio" name="answer" value="a">
            ${currentData.a}
        </label>
        <label>
            <input type="radio" name="answer" value="b">
            ${currentData.b}
        </label>
        <label>
            <input type="radio" name="answer" value="c">
            ${currentData.c}
        </label>
        <label>
            <input type="radio" name="answer" value="d">
            ${currentData.d}
        </label>
    `;
}

// Get selected answer
function getSelected() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let selected;
    answers.forEach(answer => {
        if (answer.checked) {
            selected = answer.value;
        }
    });
    return selected;
}

// Show feedback after each question
function showFeedback(isCorrect, correctAnswer) {
    const feedback = `
        <h3>${isCorrect ? "Benar!" : "Salah!"}</h3>
        <p>Jawaban yang benar: ${quizData[currentQuiz][correctAnswer]}</p>
    `;
    quiz.innerHTML += feedback;
}

// Initialize quiz
loadQuiz();

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        const isCorrect = answer === quizData[currentQuiz].correct;
        if (isCorrect) score++;
        showFeedback(isCorrect, quizData[currentQuiz].correct);

        // Disable submit button temporarily and show next button
        submitBtn.style.display = "none";
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Lanjut";
        nextBtn.onclick = () => {
            currentQuiz++;
            if (currentQuiz < quizData.length) {
                loadQuiz();
                nextBtn.remove();
                submitBtn.style.display = "inline-block";
            } else {
                showResults();
            }
        };
        quiz.appendChild(nextBtn);
    } else {
        alert("Silakan pilih jawaban terlebih dahulu!");
    }
});

// Show results
function showResults() {
    quiz.innerHTML = ""; // Clear quiz content
    result.innerHTML = `Jawaban benar: ${score}/${quizData.length}`;

    // Show explanation and try again buttons
    explanationBtn.style.display = "inline-block";
    tryAgainBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
}

// Show explanation
explanationBtn.addEventListener('click', () => {
    result.innerHTML += "<br><br><br><h3>Pembahasan:</h3>";
    quizData.forEach((data, index) => {
        result.innerHTML += `
            <div style="margin-bottom: 15px;">
                <strong>Pertanyaan ${index + 1}:</strong> ${data.question} <br>
                ${data.image ? `<img src="${data.image}" alt="Explanation Image" style="width: 50%; margin-top: 5px;">` : ""}
                <p><strong>Jawaban:</strong> <br>${data[data.correct]} <br>
                <strong>Pembahasan:</strong> <br>${data.explanation}</p>
            </div>
        `;
    });

    // Tambahkan tombol "Coba Lagi" di akhir pembahasan
    result.innerHTML += `
        <button id="retry-btn" style="
            margin-top: 20px;
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
        ">Coba Lagi</button>
    `;

    // Tambahkan event listener untuk tombol "Coba Lagi"
    const retryBtn = document.getElementById('retry-btn');
    retryBtn.addEventListener('click', () => {
        currentQuiz = 0;
        score = 0;
        result.innerHTML = "";
        explanationBtn.style.display = "none";
        tryAgainBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
        loadQuiz();
    });

    explanationBtn.style.display = "none"; // Hide explanation button after clicked
});


// Try again
tryAgainBtn.addEventListener('click', () => {
    currentQuiz = 0;
    score = 0;
    result.innerHTML = "";
    explanationBtn.style.display = "none";
    tryAgainBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
    loadQuiz();
});
