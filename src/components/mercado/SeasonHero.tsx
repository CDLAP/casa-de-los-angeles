'use client'

import { motion } from 'framer-motion'

interface SeasonHeroProps {
  name: string
  location: string
  temporada: string
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
  heroImage,
  topStamp,
  hours,
  description,
}: SeasonHeroProps) {
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
        {/* Top stamp */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-10 md:mb-14"
        >
          <div className="relative max-w-[280px] md:max-w-sm">
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-gold" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-gold" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-gold" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-gold" />
            <div className="border border-gold/60 px-6 py-3 md:px-8 md:py-4 text-center">
              <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold leading-relaxed">
                {topStamp}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Title block */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif not-italic text-gold uppercase leading-[0.95] mb-6 md:mb-8"
            style={{
              fontSize: 'clamp(2.75rem, 9vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '0.02em',
              textShadow: '0 0 30px rgba(201, 169, 97, 0.15)',
            }}
          >
            {name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex items-center justify-center gap-4 md:gap-5 mb-5"
          >
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-2 h-2 bg-gold rotate-45" />
            <p className="font-serif not-italic uppercase text-gold text-sm md:text-base tracking-[0.3em] whitespace-nowrap">
              {location}
            </p>
            <div className="w-2 h-2 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="font-sans uppercase tracking-[0.35em] text-cream/70 text-xs md:text-sm"
          >
            {temporada}
          </motion.p>
        </div>

        {/* Hero image — portrait orientation, no filter (photo is already nocturnal) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative mb-12 md:mb-16 max-w-md md:max-w-lg mx-auto"
        >
          {/* Gold corner ornaments */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-gold z-10" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-gold z-10" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-gold z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-gold z-10" />

          <div className="relative aspect-[2/3] overflow-hidden border border-gold/40 shadow-2xl shadow-charcoal/60">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImage}')` }}
            />
            {/* Very subtle bottom vignette to blend with page bg */}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </div>
        </motion.div>

        {/* Description + Horario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-stretch max-w-5xl mx-auto"
        >
          <div className="flex flex-col justify-center space-y-4 md:space-y-5">
            {description.map((para, i) => (
              <p
                key={i}
                className={`font-sans text-cream/85 leading-relaxed text-[15px] md:text-base ${
                  i === 1 ? 'font-medium text-cream' : ''
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-gold" />
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-gold" />
            <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-gold" />
            <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-gold" />

            <div className="border border-gold/50 px-8 py-6 md:px-12 md:py-8 text-center min-w-[200px] md:min-w-[260px] h-full flex flex-col justify-center">
              <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm mb-4">
                {hours.label}
              </p>
              <p className="font-serif not-italic text-gold font-bold text-3xl md:text-4xl leading-none">
                {hours.from}
              </p>
              <div className="my-2 flex items-center justify-center">
                <div className="w-8 h-px bg-gold/60" />
              </div>
              <p className="font-serif not-italic text-gold font-bold text-3xl md:text-4xl leading-none">
                {hours.to}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
