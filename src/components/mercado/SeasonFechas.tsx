'use client'

import { motion } from 'framer-motion'

interface SeasonWeekend {
  id: string
  label: string
  month: string
  days: { id: string; label: string }[]
}

interface SeasonFechasProps {
  eventName: string
  weekends: SeasonWeekend[]
  note: string
  tagline: string
}

export default function SeasonFechas({ eventName, weekends, note, tagline }: SeasonFechasProps) {
  return (
    <section className="container-custom py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 md:mb-12"
      >
        {/* Section transition rombo — kept (signature) */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <div className="w-12 md:w-20 h-px bg-gold/50" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <div className="w-12 md:w-20 h-px bg-gold/50" />
        </div>
        <h2
          className="not-italic text-cream leading-tight"
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontSize: 'clamp(2rem, 4.8vw, 3.25rem)',
            fontWeight: 700,
            letterSpacing: '0.005em',
          }}
        >
          Fechas de {eventName}
        </h2>
        <p className="font-serif italic text-cream/85 text-[17px] md:text-xl mt-4 max-w-xl mx-auto leading-relaxed">
          Cupo limitado: 30 expositores por fecha.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-8 max-w-6xl mx-auto"
      >
        {weekends.map((weekend, i) => (
          <motion.div
            key={weekend.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
            className="relative text-center py-6 md:py-7 px-3 border border-gold/25 hover:border-gold/50 transition-colors duration-500 bg-[#0F1A2E]/40"
          >
            <p
              className="not-italic text-gold font-bold leading-none mb-2.5"
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)',
                letterSpacing: '0.005em',
              }}
            >
              {weekend.label}
            </p>
            <p className="font-sans uppercase tracking-[0.25em] text-cream/80 text-[11px] md:text-xs">
              de {weekend.month}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="font-sans text-center text-cream/95 text-[17px] md:text-[19px] leading-[1.75] max-w-2xl mx-auto"
      >
        {note}
      </motion.p>
    </section>
  )
}
