import { Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Project } from '../lib/projects';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const { colors } = useTheme();

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="block group cursor-pointer"
    >
      <article
        className={`p-6 md:p-8 rounded-lg border transition-all duration-150 ${
          featured ? 'md:p-10' : ''
        }`}
        style={{
          backgroundColor: colors.bgSecondary,
          borderColor: colors.border,
          boxShadow: colors.shadowCard
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colors.accent;
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = colors.shadowCardHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = colors.border;
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = colors.shadowCard;
        }}
      >
        <div className="mb-4">
          <h3
            className={`font-bold mb-2 tracking-tight ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
            }`}
            style={{ color: colors.textSecondary }}
          >
            {project.title}
          </h3>
          <p
            className="text-base md:text-lg mb-4"
            style={{ color: colors.textMuted }}
          >
            {project.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {project.stack.slice(0, 5).map((tech, idx) => (
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

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderTopColor: colors.divider }}>
          <span
            className="text-sm flex items-center gap-2 transition-all duration-150 font-medium"
            style={{ color: colors.accent }}
          >
            Read case study
            <span className="group-hover:translate-x-1 inline-block transition-transform duration-150">
              →
            </span>
          </span>
          <div className="flex items-center gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="transition-colors duration-150"
                style={{ color: colors.textMuted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textMuted;
                }}
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github size={18} />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="transition-colors duration-150"
                style={{ color: colors.textMuted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textMuted;
                }}
                aria-label={`View ${project.title} demo`}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
