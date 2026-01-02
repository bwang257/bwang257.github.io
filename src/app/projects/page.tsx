import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <div className="space-y-24">
      <section className="space-y-4">
        <h1 className="text-4xl font-serif font-bold text-white">Projects</h1>
        <p className="text-sm font-mono text-slate-400">
          Systems and systems I've built
        </p>
      </section>

      <section className="space-y-16">
        {projects.map((project) => (
          <div key={project.slug} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-white">
                {project.title}
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm font-mono">
              <Link
                href={`/projects/${project.slug}`}
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                [ Read Case Study ]
              </Link>
              {project.evidenceLinks.github && (
                <a
                  href={project.evidenceLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  [ View Source ]
                </a>
              )}
            </div>
          </div>
        ))}
      </section>

      <footer className="pt-8 border-t border-white/5">
        <div className="flex items-center gap-4 text-sm text-slate-500 font-mono">
          <Link href="/" className="hover:text-slate-400 transition-colors">
            ← Back
          </Link>
        </div>
      </footer>
    </div>
  );
}
