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
  image: string
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

  // Badge priority: sold-out > special-edition > last-spots
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
        className="group relative flex flex-col bg-[#22433A]/40 border border-gold/15 hover:border-gold/40 transition-all duration-700"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 ${
              isSoldOut ? 'opacity-50 grayscale' : ''
            }`}
            style={{ backgroundImage: `url('${event.image}')` }}
          />
          {/* Gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />

          {/* Badge */}
          {badge && (
            <div className="absolute top-4 right-4">
              <StatusBadge variant={badge} />
            </div>
          )}

          {/* Promotion ribbon (if present) */}
          {event.promotion && !isSoldOut && (
            <div className="absolute top-4 left-4 bg-bistro-dark/90 backdrop-blur-sm border border-gold/40 px-3 py-1.5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans">
                {event.promotion}
              </p>
            </div>
          )}

          {/* Bottom overlay with name */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
            <h3 className="font-serif italic text-2xl md:text-3xl text-cream leading-tight drop-shadow-lg">
              {event.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6 md:p-7">
          {/* Dates + Hours */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5 pb-5 border-b border-gold/15">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-cream/80 font-sans">
                {event.datesDisplay}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-cream/80 font-sans">
                {event.hours}
              </span>
            </div>
          </div>

          {/* Theme */}
          <p className="text-cream/70 font-sans text-[15px] leading-relaxed mb-6">
            {event.theme}
          </p>

          {/* Includes */}
          {event.includes.length > 0 && (
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-3">Incluye</p>
              <ul className="space-y-1.5">
                {event.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-cream/75 font-sans">
                    <Check className="w-3.5 h-3.5 text-gold/70 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price + spots */}
          <div className="flex items-baseline justify-between mb-5 pt-5 border-t border-gold/15">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-1">Por espacio</p>
              <p className="font-serif text-3xl text-gold leading-none">
                ${event.price.toLocaleString('es-MX')}
                <span className="text-xs text-cream/60 font-sans ml-2 not-italic">{event.currency}</span>
              </p>
            </div>
            {!isSoldOut && (
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.25em] text-cream/60 mb-1">Cupos</p>
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
