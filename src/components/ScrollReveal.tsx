'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function ScrollReveal({ children, offsetMultiplier = 0 }: { children: ReactNode, offsetMultiplier?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 + (offsetMultiplier * 10) }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
