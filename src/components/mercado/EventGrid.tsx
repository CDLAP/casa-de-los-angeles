'use client'

import EventCard from './EventCard'

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

interface EventGridProps {
  events: MercadoEvent[]
  whatsapp: string
  lastSpotsThreshold: number
}

export default function EventGrid({ events, whatsapp, lastSpotsThreshold }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="container-custom py-20">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-serif italic text-2xl text-gold mb-4">Próximamente</p>
          <p className="font-sans text-cream/60 leading-relaxed">
            Estamos preparando las próximas ediciones del Mercado de los Ángeles. Síguenos en Instagram para enterarte primero.
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className="container-custom pb-24 md:pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            whatsapp={whatsapp}
            lastSpotsThreshold={lastSpotsThreshold}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
