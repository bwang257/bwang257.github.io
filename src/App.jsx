import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ExternalLink,
  Sparkles,
  Layers,
  Cpu as CpuIcon,
  Menu,
  X,
} from "lucide-react";

/* ===============================================================
   ANIMATED MESH GRADIENT BACKGROUND
================================================================ */
const MeshGradient = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh animate-mesh-gradient" />
      <div className="absolute inset-0 bg-deep-space" style={{ mixBlendMode: 'multiply' }} />
    </div>
  );
};

/* ===============================================================
   SIDEBAR NAVIGATION (Glassmorphism)
================================================================ */
const Sidebar = ({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen }) => {
  const navItems = [
    { id: "profile", label: "Profile", icon: Sparkles },
    { id: "projects", label: "Projects", icon: Layers },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex fixed left-0 top-0 h-full w-20 z-40 flex-col items-center py-8"
      >
        <div className="backdrop-blur-glass bg-white/5 border-r border-white/10 h-full rounded-r-2xl flex flex-col items-center justify-between py-8">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-gradient-electric text-white shadow-lg shadow-blue-500/50"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                  title={item.label}
                >
                  <Icon size={20} />
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-xl bg-gradient-electric -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
          <div className="text-xs text-gray-500 font-mono">BW</div>
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="md:hidden fixed top-4 left-4 z-50 p-3 backdrop-blur-glass bg-white/5 border border-white/10 rounded-xl text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="md:hidden fixed left-0 top-0 h-full w-64 z-40 backdrop-blur-glass bg-white/5 border-r border-white/10"
          >
            <div className="flex flex-col gap-4 p-6 pt-20">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      isActive
                        ? "bg-gradient-electric text-white shadow-lg shadow-blue-500/50"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ===============================================================
   TECH STACK DOCK (macOS-style)
================================================================ */
const TechDock = () => {
  const techStack = [
    { name: "Python", icon: Code, color: "text-yellow-400" },
    { name: "React", icon: FileCode, color: "text-cyan-400" },
    { name: "C++", icon: CpuIcon, color: "text-blue-400" },
    { name: "AWS", icon: Cloud, color: "text-orange-400" },
    { name: "PostgreSQL", icon: Database, color: "text-blue-300" },
    { name: "Flask", icon: FlaskConical, color: "text-red-400" },
    { name: "Git", icon: GitBranch, color: "text-orange-300" },
    { name: "Linux", icon: Terminal, color: "text-green-400" },
  ];

  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
    >
      <div className="backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-2 md:gap-4 shadow-2xl overflow-x-auto max-w-[90vw]">
        {techStack.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.05, type: "spring" }}
              onHoverStart={() => setHoveredTech(tech.name)}
              onHoverEnd={() => setHoveredTech(null)}
              className="relative flex-shrink-0"
            >
              <div className={`p-2 md:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-default ${tech.color}`}>
                <Icon size={18} className="md:w-5 md:h-5" />
              </div>
              <AnimatePresence>
                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-deep-space-light border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white whitespace-nowrap z-50"
                  >
                    {tech.name}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ===============================================================
   BENTO GRID CARD COMPONENT
================================================================ */
const BentoCard = ({ children, className = "", span = "col-span-1", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`${span} backdrop-blur-glass bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group ${className}`}
    >
      {children}
    </motion.div>
  );
};

/* ===============================================================
   PROFILE WIDGET (Hero Card)
================================================================ */
const ProfileWidget = () => {
  return (
    <BentoCard span="col-span-2 row-span-2" delay={0.1}>
      <div className="h-full flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-electric opacity-10 blur-3xl" />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-electric bg-clip-text text-transparent"
          >
            Brian Wang.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 font-light mb-8"
          >
            Full-Stack Engineering & Applied Mathematics
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 leading-relaxed max-w-2xl"
          >
            Math/CS double major at WPI. Building high-performance systems and solving complex problems through the intersection of abstract theory and practical engineering.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 flex gap-4 mt-8"
        >
          <a
            href="https://linkedin.com/in/brian372"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-electric text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
          <a
            href="https://github.com/bwang257"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white/20 text-gray-300 rounded-xl font-medium hover:bg-white/10 hover:border-white/40 transition-all flex items-center gap-2"
          >
            <Github size={18} />
            GitHub
          </a>
        </motion.div>
      </div>
    </BentoCard>
  );
};

/* ===============================================================
   PROJECT CARD COMPONENT
================================================================ */
const ProjectCard = ({
  title,
  description,
  techTags,
  primaryLink,
  primaryLabel,
  secondaryLink,
  featured = false,
  delay = 0,
}) => {
  return (
    <BentoCard span={featured ? "col-span-2" : "col-span-1"} delay={delay}>
      <div className="h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          {primaryLink && (
            <motion.a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
        </div>
        <p className="text-gray-400 mb-6 leading-relaxed flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-auto">
          {primaryLink && (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-electric text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all text-sm flex items-center gap-2"
            >
              {primaryLabel || "Launch"}
              <ArrowUpRight size={14} />
            </a>
          )}
          {secondaryLink && (
            <a
              href={secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-white/20 text-gray-300 rounded-lg font-medium hover:bg-white/10 transition-all text-sm flex items-center gap-2"
            >
              <Github size={14} />
              Code
            </a>
          )}
        </div>
      </div>
    </BentoCard>
  );
};

/* ===============================================================
   PROJECTS SECTION
================================================================ */
const ProjectsSection = () => {
  const projects = [
    {
      title: "Portfolio Optimization Engine",
      description: "Real-time mathematical modeling and data visualization. Constructs optimal investment portfolios using Modern Portfolio Theory with interactive Efficient Frontier visualization.",
      techTags: ["React", "Math", "FinTech", "Data Viz"],
      primaryLink: "https://portfolio-optimization-app.vercel.app/",
      primaryLabel: "Launch App",
      secondaryLink: "https://github.com/bwang257/portfolio-optimization-app",
      featured: true,
    },
    {
      title: "Gamified Productivity Platform",
      description: "Full-stack Scrum/Agile workflow solution. Led 4-person team building a React frontend with Flask backend, PostgreSQL on AWS RDS.",
      techTags: ["AWS", "PostgreSQL", "React", "Flask"],
      featured: false,
    },
    {
      title: "Algorithmic Logic Core",
      description: "Modular Python architecture for automated decision making. Backtested quantitative strategies including statistical arbitrage on 5 years of historical data.",
      techTags: ["Python", "QuantConnect", "Backtesting"],
      secondaryLink: "https://github.com/bwang257/IQP-2524-Stock-Market-Simulation",
      featured: false,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Deployed Modules
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} delay={0.2 + idx * 0.1} />
        ))}
      </div>
    </div>
  );
};

/* ===============================================================
   CONTACT SECTION
================================================================ */
const ContactSection = () => {
  return (
    <BentoCard span="col-span-2" delay={0.4}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Always open to discussing new opportunities, interesting projects, or connecting with fellow engineers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="mailto:brian.wang372@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-electric text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
          >
            <Mail size={18} />
            Email Me
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/brian372"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-white/20 text-gray-300 rounded-xl font-medium hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Linkedin size={18} />
            LinkedIn
          </motion.a>
          <motion.a
            href="https://github.com/bwang257"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-white/20 text-gray-300 rounded-xl font-medium hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Github size={18} />
            GitHub
          </motion.a>
        </div>
      </div>
    </BentoCard>
  );
};

/* ===============================================================
   MAIN APP COMPONENT
================================================================ */
export default function App() {
  const [activeSection, setActiveSection] = useState("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-deep-space text-white font-sans antialiased overflow-x-hidden">
      <MeshGradient />
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <TechDock />
      
      <main className="md:ml-20 px-4 md:px-6 py-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeSection === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <ProfileWidget />
                <BentoCard span="col-span-1" delay={0.2}>
                  <div className="h-full flex flex-col justify-center">
                    <div className="text-4xl font-bold mb-2 bg-gradient-electric bg-clip-text text-transparent">
                      WPI
                    </div>
                    <div className="text-gray-400 text-sm">Math & CS</div>
                    <div className="text-gray-500 text-xs mt-2">Double Major</div>
                  </div>
                </BentoCard>
                <BentoCard span="col-span-1" delay={0.25}>
                  <div className="h-full flex flex-col justify-center">
                    <div className="text-4xl font-bold mb-2 bg-gradient-electric bg-clip-text text-transparent">
                      Summer 2026
                    </div>
                    <div className="text-gray-400 text-sm">Seeking Internship</div>
                    <div className="text-gray-500 text-xs mt-2">Engineering & Data</div>
                  </div>
                </BentoCard>
              </motion.div>
            )}

            {activeSection === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectsSection />
              </motion.div>
            )}

            {activeSection === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <ContactSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
