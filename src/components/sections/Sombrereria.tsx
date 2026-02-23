'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Sombrereria() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="sombrereria" ref={sectionRef} className="section bg-cream">
      <div className="container-custom">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Sombrería</h2>
          <div className="divider" />

          <motion.div
            className="mt-12 py-16 px-8 border border-gold/20 rounded-sm max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-gold uppercase tracking-[0.3em] text-sm font-light mb-4">
              Próximamente
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/30" />
              <div className="w-10 h-px bg-gold/30" />
            </div>
            <p className="text-charcoal-50 text-base max-w-md mx-auto leading-relaxed font-light">
              Estamos preparando algo especial para ti. Muy pronto podrás descubrir nuestra colección exclusiva.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
