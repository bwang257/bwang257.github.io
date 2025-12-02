import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Database,
  FlaskConical,
  Terminal,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Circle,
  Lock,
  FileText,
} from "lucide-react";

/* ===============================================================
   SYSTEM DATA (The "Memory")
================================================================ */
const SYSTEM_DATA = {
  status: "OPERATIONAL",
  location: "Worcester, MA",
  uptime: "20 Years",
  horizon: {
    building: "Portfolio Optimization App - full-stack",
    learning: "Operating Systems, Linear Algebra, & Stochastic Calculus",
    goal: "Develop impactful applications used by real users"

  },
  timeDistribution: { coding: 59, mathematics: 31, misc: 10 }
};

/* ===============================================================
   TEXTURE OVERLAYS (Noise & Scanline)
================================================================ */
const TextureOverlays = () => {
  return (
    <>
      <div className="noise-overlay" />
      <div className="scanline" />
    </>
  );
};


/* ===============================================================
   TOP BAR (System Tray)
================================================================ */
const SystemTray = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toUTCString().split(' ')[4];
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-[#0c0c0c] border-b border-white/10 z-50 flex items-center justify-between px-6">
      <motion.div
        onHoverStart={() => setIsGlitching(true)}
        onHoverEnd={() => setIsGlitching(false)}
        className="font-mono text-sm text-[#e5e5e5] relative"
      >
        <span className={isGlitching ? "glitch-text" : ""}>BrianOS v1.0</span>
      </motion.div>
      <div className="flex items-center gap-6 text-xs font-mono text-[#e5e5e5]/80 uppercase tracking-wider">
        <span>{formatTime(currentTime)} UTC</span>
        <span>{SYSTEM_DATA.location}</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00ff00] animate-pulse" />
          <span>System Status: Online</span>
        </div>
      </div>
    </div>
  );
};

/* ===============================================================
   WINDOW COMPONENT WRAPPER (With Controls)
================================================================ */
const Window = ({ id, title, children, status, isMaximized, onClose, onMinimize, onMaximize }) => {
  // Red Button: Close - Return null if closed
  if (status === 'closed') {
    return null;
  }

  // Yellow Button: Minimize - Hide window but keep active
  if (status === 'minimized') {
    return null;
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`bg-[#0c0c0c] border border-white/10 rounded-sm flex flex-col grid-background ${
        isMaximized 
          ? "fixed inset-4 z-50 backdrop-blur-sm" 
          : "min-h-[400px]"
      }`}
      style={isMaximized ? { 
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(12, 12, 12, 0.95)'
      } : {}}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#0c0c0c]/50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#e5e5e5]/60 uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Window Controls: Red (Close), Yellow (Minimize), Green (Maximize) */}
          <button
            onClick={onClose}
            className="w-3 h-3 bg-[#ff3333] rounded-sm hover:bg-[#ff5555] transition-colors"
            aria-label="Close window"
          />
          <button
            onClick={onMinimize}
            className="w-3 h-3 bg-[#ffaa00] rounded-sm hover:bg-[#ffcc00] transition-colors"
            aria-label="Minimize window"
          />
          <button
            onClick={onMaximize}
            className="w-3 h-3 bg-[#00ff00] rounded-sm hover:bg-[#33ff33] transition-colors"
            aria-label="Maximize window"
          />
        </div>
      </div>
      {/* Window Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </motion.div>
  );
};

/* ===============================================================
   WINDOW 1: USER PROFILE
================================================================ */
const UserProfileWindow = () => {
  const [hoveredPort, setHoveredPort] = useState(null);

  const ports = [
    { port: "22/TCP", service: "GITHUB", url: "https://github.com/bwang257", id: "github" },
    { port: "443/TCP", service: "LINKEDIN", url: "https://linkedin.com/in/brian372", id: "linkedin" },
    { port: "25/SMTP", service: "EMAIL", url: "mailto:brian.wang372@gmail.com", id: "email" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#e5e5e5] mb-4 tracking-tight">Brian Wang</h2>
        
        {/* README-style Bio Sections */}
        <div className="font-mono text-sm space-y-4">
          <div>
            <span className="text-[#e5e5e5]/50 font-bold"># BIO</span>
            <p className="mt-1 text-[#e5e5e5] leading-relaxed">
              CS/Math sophomore exploring pure math and messy code.
            </p>
          </div>
          
          <div>
            <span className="text-[#e5e5e5]/50 font-bold"># MISSION</span>
            <p className="mt-1 text-[#e5e5e5] leading-relaxed">
              I like building things to understand how they work, from low-level systems to quantitative trading strategies.
            </p>
          </div>

          <div>
            <span className="text-[#e5e5e5]/50 font-bold"># STATUS</span>
            <p className="mt-1 text-[#e5e5e5] leading-relaxed">
              Currently running on Celsius and looking for a Summer 2026 internship.
        </p>
      </div>
    </div>
      </div>
      
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs font-mono text-[#e5e5e5]/60 mb-3 uppercase tracking-wider">OPEN PORTS:</p>
        <div className="space-y-2 font-mono text-sm">
          {ports.map((port) => (
            <motion.a
              key={port.id}
              href={port.url}
              target={port.id === "email" ? undefined : "_blank"}
              rel={port.id === "email" ? undefined : "noopener noreferrer"}
              className="block text-[#e5e5e5]/60 hover:text-[#00ff00] transition-colors"
              onHoverStart={() => setHoveredPort(port.id)}
              onHoverEnd={() => setHoveredPort(null)}
              whileHover={{ x: 2 }}
            >
              {hoveredPort === port.id && <span className="text-[#00ff00]">_</span>}
              {port.port} :: {port.service}
            </motion.a>
      ))}
    </div>
        <a
          href="/resume.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-[#e5e5e5]/60 hover:text-[#00ff00] transition-colors inline-block mt-4"
        >
          &gt; [DOWNLOAD_RESUME]
        </a>
    </div>
  </div>
);
};

/* ===============================================================
   WINDOW 2: SYSTEM MONITOR
================================================================ */
const SystemMonitorWindow = () => {
  const systemMetrics = {
    engineeringActivity: "HIGH",
    commits30d: "70+",
    codingHours7d: "~30",
    activeProjects: "Portfolio Engine • XPply",
    primaryStack: "Python • C++"
  };

  const activeProcesses = [
    { pid: 4312, name: "portfolio_engine_dev", status: "RUNNING" },
    { pid: 2241, name: "xp-ply_frontend", status: "RUNNING" },
    { pid: 5530, name: "os_course_practice", status: "SLEEPING" },
    { pid: 8722, name: "quant_research", status: "IDLE" }
  ];

  return (
    <div className="p-6 space-y-6 flex flex-col h-full">
        <div>
          <p className="text-xs font-mono text-[#e5e5e5]/60 mb-3 uppercase tracking-wider">THE HORIZON:</p>
          <ul className="space-y-2 text-sm text-[#e5e5e5]/80">
            <li className="flex items-start gap-2">
              <span className="text-[#ff3333]">&gt;</span>
              <span>Building: {SYSTEM_DATA.horizon.building}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ff3333]">&gt;</span>
              <span>Learning: {SYSTEM_DATA.horizon.learning}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ff3333]">&gt;</span>
              <span>Goal: {SYSTEM_DATA.horizon.goal}</span>
            </li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col min-h-0 space-y-6">
          {/* SYSTEM METRICS */}
          <div>
            <div className="mb-2">
              <p className="text-sm font-mono text-[#d19a66] uppercase tracking-wider">SYSTEM METRICS</p>
              <div className="h-px bg-[#d19a66] mt-1" />
            </div>
            <div className="font-mono text-sm space-y-1 text-[#e5e5e5]">
              <div>
                <span className="text-[#e5e5e5]">Engineering Activity:</span>
                {' '}
                <span>{systemMetrics.engineeringActivity}</span>
              </div>
              <div>
                <span className="text-[#e5e5e5]">Commits (30d):</span>
                {' '}
                <span>{systemMetrics.commits30d}</span>
              </div>
              <div>
                <span className="text-[#e5e5e5]">Coding Hours (7d):</span>
                {' '}
                <span>{systemMetrics.codingHours7d}</span>
              </div>
              <div>
                <span className="text-[#e5e5e5]">Active Projects:</span>
                {' '}
                <span>{systemMetrics.activeProjects}</span>
              </div>
              <div>
                <span className="text-[#e5e5e5]">Primary Stack:</span>
                {' '}
                <span>{systemMetrics.primaryStack}</span>
              </div>
            </div>
          </div>

          {/* ACTIVE PROCESSES */}
          <div>
            <div className="mb-2">
              <p className="text-sm font-mono text-[#d19a66] uppercase tracking-wider">ACTIVE PROCESSES</p>
              <div className="h-px bg-[#d19a66] mt-1" />
            </div>
            <div className="font-mono text-sm space-y-1 text-[#e5e5e5]">
              {activeProcesses.map((process) => (
                <div key={process.pid}>
                  <span>PID {process.pid}</span>
                  {' '}
                  <span>{process.name}</span>
                  {' '}
                  <span className={process.status === 'RUNNING' ? 'text-[#98c379]' : 'text-[#9099a1]'}>
                    {process.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
);
};

/* ===============================================================
   WINDOW 3: RUNNING SERVICES (Projects)
================================================================ */
const RunningServicesWindow = () => {
  const projects = [
    {
      pid: "PID-001",
      name: "Portfolio Optimization Engine",
      problem: "People shouldn’t need a quant degree to optimize their portfolios.",
      link: "https://portfolio-optimization-app.vercel.app/",
      github: "https://github.com/bwang257/PortfolioOptimizationApp",
      access: "public"
    },
    {
      pid: "PID-002",
      name: "Gamified Productivity Platform",
      problem: "Students needed motivation + structure in their internship search.",
      github: null,
      access: "private"
    },
    {
      pid: "PID-003",
      name: "Algorithmic Trading System",
      problem: "Curiosity about trading systems required building one.",
      link: "https://digital.wpi.edu/concern/student_works/nz806420r?locale=en",
      github: "https://github.com/bwang257/IQP-2524-Stock-Market-Simulation",
      access: "public"
    }
  ];

  const handlePrivateRepoClick = () => {
    const errorMsg = "> Access Denied: Repository is private (WPI Academic Policy).";
    window.dispatchEvent(new CustomEvent('consoleError', { detail: errorMsg }));
  };

  return (
    <div className="p-6 space-y-4">
        {projects.map((project, idx) => (
          <div key={idx} className="border-l-2 border-[#ff3333] pl-4 py-2">
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <div>
                  <span className="text-xs font-mono text-[#e5e5e5]/60 uppercase tracking-wider">{project.pid}</span>
                  <span className="text-sm font-mono text-[#e5e5e5] ml-2 tracking-tight">{project.name}</span>
                </div>
                {project.access === "private" && (
                  <span className="text-xs font-mono text-[#e5e5e5]/40 bg-white/5 px-2 py-0.5 rounded-sm border border-white/10 uppercase tracking-wider">
                    [CLASSIFIED / ACADEMIC]
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[#e5e5e5]/60 hover:text-[#e5e5e5]">
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.github && project.access === "public" && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#e5e5e5]/60 hover:text-[#e5e5e5]">
                    <Github size={14} />
                  </a>
                )}
                {project.access === "private" && (
                  <button
                    onClick={handlePrivateRepoClick}
                    className="text-[#e5e5e5]/30 hover:text-[#ff3333] transition-colors"
                    title="Private Repository"
                  >
                    <Lock size={14} />
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs text-[#e5e5e5]/60 font-mono">
              &gt; Problem: {project.problem}
            </p>
          </div>
        ))}
    </div>
  );
};

/* ===============================================================
   WINDOW 4: INSTALLED PACKAGES (Skills - Pip List Style)
================================================================ */
const InstalledPackagesWindow = () => {
  const skillCategories = {
    "~/lib/languages/": [
      { name: "Python", ver: "v3.5", desc: "ML, Data Analysis, Backend" },
      { name: "Java", ver: "v2.0", desc: "Object-Oriented Development" },
      { name: "C/C++", ver: "v2.0", desc: "Systems Programming" },
      { name: "JavaScript", ver: "v2.5", desc: "Frontend Development" },
      { name: "TypeScript", ver: "v1.5", desc: "Type-Safe Frontend" },
      { name: "SQL", ver: "v2.5", desc: "Relational Databases" },
      { name: "MATLAB", ver: "v1.0", desc: "Numerical Computing" },
      { name: "R", ver: "v1.0", desc: "Statistical Analysis" }
    ],
  
    "~/lib/frameworks/": [
      { name: "React", ver: "v2.5", desc: "UI Framework" },
      { name: "Flask", ver: "v2.0", desc: "Python REST APIs" },
      { name: "Node.js", ver: "v2.0", desc: "Backend Runtime" },
      { name: "scikit-learn", ver: "v2.0", desc: "Machine Learning" },
      { name: "PyTorch", ver: "v1.5", desc: "Deep Learning" }
    ],
  
    "~/lib/tools/": [
      { name: "AWS", ver: "v1.5", desc: "Cloud Deployment" },
      { name: "Docker", ver: "v2.0", desc: "Containerization" },
      { name: "Git", ver: "v3.0", desc: "Version Control" },
      { name: "GitHub / GitLab", ver: "v2.5", desc: "DevOps & Collaboration" },
      { name: "PostgreSQL", ver: "v2.0", desc: "Relational DB" },
      { name: "MySQL", ver: "v1.5", desc: "Relational DB" },
      { name: "Jupyter", ver: "v2.0", desc: "Data Science Environment" },
      { name: "Figma", ver: "v1.0", desc: "UI/UX Design" },
      { name: "NumPy", ver: "v2.0", desc: "Numerical Computing" },
      { name: "Pandas", ver: "v2.0", desc: "Data Manipulation" },
      { name: "Matplotlib", ver: "v1.5", desc: "Data Visualization" },
      { name: "Power BI", ver: "v1.0", desc: "Data Analytics" }
    ]
  };  

  return (
    <div className="p-6">
      <div className="font-mono text-xs space-y-4">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category}>
            <div className="text-[#e5e5e5]/40 mb-2">{category}</div>
            <div className="space-y-1">
              <div className="grid grid-cols-[1fr_80px_1fr] gap-4 text-[#e5e5e5]/60 mb-1 uppercase tracking-wider">
                <div>PKG</div>
                <div>VER</div>
                <div>DESC</div>
              </div>
              {skills.map((skill, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_80px_1fr] gap-4 hover:text-[#e5e5e5] transition-colors">
                  <div className="text-[#e5e5e5]/80">{skill.name}</div>
                  <div className="text-[#e5e5e5]/60">{skill.ver}</div>
                  <div className="text-[#e5e5e5]/60">{skill.desc}</div>
                </div>
              ))}
            </div>
            </div>
          ))}
        </div>
      </div>
  );
};

/* ===============================================================
   CONSOLE COMPONENT (Resizable)
================================================================ */
const Console = () => {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [height, setHeight] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const inputRef = useRef(null);
  const historyEndRef = useRef(null);
  const consoleRef = useRef(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('brianos_visited');
    if (hasVisited) {
      setIsInitialized(true);
      setHistory(["> Welcome Back, User."]);
    } else {
      setHistory(["> System Initialized."]);
      localStorage.setItem('brianos_visited', 'true');
    }

    // Load saved height
    const savedHeight = localStorage.getItem('console_height');
    if (savedHeight) {
      setHeight(parseInt(savedHeight));
    }
  }, []);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    // Listen for console error events from private repo clicks
    const handleConsoleError = (e) => {
      setHistory(prev => [...prev, e.detail]);
    };

    window.addEventListener('consoleError', handleConsoleError);
    return () => window.removeEventListener('consoleError', handleConsoleError);
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      const newHeight = window.innerHeight - e.clientY;
      const minHeight = 40;
      const maxHeight = window.innerHeight * 0.8;
      const clampedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
      setHeight(clampedHeight);
      localStorage.setItem('console_height', clampedHeight.toString());
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = "";

    switch (trimmedCmd) {
      case "help":
        output = `Available commands:\n  help - Show this help message\n  whoami - Display user philosophy\n  stack - List favorite tech stack\n  horizon - Show current goals\n  resume - Download resume (aliases: cv, pdf)\n  clear - Clear console history\n  neofetch - Display system information\n  contact - Show contact information\n  secret-lab - [REDACTED]`;
        break;
      case "whoami":
        output = "> I solve problems with code.";
        break;
      case "stack":
        output = "> Python | | Java | SQL | C++ | AWS | PostgreSQL";
        break;
      case "horizon":
        output = `> Building: ${SYSTEM_DATA.horizon.building}\n> Learning: ${SYSTEM_DATA.horizon.learning}\n> Goal: ${SYSTEM_DATA.horizon.goal}`;
        break;
      case "resume":
      case "cv":
      case "pdf":
        output = "> Initiating download sequence for resume.pdf...\n> Success.";
        setHistory(prev => [...prev, `> ${cmd}`, output]);
        // Trigger download after a short delay to show the message
        setTimeout(() => {
          window.open('/resume.pdf', '_blank');
        }, 300);
        return;
      case "clear":
        setHistory([]);
        return;
      case "neofetch":
        output = `     ██████╗ ██████╗ ██╗ █████╗ ███╗   ██╗    ██╗    ██╗██████╗ ██╗\n     ██╔══██╗██╔══██╗██║██╔══██╗████╗  ██║    ██║    ██║██╔══██╗██║\n     ██████╔╝██████╔╝██║███████║██╔██╗ ██║    ██║ █╗ ██║██████╔╝██║\n     ██╔══██╗██╔══██╗██║██╔══██║██║╚██╗██║    ██║███╗██║██╔═══╝ ██║\n     ██████╔╝██║  ██║██║██║  ██║██║ ╚████║    ╚███╔███╔╝██║     ██║\n     ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝     ╚══╝╚══╝ ╚═╝     ╚═╝\n\n     Uptime: ${SYSTEM_DATA.uptime}\n     Shell: BrianOS v1.0\n     Theme: WPI Cyberpunk\n     Location: ${SYSTEM_DATA.location}`;
        break;
      case "contact":
        output = `> Email: brian.wang372@gmail.com\n> LinkedIn: https://linkedin.com/in/brian372\n> GitHub: https://github.com/bwang257`;
        break;
      case "secret-lab":
        output = "> [ACCESS GRANTED]\n> Under Construction: Quantum Portfolio Optimization\n> Estimated Completion: Q2 2026";
        break;
      case "":
        return;
      default:
        output = `> Command not found: ${cmd}\n> Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, `> ${cmd}`, output]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (command.trim()) {
      executeCommand(command);
      setCommand("");
    }
  };

  return (
    <div 
      ref={consoleRef}
      className="fixed bottom-0 left-0 right-0 bg-[#0c0c0c] border-t border-white/10 z-[60] flex flex-col"
      style={{ height: `${height}px` }}
    >
      {/* Resize Handle */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizing(true);
        }}
        className="h-2 cursor-row-resize hover:bg-white/5 transition-colors flex items-center justify-center group"
      >
        <div className="w-12 h-0.5 bg-white/20 group-hover:bg-white/40 transition-colors" />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-[#e5e5e5]/80 space-y-1">
          {history.map((line, idx) => {
            const isError = line.includes('Access Denied') || line.includes('Command not found');
            return (
              <div 
                key={idx} 
                className={`whitespace-pre-wrap ${isError ? 'text-[#ff3333]' : ''}`}
              >
                {line}
              </div>
            );
          })}
          <div ref={historyEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="border-t border-white/10 p-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#ff3333]">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="type help for commands..."
              className="flex-1 bg-transparent text-[#e5e5e5]/80 font-mono text-xs outline-none"
              autoFocus
            />
          </div>
        </form>
      </div>
    </div>
);
};

/* ===============================================================
   DOCK (Text-Based Navigation / Taskbar)
================================================================ */
const Dock = ({ windows, toggleWindow }) => {
  const domains = [
    { id: "profile", path: "~/WHOAMI", windowId: "profile" },
    { id: "services", path: "~/WORK", windowId: "services" },
    { id: "monitor", path: "~/SYS", windowId: "monitor" },
    { id: "packages", path: "~/LIB", windowId: "packages" }
  ];

  const [hoveredPath, setHoveredPath] = useState(null);
  const [hoveredFile, setHoveredFile] = useState(null);

  const handleResumeClick = () => {
    window.open('/resume.pdf', '_blank');
  };

  return (
    <div className="fixed left-0 top-12 w-32 bg-[#0c0c0c] border-r border-white/10 z-40 flex flex-col py-6 gap-2" style={{ bottom: '300px' }}>
      {/* Directories Section */}
      <div className="flex-1">
        {domains.map((domain) => {
          const window = windows.find(w => w.id === domain.windowId);
          const status = window?.status || 'closed';
          const isHovered = hoveredPath === domain.path;
          
          // Determine styling based on status
          let textColor = "text-[#e5e5e5]/30 line-through"; // Closed (default)
          let prefix = null;
          
          if (status === 'open') {
            textColor = "text-[#00ff00]";
            prefix = (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mr-2"
              >
                &gt;
              </motion.span>
            );
          } else if (status === 'minimized') {
            textColor = "text-[#e5e5e5]/50";
            prefix = (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="mr-2"
              >
                _
              </motion.span>
            );
          }
          
          // Override with hover state
          if (isHovered && status !== 'open') {
            textColor = "text-[#e5e5e5]/70";
          }
          
          return (
            <motion.button
              key={domain.id}
              onClick={() => toggleWindow(domain.windowId)}
              onMouseEnter={() => setHoveredPath(domain.path)}
              onMouseLeave={() => setHoveredPath(null)}
              className={`text-left px-4 py-2 font-mono text-xs transition-all relative uppercase tracking-wider ${textColor}`}
            >
              {prefix}
              <span>{domain.path}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Files Section */}
      <div className="pt-4 border-t border-white/10 mt-auto">
        <p className="text-[10px] font-mono text-[#e5e5e5]/30 mb-2 px-4 uppercase tracking-wider">FILES</p>
        <motion.button
          onClick={handleResumeClick}
          onMouseEnter={() => setHoveredFile('resume')}
          onMouseLeave={() => setHoveredFile(null)}
          className={`text-left px-4 py-2 font-mono text-xs transition-all relative flex items-center gap-2 ${
            hoveredFile === 'resume' ? 'text-yellow-500' : 'text-yellow-500/60'
          }`}
        >
          <FileText size={12} />
          <span className="uppercase tracking-wider">resume.pdf</span>
        </motion.button>
      </div>
    </div>
  );
};

/* ===============================================================
   MAIN APP COMPONENT
================================================================ */
export default function App() {
  const [windows, setWindows] = useState([
    { id: "profile", status: "open", isMaximized: false, title: "user_profile.txt", content: <UserProfileWindow /> },
    { id: "monitor", status: "open", isMaximized: false, title: "system_monitor.log", content: <SystemMonitorWindow /> },
    { id: "services", status: "open", isMaximized: false, title: "running_services.log", content: <RunningServicesWindow /> },
    { id: "packages", status: "open", isMaximized: false, title: "installed_packages.txt", content: <InstalledPackagesWindow /> }
  ]);

  const toggleWindow = (windowId) => {
    setWindows(prev => prev.map(w => {
      if (w.id === windowId) {
        // If closed, open it
        if (w.status === 'closed') {
          return { ...w, status: 'open', isMaximized: false };
        }
        // If minimized, restore it to open
        if (w.status === 'minimized') {
          return { ...w, status: 'open' };
        }
        // If open, minimize it
        if (w.status === 'open') {
          return { ...w, status: 'minimized', isMaximized: false };
        }
      }
      return w;
    }));
  };

  const closeWindow = (windowId) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, status: 'closed', isMaximized: false } : w
    ));
  };

  const minimizeWindow = (windowId) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, status: 'minimized', isMaximized: false } : w
    ));
  };

  const maximizeWindow = (windowId) => {
    setWindows(prev => prev.map(w => {
      if (w.id === windowId) {
        return { ...w, isMaximized: !w.isMaximized };
      }
      // If maximizing one window, unmaximize others
      return { ...w, isMaximized: false };
    }));
  };

  // Filter windows that are visible (open and not minimized)
  const visibleWindows = windows.filter(w => w.status === 'open');

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#e5e5e5] font-mono overflow-hidden">
      <TextureOverlays />
      <SystemTray />
      <Dock windows={windows} toggleWindow={toggleWindow} />
      <Console />
      
      <main className="ml-32 mt-12 p-6 overflow-y-auto" style={{ paddingBottom: 'calc(300px + 1rem)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleWindows
              .filter(w => !w.isMaximized)
              .map((window) => (
                <Window
                  key={window.id}
                  id={window.id}
                  title={window.title}
                  status={window.status}
                  isMaximized={window.isMaximized}
                  onClose={() => closeWindow(window.id)}
                  onMinimize={() => minimizeWindow(window.id)}
                  onMaximize={() => maximizeWindow(window.id)}
                >
                  {window.content}
                </Window>
              ))}
          </div>
          {/* Render maximized windows separately (outside grid) */}
          {visibleWindows
            .filter(w => w.isMaximized)
            .map((window) => (
              <Window
                key={window.id}
                id={window.id}
                title={window.title}
                status={window.status}
                isMaximized={window.isMaximized}
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
              >
                {window.content}
              </Window>
            ))}
        </div>
      </main>
    </div>
  );
}
