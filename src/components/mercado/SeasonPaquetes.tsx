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
    <section id="paquetes" className="container-custom py-16 md:py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 md:mb-16"
      >
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
          Inversión para Expositores
        </h2>
        <p className="font-serif italic text-cream/75 text-base md:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
          Cada fecha equivale a un día — viernes o sábado de mercado.
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
            <div className="p-8 md:p-9 flex flex-col flex-1">
              {pkg.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-charcoal px-4 py-1 text-[10px] uppercase tracking-[0.25em] font-sans font-medium whitespace-nowrap">
                  Recomendado
                </div>
              )}

              {/* Title block */}
              <div className="text-center mb-6">
                <h3
                  className="font-serif not-italic text-cream leading-tight"
                  style={{
                    fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                    fontWeight: 700,
                    letterSpacing: '0.005em',
                  }}
                >
                  {pkg.name}
                </h3>
                {pkg.subtitle && (
                  <p className="font-sans uppercase tracking-[0.25em] text-gold text-[10px] md:text-[11px] mt-2.5">
                    {pkg.subtitle}
                  </p>
                )}
              </div>

              {/* Simple hairline divider */}
              <div className="h-px bg-cream/15 mb-6" />

              {/* Price */}
              <div className="text-center mb-6">
                <p
                  className="font-serif not-italic text-gold font-bold leading-none mb-2"
                  style={{ fontSize: 'clamp(2.75rem, 5vw, 3.75rem)', letterSpacing: '0.005em' }}
                >
                  ${pkg.price.toLocaleString('es-MX')}
                </p>
                <p className="font-sans uppercase tracking-[0.2em] text-cream/70 text-[11px] md:text-xs">
                  {pkg.priceLabel}
                </p>
                {pkg.subtext && (
                  <p className="font-serif italic text-cream/70 text-sm md:text-base mt-3">
                    {pkg.subtext}
                  </p>
                )}
              </div>

              {pkg.benefits && pkg.benefits.length > 0 && (
                <div className="mb-7 pt-6 border-t border-cream/15">
                  <ul className="space-y-3">
                    {pkg.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-cream/95 font-sans leading-[1.6] text-[15px] md:text-base"
                      >
                        <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
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
                className={`w-full py-4 text-xs md:text-sm uppercase tracking-[0.2em] font-sans font-medium transition-all duration-500 mt-2 ${
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
