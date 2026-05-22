'use client'

import { motion } from 'framer-motion'
import ProximaEdicion from './ProximaEdicion'

interface SeasonHeroProps {
  name: string
  location: string
  temporada: string
  firstDateIso: string
  heroImage: string
  topStamp: string
  hours: {
    label: string
    from: string
    to: string
  }
  description: string[]
}

export default function SeasonHero({
  name,
  location,
  temporada,
  firstDateIso,
  heroImage,
  topStamp,
  hours,
  description,
}: SeasonHeroProps) {
  return (
    <section className="relative pt-[140px] md:pt-[200px] pb-12">
      {/* Radial gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[60vh] opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at center top, rgba(201, 169, 97, 0.18) 0%, rgba(201, 169, 97, 0.04) 35%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Top stamp — corner brackets removed, simple gold hairline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-7 md:mb-10"
        >
          <div className="max-w-[280px] md:max-w-sm border border-gold/50 px-6 py-3 md:px-8 md:py-3.5 text-center">
          <p className="font-sans text-[11px] md:text-xs uppercase tracking-[0.25em] text-gold leading-relaxed">
          {topStamp}
          </p>
          </div>
        </motion.div>

        {/* Title block — brand logo replaces typographic title */}
        <div className="text-center mb-8 md:mb-12">
          {/* h1 wraps the logo image for SEO; visual is the logo PNG */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center mb-5 md:mb-7"
          >
            <span className="sr-only">{name} · {location}</span>
            <img
              src="/images/mercado/mercado-de-la-luna-logo.png"
              alt={`${name} · ${location}`}
              className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[520px] lg:max-w-[620px] h-auto select-none"
              style={{
                filter: 'drop-shadow(0 0 50px rgba(201, 169, 97, 0.2)) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))',
              }}
              draggable={false}
            />
          </motion.h1>

          {/* Location — eyebrow size + rombo decoration kept */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex items-center justify-center gap-4 md:gap-5 mb-3"
          >
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <p className="font-sans uppercase text-gold text-xs md:text-[13px] tracking-[0.3em] whitespace-nowrap">
              {location}
            </p>
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="font-sans uppercase tracking-[0.25em] text-cream/75 text-xs md:text-[13px] mb-5"
          >
            {temporada}
          </motion.p>

          {/* Próxima edición badge */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex justify-center"
          >
            <ProximaEdicion firstDateIso={firstDateIso} />
          </motion.div>
        </div>

        {/* Hero image — corner brackets stay (signature opening moment) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative mb-10 md:mb-14 max-w-5xl mx-auto"
        >
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-gold z-10" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-gold z-10" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-gold z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-gold z-10" />

          <div className="relative aspect-[4/3] overflow-hidden border border-gold/40 shadow-2xl shadow-charcoal/60">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImage}')` }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </div>
        </motion.div>

        {/* Bottom block — premium centered hierarchy: lead description → supporting → horario → CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Lead description — serif display, magazine subtitle feel */}
          <p
            className="font-serif not-italic text-cream leading-tight mb-5 md:mb-6"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 400, letterSpacing: '0.005em' }}
          >
            {description[0]}
          </p>

          {/* Supporting line */}
          {description[1] && (
            <p className="font-sans text-cream/85 text-[17px] md:text-[19px] leading-[1.7] max-w-xl mx-auto mb-8 md:mb-10">
              {description[1]}
            </p>
          )}

          {/* Horario — single elegant line with hairlines */}
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
            <div className="w-8 h-px bg-gold/40" />
            <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-[13px]">
              Viernes y Sábado · {hours.from} — {hours.to}
            </p>
            <div className="w-8 h-px bg-gold/40" />
          </div>

          {/* Primary CTA — lifts the user to packages without scrolling */}
          <a
            href="#paquetes"
            className="group inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-charcoal px-8 py-4 md:px-10 md:py-5 text-sm md:text-base uppercase tracking-[0.2em] font-sans font-medium transition-all duration-500"
          >
            Reservar mi mesa
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
