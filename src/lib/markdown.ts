import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface MarkdownContent {
  frontmatter: {
    title?: string;
    date?: string;
    tags?: string[];
    stack?: string[];
    repo?: string;
    [key: string]: any;
  };
  content: string;
  htmlContent: string;
}

export async function parseMarkdown(markdownText: string): Promise<MarkdownContent> {
  const { data: frontmatter, content } = matter(markdownText);
  
  // Process markdown to HTML
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);
  
  const htmlContent = processedContent.toString();
  
  return {
    frontmatter,
    content,
    htmlContent
  };
}

// Load markdown file from public/content/projects/ or import as text
// For Vite, we'll need to use dynamic imports or fetch from public folder
export async function loadMarkdownFile(slug: string): Promise<MarkdownContent | null> {
  try {
    // In Vite, we can use dynamic import for markdown files
    // We'll fetch from public/content/projects/ folder
    const response = await fetch(`/content/projects/${slug}.md`);
    if (!response.ok) {
      return null;
    }
    const text = await response.text();
    return parseMarkdown(text);
  } catch (error) {
    console.error(`Error loading markdown for ${slug}:`, error);
    return null;
  }
}

