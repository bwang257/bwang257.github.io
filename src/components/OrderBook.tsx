'use client'

import { useState, useEffect } from 'react'

type Entry = { id: number; price: string; qty: number }

const BASE = 43250.0

function gen(side: 'bid' | 'ask', count: number): Entry[] {
  return Array.from({ length: count }, (_, i) => ({
    id: Math.random(),
    price:
      side === 'bid'
        ? (BASE - i * 0.25).toFixed(2)
        : (BASE + 0.25 + i * 0.25).toFixed(2),
    qty: Math.floor(Math.random() * 20) + 1,
  }))
}

export default function OrderBook() {
  const [bids, setBids] = useState<Entry[]>(() => gen('bid', 8))
  const [asks, setAsks] = useState<Entry[]>(() => gen('ask', 8))
  const [matchIdx, setMatchIdx] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const r = Math.random()
      if (r < 0.25) {
        setMatchIdx(0)
        setTimeout(() => setMatchIdx(null), 400)
        setBids((prev) => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            qty: Math.max(1, next[0].qty - Math.floor(Math.random() * 4 + 1)),
            id: Math.random(),
          }
          return next
        })
      } else if (r < 0.6) {
        setBids((prev) => {
          const next = [...prev]
          const i = Math.floor(Math.random() * next.length)
          next[i] = { ...next[i], qty: Math.floor(Math.random() * 20) + 1, id: Math.random() }
          return next
        })
      } else {
        setAsks((prev) => {
          const next = [...prev]
          const i = Math.floor(Math.random() * next.length)
          next[i] = { ...next[i], qty: Math.floor(Math.random() * 20) + 1, id: Math.random() }
          return next
        })
      }
    }, 800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col h-full gap-2">
      <div
        className="font-mono uppercase tracking-[0.12em]"
        style={{ fontSize: '0.6rem', color: 'var(--text-ghost)' }}
      >
        Simulated Order Book · BTC/USD
      </div>
      <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
        {/* Bids */}
        <div>
          <div
            className="grid grid-cols-2 font-mono uppercase tracking-wider mb-1.5"
            style={{ fontSize: '0.55rem', color: 'var(--text-ghost)' }}
          >
            <span>Bid</span>
            <span className="text-right">Qty</span>
          </div>
          <div className="space-y-[2px]">
            {bids.map((b, i) => (
              <div
                key={b.id}
                className="grid grid-cols-2 font-mono rounded-sm transition-colors duration-200"
                style={{
                  fontSize: '0.65rem',
                  backgroundColor: i === matchIdx ? 'rgba(63,185,80,0.15)' : 'transparent',
                }}
              >
                <span style={{ color: 'var(--green)' }}>{b.price}</span>
                <span className="text-right" style={{ color: 'var(--text-muted)' }}>
                  {b.qty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Asks */}
        <div>
          <div
            className="grid grid-cols-2 font-mono uppercase tracking-wider mb-1.5"
            style={{ fontSize: '0.55rem', color: 'var(--text-ghost)' }}
          >
            <span>Ask</span>
            <span className="text-right">Qty</span>
          </div>
          <div className="space-y-[2px]">
            {asks.map((a, i) => (
              <div
                key={a.id}
                className="grid grid-cols-2 font-mono rounded-sm transition-colors duration-200"
                style={{
                  fontSize: '0.65rem',
                  backgroundColor: i === matchIdx ? 'rgba(255,100,100,0.1)' : 'transparent',
                }}
              >
                <span style={{ color: '#f87171' }}>{a.price}</span>
                <span className="text-right" style={{ color: 'var(--text-muted)' }}>
                  {a.qty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
