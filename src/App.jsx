import { useTheme } from "./contexts/ThemeContext.jsx";
import { Github, Linkedin, Mail, ExternalLink, FileText } from "lucide-react";
import { Link } from 'react-router-dom';
import { getFeaturedProjects, projects } from './lib/projects';
import { ProjectCard } from './components/ProjectCard';
import { Card } from './components/Card';

function HomePage() {
  const { colors } = useTheme();
  const featuredProjects = getFeaturedProjects();
  const otherProjects = projects.filter(p => !p.featured);

  const skills = [
    {
      domain: "Systems",
      items: ["C++", "concurrency", "memory management"]
    },
    {
      domain: "Research",
      items: ["Python", "statistical modeling"]
    },
    {
      domain: "Infrastructure",
      items: ["Linux", "Git", "profiling/debugging tools"]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-[900px] mx-auto px-6 py-12 md:py-20">
        <Card className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <img
                src="/profile.png"
                alt="Brian Wang"
                className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 object-cover"
                style={{
                  borderColor: colors.border,
                  filter: 'saturate(0.9) contrast(1.05)'
                }}
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            <div className="flex-1">
              <h1 
                className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                style={{ color: colors.textSecondary }}
              >
                Brian Wang
              </h1>
              <p 
                className="text-lg md:text-xl mb-3"
                style={{ color: colors.text }}
              >
                CS + Math student building performance-critical systems and market simulations.
              </p>
              <p 
                className="text-base md:text-lg mb-8"
                style={{ color: colors.textMuted }}
              >
                Currently seeking Summer 2026 internships in SWE/systems/quant-dev.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="px-6 py-3 border rounded-md transition-all duration-150 text-base font-medium"
                  style={{
                    borderColor: colors.accent,
                    color: colors.accent,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.accentHover;
                    e.currentTarget.style.backgroundColor = 'rgba(21, 128, 61, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.accent;
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  View Projects
                </a>
                <a
                  href="/resume.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border rounded-md transition-all duration-150 flex items-center gap-2 text-base"
                  style={{
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.accent;
                    e.currentTarget.style.backgroundColor = 'rgba(21, 128, 61, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <FileText size={16} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-[900px] mx-auto px-6 py-8 md:py-12">
        <Card className="p-8 md:p-10">
          <div className="flex items-center justify-between mb-10">
            <h2 
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ color: colors.textSecondary }}
            >
              Projects
            </h2>
            <Link
              to="/projects"
              className="text-sm transition-colors font-medium"
              style={{ color: colors.textMuted }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.textMuted;
              }}
            >
              View all →
            </Link>
          </div>

          <div className="space-y-6">
            {/* Featured Project */}
            {featuredProjects.length > 0 && (
              <ProjectCard project={featuredProjects[0]} featured={true} />
            )}

            {/* Other Projects */}
            {otherProjects.slice(0, 2).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Card>
      </section>

      {/* About Section */}
      <section className="max-w-[900px] mx-auto px-6 py-8 md:py-12">
        <Card className="p-8 md:p-10">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-8 tracking-tight"
            style={{ color: colors.textSecondary }}
          >
            About
          </h2>
          <div 
            className="space-y-5 text-base md:text-lg"
            style={{ 
              color: colors.text,
              maxWidth: '65ch',
              lineHeight: '1.75'
            }}
          >
            <p>
              I build systems where correctness and performance matter. My work focuses on 
              low-level programming, concurrent algorithms, and quantitative modeling.
            </p>
            <p>
              I think about memory layouts, cache locality, and algorithmic complexity. 
              When something breaks, I trace it to the root cause—whether that's a race 
              condition, a misaligned struct, or a query planner choosing the wrong index.
            </p>
            <p>
              I care about systems that run correctly under load, code that's maintainable 
              under scrutiny, and solutions that scale without breaking.
            </p>
          </div>
        </Card>
      </section>

      {/* Skills Section */}
      <section className="max-w-[900px] mx-auto px-6 py-8 md:py-12">
        <Card className="p-8 md:p-10">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-8 tracking-tight"
            style={{ color: colors.textSecondary }}
          >
            Skills
          </h2>
          <div className="space-y-8">
            {skills.map((group, idx) => (
              <div key={idx}>
                <h3 
                  className="text-xs uppercase tracking-wider mb-4 font-semibold"
                  style={{ color: colors.textMuted }}
                >
                  {group.domain}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="text-base"
                      style={{ color: colors.text }}
                    >
                      {skill}
                      {skillIdx < group.items.length - 1 && (
                        <span style={{ color: colors.textMuted }}>, </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Footer / Contact */}
      <footer className="max-w-[900px] mx-auto px-6 py-8 md:py-12">
        <Card className="p-8 md:p-10">
          <div className="flex flex-wrap gap-6 md:gap-8">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors text-base duration-150"
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
              <FileText size={18} />
              Resume
            </a>
            <a
              href="https://github.com/bwang257"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors text-base duration-150"
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
            <a
              href="https://linkedin.com/in/brian372"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors text-base duration-150"
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
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a
              href="mailto:brian.wang372@gmail.com"
              className="flex items-center gap-2 transition-colors text-base duration-150"
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
              <Mail size={18} />
              Email
            </a>
          </div>
        </Card>
      </footer>
    </>
  );
}

function App() {
  const { colors } = useTheme();

  // Safety check - if colors is not defined, use fallback
  if (!colors || !colors.bg) {
          return (
      <div className="min-h-screen font-mono p-4" style={{ backgroundColor: '#0f1115', color: '#e5e7eb' }}>
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
      <HomePage />
    </div>
  );
}

export default App;
