'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function AnimatedPageWrapper({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll()

  // BG: cream → cream → blue
  const bg = useTransform(scrollYProgress, [0, 0.6, 0.8], ['#FFFCF6', '#FFFCF6', '#0C2058'])

  // Lines move LEFT (x) and UP (y)
  const lineX = useTransform(scrollYProgress, [0, 0.5, 0.8], ['0%', '0%', '-40%'])
  const lineY = useTransform(scrollYProgress, [0, 0.5, 0.8], ['0%', '0%', '-25%'])

  // Lines fade out when the blue BG fades in
  const lineOpacity = useTransform(scrollYProgress, [0, 0.6, 0.8], [1, 0.5, 0])

  // Text color changes dark → light
  const textColor = useTransform(scrollYProgress, [0, 0.6, 0.8], ['#191919', '#191919', '#FFFCF6'])

  return (
    <motion.div
      style={{ backgroundColor: bg, color: textColor }}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Angled color bands */}
      <motion.div
        style={{ x: lineX, y: lineY, opacity: lineOpacity }}
        className="pointer-events-none absolute bottom-0 right-[-1000px] w-[2100px] h-[1700px] rotate-[-40deg] flex flex-col"
      >
        <div className="h-[10%] w-full bg-blue/70 mb-24" />
        <div className="h-[10%] w-full bg-red/70 mb-24" />
        <div className="h-[10%] w-full bg-yellow/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-inherit mb-42">{children}</div>
    </motion.div>
  )
}
