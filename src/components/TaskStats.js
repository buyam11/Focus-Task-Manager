// ==========================================================================================================
// COMPONENT: TaskStats
// PURPOSE: Displays a live summary bar showing total, active, and completed tasks.
//          Also renders the "Clear completed" button when there's completed tasks to clear.
//          It is purely a display component that renders whatever numbers TaskBoard passes down.
// TYPE: Client Component ('use client' because this file uses an onClick callback and conditionals)
// PROPS: 
//   total              (number) - total task count
//   active             (number) - tasks not done
//   completed          (number) - tasks done
//   onClearCompleted   (function) - callback defined in TaskBoard that is called 
//                                   when the clear button is clicked
// ==========================================================================================================

'use client';

export default function TaskStats({ total, completed, active, onClearCompleted }) {
  return (
    <div className="">

      {/* Three stats summaries that each show a number and its label */}
      <div className="">

        <div className="">
            {/* These numbers are props that update because TaskBoard re-renders this component
                whenever its own tasks state changes */}
          <p className="">{total}</p>
          <p className="">Total</p>
        </div>

        <div>
          <p className="">{completed}</p>
          <p className="">Done</p>
        </div>

        <div>
          <p className="">{active}</p>
          {/* Orange because these still need attention */}
          <p className="">Active</p>
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
          className=""
        >
          Clear {completed} done
        </button>
      )}

    </div>
  );
}