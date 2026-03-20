import Link from 'next/link';

export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 border-b border-[#21262D] bg-[#0D1117]/80 backdrop-blur-md"
      aria-label="Primary navigation"
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="font-mono text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors duration-200"
        >
          Brian Wang
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/#work"
            className="text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors duration-200"
          >
            Work
          </Link>
          <Link
            href="/#stack"
            className="text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors duration-200"
          >
            Stack
          </Link>
          <Link
            href="/#experience"
            className="text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors duration-200"
          >
            Experience
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors duration-200 inline-flex items-center gap-1"
          >
            Resume
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
