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
    <section className="container-custom py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 md:mb-16"
      >
        {/* Section transition rombo — kept (signature) */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <div className="w-12 md:w-20 h-px bg-gold/50" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <div className="w-12 md:w-20 h-px bg-gold/50" />
        </div>
        <h2
          className="font-serif not-italic text-cream leading-tight"
          style={{
            fontSize: 'clamp(1.875rem, 4.5vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '0.005em',
          }}
        >
          Fechas de {eventName}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12 max-w-6xl mx-auto"
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
              className="font-serif not-italic text-gold font-bold leading-none mb-2.5"
              style={{ fontSize: 'clamp(1.625rem, 3vw, 2.125rem)', letterSpacing: '0.005em' }}
            >
              {weekend.label}
            </p>
            <p className="font-sans uppercase tracking-[0.25em] text-cream/70 text-[10px] md:text-[11px]">
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
        className="font-sans text-center text-cream/85 text-base md:text-[17px] leading-[1.7] mb-5 max-w-2xl mx-auto"
      >
        {note}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="font-serif italic text-center text-gold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
      >
        {tagline}
      </motion.p>
    </section>
  )
}
