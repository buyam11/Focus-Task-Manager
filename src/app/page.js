// =====================================================================================
// COMPONENT: HomePage
// PURPOSE: The root page of the app. Its only job is to place TaskBoard onto the screen.
//          Keeping this as a Server Component means that this file is never sent to the user's
//          browser
// TYPE: Server Component (no 'use client' directive needed)
// PROPS: None - this is the top level-page so nothing passes into it
// =====================================================================================

import TaskBoard from '@/components/TaskBoard';

export default function HomePage() {
  return (
    // min-h-screen fills the full viewport height so the dark background
    // overs the whole page, not just the content
    <main className="min-h-screen pg-zinc-950">
      <TaskBoard />
    </main>
  );
}