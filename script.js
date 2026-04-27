const LESSONS = [
    {
        title: "Saying Hello",
        questions: [
            { question: "How do you say 'Hello' in Spanish?",         options: ['Hola','Adiós','Gracias','Por favor'], correct: 0 },
            { question: "Which one means 'Hi' (informal greeting)?",  options: ['Adiós','Hola','Buenas noches','Gracias'], correct: 1 },
            { question: "Translate: 'Hola, amigo'",                   options: ['Goodbye, friend','Hello, friend','Thank you, friend','See you, friend'], correct: 1 }
        ]
    },
    {
        title: "Good Morning",
        questions: [
            { question: "What does 'Buenos días' mean?",              options: ['Good night','Good afternoon','Good morning','Goodbye'], correct: 2 },
            { question: "How do you say 'Good morning' in Spanish?",  options: ['Buenos días','Buenas tardes','Buenas noches','Hasta luego'], correct: 0 },
            { question: "When do you use 'Buenos días'?",             options: ['At night','In the afternoon','In the morning','Anytime'], correct: 2 }
        ]
    },
    {
        title: "Good Afternoon",
        questions: [
            { question: "How do you say 'Good afternoon' in Spanish?", options: ['Buenas noches','Buenos días','Buenas tardes','Hola'], correct: 2 },
            { question: "What does 'Buenas tardes' mean?",             options: ['Good morning','Good afternoon','Good night','Hello'], correct: 1 },
            { question: "When would you say 'Buenas tardes'?",         options: ['Early morning','Midday to evening','Late night','Anytime'], correct: 1 }
        ]
    },
    {
        title: "Good Night",
        questions: [
            { question: "What does 'Buenas noches' mean?",            options: ['Good morning','Good night','Good afternoon','Hello'], correct: 1 },
            { question: "How do you say 'Good night' in Spanish?",    options: ['Buenos días','Buenas tardes','Buenas noches','Adiós'], correct: 2 },
            { question: "Which is correct at 10 PM?",                 options: ['Buenos días','Buenas tardes','Buenas noches','Hola día'], correct: 2 }
        ]
    },
    {
        title: "Nice to Meet You",
        questions: [
            { question: "How do you say 'Nice to meet you'?",         options: ['Adiós','De nada','Mucho gusto','Por favor'], correct: 2 },
            { question: "What does 'Encantado' mean?",                options: ['Goodbye','Thank you','Pleased to meet you',"You're welcome"], correct: 2 },
            { question: "How would you reply to 'Mucho gusto'?",      options: ['Adiós','Igualmente','Hola','Mal'], correct: 1 }
        ]
    },
    {
        title: "How Are You? (informal)",
        questions: [
            { question: "How do you ask 'How are you?' (informal)?",  options: ['¿Cómo está usted?','¿Qué tal?','¿Quién eres?','¿Dónde estás?'], correct: 1 },
            { question: "Which is informal: 'How are you?'",          options: ['¿Cómo está usted?','¿Cómo estás?','¿Cómo se llama?','¿De dónde es?'], correct: 1 },
            { question: "What does '¿Qué tal?' mean?",                options: ['What is it?',"What's up?",'What time?','Who are you?'], correct: 1 }
        ]
    },
    {
        title: "I'm Fine, Thanks",
        questions: [
            { question: "How do you say 'I'm fine, thank you'?",      options: ['Más o menos','Bien, gracias','Mal, gracias','Hola'], correct: 1 },
            { question: "What does 'Muy bien' mean?",                 options: ['Very bad','Very well','So-so','Goodbye'], correct: 1 },
            { question: "How do you say 'so-so' in Spanish?",         options: ['Muy bien','Mal','Más o menos','Bien'], correct: 2 }
        ]
    },
    {
        title: "Pleased to Meet You",
        questions: [
            { question: "What does 'Encantado' mean?",                options: ['Goodbye','Thank you','Pleased to meet you',"You're welcome"], correct: 2 },
            { question: "A woman would say _____ for 'pleased to meet you'.", options: ['Encantado','Encantada','Encantar','Encantos'], correct: 1 },
            { question: "Which means 'It's a pleasure to meet you'?", options: ['Hasta luego','Es un placer conocerte','Buenos días','Adiós'], correct: 1 }
        ]
    },
    {
        title: "Saying Goodbye",
        questions: [
            { question: "How do you say 'See you later' in Spanish?", options: ['Hola','Mucho gusto','Hasta luego','Buenos días'], correct: 2 },
            { question: "What does 'Adiós' mean?",                    options: ['Hello','Goodbye','Thank you','Please'], correct: 1 },
            { question: "Which means 'See you tomorrow'?",            options: ['Hasta mañana','Hasta luego','Hasta pronto','Adiós'], correct: 0 }
        ]
    },
    {
        title: "Formal Greetings",
        questions: [
            { question: "Formal way to say 'How are you?'",           options: ['¿Qué tal?','¿Cómo te llamas?','¿Cómo está usted?','¿Bien?'], correct: 2 },
            { question: "How do you ask someone's name (formal)?",    options: ['¿Cómo te llamas?','¿Cómo se llama usted?','¿Quién eres?','¿De dónde?'], correct: 1 },
            { question: "Choose the formal greeting:",                options: ['¡Hola!','¿Qué tal?','Buenos días, señor','¿Qué onda?'], correct: 2 }
        ]
    }
];

// Snake position for each lesson (0-9): which side the button sits on
const SNAKE_POSITIONS = [
    'pos-center',
    'pos-right',
    'pos-far-right',
    'pos-right',
    'pos-center',
    'pos-left',
    'pos-far-left',
    'pos-left',
    'pos-center',
    'pos-right'
];

let completedCount = 0;
let nextButtonIndex = 0;
let activeLessonIndex = null;
let activeQuestionIndex = 0;
let selectedAnswer = null;

function buildButtons() {
    const path = document.getElementById('snakePath');
    path.innerHTML = '';

    for (let i = 0; i < LESSONS.length; i++) {
        const row = document.createElement('div');
        row.className = `snake-row ${SNAKE_POSITIONS[i]}`;

        const btn = document.createElement('button');
        btn.className = `lesson-btn c${i}`;
        btn.textContent = i + 1;
        btn.dataset.index = i;
        btn.title = LESSONS[i].title;
        btn.addEventListener('click', () => onButtonClick(i));

        row.appendChild(btn);
        path.appendChild(row);
    }
}

function onButtonClick(i) {
    const btn = document.querySelector(`[data-index="${i}"]`);
    if (btn.classList.contains('completed')) return;

    if (i !== nextButtonIndex) {
        alert(`Click button ${nextButtonIndex + 1} next!`);
        return;
    }

    activeLessonIndex = i;
    activeQuestionIndex = 0;
    selectedAnswer = null;
    showCurrentQuestion();
}

function showCurrentQuestion() {
    const lesson = LESSONS[activeLessonIndex];
    const q = lesson.questions[activeQuestionIndex];

    document.getElementById('questionTitle').textContent =
        `${lesson.title} (${activeQuestionIndex + 1}/${lesson.questions.length})`;
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

    selectedAnswer = null;
    const modal = document.getElementById('questionModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
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

    const lesson = LESSONS[activeLessonIndex];
    const q = lesson.questions[activeQuestionIndex];
    const isCorrect = selectedAnswer === q.correct;
    const options = document.querySelectorAll('.answer-option');
    const feedback = document.getElementById('feedback');

    if (isCorrect) {
        options[selectedAnswer].classList.add('correct');
        feedback.textContent = '¡Correcto! 🎉';
        feedback.className = 'feedback show correct';

        setTimeout(() => {
            activeQuestionIndex++;
            if (activeQuestionIndex < lesson.questions.length) {
                showCurrentQuestion();
            } else {
                showSessionComplete();
            }
        }, 1100);
    } else {
        options[selectedAnswer].classList.add('incorrect');
        options[q.correct].classList.add('correct');
        feedback.textContent = '✗ Not quite. Moving on...';
        feedback.className = 'feedback show incorrect';

        setTimeout(() => {
            activeQuestionIndex++;
            if (activeQuestionIndex < lesson.questions.length) {
                showCurrentQuestion();
            } else {
                showSessionComplete();
            }
        }, 1800);
    }
}

function showSessionComplete() {
    const lesson = LESSONS[activeLessonIndex];

    document.getElementById('questionTitle').textContent = '🎉 Session Complete!';

    document.getElementById('questionText').innerHTML = `
        <div class="completion-screen">
            <div class="trophy">🏆</div>
            <h3 class="completion-title">${lesson.title}</h3>
            <p class="completion-subtitle">¡Muy bien! You finished the lesson.</p>
        </div>
    `;

    // Clear answers and feedback
    document.getElementById('answersContainer').innerHTML = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';

    // Swap Submit button for Finish Session button
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Finish Session';
    submitBtn.onclick = finishLesson;
    submitBtn.classList.add('finish-btn');
}

function finishLesson() {
    // Reset submit button back to its default behaviour
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Submit Answer';
    submitBtn.onclick = checkAnswer;
    submitBtn.classList.remove('finish-btn');

    const btn = document.querySelector(`[data-index="${activeLessonIndex}"]`);
    btn.classList.add('completed');
    completedCount++;
    nextButtonIndex++;
    updateProgress();

    closeQuestion();

    if (completedCount === LESSONS.length) {
        setTimeout(() => alert('🏆 Unit Complete! ¡Muy bien!'), 300);
    }
}

function closeQuestion() {
    const modal = document.getElementById('questionModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    activeLessonIndex = null;
    activeQuestionIndex = 0;
    selectedAnswer = null;
}

function updateProgress() {
    const pct = (completedCount / LESSONS.length) * 100;
    document.getElementById('progressFill').style.width = `${pct}%`;
    document.getElementById('progress').textContent = `Progress: ${completedCount}/${LESSONS.length}`;
}

function resetGame() {
    completedCount = 0;
    nextButtonIndex = 0;
    activeLessonIndex = null;
    activeQuestionIndex = 0;
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
