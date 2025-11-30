import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  Code,
  Database,
  Cloud,
  Terminal,
  GitBranch,
  FlaskConical,
  Cpu,
  Server,
  BarChart3,
  Zap,
  FileCode,
  Menu,
  X,
} from "lucide-react";

/* ===============================================================
   1. GLOBAL STYLES
================================================================ */
const GlobalStyles = () => (
  <style>{`
    .fade-in-section {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-section.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `}</style>
);

/* ===============================================================
   2. HOOKS
================================================================ */

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
};

const AnimatedSection = ({ children, className = "", id = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setIsVisible(true));
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      id={id}
      ref={ref}
      className={`fade-in-section ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
};

/* ===============================================================
   3. PARTICLE NETWORK BACKGROUND
================================================================ */

const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    const particleCount = 50;
    const connectionDistance = 150;
    const color = "rgba(34, 211, 238, 0.4)"; // cyan-400

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const updateParticles = () => {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
      });
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawParticles = () => {
      particles.forEach((p) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      drawConnections();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
};

/* ===============================================================
   4. NAVIGATION
================================================================ */

const Navigation = ({ scrollY }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ["About", "Projects", "Skills", "Contact"];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId.toLowerCase())?.scrollIntoView({
      behavior: "smooth",
    });
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50
          ? "bg-slate-950/95 backdrop-blur-md border-b border-cyan-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          {"<BW />"}
        </button>
        <div className="hidden md:flex gap-8 text-gray-300 font-medium">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="hover:text-cyan-400 transition-colors relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-cyan-500/20">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-left text-gray-300 hover:text-cyan-400 transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

/* ===============================================================
   5. HERO SECTION
================================================================ */

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <ParticleNetwork />
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1 className="text-7xl md:text-9xl font-mono font-bold mb-6 text-cyan-400 tracking-tight">
          Brian Wang.
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-300 font-sans max-w-3xl mx-auto leading-relaxed">
          Engineer & Mathematician. Building high-performance systems and analyzing complex data at WPI.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => scrollToSection("projects")}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all hover:scale-105 shadow-lg shadow-cyan-500/50"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold rounded-lg transition-all hover:scale-105"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

/* ===============================================================
   6. ABOUT SECTION
================================================================ */

const AboutSection = () => (
  <AnimatedSection
    id="about"
    className="py-20 px-6 bg-slate-900/50 backdrop-blur-sm"
  >
    <div className="max-w-4xl mx-auto">
      <h2 className="text-5xl md:text-6xl font-mono font-bold mb-8 text-cyan-400">
        About
      </h2>
      <div className="bg-slate-800/50 rounded-xl p-8 border border-cyan-500/20">
        <p className="text-lg leading-relaxed text-gray-300 font-sans">
          I'm a Math/CS double major at WPI who bridges the gap between abstract theory and practical application. I don't just learn concepts; I engineer solutions—from building full-stack web apps to developing modular algorithmic trading strategies. I'm seeking a Summer 2026 internship where I can apply my skills in systems programming, data analysis, and software engineering to tackle real-world challenges.
        </p>
      </div>
    </div>
  </AnimatedSection>
);

/* ===============================================================
   7. PROJECTS SECTION
================================================================ */

const ProjectCard = ({
  title,
  description,
  tags,
  primaryLink,
  primaryLabel,
  secondaryLink,
  secondaryLabel,
  featured = false,
}) => (
  <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-2xl font-mono font-bold text-cyan-400">{title}</h3>
      {primaryLink && (
        <a
          href={primaryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-label={primaryLabel}
        >
          <ArrowUpRight size={20} />
        </a>
      )}
    </div>
    <p className="text-gray-300 mb-4 leading-relaxed font-sans">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-mono border border-cyan-500/30"
        >
          {tag}
        </span>
      ))}
    </div>
    <div className="flex gap-4 mt-4">
      {primaryLink && (
        <a
          href={primaryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all text-sm"
        >
          {primaryLabel}
        </a>
      )}
      {primaryLabel && !primaryLink && (
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-gray-400 font-semibold rounded-lg text-sm cursor-not-allowed"
        >
          {primaryLabel}
        </button>
      )}
      {secondaryLink && (
        <a
          href={secondaryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold rounded-lg transition-all text-sm"
        >
          <Github size={16} />
          {secondaryLabel}
        </a>
      )}
    </div>
  </div>
);

const ProjectsSection = () => (
  <AnimatedSection id="projects" className="py-20 px-6 bg-slate-950">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-5xl md:text-6xl font-mono font-bold mb-12 text-cyan-400">
        Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <ProjectCard
            title="Interactive Portfolio Optimization Dashboard"
            description="Developed a web-based financial modeling tool that constructs optimal investment portfolios using Modern Portfolio Theory (MPT). Engineered a reactive frontend to visualize the Efficient Frontier and calculate risk-adjusted returns (Sharpe Ratio) based on real-time market data. Implemented complex mathematical optimization algorithms directly in the application layer."
            tags={["React", "Modern Portfolio Theory", "Financial Modeling", "Data Visualization"]}
            primaryLink="https://portfolio-optimization-app.vercel.app/"
            primaryLabel="Launch Live App"
            secondaryLink="https://github.com/bwang257/portfolio-optimization-app"
            secondaryLabel="View Source"
            featured={true}
          />
        </div>
        <ProjectCard
          title="Full-Stack Productivity Platform"
          description="Architected a full-stack application to gamify the internship application process. Led a 4-person team using Agile/Scrum methodologies. Developed a responsive React frontend with a Flask backend, integrating a PostgreSQL database on AWS RDS for robust data management and implementing secure user authentication."
          tags={["React", "Flask", "PostgreSQL", "AWS RDS", "Agile/Scrum"]}
          primaryLink={null}
          primaryLabel="View Case Study"
        />
        <ProjectCard
          title="Modular Quant Trading Engine"
          description="Engineered a modular trading system in Python on QuantConnect. Implemented and backtested multiple quantitative strategies, including statistical arbitrage and mean-reversion, against 5 years of historical tick data. Designed the system for extensibility to allow rapid testing of new alpha signals."
          tags={["Python", "QuantConnect", "Statistical Arbitrage", "Backtesting"]}
          secondaryLink="https://github.com/bwang257/IQP-2524-Stock-Market-Simulation"
          secondaryLabel="View on GitHub"
        />
      </div>
    </div>
  </AnimatedSection>
);

/* ===============================================================
   8. SKILLS SECTION
================================================================ */

const SkillsMatrix = () => {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code size={24} className="text-cyan-400" />,
      skills: [
        { name: "Python", icon: <Code size={20} /> },
        { name: "C++", icon: <Cpu size={20} /> },
        { name: "JavaScript", icon: <Code size={20} /> },
        { name: "SQL", icon: <Database size={20} /> },
      ],
    },
    {
      title: "Frontend & Frameworks",
      icon: <FileCode size={24} className="text-cyan-400" />,
      skills: [
        { name: "React", icon: <FileCode size={20} /> },
        { name: "Tailwind CSS", icon: <Zap size={20} /> },
        { name: "HTML/CSS", icon: <Code size={20} /> },
      ],
    },
    {
      title: "Backend & Cloud",
      icon: <Cloud size={24} className="text-cyan-400" />,
      skills: [
        { name: "Flask", icon: <FlaskConical size={20} /> },
        { name: "Node.js", icon: <Server size={20} /> },
        { name: "AWS", icon: <Cloud size={20} /> },
        { name: "PostgreSQL", icon: <Database size={20} /> },
      ],
    },
    {
      title: "Tools & Methods",
      icon: <Terminal size={24} className="text-cyan-400" />,
      skills: [
        { name: "Git", icon: <GitBranch size={20} /> },
        { name: "Scrum/Agile", icon: <BarChart3 size={20} /> },
        { name: "Linux", icon: <Terminal size={20} /> },
      ],
    },
  ];

  return (
    <AnimatedSection id="skills" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-mono font-bold mb-12 text-cyan-400">
          Technical Skills
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                {category.icon}
                <h3 className="text-xl font-mono font-semibold text-cyan-400">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {category.skills.map((skill, skillIdx) => (
                  <li
                    key={skillIdx}
                    className="flex items-center gap-3 text-gray-300 font-sans"
                  >
                    <span className="text-cyan-400">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

/* ===============================================================
   9. CONTACT SECTION
================================================================ */

const ContactSection = () => (
  <AnimatedSection id="contact" className="py-20 px-6 bg-slate-950">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-5xl md:text-6xl font-mono font-bold mb-6 text-cyan-400">
        Get in Touch
      </h2>
      <p className="text-lg text-gray-300 mb-8 font-sans max-w-2xl mx-auto">
        I'm always open to discussing new opportunities, interesting projects, or just connecting with fellow engineers and mathematicians.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <a
          href="mailto:brian.wang372@gmail.com"
          className="flex items-center gap-3 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all hover:scale-105"
        >
          <Mail size={20} />
          <span>Email Me</span>
        </a>
        <a
          href="https://linkedin.com/in/brian372"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold rounded-lg transition-all hover:scale-105"
        >
          <Linkedin size={20} />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/bwang257"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold rounded-lg transition-all hover:scale-105"
        >
          <Github size={20} />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </AnimatedSection>
);

/* ===============================================================
   10. FOOTER
================================================================ */

const Footer = () => (
  <footer className="py-8 text-center text-gray-500 border-t border-cyan-500/20 bg-slate-950">
    <p className="font-mono text-sm">
      Brian Wang {new Date().getFullYear()}. Built with React & Tailwind CSS.
    </p>
  </footer>
);

/* ===============================================================
   11. MAIN APP
================================================================ */

export default function App() {
  const scrollY = useScrollPosition();

  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased">
      <GlobalStyles />
      <Navigation scrollY={scrollY} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsMatrix />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
