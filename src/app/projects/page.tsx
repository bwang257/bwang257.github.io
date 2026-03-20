import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="font-mono text-[0.6875rem] tracking-widest uppercase text-[#484F58]">Work</span>
        <h1 className="text-[1.75rem] font-semibold text-[#E6EDF3] mt-2 tracking-tight">Projects</h1>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="border border-[#30363D] rounded-xl bg-[#161B22] p-6 hover:border-[#58A6FF]/40 hover:bg-[#1C2128] transition-all duration-200 shadow-[0_0_0_1px_rgba(48,54,61,0.8),0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <h2 className="text-base font-semibold text-[#E6EDF3] mb-2">{project.title}</h2>
            <p className="text-sm text-[#8B949E] leading-[1.7] mb-5">{project.summary}</p>

            <div className="flex items-center gap-5 font-mono text-xs">
              <Link
                href={`/projects/${project.slug}`}
                className="text-[#484F58] hover:text-[#58A6FF] transition-colors duration-200"
              >
                [ Case Study ]
              </Link>
              {project.evidenceLinks.github && (
                <a
                  href={project.evidenceLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#484F58] hover:text-[#58A6FF] transition-colors duration-200"
                >
                  [ View Source ]
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-[#21262D]">
        <Link
          href="/"
          className="font-mono text-xs text-[#484F58] hover:text-[#E6EDF3] transition-colors duration-200"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
}
