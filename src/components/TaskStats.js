// ==========================================================================================================
// COMPONENT: TaskStats
// PURPOSE: Displays a live summary bar showing total, active, and completed tasks.
//          Also renders the "Clear completed" button when there's completed tasks to clear.
//          It is purely a display component that renders whatever numbers TaskBoard passes down.
// TYPE: Client Component ('use client' because this file uses an onClick callback and conditionals)
// PROPS: 
//    total              (number) - total task count
//    active             (number) - tasks not done
//    completed          (number) - tasks done
//    onClearCompleted   (function) - callback to TaskBoard's handleClearDone, which is called 
//                                    when the clear button is clicked
// ==========================================================================================================

'use client';

export default function TaskStats({ total, completed, active, onClearCompleted }) {
  return (
    <div className="flex item-center justify-between mb-6 px-4 py-3 rounded-x1 bg-zinc-90
    0 border border-zinc-800">

      {/* Three stats summaries that each show a number and its label */}
      <div className="flex gap-6">

        <div className="text-center">
            {/* These numbers are props that update because TaskBoard re-renders this component
                whenever its own tasks state changes */}
          <p className="text-xl font-bold text-white">{total}</p>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Total</p>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-emerald-400">{completed}</p>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Done</p>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-sky-400">{active}</p>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Active</p>
        </div>

      </div>

      {/* Conditional render: only show this button if there's actually something to clear.
          'completed > 0' will render the button. */}
      {completed > 0 && (
        <button
        // onClearCompleted is a callback defined in Taskboard, meaning that Taskboard
        // handles the state update. TaskStats just signals upward that the user clicked
        // the button.
          onClick={onClearCompleted}
          className="text-xs text-zinc-400 hover:text-red-400 transition-colors duration-1
          50 underline underline-offset-2 cursor-pointer"
        >
          Clear {completed} done
        </button>
      )}

    </div>
  );
}