'use client'

import { useState, useEffect, useRef } from 'react'

type Point = [number, number] // [step, price]

const N = 5
const MU = 0.00005
const SIGMA = 0.016
const MAX_STEPS = 200
const W = 400
const H = 140
const PRICE_MIN = 65
const PRICE_RANGE = 70 // maps [65, 135] → [H, 0]
const COLORS = ['#58A6FF', '#3FB950', '#F0883E', '#FF7B72', '#A371F7']
const INTERVAL_MS = 25

function gbmStep(prev: number): number {
  // Box-Muller normal sample
  const u1 = Math.random()
  const u2 = Math.random()
  const z = Math.sqrt(-2 * Math.log(u1 + 1e-10)) * Math.cos(2 * Math.PI * u2)
  return prev * Math.exp(MU - 0.5 * SIGMA * SIGMA + SIGMA * z)
}

function toSvgPath(points: Point[]): string {
  if (points.length < 2) return ''
  return points
    .map(([step, price], i) => {
      const x = (step / MAX_STEPS) * W
      const y = H - ((price - PRICE_MIN) / PRICE_RANGE) * H
      const yc = Math.max(2, Math.min(H - 2, y))
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${yc.toFixed(1)}`
    })
    .join(' ')
}

type PathState = { points: Point[]; color: string; bold: boolean }

function initPaths(): PathState[] {
  return COLORS.map((color, i) => ({
    points: [[0, 100]] as Point[],
    color,
    bold: i === 0,
  }))
}

export default function GBMPaths() {
  const [paths, setPaths] = useState<PathState[]>(initPaths)
  const stepRef = useRef(0)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const animate = (time: number) => {
      if (time - lastTimeRef.current >= INTERVAL_MS) {
        lastTimeRef.current = time
        if (stepRef.current >= MAX_STEPS) {
          stepRef.current = 0
          setPaths(initPaths())
        } else {
          const s = stepRef.current
          stepRef.current++
          setPaths((prev) =>
            prev.map((path) => {
              const lastPrice = path.points[path.points.length - 1][1]
              return {
                ...path,
                points: [...path.points, [s + 1, gbmStep(lastPrice)] as Point],
              }
            })
          )
        }
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="flex flex-col h-full gap-2">
      <div
        className="font-mono uppercase tracking-[0.12em]"
        style={{ fontSize: '0.6rem', color: 'var(--text-ghost)' }}
      >
        Geometric Brownian Motion · n={N} paths
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="flex-1 w-full"
        style={{ minHeight: 0 }}
        aria-hidden="true"
      >
        {paths.map((path, i) => (
          <path
            key={i}
            d={toSvgPath(path.points)}
            stroke={path.color}
            strokeWidth={path.bold ? 1.5 : 0.8}
            fill="none"
            opacity={path.bold ? 0.9 : 0.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  )
}
