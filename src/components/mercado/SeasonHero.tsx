'use client'

import { motion } from 'framer-motion'

interface SeasonHeroProps {
  name: string
  location: string
  heroImageDesktop: string
  heroImageMobile: string
  heroAlt: string
}

export default function SeasonHero({
  name,
  location,
  heroImageDesktop,
  heroImageMobile,
  heroAlt,
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
        {/* Campaign poster hero — full creative, responsive art-direction (16:9 desktop / 9:16 mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mb-10 md:mb-14 mx-auto max-w-[420px] md:max-w-5xl"
        >
          {/* Signature gold corner brackets */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-gold z-10" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-gold z-10" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-gold z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-gold z-10" />

          {/* h1 wraps the campaign creative for SEO; visual is the poster */}
          <h1 className="m-0">
            <span className="sr-only">{name} · {location} · Mercado Vacacional</span>
            <picture>
              <source media="(min-width: 768px)" srcSet={heroImageDesktop} />
              <img
                src={heroImageMobile}
                alt={heroAlt}
                className="block w-full h-auto select-none border border-gold/40 shadow-2xl shadow-charcoal/60"
                draggable={false}
              />
            </picture>
          </h1>
        </motion.div>

        {/* Primary CTA — poster isn't clickable, this lifts to packages */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
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
