'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Order = {
  id: number
  price: number
  size: number
  isBid: boolean
  timestamp: number
}

type LogEntry = {
  id: number
  message: string
  type: 'add' | 'match' | 'cancel'
}

const INITIAL_TIME = Date.now()

export default function OrderBookSimulator() {
  const [bids, setBids] = useState<Order[]>([
    { id: 1, price: 100.15, size: 300, isBid: true, timestamp: INITIAL_TIME - 5000 },
    { id: 2, price: 100.17, size: 120, isBid: true, timestamp: INITIAL_TIME - 4000 },
    { id: 3, price: 100.18, size: 240, isBid: true, timestamp: INITIAL_TIME - 3000 },
  ])
  const [asks, setAsks] = useState<Order[]>([
    { id: 4, price: 100.20, size: 180, isBid: false, timestamp: INITIAL_TIME - 2000 },
    { id: 5, price: 100.22, size: 90, isBid: false, timestamp: INITIAL_TIME - 1000 },
    { id: 6, price: 100.25, size: 210, isBid: false, timestamp: INITIAL_TIME - 500 },
  ])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const nextId = useRef(7)

  const addLog = (message: string, type: 'add' | 'match' | 'cancel') => {
    setLogs((prev) => [{ id: Date.now() + Math.random(), message, type }, ...prev].slice(0, 5))
  }

  const submitOrder = useCallback((isBid: boolean, targetPrice?: number) => {
    // Generate a reasonable price
    const basePrice = isBid ? (asks.length > 0 ? asks[0].price : 100.20) : (bids.length > 0 ? bids[bids.length - 1].price : 100.18)
    
    // Randomize order type: 70% crossing the spread (match), 30% adding to book
    const crossingSpread = targetPrice !== undefined ? false : Math.random() > 0.3
    
    let price = targetPrice
    if (!price) {
        if (crossingSpread) {
            price = isBid ? basePrice : basePrice
        } else {
            const offset = (Math.random() * 0.05).toFixed(2)
            price = isBid ? Math.max(90, basePrice - parseFloat(offset)) : basePrice + parseFloat(offset)
        }
    }
    
    const size = Math.floor(Math.random() * 5 + 1) * 50
    const newOrder: Order = {
      id: nextId.current++,
      price,
      size,
      isBid,
      timestamp: Date.now(),
    }

    addLog(`${isBid ? 'BUY' : 'SELL'} ${size} @ ${price.toFixed(2)}`, 'add')

    // Very simple matching engine simulation
    if (isBid) {
      let remainingSize = size
      const currentAsks = [...asks]

      while (remainingSize > 0 && currentAsks.length > 0 && currentAsks[0].price <= price) {
        const topAsk = currentAsks[0]
        const matchSize = Math.min(remainingSize, topAsk.size)
        
        addLog(`Match ${matchSize} @ ${topAsk.price.toFixed(2)}`, 'match')
        
        remainingSize -= matchSize
        if (topAsk.size === matchSize) {
          currentAsks.shift()
        } else {
          currentAsks[0] = { ...topAsk, size: topAsk.size - matchSize }
        }
      }

      setAsks(currentAsks)
      if (remainingSize > 0) {
        setBids((prev) => [...prev, { ...newOrder, size: remainingSize }].sort((a, b) => a.price - b.price))
      }
    } else {
      let remainingSize = size
      const currentBids = [...bids]

      while (remainingSize > 0 && currentBids.length > 0 && currentBids[currentBids.length - 1].price >= price) {
        const topBid = currentBids[currentBids.length - 1]
        const matchSize = Math.min(remainingSize, topBid.size)
        
        addLog(`Match ${matchSize} @ ${topBid.price.toFixed(2)}`, 'match')
        
        remainingSize -= matchSize
        if (topBid.size === matchSize) {
          currentBids.pop()
        } else {
          currentBids[currentBids.length - 1] = { ...topBid, size: topBid.size - matchSize }
        }
      }

      setBids(currentBids)
      if (remainingSize > 0) {
        setAsks((prev) => [...prev, { ...newOrder, size: remainingSize }].sort((a, b) => a.price - b.price))
      }
    }
  }, [asks, bids])

  return (
    <div className="overflow-hidden border border-border bg-surface shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-3">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Matching Engine State</h3>
        <div className="flex gap-2">
          <button
            onClick={() => submitOrder(true)}
            className="border border-green/20 bg-green/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-green transition-colors hover:bg-green hover:text-white"
          >
            Submit Buy
          </button>
          <button
            onClick={() => submitOrder(false)}
            className="border border-red/20 bg-red/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-red transition-colors hover:bg-red hover:text-white"
          >
            Submit Sell
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_200px] divide-x divide-border">
        <div className="p-4 grid gap-8 grid-cols-2">
          {/* BIDS */}
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted border-b border-border-subtle pb-2">Bids</div>
            <div className="space-y-1">
              <AnimatePresence>
                {[...bids].reverse().slice(0, 5).map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="grid grid-cols-2 font-mono text-sm"
                  >
                    <span className="text-green font-medium">{order.price.toFixed(2)}</span>
                    <span className="text-secondary text-right">{order.size}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* ASKS */}
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted border-b border-border-subtle pb-2">Asks</div>
            <div className="space-y-1">
              <AnimatePresence>
                {asks.slice(0, 5).map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="grid grid-cols-2 font-mono text-sm"
                  >
                    <span className="text-red font-medium">{order.price.toFixed(2)}</span>
                    <span className="text-secondary text-right">{order.size}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* LOGS */}
        <div className="bg-background/30 p-4">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted border-b border-border-subtle pb-2">Execution Log</div>
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  className={`font-mono text-[11px] leading-relaxed ${
                    log.type === 'match' ? 'text-accent' : 'text-secondary'
                  }`}
                >
                  {log.message}
                </motion.div>
              ))}
            </AnimatePresence>
            {logs.length === 0 && (
              <div className="font-mono text-[11px] text-muted">Awaiting order events...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
