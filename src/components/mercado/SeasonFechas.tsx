'use client'

import { motion } from 'framer-motion'

interface SeasonDate {
  id: string
  label: string
  month: string
}

interface SeasonFechasProps {
  eventName: string
  dates: SeasonDate[]
  note: string
  tagline: string
}

export default function SeasonFechas({ eventName, dates, note, tagline }: SeasonFechasProps) {
  return (
    <section className="container-custom py-16 md:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 md:w-20 h-px bg-gold/50" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <div className="w-12 md:w-20 h-px bg-gold/50" />
        </div>
        <h2 className="font-serif not-italic uppercase text-gold leading-tight"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          Fechas de {eventName}
        </h2>
      </motion.div>

      {/* Dates grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-10 max-w-6xl mx-auto"
      >
        {dates.map((date, i) => (
          <motion.div
            key={date.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
            className="relative text-center py-6 md:py-7 px-3 border border-gold/25 hover:border-gold/50 transition-colors duration-500 bg-[#22433A]/30"
          >
            <p className="font-serif not-italic text-gold font-bold leading-none mb-2"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              {date.label}
            </p>
            <p className="font-sans uppercase tracking-[0.25em] text-cream/65 text-[10px] md:text-xs">
              de {date.month}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="font-sans text-center text-cream/70 text-sm md:text-base mb-5"
      >
        {note}
      </motion.p>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="font-serif italic text-center text-cream/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
      >
        {tagline}
      </motion.p>
    </section>
  )
}
