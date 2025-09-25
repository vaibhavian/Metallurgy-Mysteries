document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');
    
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const feedbackText = document.getElementById('feedback');
    const scoreText = document.getElementById('score-text');

    let currentQuestionIndex, score;

    // --- Quiz Questions ---
    // Feel free to add more questions here!
    const questions = [
        {
            question: "The Bronze Age is named after an alloy of which two metals?",
            answers: [
                { text: "Copper and Tin", correct: true },
                { text: "Iron and Carbon", correct: false },
                { text: "Lead and Zinc", correct: false },
                { text: "Gold and Silver", correct: false }
            ]
        },
        {
            question: "Which metal, once more valuable than gold, makes up 8% of the Earth's crust?",
            answers: [
                { text: "Titanium", correct: false },
                { text: "Platinum", correct: false },
                { text: "Aluminum", correct: true },
                { text: "Silicon", correct: false }
            ]
        },
        {
            question: "What is the name for the process of extracting metals from ore by heating?",
            answers: [
                { text: "Quenching", correct: false },
                { text: "Smelting", correct: true },
                { text: "Forging", correct: false },
                { text: "Annealing", correct: false }
            ]
        },
        {
            question: "Which metal has the highest melting point, making it ideal for light bulb filaments?",
            answers: [
                { text: "Tungsten", correct: true },
                { text: "Osmium", correct: false },
                { text: "Steel", correct: false },
                { text: "Mercury", correct: false }
            ]
        },
        {
            question: "Adding about 0.8% of what element to iron transforms it into strong steel?",
            answers: [
                { text: "Nickel", correct: false },
                { text: "Manganese", correct: false },
                { text: "Chromium", correct: false },
                { text: "Carbon", correct: true }
            ]
        }
    ];

    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        startScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');
        showNextQuestion();
    }

    function showNextQuestion() {
        resetState();
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            questionText.innerText = question.question;
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn-forge');
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener('click', selectAnswer);
                answerButtons.appendChild(button);
            });
        } else {
            showResults();
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';

        if (correct) {
            score++;
            feedbackText.innerText = "Correct! A master's insight!";
            feedbackText.style.color = '#5cb85c';
        } else {
            feedbackText.innerText = "Incorrect. The metal resists...";
            feedbackText.style.color = '#d9534f';
        }

        // Show feedback for all buttons
        Array.from(answerButtons.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
            button.disabled = true; // Disable buttons after answering
        });
        
        // Wait a moment, then go to the next question
        setTimeout(() => {
            currentQuestionIndex++;
            showNextQuestion();
        }, 2000);
    }

    function setStatusClass(element, correct) {
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function resetState() {
        feedbackText.innerText = '';
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }
    
    function showResults() {
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        scoreText.innerText = `You correctly answered ${score} out of ${questions.length} mysteries.`;
    }
});
