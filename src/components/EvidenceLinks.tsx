import Link from 'next/link';
import { Github, FileText, Zap, BookOpen } from 'lucide-react';
import { EvidenceLinks as EvidenceLinksType } from '@/lib/projects';

interface EvidenceLinksProps {
  links: EvidenceLinksType;
  projectSlug: string;
}

export default function EvidenceLinks({ links, projectSlug }: EvidenceLinksProps) {
  const items = [];

  if (links.caseStudy || projectSlug) {
    items.push({
      label: 'Case Study',
      href: links.caseStudy || `/projects/${projectSlug}`,
      icon: FileText,
    });
  }

  if (links.github) {
    items.push({
      label: 'GitHub',
      href: links.github,
      icon: Github,
      external: true
    });
  }

  if (links.benchmarks) {
    items.push({
      label: 'Benchmarks',
      href: links.benchmarks,
      icon: Zap,
      external: true
    });
  }

  if (links.tests) {
    items.push({
      label: 'Tests',
      href: links.tests,
      icon: Zap,
      external: true
    });
  }

  if (links.readme) {
    items.push({
      label: 'README',
      href: links.readme,
      icon: BookOpen,
      external: true
    });
  }

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
      {items.map((item, idx) => {
        const Icon = item.icon;

        if (item.external) {
          return (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300"
            >
              <Icon size={14} />
              {item.label}
            </a>
          );
        }

        return (
          <Link
            key={idx}
            href={item.href}
            className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover"
          >
            <Icon size={14} />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
