'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingReserveButtonProps {
  /** Anchor ID of the packages section to scroll to */
  targetId: string
}

export default function FloatingReserveButton({ targetId }: FloatingReserveButtonProps) {
  const [visible, setVisible] = useState(false)
  const [overTarget, setOverTarget] = useState(false)

  useEffect(() => {
    const heroThreshold = () => window.innerHeight * 0.7

    const handleScroll = () => {
      setVisible(window.scrollY > heroThreshold())

      // Hide while packages section is in view (avoid CTA stutter)
      const target = document.getElementById(targetId)
      if (target) {
        const rect = target.getBoundingClientRect()
        const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4
        setOverTarget(inView)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [targetId])

  const handleClick = () => {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const show = visible && !overTarget

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={handleClick}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 group bg-gold text-charcoal shadow-2xl shadow-gold/30 px-5 py-3.5 sm:px-7 sm:py-4 flex items-center gap-3 font-sans text-xs sm:text-sm uppercase tracking-[0.18em] font-medium hover:bg-gold-light transition-colors duration-300"
          aria-label="Ir a paquetes para reservar"
        >
          {/* Subtle pulse halo */}
          <span className="absolute inset-0 border border-gold opacity-0 group-hover:opacity-50 animate-ping pointer-events-none" />
          <span className="relative">Reservar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="relative w-4 h-4"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
