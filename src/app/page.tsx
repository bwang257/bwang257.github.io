import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/projects';

export default function HomePage() {
  // Get tech stack for each project
  const getTechStack = (project: typeof projects[0]) => {
    if (project.slug.includes('exchange')) {
      return 'C++';
    } else if (project.slug.includes('portfolio')) {
      return 'Python';
    } else if (project.slug.includes('trading')) {
      return 'Python';
    } else if (project.slug.includes('internship')) {
      return 'TypeScript / Postgres';
    }
    return '';
  };


  const exchangeSimulatorCode = `// Deterministic Matching
auto match(Order& bid, Order& ask) -> Trade {
  if (bid.price >= ask.price) {
    auto quantity = std::min(bid.quantity, ask.quantity);
    return Trade{bid.price, quantity};
  }
  return Trade{};
}`;

  return (
    <div className="grid md:grid-cols-12 gap-8 md:gap-12">
      {/* Left Column (Col-Span-5, ~40%): Header & Links */}
      <aside className="md:col-span-5 md:sticky md:top-24 md:h-fit">
        <header className="mb-10">
          <div className="mb-4">
            {/* <Image
              src="/profile.png"
              alt="Brian Wang"
              width={100}
              height={100}
              className="rounded-full mb-6 object-cover"
              priority
            /> */}
            <h1 className="text-5xl font-serif font-bold text-white leading-tight mb-2">
              Brian Wang
            </h1>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Systems Engineer
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Quant Developer
              </span>
            </div>
          </div>
          <p className="text-base font-mono text-slate-400 mb-6 leading-relaxed">
            @ WPI · Building systems where correctness meets performance
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            I architect deterministic, low-latency systems. Currently focused on matching engines, 
            optimization algorithms, and production-grade data pipelines using <strong className="text-white font-semibold">C++</strong>, <strong className="text-white font-semibold">Rust</strong>, and <strong className="text-white font-semibold">Python</strong>. 
            <span className="text-slate-500"> Every system I build prioritizes correctness, then speed.</span>
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
            <span>brian.wang372@gmail.com</span>
          </div>
        </div>
      </aside>

      {/* Right Column (Col-Span-7, ~60%): Projects */}
      <main className="md:col-span-7">
        <h2 className="text-3xl font-serif font-bold text-white mb-8">Projects</h2>
        <section className="space-y-0">
          {projects.map((project, idx) => {
            const techStack = getTechStack(project);
            const isExchangeSimulator = project.slug.includes('exchange');

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="block group"
              >
                <article
                  className={`relative py-8 px-6 -mx-6 border-b border-white/5 transition-all duration-300 hover:bg-white/[0.03] hover:border-l-2 hover:border-l-blue-400/50 ${idx === projects.length - 1 ? 'border-b-0' : ''}`}
                >
                  {/* Title */}
                  <div className="mb-4">
                    <h2 className="text-2xl font-medium text-white group-hover:text-blue-100 transition-colors mb-3">
                      {project.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-base text-slate-300 leading-relaxed mb-4 group-hover:text-slate-200 transition-colors">
                    {project.summary}
                  </p>

                  {/* Code Snippet (Exchange Simulator only) */}
                  {isExchangeSimulator && (
                    <div className="mb-6">
                      <pre className="bg-black/60 border border-white/10 rounded-lg p-5 overflow-x-auto group-hover:border-white/20 transition-colors">
                        <code className="text-sm font-mono text-green-400 leading-relaxed">
                          {exchangeSimulatorCode}
                        </code>
                      </pre>
                    </div>
                  )}

                  {/* Constraints/Highlights - Clean tags below description */}
                  {project.constraints && project.constraints.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.constraints.slice(0, 3).map((constraint) => (
                        <span
                          key={constraint}
                          className="text-xs font-mono text-slate-400 group-hover:text-slate-300 transition-colors"
                        >
                          {constraint}
                        </span>
                      ))}
                      {project.constraints.length > 3 && (
                        <span className="text-xs font-mono text-slate-500">
                          +{project.constraints.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Link - Right Aligned with Arrow */}
                  <div className="flex items-center justify-end mt-4">
                    <span className="text-sm text-slate-500 group-hover:text-blue-400 transition-all inline-flex items-center gap-1 font-medium">
                      Learn more
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
