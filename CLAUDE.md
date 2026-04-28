# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Duolingo Spanish Greetings** - A single-page web application that teaches Spanish greetings through an interactive, gamified learning experience. The 10 lessons follow a **progressive curriculum** that builds from individual words to full conversational sentences. Users click buttons arranged in a visual "snake path" to start each lesson.

**Key constraint:** No external dependencies, no build process, pure vanilla HTML/CSS/JavaScript.

## Architecture

### Game Mechanics

The core loop follows a **sequential unlock pattern with mastery levels**:
1. User starts with only button #1 enabled
2. Clicking a button opens a modal with that lesson's multiple-choice questions (5-6 each)
3. Wrong answers are pushed to the end of the queue and retried later
4. Once every question is answered correctly, a "Session Complete" celebration screen appears
5. Pressing "Finish Session" closes the modal, marks one of the four progress-ring segments around the button, and unlocks the next button (on first completion only)
6. Replaying a lesson fills additional segments — at 4/4 completions the button shows a trophy in its center plus a star badge

**Lesson progression (words → sentences):**
| Button | Title | Focus |
|--------|-------|-------|
| 1 | Greeting Words | Single greeting words: Hola, Adiós, Gracias, Sí, Perdón |
| 2 | Sentence Building Words | Vocabulary: Buenos, días, tardes, noches, hasta, mañana |
| 3 | Two-Word Phrases | Buenos días, Buenas tardes, Hasta luego, Mucho gusto |
| 4 | Pronouns & Verbs | Yo, tú, soy, estoy, usted, mi |
| 5 | Short Phrases | Me llamo, Soy de, Soy de España |
| 6 | Asking Questions | ¿Cómo estás?, ¿Cómo te llamas?, ¿De dónde eres? |
| 7 | Quick Responses | Bien gracias, Muy bien, Más o menos |
| 8 | Combined Greetings | Hola ¿qué tal?, Buenos días ¿cómo estás? |
| 9 | Introducing Yourself | Hola, me llamo Juan / Mucho gusto, soy María |
| 10 | Full Greeting Conversations | Complete multi-sentence greetings |

**Snake Path Layout:** 10 colored circular buttons positioned in a winding path using flexbox + padding offsets:
- Row 1: Center
- Row 2: Right
- Row 3: Far right
- Row 4: Right
- Row 5: Center
- Row 6: Left
- Row 7: Far left
- Row 8: Left
- Row 9: Center
- Row 10: Right

### State Management (script.js)

Core state variables:
- `completedCount` (0-10) — Number of lessons completed at least once (drives progress bar)
- `nextButtonIndex` (0-9) — Highest unlocked button index; clicking past this is blocked
- `buttonCompletions` (length-10 array of 0-4) — Per-button mastery count (drives ring/trophy/star)
- `activeLessonIndex` (0-9 or null) — Which lesson's modal is open
- `activeQuestionIndex` (number) — Index into the current lesson's `questions` array
- `selectedAnswer` (0-3 or null) — User's answer selection
- `questionQueue` (array of indices) — Remaining questions to answer in this session; wrong answers get pushed to the end
- `wrongIndices` (Set of indices) — Tracks which questions the user got wrong (used for "retry" label)

### Data Structure

**LESSONS array:** 10 lesson objects, each containing:
```javascript
{
  title: "Greeting Words",
  questions: [
    {
      question: "How do you say 'Hello'?",
      options: ['Hola', 'Adiós', 'Gracias', 'Sí'],
      correct: 0  // index of correct answer
    },
    // ... typically 5-6 questions per lesson
  ]
}
```

Most lessons hold 5-6 questions. The number of questions per lesson is not fixed — `questionQueue` is built from whatever `questions.length` is.

**SNAKE_POSITIONS array:** String classnames mapped 1:1 to LESSONS:
- `'pos-center'`, `'pos-right'`, `'pos-far-right'`, `'pos-left'`, `'pos-far-left'`
- Used by CSS `.snake-row` class to position buttons via padding

### Function Flow

1. **buildButtons()** — Iterates `LESSONS`, creates a `.snake-row` per lesson, then a `.lesson-btn`. Each button contains:
   - A `.button-number` span (the lesson number)
   - A `.button-trophy` span (🏆, hidden until 4/4 mastery)
   - `data-index` and `data-completions` attributes
2. **onButtonClick(i)** — Validates `i <= nextButtonIndex` (already-unlocked buttons can be replayed). Initializes `questionQueue` from the lesson's questions and opens the modal.
3. **showCurrentQuestion()** — Renders modal title (with retry indicator if applicable), question text, and 4 answer options. Updates the "(N left)" counter.
4. **selectAnswer(idx)** — Toggles `.selected` class on the chosen option.
5. **checkAnswer()** — Validates against `questions[activeQuestionIndex].correct`:
   - Correct: highlights green, removes question from queue, advances after 1100ms
   - Incorrect: highlights wrong + correct answer, pushes question to end of queue, advances after 1800ms
6. **advanceToNextQuestion()** — Pulls next index off `questionQueue`. When queue is empty, calls `showSessionComplete()` instead.
7. **showSessionComplete()** — Replaces modal body with celebration screen (🏆 trophy + lesson title) and swaps the Submit button for "Finish Session".
8. **finishLesson()** — Restores submit button, increments `buttonCompletions[i]` (capped at 4), updates `data-completions` attribute (drives ring/trophy/star CSS), increments `completedCount`/`nextButtonIndex` only on first completion, updates progress bar, closes modal.
9. **resetGame()** — Clears all state including `buttonCompletions`, rebuilds buttons, resets progress.

### CSS Strategy

- **Flexbox layout:** `.snake-row` uses `justify-content: center` + `padding-left`/`padding-right` to offset buttons
- **Color classes:** `.c0` through `.c9` with unique gradient backgrounds + colored bottom shadows
- **Bob animation:** All buttons run `@keyframes bob` (1.6s) — a double-bounce up to -14px with a slight scale. Each row has a staggered `animation-delay` (0s through 1.8s) so they don't move in unison. Hover/active stop the animation and apply a transform.
- **Progress rings:** `.lesson-btn::before` is a `conic-gradient` ring sized 96×96 around the 80×80 button. Selectors like `.lesson-btn[data-completions="1"]::before` fill 90°/180°/270°/360° of the ring in green based on completion count.
- **Trophy in center:** When `data-completions="4"`, CSS hides `.button-number` and shows `.button-trophy` (🏆) instead.
- **Star badge:** When `data-completions="4"`, `.lesson-btn::after` shows ⭐ at the top-right with `starPop` (entry) + `starWiggle` (continuous) animations.
- **Modal visibility:** Hidden by inline `style="display:none"` + toggled via `.show` class and JS `display: flex`
- **Responsive:** Breakpoint at 480px reduces button size and adjusts padding offsets

### Why Flexbox Over Grid?

Initial attempts used CSS Grid with absolute positioning, but this caused browsers to cache stale versions and buttons to disappear. Flexbox with margin/padding offsets is simpler, more reliable, and avoids positioning gotchas.

## Development Workflow

### Running Locally

No build step required:
```bash
# Option 1: Open directly
open index.html

# Option 2: Serve locally (for GitHub Pages testing)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Manual Testing Checklist

- [ ] 10 colored buttons visible in winding snake path
- [ ] All buttons gently bob with staggered timing
- [ ] Only button #1 clickable initially
- [ ] Clicking button #1 opens modal titled "Greeting Words"
- [ ] Each question displays 4 options; selecting + submitting works
- [ ] Wrong answers show "We'll come back to this one!" and reappear at the end of the queue (with "retry" label)
- [ ] Once all questions correct, the celebration screen appears with a trophy + "Finish Session" button
- [ ] Finishing fills 1/4 of the progress ring around the button and unlocks button #2
- [ ] Replaying a lesson fills additional ring segments
- [ ] At 4/4 completions the button shows a centered 🏆 trophy and a corner ⭐ star
- [ ] Progress bar fills to 10% after first lesson, 100% after all 10
- [ ] Reset button clears all state including completion counts
- [ ] Mobile (480px viewport) — buttons shrink and padding adjusts

### Common Tasks

**Modify lesson content:**
- Edit the `questions` array of the relevant lesson in `LESSONS`
- Each question needs `question`, `options` (array of 4), and `correct` (0-3)
- Lessons can have any number of questions (5-6 is typical)

**Add a new lesson:**
1. Insert new object into `LESSONS` array
2. Insert matching position class into `SNAKE_POSITIONS` at the same index
3. Update `buttonCompletions` initial array length (add another `0`)
4. Add a `.lesson-btn.cN` color class in CSS for the new index
5. Add a staggered animation delay rule for `.snake-row:nth-of-type(N) .lesson-btn`

**Change button colors:**
- Edit `.lesson-btn.cN` CSS rules in style.css (e.g., `.lesson-btn.c0` for button 1)
- JS assigns class `c0` through `c9` to each button in buildButtons()

**Adjust snake path layout:**
- Modify `SNAKE_POSITIONS` array values (e.g., change some 'pos-right' to 'pos-center')
- Adjust `.snake-row.pos-right { padding-left: 80px; }` values in CSS if needed

**Fix modal positioning (if it leaks onto page):**
- Ensure `.modal` has `display: none` in inline style AND CSS
- Check that `closeQuestion()` removes `.show` class and sets `display = 'none'`

**Tweak the bob animation:**
- Edit `@keyframes bob` in style.css to change the bounce height/scale
- Edit the `1.6s ease-in-out infinite` shorthand on `.lesson-btn` to change speed

## Deployment

**Host:** GitHub Pages (any static hosting works)

**Branch:** `main` contains production code

**Cache busting:** CSS/JS links include query params (currently `style.css?v=12`, `script.js?v=11`). **Increment these whenever you push changes** so browsers fetch fresh files.

```bash
git add index.html style.css script.js
git commit -m "Description of changes"
git push origin main
# GitHub Pages auto-deploys; takes ~1 minute
```

**Feature branch:** Development happens on `claude/duolingo-snake-buttons-fbMMr` before merging to main.

## Implementation Notes

### Why incorrect answers re-queue instead of failing the lesson?
Duolingo-style lesson reinforces learning. Wrong answers go to the end of the queue and the user has to answer them correctly before the lesson completes. The modal title shows "(N left)" plus a "retry" tag for repeated questions.

### Why can already-unlocked buttons be re-clicked?
Replaying a lesson is how the user fills the 4 mastery segments around a button. The check is `i > nextButtonIndex` (locked), not `i !== nextButtonIndex` (forced linear).

### What's NOT implemented?
- Persistence (localStorage would be needed to save progress across refreshes)
- Audio/haptics feedback
- Scoring/points system
- Keyboard navigation or accessibility labels
- Leaderboards or social features

These are potential enhancements but not required for MVP.

### Known Issues
- No protection against rapid clicks; clicking multiple times before modal closes may cause state issues (add debouncing if needed)
- Mobile layout squishes smaller buttons but remains functional
- Progress resets on page reload (by design; localStorage optional)

## Files to Know

| File | Purpose |
|------|---------|
| `index.html` | Markup: header, snake-path container, progress bar, modal form |
| `script.js` | Game logic: LESSONS data, state variables, core functions |
| `style.css` | Layout: flexbox rows, button colors, ring/trophy/star, modal styling, animations |

## Session Context

Recent feature additions:
- **Lesson progression rewrite** — Lessons now teach words first, then 2-word phrases, then short phrases, then full conversational greetings by lesson 10
- **Trophy in button center** — `data-completions="4"` swaps the lesson number for a 🏆 trophy
- **Star badge** — Star (⭐) appears at top-right of fully-mastered buttons with pop + wiggle animations
- **Bob animation** — Buttons bounce gently with staggered timing for life and energy
- **4-segment progress ring** — Conic-gradient ring fills based on completion count (0-4)
- **Retry queue** — Wrong answers go back into the question queue until answered correctly
- **Session complete screen** — Celebration screen with "Finish Session" button before the modal closes
