import Link from 'next/link';
import { Terminal } from 'lucide-react';
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
    <div className="group flex items-center gap-4 py-3 border-b border-white/5 hover:bg-white/5 hover:border-l-2 hover:border-blue-400 hover:-ml-1 transition-all rounded-sm">
      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-slate-600">
        <Terminal size={20} />
      </div>

      {/* Main Info */}
      <div className="flex-1 min-w-0">
        {/* Top Line: Title + Status Badge */}
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-base font-sans font-bold text-white">
            {project.title}
          </h3>
          <span className="text-[10px] px-1.5 py-0.5 border border-slate-700 rounded text-slate-400 font-mono uppercase tracking-wide">
            v1.0
          </span>
        </div>

        {/* Middle Line: Description with merged constraints */}
        <p className="text-sm text-slate-400 mb-1 font-mono leading-relaxed">
          {description.split(/(\*\*.*?\*\*)/).map((part, idx) => 
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={idx} className="text-slate-300">{part.slice(2, -2)}</strong>
            ) : (
              <span key={idx}>{part}</span>
            )
          )}
        </p>

        {/* Bottom Line: Tech Stack */}
        <div className="flex items-center gap-2 mt-1">
          {techStack.map((tech, idx) => (
            <span key={idx} className="text-[10px] text-slate-500 font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Actions (Right Aligned, Show on Hover) */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4 text-xs font-mono">
          {project.evidenceLinks.github && (
            <a
              href={project.evidenceLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors"
            >
              [ View Code ]
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="text-slate-500 hover:text-blue-400 transition-colors"
          >
            [ Case Study ]
          </Link>
        </div>
      </div>
    </div>
  );
}

