import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProjectBySlug, projects } from '@/lib/projects';
import CodeBlock from '@/components/CodeBlock';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import ScrollReveal from '@/components/ScrollReveal';

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
    <div className="max-w-3xl mx-auto px-6 py-24 min-h-screen relative z-10">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text mb-12 transition-colors duration-200 group bg-white/50 px-4 py-2 rounded-full border border-border backdrop-blur-sm"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Home
      </Link>

      <ScrollReveal offsetMultiplier={0.5}>
        {/* Header */}
        <header className="mb-16 pb-12 border-b border-border-subtle">
          <h1 
            className="text-5xl md:text-6xl font-semibold text-text mb-6 tracking-tight leading-[1.1]"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-text-ghost leading-relaxed mb-8 font-light max-w-2xl">{project.summary}</p>

          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-black/5 bg-black/5 text-text-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}

          {project.evidenceLinks.github && (
            <a
              href={project.evidenceLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 border border-border bg-white shadow-sm rounded-full text-sm font-medium text-text hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Repository
            </a>
          )}
        </header>
      </ScrollReveal>

      {/* Case Study Sections */}
      <div className="space-y-16">
        {project.sections.map((section, idx) => (
          <ScrollReveal key={idx} offsetMultiplier={0.8}>
            <section className="bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-[24px] border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 
                className="text-2xl md:text-3xl font-semibold text-text mb-6 tracking-tight"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                {section.title}
              </h2>
              <div className="text-base text-text-muted leading-relaxed prose prose-slate max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <div className="my-6 rounded-xl overflow-hidden shadow-lg border border-black/10">
                          <CodeBlock language={match[1]}>
                            {String(children).replace(/\n$/, '')}
                          </CodeBlock>
                        </div>
                      ) : (
                        <code
                          className="bg-black/5 border border-black/10 px-1.5 py-0.5 rounded text-sm font-mono text-accent-warm"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    p({ children }) {
                      return <p className="mb-6">{children}</p>;
                    },
                    ul({ children }) {
                      return <ul className="list-disc list-inside mb-6 space-y-2 text-text-muted">{children}</ul>;
                    },
                    ol({ children }) {
                      return <ol className="list-decimal list-inside mb-6 space-y-2 text-text-muted">{children}</ol>;
                    },
                    li({ children }) {
                      return <li className="ml-4">{children}</li>;
                    },
                    strong({ children }) {
                      return <strong className="font-semibold text-text">{children}</strong>;
                    },
                    h3({ children }) {
                      return <h3 className="text-xl font-semibold text-text mt-8 mb-4">{children}</h3>;
                    },
                    a({ href, children }) {
                      return <a href={href} className="text-accent hover:text-accent-warm underline underline-offset-4">{children}</a>
                    }
                  }}
                >
                  {section.content}
                </ReactMarkdown>
              </div>
            </section>
          </ScrollReveal>
        ))}
      </div>

      {/* Prev / Next navigation */}
      {(prevProject || nextProject) && (
        <ScrollReveal offsetMultiplier={0.3}>
          <nav
            className="mt-20 pt-10 flex justify-between gap-4"
            aria-label="Project navigation"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="inline-flex items-center gap-3 font-medium text-sm text-text-ghost hover:text-text transition-colors duration-200 group bg-white/50 px-6 py-3 rounded-full border border-border"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {prevProject.title}
              </Link>
            ) : (
              <div />
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="inline-flex items-center gap-3 font-medium text-sm text-text-ghost hover:text-text transition-colors duration-200 group bg-white/50 px-6 py-3 rounded-full border border-border"
              >
                {nextProject.title}
                <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </nav>
        </ScrollReveal>
      )}
    </div>
  );
}
