// ==========================================================================================================
// COMPONENT: FilterBar
// PURPOSE: Renders three filter buttons (All / Active / Done) with live task counts in each.
//          It receives the current filter from TaskBoard and sends a signal back up via
//          the onFilterChange callback.
//          
// TYPE: Client Component ('use client' required because this file attaches onClick
//       handlers on the filter buttons)
// PROPS: 
//    current         (string)    - the active filter ('all', 'active', 'done')
//    onFilterChange  (function)  - callback to TaskBoard's setFilter, which is called with the new
//                                  filter string click
//    counts        (object)      - {'all', 'active', 'done'} - task counts per filter. Made in TaskBoard
//                                  and passed down.
// ==========================================================================================================

'use client';

// A static filters array that never changes, so it is defined outside the function.
const Filters = ['all', 'active', 'done'];

export default function FilterBar({current, onFilterChange, counts}) {
    return (
        <div className="flex gap-2 mb-6">
            {Filters.map((mode) => (
                // onFilterChange is a callback defined in Taskboard (TaskBoard's setFilter function
                // passed as a prop) which handles the state update. .map() sets each filter as a mode
                // so that FiltersBar signals upward which button the user clicked.
                <button
                    key={mode}
                    type="button"
                    onClick={() => onFilterChange(mode)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors 
                        ${current === mode
                        // Conditional render of styles: the active filter gets a filled background, while 
                        // the inactive filters are outlined.
                        ? 'bg-sky-500 text-white'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-700 hover:text-zinc-200 hover:border-zinc-500'}
                    `}
                >   
                    {/* Capitalize the first letter of the mode label and put the count in parentheses next to the label */}
                    {mode[0].toUpperCase() + mode.slice(1)} ({counts[mode]})
                </button>
            ))}
        </div>
    )
}