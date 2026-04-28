# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Duolingo Spanish Greetings** - A single-page web application that teaches Spanish greetings and common phrases through an interactive, gamified learning experience. Users progress through 10 sequential lessons (each with 3 multiple-choice questions) by clicking buttons arranged in a visual "snake path" down the screen. Each lesson can be replayed up to 4 times to "master" it, with visual progress rings showing completion.

**Key constraint:** No external dependencies, no build process, pure vanilla HTML/CSS/JavaScript.

## Architecture

### Game Mechanics

The core loop follows a **sequential unlock + retry system**:
1. User starts with only button #1 enabled
2. Clicking a button opens a modal with 3 Spanish questions
3. **Wrong answers get retried at the end** - incorrect questions are pushed to the back of a queue instead of auto-advancing
4. User must answer every question correctly to complete the lesson
5. Session Complete screen appears with "Finish Session" button
6. Clicking "Finish Session" marks the lesson complete (fills 1 segment of the progress ring) and returns to home page
7. User can retry any unlocked button to fill more segments (up to 4 per button for full mastery)
8. Progress bar fills based on how many of the 10 buttons have been completed at least once

**Progress Ring System:** Each button displays a 4-segment ring around it (using conic-gradient):
- Default: light gray/transparent segments
- 1st completion: 1 segment glows green (top-right)
- 2nd completion: 2 segments glow (right side)
- 3rd completion: 3 segments glow (right + bottom)
- 4th completion: full ring glows green (mastery)

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
- `completedCount` (0-10) - Number of lessons completed at least once (unlocks next button)
- `nextButtonIndex` (0-9) - Next button to unlock; only buttons ≤ this index are clickable
- `buttonCompletions` (array of 0-4) - Track how many times each button has been completed (for ring segments)
- `activeLessonIndex` (0-9 or null) - Which lesson's modal is currently open
- `activeQuestionIndex` (0-2) - Current question index within the lesson
- `selectedAnswer` (0-3 or null) - User's selected answer option
- `questionQueue` (array) - Queue of question indices still to be answered (for retry system)
- `wrongIndices` (Set) - Indices of questions the user got wrong in this attempt (used to show "retry" label)

### Data Structure

**LESSONS array:** 10 lesson objects, each containing:
```javascript
{
  title: "Saying Hello",
  questions: [
    {
      question: "How do you say 'Hello' in Spanish?",
      options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
      correct: 0  // index of correct answer
    },
    // ... 2 more questions
  ]
}
```

**SNAKE_POSITIONS array:** String classnames mapped 1:1 to LESSONS:
- 'pos-center', 'pos-right', 'pos-far-right', etc.
- Used by CSS `.snake-row` class to position buttons via padding

### Function Flow

1. **buildButtons()** - Creates DOM: iterates over LESSONS, creates rows + buttons, applies snake-position classes and data-completions attribute
2. **onButtonClick(i)** - Validates that button is unlocked (`i <= nextButtonIndex`), initializes questionQueue, opens first question
3. **showCurrentQuestion()** - Renders modal with current question + 4 answer options; displays "X left" in title or "retry (X left)" if retrying
4. **selectAnswer(idx)** - Toggles `.selected` class on answer option
5. **checkAnswer()** - Validates answer against `questions[activeQuestionIndex].correct`:
   - **Correct:** Shows "¡Correcto! 🎉", removes from queue, calls `advanceToNextQuestion()`
   - **Incorrect:** Shows correct answer highlighted, moves question to back of queue, calls `advanceToNextQuestion()`
6. **advanceToNextQuestion()** - Checks if `questionQueue` is empty:
   - If empty: calls `showSessionComplete()`
   - If not: loads next question from queue and calls `showCurrentQuestion()`
7. **showSessionComplete()** - Displays celebration screen with trophy, lesson title, and green "Finish Session" button
8. **finishLesson()** - Increments `buttonCompletions[activeLessonIndex]`, updates button's `data-completions` attribute (updates ring), increments `completedCount` and `nextButtonIndex` on first completion only, closes modal
9. **resetGame()** - Clears all state including `buttonCompletions`, rebuilds buttons, resets progress bar

### CSS Strategy

- **Flexbox layout:** `.snake-row` uses `justify-content: center` + `padding-left`/`padding-right` to offset buttons
- **4-segment progress ring:** `.lesson-btn::before` uses conic-gradient; different gradients for `[data-completions="1|2|3|4"]`
- **Color classes:** `.c0` through `.c9` with unique gradient backgrounds
- **Modal visibility:** Hidden by inline `style="display:none"` + toggled via `.show` class and JS `display: flex`
- **Session complete screen:** Uses `.completion-screen` container with `.trophy` animation (bounce), `.completion-title`, `.completion-subtitle`
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

- [ ] 10 colored buttons visible in snake path
- [ ] Only button #1 clickable initially; buttons 2-10 show "Click button 1 next!"
- [ ] Clicking button #1 opens modal with "Saying Hello" lesson (3 left)
- [ ] All 3 questions display with 4 options each
- [ ] Getting a question wrong: shows correct answer, says "We'll come back to this one"
- [ ] Wrong question appears again at end with "— retry (X left)" label
- [ ] After all correct answers, "🎉 Session Complete!" screen appears
- [ ] "Finish Session" button returns to home page
- [ ] Button #1 now shows 1 green segment in ring; button #2 is unlocked
- [ ] Can click button #1 again to retry and fill 2nd segment
- [ ] Progress bar filled to 10% after first completion of lesson 1
- [ ] Retrying button #1 a 3rd and 4th time fills remaining segments
- [ ] Reset button clears all progress and button completions
- [ ] Mobile (480px viewport) - buttons shrink and padding adjusts, ring scales proportionally

### Common Tasks

**Add a new lesson:**
1. Insert new object into `LESSONS` array (position N)
2. Insert matching position class into `SNAKE_POSITIONS` at index N
3. Keep arrays in sync: `LESSONS[i]` always corresponds to `SNAKE_POSITIONS[i]`

**Modify a lesson's questions:**
- Edit the `questions` array of that lesson object
- Keep 3 questions per lesson; ensure `correct` index matches one of the 4 options
- Note: Users who got a question wrong will see it again at the end

**Change button colors:**
- Edit `.lesson-btn.cN` CSS rules in style.css (e.g., `.lesson-btn.c0` for button 1)
- JS assigns class `c0` through `c9` to each button in buildButtons()

**Adjust snake path layout:**
- Modify `SNAKE_POSITIONS` array values (e.g., change some 'pos-right' to 'pos-center')
- Adjust `.snake-row.pos-right { padding-left: 80px; }` values in CSS if needed

**Adjust progress ring sizing:**
- Ring size and offset are in `.lesson-btn::before` CSS (currently 96px wide, -8px offset)
- Modify `width: 96px; height: 96px;` and `top: -8px; left: -8px;` to change ring appearance

**Fix modal positioning (if it leaks onto page):**
- Ensure `.modal` has `display: none` in inline style AND CSS
- Check that `closeQuestion()` removes `.show` class and sets `display = 'none'`

## Deployment

**Host:** GitHub Pages (any static hosting works)

**Branch:** `main` contains production code

**Cache busting:** CSS/JS links include query params (`style.css?v=8`, `script.js?v=8`). Increment these when pushing changes so browsers fetch fresh files.

```bash
git add index.html style.css script.js
git commit -m "Description of changes"
git push origin main
# GitHub Pages auto-deploys; takes ~1 minute
```

**Feature branch:** Development happens on `claude/duolingo-snake-buttons-fbMMr` before merging to main.

## Implementation Notes

### Why wrong answers get retried instead of auto-advancing?
Duolingo-style learning keeps momentum while ensuring mastery. User sees the correct answer highlighted, then the question gets re-queued. This reinforces weak areas without stopping the lesson flow.

### Session Complete screen design
After all 3 questions are answered correctly (including any retries), the modal transforms into a celebration screen rather than auto-closing. User explicitly clicks "Finish Session" to return home. This satisfying UX moment reinforces achievement and unlocks the next button.

### Why allow retrying completed buttons?
The 4-segment ring system lets users "master" lessons by replaying them. This creates multiple engagement opportunities and lets learners self-assess readiness before moving forward.

### What's NOT implemented?
- Persistence (localStorage would be needed to save progress across refreshes)
- Audio/haptics feedback
- Scoring/points system
- Keyboard navigation or accessibility labels
- Leaderboards or social features

These are potential enhancements but not required for MVP.

### Known Issues
- No protection against rapid clicks; clicking multiple times before modal fully renders may cause state issues (add debouncing if needed)
- Mobile layout squishes smaller buttons but remains functional
- Progress resets on page reload (by design; localStorage optional for persistence)
- Ring segments may overlap on very small screens; adjust offsets in CSS if needed

## Files to Know

| File | Purpose |
|------|---------|
| `index.html` | Markup: header, snake-path container, progress bar, question modal, session complete screen |
| `script.js` | Game logic: LESSONS data, state variables, queue/retry system, completion tracking |
| `style.css` | Layout: flexbox rows, button colors, 4-segment progress rings, modal styling, animations |
| `.git/` | Version control; current branch: main |

## Session Context

Major evolution (most recent first):
- Added 4-segment progress ring around each button; adjusted sizing to prevent overlaps
- Users can now retry lessons to fill more segments (up to 4 per button)
- Implemented wrong-answer retry queue: incorrect answers get re-queued at end of lesson
- Added Session Complete screen with "Finish Session" button before returning home
- Buttons unlock sequentially, but all unlocked buttons are replayable
- Fixed layout with flexbox + padding instead of fragile absolute positioning
- Added multi-question lessons (3 questions per button)
- Added cache-busting query params to prevent stale CSS serving
