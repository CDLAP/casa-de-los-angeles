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
    <section className="container-custom py-16 md:py-24">
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
        <h2
          className="font-serif not-italic uppercase text-gold leading-tight"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          Inversión para Expositores
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative flex flex-col ${
              pkg.highlighted
                ? 'bg-gradient-to-br from-[#3F1F26] to-[#1A1428] border-2 border-gold shadow-2xl shadow-gold/10'
                : 'bg-[#0F1A2E]/50 border border-gold/30'
            } transition-all duration-500 hover:border-gold`}
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-gold" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-gold" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-gold" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-gold" />

            <div className="p-7 md:p-8 flex flex-col flex-1">
              {pkg.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-charcoal px-4 py-1 text-[10px] uppercase tracking-[0.25em] font-sans font-medium whitespace-nowrap">
                  Recomendado
                </div>
              )}

              <div className="text-center mb-5">
                <h3
                  className="font-serif not-italic uppercase text-gold font-bold leading-tight"
                  style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', letterSpacing: '0.05em' }}
                >
                  {pkg.name}
                </h3>
                {pkg.subtitle && (
                  <p className="font-sans uppercase tracking-[0.3em] text-gold/80 text-xs mt-2">
                    {pkg.subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mb-5">
                <div className="flex-1 h-px bg-gold/25" />
                <div className="w-1 h-1 bg-gold/60 rotate-45" />
                <div className="flex-1 h-px bg-gold/25" />
              </div>

              <div className="text-center mb-5">
                <p
                  className="font-serif not-italic text-gold font-bold leading-none mb-2"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
                >
                  ${pkg.price.toLocaleString('es-MX')}
                </p>
                <p className="font-sans uppercase tracking-[0.2em] text-cream/70 text-xs">
                  {pkg.priceLabel}
                </p>
                {pkg.subtext && (
                  <p className="font-sans text-cream/55 text-xs mt-2 italic">
                    {pkg.subtext}
                  </p>
                )}
              </div>

              {pkg.benefits && pkg.benefits.length > 0 && (
                <div className="mb-6 pt-5 border-t border-gold/25">
                  <ul className="space-y-2.5">
                    {pkg.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-cream/80 font-sans leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-gold mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex-1" />

              <button
                onClick={() => handleReserve(pkg)}
                className={`w-full py-3.5 text-sm uppercase tracking-[0.25em] font-sans font-medium transition-all duration-500 mt-2 ${
                  pkg.highlighted
                    ? 'bg-gold text-charcoal hover:bg-gold-light'
                    : 'border border-gold text-gold hover:bg-gold hover:text-charcoal'
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
