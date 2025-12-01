import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
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
} from "lucide-react";

/* ===============================================================
   SYSTEM DATA (The "Memory")
================================================================ */
const SYSTEM_DATA = {
  status: "OPERATIONAL",
  location: "Worcester, MA",
  uptime: "20 Years",
  horizon: {
    building: "Portfolio Optimization Engine (v2)",
    learning: "Stochastic Calculus & Rust",
    goal: "Deploy Mean-Reversion Algo to Paper Trading"
  },
  timeDistribution: { coding: 60, markets: 30, misc: 10 }
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
    <div className="fixed top-0 left-0 right-0 h-12 bg-[#0f0f10] border-b border-white/10 z-50 flex items-center justify-between px-6">
      <motion.div
        onHoverStart={() => setIsGlitching(true)}
        onHoverEnd={() => setIsGlitching(false)}
        className="font-mono text-sm text-white cursor-pointer relative"
      >
        <span className={isGlitching ? "glitch-text" : ""}>BrianOS v1.0</span>
      </motion.div>
      <div className="flex items-center gap-6 text-xs font-mono text-white/80">
        <span>{formatTime(currentTime)} UTC</span>
        <span>{SYSTEM_DATA.location}</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>System Status: Online</span>
        </div>
      </div>
    </div>
  );
};

/* ===============================================================
   WINDOW COMPONENT WRAPPER (With Controls)
================================================================ */
const Window = ({ id, title, children, onClose, onMinimize, isMinimized }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-[#0f0f10] border border-white/10 rounded-lg flex flex-col min-h-[400px]"
    >
      {/* Title Bar - Drag Handle */}
      <div className="flex items-center gap-2 p-3 border-b border-white/10 cursor-grab active:cursor-grabbing select-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          title="Close"
        />
            <button
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
          title="Minimize"
        />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs font-mono text-white/60 flex-1">{title}</span>
      </div>
      {/* Window Content */}
      {!isMinimized && (
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      )}
    </motion.div>
  );
};

/* ===============================================================
   WINDOW 1: USER PROFILE
================================================================ */
const UserProfileWindow = () => {
  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Brian Wang</h2>
        <p className="text-white/80 text-sm leading-relaxed">
          Math/CS double major at WPI. Building high-performance systems and solving complex problems through the intersection of abstract theory and practical engineering.
        </p>
      </div>
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs font-mono text-white/60 mb-2">STATUS:</p>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs text-green-400 font-mono">
            OPERATIONAL
          </div>
          <span className="text-xs text-white/60">Uptime: {SYSTEM_DATA.uptime}</span>
        </div>
      </div>
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs font-mono text-white/60 mb-2">CONNECTIONS:</p>
        <div className="flex gap-3">
          <a href="https://github.com/bwang257" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/brian372" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:brian.wang372@gmail.com" className="text-white/60 hover:text-white transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs font-mono text-white/60 mb-2">SIGNATURE:</p>
        <div className="text-white/40 italic text-sm">— Brian Wang</div>
      </div>
    </div>
  );
};

/* ===============================================================
   WINDOW 2: SYSTEM MONITOR
================================================================ */
const SystemMonitorWindow = () => {
  const [hoveredStatus, setHoveredStatus] = useState(false);

  return (
    <div className="p-6 space-y-6">
        <div>
          <p className="text-xs font-mono text-white/60 mb-3">THE HORIZON:</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <span className="text-[rgb(220,50,50)]">></span>
              <span>Building: {SYSTEM_DATA.horizon.building}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[rgb(220,50,50)]">></span>
              <span>Learning: {SYSTEM_DATA.horizon.learning}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[rgb(220,50,50)]">></span>
              <span>Goal: {SYSTEM_DATA.horizon.goal}</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-mono text-white/60 mb-3">RESOURCE USAGE:</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/80">Coding</span>
                <span className="text-white/60">{SYSTEM_DATA.timeDistribution.coding}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${SYSTEM_DATA.timeDistribution.coding}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-[rgb(220,50,50)]"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/80">Markets</span>
                <span className="text-white/60">{SYSTEM_DATA.timeDistribution.markets}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${SYSTEM_DATA.timeDistribution.markets}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-full bg-[rgb(220,50,50)]"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/80">Misc</span>
                <span className="text-white/60">{SYSTEM_DATA.timeDistribution.misc}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${SYSTEM_DATA.timeDistribution.misc}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-[rgb(220,50,50)]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-white/10">
          <motion.div
            onHoverStart={() => setHoveredStatus(true)}
            onHoverEnd={() => setHoveredStatus(false)}
            className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs text-green-400 font-mono inline-block cursor-pointer"
          >
            {hoveredStatus ? "Targeting: Quant & Swe Roles" : "Open to Work"}
          </motion.div>
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
      problem: "Manual rebalancing was tedious.",
      link: "https://portfolio-optimization-app.vercel.app/",
      github: "https://github.com/bwang257/portfolio-optimization-app",
      access: "public"
    },
    {
      pid: "PID-002",
      name: "Gamified Productivity Platform",
      problem: "Internship tracking lacked structure.",
      github: null,
      access: "private"
    },
    {
      pid: "PID-003",
      name: "Algorithmic Logic Core",
      problem: "Needed modular trading system architecture.",
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
          <div key={idx} className="border-l-2 border-[rgb(220,50,50)] pl-4 py-2">
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <div>
                  <span className="text-xs font-mono text-white/60">{project.pid}</span>
                  <span className="text-sm font-mono text-white ml-2">{project.name}</span>
                </div>
                {project.access === "private" && (
                  <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    [CLASSIFIED / ACADEMIC]
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.github && project.access === "public" && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
                    <Github size={14} />
                  </a>
                )}
                {project.access === "private" && (
                  <button
                    onClick={handlePrivateRepoClick}
                    className="text-white/30 hover:text-[rgb(220,50,50)] transition-colors cursor-pointer"
                    title="Private Repository"
                  >
                    <Lock size={14} />
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs text-white/60 font-mono">
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
      { name: "Python", ver: "v3.0", desc: "Data Analysis & Backend" },
      { name: "JavaScript", ver: "v2.5", desc: "Frontend Development" },
      { name: "TypeScript", ver: "v2.0", desc: "Type-Safe Frontend" },
      { name: "C++", ver: "v1.5", desc: "Systems Programming" },
      { name: "SQL", ver: "v2.0", desc: "Database Queries" },
      { name: "Rust", ver: "v0.5", desc: "Learning" },
    ],
    "~/lib/frameworks/": [
      { name: "React", ver: "v2.5", desc: "UI Framework" },
      { name: "Flask", ver: "v1.5", desc: "Python Web API" },
      { name: "Node.js", ver: "v2.0", desc: "Backend Runtime" },
    ],
    "~/lib/tools/": [
      { name: "AWS", ver: "v1.5", desc: "Cloud Infrastructure" },
      { name: "PostgreSQL", ver: "v2.0", desc: "Relational DB" },
      { name: "MongoDB", ver: "v1.0", desc: "NoSQL Database" },
      { name: "Docker", ver: "v1.5", desc: "Containerization" },
      { name: "Git", ver: "v3.0", desc: "Version Control" },
      { name: "Linux", ver: "v2.5", desc: "System Admin" },
      { name: "QuantConnect", ver: "v1.5", desc: "Algorithmic Trading" },
      { name: "Pandas", ver: "v2.0", desc: "Data Manipulation" },
      { name: "NumPy", ver: "v2.0", desc: "Numerical Computing" },
    ]
  };

  return (
    <div className="p-6">
      <div className="font-mono text-xs space-y-4">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category}>
            <div className="text-white/40 mb-2">{category}</div>
            <div className="space-y-1">
              <div className="grid grid-cols-[1fr_80px_1fr] gap-4 text-white/60 mb-1">
                <div>PKG</div>
                <div>VER</div>
                <div>DESC</div>
              </div>
              {skills.map((skill, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_80px_1fr] gap-4 hover:text-white transition-colors">
                  <div className="text-white/80">{skill.name}</div>
                  <div className="text-white/60">{skill.ver}</div>
                  <div className="text-white/60">{skill.desc}</div>
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
      setHistory(["> Initializing System..."]);
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
        output = `Available commands:\n  help - Show this help message\n  whoami - Display user philosophy\n  stack - List favorite tech stack\n  horizon - Show current goals\n  clear - Clear console history\n  neofetch - Display system information\n  contact - Show contact information\n  secret-lab - [REDACTED]`;
        break;
      case "whoami":
        output = "> I engineer solutions at the intersection of mathematics and computation.";
        break;
      case "stack":
        output = "> Python | React | C++ | AWS | PostgreSQL | QuantConnect";
        break;
      case "horizon":
        output = `> Building: ${SYSTEM_DATA.horizon.building}\n> Learning: ${SYSTEM_DATA.horizon.learning}\n> Goal: ${SYSTEM_DATA.horizon.goal}`;
        break;
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
      className="fixed bottom-0 left-0 right-0 bg-[#0f0f10] border-t border-white/10 z-[60] flex flex-col"
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
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-white/80 space-y-1">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap">{line}</div>
          ))}
          <div ref={historyEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="border-t border-white/10 p-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[rgb(220,50,50)]">></span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="type help for commands..."
              className="flex-1 bg-transparent text-white/80 font-mono text-xs outline-none"
              autoFocus
            />
          </div>
        </form>
      </div>
    </div>
  );
};

/* ===============================================================
   DOCK (Taskbar)
================================================================ */
const Dock = ({ windows, toggleWindow }) => {
  const domains = [
    { id: "profile", icon: Terminal, label: "TTY", windowId: "profile" },
    { id: "monitor", icon: FlaskConical, label: "The Lab", windowId: "monitor" },
    { id: "services", icon: Code, label: "Engines", windowId: "services" },
    { id: "packages", icon: Database, label: "Data Pantry", windowId: "packages" }
  ];

  return (
    <div className="fixed left-0 top-12 w-16 bg-[#0f0f10] border-r border-white/10 z-40 flex flex-col items-center py-6 gap-4" style={{ bottom: '300px' }}>
      {domains.map((domain) => {
        const Icon = domain.icon;
        const window = windows.find(w => w.id === domain.windowId);
        const isVisible = window?.visible && !window?.isMinimized;
        const isActive = isVisible;
        
        return (
          <motion.button
            key={domain.id}
            onClick={() => toggleWindow(domain.windowId)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-lg transition-all relative ${
              isActive
                ? "bg-[rgb(220,50,50)]/20 border border-[rgb(220,50,50)]/50 text-[rgb(220,50,50)]"
                : window?.visible
                ? "text-white/40 hover:text-white/60 hover:bg-white/5"
                : "text-white/20 hover:text-white/40 hover:bg-white/5"
            }`}
            title={domain.label}
          >
            <Icon size={20} />
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-lg bg-[rgb(220,50,50)]/20 border border-[rgb(220,50,50)]/50 -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

/* ===============================================================
   MAIN APP COMPONENT
================================================================ */
export default function App() {
  const [windows, setWindows] = useState([
    { id: "profile", visible: true, isMinimized: false, title: "user_profile.txt", content: <UserProfileWindow /> },
    { id: "monitor", visible: true, isMinimized: false, title: "system_monitor.log", content: <SystemMonitorWindow /> },
    { id: "services", visible: true, isMinimized: false, title: "running_services.log", content: <RunningServicesWindow /> },
    { id: "packages", visible: true, isMinimized: false, title: "installed_packages.txt", content: <InstalledPackagesWindow /> }
  ]);

  const toggleWindow = (windowId) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, visible: !w.visible, isMinimized: false }
        : w
    ));
  };

  const closeWindow = (windowId) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, visible: false } : w
    ));
  };

  const minimizeWindow = (windowId) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const visibleWindows = windows.filter(w => w.visible);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white font-mono overflow-hidden">
      <SystemTray />
      <Dock windows={windows} toggleWindow={toggleWindow} />
      <Console />
      
      <main className="ml-16 mt-12 p-6 overflow-y-auto" style={{ paddingBottom: 'calc(300px + 1rem)' }}>
        <div className="max-w-7xl mx-auto">
          <Reorder.Group
            axis="y"
            values={visibleWindows}
            onReorder={(newOrder) => {
              setWindows(prev => {
                const orderMap = new Map(newOrder.map((w, i) => [w.id, i]));
                return prev.map(w => {
                  const order = orderMap.get(w.id);
                  return order !== undefined ? { ...w, order } : w;
                }).sort((a, b) => {
                  const aOrder = a.order ?? Infinity;
                  const bOrder = b.order ?? Infinity;
                  return aOrder - bOrder;
                });
              });
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {visibleWindows.map((window) => (
              <Reorder.Item
                key={window.id}
                value={window}
                style={{ listStyle: 'none' }}
                as="div"
              >
                <Window
                  id={window.id}
                  title={window.title}
                  onClose={() => closeWindow(window.id)}
                  onMinimize={() => minimizeWindow(window.id)}
                  isMinimized={window.isMinimized}
                >
                  {window.content}
                </Window>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </main>
    </div>
  );
}
