export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  stack: string[];
  links: {
    github?: string;
    demo?: string;
    paper?: string;
    writeup?: string;
  };
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'exchange-simulator',
    title: 'Exchange Simulator',
    subtitle: 'High-performance matching engine with order book simulation',
    description: 'A C++ exchange simulator implementing order book matching with limit and market orders. Built for correctness and performance, featuring concurrent order processing and comprehensive backtesting capabilities.',
    tags: ['Systems', 'C++', 'Concurrency', 'Performance'],
    stack: ['C++', 'CMake', 'GoogleTest'],
    links: {
      github: 'https://github.com/bwang257/exchange-simulator',
      writeup: 'https://digital.wpi.edu/concern/student_works/nz806420r?locale=en'
    },
    featured: true
  },
  {
    slug: 'portfolio-optimization-engine',
    title: 'Portfolio Optimization Engine',
    subtitle: 'Mean-variance optimization with risk-return frontier calculation',
    description: 'Full-stack portfolio optimization tool implementing Markowitz mean-variance optimization. Features REST API with concurrent calculations, real-time visualization of efficient frontier, and optimized database queries.',
    tags: ['Quant/Modeling', 'Full-Stack', 'Python', 'Databases'],
    stack: ['Python', 'Flask', 'SQL', 'JavaScript', 'React'],
    links: {
      github: 'https://github.com/bwang257/PortfolioOptimizationApp',
      demo: 'https://portfolio-optimization-app.vercel.app/'
    },
    featured: false
  },
  {
    slug: 'algorithmic-trading-system',
    title: 'Algorithmic Trading System',
    subtitle: 'Statistical modeling and backtesting framework for trading strategies',
    description: 'Trading system with order book simulation, comprehensive backtesting framework, and statistical models for price prediction and risk assessment. Modular architecture enables rapid strategy testing.',
    tags: ['Quant/Modeling', 'Python', 'Statistical Modeling'],
    stack: ['Python', 'NumPy', 'Pandas', 'Statistical Modeling'],
    links: {
      github: 'https://github.com/bwang257/IQP-2524-Stock-Market-Simulation',
      writeup: 'https://digital.wpi.edu/concern/student_works/nz806420r?locale=en'
    },
    featured: false
  }
];

export const highLevelTags = ['Systems', 'Quant/Modeling', 'Infrastructure', 'Full-Stack'];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(p => p.tags.includes(tag));
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}

