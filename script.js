const TOTAL_BUTTONS = 10;
let completedCount = 0;
let currentSequence = [];
let nextButtonIndex = 0;

class SnakeButtonGame {
    constructor() {
        this.buttons = [];
        this.snakePath = this.generateSnakePath();
        this.initializeGame();
    }

    generateSnakePath() {
        const path = [];
        const rows = Math.ceil(Math.sqrt(TOTAL_BUTTONS));
        const cols = Math.ceil(TOTAL_BUTTONS / rows);

        const grid = [];
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = { row: i, col: j };
            }
        }

        // Create snake pattern: start middle, go down, then snake right and up
        const startRow = Math.floor(rows / 2);
        const startCol = Math.floor(cols / 2);

        let currentRow = startRow;
        let currentCol = startCol;
        const visited = new Set();

        for (let i = 0; i < TOTAL_BUTTONS; i++) {
            const key = `${currentRow},${currentCol}`;
            if (!visited.has(key)) {
                visited.add(key);
                path.push({ row: currentRow, col: currentCol, index: i });
            }

            // Move in snake pattern
            if (i === 0) {
                currentRow += 1; // Start going down
            } else if (i === 2) {
                currentCol += 1; // Move right
            } else if (i === 3) {
                currentRow -= 1; // Go up
            } else if (i === 5) {
                currentCol += 1; // Move right
            } else if (i === 6) {
                currentRow += 1; // Go down
            } else if (i < TOTAL_BUTTONS - 1) {
                if ((i - 1) % 2 === 0) {
                    currentCol += 1;
                } else {
                    currentRow = currentRow === startRow ? currentRow + 1 : currentRow - 1;
                }
            }
        }

        return path;
    }

    initializeGame() {
        const grid = document.getElementById('buttonsGrid');
        grid.innerHTML = '';

        const gridColumn = Math.ceil(Math.sqrt(TOTAL_BUTTONS));
        grid.style.gridTemplateColumns = `repeat(auto-fit, minmax(80px, 1fr))`;
        grid.style.maxWidth = `${gridColumn * 100}px`;

        for (let i = 0; i < TOTAL_BUTTONS; i++) {
            const button = document.createElement('button');
            button.className = 'button-item';
            button.textContent = i + 1;
            button.dataset.index = i;
            button.addEventListener('click', (e) => this.handleButtonClick(e, i));

            grid.appendChild(button);
            this.buttons.push(button);
        }

        this.shuffleButtons();
    }

    shuffleButtons() {
        // Create a snake-like visual arrangement
        const positions = [];
        const rows = 2;
        const cols = 5;

        // Snake pattern: row 1 left to right, row 2 right to left
        for (let row = 0; row < rows; row++) {
            if (row % 2 === 0) {
                for (let col = 0; col < cols; col++) {
                    positions.push({ row, col, order: row * cols + col });
                }
            } else {
                for (let col = cols - 1; col >= 0; col--) {
                    positions.push({ row, col, order: row * cols + (cols - 1 - col) });
                }
            }
        }

        const grid = document.getElementById('buttonsGrid');

        // Reorder buttons by snake pattern
        const buttonsCopy = [...this.buttons];
        positions.forEach((pos, index) => {
            if (index < TOTAL_BUTTONS) {
                const randomButton = buttonsCopy[index];
                const gridIndex = index;
                grid.appendChild(randomButton);
            }
        });
    }

    handleButtonClick(e, index) {
        const button = e.target;

        if (button.classList.contains('completed')) {
            alert('Already completed! Try a different button.');
            return;
        }

        if (index !== nextButtonIndex) {
            alert(`Wrong! Click button ${nextButtonIndex + 1} next.`);
            button.style.animation = 'shake 0.3s';
            setTimeout(() => {
                button.style.animation = '';
            }, 300);
            return;
        }

        button.classList.add('completed');
        nextButtonIndex++;
        completedCount++;

        this.updateProgress();

        if (completedCount === TOTAL_BUTTONS) {
            setTimeout(() => {
                alert('🎉 Lesson Complete! Great job!');
            }, 300);
        }
    }

    updateProgress() {
        const percentage = (completedCount / TOTAL_BUTTONS) * 100;
        document.getElementById('progressFill').style.width = `${percentage}%`;
        document.getElementById('progress').textContent = `Progress: ${completedCount}/${TOTAL_BUTTONS}`;
    }
}

function resetGame() {
    completedCount = 0;
    nextButtonIndex = 0;
    game = new SnakeButtonGame();
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
        75% { transform: translateX(-10px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(style);

let game = new SnakeButtonGame();
