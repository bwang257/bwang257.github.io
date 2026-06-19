'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, FileText } from 'lucide-react'
import OrderBookSimulator from './OrderBookSimulator'

export type ProjectData = {
  slug: string
  title: string
  summary: string
  tools: string[]
  github: string | null
}

interface Props {
  exchange?: ProjectData
  algo?: ProjectData
  tracker?: ProjectData
  portfolio?: ProjectData
}

// Subtle non-blocking scroll animation
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}

export default function DynamicPortfolio({ exchange, algo, tracker, portfolio }: Props) {
  const projects = [exchange, algo, tracker, portfolio].filter(Boolean) as ProjectData[]

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/15 font-sans">
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border-subtle bg-surface/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="font-serif text-2xl tracking-tight text-primary">
            Brian Wang
          </Link>
          <div className="flex gap-6 text-sm font-medium text-secondary">
            <Link href="#work" className="hover:text-primary transition-colors">Work</Link>
            <Link href="/learning" className="hover:text-primary transition-colors">Learning</Link>
            <Link href="/notes" className="hover:text-primary transition-colors">Notes</Link>
          </div>
        </nav>
      </header>

      <main className="pt-32 pb-32">
        <section className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h1 className="font-serif text-5xl tracking-tight text-primary md:text-7xl lg:text-[5.5rem] leading-[1.05] max-w-4xl">
              I build systems where I control the execution, and models where I validate the assumptions.
            </h1>
          </Reveal>
          
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col md:flex-row gap-8 md:items-end justify-between border-t border-border-subtle pt-8">
              <p className="max-w-xl text-lg text-secondary leading-relaxed">
                Computer Science and Mathematics student at Worcester Polytechnic Institute. 
                Interested in systems programming, machine learning, and stochastic processes.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="/Brian_Wang_Resume_Apple_SWE_Intern_2027.pdf" target="_blank" className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-2 text-sm font-medium text-primary hover:border-accent hover:text-accent transition-colors">
                  <FileText className="h-4 w-4" />
                  Resume
                </a>
                <a href="https://github.com/bwang257" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface text-secondary hover:border-primary hover:text-primary transition-colors">
                  <Github className="h-4 w-4" />
                </a>
                <a href="https://www.linkedin.com/in/brian372/" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface text-secondary hover:border-primary hover:text-primary transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto mt-40 max-w-5xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            <div>
              <Reveal>
                <div className="font-mono text-xs uppercase tracking-widest text-muted mb-4">Systems & Correctness</div>
                <h2 className="font-serif text-3xl tracking-tight text-primary mb-4">
                  Deterministic Execution
                </h2>
                <p className="text-secondary leading-relaxed mb-8 max-w-md">
                  Writing high-performance C++ matching engines requires absolute control over state transitions. 
                  Below is a live visualization of the core logic handling partial fills and limit queueing.
                </p>
                {exchange && (
                  <Link href={`/projects/${exchange.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-warm transition-colors">
                    Read the Exchange Simulator Case Study <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </Reveal>
            </div>
            
            <Reveal delay={0.2} className="w-full">
              <OrderBookSimulator />
            </Reveal>
          </div>
        </section>

        <section id="work" className="mx-auto mt-48 max-w-5xl px-6">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-widest text-muted mb-4 border-b border-border-subtle pb-4">Selected Work</div>
          </Reveal>
          
          <div className="mt-8 flex flex-col gap-6">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.1}>
                <Link href={`/projects/${project.slug}`} className="group block border border-border-subtle bg-surface p-8 transition-colors hover:border-accent">
                  <div className="grid md:grid-cols-[1fr_200px] gap-8">
                    <div>
                      <h3 className="font-serif text-2xl tracking-tight text-primary mb-3 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-secondary leading-relaxed max-w-2xl">
                        {project.summary}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 md:text-right">
                      <div className="font-mono text-xs uppercase tracking-widest text-muted mb-2">Tools</div>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {project.tools.slice(0, 4).map(tool => (
                          <span key={tool} className="text-sm font-medium text-secondary">{tool}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-40 max-w-5xl px-6">
          <Reveal>
            <div className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-border-subtle pt-12">
              <div className="font-mono text-xs uppercase tracking-widest text-muted">Experience</div>
              
              <div className="flex flex-col gap-12">
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-primary">Software Engineering Intern</h3>
                  <div className="font-mono text-sm text-accent mt-2 mb-4">CYVL • May 2026 – Present</div>
                  <p className="text-secondary leading-relaxed max-w-2xl">
                    Researching infrastructure condition forecasting under sparse historical-data constraints. 
                    Analyzing public records, road-condition data, and LiDAR/video model outputs to evaluate scalable modeling approaches. 
                    Developing Python-based analysis workflows for early-stage R&D expected to inform production engineering decisions.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-primary">Peer Learning Assistant</h3>
                  <div className="font-mono text-sm text-accent mt-2 mb-4">WPI Mathematical Sciences • Aug 2026 – May 2027</div>
                  <p className="text-secondary leading-relaxed max-w-2xl">
                    Selected by faculty to support undergraduate mathematics students; lead weekly problem-solving sessions and provide 1:1 instruction.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
        
        <section className="mx-auto mt-32 max-w-5xl px-6">
          <Reveal>
            <div className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-border-subtle pt-12">
              <div className="font-mono text-xs uppercase tracking-widest text-muted">Contact</div>
              <div>
                <p className="text-lg text-secondary mb-6">
                  Available for opportunities where I can solve difficult problems.
                </p>
                <a href="mailto:brianwang372@gmail.com" className="font-serif text-3xl md:text-5xl text-primary hover:text-accent transition-colors underline decoration-border-subtle hover:decoration-accent underline-offset-8">
                  brianwang372@gmail.com
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  )
}
