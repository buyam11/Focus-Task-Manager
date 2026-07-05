## Focus - Task Manager
A dark-mode task manager built with Next.js, demonstrating React functions: components, props, state, effect, lifting state up.

## Getting Started

Step 1: Clone the repository

```bash
git clone <repository-url>
```

Step 2: Navigate to project resume

```bash
cd task-manager-project
```

Step 3: Install dependencies

```bash
npm install
```

Step 4: Start the server

```bash
npm run dev
```

Step 5: Open the broswer

Open [http://localhost:3000] with your browser to see the result.

## Features Implemented
- Add tasks with a controlled form (blank submissions are ignored)
- Toggle tasks done/undone with a visual strikethrough
- Delete individual tasks
- Filter by All/Active/Done with live countsper filter
- Stats bar total, active, and completed counts
- Clear all completed tasks in one click
- Tasks persist across browser refreshes via localStorage
- Styled with TailWind CSS

## Project Structure

src/
    app/
        page.js         - Client component: renders TaskBoard
        layout.js       - Root layout: sets font and dark background
        globals.css     - Tailwind directives only
    components/
        TaskBoard.js    - Client component: owns ALL state and handlers
        TaskStats.js    - Displays live counts and clear button
        AddTaskForm.js  - Controlled form for adding tasks
        FilterBar.js    - All / Active/ Done filter buttons
        TaskList.js     - Renders the filtered tasks
        TaskCard.js     - Single task row with toggle and delete

## AI Usage Log
- *Generate scaffolding, then read it line by line* - asked Claude to create each component with comments that explain each line,then I relay how I I interpreted each explanation in simpler terms back to the AI to see if they make sense
 - *Ask conceptual questions* - asked Claude questions about why the code works (e.g. how the dependency array works, immutable vs. immutable updates, etc.)
- *Generate Tailwind* - asked Claude what Tailwind variations would help me create a dark mode task manager
