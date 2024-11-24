const quizData = [
    {
        question: "Hitunglah integral berikut:",
        image: "QTT/QTT1/S1.png", // Gambar soal
        a: "<img src='QTT/QTT1/OA.png' alt='A1'>", // Gambar untuk jawaban a
        b: "<img src='QTT/QTT1/OB.png' alt='B1'>", // Gambar untuk jawaban b
        c: "<img src='QTT/QTT1/OC.png' alt='C1'>", // Gambar untuk jawaban c
        d: "<img src='QTT/QTT1/OD.png' alt='D1'>", // Gambar untuk jawaban d
        correct: "a",
        explanation: "<img src='QTT/QTT1/J1.png' alt='J1'>"
    },
    {
        question: "Hitunglah integral berikut:",
        image: "QTT/QTT2/S2.png", // Gambar soal
        a: "<img src='QTT/QTT2/OA.png' alt='A2'>", // Gambar untuk jawaban a
        b: "<img src='QTT/QTT2/OB.png' alt='B2'>", // Gambar untuk jawaban b
        c: "<img src='QTT/QTT2/OC.png' alt='C2'>", // Gambar untuk jawaban c
        d: "<img src='QTT/QTT2/OD.png' alt='D2'>", // Gambar untuk jawaban d
        correct: "a",
        explanation: "<img src='QTT/QTT2/J2.png' alt='J2'>"
    },
    {
        question: "Hitunglah integral berikut:",
        image: "QTT/QTT3/S3.png", // Gambar soal
        a: "<img src='QTT/QTT3/OA.png' alt='A3'>", // Gambar untuk jawaban a
        b: "<img src='QTT/QTT3/OB.png' alt='B3'>", // Gambar untuk jawaban b
        c: "<img src='QTT/QTT3/OC.png' alt='C3'>", // Gambar untuk jawaban c
        d: "<img src='QTT/QTT3/OD.png' alt='D3'>", // Gambar untuk jawaban d
        correct: "c",
        explanation: "<img src='QTT/QTT3/J3.png' alt='J3'>"
    },
    {
        question: "Hitunglah integral berikut:",
        image: "QTT/QTT4/S4.png", // Gambar soal
        a: "<img src='QTT/QTT4/OA.png' alt='A4'>", // Gambar untuk jawaban a
        b: "<img src='QTT/QTT4/OB.png' alt='B4'>", // Gambar untuk jawaban b
        c: "<img src='QTT/QTT4/OC.png' alt='C4'>", // Gambar untuk jawaban c
        d: "<img src='QTT/QTT4/OD.png' alt='D4'>", // Gambar untuk jawaban d
        correct: "b",
        explanation: "<img src='QTT/QTT4/J4.png' alt='J4'>"
    },
    {
        question: "Hitunglah integral berikut:",
        image: "QTT/QTT5/S5.png", // Gambar soal
        a: "<img src='QTT/QTT5/OA.png' alt='A5'>", // Gambar untuk jawaban a
        b: "<img src='QTT/QTT5/OB.png' alt='B5'>", // Gambar untuk jawaban b
        c: "<img src='QTT/QTT5/OC.png' alt='C5'>", // Gambar untuk jawaban c
        d: "<img src='QTT/QTT5/OD.png' alt='D5'>", // Gambar untuk jawaban d
        correct: "d",
        explanation: "<img src='QTT/QTT5/J5.png' alt='J5'>"
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
