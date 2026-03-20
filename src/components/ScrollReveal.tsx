'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

export default function ScrollReveal({ children, offsetMultiplier = 1 }: { children: ReactNode, offsetMultiplier?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.5 1"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [100 * offsetMultiplier, 0])

  return (
    <motion.div ref={ref} style={{ scale, opacity, y }} className="w-full h-full will-change-transform relative z-10">
      {children}
    </motion.div>
  )
}
