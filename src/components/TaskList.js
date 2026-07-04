// ==========================================================================================================
// COMPONENT: TaskList
// PURPOSE: Renders and displays the filtered task list it receives from TaskBoard, 
//          or an empty message when there is none to show.
//          Acts as a middleman for onToggle and onDelete callbacks, passing them down to each TaskCard.
// TYPE: 
//   Client Component ('use client' because this file passes event callback props to its children)
// PROPS: 
//    tasks (array) - the already-filtered task list of objects to render
//    onToggle (function) - callback to TaskBoard's handleToggle, but relayed to TaskCard
//    onDelete (function) - callback to TaskBoard's handleDelete, but relayed to TaskCard
// ==========================================================================================================

'use client'; 

import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {
  
  // Empty-state guard: returns an invitation to add a task if there is nothing to show.
  // Makes it clear to act, rather than just leaving empty space.
  if (tasks.length === 0) {
    return (
      <p className="">
        No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="">
      {tasks.map((task) => (
        // key={task.id} uses a unique ID, not the array index. If we used the index, deleting a task,
        // for example, would shift all the keys and React would get confused about how to interact
        // with each key.
        <li key={task.id}>
          {/* onToggle and OnDelete are passed straight through here. TaskList doesn't call them,
          rather just acts as a relay between TaskBoard (where the handlers are defined) and TaskCard 
          (where the buttons that trigger the handlers live) */}
          <TaskCard
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={onToggle}   
            onDelete={onDelete}                
          />
        </li>
      ))}
    </ul>
  );
}