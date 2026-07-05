// ==========================================================================================================
// COMPONENT: TaskCard
// PURPOSE: Renders a single task row with a toggle button and delete button.
//          This component allows the user to interact with each task.
//          Every interaction fires a callback up to TaskBoard where the state update happens,
//          which is possible because TaskList passed down the onToggle and onDelete props from TaskBoard
//          to this component.
//          
// TYPE: Client Component ('use client' required because this file attaches onClick
//       handlers to interactive elements)
// PROPS: 
//    id        (string|number) - unique task identifier that is passed back in callbacks so TaskBoard
//                                knows which task to update
//    title     (string)        - the task description to display
//    done      (boolean)       - whether the task is complete
//    onToggle  (function)      - callback to TaskBoard's handleToggle, which is called with the task's
//                                id on toggle click
//    onDelete  (function)      - callback to TaskBoard's handleDelete, which is called with the task's
//                                id on delete click
// ==========================================================================================================

'use client'; 

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  return (
    <div className="">
        {/* Toggle button — calls parent's onToggle, passing this task's id */}
        <button
            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors cursor-pointer
                      ${done ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-600 hover:border-sky-400'}`}
            onClick={() => onToggle(id)}
        />

      {/* Title */}
      <span className={`flex-1 text-sm ${done ? 'line-through text-zinc-500' : 'text-zinc-100'}`}>
        {title}
      </span>

        {/* Delete button — calls parent's onDelete, passing this task's id */}
        <button
          className="text-zinc-600 hover:text-red-400 cursor-pointer"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
  );
}