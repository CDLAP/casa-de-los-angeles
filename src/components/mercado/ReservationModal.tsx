'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface EventDate {
  id: string
  label: string
}

interface MercadoEvent {
  id: string
  name: string
  datesDisplay: string
  hours: string
  price: number
  currency: string
  dates: EventDate[]
}

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  event: MercadoEvent
  whatsapp: string
}

export default function ReservationModal({ isOpen, onClose, event, whatsapp }: ReservationModalProps) {
  const [marca, setMarca] = useState('')
  const [instagram, setInstagram] = useState('')
  const [productos, setProductos] = useState('')
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const hasMultipleDates = event.dates.length > 1

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setMarca('')
      setInstagram('')
      setProductos('')
      // Auto-select all dates when single-date event
      setSelectedDates(hasMultipleDates ? [] : event.dates.map(d => d.id))
      setSubmitting(false)
    }
  }, [isOpen, hasMultipleDates, event.dates])

  // ESC to close
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const toggleDate = (dateId: string) => {
    setSelectedDates(prev =>
      prev.includes(dateId)
        ? prev.filter(id => id !== dateId)
        : [...prev, dateId]
    )
  }

  const isValid =
    marca.trim().length > 0 &&
    instagram.trim().length > 0 &&
    productos.trim().length > 0 &&
    selectedDates.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || submitting) return

    setSubmitting(true)

    const selectedLabels = event.dates
      .filter(d => selectedDates.includes(d.id))
      .map(d => d.label)
      .join(', ')

    const message =
      `Hola, quiero reservar mi espacio para ${event.name}.\n\n` +
      `Marca: ${marca.trim()}\n` +
      `Instagram: ${instagram.trim()}\n` +
      `Fecha(s): ${selectedLabels}\n` +
      `Productos que vendo: ${productos.trim()}`

    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    // Close after small delay so user sees the action
    setTimeout(() => {
      onClose()
    }, 400)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-charcoal/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#1A3A2E] border border-gold/30 shadow-2xl"
          >
            {/* Decorative top accent */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-cream/60 hover:text-gold transition-colors duration-300 z-10"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="mb-7">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">Reservar mi espacio</p>
                <h2 className="font-serif italic text-2xl md:text-3xl text-cream leading-tight">
                  {event.name}
                </h2>
                <p className="font-sans text-sm text-cream/60 mt-2">
                  {event.datesDisplay} · {event.hours}
                </p>
              </div>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 mb-7">
                <div className="flex-1 h-px bg-gold/20" />
                <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
                <div className="flex-1 h-px bg-gold/20" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Marca */}
                <div>
                  <label htmlFor="marca" className="block text-[10px] uppercase tracking-[0.25em] text-cream/70 mb-2">
                    Marca
                  </label>
                  <input
                    id="marca"
                    type="text"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    placeholder="Nombre de tu marca"
                    className="w-full bg-transparent border-b border-gold/30 focus:border-gold py-2.5 text-cream placeholder:text-cream/30 font-sans outline-none transition-colors"
                    required
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label htmlFor="instagram" className="block text-[10px] uppercase tracking-[0.25em] text-cream/70 mb-2">
                    Instagram
                  </label>
                  <input
                    id="instagram"
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@tumarca"
                    className="w-full bg-transparent border-b border-gold/30 focus:border-gold py-2.5 text-cream placeholder:text-cream/30 font-sans outline-none transition-colors"
                    required
                  />
                </div>

                {/* Productos */}
                <div>
                  <label htmlFor="productos" className="block text-[10px] uppercase tracking-[0.25em] text-cream/70 mb-2">
                    Productos que vendo
                  </label>
                  <textarea
                    id="productos"
                    value={productos}
                    onChange={(e) => setProductos(e.target.value)}
                    placeholder="Joyería de autor, cerámica, café especial…"
                    rows={3}
                    className="w-full bg-transparent border border-gold/30 focus:border-gold p-3 text-cream placeholder:text-cream/30 font-sans outline-none transition-colors resize-none"
                    required
                  />
                </div>

                {/* Date selection - only show if multiple dates */}
                {hasMultipleDates && (
                  <div>
                    <p className="block text-[10px] uppercase tracking-[0.25em] text-cream/70 mb-3">
                      Fecha(s) que te interesan
                    </p>
                    <div className="space-y-2">
                      {event.dates.map((date) => {
                        const checked = selectedDates.includes(date.id)
                        return (
                          <button
                            key={date.id}
                            type="button"
                            onClick={() => toggleDate(date.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 border transition-all duration-300 text-left ${
                              checked
                                ? 'border-gold bg-gold/10'
                                : 'border-gold/20 hover:border-gold/50'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                                checked ? 'border-gold bg-gold' : 'border-gold/50'
                              }`}
                            >
                              {checked && (
                                <svg className="w-3 h-3 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </span>
                            <span className="font-sans text-sm text-cream">{date.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Price summary */}
                <div className="border-t border-gold/20 pt-5 flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-cream/70">Inversión por espacio</span>
                  <span className="font-serif text-2xl text-gold">
                    ${event.price.toLocaleString('es-MX')} <span className="text-xs text-cream/60 font-sans not-italic">{event.currency}</span>
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className={`w-full mt-2 py-4 text-sm uppercase tracking-[0.25em] font-sans font-medium transition-all duration-500 ${
                    isValid && !submitting
                      ? 'bg-gold text-charcoal hover:bg-gold-light cursor-pointer'
                      : 'bg-gold/20 text-cream/40 cursor-not-allowed'
                  }`}
                >
                  {submitting ? 'Abriendo WhatsApp…' : 'Enviar reservación'}
                </button>

                <p className="text-[11px] text-cream/40 text-center font-sans leading-relaxed mt-3">
                  Al enviar se abrirá WhatsApp con tu mensaje listo. Te enviaremos los datos de pago manualmente.
                </p>
              </form>
            </div>

            {/* Decorative bottom accent */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
