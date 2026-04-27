# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Duolingo Spanish Greetings** - A single-page web application that teaches Spanish greetings and common phrases through an interactive, gamified learning experience. Users progress through 10 sequential lessons (each with 3 multiple-choice questions) by clicking buttons arranged in a visual "snake path" down the screen.

**Key constraint:** No external dependencies, no build process, pure vanilla HTML/CSS/JavaScript.

## Architecture

### Game Mechanics

The core loop follows a **sequential unlock pattern**:
1. User starts with only button #1 enabled
2. Clicking a button opens a modal with 3 Spanish questions
3. After answering all 3 questions (correct or incorrect), the lesson is marked complete and next button unlocks
4. Progress bar fills incrementally; reset button clears all progress

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
- `completedCount` (0-10) - Number of finished lessons
- `nextButtonIndex` (0-9) - Only this button is clickable; others are locked
- `activeLessonIndex` (0-9 or null) - Which lesson's modal is open
- `activeQuestionIndex` (0-2) - Current question within the lesson
- `selectedAnswer` (0-3 or null) - User's answer selection

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

1. **buildButtons()** - Creates DOM: iterates over LESSONS, creates rows + buttons, applies snake-position classes
2. **onButtonClick(i)** - Validates that `i === nextButtonIndex`, opens lesson if valid
3. **showCurrentQuestion()** - Renders modal with current question + 4 answer divs
4. **selectAnswer(idx)** - Toggles `.selected` class on answer option
5. **checkAnswer()** - Validates answer against `questions[activeQuestionIndex].correct`:
   - Correct: Shows feedback, auto-advances to next question after 1100ms
   - Incorrect: Shows correct answer highlighted, auto-advances after 1800ms
6. **finishLesson()** - Marks button `.completed`, increments counters, updates progress bar
7. **resetGame()** - Clears all state, rebuilds buttons, resets progress bar

### CSS Strategy

- **Flexbox layout:** `.snake-row` uses `justify-content: center` + `padding-left`/`padding-right` to offset buttons
- **Color classes:** `.c0` through `.c9` with unique gradient backgrounds
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

- [ ] 10 colored buttons visible in snake path
- [ ] Only button #1 clickable initially
- [ ] Clicking button #1 opens modal with "Saying Hello" lesson
- [ ] All 3 questions display with 4 options each
- [ ] Selecting answer + submitting moves to next question
- [ ] After 3 questions, modal closes and button #1 shows checkmark
- [ ] Button #2 becomes clickable
- [ ] Progress bar fills to 10% after lesson 1
- [ ] Reset button clears all progress and rebuilds buttons
- [ ] Mobile (480px viewport) - buttons shrink and padding adjusts

### Common Tasks

**Add a new lesson:**
1. Insert new object into `LESSONS` array (position N)
2. Insert matching position class into `SNAKE_POSITIONS` at index N
3. Keep arrays in sync: `LESSONS[i]` always corresponds to `SNAKE_POSITIONS[i]`

**Modify a lesson's questions:**
- Edit the `questions` array of that lesson object
- Keep 3 questions per lesson; ensure `correct` index matches one of the 4 options

**Change button colors:**
- Edit `.lesson-btn.cN` CSS rules in style.css (e.g., `.lesson-btn.c0` for button 1)
- JS assigns class `c0` through `c9` to each button in buildButtons()

**Adjust snake path layout:**
- Modify `SNAKE_POSITIONS` array values (e.g., change some 'pos-right' to 'pos-center')
- Adjust `.snake-row.pos-right { padding-left: 80px; }` values in CSS if needed

**Fix modal positioning (if it leaks onto page):**
- Ensure `.modal` has `display: none` in inline style AND CSS
- Check that `closeQuestion()` removes `.show` class and sets `display = 'none'`

## Deployment

**Host:** GitHub Pages (any static hosting works)

**Branch:** `main` contains production code

**Cache busting:** CSS/JS links include query params (`style.css?v=4`, `script.js?v=4`). Increment these when pushing changes so browsers fetch fresh files.

```bash
git add index.html style.css script.js
git commit -m "Description of changes"
git push origin main
# GitHub Pages auto-deploys; takes ~1 minute
```

**Feature branch:** Development happens on `claude/duolingo-snake-buttons-fbMMr` before merging to main.

## Implementation Notes

### Why incorrect answers auto-advance?
Duolingo-style lesson keeps momentum; user sees the correct answer highlighted for 1.8s, then moves on. Full lesson completion happens regardless of answer correctness.

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
| `style.css` | Layout: flexbox rows, button colors, modal styling, animations |
| `.git/` | Version control (8 commits documenting evolution) |

## Session Context

Last major changes:
- Fixed broken absolute positioning layout → switched to flexbox + padding
- Added multi-question lessons (3 questions per button)
- Added cache-busting query params to prevent stale CSS serving
- Modal now stays hidden via inline style + CSS combination
