'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import OrderBook from './OrderBook'

// ── Types ──────────────────────────────────────────────────────────────────────

type Tab = 'work' | 'experience'
type CardId = 'exchange' | 'algo' | 'tracker' | 'portfolio'

export type ProjectData = {
  slug: string
  title: string
  summary: string
  tools: string[]
  github: string | null
}

interface DashboardProps {
  exchange?: ProjectData
  algo?: ProjectData
  tracker?: ProjectData
  portfolio?: ProjectData
}

// ── Static data ────────────────────────────────────────────────────────────────

const STACK_ROWS = [
  {
    label: 'LANGUAGES',
    items: 'C++17 · Python · TypeScript · SQL · LaTeX',
    context: null as string | null,
  },
  {
    label: 'SYSTEMS',
    items: 'Lock-free queues · POSIX · mmap · fork/exec · semaphores',
    context:
      'Applied in CS3013 (Operating Systems) — multithreaded mailbox with semaphores, lock-free file categorizer.',
  },
  {
    label: 'MATH',
    items: 'Stochastic processes · SDEs · Itô calculus · Markov chains · Probability',
    context:
      'Stochastic Processes (MA 4891) — CTMCs, Poisson processes, Kolmogorov equations. Currently pursuing SDEs and financial math independently.',
  },
  {
    label: 'TOOLS',
    items: 'Neovim · CMake · Git · React · Next.js · Flask · AWS · Jupyter',
    context: null as string | null,
  },
]

const EXPERIENCE_ENTRIES = [
  {
    id: 'cyvl',
    org: 'Cyvl.ai',
    role: 'SWE Intern',
    period: 'Summer 2026',
    upcoming: true,
    pending: false,
  },
  {
    id: 'wpia',
    org: 'WPI Investment Association',
    role: 'Technology Sector Analyst',
    period: '2024–Present',
    upcoming: false,
    pending: false,
  },
  {
    id: 'thetachi',
    org: 'Theta Chi',
    role: 'Assistant Treasurer',
    period: '2024–Present',
    upcoming: false,
    pending: false,
  },
  {
    id: 'sase',
    org: 'SASE',
    role: 'Peer Mentor',
    period: '2024–Present',
    upcoming: false,
    pending: false,
  },
  {
    id: 'pla',
    org: 'WPI Academic Affairs',
    role: 'Math & CS PLA Applicant',
    period: 'AY 2026–27',
    upcoming: false,
    pending: true,
  },
]

// ── Icons ──────────────────────────────────────────────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ── Shared UI primitives ───────────────────────────────────────────────────────

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono border px-1.5 py-0.5 tracking-wider uppercase"
      style={{
        fontSize: '0.55rem',
        color: 'var(--text-ghost)',
        borderColor: 'var(--border)',
        background: 'var(--surface)',
      }}
    >
      {children}
    </span>
  )
}

function MetricChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono border px-2 py-0.5"
      style={{
        fontSize: '0.65rem',
        color: 'var(--text)',
        borderColor: 'var(--border)',
        background: 'var(--surface-raised)',
      }}
    >
      {children}
    </span>
  )
}

function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono uppercase block"
      style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--text-ghost)' }}
    >
      {children}
    </span>
  )
}

// ── Syntax-highlighted code block ─────────────────────────────────────────────

function ExchangeCodeBlock() {
  const kw = '#FF7B72'
  const fn = '#79C0FF'
  const cm = '#484F58'
  const tx = '#E6EDF3'
  const op = '#8B949E'

  return (
    <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg)' }}>
      <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--border)' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--border)' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--border)' }} />
        <span className="ml-2 font-mono" style={{ fontSize: '0.625rem', color: 'var(--text-ghost)' }}>
          matching_engine.cpp
        </span>
      </div>
      <pre className="p-4 overflow-x-auto font-mono leading-relaxed" style={{ fontSize: '0.75rem', color: tx }}>
        <code>
          <span style={{ color: cm }}>{'// Price-time priority matching\n'}</span>
          <span style={{ color: kw }}>auto</span>{' '}
          <span style={{ color: fn }}>match</span>
          {'(Order& incoming) '}
          <span style={{ color: op }}>{'-> '}</span>
          <span style={{ color: fn }}>std::vector</span>
          {'<Trade> {\n  '}
          <span style={{ color: fn }}>std::vector</span>
          {'<Trade> trades;\n  '}
          <span style={{ color: kw }}>auto</span>
          {'& book = incoming.side '}
          <span style={{ color: op }}>==</span>
          {' Side::Buy\n    '}
          <span style={{ color: op }}>?</span>
          {' asks_ '}
          <span style={{ color: op }}>:</span>
          {' bids_;\n\n  '}
          <span style={{ color: kw }}>while</span>
          {' (!book.'}
          <span style={{ color: fn }}>empty</span>
          {'() '}
          <span style={{ color: op }}>&&</span>
          {' '}
          <span style={{ color: fn }}>crosses</span>
          {'(incoming, book.'}
          <span style={{ color: fn }}>top</span>
          {'())) {\n    '}
          <span style={{ color: kw }}>auto</span>
          {'& resting = book.'}
          <span style={{ color: fn }}>top</span>
          {'();\n    uint64_t qty = std::'}
          <span style={{ color: fn }}>min</span>
          {'(incoming.qty, resting.qty);\n    trades.'}
          <span style={{ color: fn }}>push_back</span>
          {'({resting.price, qty,\n                      resting.id, incoming.id});\n    incoming.qty -= qty;\n    '}
          <span style={{ color: kw }}>if</span>
          {' ((resting.qty -= qty) '}
          <span style={{ color: op }}>==</span>
          {' 0) book.'}
          <span style={{ color: fn }}>pop</span>
          {'();\n    '}
          <span style={{ color: kw }}>if</span>
          {' (incoming.qty '}
          <span style={{ color: op }}>==</span>
          {' 0) '}
          <span style={{ color: kw }}>break</span>
          {';\n  }\n  '}
          <span style={{ color: kw }}>return</span>
          {' trades;\n}'}
        </code>
      </pre>
    </div>
  )
}

// ── Close bar ─────────────────────────────────────────────────────────────────

function CloseBar({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onClose}
        className="font-mono text-xs hover-text transition-colors duration-200"
        style={{ color: 'var(--text-ghost)' }}
        aria-label="Back to grid"
      >
        ← back
      </button>
      <button
        onClick={onClose}
        className="w-7 h-7 flex items-center justify-center rounded-lg border hover-text transition-colors duration-200"
        style={{ color: 'var(--text-ghost)', borderColor: 'var(--border)' }}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  )
}

// ── Expanded card views ────────────────────────────────────────────────────────

function ExpandedExchange({ project, onClose }: { project?: ProjectData; onClose: () => void }) {
  return (
    <div className="panel-in p-6 max-w-4xl">
      <CloseBar onClose={onClose} />

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <h2 className="font-semibold" style={{ fontSize: '1.25rem', color: 'var(--text)' }}>
          {project?.title ?? 'Exchange Simulator'}
        </h2>
        <span
          className="font-mono rounded border px-2 py-0.5"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            borderColor: 'rgba(88,166,255,0.3)',
            background: 'rgba(88,166,255,0.05)',
          }}
        >
          FLAGSHIP
        </span>
        {project?.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover-text transition-colors duration-200"
            style={{ fontSize: '0.8125rem', color: 'var(--text-ghost)' }}
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </a>
        )}
      </div>

      <p className="mb-5" style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>
        High-performance C++17 limit order book simulator. Single-threaded matching loop, price-time
        FIFO priority, event-driven architecture.{' '}
        <span style={{ color: 'var(--text)' }}>
          The hard part: correct partial fills, order cancellation lifecycle, and deterministic replay
          — given the same input sequence, identical output every time.
        </span>
      </p>

      <div
        className="rounded-lg border p-4 mb-5 font-mono"
        style={{ background: 'var(--bg)', borderColor: 'var(--border-subtle)', fontSize: '0.75rem' }}
      >
        <SLabel>Performance</SLabel>
        <div className="mt-3 space-y-1.5">
          {[
            ['Throughput', '327K orders/sec'],
            ['P99 latency', '4.3μs'],
            ['Language', 'C++17'],
            ['Architecture', 'Single-threaded event loop'],
            ['Matching', 'Price-time FIFO'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6">
              <span style={{ color: 'var(--text-ghost)' }}>{k}</span>
              <span style={{ color: 'var(--accent)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <ExchangeCodeBlock />
      </div>

      <div className="mb-5">
        <div
          className="rounded-lg border p-3 flex flex-col"
          style={{ height: '220px', background: 'var(--bg)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="font-mono mb-2" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-ghost)' }}>
            SIMULATED · PRICE-TIME MATCHING
          </div>
          <div className="flex-1">
            <OrderBook />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(project?.tools ?? ['C++', 'CMake', 'Testing']).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>
  )
}

function ExpandedAlgo({ project, onClose }: { project?: ProjectData; onClose: () => void }) {
  return (
    <div className="panel-in p-6 max-w-4xl">
      <CloseBar onClose={onClose} />

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <h2 className="font-semibold" style={{ fontSize: '1.25rem', color: 'var(--text)' }}>
          {project?.title ?? 'Algorithmic Trading System'}
        </h2>
        {project?.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover-text transition-colors duration-200"
            style={{ fontSize: '0.8125rem', color: 'var(--text-ghost)' }}
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </a>
        )}
      </div>

      <p className="mb-5" style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>
        Solo quantitative research project — deployed multiple strategies live to study the gap between
        backtested performance and real-market behavior.{' '}
        <span style={{ color: 'var(--text)' }}>
          The goal was not positive returns. It was firsthand exposure to the full quant workflow:
          research, implementation, backtesting, live deployment, failure, and post-mortem.
        </span>
      </p>

      <div
        className="rounded-lg border p-4 mb-5 font-mono"
        style={{ background: 'var(--bg)', borderColor: 'var(--border-subtle)', fontSize: '0.75rem' }}
      >
        <SLabel>Live deployment results</SLabel>
        <div className="mt-3 space-y-1.5">
          {[
            ['Strategies deployed', '5'],
            ['Signal leakage', 'Detected'],
            ['Regime shift impact', 'Significant degradation'],
            ['Backtest vs live Δ', 'Substantial disconnect'],
            ['Outcome', 'Pivoted to systems engineering'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 flex-wrap">
              <span style={{ color: 'var(--text-ghost)' }}>{k}</span>
              <span style={{ color: 'var(--text-muted)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 mb-5" style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
        <p>
          <span style={{ color: 'var(--text)' }}>Backtests are hypotheses, not proof.</span> Live
          markets invalidated assumptions quickly, especially under persistent momentum and event-driven
          volatility.
        </p>
        <p>
          <span style={{ color: 'var(--text)' }}>Complexity masks fragility.</span> Layering indicators
          and regime models didn&apos;t fix weak foundations — it obscured failure modes rather than
          preventing them.
        </p>
        <p>
          This project directly influenced the pivot toward systems, execution, and infrastructure.
          Understanding how strategies fail increased appreciation for determinism and correctness at
          the system level.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(project?.tools ?? ['Python', 'Jupyter', 'ML']).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>
  )
}


function ExpandedTracker({ project, onClose }: { project?: ProjectData; onClose: () => void }) {
  return (
    <div className="panel-in p-6 max-w-4xl">
      <CloseBar onClose={onClose} />

      <h2 className="font-semibold mb-4" style={{ fontSize: '1.25rem', color: 'var(--text)' }}>
        {project?.title ?? 'Internship Tracker'}
      </h2>

      <p className="mb-5" style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>
        Gamified application tracker built as a team of four for WPI&apos;s Software Engineering
        course. Students log applications, earn XP and badges, track streaks, and compete on
        leaderboards.{' '}
        <span style={{ color: 'var(--text)' }}>
          Built end-to-end with Scrum — uncertain requirements, time pressure, coordination across
          contributors.
        </span>
      </p>

      <div
        className="rounded-lg border p-4 mb-5 font-mono"
        style={{ background: 'var(--bg)', borderColor: 'var(--border-subtle)', fontSize: '0.75rem' }}
      >
        <SLabel>Technical scope</SLabel>
        <div className="mt-3 space-y-1.5">
          {[
            ['Backend', 'Flask + SQLAlchemy + PostgreSQL'],
            ['Auth', 'Role-based flows (student / employer)'],
            ['Gamification', 'XP, leveling, streaks, badges (app layer)'],
            ['Scraping', 'Modular scraper importing postings to schema'],
            ['Frontend', 'Jinja2 + Tailwind + light JS'],
            ['Deployment', 'Dockerized → AWS'],
            ['Process', 'Scrum, GitHub Issues/PRs, stakeholder reviews'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4 flex-wrap">
              <span className="shrink-0 w-28" style={{ color: 'var(--text-ghost)' }}>{k}</span>
              <span style={{ color: 'var(--text-muted)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
        The hardest problems were not algorithmic: making design decisions early, coordinating parallel
        work, delegating tasks effectively, and communicating progress clearly under time constraints.
      </p>

      <div className="flex flex-wrap gap-1.5 mt-5">
        {(project?.tools ?? ['Python', 'Flask', 'PostgreSQL', 'AWS']).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>
  )
}

function ExpandedPortfolio({ project, onClose }: { project?: ProjectData; onClose: () => void }) {
  return (
    <div className="panel-in p-6 max-w-4xl">
      <CloseBar onClose={onClose} />

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <h2 className="font-semibold" style={{ fontSize: '1.25rem', color: 'var(--text)' }}>
          {project?.title ?? 'Portfolio Optimization Engine'}
        </h2>
        {project?.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover-text transition-colors duration-200"
            style={{ fontSize: '0.8125rem', color: 'var(--text-ghost)' }}
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </a>
        )}
      </div>

      <p className="mb-5" style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>
        Full-stack portfolio optimization tool applying Markowitz models to working software with real
        data. Built with AI-assisted development (Cursor).{' '}
        <span style={{ color: 'var(--text)' }}>
          The challenge: ensuring generated optimization logic matched the intended mathematical
          formulation — validating covariance calculations, constraint enforcement, and optimizer
          behavior across edge cases.
        </span>
      </p>

      <div
        className="rounded-lg border p-4 mb-5 font-mono"
        style={{ background: 'var(--bg)', borderColor: 'var(--border-subtle)', fontSize: '0.75rem' }}
      >
        <SLabel>Technical challenges</SLabel>
        <div className="mt-3 space-y-1.5">
          {[
            ['Validation', 'Covariance calcs, constraint enforcement, ill-conditioned matrices'],
            ['Integration', 'yfinance → Python optimizer → frontend visualization'],
            ['AI-assisted', 'Cursor accelerated delivery; effort shifted to evaluation'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4 flex-wrap">
              <span className="shrink-0 w-24" style={{ color: 'var(--text-ghost)' }}>{k}</span>
              <span style={{ color: 'var(--text-muted)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(project?.tools ?? ['TypeScript', 'Python', 'CSS']).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>
  )
}

// ── Collapsed card shell ───────────────────────────────────────────────────────

function CollapsedCard({
  colClass,
  onClick,
  children,
}: {
  colClass: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
      className={`project-card p-6 flex flex-col ${colClass}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {children}
    </motion.article>
  )
}

// ── Work panel ────────────────────────────────────────────────────────────────

function WorkPanel({
  exchange,
  algo,
  tracker,
  portfolio,
  activeCard,
  setActiveCard,
}: {
  exchange?: ProjectData
  algo?: ProjectData
  tracker?: ProjectData
  portfolio?: ProjectData
  activeCard: CardId | null
  setActiveCard: (id: CardId | null) => void
}) {
  if (activeCard === 'exchange')
    return <ExpandedExchange project={exchange} onClose={() => setActiveCard(null)} />
  if (activeCard === 'algo')
    return <ExpandedAlgo project={algo} onClose={() => setActiveCard(null)} />
  if (activeCard === 'tracker')
    return <ExpandedTracker project={tracker} onClose={() => setActiveCard(null)} />
  if (activeCard === 'portfolio')
    return <ExpandedPortfolio project={portfolio} onClose={() => setActiveCard(null)} />

  return (
    <div
      className="panel-in p-6 lg:p-10 grid grid-cols-1 sm:grid-cols-2 gap-6"
      style={{ gridAutoRows: '1fr', height: 'auto', minHeight: '100%' }}
    >
      {/* Exchange Simulator */}
      <CollapsedCard
        colClass=""
        onClick={() => setActiveCard('exchange')}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold" style={{ fontSize: '1rem', color: 'var(--text)' }}>
              {exchange?.title ?? 'Exchange Simulator'}
            </span>
            <span
              className="font-mono rounded border px-1.5 py-0.5"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                color: 'var(--accent)',
                borderColor: 'rgba(88,166,255,0.3)',
                background: 'rgba(88,166,255,0.05)',
              }}
            >
              FLAGSHIP
            </span>
          </div>
          <span style={{ color: 'var(--text-ghost)', fontSize: '0.875rem', flexShrink: 0 }}>↗</span>
        </div>
        <p className="mb-3" style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--text-muted)', flex: 1 }}>
          C++17 limit order book. Price-time FIFO matching, event-driven architecture,
          deterministic replay.
        </p>
        <div className="flex flex-wrap gap-1.5 mb-2">
          <MetricChip>327K orders/sec</MetricChip>
          <MetricChip>4.3μs P99</MetricChip>
          <MetricChip>C++17</MetricChip>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {(exchange?.tools ?? ['C++', 'CMake']).map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </CollapsedCard>

      {/* Algo Trading */}
      <CollapsedCard colClass="" onClick={() => setActiveCard('algo')}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="font-semibold" style={{ fontSize: '1rem', color: 'var(--text)' }}>
            {algo?.title ?? 'Algorithmic Trading System'}
          </span>
          <span style={{ color: 'var(--text-ghost)', fontSize: '0.875rem', flexShrink: 0 }}>↗</span>
        </div>
        <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--text-muted)', flex: 1 }}>
          Solo quant research. Deployed 5 strategies live. Studied backtest vs. live
          divergence.
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
          {(algo?.tools ?? ['Python', 'Jupyter']).map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </CollapsedCard>

      {/* Internship Tracker */}
      <CollapsedCard colClass="" onClick={() => setActiveCard('tracker')}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="font-semibold" style={{ fontSize: '1rem', color: 'var(--text)' }}>
            {tracker?.title ?? 'Internship Tracker'}
          </span>
          <span style={{ color: 'var(--text-ghost)', fontSize: '0.875rem', flexShrink: 0 }}>↗</span>
        </div>
        <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--text-muted)', flex: 1 }}>
          Gamified application tracker. XP, streaks, leaderboards. Flask + PostgreSQL + AWS.
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
          {(tracker?.tools ?? ['Python', 'Flask', 'PostgreSQL']).map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </CollapsedCard>

      {/* Portfolio Optimization */}
      <CollapsedCard colClass="" onClick={() => setActiveCard('portfolio')}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="font-semibold" style={{ fontSize: '1rem', color: 'var(--text)' }}>
            {portfolio?.title ?? 'Portfolio Optimization Engine'}
          </span>
          <span style={{ color: 'var(--text-ghost)', fontSize: '0.875rem', flexShrink: 0 }}>↗</span>
        </div>
        <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--text-muted)', flex: 1 }}>
          Markowitz portfolio optimization. Full-stack, real data, AI-assisted dev.
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
          {(portfolio?.tools ?? ['TypeScript', 'Python']).map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </CollapsedCard>
    </div>
  )
}

// ── Stack panel ────────────────────────────────────────────────────────────────

function StackPanel() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="panel-in p-6 max-w-3xl">
      <SLabel>Technical profile</SLabel>
      <div className="mt-4">
        {STACK_ROWS.map(({ label, items, context }) => (
          <div key={label}>
            <div
              className="flex gap-6 items-start py-3 border-b"
              style={{
                borderColor: 'var(--border-subtle)',
                cursor: context ? 'pointer' : 'default',
              }}
              onClick={() => context && setExpanded(expanded === label ? null : label)}
              role={context ? 'button' : undefined}
              tabIndex={context ? 0 : undefined}
              onKeyDown={(e) =>
                context && e.key === 'Enter' && setExpanded(expanded === label ? null : label)
              }
            >
              <span
                className="font-mono shrink-0 w-24 uppercase"
                style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--text-ghost)' }}
              >
                {label}
              </span>
              <span className="flex-1" style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                {items}
              </span>
              {context && (
                <span
                  className="font-mono shrink-0 transition-transform duration-200"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-ghost)',
                    transform: expanded === label ? 'rotate(90deg)' : 'none',
                  }}
                >
                  ›
                </span>
              )}
            </div>
            {context && expanded === label && (
              <div
                className="py-3"
                style={{
                  paddingLeft: '7.5rem',
                  fontSize: '0.8125rem',
                  lineHeight: 1.7,
                  color: 'var(--text-ghost)',
                }}
              >
                {context}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Experience panel ───────────────────────────────────────────────────────────

const EXPERIENCE_WITH_DESC = [
  {
    id: 'cyvl',
    org: 'Cyvl.ai',
    role: 'Software Engineering Intern',
    period: 'Summer 2026',
    desc: 'Geospatial infrastructure startup — AI-powered subsurface mapping for civil engineering.',
    upcoming: true,
    pending: false,
  },
  {
    id: 'wpia',
    org: 'WPI Investment Association',
    role: 'Technology Sector Analyst',
    period: '2024–Present',
    desc: 'Research and analysis of technology sector equities.',
    upcoming: false,
    pending: false,
  },
  {
    id: 'thetachi',
    org: 'Theta Chi',
    role: 'Assistant Treasurer',
    period: '2024–Present',
    desc: null,
    upcoming: false,
    pending: false,
  },
  {
    id: 'sase',
    org: 'SASE',
    role: 'Peer Mentor',
    period: '2024–Present',
    desc: null,
    upcoming: false,
    pending: false,
  },
  {
    id: 'pla',
    org: 'WPI Academic Affairs',
    role: 'Math & CS Peer Learning Assistant',
    period: 'AY 2026–27',
    desc: null,
    upcoming: false,
    pending: true,
  },
]

function ExperiencePanel() {
  const stats = [
    { label: 'WPI CLASS OF', value: '2028' },
    { label: 'MAJOR', value: 'CS & Mathematical Sciences' },
    { label: 'SAT', value: '1570' },
    { label: "DEAN'S LIST", value: '✓' },
    { label: 'THOMPSON SCHOLAR', value: '✓' },
  ]

  return (
    <div className="panel-in p-6 max-w-5xl">
      {/* Stats block */}
      <div
        className="rounded-xl border p-4 mb-8 font-mono"
        style={{ background: 'var(--surface-raised)', borderColor: 'var(--border)', display: 'inline-flex', flexWrap: 'wrap', gap: '0 2.5rem' }}
      >
        {stats.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5 py-1">
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--text-ghost)' }}>
              {label}
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text)' }}>{value}</span>
          </div>
        ))}
      </div>

      <SLabel>Experience</SLabel>

      {/* Card grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {EXPERIENCE_WITH_DESC.map((entry, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1], delay: idx * 0.05 }}
            key={entry.id}
            className="rounded-xl border p-5 flex flex-col shadow-sm"
            style={{
              borderColor: entry.upcoming
                ? 'rgba(240,136,62,0.4)'
                : entry.pending
                ? 'var(--border-subtle)'
                : 'var(--border)',
              borderStyle: entry.upcoming ? 'dashed' : 'solid',
              background: entry.upcoming ? 'rgba(240,136,62,0.04)' : 'var(--surface)',
              opacity: entry.pending ? 0.55 : 1,
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="font-medium" style={{ fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.3 }}>
                {entry.org}
              </span>
              {entry.upcoming && (
                <span
                  className="font-mono rounded border px-1.5 py-0.5 shrink-0"
                  style={{
                    fontSize: '0.5rem',
                    letterSpacing: '0.08em',
                    color: 'var(--accent-warm)',
                    borderColor: 'rgba(240,136,62,0.3)',
                  }}
                >
                  UPCOMING
                </span>
              )}
              {entry.pending && (
                <span
                  className="font-mono rounded border px-1.5 py-0.5 shrink-0"
                  style={{
                    fontSize: '0.5rem',
                    letterSpacing: '0.08em',
                    color: 'var(--text-ghost)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  PENDING
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {entry.role}
            </div>
            {entry.desc && (
              <div className="mt-1.5" style={{ fontSize: '0.75rem', lineHeight: 1.6, color: 'var(--text-ghost)' }}>
                {entry.desc}
              </div>
            )}
            <div className="font-mono mt-auto pt-4" style={{ fontSize: '0.65rem', color: 'var(--text-ghost)' }}>
              {entry.period}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Dashboard shell ────────────────────────────────────────────────────────────

export default function Dashboard({ exchange, algo, tracker, portfolio }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('work')
  const [activeCard, setActiveCard] = useState<CardId | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  const switchTab = (tab: Tab) => {
    if (tab === activeTab) return
    setTransitioning(true)
    setTimeout(() => {
      setActiveTab(tab)
      setActiveCard(null)
      setTransitioning(false)
    }, 100)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCard(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const tabs: { id: Tab; label: string }[] = [
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
  ]

  return (
    <div className="flex flex-col" style={{ height: '100dvh', overflow: 'hidden', background: 'var(--bg)' }}>

      {/* ── TOPBAR ─────────────────────────────────────────────── */}
      <header
        className="flex-none flex items-center px-6 gap-6"
        style={{
          height: '3.5rem',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Name */}
        <div
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            color: 'var(--text)',
            lineHeight: 1,
            flexShrink: 0,
            letterSpacing: '0.02em',
          }}
        >
          Brian Wang
        </div>

        {/* Tabs */}
        <nav className="flex-1 flex justify-center gap-4" role="tablist" aria-label="Main navigation">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              onClick={() => switchTab(id)}
              className="px-2 py-4 font-mono transition-all duration-200 uppercase tracking-widest"
              style={{
                fontSize: '0.65rem',
                color: activeTab === id ? 'var(--text)' : 'var(--text-ghost)',
                borderBottom: activeTab === id
                  ? '1px solid var(--text)'
                  : '1px solid transparent',
                cursor: 'pointer',
                outline: 'none',
                background: 'transparent'
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span
            className="font-mono hidden sm:flex items-center gap-1"
            style={{ fontSize: '0.6rem', color: 'var(--accent-warm)' }}
          >
            <span>●</span> CYVL.AI · SWE INTERN · SUMMER 2026
          </span>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono hover-text transition-colors duration-200"
            style={{ fontSize: '0.7rem', color: 'var(--text-ghost)' }}
          >
            Resume ↗
          </a>
        </div>
      </header>

      {/* ── BODY ───────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── SIDEBAR ──────────────────────────────────────────── */}
        <aside
          className="hidden md:flex flex-col gap-5 flex-none overflow-y-auto p-6"
          style={{ width: '16rem', borderRight: '1px solid var(--border)' }}
        >
          {/* Initials + name */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center font-mono font-medium flex-shrink-0"
              style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
              }}
            >
              BW
            </div>
            <div>
              <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: '1.4rem', color: 'var(--text)', lineHeight: 1.1 }}>
                Brian Wang
              </div>
              <div className="font-mono mt-1" style={{ fontSize: '0.65rem', color: 'var(--text-ghost)', letterSpacing: '0.1em' }}>
                WPI · CS & Math · 2028
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5 font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-ghost)' }}>
            <span style={{ color: 'var(--green)' }}>●</span>
            available 2027
          </div>

          <hr style={{ borderColor: 'var(--border-subtle)', margin: 0 }} />

          {/* Stats */}
          <div className="font-mono space-y-1" style={{ fontSize: '0.7rem' }}>
            <div style={{ color: 'var(--text-ghost)', letterSpacing: '0.12em', fontSize: '0.6rem' }}>
              FINANCIAL MATH
            </div>
            <div style={{ color: 'var(--text-muted)' }}>Stochastic Processes</div>
            <div style={{ color: 'var(--text-muted)' }}>SDEs · Quant Modeling</div>
          </div>

          <hr style={{ borderColor: 'var(--border-subtle)', margin: 0 }} />

          {/* Links */}
          <div className="space-y-2">
            {[
              { href: 'https://github.com/bwang257', label: 'GitHub', isEmail: false },
              { href: 'https://www.linkedin.com/in/brian372/', label: 'LinkedIn', isEmail: false },
              { href: 'mailto:brian.wang372@gmail.com', label: 'brian.wang372@gmail.com', isEmail: true },
            ].map(({ href, label, isEmail }) => (
              <a
                key={label}
                href={href}
                target={isEmail ? undefined : '_blank'}
                rel={isEmail ? undefined : 'noopener noreferrer'}
                className="flex items-center gap-1.5 hover-text transition-colors duration-200"
                style={{ fontSize: '0.7rem', color: 'var(--text-ghost)' }}
              >
                {label === 'GitHub' && <GitHubIcon className="w-3 h-3" />}
                {label === 'LinkedIn' && <LinkedInIcon className="w-3 h-3" />}
                {isEmail && (
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                <span className="truncate">{label}</span>
              </a>
            ))}
          </div>
        </aside>

        {/* ── MAIN PANEL ──────────────────────────────────────── */}
        <main
          className="flex-1 overflow-y-auto"
          role="tabpanel"
          aria-label={activeTab}
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(4px)' : 'translateY(0)',
            transition: 'opacity 150ms ease-out, transform 150ms ease-out',
          }}
        >
          {activeTab === 'work' && (
            <WorkPanel
              exchange={exchange}
              algo={algo}
              tracker={tracker}
              portfolio={portfolio}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
            />
          )}
          {activeTab === 'experience' && <ExperiencePanel />}
        </main>
      </div>
    </div>
  )
}
