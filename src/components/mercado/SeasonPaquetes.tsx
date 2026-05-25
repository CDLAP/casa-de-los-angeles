'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import ReservationModal from './ReservationModal'

interface Pkg {
  id: string
  name: string
  subtitle: string | null
  price: number
  priceOverride: string | null
  priceLabel: string
  subtext: string | null
  fechasIncluded: number
  highlighted: boolean
  benefits: string[] | null
}

interface SeasonWeekend {
  id: string
  label: string
  month: string
  days: { id: string; label: string }[]
}

interface SeasonPaquetesProps {
  eventName: string
  packages: Pkg[]
  weekends: SeasonWeekend[]
  whatsapp: string
}

export default function SeasonPaquetes({ eventName, packages, weekends, whatsapp }: SeasonPaquetesProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<Pkg | null>(null)

  const handleReserve = (pkg: Pkg) => {
    setSelectedPackage(pkg)
    setModalOpen(true)
  }

  return (
    <section id="paquetes" className="container-custom py-10 md:py-16 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 md:mb-12"
      >
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
          Elige tu paquete
        </h2>
        <p className="font-serif italic text-cream/85 text-[17px] md:text-xl mt-4 max-w-xl mx-auto leading-relaxed">
          Tarifa según tu tipo de participación.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative flex flex-col transition-all duration-500 ${
              pkg.highlighted
                ? 'bg-gradient-to-br from-[#3F1F26] to-[#1A1428] border-2 border-gold shadow-2xl shadow-gold/10'
                : 'bg-[#0F1A2E]/50 border border-cream/15 hover:border-gold/50'
            }`}
          >
            <div className="p-7 md:p-8 flex flex-col flex-1">
              {pkg.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-charcoal px-5 py-1.5 text-xs uppercase tracking-[0.22em] font-sans font-medium whitespace-nowrap">
                  Recomendado
                </div>
              )}

              {/* Title block */}
              <div className="text-center mb-5">
                <h3
                  className="not-italic text-cream leading-tight"
                  style={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontSize: 'clamp(1.5rem, 2.7vw, 1.875rem)',
                    fontWeight: 700,
                    letterSpacing: '0.005em',
                  }}
                >
                  {pkg.name}
                </h3>
                {pkg.subtitle && (
                  <p className="font-sans uppercase tracking-[0.25em] text-gold text-[11px] md:text-xs mt-2.5">
                    {pkg.subtitle}
                  </p>
                )}
              </div>

              {/* Simple hairline divider */}
              <div className="h-px bg-cream/15 mb-5" />

              {/* Price */}
              <div className="text-center mb-5">
                {pkg.priceOverride ? (
                  <p
                    className="font-serif italic text-gold leading-tight mb-2"
                    style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)', letterSpacing: '0.005em', fontWeight: 700 }}
                  >
                    {pkg.priceOverride}
                  </p>
                ) : (
                  <p
                    className="font-serif not-italic text-gold font-bold leading-none mb-2"
                    style={{ fontSize: 'clamp(2.5rem, 4.6vw, 3.5rem)', letterSpacing: '0.005em' }}
                  >
                    ${pkg.price.toLocaleString('es-MX')}
                    <span
                      className="font-sans text-cream/55 align-baseline ml-1.5"
                      style={{ fontSize: '0.32em', letterSpacing: '0.15em', fontWeight: 500 }}
                    >
                      MXN
                    </span>
                  </p>
                )}
                <p className="font-sans uppercase tracking-[0.2em] text-cream/80 text-xs md:text-[13px]">
                  {pkg.priceLabel}
                </p>
                {pkg.subtext && (
                  <p className="font-serif italic text-cream/80 text-base md:text-lg mt-2.5">
                    {pkg.subtext}
                  </p>
                )}
              </div>

              {pkg.benefits && pkg.benefits.length > 0 && (
                <div className="mb-6 pt-5 border-t border-cream/15">
                  <ul className="space-y-2.5">
                    {pkg.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-cream font-sans leading-[1.55] text-[15px] md:text-base"
                      >
                        <Check className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex-1" />

              {/* CTA — primary if highlighted, secondary otherwise */}
              <button
                onClick={() => handleReserve(pkg)}
                className={`w-full py-4 text-sm md:text-base uppercase tracking-[0.2em] font-sans font-medium transition-all duration-500 mt-2 ${
                  pkg.highlighted
                    ? 'bg-gold text-charcoal hover:bg-gold-light'
                    : 'border border-cream/40 text-cream hover:border-cream hover:bg-cream/5'
                }`}
              >
                Reservar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPackage && (
        <ReservationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          eventName={eventName}
          pkg={selectedPackage}
          weekends={weekends}
          whatsapp={whatsapp}
        />
      )}
    </section>
  )
}
