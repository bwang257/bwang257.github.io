import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getProjectBySlug, projects, Project } from '../lib/projects';
import { loadMarkdownFile, MarkdownContent } from '../lib/markdown';
import { Card } from '../components/Card';

function ProjectDetailPageWrapper() {
  const { colors } = useTheme();

  if (!colors || !colors.bg) {
    return (
      <div className="min-h-screen font-mono p-4" style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
        <p>Loading theme...</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen font-mono"
      style={{
        backgroundColor: colors.bg,
        color: colors.text
      }}
    >
      <ProjectDetailPage />
    </div>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { colors } = useTheme();
  const [project, setProject] = useState<Project | undefined>();
  const [markdown, setMarkdown] = useState<MarkdownContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Project not found');
      setLoading(false);
      return;
    }

    const projectData = getProjectBySlug(slug);
    if (!projectData) {
      setError('Project not found');
      setLoading(false);
      return;
    }

    setProject(projectData);

    loadMarkdownFile(slug)
      .then((data) => {
        setMarkdown(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading markdown:', err);
        setError('Failed to load project content');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-[900px] mx-auto px-6 py-12 md:py-20">
        <p style={{ color: colors.textMuted }}>Loading...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-[900px] mx-auto px-6 py-12 md:py-20">
        <Card className="p-8 md:p-10">
          <h1 style={{ color: colors.textSecondary }}>Project not found</h1>
          <Link
            to="/projects"
            className="inline-block mt-4 text-sm transition-colors duration-150 font-medium"
            style={{ color: colors.accent }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            ← Back to projects
          </Link>
        </Card>
      </div>
    );
  }

  // Find next/previous project
  const currentIndex = projects.findIndex(p => p.slug === project.slug);
  const nextProject = projects[currentIndex + 1];
  const prevProject = projects[currentIndex - 1];

  return (
    <div className="max-w-[900px] mx-auto px-6 py-12 md:py-20">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 mb-8 text-sm transition-colors duration-150 font-medium"
        style={{ color: colors.textMuted }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = colors.accent;
          e.currentTarget.style.textDecoration = 'underline';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = colors.textMuted;
          e.currentTarget.style.textDecoration = 'none';
        }}
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      {/* Header */}
      <Card className="p-8 md:p-10 mb-8">
        <header>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ color: colors.textSecondary }}
          >
            {project.title}
          </h1>
          <p
            className="text-xl mb-6"
            style={{ color: colors.textMuted }}
          >
            {project.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {project.stack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 border rounded-md"
                style={{
                  borderColor: colors.border,
                  color: colors.textMuted,
                  backgroundColor: colors.bgTertiary
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors duration-150 font-medium"
                style={{ color: colors.textMuted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.accent;
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textMuted;
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                <Github size={18} />
                GitHub
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors duration-150 font-medium"
                style={{ color: colors.textMuted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.accent;
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textMuted;
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                <ExternalLink size={18} />
                Demo
              </a>
            )}
            {project.links.writeup && (
              <a
                href={project.links.writeup}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors duration-150 font-medium"
                style={{ color: colors.textMuted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.accent;
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textMuted;
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                <ExternalLink size={18} />
                Write-up
              </a>
            )}
          </div>
        </header>
      </Card>

      {/* Markdown Content */}
      {markdown && (
        <Card className="p-8 md:p-10">
          <article
            className="project-content"
            style={{
              maxWidth: '65ch',
              color: colors.text,
              lineHeight: '1.75'
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: markdown.htmlContent }}
              style={{
                color: colors.text
              }}
            />
          </article>
        </Card>
      )}

      {/* Navigation */}
      {(prevProject || nextProject) && (
        <nav className="mt-8 flex justify-between">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="flex items-center gap-2 text-sm transition-colors duration-150 font-medium"
              style={{ color: colors.textMuted }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.accent;
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.textMuted;
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              <ArrowLeft size={16} />
              {prevProject.title}
            </Link>
          ) : (
            <div />
          )}
          {nextProject && (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="flex items-center gap-2 text-sm transition-colors duration-150 font-medium"
              style={{ color: colors.textMuted }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.accent;
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.textMuted;
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              {nextProject.title}
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

export { ProjectDetailPageWrapper as ProjectDetailPage };
