// ==========================================================================================================
// COMPONENT: TaskBoard
// PURPOSE: Think of this component as the brain of the app. This is the common ancestor that owns all state.
//          TaskStats, AddTaskForm, FilterBar, and TaskList are siblings, meaning that none of them "know"
//          each other directly, so all shared data flow down as props. This is called 'lifting state up,'
//          which is how React flows data.
// TYPE: Client Component ('use client' because this file uses useState and useEffect)
// PROPS: None - this is the top-level of the client component tree
// ==========================================================================================================
'use client';

import { useState, useEffect } from 'react';
import TaskStats   from './TaskStats';
import AddTaskForm from './AddTaskForm';
import FilterBar from './FilterBar';
import TaskList    from './TaskList';

export default function TaskBoard() {
    
//  ----State---

    //  tasks is a state variable (not a static variable) because the whole app needs to re-render whenever
    //  tasks change. Adding, toggling, or deleting a task must instantly update the list, stats bar, 
    // and filter count on screen. Only state can trigger that re-render.
    //
    // The function passed to useState is a "lazy initializor." It runs ONCE on the first render.
    // I read localStorage here because it only exists in the browser, not the server.
    //
    // typeof window === 'undefined'is the server-side guard. Next.js renders components on the SERVER, 
    // before sending HTML to the browser. Meaning that trying to access localStorage, which only exists 
    // in the browser, without a server-side guard would crash the app. This check returns an empty array 
    // if we are on the server, letting it render safely. The browser render will follow with the saved 
    // data from localStorage.
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tasks');
    // localStorage stores plain text so the array was saved as a JSON string. 
    // JSON.parse converts it to a JS array. If nothing was saved, start with an empty array
    return saved ? JSON.parse(saved) : [];
  });

    // filter has its own useState because it changes independently from tasks. 
    // It doesn't modify, add, or remove tasks.
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'done'

    

// ----Effects----

    // Effect 1: keeps localStoragein sync with tasks array.
    // useEffect allows React to manage localStorage.
    //
    // How this effect runs with [tasks] as the dependency array:
    //  1. localStorage runs on the first render.
    //  2. Every change to the tasks (add/toggle/delete) will save
  useEffect(() => {
    // JSON.stringify converts the text into plain text so localStorage can store it.
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

    // Effect 2: keep the brower tab in sync with the active count.
    // useEffect allows React to manage document.title
    //
    // The active count only changes when tasks changes, hence [tasks] dependency.
  useEffect(() => {
    const activeCount = tasks.filter((t) => !t.done).length;
    document.title = activeCount > 0
        ? `(${activeCount}) Focus - Task Manager`
        : 'Focus - Task Manager';
    
    // The return value is a "cleanup function," 
    // and resets the title so we don't leave an old count in the tab.
    return () => { document.title = 'Focus - Task Manager' ;};
  }, [tasks]);



// ---Derived values (calculated fresh in every render)---
    
    // These are NOT in state. They can be calculated directly from 'tasks' which IS in state.
    // Storing them separately in state would mean updating them updating them in every handler 
    // (handleAdd, handleDelete, handleToggle, handleClearDone), which would leave room for bugs and errors.
    // Calculating fresh on every render prevents such problems, and makes the code simpler.
  const completedCount = tasks.filter((t) => t.done).length;
  const activeCount = tasks.length - completedCount;
    
    // visible is what TaskList actually renders. It depends on both 'tasks' and 'filter'.
    // Storing it separately in state would require updating it whenever EITHER change, which is error-prone.
  const visible =
    filter === 'all'  ? tasks :
    filter === 'done' ? tasks.filter((t) =>  t.done) :
                        tasks.filter((t) => !t.done);

        
                        
// ---Handlers (functions that update state)---
    
    // These functions are defined here in TaskBoard and passed down to children as props.
    // Children calls them when a handler happens (ex. a click), and the update happens here.
  function handleAdd(title) {
    // Immutable: Spread [...tasks, newTask] builds a NEW array containing all existing tasks plus a new task.
    // Mutate: we never push() onto the existing array because it mutates it. This means that when React compares
    // references, and a mutates reference has the SAME reference as before, React would not recognize a change and
    // skip the re-render. In simpler terms, a new array = new reference = React re-renders
    const newTask ={
        id: crypto.randomUUID(),
        title, done : false,
    };
    setTasks([...tasks, newTask]);
  }

  function handleToggle(id) {
    // .map() returns a NEW array (immutable). 
    // For the task matching the id, we spread {...t} into a new object (preventing mutations)
    // and flip done with !t.done. Every other task remains unchanged.
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  function handleDelete(id) {
    // .filter() returns a NEW array keeping only tasks where the id does NOT match.
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleClearDone() {
    // .filter() returns a NEW array WITHOUT the tasks that are done
    setTasks(tasks.filter((t) => !t.done));
  }



  return (
    <div className="max-w-2xl mx-auto px-4 py-12">

      {/* App header */}
      <div className='mb-10'>
        <h1 className='text-4xl font-bold tracking-tight text-white'>
            Focus
        </h1>
        <p>
            {activeCount === 0 && tasks.length > 0
            ? 'All clear. Good job!'
            : `${activeCount} tasks left to do`}
        </p>
      </div>

      {/* TasksStats: sibling that TaskBoard passes props to 
          (total, completed, active, onClearCompleted)
          so it can receive the counts */}
      <TaskStats
        total={tasks.length}
        completed={completedCount}
        active={activeCount}
        onClearCompleted={handleClearDone}
      />

      {/* AddTaskForm: sibling that needs to ADD a tasks.
          It signals to TaskBoard via the onAdd callback prop.
          TaskBoard receives the new title and updates state. */}
      <AddTaskForm onAdd={handleAdd} />

      {/* FilterBar: sibling that controls which tasks are visible.
          Calls setFilter, via onFilterChange, when a button is clicked, and receives the current filter
          so it knows which filter to highlight. */}
      <FilterBar
        current={filter}
        onFilterChange={setFilter}
        counts={{ all: tasks.length, active: activeCount, done: completedCount}}
      />  

      {/* TaskList: sibling that renders the tasks list.
          Receives the already-filtered 'visible' array that TaskBoard has done.
          Callbacks flow down to TaskCards for toggle and delete. */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <TaskList
          tasks={visible}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>

    </div>
  );
}