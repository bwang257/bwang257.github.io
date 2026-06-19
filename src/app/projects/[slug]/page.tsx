import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { getProjectBySlug, projects } from '@/lib/projects';
import CodeBlock from '@/components/CodeBlock';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import ScrollReveal from '@/components/ScrollReveal';

type MarkdownCodeProps = ComponentProps<'code'> & {
  inline?: boolean;
  children?: ReactNode;
};

async function getProject(slug: string) {
  return getProjectBySlug(slug);
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 py-24 text-primary bg-background">
      <Link
        href="/projects"
        className="group mb-16 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
        Archive
      </Link>

      <ScrollReveal offsetMultiplier={0}>
        <header className="mb-20">
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight text-primary mb-6 leading-[1.1]">
            {project.title}
          </h1>
          <p className="max-w-2xl text-xl text-secondary leading-relaxed mb-10">
            {project.summary}
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-border-subtle py-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">Tools</span>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, idx) => (
                  <span key={idx} className="text-sm font-medium text-secondary">
                    {tool}
                    {idx < project.tools.length - 1 && <span className="text-muted ml-2">/</span>}
                  </span>
                ))}
              </div>
            </div>
            {project.evidenceLinks.github && (
              <div className="flex flex-col gap-2 ml-auto text-right">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">Source</span>
                <a
                  href={project.evidenceLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-warm transition-colors"
                >
                  View Repository <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </header>
      </ScrollReveal>

      <div className="space-y-20">
        {project.sections.map((section, idx) => (
          <ScrollReveal key={idx} offsetMultiplier={0}>
            <section className="prose prose-slate max-w-none">
              <h2 className="font-serif text-3xl tracking-tight text-primary mb-6">
                {section.title}
              </h2>
              <div className="text-lg leading-relaxed text-secondary">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    code({ inline, className, children, ...props }: MarkdownCodeProps) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <div className="my-8 overflow-hidden rounded-sm border border-border-subtle shadow-sm">
                          <CodeBlock language={match[1]}>
                            {String(children).replace(/\n$/, '')}
                          </CodeBlock>
                        </div>
                      ) : (
                        <code
                          className="bg-surface border border-border-subtle px-1.5 py-0.5 rounded-sm font-mono text-sm text-primary"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    p({ children }) { return <p className="mb-6">{children}</p>; },
                    ul({ children }) { return <ul className="mb-6 list-disc space-y-2 pl-5 text-secondary marker:text-muted">{children}</ul>; },
                    strong({ children }) { return <strong className="font-medium text-primary">{children}</strong>; },
                    a({ href, children }) { return <a href={href} className="text-accent underline underline-offset-4 hover:text-accent-warm transition-colors">{children}</a> }
                  }}
                >
                  {section.content}
                </ReactMarkdown>
              </div>
            </section>
          </ScrollReveal>
        ))}
      </div>

      {(prevProject || nextProject) && (
        <ScrollReveal offsetMultiplier={0}>
          <nav className="mt-32 flex justify-between gap-4 border-t border-border-subtle pt-12" aria-label="Project navigation">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col gap-2 transition-colors hover:text-accent"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-muted">Previous</span>
                <span className="font-serif text-xl tracking-tight text-primary group-hover:text-accent">{prevProject.title}</span>
              </Link>
            ) : <div />}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col gap-2 text-right transition-colors hover:text-accent"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-muted">Next</span>
                <span className="font-serif text-xl tracking-tight text-primary group-hover:text-accent">{nextProject.title}</span>
              </Link>
            )}
          </nav>
        </ScrollReveal>
      )}
    </div>
  );
}
