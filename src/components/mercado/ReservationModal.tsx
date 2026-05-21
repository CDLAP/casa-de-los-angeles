'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Pkg {
  id: string
  name: string
  subtitle: string | null
  price: number
  priceLabel: string
  subtext: string | null
  fechasIncluded: number
}

interface SeasonWeekend {
  id: string
  label: string
  month: string
  days: { id: string; label: string }[]
}

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  eventName: string
  pkg: Pkg
  weekends: SeasonWeekend[]
  whatsapp: string
}

export default function ReservationModal({
  isOpen,
  onClose,
  eventName,
  pkg,
  weekends,
  whatsapp,
}: ReservationModalProps) {
  const [mounted, setMounted] = useState(false)
  const [marca, setMarca] = useState('')
  const [instagram, setInstagram] = useState('')
  const [productos, setProductos] = useState('')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const requiredFechas = pkg.fechasIncluded

  const allDays = weekends.flatMap(w =>
    w.days.map(d => ({ ...d, weekendLabel: `${w.label} de ${w.month}` }))
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setMarca('')
      setInstagram('')
      setProductos('')
      setSelectedDays([])
      setSubmitting(false)
    }
  }, [isOpen, pkg.id])

  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev => {
      if (prev.includes(dayId)) {
        return prev.filter(id => id !== dayId)
      }
      if (prev.length >= requiredFechas) {
        return prev
      }
      return [...prev, dayId]
    })
  }

  const datesValid = selectedDays.length === requiredFechas
  const isValid =
    marca.trim().length > 0 &&
    instagram.trim().length > 0 &&
    productos.trim().length > 0 &&
    datesValid

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || submitting) return

    setSubmitting(true)

    const selectedLabels = allDays
      .filter(d => selectedDays.includes(d.id))
      .map(d => d.label)
      .join('\n  • ')

    const packageDescription = pkg.subtitle ? `${pkg.name} (${pkg.subtitle})` : pkg.name

    const message =
      `Hola, quiero reservar mi espacio para ${eventName}.\n\n` +
      `Paquete: ${packageDescription} — $${pkg.price.toLocaleString('es-MX')} ${pkg.priceLabel}\n\n` +
      `Fechas seleccionadas:\n  • ${selectedLabels}\n\n` +
      `Marca: ${marca.trim()}\n` +
      `Instagram: ${instagram.trim()}\n` +
      `Productos que vendo: ${productos.trim()}`

    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    setTimeout(() => {
      onClose()
    }, 400)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  const remainingFechas = requiredFechas - selectedDays.length

  if (!mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-6 bg-charcoal/90 backdrop-blur-md overflow-y-auto"
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
            className="relative w-full max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-4xl my-4 sm:my-0 bg-[#14223D] border border-gold/40 shadow-2xl"
          >
            <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-cream/60 hover:text-gold transition-colors duration-300 z-10"
              aria-label="Cerrar"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 md:p-10">
              {/* Header */}
              <div className="mb-6 pr-8">
                <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold mb-3">
                  Reservar mi espacio
                </p>
                <h2
                  className="font-serif italic text-cream leading-tight mb-2"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  {eventName}
                </h2>
                <p className="font-sans text-cream/85 text-[15px] md:text-base">
                  {pkg.name}{pkg.subtitle ? ` · ${pkg.subtitle}` : ''} · <span className="text-gold font-medium">${pkg.price.toLocaleString('es-MX')}</span> <span className="text-cream/65">{pkg.priceLabel}</span>
                </p>
              </div>

              {/* Hairline divider */}
              <div className="h-px bg-cream/15 mb-7" />

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-7 md:gap-10">
                  {/* LEFT — Date selection */}
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-cream/80">
                        Selecciona {requiredFechas} {requiredFechas === 1 ? 'fecha' : 'fechas'}
                      </p>
                      <p
                        className={`font-sans text-[11px] uppercase tracking-[0.25em] ${
                          datesValid ? 'text-gold' : 'text-cream/60'
                        }`}
                      >
                        {selectedDays.length} / {requiredFechas}
                      </p>
                    </div>
                    <p className="font-sans text-cream/75 text-[13px] md:text-sm mb-4 leading-snug">
                      Cupo limitado a 30 expositores por fecha.
                    </p>

                    <div className="space-y-3.5">
                      {weekends.map((weekend) => (
                        <div key={weekend.id}>
                          <p className="font-sans uppercase tracking-[0.2em] text-cream/70 text-[11px] mb-2">
                            {weekend.label} de {weekend.month}
                          </p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {weekend.days.map((day) => {
                              const checked = selectedDays.includes(day.id)
                              const disabled = !checked && selectedDays.length >= requiredFechas
                              const dayName = day.label.split(' ')[0]
                              const dayNum = day.label.split(' ')[1]
                              return (
                                <button
                                  key={day.id}
                                  type="button"
                                  onClick={() => toggleDay(day.id)}
                                  disabled={disabled}
                                  className={`flex items-center gap-2 px-3 py-2.5 border transition-all duration-300 text-left ${
                                    checked
                                      ? 'border-gold bg-gold/10'
                                      : disabled
                                        ? 'border-cream/10 opacity-40 cursor-not-allowed'
                                        : 'border-cream/20 hover:border-gold/60'
                                  }`}
                                >
                                  <span
                                    className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors flex-shrink-0 ${
                                      checked ? 'border-gold bg-gold' : 'border-cream/40'
                                    }`}
                                  >
                                    {checked && (
                                      <svg className="w-2.5 h-2.5 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    )}
                                  </span>
                                  <span className="font-sans text-[15px] text-cream leading-tight">
                                    <span className="font-medium">{dayName}</span>
                                    <span className="text-cream/70 ml-1">{dayNum}</span>
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {remainingFechas > 0 && (
                      <p className="font-sans text-[13px] md:text-sm text-cream/75 mt-4">
                        Te falta{remainingFechas > 1 ? 'n' : ''} {remainingFechas} {remainingFechas === 1 ? 'fecha' : 'fechas'} por seleccionar
                      </p>
                    )}
                  </div>

                  {/* RIGHT — Form fields */}
                  <div className="space-y-5 md:space-y-6">
                    {/* Marca */}
                    <div>
                      <label htmlFor="marca" className="block font-sans text-[11px] uppercase tracking-[0.25em] text-cream/80 mb-2">
                        Marca
                      </label>
                      <input
                        id="marca"
                        type="text"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        placeholder="Nombre de tu marca"
                        className="w-full bg-transparent border-b border-cream/30 focus:border-gold py-2 text-cream placeholder:text-cream/35 font-sans text-base md:text-[17px] outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Instagram */}
                    <div>
                      <label htmlFor="instagram" className="block font-sans text-[11px] uppercase tracking-[0.25em] text-cream/80 mb-2">
                        Instagram
                      </label>
                      <input
                        id="instagram"
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="@tumarca"
                        className="w-full bg-transparent border-b border-cream/30 focus:border-gold py-2 text-cream placeholder:text-cream/35 font-sans text-base md:text-[17px] outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Productos */}
                    <div>
                      <label htmlFor="productos" className="block font-sans text-[11px] uppercase tracking-[0.25em] text-cream/80 mb-2">
                        Productos que vendo
                      </label>
                      <textarea
                        id="productos"
                        value={productos}
                        onChange={(e) => setProductos(e.target.value)}
                        placeholder="Joyería de autor, cerámica, café especial…"
                        rows={4}
                        className="w-full bg-transparent border border-cream/30 focus:border-gold p-3 text-cream placeholder:text-cream/35 font-sans text-base md:text-[17px] outline-none transition-colors resize-none leading-[1.6]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Primary submit */}
                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className={`w-full mt-7 md:mt-8 py-4 text-sm md:text-base uppercase tracking-[0.2em] font-sans font-medium transition-all duration-500 ${
                    isValid && !submitting
                      ? 'bg-gold text-charcoal hover:bg-gold-light cursor-pointer'
                      : 'bg-cream/10 text-cream/40 cursor-not-allowed'
                  }`}
                >
                  {submitting ? 'Abriendo WhatsApp…' : 'Enviar reservación'}
                </button>

                <p className="font-sans text-[13px] sm:text-sm text-cream/75 text-center leading-relaxed mt-3.5">
                  Al enviar se abrirá WhatsApp con tu reservación lista. Te enviaremos los datos de pago manualmente.
                </p>
              </form>
            </div>

            <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}
