const QUESTIONS = [
    {
        id: 1,
        question: "How do you say 'Hello' in Spanish?",
        spanish: "Hola",
        options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
        correctIndex: 0
    },
    {
        id: 2,
        question: "How do you greet someone formally?",
        spanish: "Buenos días",
        options: ['Buenos días', 'Buenas noches', 'Buenas tardes', 'Hola'],
        correctIndex: 0
    },
    {
        id: 3,
        question: "What does 'Buenas tardes' mean?",
        spanish: "Good afternoon",
        options: ['Good night', 'Good afternoon', 'Good morning', 'Hello'],
        correctIndex: 1
    },
    {
        id: 4,
        question: "How do you say 'Good evening'?",
        spanish: "Buenas noches",
        options: ['Buenos días', 'Buenas tardes', 'Buenas noches', 'Hola'],
        correctIndex: 2
    },
    {
        id: 5,
        question: "What do you say when meeting someone?",
        spanish: "Mucho gusto",
        options: ['Adiós', 'Mucho gusto', 'Gracias', 'De nada'],
        correctIndex: 1
    },
    {
        id: 6,
        question: "How do you say 'How are you?' formally?",
        spanish: "¿Cómo está usted?",
        options: ['¿Qué tal?', '¿Cómo estás?', '¿Cómo está usted?', 'Bien'],
        correctIndex: 2
    },
    {
        id: 7,
        question: "What is an informal way to say 'What\\'s up?'",
        spanish: "¿Qué tal?",
        options: ['¿Qué tal?', '¿Cómo está?', '¿Quién eres?', 'Encantado'],
        correctIndex: 0
    },
    {
        id: 8,
        question: "How do you respond 'I\\'m fine, thank you'?",
        spanish: "Bien, gracias",
        options: ['Mal', 'Bien, gracias', 'Adiós', 'Hola'],
        correctIndex: 1
    },
    {
        id: 9,
        question: "What does 'Encantado' mean?",
        spanish: "Pleased to meet you",
        options: ['Goodbye', 'Pleased to meet you', 'Thank you', 'You\\'re welcome'],
        correctIndex: 1
    },
    {
        id: 10,
        question: "How do you say 'Nice to meet you'?",
        spanish: "Es un placer conocerte",
        options: ['Adiós', 'Hola', 'Es un placer conocerte', 'Hasta luego'],
        correctIndex: 2
    }
];

let completedCount = 0;
let nextButtonIndex = 0;
let currentQuestion = null;
let selectedAnswer = null;

class SpanishGreetingGame {
    constructor() {
        this.buttons = [];
        this.answeredQuestions = new Set();
        this.initializeGame();
    }

    initializeGame() {
        const grid = document.getElementById('buttonsGrid');
        grid.innerHTML = '';

        const gridColumn = 5;
        grid.style.gridTemplateColumns = `repeat(auto-fit, minmax(80px, 1fr))`;
        grid.style.maxWidth = `${gridColumn * 100}px`;

        for (let i = 0; i < 10; i++) {
            const button = document.createElement('button');
            button.className = 'button-item';
            button.textContent = i + 1;
            button.dataset.index = i;
            button.addEventListener('click', (e) => this.handleButtonClick(e, i));

            grid.appendChild(button);
            this.buttons.push(button);
        }
    }

    handleButtonClick(e, index) {
        const button = e.target;

        if (button.classList.contains('completed')) {
            return;
        }

        if (index !== nextButtonIndex) {
            alert(`Start with question ${nextButtonIndex + 1}!`);
            return;
        }

        currentQuestion = QUESTIONS[index];
        selectedAnswer = null;
        this.showQuestion(QUESTIONS[index]);
    }

    showQuestion(question) {
        const modal = document.getElementById('questionModal');
        document.getElementById('questionTitle').textContent = `Question ${question.id}/10`;
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('feedback').textContent = '';
        document.getElementById('feedback').className = 'feedback';

        const answersContainer = document.getElementById('answersContainer');
        answersContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const div = document.createElement('div');
            div.className = 'answer-option';
            div.textContent = option;
            div.dataset.index = index;
            div.addEventListener('click', () => selectAnswer(index));
            answersContainer.appendChild(div);
        });

        modal.classList.add('show');
    }

    updateProgress() {
        const percentage = (completedCount / 10) * 100;
        document.getElementById('progressFill').style.width = `${percentage}%`;
        document.getElementById('progress').textContent = `Progress: ${completedCount}/10`;
    }
}

function selectAnswer(index) {
    selectedAnswer = index;
    const options = document.querySelectorAll('.answer-option');
    options.forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === index) {
            opt.classList.add('selected');
        }
    });
}

function checkAnswer() {
    if (selectedAnswer === null) {
        alert('Please select an answer!');
        return;
    }

    const question = currentQuestion;
    const isCorrect = selectedAnswer === question.correctIndex;

    const feedback = document.getElementById('feedback');
    const options = document.querySelectorAll('.answer-option');

    if (isCorrect) {
        feedback.textContent = '✓ Correct! Great job!';
        feedback.className = 'feedback show correct';
        options[selectedAnswer].classList.add('correct');

        setTimeout(() => {
            closeQuestion();
            const buttonIndex = question.id - 1;
            const button = document.querySelector(`[data-index="${buttonIndex}"]`);
            button.classList.add('completed');
            completedCount++;
            nextButtonIndex++;
            game.updateProgress();

            if (completedCount === 10) {
                setTimeout(() => {
                    alert('🎉 Lesson Complete! ¡Excelente!');
                }, 300);
            }
        }, 1500);
    } else {
        feedback.textContent = '✗ Incorrect. Try again!';
        feedback.className = 'feedback show incorrect';
        options[selectedAnswer].classList.add('incorrect');
        options[question.correctIndex].classList.add('correct');
    }
}

function closeQuestion() {
    const modal = document.getElementById('questionModal');
    modal.classList.remove('show');
    currentQuestion = null;
    selectedAnswer = null;
}

function resetGame() {
    completedCount = 0;
    nextButtonIndex = 0;
    currentQuestion = null;
    selectedAnswer = null;
    closeQuestion();
    game = new SpanishGreetingGame();
    game.updateProgress();
}

let game = new SpanishGreetingGame();
game.updateProgress();

// Close modal on background click
document.getElementById('questionModal').addEventListener('click', (e) => {
    if (e.target.id === 'questionModal') {
        closeQuestion();
    }
});
