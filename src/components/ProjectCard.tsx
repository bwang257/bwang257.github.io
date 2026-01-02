import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/lib/projects';
import ConstraintTags from './ConstraintTags';
import EvidenceLinks from './EvidenceLinks';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="data-card">
      <div className="grid grid-cols-[70%_30%] gap-6">
        {/* Left Column: Title, Description, Links */}
        <div className="flex flex-col">
          <h3 className="text-lg font-sans font-bold mb-2 text-white">
            {project.title}
          </h3>
          <p className="text-sm text-slate-300 mb-4 font-mono">
            {project.summary}
          </p>

          {project.facts && project.facts.length > 0 && (
            <ul className="space-y-1 mb-4 text-xs text-slate-400">
              {project.facts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-slate-600 mt-0.5">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <EvidenceLinks links={project.evidenceLinks} projectSlug={project.slug} />
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300"
              >
                Read →
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata */}
        <div className="flex flex-col">
          {project.constraints && project.constraints.length > 0 && (
            <div>
              <div className="text-xs text-slate-500 mb-2 font-mono uppercase tracking-wide">
                Constraints
              </div>
              <ConstraintTags constraints={project.constraints} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
