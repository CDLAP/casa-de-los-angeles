'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import Image from 'next/image'
import NativeLightbox from '@/components/ui/NativeLightbox'

// ============================================
// CONFIGURACIÓN - GOOGLE SHEETS
// ============================================
const GOOGLE_SHEET_CSV_URL = ''

const sampleEvents: EventItem[] = [
  // Febrero — fines de semana
  { fecha: '2026-02-27', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: true },
  { fecha: '2026-02-28', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-01', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: false },
  // Marzo — Miércoles de Mercado Mágico
  { fecha: '2026-03-04', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado Mágico', descripcion: 'Una experiencia única de compras, arte y descubrimientos cada miércoles en Casa de los Ángeles.', categoria: 'Mercado Mágico', destacado: true, imagen: '/images/MM.jpg' },
  { fecha: '2026-03-11', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado Mágico', descripcion: 'Una experiencia única de compras, arte y descubrimientos cada miércoles en Casa de los Ángeles.', categoria: 'Mercado Mágico', destacado: true, imagen: '/images/MM.jpg' },
  { fecha: '2026-03-18', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado Mágico', descripcion: 'Una experiencia única de compras, arte y descubrimientos cada miércoles en Casa de los Ángeles.', categoria: 'Mercado Mágico', destacado: true, imagen: '/images/MM.jpg' },
  { fecha: '2026-03-25', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado Mágico', descripcion: 'Una experiencia única de compras, arte y descubrimientos cada miércoles en Casa de los Ángeles.', categoria: 'Mercado Mágico', destacado: true, imagen: '/images/MM.jpg' },
  // Abril — Miércoles de Mercado Mágico
  { fecha: '2026-04-01', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado Mágico', descripcion: 'Una experiencia única de compras, arte y descubrimientos cada miércoles en Casa de los Ángeles.', categoria: 'Mercado Mágico', destacado: true, imagen: '/images/MM.jpg' },
  { fecha: '2026-04-08', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado Mágico', descripcion: 'Una experiencia única de compras, arte y descubrimientos cada miércoles en Casa de los Ángeles.', categoria: 'Mercado Mágico', destacado: true, imagen: '/images/MM.jpg' },
  { fecha: '2026-04-15', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado Mágico', descripcion: 'Una experiencia única de compras, arte y descubrimientos cada miércoles en Casa de los Ángeles.', categoria: 'Mercado Mágico', destacado: true, imagen: '/images/MM.jpg' },
  { fecha: '2026-04-22', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado Mágico', descripcion: 'Una experiencia única de compras, arte y descubrimientos cada miércoles en Casa de los Ángeles.', categoria: 'Mercado Mágico', destacado: true, imagen: '/images/MM.jpg' },
  { fecha: '2026-04-29', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado Mágico', descripcion: 'Una experiencia única de compras, arte y descubrimientos cada miércoles en Casa de los Ángeles.', categoria: 'Mercado Mágico', destacado: true, imagen: '/images/MM.jpg' },
  // Marzo — Martes de Artes
  { fecha: '2026-03-03', hora: '11:00 AM – 8:00 PM', titulo: 'Martes de Artes', descripcion: 'Una jornada dedicada al arte, la creatividad y la expresión cultural en Casa de los Ángeles.', categoria: 'Arte', destacado: true, imagen: '/images/mdm.jpg' },
  { fecha: '2026-03-10', hora: '11:00 AM – 8:00 PM', titulo: 'Martes de Artes', descripcion: 'Una jornada dedicada al arte, la creatividad y la expresión cultural en Casa de los Ángeles.', categoria: 'Arte', destacado: true, imagen: '/images/mdm.jpg' },
  { fecha: '2026-03-17', hora: '11:00 AM – 8:00 PM', titulo: 'Martes de Artes', descripcion: 'Una jornada dedicada al arte, la creatividad y la expresión cultural en Casa de los Ángeles.', categoria: 'Arte', destacado: true, imagen: '/images/mdm.jpg' },
  { fecha: '2026-03-24', hora: '11:00 AM – 8:00 PM', titulo: 'Martes de Artes', descripcion: 'Una jornada dedicada al arte, la creatividad y la expresión cultural en Casa de los Ángeles.', categoria: 'Arte', destacado: true, imagen: '/images/mdm.jpg' },
  { fecha: '2026-03-31', hora: '11:00 AM – 8:00 PM', titulo: 'Martes de Artes', descripcion: 'Una jornada dedicada al arte, la creatividad y la expresión cultural en Casa de los Ángeles.', categoria: 'Arte', destacado: true, imagen: '/images/mdm.jpg' },
  // Marzo — Mercado fines de semana
  { fecha: '2026-03-06', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: true },
  { fecha: '2026-03-07', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-08', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-13', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: true },
  { fecha: '2026-03-14', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-15', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-20', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: true },
  { fecha: '2026-03-21', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-22', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-27', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: true },
  { fecha: '2026-03-28', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-29', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: false },
]

interface EventItem {
  fecha: string
  hora: string
  titulo: string
  descripcion: string
  categoria: string
  destacado: boolean
  imagen?: string
}

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function parseCSV(csv: string): EventItem[] {
  const lines = csv.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
    const obj: any = {}
    headers.forEach((h, i) => { obj[h] = values[i] || '' })
    return {
      fecha: obj.fecha || '',
      hora: obj.hora || '',
      titulo: obj.titulo || '',
      descripcion: obj.descripcion || '',
      categoria: obj.categoria || '',
      destacado: (obj.destacado || '').toUpperCase() === 'SI',
      imagen: obj.imagen || undefined,
    }
  }).filter(e => e.fecha && e.titulo)
}

function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function getWeekEnd(weekStart: Date): Date {
  const d = new Date(weekStart)
  d.setDate(d.getDate() + 6)
  return d
}

function formatWeekRange(start: Date, end: Date): string {
  const startDay = start.getDate()
  const endDay = end.getDate()
  const startMonth = meses[start.getMonth()]
  const endMonth = meses[end.getMonth()]
  if (start.getMonth() === end.getMonth()) {
    return `${startDay} – ${endDay} de ${startMonth}`
  }
  return `${startDay} ${startMonth} – ${endDay} ${endMonth}`
}

export default function EventosPage() {
  const [events, setEvents] = useState<EventItem[]>(sampleEvents)
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState<'semana' | 'mes'>('semana')
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()))
  const [bannerEvent, setBannerEvent] = useState<EventItem | null>(null)

  useEffect(() => {
    if (!GOOGLE_SHEET_CSV_URL) return
    setLoading(true)
    fetch(GOOGLE_SHEET_CSV_URL)
      .then(res => res.text())
      .then(csv => {
        const parsed = parseCSV(csv)
        if (parsed.length > 0) setEvents(parsed)
      })
      .catch(err => console.error('Error loading events:', err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (bannerEvent) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = '' }
    return () => { document.body.style.overflow = '' }
  }, [bannerEvent])

  const monthEvents = events.filter(e => {
    const d = new Date(e.fecha + 'T00:00:00')
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear
  }).sort((a, b) => a.fecha.localeCompare(b.fecha))

  const weekEnd = getWeekEnd(weekStart)
  const weekEvents = events.filter(e => {
    const d = new Date(e.fecha + 'T00:00:00')
    return d >= weekStart && d <= weekEnd
  }).sort((a, b) => a.fecha.localeCompare(b.fecha))

  const filteredEvents = view === 'semana' ? weekEvents : monthEvents

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) } else setCurrentMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) } else setCurrentMonth(m => m + 1)
  }

  const prevWeek = () => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() - 7)
    setWeekStart(d)
  }
  const nextWeek = () => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + 7)
    setWeekStart(d)
  }

  const formatDate = (fecha: string) => {
    const d = new Date(fecha + 'T00:00:00')
    return {
      dia: d.getDate(),
      diaSemana: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][d.getDay()],
    }
  }

  return (
    <div className="min-h-screen bg-bistro">
      {/* ═══ HERO ═══ */}
      <section className="relative flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-bistro-dark via-bistro to-bistro-600" />
          <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L50 100M0 50L100 50' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-[150px] md:pt-[210px] pb-16">
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Programa de Eventos
          </motion.h1>

          <motion.p
            className="text-cream/50 text-lg max-w-xl mx-auto font-light mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Lo que está pasando en Casa de los Ángeles
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-2 h-2 bg-gold/60 rotate-45" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>
        </div>
      </section>

      {/* ═══ NAVEGACIÓN DE MES ═══ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5">
          
          {/* Toggle Semana / Mes */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex border border-gold/20 rounded-full overflow-hidden">
              <button
                onClick={() => setView('semana')}
                className={`px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-sans transition-all duration-300 ${
                  view === 'semana' ? 'bg-gold text-charcoal' : 'text-gold/60 hover:text-gold'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setView('mes')}
                className={`px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-sans transition-all duration-300 ${
                  view === 'mes' ? 'bg-gold text-charcoal' : 'text-gold/60 hover:text-gold'
                }`}
              >
                Mes
              </button>
            </div>
          </motion.div>

          {/* Navegación */}
          <motion.div
            className="flex items-center justify-center gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={view === 'semana' ? prevWeek : prevMonth}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border border-gold/20 text-gold/50 hover:text-gold hover:border-gold/50 hover:bg-gold/5 active:bg-gold/10 active:text-gold transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h2 className="font-serif text-2xl sm:text-3xl text-gold min-w-[180px] sm:min-w-[280px] text-center tracking-tight">
              {view === 'semana'
                ? formatWeekRange(weekStart, weekEnd)
                : `${meses[currentMonth]} ${currentYear}`
              }
            </h2>
            
            <button
              onClick={view === 'semana' ? nextWeek : nextMonth}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border border-gold/20 text-gold/50 hover:text-gold hover:border-gold/50 hover:bg-gold/5 active:bg-gold/10 active:text-gold transition-all duration-300"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </motion.div>

          {/* ═══ LISTA DE EVENTOS ═══ */}
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-6 h-6 border-2 border-gold border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-cream/40 text-sm">Cargando eventos...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Calendar className="w-12 h-12 text-gold/20 mx-auto mb-6" />
              <p className="font-serif text-xl text-gold/40 mb-2">{view === 'semana' ? 'Sin eventos esta semana' : 'Sin eventos este mes'}</p>
              <p className="text-cream/30 text-sm">Pronto publicaremos nuevos eventos.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={view === 'semana' ? `week-${weekStart.toISOString()}` : `${currentMonth}-${currentYear}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {filteredEvents.map((event, index) => {
                  const { dia, diaSemana } = formatDate(event.fecha)
                  const isLast = index === filteredEvents.length - 1
                  const hasImage = !!event.imagen

                  return (
                    <motion.div
                      key={`${event.fecha}-${event.titulo}-${index}`}
                      className={`group grid grid-cols-[70px_1fr] sm:grid-cols-[100px_1fr] gap-6 sm:gap-10 py-8 sm:py-10 ${
                        !isLast ? 'border-b border-gold/10' : ''
                      } ${hasImage ? 'cursor-pointer' : ''}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      onClick={hasImage ? () => setBannerEvent(event) : undefined}
                    >
                      {/* Fecha */}
                      <div className="text-center sm:text-right pt-1">
                        <p className="font-serif text-4xl sm:text-5xl text-gold leading-none">
                          {String(dia).padStart(2, '0')}
                        </p>
                        <p className="text-cream/30 text-xs uppercase tracking-widest mt-2">
                          {diaSemana}
                        </p>
                      </div>

                      {/* Contenido */}
                      <div className={hasImage ? 'flex gap-4 sm:gap-6' : ''}>
                        {/* Thumbnail */}
                        {hasImage && event.imagen && (
                          <div className="relative flex-shrink-0 w-16 sm:w-20 rounded-lg overflow-hidden border border-gold/20 group-hover:border-gold/50 transition-all duration-300 shadow-lg group-hover:shadow-gold/10" style={{ aspectRatio: '9/16' }}>
                            <Image
                              src={event.imagen}
                              alt={event.titulo}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="80px"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="text-gold/40 text-xs uppercase tracking-[0.2em] mb-2">
                            {event.categoria}
                          </p>
                          
                          <h3 className={`font-serif text-xl sm:text-2xl text-cream transition-colors duration-300 mb-3 ${hasImage ? 'group-hover:text-gold' : ''}`}>
                            {event.titulo}
                          </h3>

                          <p className="text-cream/45 text-sm leading-relaxed mb-4 max-w-xl">
                            {event.descripcion}
                          </p>

                          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-cream/30 uppercase tracking-wider">
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-gold/30" />
                              {event.hora}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-gold/30" />
                              Palafox y Mendoza 222
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Ornamento final */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <span className="text-gold/30 text-lg">❖</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-cream/30 text-sm mb-6">
              ¿Quieres organizar tu evento en Casa de los Ángeles?
            </p>
            <a
              href="https://wa.me/522206224222?text=Hola,%20me%20interesa%20organizar%20un%20evento%20en%20Casa%20de%20los%20%C3%81ngeles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-gold/30 text-gold text-sm uppercase tracking-[0.2em] font-sans transition-all duration-500 hover:bg-gold hover:text-white hover:border-gold"
            >
              Contáctanos
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ LIGHTBOX NATIVO ═══ */}
      <NativeLightbox
        src={bannerEvent?.imagen || ''}
        alt={bannerEvent?.titulo || ''}
        open={!!bannerEvent && !!bannerEvent.imagen}
        onClose={() => setBannerEvent(null)}
      />
    </div>
  )
}
