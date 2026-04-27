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
        question: "How do you say 'Good afternoon'?",
        options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hola'],
        correct: 2
    },
    {
        question: "What does 'Buenas noches' mean?",
        options: ['Good morning', 'Good night', 'Good afternoon', 'Hello'],
        correct: 1
    },
    {
        question: "How do you say 'Nice to meet you'?",
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
        options: ['Goodbye', 'Thank you', 'Pleased to meet you', 'You\'re welcome'],
        correct: 2
    },
    {
        question: "How do you say 'See you later'?",
        options: ['Hola', 'Mucho gusto', 'Hasta luego', 'Buenos días'],
        correct: 2
    },
    {
        question: "What is the formal way to say 'How are you?'",
        options: ['¿Qué tal?', '¿Cómo te llamas?', '¿Cómo está usted?', '¿Bien?'],
        correct: 2
    }
];

// Snake positions: each is left offset in px within a 320px container
const SNAKE_X = [126, 196, 226, 196, 126, 56, 26, 56, 126, 196];

let nextIndex = 0;
let completedCount = 0;
let selectedChoice = null;
let activeQuestion = null;

function buildSnake() {
    const path = document.getElementById('snakePath');
    path.innerHTML = '';
    path.style.height = `${QUESTIONS.length * 90}px`;

    QUESTIONS.forEach((q, i) => {
        const btn = document.createElement('button');
        btn.className = `lesson-btn color-${i}`;
        btn.id = `btn-${i}`;
        btn.style.left = `${SNAKE_X[i]}px`;
        btn.style.top = `${i * 90 + 10}px`;
        btn.style.position = 'absolute';
        btn.textContent = i + 1;

        if (i !== 0) btn.classList.add('locked');

        btn.addEventListener('click', () => onLessonClick(i));
        path.appendChild(btn);
    });
}

function onLessonClick(i) {
    if (i !== nextIndex) return;

    activeQuestion = i;
    selectedChoice = null;

    const q = QUESTIONS[i];
    document.getElementById('questionNum').textContent = `${i + 1} / ${QUESTIONS.length}`;
    document.getElementById('questionPrompt').textContent = q.question;
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';

    const choicesEl = document.getElementById('choices');
    choicesEl.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice';
        btn.textContent = opt;
        btn.onclick = () => selectChoice(idx);
        choicesEl.appendChild(btn);
    });

    document.getElementById('checkBtn').disabled = false;
    document.getElementById('modal').classList.add('open');
}

function selectChoice(idx) {
    selectedChoice = idx;
    document.querySelectorAll('.choice').forEach((el, i) => {
        el.classList.toggle('selected', i === idx);
    });
}

function checkAnswer() {
    if (selectedChoice === null) {
        document.getElementById('feedback').textContent = 'Pick an answer first!';
        document.getElementById('feedback').className = 'feedback bad';
        return;
    }

    const q = QUESTIONS[activeQuestion];
    const choices = document.querySelectorAll('.choice');
    const correct = selectedChoice === q.correct;

    choices.forEach((el, i) => {
        el.classList.remove('selected');
        if (i === q.correct) el.classList.add('correct');
        else if (i === selectedChoice && !correct) el.classList.add('wrong');
    });

    document.getElementById('checkBtn').disabled = true;

    if (correct) {
        document.getElementById('feedback').textContent = '¡Correcto! 🎉';
        document.getElementById('feedback').className = 'feedback ok';

        setTimeout(() => {
            closeModal();
            markDone(activeQuestion);
        }, 1200);
    } else {
        document.getElementById('feedback').textContent = `Not quite — try again!`;
        document.getElementById('feedback').className = 'feedback bad';

        setTimeout(() => {
            document.getElementById('checkBtn').disabled = false;
            selectedChoice = null;
            choices.forEach(el => el.classList.remove('correct', 'wrong', 'selected'));
            document.getElementById('feedback').textContent = '';
            document.getElementById('feedback').className = 'feedback';
        }, 1500);
    }
}

function markDone(i) {
    const btn = document.getElementById(`btn-${i}`);
    btn.classList.add('done');

    completedCount++;
    nextIndex++;

    const pct = (completedCount / QUESTIONS.length) * 100;
    document.getElementById('progressFill').style.width = `${pct}%`;

    if (nextIndex < QUESTIONS.length) {
        const next = document.getElementById(`btn-${nextIndex}`);
        next.classList.remove('locked');
        next.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        setTimeout(() => alert('🏆 Lesson complete! ¡Muy bien!'), 300);
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('open');
    activeQuestion = null;
    selectedChoice = null;
}

function resetGame() {
    nextIndex = 0;
    completedCount = 0;
    selectedChoice = null;
    activeQuestion = null;
    document.getElementById('progressFill').style.width = '0%';
    closeModal();
    buildSnake();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close modal when clicking backdrop
document.getElementById('modal').addEventListener('click', e => {
    if (e.target.id === 'modal') closeModal();
});

buildSnake();
