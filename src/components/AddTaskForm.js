// ==========================================================================================================
// COMPONENT: AddTaskForm
// PURPOSE: A controlled form that lets the user type a new task and submit it. It does NOT 
//          create the task list, rather it signals upwards to TaskBoard via the onAdd prop. 
//          Once submitted, TaskBoard handles the state update.
// TYPE: 
//   Client Component ('use client' because this file uses useState and handles form events)
//   Controlled component (input comes from state)  
// PROPS: 
//    onAdd (function) - callback defined in TaskBoard, which is called with the trimmed title string
//                       on submission
// ==========================================================================================================

'use client'; 

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  
  // title is in LOCAL state here because only this component should know what the user is typing.
  // TaskBoard only needs to know the final value being submitted
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();        // Stops the browser's default full-page reload on submit.

    if (!title.trim()) return; // guard: ignore empty/whitespace-only submissions.
                               // .trim() removes leading/trailing whitespace, so if nothing
                               // was typed, we return early.

    onAdd(title.trim());       // Sends the new title up to the parent TaskBoard via onAdd prop.
                               // This component doesn't update the tasks list directly,
                               // because it doesn't own that state. It calls the onAdd and lets
                               // TaskBoard handle the update.

    setTitle('');              // Clears the field after a successful add. Setting state to ''
                               // resets what was typed.
  }

  return (
    // OnSubmit fires when the user presses Enter inside the input
    // OR clicks the Add button. This is better than onClick because it allows keyboard submission.
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">

      <input
      // Controlled input: value comes from state.
      // onChange updates state on every keystroke, which re-renders the input.
        value={title}                              
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="What needs to be done?"
        className="flex-1 bg-zinc-900 border border-zinc-700 rounded-1g px-4 py-3
                   text-sm text-white placeholder-zinc-600
                   focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                   transition-colors duration-150"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold
        rounded-1g transition-colors duration-150 whitespace-nowrap cursor-pointer"
      >
        Add Task
      </button>
    </form>
  );
}