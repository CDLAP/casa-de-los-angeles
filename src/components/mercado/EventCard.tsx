'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, Calendar, Check } from 'lucide-react'
import StatusBadge from './StatusBadge'
import ReservationModal from './ReservationModal'

interface EventDate {
  id: string
  label: string
}

interface MercadoEvent {
  id: string
  name: string
  image?: string
  datesDisplay: string
  hours: string
  theme: string
  includes: string[]
  price: number
  currency: string
  totalSpots: number
  availableSpots: number
  promotion: string | null
  specialEdition: boolean
  soldOut: boolean
  ctaLabel: string | null
  dates: EventDate[]
}

interface EventCardProps {
  event: MercadoEvent
  whatsapp: string
  lastSpotsThreshold: number
  index: number
}

export default function EventCard({ event, whatsapp, lastSpotsThreshold, index }: EventCardProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  const isSoldOut = event.soldOut || event.availableSpots === 0
  const isLastSpots = !isSoldOut && event.availableSpots > 0 && event.availableSpots <= lastSpotsThreshold

  let badge: 'sold-out' | 'last-spots' | 'special-edition' | null = null
  if (isSoldOut) badge = 'sold-out'
  else if (event.specialEdition) badge = 'special-edition'
  else if (isLastSpots) badge = 'last-spots'

  const ctaLabel = event.ctaLabel || 'Reservar mi lugar'

  return (
    <>
      <motion.article
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group relative flex flex-col bg-[#22433A]/60 border border-gold/15 hover:border-gold/40 transition-all duration-700"
      >
        {/* Decorative top accent */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        {/* Badge top-right */}
        {badge && (
          <div className="absolute top-5 right-5 z-10">
            <StatusBadge variant={badge} />
          </div>
        )}

        {/* Promotion top-left */}
        {event.promotion && !isSoldOut && (
          <div className="absolute top-5 left-5 z-10 bg-bistro-dark/90 backdrop-blur-sm border border-gold/40 px-3 py-1.5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans">
              {event.promotion}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col p-7 md:p-9 pt-16 md:pt-16">
          {/* Date eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-sans">
              {event.datesDisplay}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-serif italic text-cream text-center leading-[1.1] mb-4 ${
              isSoldOut ? 'opacity-60' : ''
            }`}
            style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)' }}
          >
            {event.name}
          </h3>

          {/* Hours */}
          <div className="flex items-center justify-center gap-2 mb-7">
            <Clock className="w-3.5 h-3.5 text-cream/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-cream/70 font-sans">
              {event.hours}
            </span>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 mb-7">
            <div className="flex-1 h-px bg-gold/25" />
            <div className="w-1.5 h-1.5 bg-gold/60 rotate-45" />
            <div className="flex-1 h-px bg-gold/25" />
          </div>

          {/* Theme */}
          <p className="text-cream/75 font-serif italic text-[15px] md:text-base leading-relaxed text-center mb-7">
            {event.theme}
          </p>

          {/* Includes */}
          {event.includes.length > 0 && (
            <div className="mb-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80 text-center mb-4">Incluye</p>
              <ul className="space-y-2">
                {event.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-cream/75 font-sans leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-gold/70 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spacer pushes price + CTA to bottom */}
          <div className="flex-1 min-h-[12px]" />

          {/* Decorative divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gold/25" />
            <div className="w-1.5 h-1.5 bg-gold/60 rotate-45" />
            <div className="flex-1 h-px bg-gold/25" />
          </div>

          {/* Price + spots */}
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-cream/55 mb-1">Por espacio</p>
              <p className="font-serif text-3xl text-gold leading-none">
                ${event.price.toLocaleString('es-MX')}
                <span className="text-xs text-cream/55 font-sans ml-2 not-italic">{event.currency}</span>
              </p>
            </div>
            {!isSoldOut && (
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.25em] text-cream/55 mb-1">Cupos</p>
                <p className={`font-serif text-lg leading-none ${isLastSpots ? 'text-gold' : 'text-cream/80'}`}>
                  {event.availableSpots} <span className="text-xs text-cream/40 font-sans not-italic">disponibles</span>
                </p>
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={() => !isSoldOut && setModalOpen(true)}
            disabled={isSoldOut}
            className={`w-full py-4 text-sm uppercase tracking-[0.25em] font-sans font-medium transition-all duration-500 ${
              isSoldOut
                ? 'bg-charcoal/40 text-cream/30 cursor-not-allowed border border-cream/10'
                : 'border border-gold text-gold hover:bg-gold hover:text-charcoal cursor-pointer'
            }`}
          >
            {isSoldOut ? 'Agotado' : ctaLabel}
          </button>
        </div>

        {/* Decorative bottom accent */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </motion.article>

      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        event={event}
        whatsapp={whatsapp}
      />
    </>
  )
}
