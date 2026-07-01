// =====================================================================================
// COMPONENT: RootLayout
// PURPOSE : The root wraps every page in the app. Sets the HTML lang attribute, imports global CSS
//           (which contains Tailwind CSS), and applies a dark background color for the whole document.
// TYPE: Server Component (no interactivity needed)
// PROPS: children - whatever page.js renders
// =====================================================================================

import "./globals.css";

export const metadata = {
  title: "Task Manager",
  description: "A dark-mode task mananger built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 antialiased">
        {children}
      </body>
    </html>
  )
}
