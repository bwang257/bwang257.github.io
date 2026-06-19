import Link from 'next/link';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { Project } from '@/lib/projects';

interface ProjectRowProps {
  project: Project;
}

export default function ProjectRow({ project }: ProjectRowProps) {
  // Merge tools into description - take first 2 key tools
  const keyTools = project.tools?.slice(0, 2) || [];
  const toolsText = keyTools.length > 0 
    ? keyTools.join(' and ').toLowerCase()
    : '';
  
  const description = toolsText 
    ? `${project.summary.replace(/\.$/, '')} built with **${toolsText}**.`
    : project.summary;

  // Get tech stack from common patterns or use placeholder
  const techStack = ['C++', 'CMake', 'GoogleTest'];

  return (
    <div className="group flex items-start gap-4 border-b border-border py-4 transition-colors hover:border-primary">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-border text-muted">
        <Terminal size={20} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-base font-semibold text-primary">
            {project.title}
          </h3>
        </div>

        <p className="mb-2 text-sm leading-6 text-secondary">
          {description.split(/(\*\*.*?\*\*)/).map((part, idx) => 
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={idx} className="font-semibold text-primary">{part.slice(2, -2)}</strong>
            ) : (
              <span key={idx}>{part}</span>
            )
          )}
        </p>

        <div className="flex items-center gap-2 mt-1">
          {techStack.map((tech, idx) => (
            <span key={idx} className="font-mono text-[0.68rem] text-muted">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-shrink-0">
        <div className="flex items-center gap-4 text-xs font-mono">
          {project.evidenceLinks.github && (
            <a
              href={project.evidenceLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
            >
              Source
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-muted hover:text-primary transition-colors"
          >
            Case
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
