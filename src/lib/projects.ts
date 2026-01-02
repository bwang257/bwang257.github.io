import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface EvidenceLinks {
  caseStudy?: string;
  github?: string;
  tests?: string;
  benchmarks?: string;
  readme?: string;
}

export interface ProjectSection {
  title: string;
  content: string; // Markdown content
}

export interface Project {
  slug: string;
  title: string;
  summary: string; // One-line problem statement
  tools: string[]; // Tools and technologies used
  evidenceLinks: EvidenceLinks;
  facts: string[]; // 3 verifiable facts without numbers
  // Case study sections
  sections: ProjectSection[];
  order: number; // Order for display (lower numbers appear first)
}

interface ProjectFrontmatter {
  title: string;
  summary: string;
  tools: string[];
  evidenceLinks: EvidenceLinks;
  facts: string[];
  order?: number; // Optional order field for custom ordering
}

// Parse markdown content into sections based on h2 headers
function parseSections(content: string): ProjectSection[] {
  // Split by h2 headers (## Title)
  const sectionRegex = /^## (.+)$/gm;
  const sections: ProjectSection[] = [];
  let lastIndex = 0;
  let lastTitle = '';
  
  const matches = Array.from(content.matchAll(sectionRegex));
  
  if (matches.length === 0) {
    // No sections found, return the whole content as one section
    return [{ title: 'Overview', content: content.trim() }];
  }
  
  matches.forEach((match, index) => {
    if (match.index === undefined) return;
    
    // Get content from previous section end to this section start
    if (index > 0) {
      const sectionContent = content.substring(lastIndex, match.index).trim();
      if (sectionContent) {
        sections.push({
          title: lastTitle,
          content: sectionContent
        });
      }
    }
    
    lastTitle = match[1];
    lastIndex = match.index + match[0].length;
  });
  
  // Add the last section
  const lastSectionContent = content.substring(lastIndex).trim();
  if (lastSectionContent) {
    sections.push({
      title: lastTitle,
      content: lastSectionContent
    });
  }
  
  return sections;
}

function loadProjects(): Project[] {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');
  const filenames = fs.readdirSync(projectsDirectory);
  
  const projects: Project[] = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(projectsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const frontmatter = data as ProjectFrontmatter;
      const sections = parseSections(content);
      
      return {
        slug,
        title: frontmatter.title,
        summary: frontmatter.summary,
        tools: frontmatter.tools || [],
        evidenceLinks: frontmatter.evidenceLinks || {},
        facts: frontmatter.facts || [],
        sections,
        order: frontmatter.order ?? 999 // Default to 999 if no order specified
      };
    })
    .sort((a, b) => {
      // Sort by order field, then by title if order is the same
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.title.localeCompare(b.title);
    });
  
  return projects;
}

// Load projects at build time
export const projects: Project[] = loadProjects();

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.slice(0, 2); // Exchange Simulator and Portfolio Optimization
}
