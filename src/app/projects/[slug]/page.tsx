import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProjectBySlug, projects } from '@/lib/projects';
import ConstraintTags from '@/components/ConstraintTags';
import EvidenceLinks from '@/components/EvidenceLinks';
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
        <p className="text-lg text-slate-300 mb-6 font-mono">{project.summary}</p>

        {project.tools && project.tools.length > 0 && (
          <div className="mb-6">
            <div className="text-xs text-slate-500 mb-2 font-mono uppercase tracking-wide">
              Tools
            </div>
            <ConstraintTags constraints={project.tools} />
          </div>
        )}

        <div className="mb-0">
          <EvidenceLinks links={project.evidenceLinks} projectSlug={project.slug} />
        </div>
      </header>

      {/* Case Study Sections */}
      <div className="space-y-0">
        {project.sections.map((section, idx) => (
          <section key={idx} className={idx < project.sections.length - 1 ? 'pb-12 mb-12 border-b border-white/5' : 'pb-12'}>
            <h2 className="text-2xl section-header font-semibold mb-4 text-white">{section.title}</h2>
            <div className="text-slate-300 leading-relaxed">
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
                    return <p className="mb-4">{children}</p>;
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

      {/* Links Section */}
      <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-mono font-semibold mb-4">Links</h2>
        <EvidenceLinks links={project.evidenceLinks} projectSlug={project.slug} />
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
