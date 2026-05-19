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

  // Mount flag for createPortal (avoid SSR issues)
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
            className="relative w-full max-w-md sm:max-w-lg my-4 sm:my-0 bg-[#0A1428] border border-gold/40 shadow-2xl"
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
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-cream/70">
                      Selecciona {requiredFechas} {requiredFechas === 1 ? 'fecha' : 'fechas'}
                    </p>
                    <p className={`text-[10px] uppercase tracking-[0.25em] ${datesValid ? 'text-gold' : 'text-cream/50'}`}>
                      {selectedDays.length} / {requiredFechas}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {weekends.map((weekend) => (
                      <div key={weekend.id}>
                        <p className="font-sans uppercase tracking-[0.2em] text-cream/55 text-[10px] mb-1.5">
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
                                className={`flex items-center gap-2 px-3 py-2 border transition-all duration-300 text-left ${
                                  checked
                                    ? 'border-gold bg-gold/10'
                                    : disabled
                                      ? 'border-gold/10 opacity-40 cursor-not-allowed'
                                      : 'border-gold/20 hover:border-gold/50'
                                }`}
                              >
                                <span
                                  className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors flex-shrink-0 ${
                                    checked ? 'border-gold bg-gold' : 'border-gold/40'
                                  }`}
                                >
                                  {checked && (
                                    <svg className="w-2.5 h-2.5 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
                                </span>
                                <span className="font-sans text-[12px] text-cream leading-tight">
                                  <span className="font-medium">{dayName}</span>
                                  <span className="text-cream/55 ml-1">{dayNum}</span>
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {remainingFechas > 0 && (
                    <p className="text-[10px] text-cream/40 mt-3 font-sans">
                      Te falta{remainingFechas > 1 ? 'n' : ''} {remainingFechas} {remainingFechas === 1 ? 'fecha' : 'fechas'} por seleccionar
                    </p>
                  )}
                </div>

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
