// Progressive curriculum: words → phrases → sentences
// Buttons 1-2: Basic greetings
// Buttons 3-4: Time-of-day building blocks
// Buttons 5-6: Time-of-day phrases
// Buttons 7-8: Identity & verbs
// Buttons 9-10: Conversations & full greetings
const LESSONS = [
    {
        title: "Essential Greetings",
        intro: "Start with the most important words you'll hear every day! 👇",
        teach: [
            { emoji: "👋", es: "Hola",     en: "Hello" },
            { emoji: "👋", es: "Adiós",    en: "Goodbye" },
            { emoji: "🙏", es: "Gracias",  en: "Thank you" },
            { emoji: "✅", es: "Sí",       en: "Yes" },
            { emoji: "❌", es: "No",       en: "No" },
            { emoji: "🥺", es: "Por favor", en: "Please" }
        ],
        questions: [
            { question: "How do you say 'Hello'?",      options: ['Hola','Adiós','Gracias','Sí'], correct: 0 },
            { question: "What does 'Adiós' mean?",      options: ['Hello','Goodbye','Thanks','Sorry'], correct: 1 },
            { type: "speech", question: "Pronounce this word:", spanish_prompt: "Hola", english_meaning: "Hello", expected_keywords: ["hola"], hint: "Say it like 'OH-lah'" },
            { question: "How do you say 'Thank you'?",  options: ['Hola','Gracias','Sí','Perdón'], correct: 1 },
            { type: "speech", question: "Pronounce this word:", spanish_prompt: "Adiós", english_meaning: "Goodbye", expected_keywords: ["adiós", "adios"], hint: "Say it like 'ah-dee-OHS'" },
            { question: "Which word means 'Yes'?",      options: ['No','Sí','Hola','Gracias'], correct: 1 },
            { question: "What does 'Por favor' mean?",  options: ['Thank you','Please','Sorry','Hello'], correct: 1 },
            { type: "speech", question: "Pronounce this word:", spanish_prompt: "Gracias", english_meaning: "Thank you", expected_keywords: ["gracias"], hint: "Say it like 'GRAH-see-ahs'" },
            { question: "How do you say 'No'?",         options: ['Sí','No','Perdón','Hola'], correct: 1 },
            { question: "Complete the greeting: 'Hola, ___'", options: ['Adiós','Gracias','Sí','Hola'], correct: 3 }
        ]
    },
    {
        title: "Common Responses",
        intro: "How people answer when you greet them. You'll hear these all the time! 👇",
        teach: [
            { emoji: "🙂", es: "Bien",         en: "Well / Good" },
            { emoji: "😄", es: "Muy bien",     en: "Very well" },
            { emoji: "🙁", es: "Mal",          en: "Bad" },
            { emoji: "😐", es: "Más o menos",  en: "So-so" },
            { emoji: "🙏", es: "Gracias, ¿y tú?", en: "Thanks, and you?" }
        ],
        questions: [
            { question: "How do you say 'Very well'?",   options: ['Muy mal','Muy bien','Más o menos','No bien'], correct: 1 },
            { type: "speech", question: "Pronounce this phrase:", spanish_prompt: "Muy bien", english_meaning: "Very well", expected_keywords: ["muy bien"], hint: "Say it like 'moo-ee bee-EN'" },
            { question: "What does 'Más o menos' mean?", options: ['Very well','So-so','Terrible','Excellent'], correct: 1 },
            { question: "What does 'Mal' mean?",         options: ['Good','Bad','Great','Tired'], correct: 1 },
            { type: "speech", question: "Pronounce this word:", spanish_prompt: "Bien", english_meaning: "Good/Well", expected_keywords: ["bien"], hint: "Say it like 'bee-EN'" },
            { question: "When someone says 'Hola', you can respond:", options: ['Adiós','Muy bien','Gracias','No'], correct: 1 },
            { question: "What does 'Bien' mean?",        options: ['Bad','Good/Well','Never','Always'], correct: 1 },
            { question: "Which response is enthusiastic?", options: ['Mal','Más o menos','Muy bien','Adiós'], correct: 2 }
        ]
    },
    {
        title: "Time of Day Words",
        intro: "Words that describe different times. You'll build phrases with these! 👇",
        teach: [
            { emoji: "☀️", es: "días",    en: "days" },
            { emoji: "🌇", es: "tardes",  en: "afternoons" },
            { emoji: "🌙", es: "noches",  en: "nights" },
            { emoji: "👍", es: "Buenos",  en: "Good (masc.)" },
            { emoji: "👍", es: "Buenas",  en: "Good (fem.)" }
        ],
        questions: [
            { question: "What does 'días' mean?",        options: ['Nights','Days','Hours','Years'], correct: 1 },
            { question: "What does 'tardes' mean?",      options: ['Mornings','Afternoons','Nights','Days'], correct: 1 },
            { question: "What does 'noches' mean?",      options: ['Days','Mornings','Nights','Afternoons'], correct: 2 },
            { question: "What does 'Buenos' mean?",      options: ['Bad','Good','Big','Small'], correct: 1 },
            { question: "When is it 'noches'?",          options: ['Morning','Afternoon','Night','Daytime'], correct: 2 },
            { question: "In Spanish, 'Good' for masculine is:", options: ['Buena','Buenos','Buenes','Buenos'], correct: 1 }
        ]
    },
    {
        title: "Connecting Words",
        intro: "Words that link phrases together. They help make longer sentences! 👇",
        teach: [
            { emoji: "⏳", es: "hasta",   en: "until / till" },
            { emoji: "⏰", es: "luego",   en: "later" },
            { emoji: "📅", es: "mañana",  en: "tomorrow" },
            { emoji: "🤝", es: "Mucho gusto", en: "Nice to meet you" }
        ],
        questions: [
            { question: "What does 'hasta' mean?",       options: ['From','Until','At','With'], correct: 1 },
            { question: "What does 'luego' mean?",       options: ['Now','Later','Never','Soon'], correct: 1 },
            { question: "What does 'mañana' mean?",      options: ['Tomorrow','Yesterday','Today','Always'], correct: 0 },
            { question: "What does 'Mucho gusto' mean?", options: ['Many thanks','Nice to meet you','Good morning','See you'], correct: 1 },
            { question: "You say goodbye: 'Adiós, ___'",  options: ['Hola','hasta luego','Muy bien','días'], correct: 1 }
        ]
    },
    {
        title: "Daytime Greetings",
        intro: "Combine time words into real phrases people use every day! 👇",
        teach: [
            { emoji: "☀️", es: "Buenos días",   en: "Good morning" },
            { emoji: "🌇", es: "Buenas tardes", en: "Good afternoon" },
            { emoji: "🌙", es: "Buenas noches", en: "Good night" }
        ],
        questions: [
            { question: "How do you say 'Good morning'?",   options: ['Buenas noches','Buenos días','Buenas tardes','Hola días'], correct: 1 },
            { question: "How do you say 'Good afternoon'?", options: ['Buenas tardes','Buenos días','Buenas noches','Hola tardes'], correct: 0 },
            { question: "How do you say 'Good night'?",     options: ['Buenos noches','Buenas noches','Buenos días','Hola noches'], correct: 1 },
            { question: "When is it appropriate to say 'Buenos días'?", options: ['Morning','Afternoon','Night','Anytime'], correct: 0 },
            { question: "Which is afternoon greeting?", options: ['Buenos días','Buenas tardes','Buenas noches','Hola'], correct: 1 },
            { question: "Complete: '__ tardes, ¿cómo estás?'", options: ['Buenos','Buenas','Bueno','Buena'], correct: 1 },
            { question: "Say 'Good night' in Spanish:", options: ['Buenos noches','Buenas noches','Noches buenas','Noches'], correct: 1 }
        ]
    },
    {
        title: "Farewell Phrases",
        intro: "How to say goodbye. You'll hear these constantly! 👇",
        teach: [
            { emoji: "👋", es: "Hasta luego",  en: "See you later" },
            { emoji: "📅", es: "Hasta mañana", en: "See you tomorrow" },
            { emoji: "⏰", es: "Hasta pronto",  en: "See you soon" },
            { emoji: "👋", es: "Adiós",        en: "Goodbye" }
        ],
        questions: [
            { question: "How do you say 'See you later'?",      options: ['Hasta mañana','Hasta luego','Hasta pronto','Adiós luego'], correct: 1 },
            { question: "How do you say 'See you tomorrow'?",   options: ['Hasta luego','Hasta pronto','Hasta mañana','Adiós mañana'], correct: 2 },
            { question: "How do you say 'See you soon'?",       options: ['Hasta luego','Hasta mañana','Hasta pronto','Pronto'], correct: 2 },
            { question: "What does 'Hasta luego' mean?",        options: ['Goodbye forever','See you later','See you never','Until forever'], correct: 1 },
            { question: "Complete: 'Adiós, ___!'",              options: ['Hola','Hasta luego','Gracias','Sí'], correct: 1 },
            { question: "Which is the most common goodbye?",    options: ['Hasta mañana','Adiós','Hasta pronto','Luego'], correct: 1 }
        ]
    },
    {
        title: "Who You Are",
        intro: "Words to talk about yourself. Essential for introductions! 👇",
        teach: [
            { emoji: "🙋", es: "Yo",     en: "I" },
            { emoji: "👉", es: "Tú",     en: "You (informal)" },
            { emoji: "🎩", es: "Usted",  en: "You (formal)" },
            { emoji: "🆔", es: "Soy",    en: "I am" },
            { emoji: "📍", es: "Estoy",  en: "I am (right now)" }
        ],
        questions: [
            { question: "What does 'Yo' mean?",                options: ['You','I','He','We'], correct: 1 },
            { question: "What does 'tú' mean? (informal)",     options: ['I','You','He','They'], correct: 1 },
            { question: "What does 'soy' mean?",               options: ['You are','I am','He is','We are'], correct: 1 },
            { question: "What does 'estoy' mean?",             options: ['I have','I am','I want','I go'], correct: 1 },
            { question: "What does 'usted' mean?",             options: ['You (informal)','You (formal)','He','We'], correct: 1 },
            { question: "When do you use 'Soy'?",              options: ['Right now','Always true','Never','Yesterday'], correct: 1 },
            { question: "Yo ___ María (I am María)",           options: ['estoy','soy','estáy','soyo'], correct: 1 }
        ]
    },
    {
        title: "Saying Your Name",
        intro: "Tell people who you are and where you're from! 👇",
        teach: [
            { emoji: "🏷️", es: "Me llamo",    en: "My name is" },
            { emoji: "🌍", es: "Soy de",      en: "I am from" },
            { emoji: "✍️", es: "Mi nombre",   en: "My name" },
            { emoji: "🆔", es: "Soy",         en: "I am" }
        ],
        questions: [
            { question: "How do you say 'My name is'?",      options: ['Mi llamo','Me llamo','Yo llamo','Tú llamas'], correct: 1 },
            { question: "What does 'Soy de' mean?",          options: ['I have','I am from','I want','I go to'], correct: 1 },
            { question: "Complete: 'Me llamo ___'",          options: ['Juan','soy Juan','Juan soy','Juan llamo'], correct: 0 },
            { question: "How do you say 'I am from Spain'?",  options: ['Soy España','Soy de España','Yo España','Estoy de España'], correct: 1 },
            { question: "What is YOUR introduction?",         options: ['Adiós, me llamo...','Hola, me llamo...','Gracias, me llamo...','No, me llamo...'], correct: 1 },
            { question: "Complete: 'Soy de ___'",             options: ['Juan','llamo','Londres','mi'], correct: 2 }
        ]
    },
    {
        title: "Questions People Ask",
        intro: "How natives ask about you. These are essential to know! 👇",
        teach: [
            { emoji: "💬", es: "¿Cómo estás?",     en: "How are you? (informal)" },
            { emoji: "🏷️", es: "¿Cómo te llamas?", en: "What's your name?" },
            { emoji: "🌍", es: "¿De dónde eres?",  en: "Where are you from?" },
            { emoji: "😎", es: "¿Qué tal?",        en: "What's up?" }
        ],
        questions: [
            { question: "How do you ask 'How are you?' (informal)?", options: ['¿Cómo está usted?','¿Cómo estás?','¿Qué llamas?','¿De dónde vas?'], correct: 1 },
            { question: "How do you ask 'What is your name?'",       options: ['¿Quién eres?','¿Cómo te llamas?','¿De dónde eres?','¿Qué tal?'], correct: 1 },
            { question: "How do you ask 'Where are you from?'",      options: ['¿Cómo estás?','¿Qué tal?','¿De dónde eres?','¿Cómo te llamas?'], correct: 2 },
            { question: "What does '¿Qué tal?' mean?",               options: ['Who are you?','How are you / What\'s up?','Where are you?','When?'], correct: 1 },
            { question: "When someone asks '¿Cómo estás?', you might say:", options: ['¿Qué tal?','Soy de...','Muy bien','¿Y tú?'], correct: 2 },
            { question: "Complete the question: '¿___ te llamas?'", options: ['Qué','Cómo','Dónde','De dónde'], correct: 1 }
        ]
    },
    {
        title: "Full Conversations",
        intro: "Put it all together! Hold a real Spanish greeting conversation! 👇",
        teach: [
            { emoji: "🗣️", es: "¡Hola! Me llamo...",    en: "Hi! My name is..." },
            { emoji: "😎", es: "Hola, ¿qué tal?",        en: "Hi, what's up?" },
            { emoji: "🤝", es: "Mucho gusto",            en: "Nice to meet you" },
            { emoji: "👋", es: "Adiós, hasta luego",     en: "Goodbye, see you later" }
        ],
        questions: [
            { question: "You meet someone. Best greeting?", options: ['Adiós','¡Hola! ¿Qué tal?','Mal','¿Qué tal mañana?'], correct: 1 },
            { question: "They ask '¿Cómo te llamas?'. You respond:", options: ['Muy bien','Me llamo Juan','¿De dónde?','Adiós'], correct: 1 },
            { question: "Complete the chat: 'Hola' → '___' → 'Mucho gusto'", options: ['Adiós','Muy bien','Hola, ¿qué tal?','Gracias'], correct: 2 },
            { question: "How do you ask where someone is from?", options: ['¿Qué tal?','¿De dónde eres?','¿Cómo estás?','¿Quién eres?'], correct: 1 },
            { question: "End a conversation politely:", options: ['¡Hola!','Adiós, hasta mañana','Gracias, sí','¿Cómo estás?'], correct: 1 },
            { question: "Natural Spanish greeting flow is:", options: ['Soy Juan','Hola → ¿Qué tal? → Me llamo... → Hasta luego','Gracias Adiós','Mal, no'], correct: 1 }
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

// Speech recognition state
let recordedAudio = null;
let isRecording = false;
let mediaRecorder = null;
let audioContext = null;
let analyser = null;
let recognitionResults = null;

// ── Speech Recognition Functions ──
async function initializeAudioAPIs() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;

        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        mediaRecorder = new MediaRecorder(stream);
        let chunks = [];
        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
            recordedAudio = new Blob(chunks, { type: 'audio/wav' });
            chunks = [];
        };

        return true;
    } catch (err) {
        alert('Microphone access denied or not available');
        return false;
    }
}

function startRecording() {
    if (!mediaRecorder) {
        initializeAudioAPIs().then(() => {
            if (mediaRecorder) actuallyStartRecording();
        });
    } else {
        actuallyStartRecording();
    }
}

function actuallyStartRecording() {
    mediaRecorder.start();
    isRecording = true;
    recordedAudio = null;

    document.getElementById('recordBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'inline-block';
    document.getElementById('frequencyLabel').textContent = '🎙️ Recording... speak now...';

    visualizeFrequency();
}

function stopRecording() {
    if (!mediaRecorder) return;

    mediaRecorder.stop();
    isRecording = false;

    document.getElementById('recordBtn').style.display = 'inline-block';
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('frequencyLabel').textContent = '✓ Recording complete';

    setTimeout(() => {
        if (recordedAudio) {
            const audioUrl = URL.createObjectURL(recordedAudio);
            document.getElementById('recordingPlayback').src = audioUrl;
        }
    }, 100);
}

function visualizeFrequency() {
    if (!isRecording || !analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    const canvas = document.getElementById('frequencyCanvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let barHeight, x = 0;

    for (let i = 0; i < dataArray.length; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;
        const hue = 220 + (i / dataArray.length) * 40;
        ctx.fillStyle = `hsl(${hue}, 100%, ${50 + (barHeight/canvas.height)*30}%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }

    requestAnimationFrame(visualizeFrequency);
}

function checkSpeechPronunciation() {
    const currentQ = activeQuestions[activeQuestionIndex];

    if (!recordedAudio) {
        showFeedback('Please record yourself first!', false);
        return;
    }

    // Use Web Speech API to recognize speech from the recording
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showFeedback('Speech recognition not supported in your browser', false);
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.language = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript.toLowerCase();
        }
        recognitionResults = transcript;
        validatePronunciation(transcript, currentQ.expected_keywords);
    };

    recognition.onerror = (event) => {
        showFeedback(`Speech error: ${event.error}. Try again!`, false);
    };

    recognition.onend = () => {
        if (!recognitionResults) {
            showFeedback('Could not understand audio. Try again!', false);
        }
    };

    document.getElementById('frequencyLabel').textContent = '🔍 Analyzing pronunciation...';
    recognition.start();

    // Play back the recording to analyze it
    const audioUrl = URL.createObjectURL(recordedAudio);
    const audio = new Audio(audioUrl);
    audio.play();
}

function validatePronunciation(transcript, expectedKeywords) {
    const transcriptLower = transcript.toLowerCase().trim();
    const isCorrect = expectedKeywords.some(keyword =>
        transcriptLower.includes(keyword.toLowerCase().trim())
    );

    if (isCorrect) {
        showFeedback(`Perfect! You said: "${transcript}" ✓`, true);
        streak++;
        questionQueue = questionQueue.filter(i => i !== activeQuestionIndex);
        setTimeout(advanceToNextQuestion, 1100);
    } else {
        const expected = expectedKeywords[0];
        showFeedback(`Not quite. Try saying "${expected}" again!`, false);
        questionQueue.push(activeQuestionIndex);
        wrongIndices.add(activeQuestionIndex);
        streak = 0;
        setTimeout(advanceToNextQuestion, 1800);
    }
}

function showSpeechQuestion(q) {
    // Hide multiple choice, show recording UI
    document.getElementById('recordingContainer').style.display = 'block';
    document.getElementById('answersContainer').style.display = 'none';

    document.getElementById('pronunciationPrompt').textContent = q.spanish_prompt;
    let hint = `(${q.english_meaning})`;
    if (q.hint) hint += ` - Hint: ${q.hint}`;
    document.getElementById('englishHint').textContent = hint;

    // Reset recording controls
    recordedAudio = null;
    document.getElementById('recordBtn').style.display = 'inline-block';
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('frequencyLabel').textContent = 'Ready to record...';
    document.getElementById('recordingPlayback').src = '';

    const feedback = document.getElementById('feedback');
    feedback.textContent = '';
    feedback.className = 'feedback';

    // Update submit button
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Check Pronunciation';
    submitBtn.onclick = checkSpeechAnswer;
    submitBtn.classList.add('finish-btn');

    const modal = document.getElementById('questionModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
}

function checkSpeechAnswer() {
    if (!recordedAudio) {
        showFeedback('Please record yourself first!', false);
        return;
    }
    checkSpeechPronunciation();
}

// Load progress from localStorage on page load
function loadProgress() {
    const saved = localStorage.getItem('duolingoProgress');
    if (saved) {
        const data = JSON.parse(saved);
        completedCount = data.completedCount || 0;
        nextButtonIndex = data.nextButtonIndex || 0;
        buttonCompletions = data.buttonCompletions || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
}

// Save progress to localStorage
function saveProgress() {
    const data = {
        completedCount,
        nextButtonIndex,
        buttonCompletions
    };
    localStorage.setItem('duolingoProgress', JSON.stringify(data));
}

function buildButtons() {
    const path = document.getElementById('snakePath');
    path.innerHTML = '';

    for (let i = 0; i < LESSONS.length; i++) {
        const row = document.createElement('div');
        row.className = `snake-row ${SNAKE_POSITIONS[i]}`;

        const btn = document.createElement('button');
        const sectionClass = i < 5 ? 'section1' : 'section2';
        btn.className = `lesson-btn ${sectionClass}`;
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

    // Check if this is a speech question
    if (q.type === 'speech') {
        showSpeechQuestion(q);
        return;
    }

    // Multiple choice question
    document.getElementById('recordingContainer').style.display = 'none';
    document.getElementById('answersContainer').style.display = 'flex';
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

    // Update submit button for multiple choice
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Check';
    submitBtn.onclick = checkAnswer;
    submitBtn.classList.remove('finish-btn');

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

    saveProgress();
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
    localStorage.removeItem('duolingoProgress');
    closeQuestion();
    buildButtons();
    updateProgress();
}

document.getElementById('questionModal').addEventListener('click', e => {
    if (e.target.id === 'questionModal') closeQuestion();
});

loadProgress();
buildButtons();
updateProgress();
