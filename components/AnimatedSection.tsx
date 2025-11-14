'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
}

export default function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  )
}