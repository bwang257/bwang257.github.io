import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProjectBySlug, projects } from '@/lib/projects';
import CodeBlock from '@/components/CodeBlock';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

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

  const currentIndex = projects.findIndex(p => p.slug === project.slug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      {/* Header */}
      <header className="mb-12 pb-8 border-b border-white/5">
        <h1 className="text-4xl section-header font-semibold mb-4 text-white">{project.title}</h1>
        <p className="text-xl text-slate-300 mb-8 leading-relaxed">{project.summary}</p>

        {project.tools && project.tools.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-base font-mono text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.evidenceLinks.github && (
          <div className="mb-0">
            <a
              href={project.evidenceLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-base font-mono text-white hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="group-hover:underline">View on GitHub</span>
            </a>
          </div>
        )}
      </header>

      {/* Case Study Sections */}
      <div className="space-y-0">
        {project.sections.map((section, idx) => (
          <section key={idx} className={idx < project.sections.length - 1 ? 'pt-8 pb-8 mb-8 border-b border-white/5' : 'pt-8 pb-8'}>
            <h2 className="text-2xl section-header font-semibold mb-6 text-white">{section.title}</h2>
            <div className="text-slate-300 leading-relaxed text-lg">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <CodeBlock language={match[1]}>
                        {String(children).replace(/\n$/, '')}
                      </CodeBlock>
                    ) : (
                      <code className="bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    );
                  },
                  p({ children }) {
                    return <p className="mb-5 text-lg leading-relaxed">{children}</p>;
                  },
                  ul({ children }) {
                    return <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>;
                  },
                  ol({ children }) {
                    return <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>;
                  },
                  li({ children }) {
                    return <li className="ml-4">{children}</li>;
                  },
                  strong({ children }) {
                    return <strong className="font-semibold">{children}</strong>;
                  },
                }}
              >
                {section.content}
              </ReactMarkdown>
            </div>
          </section>
        ))}
      </div>


      {/* Navigation */}
      {(prevProject || nextProject) && (
        <nav className="mt-12 pt-8 border-t border-white/5 flex justify-between">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              {prevProject.title}
            </Link>
          ) : (
            <div />
          )}
          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
            >
              {nextProject.title}
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
