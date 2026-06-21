// Lessons progress from single greeting words → full conversational sentences.
// Every lesson now TEACHES its words first (the `teach` cards), then quizzes
// with a random selection from a larger `questions` pool so replays stay fresh.
const LESSONS = [
    {
        title: "Greeting Words",
        intro: "Brand new to Spanish? Start here! Learn these greeting words 👇",
        teach: [
            { emoji: "👋", es: "Hola",     en: "Hello" },
            { emoji: "👋", es: "Adiós",    en: "Goodbye" },
            { emoji: "🙏", es: "Gracias",  en: "Thank you" },
            { emoji: "🥺", es: "Por favor", en: "Please" },
            { emoji: "✅", es: "Sí",       en: "Yes" },
            { emoji: "❌", es: "No",       en: "No" },
            { emoji: "🙇", es: "Perdón",   en: "Sorry" }
        ],
        questions: [
            { question: "How do you say 'Hello'?",      options: ['Hola','Adiós','Gracias','Sí'], correct: 0 },
            { question: "What does 'Adiós' mean?",      options: ['Hello','Goodbye','Thanks','Sorry'], correct: 1 },
            { question: "How do you say 'Thank you'?",  options: ['Hola','Gracias','Sí','Perdón'], correct: 1 },
            { question: "How do you say 'Sorry'?",      options: ['Hola','Adiós','Perdón','Gracias'], correct: 2 },
            { question: "Which word means 'Yes'?",      options: ['No','Sí','Hola','Gracias'], correct: 1 },
            { question: "What does 'Por favor' mean?",  options: ['Thank you','Please','Sorry','Hello'], correct: 1 },
            { question: "What does 'Gracias' mean?",    options: ['Sorry','Please','Thank you','Goodbye'], correct: 2 },
            { question: "How do you say 'No'?",         options: ['Sí','No','Perdón','Hola'], correct: 1 }
        ]
    },
    {
        title: "Sentence Building Words",
        intro: "These little words build bigger greetings. Learn them first! 👇",
        teach: [
            { emoji: "👍", es: "Buenos",  en: "Good (masculine)" },
            { emoji: "👍", es: "Buenas",  en: "Good (feminine)" },
            { emoji: "☀️", es: "días",    en: "days" },
            { emoji: "🌇", es: "tardes",  en: "afternoons" },
            { emoji: "🌙", es: "noches",  en: "nights" },
            { emoji: "⏳", es: "hasta",   en: "until" },
            { emoji: "📅", es: "mañana",  en: "tomorrow / morning" },
            { emoji: "⏰", es: "luego",   en: "later" }
        ],
        questions: [
            { question: "What does 'Buenos' mean?",       options: ['Bad','Good','Big','Small'], correct: 1 },
            { question: "What does 'días' mean?",         options: ['Nights','Days','Hours','Years'], correct: 1 },
            { question: "What does 'tardes' mean?",       options: ['Mornings','Afternoons','Nights','Days'], correct: 1 },
            { question: "What does 'noches' mean?",       options: ['Days','Mornings','Nights','Afternoons'], correct: 2 },
            { question: "What does 'hasta' mean?",        options: ['From','Until','At','With'], correct: 1 },
            { question: "What does 'mañana' mean?",       options: ['Tomorrow','Yesterday','Today','Always'], correct: 0 },
            { question: "What does 'luego' mean?",        options: ['Now','Later','Never','Soon'], correct: 1 },
            { question: "Which word means 'nights'?",     options: ['días','tardes','noches','hasta'], correct: 2 }
        ]
    },
    {
        title: "Two-Word Phrases",
        intro: "Now join words into real phrases. Learn these first! 👇",
        teach: [
            { emoji: "☀️", es: "Buenos días",   en: "Good morning" },
            { emoji: "🌇", es: "Buenas tardes", en: "Good afternoon" },
            { emoji: "🌙", es: "Buenas noches", en: "Good night" },
            { emoji: "👋", es: "Hasta luego",   en: "See you later" },
            { emoji: "📅", es: "Hasta mañana",  en: "See you tomorrow" },
            { emoji: "🤝", es: "Mucho gusto",   en: "Nice to meet you" }
        ],
        questions: [
            { question: "How do you say 'Good morning'?",   options: ['Buenas noches','Buenos días','Buenas tardes','Hola días'], correct: 1 },
            { question: "How do you say 'Good afternoon'?", options: ['Buenas tardes','Buenos días','Buenas noches','Hola tardes'], correct: 0 },
            { question: "How do you say 'Good night'?",     options: ['Buenos noches','Buenas noches','Buenos días','Hola noches'], correct: 1 },
            { question: "How do you say 'See you later'?",  options: ['Hasta mañana','Hasta luego','Hasta pronto','Adiós luego'], correct: 1 },
            { question: "How do you say 'See you tomorrow'?", options: ['Hasta luego','Hasta pronto','Hasta mañana','Adiós mañana'], correct: 2 },
            { question: "What does 'Mucho gusto' mean?",    options: ['Many thanks','Nice to meet you','Good morning','See you'], correct: 1 },
            { question: "What does 'Buenas noches' mean?",  options: ['Good morning','Good night','Good afternoon','Hello'], correct: 1 },
            { question: "Translate: 'Buenas tardes'",       options: ['Good morning','Good afternoon','Good night','See you'], correct: 1 }
        ]
    },
    {
        title: "Pronouns & Verbs",
        intro: "Words for 'I', 'you' and 'to be'. Learn these first! 👇",
        teach: [
            { emoji: "🙋", es: "Yo",     en: "I" },
            { emoji: "👉", es: "Tú",     en: "You (informal)" },
            { emoji: "🎩", es: "Usted",  en: "You (formal)" },
            { emoji: "🆔", es: "Soy",    en: "I am (always true)" },
            { emoji: "📍", es: "Estoy",  en: "I am (right now)" },
            { emoji: "🫰", es: "Mi",     en: "My" }
        ],
        questions: [
            { question: "What does 'Yo' mean?",                options: ['You','I','He','We'], correct: 1 },
            { question: "What does 'tú' mean? (informal)",     options: ['I','You','He','They'], correct: 1 },
            { question: "What does 'soy' mean?",               options: ['You are','I am','He is','We are'], correct: 1 },
            { question: "What does 'estoy' mean? (right now)", options: ['I have','I am','I want','I go'], correct: 1 },
            { question: "What does 'usted' mean?",             options: ['You (informal)','You (formal)','He','We'], correct: 1 },
            { question: "What does 'mi' mean?",                options: ['Your','My','His','Our'], correct: 1 },
            { question: "How do you say 'I'?",                 options: ['Tú','Yo','Mi','Usted'], correct: 1 },
            { question: "Which means 'I am from Spain' uses?", options: ['Soy','Estoy','Mi','Tú'], correct: 0 }
        ]
    },
    {
        title: "Short Phrases",
        intro: "Say your name and where you're from. Learn these first! 👇",
        teach: [
            { emoji: "🏷️", es: "Me llamo",      en: "My name is" },
            { emoji: "🌍", es: "Soy de",        en: "I am from" },
            { emoji: "🆔", es: "Soy",           en: "I am" },
            { emoji: "✍️", es: "Mi nombre es",  en: "My name is" }
        ],
        questions: [
            { question: "How do you say 'My name is'?",   options: ['Mi llamo','Me llamo','Yo llamo','Tú llamas'], correct: 1 },
            { question: "What does 'Soy de' mean?",       options: ['I have','I am from','I want','I go to'], correct: 1 },
            { question: "How do you say 'My name is Ana'?", options: ['Mi llamo Ana','Me llamo Ana','Soy Ana llamo','Yo llamo Ana'], correct: 1 },
            { question: "Translate: 'Soy de España'",     options: ['I want Spain','I am from Spain','I go to Spain','I love Spain'], correct: 1 },
            { question: "How do you say 'I am Juan'?",     options: ['Yo Juan','Soy Juan','Me Juan','Mi Juan'], correct: 1 },
            { question: "What does 'Me llamo Sofía' mean?", options: ['I am from Sofía','My name is Sofía','I see Sofía','Hello Sofía'], correct: 1 },
            { question: "How do you say 'I am from Mexico'?", options: ['Soy México','Soy de México','Yo México','Estoy México'], correct: 1 }
        ]
    },
    {
        title: "Asking Questions",
        intro: "Ask people about themselves. Learn these first! 👇",
        teach: [
            { emoji: "💬", es: "¿Cómo estás?",      en: "How are you? (informal)" },
            { emoji: "🎩", es: "¿Cómo está usted?", en: "How are you? (formal)" },
            { emoji: "🏷️", es: "¿Cómo te llamas?",  en: "What's your name?" },
            { emoji: "🌍", es: "¿De dónde eres?",   en: "Where are you from?" },
            { emoji: "😎", es: "¿Qué tal?",         en: "What's up?" }
        ],
        questions: [
            { question: "How do you ask 'How are you?' (informal)?", options: ['¿Cómo está usted?','¿Cómo estás?','¿Qué llamas?','¿De dónde vas?'], correct: 1 },
            { question: "How do you ask 'How are you?' (formal)?",   options: ['¿Cómo estás?','¿Cómo está usted?','¿Qué tal tú?','¿De dónde eres?'], correct: 1 },
            { question: "How do you ask 'What is your name?'",       options: ['¿Quién eres?','¿Cómo te llamas?','¿De dónde eres?','¿Qué tal?'], correct: 1 },
            { question: "How do you ask 'Where are you from?'",      options: ['¿Cómo estás?','¿Qué tal?','¿De dónde eres?','¿Cómo te llamas?'], correct: 2 },
            { question: "What does '¿Qué tal?' mean?",               options: ['Who are you?',"How are you?/What's up?",'Where are you?','When?'], correct: 1 },
            { question: "What does '¿De dónde eres?' mean?",         options: ["What's your name?",'Where are you from?','How are you?','How old are you?'], correct: 1 },
            { question: "What does '¿Cómo te llamas?' mean?",        options: ['How are you?',"What's your name?",'Where are you from?',"What's up?"], correct: 1 }
        ]
    },
    {
        title: "Quick Responses",
        intro: "How to answer 'How are you?'. Learn these first! 👇",
        teach: [
            { emoji: "🙂", es: "Bien",         en: "Well / Good" },
            { emoji: "😄", es: "Muy bien",     en: "Very well" },
            { emoji: "🙁", es: "Mal",          en: "Bad" },
            { emoji: "😐", es: "Más o menos",  en: "So-so" },
            { emoji: "🙏", es: "Bien, gracias", en: "Well, thanks" }
        ],
        questions: [
            { question: "How do you respond 'I'm well, thank you'?", options: ['Mal, gracias','Bien, gracias','Hola, gracias','Sí, gracias'], correct: 1 },
            { question: "How do you say 'Very well'?",               options: ['Muy mal','Muy bien','Más o menos','No bien'], correct: 1 },
            { question: "What does 'Más o menos' mean?",             options: ['Very well','So-so','Terrible','Excellent'], correct: 1 },
            { question: "What does 'Mal' mean?",                     options: ['Good','Bad','Great','Tired'], correct: 1 },
            { question: "What does 'Estoy bien' mean?",              options: ['I am well','I am tired','I have well','I want well'], correct: 0 },
            { question: "What does 'Muy bien' mean?",                options: ['Very bad','Very well','So-so','Goodbye'], correct: 1 },
            { question: "Reply if you feel great: '¿Cómo estás?'",   options: ['Mal','Muy bien','Adiós','¿Qué tal?'], correct: 1 }
        ]
    },
    {
        title: "Combined Greetings",
        intro: "Put two greetings together. Learn these first! 👇",
        teach: [
            { emoji: "😎", es: "Hola, ¿qué tal?",            en: "Hi, what's up?" },
            { emoji: "☀️", es: "Buenos días, ¿cómo estás?", en: "Good morning, how are you?" },
            { emoji: "👋", es: "Adiós, hasta luego",         en: "Goodbye, see you later" },
            { emoji: "🌙", es: "Buenas noches, hasta mañana", en: "Good night, see you tomorrow" }
        ],
        questions: [
            { question: "Translate: 'Hola, ¿qué tal?'",            options: ["Hi, what's your name?","Hi, how are you?/what's up?",'Hi, where are you?','Hi, goodbye'], correct: 1 },
            { question: "Translate: 'Buenos días, ¿cómo estás?'",  options: ['Good night, how are you?','Good morning, how are you?','Goodbye, how are you?',"Hello, what's your name?"], correct: 1 },
            { question: "How do you say 'Goodbye, see you later'?", options: ['Hola, hasta luego','Adiós, hasta luego','Adiós, mucho gusto','Hola, hasta mañana'], correct: 1 },
            { question: "How do you say 'Hello, how are you?'",     options: ['Hola, ¿qué tal?','Hola, ¿cómo estás?','Adiós, ¿cómo estás?','Gracias, ¿qué tal?'], correct: 1 },
            { question: "Translate: 'Buenas noches, hasta mañana'", options: ['Good morning, see you tomorrow','Good night, see you tomorrow','Goodbye, see you later','Good night, see you soon'], correct: 1 },
            { question: "Translate: 'Adiós, buenas noches'",        options: ['Hello, good night','Goodbye, good morning','Goodbye, good night','See you, good night'], correct: 2 }
        ]
    },
    {
        title: "Introducing Yourself",
        intro: "Introduce yourself to someone new. Learn these first! 👇",
        teach: [
            { emoji: "🙋", es: "Hola, me llamo...",   en: "Hi, my name is..." },
            { emoji: "🤝", es: "Mucho gusto, soy...", en: "Nice to meet you, I'm..." },
            { emoji: "🌍", es: "Soy de...",           en: "I'm from..." },
            { emoji: "😊", es: "Encantado/a",         en: "Pleased to meet you" }
        ],
        questions: [
            { question: "Translate: 'Hola, me llamo Juan'",          options: ['Hi, your name is Juan','Hi, my name is Juan','Goodbye, my name is Juan','Hi, I see Juan'], correct: 1 },
            { question: "How do you say 'Nice to meet you, I am María'?", options: ['Hola, soy María','Mucho gusto, soy María','Adiós, soy María','Gracias, soy María'], correct: 1 },
            { question: "Translate: 'Soy de España, ¿y tú?'",        options: ['I am Spain, and you?','I am from Spain, and you?','I go to Spain, and you?','I want Spain, and you?'], correct: 1 },
            { question: "How do you say 'My name is Ana, I am from Mexico'?", options: ['Mi Ana, de México','Me llamo Ana, soy de México','Soy Ana de México','Llamo Ana, México'], correct: 1 },
            { question: "How do you say 'Hi, I am Pedro'?",          options: ['Hola, soy Pedro','Adiós, soy Pedro','Hola, mi Pedro','Hola, Pedro soy'], correct: 0 },
            { question: "Translate: 'Encantado de conocerte'",       options: ['How are you?','Pleased to meet you','See you later','I am from'], correct: 1 }
        ]
    },
    {
        title: "Full Greeting Conversations",
        intro: "Hold a whole greeting chat! Learn these first! 👇",
        teach: [
            { emoji: "🗣️", es: "¡Hola! Me llamo...",  en: "Hi! My name is..." },
            { emoji: "🏷️", es: "¿Cómo te llamas?",    en: "What's your name?" },
            { emoji: "🌍", es: "¿De dónde eres?",     en: "Where are you from?" },
            { emoji: "🤝", es: "Mucho gusto",         en: "Nice to meet you" }
        ],
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

// How many questions to ask per session (picked at random from the pool so
// replaying a lesson doesn't show the same questions in the same order)
const QUESTIONS_PER_SESSION = 5;

// Fun, rotating feedback so it never feels repetitive
const PRAISE = ['¡Correcto! 🎉', '¡Genial! 🌟', 'Nice! 👏', '¡Muy bien! 💪', 'Perfect! ✨', 'You got it! 🙌', '¡Excelente! 🤩'];
const TRY_AGAIN = ["Not quite — we'll come back to this one! 💡", "Oops! You'll get it next time 🔁", "Close! This one returns later 🔄"];

let completedCount = 0;
let nextButtonIndex = 0;
let buttonCompletions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  // track how many times each button completed (0-4)
let activeLessonIndex = null;
let activeQuestions = [];   // the prepared (selected + option-shuffled) questions for this session
let activeQuestionIndex = 0;
let selectedAnswer = null;
let questionQueue = [];   // queue of question indices still to answer
let wrongIndices = new Set();   // question indices that the user got wrong
let streak = 0;   // consecutive correct answers in the current session

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

        // Add trophy span (kept for future use; currently hidden via CSS)
        const trophySpan = document.createElement('span');
        trophySpan.className = 'button-trophy';
        trophySpan.textContent = '🏆';
        btn.appendChild(trophySpan);

        row.appendChild(btn);
        path.appendChild(row);
    }
}

// Fisher-Yates shuffle on a copy
function shuffled(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Shuffle a question's options and keep the correct index pointing at the right answer
function prepareQuestion(q) {
    const correctValue = q.options[q.correct];
    const options = shuffled(q.options);
    return { question: q.question, options, correct: options.indexOf(correctValue) };
}

// Pick N random questions from the pool, each with shuffled answer positions
function buildSessionQuestions(pool) {
    const count = Math.min(QUESTIONS_PER_SESSION, pool.length);
    return shuffled(pool).slice(0, count).map(prepareQuestion);
}

function onButtonClick(i) {
    // Allow clicking on any button that has been unlocked (not a locked button ahead)
    if (i > nextButtonIndex) {
        alert(`🔒 Finish lesson ${nextButtonIndex + 1} first!`);
        return;
    }

    activeLessonIndex = i;
    selectedAnswer = null;
    streak = 0;

    // Always teach the words first, then the quiz starts
    showLearnScreen();
}

// ── Teaching step: show the words/phrases before any questions ──
function showLearnScreen() {
    const lesson = LESSONS[activeLessonIndex];

    document.getElementById('questionTitle').textContent = `📚 Learn: ${lesson.title}`;
    document.getElementById('questionText').textContent = lesson.intro || 'Learn these, then try the quiz!';

    const cards = lesson.teach.map(t => `
        <div class="learn-card">
            <span class="learn-emoji">${t.emoji}</span>
            <span class="learn-es">${t.es}</span>
            <span class="learn-arrow">→</span>
            <span class="learn-en">${t.en}</span>
        </div>
    `).join('');
    document.getElementById('answersContainer').innerHTML = `<div class="learn-list">${cards}</div>`;

    const feedback = document.getElementById('feedback');
    feedback.textContent = '';
    feedback.className = 'feedback';

    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Start lesson →';
    submitBtn.onclick = startQuiz;
    submitBtn.classList.add('finish-btn');

    const modal = document.getElementById('questionModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
}

// ── Quiz step: build a fresh random set of questions and ask the first ──
function startQuiz() {
    const lesson = LESSONS[activeLessonIndex];

    activeQuestions = buildSessionQuestions(lesson.questions);
    questionQueue = activeQuestions.map((_, idx) => idx);
    activeQuestionIndex = questionQueue[0];
    wrongIndices = new Set();
    selectedAnswer = null;

    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Check';
    submitBtn.onclick = checkAnswer;
    submitBtn.classList.remove('finish-btn');

    showCurrentQuestion();
}

function showCurrentQuestion() {
    const lesson = LESSONS[activeLessonIndex];
    const q = activeQuestions[activeQuestionIndex];

    const remaining = questionQueue.length;
    const isRetry = wrongIndices.has(activeQuestionIndex);
    const fire = streak >= 2 ? `  🔥${streak}` : '';
    const label = isRetry
        ? `${lesson.title} — retry · ${remaining} left${fire}`
        : `${lesson.title} · ${remaining} left${fire}`;
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

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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
        streak++;
        const bonus = streak >= 3 ? `  🔥 ${streak} in a row!` : '';
        feedback.textContent = pick(PRAISE) + bonus;
        feedback.className = 'feedback show correct';

        // Remove this question from the queue
        questionQueue.shift();

        setTimeout(() => advanceToNextQuestion(), 1100);
    } else {
        options[selectedAnswer].classList.add('incorrect');
        options[q.correct].classList.add('correct');
        streak = 0;
        feedback.textContent = pick(TRY_AGAIN);
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
            <p class="completion-subtitle">¡Muy bien! You can now use these in real life.</p>
        </div>
    `;

    // Clear answers and feedback
    document.getElementById('answersContainer').innerHTML = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';

    // Swap the button for "Finish Session"
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Finish Session';
    submitBtn.onclick = finishLesson;
    submitBtn.classList.add('finish-btn');
}

function finishLesson() {
    // Reset the action button back to a neutral state
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Check';
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
    streak = 0;
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
    streak = 0;
    closeQuestion();
    buildButtons();
    updateProgress();
}

document.getElementById('questionModal').addEventListener('click', e => {
    if (e.target.id === 'questionModal') closeQuestion();
});

buildButtons();
updateProgress();
