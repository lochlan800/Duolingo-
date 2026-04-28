// Lessons progress from single greeting words → full conversational sentences
// Button 1: single greeting words → Button 10: complete greeting conversations
const LESSONS = [
    {
        title: "Greeting Words",
        questions: [
            { question: "How do you say 'Hello'?",                    options: ['Hola','Adiós','Gracias','Sí'], correct: 0 },
            { question: "What does 'Adiós' mean?",                    options: ['Hello','Goodbye','Thanks','Sorry'], correct: 1 },
            { question: "How do you say 'Thank you'?",                options: ['Hola','Gracias','Sí','Perdón'], correct: 1 },
            { question: "How do you say 'Sorry'?",                    options: ['Hola','Adiós','Perdón','Gracias'], correct: 2 },
            { question: "Which word means 'Yes'?",                    options: ['No','Sí','Hola','Gracias'], correct: 1 }
        ]
    },
    {
        title: "Sentence Building Words",
        questions: [
            { question: "What does 'Buenos' mean?",                   options: ['Bad','Good','Big','Small'], correct: 1 },
            { question: "What does 'días' mean?",                     options: ['Nights','Days','Hours','Years'], correct: 1 },
            { question: "What does 'tardes' mean?",                   options: ['Mornings','Afternoons','Nights','Days'], correct: 1 },
            { question: "What does 'noches' mean?",                   options: ['Days','Mornings','Nights','Afternoons'], correct: 2 },
            { question: "What does 'hasta' mean?",                    options: ['From','Until','At','With'], correct: 1 },
            { question: "What does 'mañana' mean?",                   options: ['Tomorrow','Yesterday','Today','Always'], correct: 0 }
        ]
    },
    {
        title: "Two-Word Phrases",
        questions: [
            { question: "How do you say 'Good morning'?",             options: ['Buenas noches','Buenos días','Buenas tardes','Hola días'], correct: 1 },
            { question: "How do you say 'Good afternoon'?",           options: ['Buenas tardes','Buenos días','Buenas noches','Hola tardes'], correct: 0 },
            { question: "How do you say 'Good night'?",               options: ['Buenos noches','Buenas noches','Buenos días','Hola noches'], correct: 1 },
            { question: "How do you say 'See you later'?",            options: ['Hasta mañana','Hasta luego','Hasta pronto','Adiós luego'], correct: 1 },
            { question: "How do you say 'See you tomorrow'?",         options: ['Hasta luego','Hasta pronto','Hasta mañana','Adiós mañana'], correct: 2 },
            { question: "What does 'Mucho gusto' mean?",              options: ['Many thanks','Nice to meet you','Good morning','See you'], correct: 1 }
        ]
    },
    {
        title: "Pronouns & Verbs",
        questions: [
            { question: "What does 'Yo' mean?",                       options: ['You','I','He','We'], correct: 1 },
            { question: "What does 'tú' mean? (informal)",            options: ['I','You','He','They'], correct: 1 },
            { question: "What does 'soy' mean?",                      options: ['You are','I am','He is','We are'], correct: 1 },
            { question: "What does 'estoy' mean? (temporary)",        options: ['I have','I am','I want','I go'], correct: 1 },
            { question: "What does 'usted' mean?",                    options: ['You (informal)','You (formal)','He','We'], correct: 1 },
            { question: "What does 'mi' mean?",                       options: ['Your','My','His','Our'], correct: 1 }
        ]
    },
    {
        title: "Short Phrases",
        questions: [
            { question: "How do you say 'My name is'?",               options: ['Mi llamo','Me llamo','Yo llamo','Tú llamas'], correct: 1 },
            { question: "What does 'Soy de' mean?",                   options: ['I have','I am from','I want','I go to'], correct: 1 },
            { question: "How do you say 'My name is Ana'?",           options: ['Mi llamo Ana','Me llamo Ana','Soy Ana llamo','Yo llamo Ana'], correct: 1 },
            { question: "Translate: 'Soy de España'",                 options: ['I want Spain','I am from Spain','I go to Spain','I love Spain'], correct: 1 },
            { question: "How do you say 'I am Juan'?",                options: ['Yo Juan','Soy Juan','Me Juan','Mi Juan'], correct: 1 }
        ]
    },
    {
        title: "Asking Questions",
        questions: [
            { question: "How do you ask 'How are you?' (informal)?",  options: ['¿Cómo está usted?','¿Cómo estás?','¿Qué llamas?','¿De dónde vas?'], correct: 1 },
            { question: "How do you ask 'How are you?' (formal)?",    options: ['¿Cómo estás?','¿Cómo está usted?','¿Qué tal tú?','¿De dónde eres?'], correct: 1 },
            { question: "How do you ask 'What is your name?'",        options: ['¿Quién eres?','¿Cómo te llamas?','¿De dónde eres?','¿Qué tal?'], correct: 1 },
            { question: "How do you ask 'Where are you from?'",       options: ['¿Cómo estás?','¿Qué tal?','¿De dónde eres?','¿Cómo te llamas?'], correct: 2 },
            { question: "What does '¿Qué tal?' mean?",                options: ['Who are you?',"How are you?/What's up?",'Where are you?','When?'], correct: 1 }
        ]
    },
    {
        title: "Quick Responses",
        questions: [
            { question: "How do you respond 'I'm well, thank you'?",  options: ['Mal, gracias','Bien, gracias','Hola, gracias','Sí, gracias'], correct: 1 },
            { question: "How do you say 'Very well'?",                options: ['Muy mal','Muy bien','Más o menos','No bien'], correct: 1 },
            { question: "What does 'Más o menos' mean?",              options: ['Very well','So-so','Terrible','Excellent'], correct: 1 },
            { question: "How do you say 'I am from Mexico'?",         options: ['Soy México','Soy de México','Yo México','Estoy México'], correct: 1 },
            { question: "What does 'Estoy bien' mean?",               options: ['I am well','I am tired','I have well','I want well'], correct: 0 }
        ]
    },
    {
        title: "Combined Greetings",
        questions: [
            { question: "Translate: 'Hola, ¿qué tal?'",               options: ["Hi, what's your name?","Hi, how are you?/what's up?",'Hi, where are you?','Hi, goodbye'], correct: 1 },
            { question: "Translate: 'Buenos días, ¿cómo estás?'",     options: ['Good night, how are you?','Good morning, how are you?','Goodbye, how are you?',"Hello, what's your name?"], correct: 1 },
            { question: "How do you say 'Goodbye, see you later'?",   options: ['Hola, hasta luego','Adiós, hasta luego','Adiós, mucho gusto','Hola, hasta mañana'], correct: 1 },
            { question: "How do you say 'Hello, how are you?'",       options: ['Hola, ¿qué tal?','Hola, ¿cómo estás?','Adiós, ¿cómo estás?','Gracias, ¿qué tal?'], correct: 1 },
            { question: "Translate: 'Buenas noches, hasta mañana'",   options: ['Good morning, see you tomorrow','Good night, see you tomorrow','Goodbye, see you later','Good night, see you soon'], correct: 1 },
            { question: "Translate: 'Adiós, buenas noches'",          options: ['Hello, good night','Goodbye, good morning','Goodbye, good night','See you, good night'], correct: 2 }
        ]
    },
    {
        title: "Introducing Yourself",
        questions: [
            { question: "Translate: 'Hola, me llamo Juan'",           options: ['Hi, your name is Juan','Hi, my name is Juan','Goodbye, my name is Juan','Hi, I see Juan'], correct: 1 },
            { question: "How do you say 'Nice to meet you, I am María'?", options: ['Hola, soy María','Mucho gusto, soy María','Adiós, soy María','Gracias, soy María'], correct: 1 },
            { question: "Translate: 'Soy de España, ¿y tú?'",         options: ['I am Spain, and you?','I am from Spain, and you?','I go to Spain, and you?','I want Spain, and you?'], correct: 1 },
            { question: "How do you say 'My name is Ana, I am from Mexico'?", options: ['Mi Ana, de México','Me llamo Ana, soy de México','Soy Ana de México','Llamo Ana, México'], correct: 1 },
            { question: "How do you say 'Hi, I am Pedro'?",           options: ['Hola, soy Pedro','Adiós, soy Pedro','Hola, mi Pedro','Hola, Pedro soy'], correct: 0 },
            { question: "Translate: 'Encantado de conocerte'",        options: ['How are you?','Pleased to meet you','See you later','I am from'], correct: 1 }
        ]
    },
    {
        title: "Full Greeting Conversations",
        questions: [
            { question: "Translate: 'Hola, buenos días, ¿cómo estás?'", options: ['Hi, good night, how are you?','Hi, good morning, how are you?','Bye, good morning, how are you?',"Hi, good morning, what's your name?"], correct: 1 },
            { question: "How do you say 'Hello! My name is María. Nice to meet you'?", options: ['¡Hola! Soy María. Adiós','¡Hola! Me llamo María. Mucho gusto','¡Hola! Mi María. Gracias','¡Hola! Llamo María. Hasta luego'], correct: 1 },
            { question: "Translate: 'Buenos días, soy Juan, ¿de dónde eres?'", options: ["Good night, I'm Juan, where are you from?","Good morning, I'm Juan, where are you from?","Hello, I'm Juan, how are you?",'Good morning, are you Juan, where?'], correct: 1 },
            { question: "How do you say 'Hi friend, what's up? How are you?'", options: ['Hola amigo, ¿qué tal? ¿Cómo estás?','Adiós amigo, ¿qué? ¿Cómo?','Hola, amigo qué tal cómo','Hola amigo, mucho gusto'], correct: 0 },
            { question: "How do you greet someone formally in the morning?", options: ['Hola, ¿qué tal?','Buenos días, ¿cómo está usted?','Adiós, buenos días','Mucho gusto, hola'], correct: 1 },
            { question: "How would you fully introduce yourself to a new friend?", options: ['Adiós, me llamo... ¿y tú?','Hola, me llamo... ¿Cómo te llamas?','Gracias, soy... ¿qué tal?','Hola, mi... ¿quién?'], correct: 1 }
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
let buttonCompletions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  // track how many times each button completed (0-4)
let activeLessonIndex = null;
let activeQuestionIndex = 0;
let selectedAnswer = null;
let questionQueue = [];   // queue of question indices still to answer
let wrongIndices = new Set();   // question indices that the user got wrong

function buildButtons() {
    const path = document.getElementById('snakePath');
    path.innerHTML = '';

    for (let i = 0; i < LESSONS.length; i++) {
        const row = document.createElement('div');
        row.className = `snake-row ${SNAKE_POSITIONS[i]}`;

        const btn = document.createElement('button');
        btn.className = `lesson-btn c${i}`;
        btn.dataset.index = i;
        btn.dataset.completions = buttonCompletions[i];
        btn.title = LESSONS[i].title;
        btn.addEventListener('click', () => onButtonClick(i));

        // Add number span (hidden when button is fully completed)
        const numberSpan = document.createElement('span');
        numberSpan.className = 'button-number';
        numberSpan.textContent = i + 1;
        btn.appendChild(numberSpan);

        // Add trophy span (shown when button is fully completed)
        const trophySpan = document.createElement('span');
        trophySpan.className = 'button-trophy';
        trophySpan.textContent = '🏆';
        btn.appendChild(trophySpan);

        row.appendChild(btn);
        path.appendChild(row);
    }
}

function onButtonClick(i) {
    const btn = document.querySelector(`[data-index="${i}"]`);

    // Allow clicking on any button that has been unlocked (not a locked button in front of it)
    if (i > nextButtonIndex) {
        alert(`Click button ${nextButtonIndex + 1} next!`);
        return;
    }

    activeLessonIndex = i;
    selectedAnswer = null;

    // Initialise the queue with all question indices in order
    questionQueue = LESSONS[i].questions.map((_, idx) => idx);
    activeQuestionIndex = questionQueue[0];
    wrongIndices = new Set();

    showCurrentQuestion();
}

function showCurrentQuestion() {
    const lesson = LESSONS[activeLessonIndex];
    const q = lesson.questions[activeQuestionIndex];

    const remaining = questionQueue.length;
    const isRetry = wrongIndices.has(activeQuestionIndex);
    const label = isRetry
        ? `${lesson.title} — retry (${remaining} left)`
        : `${lesson.title} (${remaining} left)`;
    document.getElementById('questionTitle').textContent = label;
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

        // Remove this question from the queue
        questionQueue.shift();

        setTimeout(() => advanceToNextQuestion(), 1100);
    } else {
        options[selectedAnswer].classList.add('incorrect');
        options[q.correct].classList.add('correct');
        feedback.textContent = '✗ Not quite. We\'ll come back to this one!';
        feedback.className = 'feedback show incorrect';

        // Move this question to the end of the queue so it gets retried
        const wrong = questionQueue.shift();
        questionQueue.push(wrong);
        wrongIndices.add(wrong);

        setTimeout(() => advanceToNextQuestion(), 1800);
    }
}

function advanceToNextQuestion() {
    if (questionQueue.length === 0) {
        showSessionComplete();
        return;
    }

    activeQuestionIndex = questionQueue[0];
    selectedAnswer = null;
    showCurrentQuestion();
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

    // Increment completion count for this button (max 4)
    buttonCompletions[activeLessonIndex]++;
    if (buttonCompletions[activeLessonIndex] > 4) {
        buttonCompletions[activeLessonIndex] = 4;
    }

    btn.dataset.completions = buttonCompletions[activeLessonIndex];

    // Only count as completed once for progress tracking
    if (buttonCompletions[activeLessonIndex] === 1) {
        completedCount++;
        nextButtonIndex++;
    }

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
    buttonCompletions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    activeLessonIndex = null;
    activeQuestionIndex = 0;
    selectedAnswer = null;
    questionQueue = [];
    wrongIndices = new Set();
    closeQuestion();
    buildButtons();
    updateProgress();
}

document.getElementById('questionModal').addEventListener('click', e => {
    if (e.target.id === 'questionModal') closeQuestion();
});

buildButtons();
updateProgress();
