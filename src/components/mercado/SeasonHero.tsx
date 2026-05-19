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
  const [firstWord, ...restWords] = name.split(/\s+/)
  const restOfName = restWords.join(' ')

  return (
    <section className="relative pt-[150px] md:pt-[210px] pb-16">
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
          className="flex justify-center mb-10 md:mb-14"
        >
          <div className="max-w-[280px] md:max-w-sm border border-gold/50 px-6 py-3 md:px-8 md:py-3.5 text-center">
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-gold leading-relaxed">
              {topStamp}
            </p>
          </div>
        </motion.div>

        {/* Title block — signature treatment kept */}
        <div className="text-center mb-10 md:mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif not-italic text-gold uppercase leading-[0.95] mb-7 md:mb-9"
            style={{
              fontSize: 'clamp(2.75rem, 9vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '0.015em',
              textShadow: '0 0 30px rgba(201, 169, 97, 0.15)',
            }}
          >
            {firstWord}
            {restOfName && (
              <>
                <br />
                {restOfName}
              </>
            )}
          </motion.h1>

          {/* Location — eyebrow size + rombo decoration kept */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex items-center justify-center gap-4 md:gap-5 mb-4"
          >
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <p className="font-sans uppercase text-gold text-[11px] md:text-xs tracking-[0.3em] whitespace-nowrap">
              {location}
            </p>
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="font-sans uppercase tracking-[0.25em] text-cream/65 text-[11px] md:text-xs mb-6"
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
          className="relative mb-14 md:mb-20 max-w-5xl mx-auto"
        >
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-gold z-10" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-gold z-10" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-gold z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-gold z-10" />

          <div className="relative aspect-[16/9] overflow-hidden border border-gold/40 shadow-2xl shadow-charcoal/60">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImage}')` }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </div>
        </motion.div>

        {/* Description + Horario — bigger sans body, simple bordered hours box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-stretch max-w-5xl mx-auto"
        >
          <div className="flex flex-col justify-center space-y-5 md:space-y-6">
            {description.map((para, i) => (
              <p
                key={i}
                className={`font-sans leading-[1.7] text-base md:text-[17px] ${
                  i === 1 ? 'text-cream font-medium' : 'text-cream/90'
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Hours box — corner brackets removed, simple border */}
          <div className="border border-gold/40 px-10 py-7 md:px-12 md:py-8 text-center min-w-[200px] md:min-w-[260px] flex flex-col justify-center">
            <p className="font-sans uppercase tracking-[0.3em] text-gold text-[10px] md:text-[11px] mb-4">
              {hours.label}
            </p>
            <p
              className="font-serif not-italic text-gold font-bold leading-none"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', letterSpacing: '0.01em' }}
            >
              {hours.from}
            </p>
            <div className="my-2.5 flex items-center justify-center">
              <div className="w-8 h-px bg-gold/50" />
            </div>
            <p
              className="font-serif not-italic text-gold font-bold leading-none"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', letterSpacing: '0.01em' }}
            >
              {hours.to}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
