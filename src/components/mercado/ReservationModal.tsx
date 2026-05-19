'use client'

import { useState, useEffect, useRef } from 'react'
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

interface SeasonDate {
  id: string
  label: string
  month: string
}

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  eventName: string
  pkg: Pkg
  dates: SeasonDate[]
  whatsapp: string
}

export default function ReservationModal({
  isOpen,
  onClose,
  eventName,
  pkg,
  dates,
  whatsapp,
}: ReservationModalProps) {
  const [marca, setMarca] = useState('')
  const [instagram, setInstagram] = useState('')
  const [productos, setProductos] = useState('')
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const requiredFechas = pkg.fechasIncluded

  useEffect(() => {
    if (isOpen) {
      setMarca('')
      setInstagram('')
      setProductos('')
      setSelectedDates([])
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

  const toggleDate = (dateId: string) => {
    setSelectedDates(prev => {
      if (prev.includes(dateId)) {
        return prev.filter(id => id !== dateId)
      }
      // If already at limit, don't add more
      if (prev.length >= requiredFechas) {
        return prev
      }
      return [...prev, dateId]
    })
  }

  const datesValid = selectedDates.length === requiredFechas
  const isValid =
    marca.trim().length > 0 &&
    instagram.trim().length > 0 &&
    productos.trim().length > 0 &&
    datesValid

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || submitting) return

    setSubmitting(true)

    const selectedLabels = dates
      .filter(d => selectedDates.includes(d.id))
      .map(d => `${d.label} de ${d.month}`)
      .join(', ')

    const packageDescription = pkg.subtitle ? `${pkg.name} (${pkg.subtitle})` : pkg.name

    const message =
      `Hola, quiero reservar mi espacio para ${eventName}.\n\n` +
      `Paquete: ${packageDescription} — $${pkg.price.toLocaleString('es-MX')} ${pkg.priceLabel}\n` +
      `Fecha(s): ${selectedLabels}\n\n` +
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

  const remainingFechas = requiredFechas - selectedDates.length

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-6 bg-charcoal/85 backdrop-blur-md overflow-y-auto"
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
            className="relative w-full max-w-md sm:max-w-lg my-4 sm:my-0 bg-[#0F1A17] border border-gold/40 shadow-2xl"
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

            <div className="p-5 sm:p-7 md:p-9">
              {/* Header */}
              <div className="mb-5 pr-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">Reservar mi espacio</p>
                <h2 className="font-serif italic text-xl sm:text-2xl text-cream leading-tight mb-1">
                  {eventName}
                </h2>
                <p className="font-sans uppercase tracking-[0.2em] text-gold/80 text-xs">
                  {pkg.name}{pkg.subtitle ? ` · ${pkg.subtitle}` : ''} · ${pkg.price.toLocaleString('es-MX')} {pkg.priceLabel}
                </p>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gold/20" />
                <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
                <div className="flex-1 h-px bg-gold/20" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date selection */}
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-cream/70">
                      Selecciona {requiredFechas} {requiredFechas === 1 ? 'fecha' : 'fechas'}
                    </p>
                    <p className={`text-[10px] uppercase tracking-[0.25em] ${datesValid ? 'text-gold' : 'text-cream/50'}`}>
                      {selectedDates.length} / {requiredFechas}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {dates.map((date) => {
                      const checked = selectedDates.includes(date.id)
                      const disabled = !checked && selectedDates.length >= requiredFechas
                      return (
                        <button
                          key={date.id}
                          type="button"
                          onClick={() => toggleDate(date.id)}
                          disabled={disabled}
                          className={`flex items-center gap-2.5 px-3 py-2.5 border transition-all duration-300 text-left ${
                            checked
                              ? 'border-gold bg-gold/10'
                              : disabled
                                ? 'border-gold/10 opacity-40 cursor-not-allowed'
                                : 'border-gold/20 hover:border-gold/50'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 border flex items-center justify-center transition-colors flex-shrink-0 ${
                              checked ? 'border-gold bg-gold' : 'border-gold/40'
                            }`}
                          >
                            {checked && (
                              <svg className="w-3 h-3 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </span>
                          <span className="font-sans text-[13px] text-cream leading-tight">
                            <span className="font-medium">{date.label}</span>
                            <span className="text-cream/55 ml-1">{date.month}</span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  {remainingFechas > 0 && (
                    <p className="text-[10px] text-cream/40 mt-2 font-sans">
                      Te falta{remainingFechas > 1 ? 'n' : ''} {remainingFechas} {remainingFechas === 1 ? 'fecha' : 'fechas'} por seleccionar
                    </p>
                  )}
                </div>

                {/* Marca */}
                <div>
                  <label htmlFor="marca" className="block text-[10px] uppercase tracking-[0.25em] text-cream/70 mb-1.5">
                    Marca
                  </label>
                  <input
                    id="marca"
                    type="text"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    placeholder="Nombre de tu marca"
                    className="w-full bg-transparent border-b border-gold/30 focus:border-gold py-2 text-cream placeholder:text-cream/30 font-sans outline-none transition-colors"
                    required
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label htmlFor="instagram" className="block text-[10px] uppercase tracking-[0.25em] text-cream/70 mb-1.5">
                    Instagram
                  </label>
                  <input
                    id="instagram"
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@tumarca"
                    className="w-full bg-transparent border-b border-gold/30 focus:border-gold py-2 text-cream placeholder:text-cream/30 font-sans outline-none transition-colors"
                    required
                  />
                </div>

                {/* Productos */}
                <div>
                  <label htmlFor="productos" className="block text-[10px] uppercase tracking-[0.25em] text-cream/70 mb-1.5">
                    Productos que vendo
                  </label>
                  <textarea
                    id="productos"
                    value={productos}
                    onChange={(e) => setProductos(e.target.value)}
                    placeholder="Joyería de autor, cerámica, café especial…"
                    rows={2}
                    className="w-full bg-transparent border border-gold/30 focus:border-gold p-2.5 text-cream placeholder:text-cream/30 font-sans outline-none transition-colors resize-none text-sm"
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className={`w-full mt-1 py-3.5 text-sm uppercase tracking-[0.25em] font-sans font-medium transition-all duration-500 ${
                    isValid && !submitting
                      ? 'bg-gold text-charcoal hover:bg-gold-light cursor-pointer'
                      : 'bg-gold/20 text-cream/40 cursor-not-allowed'
                  }`}
                >
                  {submitting ? 'Abriendo WhatsApp…' : 'Enviar reservación'}
                </button>

                <p className="text-[10px] sm:text-[11px] text-cream/40 text-center font-sans leading-relaxed">
                  Al enviar se abrirá WhatsApp con tu mensaje listo. Te enviaremos los datos de pago manualmente.
                </p>
              </form>
            </div>

            <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
