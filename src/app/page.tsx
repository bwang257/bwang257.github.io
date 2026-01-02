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
    <div className="grid md:grid-cols-12 gap-8 md:gap-12">
      {/* Left Column (Col-Span-5, ~40%): Header & Links */}
      <aside className="md:col-span-5 md:sticky md:top-24 md:h-fit">
        <header className="mb-10">
          <div className="mb-4">
            <h1 className="text-5xl font-serif font-bold text-white leading-tight mb-2">
              Brian Wang
            </h1>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed">
            I'm a sophomore at Worcester Polytechnic Institute (WPI) studying CS and Mathematics with an interest in performance, correctness, and applied data problems. 
            <br />
            <br />
            I'm narrowing my work around systems where correctness and predictable behavior are specified before performance tuning, as reflected in my exchange simulator and my <a href="https://github.com/bwang257/cpp_learning" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"> C++ learning repository</a>.
          </p>
        </header>

        {/* Minimalist Contact Links */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 text-xs tracking-widest text-slate-500 uppercase">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              Resume
            </a>
            <span>/</span>
            <a
              href="https://github.com/bwang257"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
            <span>/</span>
            <a
              href="mailto:brian.wang372@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              brian.wang372@gmail.com
            </a>
          </div>
        </div>
      </aside>

      {/* Right Column (Col-Span-7, ~60%): Projects */}
      <main className="md:col-span-7">
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
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="block group"
              >
                <article
                  className={`relative py-8 px-6 -mx-6 border-b border-white/5 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/[0.02] hover:to-transparent hover:border-l-2 ${borderColor} ${idx === projects.length - 1 ? 'border-b-0' : ''}`}
                >
                  {/* Title */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h2 className="text-2xl font-medium text-white group-hover:text-blue-100 transition-colors">
                        {project.title}
                      </h2>
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
                  <div className="text-base text-slate-300 leading-relaxed mb-4 group-hover:text-slate-200 transition-colors">
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
                            <a
                              href={href}
                              className="text-blue-400 hover:text-blue-300 underline"
                              {...props}
                            >
                              {children}
                            </a>
                          );
                        },
                      }}
                    >
                      {project.summary}
                    </ReactMarkdown>
                  </div>

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

                    <span className="text-sm text-slate-500 group-hover:text-blue-400 transition-all inline-flex items-center gap-1 font-medium">
                      Project Details and Takeaways
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
}
