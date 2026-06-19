import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brian Wang',
  description:
    'Brian Wang is a CS and Math student at WPI, expected December 2027, interested in C++ systems, ML prediction work, market models, and software with real constraints.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
