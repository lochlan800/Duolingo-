// Each lesson has a pool of 8 mixed-topic questions
// 5 are randomly selected each time you click the button (so retries give different questions)
const LESSONS = [
    {
        title: "Greetings Basics",
        questionPool: [
            { question: "How do you say 'Hello' in Spanish?",                options: ['Hola','Adiós','Gracias','Por favor'], correct: 0 },
            { question: "What does 'Adiós' mean?",                           options: ['Hello','Goodbye','Thanks','Sorry'], correct: 1 },
            { question: "Translate: 'Hola, amigo'",                          options: ['Goodbye, friend','Hello, friend','Thank you, friend','Sorry, friend'], correct: 1 },
            { question: "How do you say 'Thank you'?",                       options: ['Por favor','De nada','Gracias','Hola'], correct: 2 },
            { question: "Which one is a greeting?",                          options: ['Adiós','Hola','Gracias','Lo siento'], correct: 1 },
            { question: "What does 'Por favor' mean?",                       options: ['Thank you','Please','Sorry','Hello'], correct: 1 },
            { question: "Choose the correct spelling of 'Hello'",            options: ['Ola','Hola','Hella','Hellou'], correct: 1 },
            { question: "How do you say 'See you later'?",                   options: ['Hola','Hasta luego','Buenos días','Mucho gusto'], correct: 1 }
        ]
    },
    {
        title: "Times of Day",
        questionPool: [
            { question: "What does 'Buenos días' mean?",                     options: ['Good night','Good afternoon','Good morning','Goodbye'], correct: 2 },
            { question: "How do you say 'Good afternoon'?",                  options: ['Buenas noches','Buenos días','Buenas tardes','Hola'], correct: 2 },
            { question: "What does 'Buenas noches' mean?",                   options: ['Good morning','Good night','Good afternoon','Hello'], correct: 1 },
            { question: "When do you say 'Buenos días'?",                    options: ['At night','At noon','In the morning','Anytime'], correct: 2 },
            { question: "Which one would you say at 10 PM?",                 options: ['Buenos días','Buenas tardes','Buenas noches','Hola tarde'], correct: 2 },
            { question: "Which means 'Good evening/afternoon'?",             options: ['Buenas tardes','Buenos días','Hasta luego','Mucho gusto'], correct: 0 },
            { question: "Translate: 'Buenos días, señor'",                   options: ['Good night, sir','Good morning, sir','Hello, sir','Goodbye, sir'], correct: 1 },
            { question: "What time is 'Buenas tardes' used?",                options: ['Early morning','Midday to evening','Late night','At dawn'], correct: 1 }
        ]
    },
    {
        title: "Meeting Someone New",
        questionPool: [
            { question: "How do you say 'Nice to meet you'?",                options: ['Adiós','De nada','Mucho gusto','Por favor'], correct: 2 },
            { question: "What does 'Encantado' mean?",                       options: ['Goodbye','Thank you','Pleased to meet you',"You're welcome"], correct: 2 },
            { question: "How would you reply to 'Mucho gusto'?",             options: ['Adiós','Igualmente','Hola','Mal'], correct: 1 },
            { question: "A woman would say ____ for 'pleased to meet you'", options: ['Encantado','Encantada','Encantar','Encantos'], correct: 1 },
            { question: "Which means 'It's a pleasure'?",                    options: ['Hasta luego','Es un placer','Buenos días','Adiós'], correct: 1 },
            { question: "What does 'Igualmente' mean?",                      options: ['Likewise','Hello','Goodbye','Thanks'], correct: 0 },
            { question: "How do you say 'My name is...'?",                   options: ['Me llamo...','Mi llamo...','Mi nombre...','Te llamas...'], correct: 0 },
            { question: "Translate: 'Mucho gusto, soy María'",               options: ['Goodbye, I am María','Nice to meet you, I am María','Hello María','Thanks, María'], correct: 1 }
        ]
    },
    {
        title: "How Are You?",
        questionPool: [
            { question: "How do you ask 'How are you?' (informal)?",         options: ['¿Cómo está usted?','¿Qué tal?','¿Quién eres?','¿Dónde estás?'], correct: 1 },
            { question: "Which is informal for 'How are you?'",              options: ['¿Cómo está usted?','¿Cómo estás?','¿Cómo se llama?','¿De dónde es?'], correct: 1 },
            { question: "What does '¿Qué tal?' mean?",                       options: ['What is it?',"What's up?",'What time?','Who are you?'], correct: 1 },
            { question: "Formal way to ask 'How are you?'",                  options: ['¿Qué tal?','¿Cómo te llamas?','¿Cómo está usted?','¿Bien?'], correct: 2 },
            { question: "Translate: '¿Cómo estás hoy?'",                     options: ['Where are you today?','How are you today?','Who are you today?','When are you today?'], correct: 1 },
            { question: "What's a casual way to ask 'How's it going?'",      options: ['¿Qué tal?','¿Cómo está usted?','¿Quién?','¿Dónde?'], correct: 0 },
            { question: "Which means 'How was your day?' (lit.)",            options: ['¿Cómo fue tu día?','¿Quién es tu día?','¿Dónde tu día?','¿Por qué día?'], correct: 0 },
            { question: "Choose: 'Are you well?'",                           options: ['¿Estás bien?','¿Eres bien?','¿Tienes bien?','¿Hay bien?'], correct: 0 }
        ]
    },
    {
        title: "Feelings & Responses",
        questionPool: [
            { question: "How do you say 'I'm fine, thank you'?",             options: ['Más o menos','Bien, gracias','Mal, gracias','Hola'], correct: 1 },
            { question: "What does 'Muy bien' mean?",                        options: ['Very bad','Very well','So-so','Goodbye'], correct: 1 },
            { question: "How do you say 'so-so' in Spanish?",                options: ['Muy bien','Mal','Más o menos','Bien'], correct: 2 },
            { question: "What does 'Mal' mean?",                             options: ['Good','Bad','Excellent','Sleepy'], correct: 1 },
            { question: "How do you say 'Excellent!'?",                      options: ['Mal','¡Excelente!','Perdón','Adiós'], correct: 1 },
            { question: "Translate: 'Estoy cansado'",                        options: ["I'm tired","I'm hungry","I'm happy","I'm thirsty"], correct: 0 },
            { question: "What does 'Fenomenal' mean?",                       options: ['Awful','Phenomenal','Tired','Hungry'], correct: 1 },
            { question: "Reply to '¿Cómo estás?' if you feel okay:",         options: ['Adiós','Bien','Mucho gusto','Lo siento'], correct: 1 }
        ]
    },
    {
        title: "Saying Goodbye",
        questionPool: [
            { question: "How do you say 'See you later'?",                   options: ['Hola','Mucho gusto','Hasta luego','Buenos días'], correct: 2 },
            { question: "What does 'Adiós' mean?",                           options: ['Hello','Goodbye','Thank you','Please'], correct: 1 },
            { question: "Which means 'See you tomorrow'?",                   options: ['Hasta mañana','Hasta luego','Hasta pronto','Adiós'], correct: 0 },
            { question: "What does 'Hasta pronto' mean?",                    options: ['See you soon','Goodbye forever','Good night','Take care'], correct: 0 },
            { question: "How do you say 'See you'?",                         options: ['Nos vemos','Hola','De nada','Por favor'], correct: 0 },
            { question: "Translate: 'Adiós, amigo'",                         options: ['Hello, friend','Goodbye, friend','Thanks, friend','Sorry, friend'], correct: 1 },
            { question: "Which is NOT a goodbye?",                           options: ['Hasta luego','Adiós','Mucho gusto','Hasta mañana'], correct: 2 },
            { question: "What does 'Cuídate' mean?",                         options: ['Take care','Be careful','Both A and B','Goodbye forever'], correct: 2 }
        ]
    },
    {
        title: "Polite Phrases",
        questionPool: [
            { question: "How do you say 'Please'?",                          options: ['Gracias','Por favor','De nada','Perdón'], correct: 1 },
            { question: "What does 'De nada' mean?",                         options: ['Nothing here','You\'re welcome','I don\'t know','Goodbye'], correct: 1 },
            { question: "How do you say 'Sorry'?",                           options: ['Lo siento','Hola','Gracias','Adiós'], correct: 0 },
            { question: "What does 'Perdón' mean?",                          options: ['Thank you','Excuse me/Sorry','Hello','Goodbye'], correct: 1 },
            { question: "Reply to 'Gracias':",                               options: ['Adiós','De nada','Hola','Por favor'], correct: 1 },
            { question: "Translate: 'Muchas gracias'",                       options: ['Many thanks','Many sorries','Many hellos','Many goodbyes'], correct: 0 },
            { question: "How do you say 'Excuse me' (to get attention)?",    options: ['Disculpe','Adiós','Gracias','Buenos días'], correct: 0 },
            { question: "Which is the most polite version of 'thanks'?",     options: ['Gracias','Muchas gracias','Mil gracias','All are polite'], correct: 3 }
        ]
    },
    {
        title: "Formal vs Informal",
        questionPool: [
            { question: "Formal way to say 'How are you?'",                  options: ['¿Qué tal?','¿Cómo te llamas?','¿Cómo está usted?','¿Bien?'], correct: 2 },
            { question: "How do you ask someone's name (formal)?",           options: ['¿Cómo te llamas?','¿Cómo se llama usted?','¿Quién eres?','¿De dónde?'], correct: 1 },
            { question: "Choose the formal greeting:",                       options: ['¡Hola!','¿Qué tal?','Buenos días, señor','¿Qué onda?'], correct: 2 },
            { question: "What does 'usted' mean?",                           options: ['You (informal)','You (formal)','He/She','We'], correct: 1 },
            { question: "What does 'tú' mean?",                              options: ['You (formal)','You (informal)','I','We'], correct: 1 },
            { question: "Which is more formal: 'señor' or 'amigo'?",         options: ['Señor','Amigo','Both same','Neither'], correct: 0 },
            { question: "How would you address an older woman politely?",    options: ['Niña','Señora','Chica','Amiga'], correct: 1 },
            { question: "Choose the informal greeting:",                     options: ['Buenos días, señor','¿Qué tal, amigo?','Encantado de conocerle','Buenas tardes, señora'], correct: 1 }
        ]
    },
    {
        title: "Names & Introductions",
        questionPool: [
            { question: "How do you say 'My name is...'?",                   options: ['Me llamo...','Mi llamo...','Soy llamo...','Tu nombre...'], correct: 0 },
            { question: "What does '¿Cómo te llamas?' mean?",                options: ['How old are you?','What is your name?','Where are you from?','How are you?'], correct: 1 },
            { question: "How do you say 'I am from...'?",                    options: ['Soy de...','Estoy de...','Tengo de...','Me llamo...'], correct: 0 },
            { question: "What does 'Mi nombre es...' mean?",                 options: ['I am from...','My name is...','I like...','I want...'], correct: 1 },
            { question: "Translate: 'Soy de España'",                        options: ['I am Spain','I am from Spain','I want Spain','I like Spain'], correct: 1 },
            { question: "How do you ask 'Where are you from?'",              options: ['¿De dónde eres?','¿Cómo estás?','¿Qué tal?','¿Dónde vas?'], correct: 0 },
            { question: "Reply to '¿Cómo te llamas?'",                       options: ['Bien, gracias','Me llamo Juan','Soy de México','Hasta luego'], correct: 1 },
            { question: "What does 'Encantado de conocerte' mean?",          options: ['Pleased to meet you','See you later','Thank you','How are you?'], correct: 0 }
        ]
    },
    {
        title: "Mixed Review",
        questionPool: [
            { question: "How do you say 'Hello'?",                           options: ['Hola','Adiós','Gracias','Por favor'], correct: 0 },
            { question: "What does 'Buenas noches' mean?",                   options: ['Good morning','Good night','Good afternoon','Hello'], correct: 1 },
            { question: "How do you say 'Thank you very much'?",             options: ['Por favor','Muchas gracias','Lo siento','De nada'], correct: 1 },
            { question: "Reply to 'Mucho gusto':",                           options: ['Igualmente','Adiós','Mal','Hola'], correct: 0 },
            { question: "What does 'Hasta mañana' mean?",                    options: ['See you soon','See you tomorrow','See you later','Goodbye forever'], correct: 1 },
            { question: "Formal way to say 'How are you?'",                  options: ['¿Qué tal?','¿Cómo está usted?','¿Cómo estás?','¿Quién?'], correct: 1 },
            { question: "Translate: 'Me llamo Ana'",                         options: ['I love Ana','My name is Ana','I see Ana','I am Ana\'s'], correct: 1 },
            { question: "What does 'Lo siento' mean?",                       options: ["I'm sorry",'I feel it','I sit','I have it'], correct: 0 }
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

// Number of questions to show per session (randomly selected from the pool)
const QUESTIONS_PER_SESSION = 5;

let completedCount = 0;
let nextButtonIndex = 0;
let buttonCompletions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  // track how many times each button completed (0-4)
let activeLessonIndex = null;
let activeQuestions = [];   // randomly selected questions for the current session
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
        btn.textContent = i + 1;
        btn.dataset.index = i;
        btn.dataset.completions = buttonCompletions[i];
        btn.title = LESSONS[i].title;
        btn.addEventListener('click', () => onButtonClick(i));

        row.appendChild(btn);
        path.appendChild(row);
    }
}

function pickRandomQuestions(pool, count) {
    // Fisher-Yates partial shuffle then slice the first `count` items
    const arr = [...pool];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, count);
}

function onButtonClick(i) {
    // Allow clicking on any button that has been unlocked
    if (i > nextButtonIndex) {
        alert(`Click button ${nextButtonIndex + 1} next!`);
        return;
    }

    activeLessonIndex = i;
    selectedAnswer = null;

    // Randomly pick questions from the pool so retries feel different
    activeQuestions = pickRandomQuestions(LESSONS[i].questionPool, QUESTIONS_PER_SESSION);

    // Initialise the queue with all selected question indices in order
    questionQueue = activeQuestions.map((_, idx) => idx);
    activeQuestionIndex = questionQueue[0];
    wrongIndices = new Set();

    showCurrentQuestion();
}

function showCurrentQuestion() {
    const lesson = LESSONS[activeLessonIndex];
    const q = activeQuestions[activeQuestionIndex];

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

    const q = activeQuestions[activeQuestionIndex];
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
    activeQuestions = [];
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
