import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  TrendingUp,
  Cpu,
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  BarChart2,
  DollarSign,
  Database,
  Brain,
  ChevronDown,
  GraduationCap,
  Code,
  Award,
} from "lucide-react";

// import { FinancialTicker } from "./components/FinancialTicker";

/* ===============================================================
   1. GLOBAL STYLES
================================================================ */
const GlobalStyles = () => (
  <style>{`
    @keyframes scroll-left {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll-left { animation: scroll-left 40s linear infinite; }

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

const USE_MOCK_DATA = true;
const mockData = [
  { symbol: "^GSPC", name: "S&P 500", price: 5123.69, change: 32.4, changesPercentage: 0.64 },
  { symbol: "^DJI", name: "Dow Jones", price: 38791.35, change: -120.62, changesPercentage: -0.31 },
  { symbol: "^IXIC", name: "NASDAQ", price: 16277.46, change: 121.92, changesPercentage: 0.75 },
  { symbol: "AAPL", name: "Apple Inc.", price: 170.12, change: -1.22, changesPercentage: -0.71 },
  { symbol: "EURUSD", name: "EUR/USD", price: 1.0855, change: 0.0021, changesPercentage: 0.19 },
  { symbol: "BTC-USD", name: "Bitcoin", price: 67120.5, change: 1500.8, changesPercentage: 2.28 },
];

const useFinancialData = () => {
  const [data, setData] = useState(mockData);
  return { data, loading: false };
};

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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setIsVisible(true));
    });
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
   3. COMPONENTS
================================================================ */

const TickerItem = ({ symbol, price, change, changesPercentage }) => {
  const isPositive = parseFloat(change) >= 0;
  const colorClass = isPositive ? "text-green-500" : "text-red-500";

  return (
    <div className="flex items-center gap-2 px-5 flex-shrink-0">
      {/* Symbol */}
      <span className="text-gray-200 font-medium tracking-tight">{symbol}</span>

      {/* Price */}
      <span className="text-gray-100 font-semibold">{price}</span>

      {/* Change */}
      <span className={`flex items-center gap-[2px] text-sm ${colorClass}`}>
        {isPositive ? (
          <TrendingUp size={14} strokeWidth={2.5} />
        ) : (
          <TrendingUp size={14} strokeWidth={2.5} className="rotate-180" />
        )}
        <span>
          {change} ({changesPercentage}%)
        </span>
      </span>
    </div>
  );
};


const FinancialTicker = () => {
  const { data, loading } = useFinancialData();
  const items = [...data, ...data];
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-gray-900 text-white backdrop-blur-md border-b border-gray-800 z-50 overflow-hidden">
      <div className="absolute top-0 left-0 flex items-center h-full animate-scroll-left">
        {loading ? (
          <div className="px-6 text-gray-400">Loading...</div>
        ) : (
          items.map((item, i) => <TickerItem key={i} {...item} />)
        )}
      </div>
    </div>
  );
};

const Header = ({ scrollY }) => (
  <nav
    className={`fixed top-12 w-full z-40 transition-all duration-500 ${
      scrollY > 100
        ? "bg-white/90 border-b border-gray-200 backdrop-blur-md"
        : "bg-transparent"
    }`}
  >
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <div
        className="text-2xl font-bold text-emerald-600 cursor-pointer hover:text-emerald-700 transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        BW
      </div>
      <div className="flex gap-6 text-gray-800 font-medium">
        {["About", "Projects", "Skills", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() =>
              document.getElementById(item.toLowerCase())?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="hover:text-emerald-600 transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  </nav>
);


const MonteCarloBackground = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const colors = [
      "rgba(16,185,129,0.4)",  // emerald
      "rgba(45,212,191,0.4)",   // teal
      "rgba(5,150,105,0.4)",   // green
    ];
    const numWalkers = 12;
    let walkers = [];
    let animationFrameId;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      walkers = [];

      for (let i = 0; i < numWalkers; i++) {
        const w = {
          x: 0,
          y: canvas.height * (0.3 + Math.random() * 0.4),
          color: colors[i % colors.length],
          volatility: 2 + Math.random() * 2.5,
          drift: (Math.random() - 0.5) * 0.3,
          driftFreq: 0.001 + Math.random() * 0.001,
          driftPhase: Math.random() * Math.PI * 2,
          startDelay: Math.random() * 2500, // milliseconds before starting
          started: false,
          history: [],
        };
        // Each line starts at a random time
        setTimeout(() => (w.started = true), w.startDelay);
        walkers.push(w);
      }
    };
    const draw = () => {
      // solid white background every frame
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      walkers.forEach((w) => {
        if (!w.started) return;

        // motion update
        const drift =
          w.drift + Math.sin(Date.now() * w.driftFreq + w.driftPhase) * 0.3;
        const step = (Math.random() - 0.5) * w.volatility + drift;
        w.y = Math.max(0, Math.min(canvas.height, w.y + step));

        // add new point
        w.history.push({ x: w.x, y: w.y });

        // start fade when it reaches the right edge
        if (w.x > canvas.width && !w.fading) {
          w.fading = true;
          w.fadeAlpha = 1.0;
        }

        // choose opacity
        let alpha = 0.7;
        if (w.fading) {
          w.fadeAlpha -= 0.02; // slower = longer fade
          alpha = Math.max(w.fadeAlpha, 0);
        }

        // draw single translucent stroke
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = w.color.replace(/[\d.]+\)$/g, `${alpha})`);
        ctx.moveTo(w.history[0].x, w.history[0].y);
        for (let i = 1; i < w.history.length; i++) {
          ctx.lineTo(w.history[i].x, w.history[i].y);
        }
        ctx.stroke();

        // advance or reset
        if (!w.fading) {
          w.x += 1;
        } else if (w.fadeAlpha <= 0) {
          // reset after fade completes
          w.fading = false;
          w.x = 0;
          w.history = [];
          w.y = canvas.height * (0.3 + Math.random() * 0.4);
          w.driftPhase = Math.random() * Math.PI * 2;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };



    setup();
    draw();

    window.addEventListener("resize", setup);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 z-0" />;
};


/* ===============================================================
   4. SECTIONS
================================================================ */

const HeroSection = () => (
  <section
    id="hero"
    className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 pb-12 bg-white"
  >
    <div className="absolute inset-0 overflow-hidden">
      <MonteCarloBackground />
      <div className="absolute inset-0 bg-white/65"></div>
    </div>

    <div className="relative z-10 text-center px-6 max-w-4xl">
      <h1 className="text-6xl md:text-8xl font-bold mb-5 bg-gradient-to-r text-emerald-500 bg-clip-text">
        Brian Wang
      </h1>
      <p className="text-2xl md:text-3xl mb-4 text-gray-800">
        Computer Science & Mathematical Sciences
      </p>
      <div className="flex gap-4 justify-center mb-12">
        <a
          href="mailto:brian.wang372@gmail.com"
          className="p-3 bg-emerald-600 hover:bg-emerald-700 rounded-full text-white transition-all hover:scale-110"
        >
          <Mail size={24} />
        </a>
        <a
          href="https://linkedin.com/in/brian372"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-emerald-600 hover:bg-emerald-700 rounded-full text-white transition-all hover:scale-110"
        >
          <Linkedin size={24} />
        </a>

        <a
          href="https://github.com/bwang257"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-emerald-600 hover:bg-emerald-700 rounded-full text-white transition-all hover:scale-110"
        >
          <Github size={24} />
        </a>
        
      </div>
      <ChevronDown
        className="mx-auto text-emerald-600 animate-bounce cursor-pointer"
        size={32}
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      />
    </div>
  </section>
);

const AboutSection = () => (
  <AnimatedSection id="about" className="py-14 px-6 bg-gray-50 text-gray-800">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-5xl font-bold mb-8 text-emerald-600 tracking-tight">
        About Me
      </h2>

      <div className="bg-white shadow-sm rounded-2xl p-10 border border-gray-100 text-left">
        <p className="text-lg leading-relaxed text-gray-700">
        Hi! I'm Brian, a sophomore passionate about the intersection of programming and mathematics 
        to understand and solve complex problems, especially in financial markets. I'm currently working 
        on a C++ personal project to strengthen my systems-level skills and explore performance optimization.
        Really excited to apply my curiosity and enthusiasm to a Summer 2026 internship!
        </p>
      </div>
    </div>
  </AnimatedSection>
);

const Hobbies = () => (
  <AnimatedSection id="about" className="py-14 px-6 bg-gray-50 text-gray-800">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-5xl font-bold mb-8 text-emerald-600 tracking-tight">
        Hobbies
      </h2>

      <div className="bg-white shadow-sm rounded-2xl p-10 border border-gray-100 text-left">
        <p className="text-lg leading-relaxed text-gray-700">
        In my free time, I love to play tennis, swim, lift, and bike! Pictures coming soon!
        </p>
      </div>
    </div>
  </AnimatedSection>
);


const ProjectCard = ({ title, description, tags, github, link, privateRepo, date }) => (
  <div className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-all w-[90%] md:w-[90%] flex flex-col justify-between">
    {/* Header */}
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center space-x-3">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-emerald-600 transition-colors"
            aria-label="Project Demo"
          >
            <ArrowUpRight size={20} />
          </a>
        )}
      </div>
    </div>

    {/* Title, Date, Description */}
    <h3 className="text-2xl font-semibold text-gray-800 mb-1">{title}</h3>
    {date && <p className="text-sm text-gray-500 mb-3">{date}</p>}
    {description && (
      <p className="text-base text-gray-600 mb-4 leading-relaxed">{description}</p>
    )}

    {/* Tags */}
    <div className="flex flex-wrap gap-1.5 mb-3">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-sm border border-emerald-100"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* GitHub Link or Private Note */}
    <div className="flex justify-end mt-auto">
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors text-sm"
        >
          <Github size={18} />
          View on GitHub
        </a>
      ) : privateRepo ? (
        <p className="text-sm text-gray-500 italic">
          Repository private (academic project)
        </p>
      ) : null}
    </div>
  </div>
);

const ProjectsSection = () => (
  <AnimatedSection id="projects" className="py-16 px-8 bg-gray-50 text-gray-800">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold mb-10 text-center text-emerald-600 tracking-tight">
        Projects
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-6 justify-items-center">
        
        <ProjectCard
          title="Gamified Internship Tracker"
          date="October 2025 – Present"
          description= "Collaborative Scrum-based project for WPI’s Software Engineering course, developing a full-stack web app for gamified internship tracking using Python, SQL, and React."
          tags={["React", "Flask", "SQL", "AWS"]}
          github={null}
          privateRepo={true}
        />

        <ProjectCard
          title="Algorithmic Trading System"
          date="June – August 2025"
          description="Introductory systematic trading project where I built and tested modular Python 
                      algorithms on QuantConnect, focusing on statistical arbitrage, momentum, and mean-reversion 
                      strategies."
          
          tags={[
            "Python",
            "Statistical Arbitrage",
            "Backtesting",
            "QuantConnect",
          ]}
          github="https://github.com/bwang257/IQP-2524-Stock-Market-Simulation"
          privateRepo={false}
        />
      </div>
    </div>
  </AnimatedSection>
);




const SkillsSection = () => (
    <AnimatedSection id="skills" className="py-12 px-6 text-gray-800">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-5xl font-bold mb-10 text-center text-emerald-600 tracking-tight">
        Technical Skills
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Languages */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all">
          <h3 className="font-semibold text-xl text-emerald-600 mb-4">
            Languages
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>Python</li>
            <li>C/C++</li>
            <li>Java</li>
            <li>SQL</li>
            <li>MATLAB</li>
            <li>R</li>
          </ul>
        </div>

        {/* Quantitative & Analytical */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all">
          <h3 className="font-semibold text-xl text-emerald-600 mb-4">
            Quantitative & Analytical
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>Statistical Modeling</li>
            <li>Stochastic Processes</li>
            <li>Time-Series Analysis</li>
            <li>Portfolio Optimization</li>
            <li>Algorithmic Design</li>
            <li>Machine Learning</li>
            <li>Data Analysis</li>
          </ul>
        </div>

        {/* System and Tools */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all">
          <h3 className="font-semibold text-xl text-emerald-600 mb-4">
            Tools & Platforms
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>Git</li>
            <li>AWS</li>
            <li>Azure</li>
            <li>Unix</li>
            <li>Bloomberg Terminal</li>
          </ul>
        </div>
      </div>
    </div>
  </AnimatedSection>
);


const ContactSection = () => (
  <AnimatedSection id="contact" className="py-12 px-6 bg-gray-50 text-gray-800">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-4 text-emerald-600 tracking-tight">
        Contact
      </h2>

      <p className="text-gray-600 mb-6">
        Thanks for making it all the way down here 😀. Feel free to reach out, whether you want to collaborate, 
        chat, or just say hi!
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg font-small">
        <a
          href="mailto:brian.wang372@gmail.com"
          className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
        >
          <Mail size={18} />
          <span>brian.wang372@gmail.com</span>
        </a>

        <span className="hidden sm:inline text-gray-400">•</span>

        <a
          href="https://linkedin.com/in/brian372"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
        >
          <Linkedin size={18} />
          <span>linkedin.com/in/brian372</span>
        </a>
      </div>
    </div>
  </AnimatedSection>
);


const Footer = () => (
  <footer className="py-8 text-center text-gray-500 border-t border-gray-200">
    Brian Wang {new Date().getFullYear()}. Built with React & Tailwind CSS.
    {/* © */}
  </footer>
);

/* ===============================================================
   5. MAIN APP
================================================================ */

export default function App() {
  const scrollY = useScrollPosition();
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <GlobalStyles />
      <FinancialTicker />     
      <Header scrollY={scrollY} />
      <main>
        <HeroSection />
        <div className="bg-gray-50">
          <AboutSection />
          <Hobbies />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
