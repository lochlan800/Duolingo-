const QUESTIONS = [
    {
        question: "How do you say 'Hello' in Spanish?",
        options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
        correct: 0
    },
    {
        question: "What does 'Buenos días' mean?",
        options: ['Good night', 'Good afternoon', 'Good morning', 'Goodbye'],
        correct: 2
    },
    {
        question: "How do you say 'Good afternoon' in Spanish?",
        options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hola'],
        correct: 2
    },
    {
        question: "What does 'Buenas noches' mean?",
        options: ['Good morning', 'Good night', 'Good afternoon', 'Hello'],
        correct: 1
    },
    {
        question: "How do you say 'Nice to meet you' in Spanish?",
        options: ['Adiós', 'De nada', 'Mucho gusto', 'Por favor'],
        correct: 2
    },
    {
        question: "How do you ask 'How are you?' (informal)?",
        options: ['¿Cómo está usted?', '¿Qué tal?', '¿Quién eres?', '¿Dónde estás?'],
        correct: 1
    },
    {
        question: "How do you say 'I'm fine, thank you'?",
        options: ['Más o menos', 'Bien, gracias', 'Mal, gracias', 'Hola'],
        correct: 1
    },
    {
        question: "What does 'Encantado' mean?",
        options: ['Goodbye', 'Thank you', 'Pleased to meet you', "You're welcome"],
        correct: 2
    },
    {
        question: "How do you say 'See you later' in Spanish?",
        options: ['Hola', 'Mucho gusto', 'Hasta luego', 'Buenos días'],
        correct: 2
    },
    {
        question: "What is the formal way to say 'How are you?'",
        options: ['¿Qué tal?', '¿Cómo te llamas?', '¿Cómo está usted?', '¿Bien?'],
        correct: 2
    }
];

let completedCount = 0;
let nextButtonIndex = 0;
let activeIndex = null;
let selectedAnswer = null;

function buildButtons() {
    const grid = document.getElementById('buttonsGrid');
    grid.innerHTML = '';

    for (let i = 0; i < QUESTIONS.length; i++) {
        const btn = document.createElement('button');
        btn.className = 'button-item';
        btn.textContent = i + 1;
        btn.dataset.index = i;
        btn.addEventListener('click', () => onButtonClick(i));
        grid.appendChild(btn);
    }
}

function onButtonClick(i) {
    const btn = document.querySelector(`[data-index="${i}"]`);

    if (btn.classList.contains('completed')) return;

    if (i !== nextButtonIndex) {
        alert(`Click button ${nextButtonIndex + 1} next!`);
        return;
    }

    activeIndex = i;
    selectedAnswer = null;
    showQuestion(QUESTIONS[i], i);
}

function showQuestion(q, i) {
    document.getElementById('questionTitle').textContent = `Question ${i + 1} / ${QUESTIONS.length}`;
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';

    const container = document.getElementById('answersContainer');
    container.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const div = document.createElement('div');
        div.className = 'answer-option';
        div.textContent = opt;
        div.onclick = () => selectAnswer(idx);
        container.appendChild(div);
    });

    document.getElementById('questionModal').classList.add('show');
}

function selectAnswer(idx) {
    selectedAnswer = idx;
    document.querySelectorAll('.answer-option').forEach((el, i) => {
        el.classList.toggle('selected', i === idx);
    });
}

function checkAnswer() {
    if (selectedAnswer === null) {
        alert('Please choose an answer!');
        return;
    }

    const q = QUESTIONS[activeIndex];
    const isCorrect = selectedAnswer === q.correct;
    const options = document.querySelectorAll('.answer-option');
    const feedback = document.getElementById('feedback');

    if (isCorrect) {
        options[selectedAnswer].classList.add('correct');
        feedback.textContent = '¡Correcto! 🎉';
        feedback.className = 'feedback show correct';

        setTimeout(() => {
            closeQuestion();
            const btn = document.querySelector(`[data-index="${activeIndex}"]`);
            btn.classList.add('completed');
            completedCount++;
            nextButtonIndex++;
            updateProgress();

            if (completedCount === QUESTIONS.length) {
                setTimeout(() => alert('🏆 Lesson Complete! ¡Muy bien!'), 200);
            }
        }, 1200);
    } else {
        options[selectedAnswer].classList.add('incorrect');
        options[q.correct].classList.add('correct');
        feedback.textContent = '✗ Not quite. The correct answer is highlighted.';
        feedback.className = 'feedback show incorrect';
    }
}

function closeQuestion() {
    document.getElementById('questionModal').classList.remove('show');
    activeIndex = null;
    selectedAnswer = null;
}

function updateProgress() {
    const pct = (completedCount / QUESTIONS.length) * 100;
    document.getElementById('progressFill').style.width = `${pct}%`;
    document.getElementById('progress').textContent = `Progress: ${completedCount}/${QUESTIONS.length}`;
}

function resetGame() {
    completedCount = 0;
    nextButtonIndex = 0;
    activeIndex = null;
    selectedAnswer = null;
    closeQuestion();
    buildButtons();
    updateProgress();
}

document.getElementById('questionModal').addEventListener('click', e => {
    if (e.target.id === 'questionModal') closeQuestion();
});

buildButtons();
updateProgress();
