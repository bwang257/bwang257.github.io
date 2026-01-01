import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { projects, Project } from '../lib/projects';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectFilter } from '../components/ProjectFilter';
import { Card } from '../components/Card';

function ProjectsPageWrapper() {
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
      <ProjectsPage />
    </div>
  );
}

function ProjectsPage() {
  const { colors } = useTheme();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    let filtered: Project[] = projects;

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        selectedTags.some(tag => project.tags.includes(tag))
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedTags, searchQuery]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="max-w-[900px] mx-auto px-6 py-12 md:py-20">
      <Link
        to="/"
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
        ← Back to home
      </Link>

      <Card className="p-8 md:p-10">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          style={{ color: colors.textSecondary }}
        >
          Projects
        </h1>
        <p
          className="text-lg mb-10"
          style={{ color: colors.textMuted }}
        >
          Systems, quant modeling, and infrastructure work.
        </p>

        <ProjectFilter
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {filteredProjects.length === 0 ? (
          <div
            className="text-center py-16 px-6 rounded-lg border"
            style={{
              backgroundColor: colors.bgTertiary,
              borderColor: colors.border
            }}
          >
            <p style={{ color: colors.textMuted }}>
              No projects match your filters. Try adjusting your search or tags.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export { ProjectsPageWrapper as ProjectsPage };
