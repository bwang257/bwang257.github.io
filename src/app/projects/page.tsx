import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-6 py-24 text-primary bg-background">
      <header className="mb-16 border-b border-border-subtle pb-12">
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Home
        </Link>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-primary">
          Archive
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-secondary leading-relaxed">
          A collection of projects exploring systems programming, performance constraints, and applied mathematical modeling.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        {projects.map((project, index) => (
          <article key={project.slug} className="group border border-border-subtle bg-surface p-8 transition-colors hover:border-accent">
            <div className="grid md:grid-cols-[1fr_200px] gap-8">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h2 className="font-serif text-3xl tracking-tight text-primary mb-3">
                  <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 group-hover:text-accent transition-colors">
                    {project.title}
                    <ArrowUpRight className="h-5 w-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </Link>
                </h2>
                <p className="max-w-2xl text-secondary leading-relaxed">{project.summary}</p>
              </div>

              <div className="flex flex-col gap-2 md:text-right">
                <div className="font-mono text-xs uppercase tracking-widest text-muted mb-2">Links</div>
                <Link href={`/projects/${project.slug}`} className="text-sm font-medium text-accent hover:text-accent-warm transition-colors">
                  Case study
                </Link>
                {project.evidenceLinks.github && (
                  <a
                    href={project.evidenceLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-secondary hover:text-primary transition-colors"
                  >
                    Source code
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
