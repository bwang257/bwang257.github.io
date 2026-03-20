import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brian Wang',
  description:
    'Low-latency C++ engineer and financial mathematics researcher. CS & Math at WPI, incoming SWE Intern at Cyvl.ai.',
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
        {/* Noise overlay */}
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.025]"
          style={{ zIndex: 9999 }}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        {children}
      </body>
    </html>
  )
}
