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
import { useTheme } from "./contexts/ThemeContext.jsx";

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
const SystemTray = ({ onCommandPaletteOpen }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGlitching, setIsGlitching] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { theme, colors } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Show hint after 3 seconds, hide after 10 seconds
    const showTimer = setTimeout(() => setShowHint(true), 3000);
    const hideTimer = setTimeout(() => setShowHint(false), 10000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const formatTime = (date) => {
    return date.toUTCString().split(' ')[4];
  };

  // Detect OS for appropriate key hint
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const keyHint = isMac ? '⌘K' : 'Ctrl+K';

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-12 z-50 flex items-center justify-between px-6"
      style={{
        backgroundColor: colors.bg,
        borderBottomColor: colors.border,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid'
      }}
    >
      <div className="flex items-center gap-4">
      <motion.div
        onHoverStart={() => setIsGlitching(true)}
        onHoverEnd={() => setIsGlitching(false)}
        className="font-mono text-sm relative"
        style={{ color: colors.text }}
      >
        <span className={isGlitching ? "glitch-text" : ""}>BrianOS v1.0</span>
      </motion.div>
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-mono whitespace-nowrap pointer-events-none"
              style={{ color: colors.textMutedLight }}
            >
              Press <kbd 
                className="px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  borderColor: colors.border,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: `${colors.accent}99`
                }}
              >{keyHint}</kbd> for commands
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div 
        className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider"
        style={{ color: colors.textMuted }}
      >
        <span>{formatTime(currentTime)} UTC</span>
        <span>{SYSTEM_DATA.location}</span>
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 animate-pulse rounded-full" 
            style={{ backgroundColor: colors.accent }}
          />
          <span>System Status: Online</span>
        </div>
      </div>
    </div>
  );
};

/* ===============================================================
   WINDOW COMPONENT WRAPPER (With Controls)
================================================================ */
const Window = ({ id, title, children, status, isMaximized, onClose, onMinimize, onMaximize, width, height, x, y, onSizeChange, onPositionChange }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, left: 0, top: 0 });
  const [resizeDirection, setResizeDirection] = useState('');
  const windowRef = useRef(null);
  const { theme, colors } = useTheme();

  const MIN_WIDTH = 300;
  const MIN_HEIGHT = 200;
  // Use responsive width if not explicitly set, or if width is provided use it (for resized windows)
  const currentWidth = width || '100%';
  const currentHeight = height || 400;
  const currentX = x ?? null;
  const currentY = y ?? null;

  // Handle resizing
  useEffect(() => {
    if (!isResizing || isMaximized) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      e.preventDefault();
      
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = resizeStart.left;
        let newY = resizeStart.top;

        // Get container boundaries
        const container = windowRef.current?.offsetParent;
        const containerRect = container ? container.getBoundingClientRect() : null;
        // For grid-based windows, use viewport constraints; for absolutely positioned, use container
        const isAbsolutelyPositioned = currentX !== null && currentX !== undefined;
        const maxWidth = isAbsolutelyPositioned && containerRect ? containerRect.width : Infinity;
        const maxHeight = isAbsolutelyPositioned && containerRect ? containerRect.height : window.innerHeight * 0.9;

        // Calculate new size and position based on direction
        if (resizeDirection.includes('e')) {
          // Resize from east - only width changes, position stays same
          if (isAbsolutelyPositioned && containerRect) {
            newWidth = Math.max(MIN_WIDTH, Math.min(resizeStart.width + deltaX, maxWidth - resizeStart.left));
          } else {
            // Grid-based window - allow free resizing, but constrain to reasonable max
            newWidth = Math.max(MIN_WIDTH, Math.min(resizeStart.width + deltaX, window.innerWidth * 0.9));
          }
        }
        if (resizeDirection.includes('w')) {
          // Resize from west - width changes and position moves left
          // Can only resize if window has absolute positioning (x is set)
          if (isAbsolutelyPositioned) {
            const requestedWidth = resizeStart.width - deltaX;
            newWidth = Math.max(MIN_WIDTH, Math.min(requestedWidth, resizeStart.left + resizeStart.width));
            // Only move position if we're actually changing the width (not constrained)
            const actualDeltaX = requestedWidth >= MIN_WIDTH && newX >= 0 ? deltaX : Math.min(0, -resizeStart.left);
            newX = Math.max(0, resizeStart.left + actualDeltaX);
            // Adjust width if position hit boundary
            if (newX === 0 && resizeStart.left > 0) {
              newWidth = resizeStart.width + resizeStart.left;
            }
          }
        }
        if (resizeDirection.includes('s')) {
          // Resize from south - only height changes, position stays same
          if (isAbsolutelyPositioned && containerRect) {
            // Absolutely positioned - constrain to container
            newHeight = Math.max(MIN_HEIGHT, Math.min(resizeStart.height + deltaY, maxHeight - resizeStart.top));
          } else {
            // Grid-based window - allow free resizing, constrain to viewport
            newHeight = Math.max(MIN_HEIGHT, Math.min(resizeStart.height + deltaY, maxHeight));
          }
        }
        if (resizeDirection.includes('n')) {
          // Resize from north - height changes and position moves up
          // Can only resize if window has absolute positioning (y is set)
          if (currentY !== null && currentY !== undefined) {
            const requestedHeight = resizeStart.height - deltaY;
            newHeight = Math.max(MIN_HEIGHT, Math.min(requestedHeight, resizeStart.top + resizeStart.height));
            // Only move position if we're actually changing the height (not constrained)
            const actualDeltaY = requestedHeight >= MIN_HEIGHT && newY >= 0 ? deltaY : Math.min(0, -resizeStart.top);
            newY = Math.max(0, resizeStart.top + actualDeltaY);
            // Adjust height if position hit boundary
            if (newY === 0 && resizeStart.top > 0) {
              newHeight = resizeStart.height + resizeStart.top;
            }
          }
        }

        onSizeChange(newWidth, newHeight);
        // Only update position if resizing from left/top edges and window is absolutely positioned
        if (onPositionChange && (resizeDirection.includes('w') || resizeDirection.includes('n'))) {
          if ((resizeDirection.includes('w') && currentX !== null && currentX !== undefined) ||
              (resizeDirection.includes('n') && currentY !== null && currentY !== undefined)) {
            onPositionChange(newX, newY);
          }
        }
        rafId = null;
      });
    };

    const handleMouseUp = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeStart, resizeDirection, isMaximized, onSizeChange, onPositionChange]);

  const handleResizeMouseDown = (direction, e) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    
    // Don't allow resizing from left/top if window is still in grid (prevents layout shifts)
    // Only allow resizing from right/bottom edges for grid-based windows
    if (direction.includes('w') && (currentX === null || currentX === undefined)) {
      // Prevent resize from left for grid-based windows
      return;
    }
    if (direction.includes('n') && (currentY === null || currentY === undefined)) {
      // Prevent resize from top for grid-based windows
      return;
    }
    
    setIsResizing(true);
    setResizeDirection(direction);
    // Get actual computed width and position if using responsive width
    const actualWidth = windowRef.current ? windowRef.current.offsetWidth : (typeof currentWidth === 'number' ? currentWidth : 600);
    const actualHeight = currentHeight;
    const rect = windowRef.current ? windowRef.current.getBoundingClientRect() : null;
    const container = windowRef.current?.offsetParent;
    const containerRect = container ? container.getBoundingClientRect() : null;
    const actualLeft = rect && containerRect ? rect.left - containerRect.left : (currentX ?? 0);
    const actualTop = rect && containerRect ? rect.top - containerRect.top : (currentY ?? 0);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: actualWidth,
      height: actualHeight,
      left: actualLeft,
      top: actualTop
    });
  };

  const renderResizeHandle = (direction, className, cursor) => {
    return (
      <div
        className={`${className} transition-colors select-none`}
        style={{ cursor }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `${colors.accent}33`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        onMouseDown={(e) => handleResizeMouseDown(direction, e)}
      />
    );
  };

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
      ref={windowRef}
      id={`window-${id}`}
      layout={!isResizing}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={isResizing ? { duration: 0 } : undefined}
      className={`border rounded-sm flex flex-col grid-background ${
        isMaximized 
          ? "fixed inset-4 z-50 backdrop-blur-sm" 
          : currentX !== null && currentY !== null ? "absolute" : "relative"
      }`}
      style={isMaximized ? { 
        backdropFilter: 'blur(8px)',
        backgroundColor: colors.bgSecondary,
        borderColor: colors.border
      } : {
        backgroundColor: colors.bg,
        borderColor: colors.border,
        width: typeof currentWidth === 'number' ? `${currentWidth}px` : currentWidth,
        maxWidth: currentX !== null && currentY !== null ? 'none' : '100%',
        height: `${currentHeight}px`,
        minHeight: `${MIN_HEIGHT}px`,
        minWidth: `${MIN_WIDTH}px`,
        ...(currentX !== null && currentY !== null ? { left: `${currentX}px`, top: `${currentY}px` } : {})
      }}
    >
      {/* Resize Handles - Corners */}
      {!isMaximized && (
        <>
          {/* Always show right/bottom handles */}
          {renderResizeHandle('se', 'absolute bottom-0 right-0 w-3 h-3 z-20', 'se-resize')}
          {renderResizeHandle('s', 'absolute bottom-0 left-3 right-3 h-2 z-20', 's-resize')}
          {renderResizeHandle('e', 'absolute right-0 top-3 bottom-3 w-2 z-20', 'e-resize')}
          
          {/* Only show left/top handles if window is absolutely positioned */}
          {(currentX !== null && currentX !== undefined) && renderResizeHandle('sw', 'absolute bottom-0 left-0 w-3 h-3 z-20', 'sw-resize')}
          {(currentX !== null && currentX !== undefined) && renderResizeHandle('w', 'absolute left-0 top-3 bottom-3 w-2 z-20', 'w-resize')}
          {(currentY !== null && currentY !== undefined) && renderResizeHandle('ne', 'absolute top-0 right-0 w-3 h-3 z-20', 'ne-resize')}
          {(currentY !== null && currentY !== undefined) && renderResizeHandle('n', 'absolute top-0 left-3 right-3 h-2 z-20', 'n-resize')}
          {(currentX !== null && currentX !== undefined && currentY !== null && currentY !== undefined) && renderResizeHandle('nw', 'absolute top-0 left-0 w-3 h-3 z-20', 'nw-resize')}
        </>
      )}
      {/* Title Bar */}
      <div 
        className="flex items-center justify-between px-4 py-2"
        style={{
          borderBottomColor: colors.border,
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          backgroundColor: colors.bgTertiary
        }}
      >
        <div className="flex items-center gap-2">
          <span 
            className="text-xs font-mono uppercase tracking-wider"
            style={{ color: colors.textMuted }}
          >
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Window Controls: Red (Close), Yellow (Minimize), Green (Maximize) */}
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-sm transition-colors"
            style={{ backgroundColor: colors.warning }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.warningHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.warning}
            aria-label="Close window"
          />
          <button
            onClick={onMinimize}
            className="w-3 h-3 rounded-sm transition-colors"
            style={{ backgroundColor: colors.info }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.infoHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.info}
            aria-label="Minimize window"
          />
          <button
            onClick={onMaximize}
            className="w-3 h-3 rounded-sm transition-colors"
            style={{ backgroundColor: colors.accent }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.accentHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.accent}
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
   RETRO PIXELATED PROFILE IMAGE
================================================================ */
const RetroProfileImage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Try to load the profile image - supports multiple formats
    // Place your profile picture in the /public folder as profile.jpg, profile.png, or profile.jpeg
    const imageSources = ["/profile.jpg", "/profile.png", "/profile.jpeg", "/profile.JPG", "/profile.PNG"];
    let currentIndex = 0;
    
    const tryNextImage = () => {
      if (currentIndex >= imageSources.length) {
        setIsChecking(false);
        return; // No image found, component won't render
      }
      
      const img = new Image();
      img.src = imageSources[currentIndex];
      
      img.onload = () => {
        setImageSrc(imageSources[currentIndex]);
        setIsChecking(false);
      };
      
      img.onerror = () => {
        currentIndex++;
        tryNextImage();
      };
    };
    
    tryNextImage();
  }, []);

  // Don't render anything if no image is found or still checking
  if (!imageSrc || isChecking) {
    return null;
  }

  return (
    <div className="mb-2 relative group inline-block">
      <img 
        src={imageSrc}
        alt="Brian Wang"
        className="w-32 h-32 object-cover grayscale contrast-125 border-2 border-green-900" 
        style={{ imageRendering: 'pixelated' }}
      />
      {/* Green overlay that vanishes on hover */}
      <div className="absolute inset-0 bg-green-900/30 mix-blend-overlay group-hover:bg-transparent transition-all duration-300"></div>
    </div>
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

  const { colors } = useTheme();

  return (
    <div className="p-6 space-y-6">
      <div>
        <RetroProfileImage />
        <h2 className="text-2xl font-bold mb-4 tracking-tight" style={{ color: colors.text }}>Brian Wang</h2>
        
        {/* Concise Bio */}
        <div className="font-mono text-sm space-y-3">
          <p className="leading-relaxed" style={{ color: colors.text }}>
            CS + Math sophomore. Building systems for performance and correctness. 
            Currently seeking Summer 2026 internships in SWE/systems/quant-dev.
            </p>
          </div>
          </div>

      <div className="pt-4" style={{ borderTopColor: colors.border, borderTopWidth: '1px', borderTopStyle: 'solid' }}>
        <p className="text-xs font-mono mb-3 uppercase tracking-wider" style={{ color: colors.neutral }}>OPEN PORTS:</p>
        <div className="space-y-2 font-mono text-sm">
          {ports.map((port) => (
            <motion.a
              key={port.id}
              href={port.url}
              target={port.id === "email" ? undefined : "_blank"}
              rel={port.id === "email" ? undefined : "noopener noreferrer"}
              className="block transition-colors"
              style={{ color: colors.textMuted }}
              onHoverStart={() => setHoveredPort(port.id)}
              onHoverEnd={() => setHoveredPort(null)}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.textMuted}
              whileHover={{ x: 2 }}
            >
              {hoveredPort === port.id && <span style={{ color: colors.accent }}>_</span>}
              {port.port} :: {port.service}
            </motion.a>
      ))}
    </div>
        <a
          href="/resume.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono transition-colors inline-block mt-4"
          style={{ color: colors.textMuted }}
          onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
          onMouseLeave={(e) => e.currentTarget.style.color = colors.textMuted}
        >
          &gt; [DOWNLOAD_RESUME]
        </a>
    </div>
  </div>
);
};

/* ===============================================================
   WINDOW 2: SYSTEM MONITOR (Current Focus)
================================================================ */
const SystemMonitorWindow = () => {
  const { colors } = useTheme();
  const activeProcesses = [
    { pid: 4312, name: "aws_technical_essentials_course", status: "RUNNING" },
    { pid: 2241, name: "systems_personal_project", status: "RUNNING" },
    { pid: 5530, name: "wpi_coursework", status: "ON_BREAK" }
  ];

  return (
    <div className="p-6 space-y-6 flex flex-col h-full">
        <div className="flex-1 flex flex-col min-h-0 space-y-6">
          {/* ACTIVE PROCESSES */}
          <div>
            <div className="mb-3">
              <p className="text-sm font-mono uppercase tracking-wider" style={{ color: colors.neutral }}>ACTIVE PROCESSES</p>
              <div className="h-px mt-1" style={{ backgroundColor: colors.neutral }} />
            </div>
            <div className="font-mono text-sm space-y-2">
              {activeProcesses.map((process) => (
                <div key={process.pid} style={{ color: colors.text }}>
                  <span style={{ color: colors.textMuted }}>PID {process.pid}</span>
                  {' '}
                  <span style={{ color: colors.text }}>{process.name}</span>
                  {' '}
                  <span style={{ color: process.status === 'RUNNING' ? colors.accent : colors.neutral }}>
                    {process.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* CURRENT FOCUS */}
          <div>
            <div className="mb-3">
              <p className="text-sm font-mono uppercase tracking-wider" style={{ color: colors.neutral }}>CURRENT FOCUS</p>
              <div className="h-px mt-1" style={{ backgroundColor: colors.neutral }} />
            </div>
            <ul className="font-mono text-sm space-y-2" style={{ color: colors.text }}>
              <li className="flex items-start gap-2">
                <span style={{ color: colors.warning }}>&gt;</span>
                <span>Systems programming: C/C++, concurrency, performance optimization.</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: colors.warning }}>&gt;</span>
                <span>Quantitative finance: statistical modeling and algorithmic trading systems.</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: colors.warning }}>&gt;</span>
                <span>Performance-driven engineering through ambitious projects.</span>
              </li>
            </ul>
          </div>
      </div>
    </div>
);
};

/* ===============================================================
   WINDOW 3: RUNNING SERVICES (Projects)
================================================================ */
const RunningServicesWindow = () => {
  const { theme, colors } = useTheme();
  
  const projects = [
    {
      pid: "PID-001",
      name: "Portfolio Optimization Engine",
      problem: "People shouldn't need a quant degree to optimize their portfolios.",
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
          <div key={idx} className="border-l-2 pl-4 py-2" style={{ borderLeftColor: colors.warning }}>
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: colors.textMuted }}>{project.pid}</span>
                  <span className="text-sm font-mono ml-2 tracking-tight" style={{ color: colors.text }}>{project.name}</span>
                </div>
                {project.access === "private" && (
                  <span 
                    className="text-xs font-mono px-2 py-0.5 rounded-sm border uppercase tracking-wider"
                    style={{ 
                      color: colors.textMutedLight,
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                      borderColor: colors.border
                    }}
                  >
                    [CLASSIFIED / ACADEMIC]
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: colors.textMuted }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.text}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.textMuted}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.github && project.access === "public" && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: colors.textMuted }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.text}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.textMuted}
                  >
                    <Github size={14} />
                  </a>
                )}
                {project.access === "private" && (
                  <button
                    onClick={handlePrivateRepoClick}
                    style={{ color: colors.textMutedLight }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.warning}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.textMutedLight}
                    className="transition-colors"
                    title="Private Repository"
                  >
                    <Lock size={14} />
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs font-mono" style={{ color: colors.textMuted }}>
              &gt; Problem: {project.problem}
            </p>
          </div>
        ))}
    </div>
  );
};

/* ===============================================================
   WINDOW 4: INSTALLED PACKAGES (Skills - Two Tier)
================================================================ */
const InstalledPackagesWindow = () => {
  const { colors } = useTheme();
  
  const primarySkills = {
    "~/lib/primary/": [
      { name: "Python", context: "Backend & data pipelines" },
      { name: "C/C++", context: "Systems programming" },
      { name: "Java", context: "OOP & algorithms" },
      { name: "SQL", context: "Database design & optimization" }
    ]
  };

  const secondarySkills = {
    "~/lib/secondary/": [
      { name: "JavaScript/TypeScript", context: "Frontend" },
      { name: "React", context: "UI framework" },
      { name: "Flask", context: "Python APIs" },
      { name: "AWS", context: "Cloud infrastructure" },
      { name: "Docker", context: "Containerization" },
      { name: "Git", context: "Version control" },
      { name: "NumPy/Pandas", context: "Data analysis" },
      { name: "MATLAB", context: "Numerical computing" },
      { name: "PyTorch", context: "Deep learning" },
      { name: "R", context: "Statistical analysis" }
    ]
  };  

  return (
    <div className="p-6">
      <div className="font-mono text-xs space-y-6">
        {/* Primary Skills */}
        <div>
          <div className="mb-3">
            <div className="text-xs mb-1 uppercase tracking-wider" style={{ color: colors.neutral }}>PRIMARY: I can reason deeply here</div>
            <div className="h-px" style={{ backgroundColor: colors.neutral }} />
          </div>
          {Object.entries(primarySkills).map(([category, skills]) => (
            <div key={category} className="space-y-1">
              {skills.map((skill, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_1fr] gap-4" style={{ color: colors.text }}>
                  <div style={{ color: colors.text }}>{skill.name}</div>
                  <div style={{ color: colors.textMuted }}>{skill.context}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Secondary Skills */}
        <div>
          <div className="mb-3">
            <div className="text-xs mb-1 uppercase tracking-wider" style={{ color: colors.neutral }}>SECONDARY: Used when needed</div>
            <div className="h-px" style={{ backgroundColor: colors.neutral }} />
          </div>
          {Object.entries(secondarySkills).map(([category, skills]) => (
            <div key={category} className="space-y-1">
              {skills.map((skill, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_1fr] gap-4" style={{ color: colors.textMuted }}>
                  <div>{skill.name}</div>
                  <div style={{ color: colors.textMutedLight }}>{skill.context}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ===============================================================
   WINDOW 5: NOTES (Kernel Log)
================================================================ */
const NotesWindow = ({ onOpenNote }) => {
  const { theme, colors } = useTheme();
  
  const notes = [
    {
      id: "note-001",
      title: "Memory Alignment Bug in C Struct",
      date: "2024-12-15",
      problem: "Portfolio optimizer crashed with SIGSEGV when processing large datasets.",
      expected: "Struct members should align on 8-byte boundaries for optimal cache performance.",
      actual: "Compiler padded struct to 16 bytes but code assumed 12-byte layout.",
      whyItBroke: "Mixed 32/64-bit assumptions; didn't account for platform-specific padding rules.",
      takeaway: "Always use sizeof() and offsetof() for layout verification. Prefer compiler directives or standard alignment attributes."
    },
    {
      id: "note-002",
      title: "Race Condition in Async Portfolio Calculation",
      date: "2024-11-28",
      problem: "Optimizer returned different results on consecutive runs with same input.",
      expected: "Deterministic output given identical seed and inputs.",
      actual: "Shared state accessed without synchronization; threads overwrote intermediate results.",
      whyItBroke: "Assumed thread-local variables were isolated; missed shared cache invalidation path.",
      takeaway: "Use atomic operations or locks for shared mutable state. Consider immutable data structures for parallel algorithms."
    },
    {
      id: "note-003",
      title: "SQL Query Performance Degradation",
      date: "2024-10-10",
      problem: "Dashboard load time increased from 200ms to 8s after adding user filtering.",
      expected: "Indexed queries should scale sub-linearly with dataset size.",
      actual: "Query planner chose table scan over index due to incorrect statistics.",
      whyItBroke: "ANALYZE hadn't run after bulk import; planner used stale cardinality estimates.",
      takeaway: "Monitor query plans with EXPLAIN ANALYZE. Keep statistics updated, especially after large data changes."
    }
  ];

  return (
    <div className="p-6">
      <div className="space-y-3">
        {notes.map((note) => (
          <button
            key={note.id}
            onClick={() => onOpenNote(note)}
            className="w-full text-left p-3 transition-colors"
            style={{
              borderLeftColor: colors.warning,
              borderLeftWidth: '2px',
              borderLeftStyle: 'solid',
              paddingLeft: '1rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div className="flex items-start justify-between mb-1">
              <div className="font-mono text-sm" style={{ color: colors.text }}>
                {note.title}
              </div>
              <div className="font-mono text-xs" style={{ color: colors.neutral }}>
                {note.date}
              </div>
            </div>
            <div className="font-mono text-xs mt-1" style={{ color: colors.textMuted }}>
              {note.problem.substring(0, 80)}...
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ===============================================================
   NOTE MODAL
================================================================ */
const NoteModal = ({ note, isOpen, onClose }) => {
  const { colors, theme } = useTheme();
  
  if (!isOpen || !note) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl rounded-sm shadow-2xl"
          style={{
            backgroundColor: colors.bg,
            borderColor: colors.border,
            borderWidth: '1px',
            borderStyle: 'solid',
            maxHeight: '90vh'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottomColor: colors.border, borderBottomWidth: '1px', borderBottomStyle: 'solid' }}
          >
            <div>
              <h3 className="font-mono text-lg font-semibold" style={{ color: colors.text }}>{note.title}</h3>
              <p className="font-mono text-xs mt-1" style={{ color: colors.neutral }}>{note.date}</p>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 rounded-sm flex items-center justify-center transition-colors"
              style={{ backgroundColor: colors.warning }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.warningHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.warning}
              aria-label="Close"
            >
              <span className="text-white text-xs">×</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto font-mono text-sm space-y-6" style={{ maxHeight: 'calc(90vh - 100px)' }}>
            <div>
              <h4 className="uppercase tracking-wider mb-2" style={{ color: colors.neutral }}>PROBLEM</h4>
              <p style={{ color: colors.text }}>{note.problem}</p>
            </div>
            <div>
              <h4 className="uppercase tracking-wider mb-2" style={{ color: colors.neutral }}>EXPECTED</h4>
              <p style={{ color: colors.text }}>{note.expected}</p>
            </div>
            <div>
              <h4 className="uppercase tracking-wider mb-2" style={{ color: colors.neutral }}>ACTUAL</h4>
              <p style={{ color: colors.text }}>{note.actual}</p>
            </div>
            <div>
              <h4 className="uppercase tracking-wider mb-2" style={{ color: colors.neutral }}>WHY IT BROKE</h4>
              <p style={{ color: colors.text }}>{note.whyItBroke}</p>
            </div>
            <div>
              <h4 className="uppercase tracking-wider mb-2" style={{ color: colors.neutral }}>TAKEAWAY</h4>
              <p style={{ color: colors.text }}>{note.takeaway}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
    // Listen for console clear events from command palette
    const handleConsoleClear = () => {
      setHistory([]);
    };

    window.addEventListener('consoleClear', handleConsoleClear);
    return () => window.removeEventListener('consoleClear', handleConsoleClear);
  }, []);

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
        output = `Available commands:\n  help - Show this help message\n  whoami - Display user philosophy\n  stack - List favorite tech stack\n  horizon - Show active processes (aliases: ps, processes)\n  resume - Download resume (aliases: cv, pdf)\n  clear - Clear console history\n  neofetch - Display system information\n  contact - Show contact information\n  secret-lab - [REDACTED]`;
        break;
      case "whoami":
        output = "> I solve problems with code.";
        break;
      case "stack":
        output = "> Python | Java | SQL | C++ | AWS | PostgreSQL";
        break;
      case "horizon":
      case "ps":
      case "processes":
        const padLength = 37;
        const processes = [
          { pid: 4312, name: "aws_technical_essentials_course", status: "RUNNING" },
          { pid: 2241, name: "systems_personal_project", status: "RUNNING" },
          { pid: 5530, name: "wpi_coursework", status: "ON_BREAK" }
        ];
        output = "> Active Processes:\n" + processes.map(p => 
          `> PID ${p.pid}  ${p.name.padEnd(padLength)}${p.status}`
        ).join("\n");
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
        output = "> [ACCESS GRANTED]\n> Under Construction: Revised Low-latency Algorithmic Trading System\n> Estimated Completion: Q1 2026";
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
  const { colors, theme } = useTheme();
  
  const domains = [
    { id: "services", path: "~/WORK", windowId: "services" },
    { id: "notes", path: "~/NOTES", windowId: "notes" },
    { id: "monitor", path: "~/SYS", windowId: "monitor" },
    { id: "packages", path: "~/LIB", windowId: "packages" },
    { id: "profile", path: "~/WHOAMI", windowId: "profile" }
  ];

  const [hoveredPath, setHoveredPath] = useState(null);
  const [hoveredFile, setHoveredFile] = useState(null);

  const handleResumeClick = () => {
    window.open('/resume.pdf', '_blank');
  };

  return (
    <div 
      className="fixed left-0 top-12 w-32 z-40 flex flex-col py-6 gap-2" 
      style={{ 
        bottom: '300px',
        backgroundColor: colors.bg,
        borderRightColor: colors.border,
        borderRightWidth: '1px',
        borderRightStyle: 'solid'
      }}
    >
      {/* Directories Section */}
      <div className="flex-1">
        {domains.map((domain) => {
          const window = windows.find(w => w.id === domain.windowId);
          const status = window?.status || 'closed';
          const isHovered = hoveredPath === domain.path;
          
          // Determine styling based on status
          let textColor = colors.textMutedLight;
          let textStyle = { color: colors.textMutedLight, textDecoration: 'line-through' };
          let prefix = null;
          
          if (status === 'open') {
            textStyle = { color: colors.accent };
            prefix = (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mr-2"
                style={{ color: colors.accent }}
              >
                &gt;
              </motion.span>
            );
          } else if (status === 'minimized') {
            textStyle = { color: colors.textMuted };
            prefix = (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="mr-2"
                style={{ color: colors.textMuted }}
              >
                _
              </motion.span>
            );
          }
          
          // Override with hover state
          if (isHovered && status !== 'open') {
            textStyle = { color: colors.text };
          }
          
          return (
            <motion.button
              key={domain.id}
              onClick={() => toggleWindow(domain.windowId)}
              onMouseEnter={() => setHoveredPath(domain.path)}
              onMouseLeave={() => setHoveredPath(null)}
              className="text-left px-4 py-2 font-mono text-xs transition-all relative uppercase tracking-wider"
              style={textStyle}
            >
              {prefix}
              <span>{domain.path}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Files Section */}
      <div 
        className="pt-4 mt-auto"
        style={{ borderTopColor: colors.border, borderTopWidth: '1px', borderTopStyle: 'solid' }}
      >
        <p className="text-[10px] font-mono mb-2 px-4 uppercase tracking-wider" style={{ color: colors.neutral }}>FILES</p>
        <motion.button
          onClick={handleResumeClick}
          onMouseEnter={() => setHoveredFile('resume')}
          onMouseLeave={() => setHoveredFile(null)}
          className="text-left px-4 py-2 font-mono text-xs transition-all relative flex items-center gap-2"
          style={{ color: hoveredFile === 'resume' ? colors.info : `${colors.info}99` }}
        >
          <FileText size={12} />
          <span className="uppercase tracking-wider">resume.pdf</span>
        </motion.button>
      </div>
    </div>
  );
};

/* ===============================================================
   COMMAND PALETTE
================================================================ */
const CommandPalette = ({ isOpen, onClose, windows, toggleWindow, onResumeClick }) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { theme, toggleTheme, setTheme, colors } = useTheme();

  // Helper to check if a window is open
  const isWindowOpen = (windowId) => {
    const window = windows.find(w => w.id === windowId);
    return window?.status === 'open';
  };

  const commands = [
    {
      id: "services",
      label: "Open Projects",
      description: "View running services and projects",
      windowId: "services",
      action: () => {
        toggleWindow("services");
        onClose();
      },
      keywords: ["projects", "services", "work", "portfolio"]
    },
    {
      id: "notes",
      label: "Open Notes",
      description: "View technical notes and debugging logs",
      windowId: "notes",
      action: () => {
        toggleWindow("notes");
        onClose();
      },
      keywords: ["notes", "kernel", "log", "debug", "technical"]
    },
    {
      id: "monitor",
      label: "Open System Monitor",
      description: "View active processes and current focus",
      windowId: "monitor",
      action: () => {
        toggleWindow("monitor");
        onClose();
      },
      keywords: ["monitor", "sys", "system", "processes", "focus"]
    },
    {
      id: "packages",
      label: "Open Skills",
      description: "View installed packages and skills",
      windowId: "packages",
      action: () => {
        toggleWindow("packages");
        onClose();
      },
      keywords: ["skills", "packages", "lib", "tools", "tech"]
    },
    {
      id: "profile",
      label: "Open Profile",
      description: "View user profile and contact info",
      windowId: "profile",
      action: () => {
        toggleWindow("profile");
        onClose();
      },
      keywords: ["profile", "whoami", "about", "contact"]
    },
    {
      id: "resume",
      label: "Download Resume",
      description: "Open resume.pdf in new tab",
      action: () => {
        onResumeClick();
        onClose();
      },
      keywords: ["resume", "cv", "pdf", "download"]
    },
    {
      id: "clear",
      label: "Clear Console",
      description: "Clear the console history",
      action: () => {
        window.dispatchEvent(new CustomEvent('consoleClear'));
        onClose();
      },
      keywords: ["clear", "console"]
    },
    {
      id: "theme-dark",
      label: "Switch to Dark Theme",
      description: "Enable dark theme",
      action: () => {
        setTheme('dark');
        onClose();
      },
      keywords: ["theme", "dark", "mode", "switch"]
    },
    {
      id: "theme-light",
      label: "Switch to Light Theme",
      description: "Enable light theme",
      action: () => {
        setTheme('light');
        onClose();
      },
      keywords: ["theme", "light", "mode", "switch"]
    },
    {
      id: "theme-toggle",
      label: `Toggle Theme (Currently: ${theme === 'dark' ? 'Dark' : 'Light'})`,
      description: "Switch between dark and light themes",
      action: () => {
        toggleTheme();
        onClose();
      },
      keywords: ["theme", "toggle", "switch", "mode"]
    }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.keywords.some(keyword => 
      keyword.toLowerCase().includes(search.toLowerCase())
    ) ||
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSelectedIndex(0);
      setSearch("");
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-32"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="w-full max-w-2xl mx-4 bg-[#0c0c0c] border border-[#00ff00]/30 rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#00ff00]/20 flex items-center gap-3">
          <span className="text-[#00ff00] font-mono text-sm">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type to search commands..."
            className="flex-1 bg-transparent text-[#e5e5e5] font-mono text-sm outline-none placeholder:text-[#e5e5e5]/40"
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-[#e5e5e5]/60">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-[#e5e5e5]/40 font-mono text-sm">
              No commands found
            </div>
          ) : (
            <div className="py-2">
              {filteredCommands.map((cmd, index) => {
                const isOpen = cmd.windowId && isWindowOpen(cmd.windowId);
                return (
                  <motion.button
                    key={cmd.id}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full px-4 py-3 text-left flex items-start gap-3 font-mono text-sm transition-colors ${
                      index === selectedIndex
                        ? "bg-[#00ff00]/10 text-[#00ff00]"
                        : isOpen
                        ? "text-[#e5e5e5]/30 hover:bg-white/5"
                        : "text-[#e5e5e5] hover:bg-white/5"
                    }`}
                  >
                    <span className={`mt-0.5 ${isOpen && index !== selectedIndex ? "text-[#00ff00]/20" : "text-[#00ff00]/60"}`}>&gt;</span>
                    <div className="flex-1">
                      <div className="font-semibold">{cmd.label}</div>
                      <div className={`text-xs mt-0.5 ${isOpen && index !== selectedIndex ? "text-[#e5e5e5]/20" : "text-[#e5e5e5]/50"}`}>
                        {cmd.description}
                      </div>
                    </div>
                    {index === selectedIndex && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#00ff00] text-xs"
                      >
                        ENTER
                      </motion.span>
                    )}
                    {isOpen && index !== selectedIndex && (
                      <span className="text-[#e5e5e5]/20 text-xs">OPEN</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#00ff00]/20 flex items-center justify-between text-xs font-mono text-[#e5e5e5]/40">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↵</kbd>
              <span>Select</span>
            </span>
          </div>
          <span>{filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}</span>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ===============================================================
   MAIN APP COMPONENT
================================================================ */
export default function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const handleOpenNote = (note) => {
    setSelectedNote(note);
    setIsNoteModalOpen(true);
  };

  const handleCloseNote = () => {
    setIsNoteModalOpen(false);
    setSelectedNote(null);
  };

  const getWindowContent = (windowId) => {
    switch (windowId) {
      case "services":
        return <RunningServicesWindow />;
      case "notes":
        return <NotesWindow onOpenNote={handleOpenNote} />;
      case "monitor":
        return <SystemMonitorWindow />;
      case "packages":
        return <InstalledPackagesWindow />;
      case "profile":
        return <UserProfileWindow />;
      default:
        return null;
    }
  };

  const [windows, setWindows] = useState([
    { id: "services", status: "open", isMaximized: false, title: "running_services.log", width: null, height: 460 },
    { id: "notes", status: "open", isMaximized: false, title: "kernel_log.txt", width: null, height: 420 },
    { id: "monitor", status: "open", isMaximized: false, title: "system_monitor.log", width: null, height: 380 },
    { id: "packages", status: "open", isMaximized: false, title: "installed_packages.txt", width: null, height: 600 },
    { id: "profile", status: "open", isMaximized: false, title: "user_profile.txt", width: null, height: 520 }
  ]);

  const updateWindowSize = (windowId, width, height) => {
    setWindows(prev => prev.map(w => {
      if (w.id === windowId) {
        return { ...w, width, height };
      }
      return w;
    }));
  };

  const updateWindowPosition = (windowId, x, y) => {
    setWindows(prev => prev.map(w => {
      if (w.id === windowId) {
        return { ...w, x, y };
      }
      return w;
    }));
  };

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

  // Command Palette State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Handle Command Palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResumeClick = () => {
    window.open('/resume.pdf', '_blank');
  };

  const { colors } = useTheme();

  // Safety check - if colors is not defined, use fallback
  if (!colors || !colors.bg) {
    return (
      <div className="min-h-screen font-mono p-4" style={{ backgroundColor: '#0c0c0c', color: '#e5e5e5' }}>
        <p>Loading theme...</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen font-mono overflow-hidden"
      style={{
        backgroundColor: colors.bg,
        color: colors.text
      }}
    >
      <TextureOverlays />
      <SystemTray onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)} />
      <Dock windows={windows} toggleWindow={toggleWindow} />
      <Console />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        windows={windows}
        toggleWindow={toggleWindow}
        onResumeClick={handleResumeClick}
      />
      <NoteModal
        note={selectedNote}
        isOpen={isNoteModalOpen}
        onClose={handleCloseNote}
      />
      
      <main className="ml-32 mt-12 p-4 overflow-y-auto relative" style={{ paddingBottom: 'calc(300px + 1rem)' }}>
        <div className="max-w-[95%] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-max">
            {visibleWindows
              .filter(w => !w.isMaximized && (w.x === null || w.x === undefined))
              .map((window) => (
                <Window
                  key={window.id}
                  id={window.id}
                  title={window.title}
                  status={window.status}
                  isMaximized={window.isMaximized}
                  width={window.width}
                  height={window.height}
                  x={window.x}
                  y={window.y}
                  onClose={() => closeWindow(window.id)}
                  onMinimize={() => minimizeWindow(window.id)}
                  onMaximize={() => maximizeWindow(window.id)}
                  onSizeChange={(width, height) => updateWindowSize(window.id, width, height)}
                  onPositionChange={(x, y) => updateWindowPosition(window.id, x, y)}
                >
                  {getWindowContent(window.id)}
                </Window>
              ))}
          </div>
          {/* Absolutely positioned windows (resized from left/top) */}
          {visibleWindows
            .filter(w => !w.isMaximized && w.x !== null && w.x !== undefined)
            .map((window) => (
              <Window
                key={window.id}
                id={window.id}
                title={window.title}
                status={window.status}
                isMaximized={window.isMaximized}
                width={window.width}
                height={window.height}
                x={window.x}
                y={window.y}
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
                onSizeChange={(width, height) => updateWindowSize(window.id, width, height)}
                onPositionChange={(x, y) => updateWindowPosition(window.id, x, y)}
              >
                {getWindowContent(window.id)}
              </Window>
            ))}
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
                width={window.width}
                height={window.height}
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
                onSizeChange={(width, height) => updateWindowSize(window.id, width, height)}
              >
                {getWindowContent(window.id)}
              </Window>
            ))}
        </div>
      </main>
    </div>
  );
}
