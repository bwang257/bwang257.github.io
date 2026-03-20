'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

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

// Data
const EXPERIENCE = [
  { role: 'SWE Intern', org: 'Cyvl.ai', period: 'Summer 2026', desc: 'Geospatial infrastructure startup — AI-powered subsurface mapping for civil engineering.' },
  { role: 'Tech Sector Analyst', org: 'WPIA', period: '2024–Present', desc: 'Quantitative research and analysis of technology equities based on financial modeling.' },
  { role: 'Peer Mentor', org: 'SASE', period: '2024–Present', desc: 'Mentoring underclassmen in technical and professional development.' }
]

const COURSEWORK = {
  cs: ['Operating Systems', 'Systems Programming Concepts', 'Software Engineering', 'Database Systems I', 'Algorithms', 'Artificial Intelligence', 'Object-Oriented Design'],
  math: ['Stochastic Processes', 'Portfolio Valuation & Risk', 'Probability for Applications', 'Numerical Methods', 'Linear Programming', 'Matrices & Linear Algebra II']
}

const STACK = [
  { category: 'Systems & Low-Level', items: ['C++17', 'POSIX', 'mmap', 'Lock-free queues'] },
  { category: 'Math & Quant', items: ['Stochastic processes', 'SDEs', 'Itô calculus', 'Python'] },
  { category: 'Web & Cloud', items: ['TypeScript', 'React', 'Next.js', 'AWS', 'PostgreSQL'] }
]

function SectionHeader({ title }: { title: string }) {
  return (
    <ScrollReveal offsetMultiplier={0.5}>
      <h2 
        className="text-4xl md:text-5xl font-semibold tracking-tight text-text mb-12"
        style={{ fontFamily: '"Instrument Serif", serif' }}
      >
        {title}
      </h2>
    </ScrollReveal>
  )
}

function ProjectWindow({ project, delay = 0, disableReveal = false }: { project?: ProjectData, delay?: number, disableReveal?: boolean }) {
  if (!project) return null
  
  const content = (
    <a
      href={`/projects/${project.slug}`}
      className="window-card block p-8 cursor-pointer group relative overflow-hidden h-full flex flex-col justify-between"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-text-ghost/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-medium text-text group-hover:text-accent-warm transition-colors">{project.title}</h3>
          <span className="text-text-ghost group-hover:text-text transition-colors">↗</span>
        </div>
        <p className="text-text-muted leading-relaxed mb-8">{project.summary}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tools.map(tool => (
          <span key={tool} className="text-xs font-mono px-2.5 py-1 rounded-md bg-black/5 text-text-muted border border-black/5">
            {tool}
          </span>
        ))}
      </div>
    </a>
  )

  return disableReveal ? content : (
    <ScrollReveal offsetMultiplier={delay > 0 ? 1.5 : 1}>
      {content}
    </ScrollReveal>
  )
}

function GridOverviewProjects({ exchange, portfolio, algo, tracker }: Props) {
  return (
    <section id="projects" className="py-24 w-full max-w-6xl mx-auto px-6 md:px-12 relative">
      <ScrollReveal offsetMultiplier={0.5}>
        <SectionHeader title="Selected Work" />
      </ScrollReveal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-16">
        <div className="md:-mt-12 flex flex-col gap-8 md:gap-10">
          <ProjectWindow project={exchange} delay={0.1} />
          <ProjectWindow project={portfolio} delay={0.1} />
        </div>
        <div className="md:mt-12 flex flex-col gap-8 md:gap-10">
          <ProjectWindow project={algo} delay={0.2} />
          <ProjectWindow project={tracker} delay={0.2} />
        </div>
      </div>
    </section>
  )
}

export default function DynamicPortfolio({ exchange, algo, tracker, portfolio }: Props) {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 800])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -800])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <div className="min-h-screen selection:bg-accent-warm/20 relative">
      {/* Background Animated Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-transparent overflow-hidden">
        <motion.div 
          style={{ y: y1, rotate }} 
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/10 blur-[120px]" 
        />
        <motion.div 
          style={{ y: y2 }} 
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/10 blur-[120px]" 
        />
      </div>
      {/* Floating Nav */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel rounded-full px-6 py-3 flex items-center gap-6"
      >
        <div className="font-semibold tracking-tight whitespace-nowrap">Brian Wang</div>
        <div className="w-px h-4 bg-border" />
        <a href="#projects" className="text-sm text-text-muted hover:text-text transition-colors font-medium">Projects</a>
        <a href="#experience" className="text-sm text-text-muted hover:text-text transition-colors font-medium">Experience</a>
      </motion.nav>

      <main className="w-full relative">
        {/* HERO - STICKY PARALLAX SECTION */}
        <section className="sticky top-0 w-full min-h-screen flex flex-col justify-center px-6 md:px-12 z-0">
          <div className="max-w-6xl mx-auto w-full mt-[-10vh]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-10 md:gap-16">
                {/* Profile Image */}
                <div className="shrink-0 relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img src="/profile1.png" alt="Brian Wang" className="w-full h-full object-cover" />
                </div>

                {/* Text content */}
                <div className="flex-1 mt-6 md:mt-0">
                  <h1 
                    className="text-6xl md:text-8xl font-medium tracking-tight text-text leading-[1.05] mb-6"
                    style={{ fontFamily: '"Instrument Serif", serif' }}
                  >
                    Hi, I'm Brian.
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-text-ghost max-w-2xl leading-relaxed font-light mb-10 mx-auto md:mx-0">
                    Math & CS student at WPI. <br className="hidden md:block"/>
                    My interests lie in <strong className="font-medium text-text">low latency, systems, stochastic processes</strong>, and <strong className="font-medium text-text">financial mathematics.</strong>
                  </p>
                  
                  <div className="flex gap-4 items-center flex-wrap justify-center md:justify-start">
                    <a href="/resume.pdf" target="_blank" rel="noreferrer" className="px-6 py-3 bg-zinc-900 text-white rounded-full font-medium shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-all">
                      View Resume
                    </a>
                    <div className="ml-4 flex gap-4">
                      <a href="https://github.com/bwang257" target="_blank" rel="noreferrer" className="p-3 bg-white/60 border border-black/5 rounded-full text-text-muted hover:text-text hover:bg-white transition-all shadow-sm">
                        <Github className="w-5 h-5" />
                      </a>
                      <a href="https://linkedin.com/in/bwang257" target="_blank" rel="noreferrer" className="p-3 bg-white/60 border border-black/5 rounded-full text-text-muted hover:text-text hover:bg-white transition-all shadow-sm">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="mailto:brian.wang372@gmail.com" className="p-3 bg-white/60 border border-black/5 rounded-full text-text-muted hover:text-text hover:bg-white transition-all shadow-sm">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FULLSCREEN SLIDING MODAL CONTAINER */}
        <div className="relative z-10 w-full min-h-screen bg-white/80 backdrop-blur-3xl rounded-t-[48px] md:rounded-t-[64px] shadow-[0_-20px_80px_rgba(0,0,0,0.08)] border-t border-black/5 pt-16 pb-32">
          
          {/* GRID OVERVIEW PROJECTS SECTION */}
          <GridOverviewProjects exchange={exchange} algo={algo} tracker={tracker} portfolio={portfolio} />

          {/* EXPERIENCE & EDUCATION SECTION */}
          <section id="experience" className="py-32 max-w-6xl mx-auto px-6 md:px-12">
            <SectionHeader title="Experience" />
            
            <div className="space-y-6 mb-24">
              {EXPERIENCE.map((exp, idx) => (
                <ScrollReveal key={idx} offsetMultiplier={1 + (idx * 0.2)}>
                  <div className="window-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:-translate-y-1 transition-transform">
                    <div>
                      <h3 className="text-2xl font-medium text-text mb-1">{exp.role}</h3>
                      <div className="text-accent-warm font-medium mb-3 text-lg">{exp.org}</div>
                      <p className="text-text-ghost text-sm md:text-base max-w-xl leading-relaxed">{exp.desc}</p>
                    </div>
                    <div className="font-mono text-sm text-text-muted shrink-0 text-left md:text-right md:border-r-2 border-border md:pr-4">
                      {exp.period}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <SectionHeader title="Education" />
            
            <ScrollReveal offsetMultiplier={0.8}>
              <div className="window-card p-8 md:p-10 relative overflow-hidden transition-all hover:shadow-[0_10px_50px_rgb(0,0,0,0.06)] hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-warm/5 rounded-full blur-[80px] -mr-10 -mt-20 pointer-events-none" />
                
                <div className="flex flex-col md:flex-row justify-between mb-12 relative z-10">
                  <div>
                    <h3 className="text-3xl font-medium text-text mb-2 tracking-tight">Worcester Polytechnic Institute</h3>
                    <div className="text-lg text-text-muted">BS Computer Science & Mathematical Sciences</div>
                  </div>
                  <div className="font-mono text-accent-warm font-medium md:text-right mt-4 md:mt-0 tracking-widest text-sm uppercase">Class of 2028</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                  <div>
                    <div className="text-xs font-mono tracking-widest uppercase text-text-ghost mb-6">Systems & Algorithms</div>
                    <ul className="space-y-3">
                      {COURSEWORK.cs.map((course) => (
                         <li key={course} className="flex items-start gap-3 text-text font-medium">
                           <span className="text-accent-warm/50 mt-1">▹</span> {course}
                         </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-mono tracking-widest uppercase text-text-ghost mb-6">Quantitative Mathematics</div>
                    <ul className="space-y-3">
                      {COURSEWORK.math.map((course) => (
                         <li key={course} className="flex items-start gap-3 text-text font-medium">
                           <span className="text-accent-warm/50 mt-1">▹</span> {course}
                         </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

        </div>

      </main>
    </div>
  )
}
