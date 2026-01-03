import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/projects';
import ReactMarkdown from 'react-markdown';
import GitHubLink from '@/components/GitHubLink';

export default function HomePage() {
  // Technical visual anchors - code snippets for each project
  const projectCodeSnippets: Record<string, { code: string; color: string }> = {
    'exchange-simulator': {
      code: `// Deterministic Matching
auto match(Order& bid, Order& ask) -> Trade {
  if (bid.price >= ask.price) {
    auto quantity = std::min(bid.quantity, ask.quantity);
    return Trade{bid.price, quantity};
  }
  return Trade{};
}`,
      color: 'text-green-400'
    }
  };

  return (
    <div className="grid md:grid-cols-12 gap-8 md:gap-12 w-full max-w-full">
      
      {/* Left Column (Col-Span-5, ~40%): Header & Links */}
        <aside className="md:col-span-5 md:sticky md:top-24 md:h-fit w-full max-w-full overflow-hidden">
          <header className="mb-10 w-full max-w-full">
            <div className="mb-4">
              <h1 className="text-5xl font-serif font-bold text-white leading-tight mb-2 break-words">
                Brian Wang
              </h1>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed break-words overflow-wrap-anywhere w-full max-w-full">
            I'm a sophomore at Worcester Polytechnic Institute (WPI) studying CS and Mathematics with an interest in performance, correctness, and applied data problems. 
            <br />
            <br />
            I'm narrowing my work around systems where correctness and predictable behavior are specified before performance tuning, as reflected in my exchange simulator and my{' '}
            <a 
              href="https://github.com/bwang257/cpp_learning" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              C++ learning repository
            </a>
            </p>
          </header>

    
        {/* Contact Links */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="space-y-3">
            {/* LinkedIn / GitHub / Email Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
              <a
                href="https://www.linkedin.com/in/brian372/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-600">/</span>
              <a
                href="https://github.com/bwang257"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              <span className="text-slate-600">/</span>
              <a
                href="mailto:brian.wang372@gmail.com"
                className="text-slate-400 hover:text-blue-400 transition-colors break-all"
              >
                brian.wang372@gmail.com
              </a>
            </div>
            
            {/* Resume Link */}
            <div>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors group"
              >
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>View Resume</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Column (Col-Span-7, ~60%): Projects */}
      <main className="md:col-span-7 w-full max-w-full overflow-hidden">
        <h2 className="text-4xl font-serif font-bold text-white mb-4">Projects</h2>
        <section className="space-y-0">
          {projects.map((project, idx) => {
            const codeSnippet = projectCodeSnippets[project.slug];
            const projectColor = codeSnippet?.color || 'text-green-400';
            
            // Generate a subtle gradient border color based on project
            const borderColors: Record<string, string> = {
              'exchange-simulator': 'hover:border-l-green-500/50',
              'portfolio-optimization-engine': 'hover:border-l-yellow-500/50',
              'algorithmic-trading-system': 'hover:border-l-blue-500/50',
              'internship-tracker': 'hover:border-l-purple-500/50'
            };
            
            const borderColor = borderColors[project.slug] || 'hover:border-l-blue-400/50';

            return (
              <article
                key={project.slug}
                className={`relative py-8 px-6 -mx-6 border-b border-white/5 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/[0.02] hover:to-transparent hover:border-l-2 ${borderColor} ${idx === projects.length - 1 ? 'border-b-0' : ''} group`}
              >
                {/* Title */}
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-2xl font-medium text-white group-hover:text-blue-100 transition-colors hover:underline break-words"
                    >
                      {project.title}
                    </Link>
                    {project.evidenceLinks.github && (
                      <GitHubLink href={project.evidenceLinks.github} />
                    )}
                  </div>
                    
                    {/* Tools Section */}
                    {project.tools && project.tools.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tools.map((tool, toolIdx) => (
                          <span
                            key={toolIdx}
                            className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-slate-400 group-hover:text-slate-300 group-hover:border-white/20 transition-all duration-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Description - Markdown */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block text-base text-slate-300 leading-relaxed mb-4 group-hover:text-slate-200 transition-colors break-words"
                  >
                    <ReactMarkdown
                      components={{
                        p({ children }) {
                          return <p className="mb-0">{children}</p>;
                        },
                        strong({ children }) {
                          return <strong className="font-semibold text-white">{children}</strong>;
                        },
                        em({ children }) {
                          return <em className="italic">{children}</em>;
                        },
                        code({ inline, children, ...props }: any) {
                          return inline ? (
                            <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                              {children}
                            </code>
                          ) : (
                            <code {...props}>{children}</code>
                          );
                        },
                        ul({ children }) {
                          return <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>;
                        },
                        ol({ children }) {
                          return <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>;
                        },
                        li({ children }) {
                          return <li className="ml-2">{children}</li>;
                        },
                        a({ href, children, ...props }: any) {
                          return (
                            <span
                              className="text-blue-400 hover:text-blue-300 underline"
                              {...props}
                            >
                              {children}
                            </span>
                          );
                        },
                      }}
                    >
                      {project.summary}
                    </ReactMarkdown>
                  </Link>

                  {/* Code Snippet - All Projects Now Have Visual Anchors */}
                  {codeSnippet && (
                    <div className="mb-6 relative">
                      <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <pre className="bg-gradient-to-br from-black/70 via-black/60 to-black/70 border border-white/10 rounded-lg p-5 overflow-x-auto group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-white/5 transition-all duration-300 relative">
                        <div className="absolute top-2 right-3 flex gap-1.5 opacity-40 group-hover:opacity-60 transition-opacity">
                          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                        </div>
                        <code className={`text-sm font-mono ${projectColor} leading-relaxed block`}>
                          {codeSnippet.code}
                        </code>
                      </pre>
                    </div>
                  )}

                  {/* Links - Right Aligned */}
                  <div className="flex items-center justify-end gap-4 mt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-sm text-slate-500 group-hover:text-blue-400 transition-all inline-flex items-center gap-1 font-medium"
                    >
                      Project Details and Takeaways
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
