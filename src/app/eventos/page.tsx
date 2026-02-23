'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

// ============================================
// CONFIGURACIÓN - GOOGLE SHEETS
// ============================================
// Para conectar con Google Sheets:
// 1. Crea una hoja de cálculo con columnas:
//    fecha | hora | titulo | descripcion | categoria | destacado
//    (fecha formato YYYY-MM-DD, destacado: SI o NO)
// 2. Archivo → Compartir → Publicar en la web → CSV
// 3. Pegar la URL aquí:
const GOOGLE_SHEET_CSV_URL = ''

// ============================================
// DATOS DE EJEMPLO (se reemplazan con Google Sheets)
// ============================================
const sampleEvents: EventItem[] = [
  { fecha: '2026-03-01', hora: '11:00 AM - 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: true },
  { fecha: '2026-03-02', hora: '11:00 AM - 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Último día del fin de semana para disfrutar nuestro mercado boutique.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-07', hora: '6:00 PM - 9:00 PM', titulo: 'Noche de Vinos & Quesos', descripcion: 'Una velada especial con selección de vinos y tabla de quesos artesanales.', categoria: 'Gastronomía', destacado: true },
  { fecha: '2026-03-08', hora: '11:00 AM - 8:00 PM', titulo: 'Mercado Edición Especial — Día de la Mujer', descripcion: 'Celebramos a las mujeres emprendedoras con una edición especial de nuestro mercado.', categoria: 'Mercado', destacado: true },
  { fecha: '2026-03-14', hora: '5:00 PM - 8:00 PM', titulo: 'Tarde de Jazz en el Jardín', descripcion: 'Música en vivo acompañada de café de especialidad y ambiente inigualable.', categoria: 'Música', destacado: false },
  { fecha: '2026-03-15', hora: '10:00 AM - 1:00 PM', titulo: 'Taller de Sombreros Artesanales', descripcion: 'Aprende el arte de la sombrerería de la mano de nuestros maestros artesanos.', categoria: 'Taller', destacado: false },
  { fecha: '2026-03-21', hora: '7:00 PM - 10:00 PM', titulo: 'Cena Privada — Menú Degustación', descripcion: 'Experiencia gastronómica exclusiva con menú de 5 tiempos. Cupo limitado.', categoria: 'Gastronomía', destacado: true },
  { fecha: '2026-03-22', hora: '11:00 AM - 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Fin de semana de mercado con nuevos expositores y sorpresas.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-28', hora: '4:00 PM - 7:00 PM', titulo: 'Exposición de Arte — Artistas Locales', descripcion: 'Inauguración de exposición colectiva de artistas emergentes de Puebla.', categoria: 'Arte', destacado: true },
]

interface EventItem {
  fecha: string
  hora: string
  titulo: string
  descripcion: string
  categoria: string
  destacado: boolean
}

const categoryColors: Record<string, string> = {
  'Mercado': 'bg-gold/20 text-gold-light border-gold/30',
  'Gastronomía': 'bg-bistro-light/20 text-bistro-100 border-bistro-light/30',
  'Música': 'bg-gold-300/20 text-gold-300 border-gold-300/30',
  'Taller': 'bg-cream/10 text-cream/70 border-cream/20',
  'Arte': 'bg-gold-400/20 text-gold-400 border-gold-400/30',
  'default': 'bg-gold/20 text-gold border-gold/30',
}

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

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
    }
  }).filter(e => e.fecha && e.titulo)
}

function MiniCalendar({ currentMonth, currentYear, events, selectedDate, onSelectDate }: {
  currentMonth: number; currentYear: number; events: EventItem[]; selectedDate: string | null; onSelectDate: (d: string | null) => void
}) {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const today = new Date()
  const eventDates = new Set(events.map(e => e.fecha))
  const highlightDates = new Set(events.filter(e => e.destacado).map(e => e.fecha))

  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  return (
    <div className="bg-cream/5 border border-gold/10 rounded-2xl p-6">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {diasSemana.map(d => (
          <div key={d} className="text-center text-xs text-cream/40 uppercase tracking-wider py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const hasEvent = eventDates.has(dateStr)
          const isHighlight = highlightDates.has(dateStr)
          const isToday = today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day
          const isSelected = selectedDate === dateStr
          return (
            <motion.button
              key={day}
              onClick={() => hasEvent ? onSelectDate(isSelected ? null : dateStr) : null}
              className={`relative aspect-square flex items-center justify-center rounded-lg text-sm transition-all duration-300
                ${hasEvent ? 'cursor-pointer hover:bg-gold/20' : 'cursor-default'}
                ${isSelected ? 'bg-gold text-charcoal font-bold' : ''}
                ${isToday && !isSelected ? 'ring-1 ring-gold/50' : ''}
                ${!hasEvent && !isSelected ? 'text-cream/30' : ''}
                ${hasEvent && !isSelected ? 'text-cream font-medium' : ''}
              `}
              whileHover={hasEvent ? { scale: 1.1 } : {}}
              whileTap={hasEvent ? { scale: 0.95 } : {}}
            >
              {day}
              {hasEvent && !isSelected && (
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isHighlight ? 'bg-gold' : 'bg-cream/40'}`} />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default function EventosPage() {
  const [events, setEvents] = useState<EventItem[]>(sampleEvents)
  const [loading, setLoading] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [view, setView] = useState<'semana' | 'mes'>('mes')

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

  const monthEvents = events.filter(e => {
    const d = new Date(e.fecha + 'T00:00:00')
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear
  }).sort((a, b) => a.fecha.localeCompare(b.fecha))

  const now = new Date()
  const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - now.getDay())
  const endOfWeek = new Date(startOfWeek); endOfWeek.setDate(startOfWeek.getDate() + 6)
  const weekEvents = events.filter(e => {
    const d = new Date(e.fecha + 'T00:00:00')
    return d >= startOfWeek && d <= endOfWeek
  }).sort((a, b) => a.fecha.localeCompare(b.fecha))

  const displayEvents = selectedDate
    ? monthEvents.filter(e => e.fecha === selectedDate)
    : view === 'semana' ? weekEvents : monthEvents

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) } else setCurrentMonth(m => m - 1)
    setSelectedDate(null)
  }
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) } else setCurrentMonth(m => m + 1)
    setSelectedDate(null)
  }

  const formatDate = (fecha: string) => {
    const d = new Date(fecha + 'T00:00:00')
    return {
      dia: d.getDate(),
      mes: meses[d.getMonth()],
      diaSemana: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][d.getDay()],
    }
  }

  return (
    <div className="min-h-screen bg-bistro">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-bistro-dark via-bistro to-bistro-600" />
          <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-24">
          <motion.h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold mb-4 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            Eventos & Programa
          </motion.h1>
          <motion.p className="text-gold-light/70 uppercase tracking-[0.3em] text-sm mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}>
            Descubre lo que está pasando en Casa de los Ángeles
          </motion.p>
          <motion.div className="flex items-center justify-center gap-4" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.9 }}>
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-2 h-2 bg-gold/60 rotate-45" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTENIDO ═══ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5">
          {/* Controles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <motion.button onClick={prevMonth} className="p-2 rounded-full border border-gold/20 text-gold hover:bg-gold/10 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <h2 className="font-serif text-2xl sm:text-3xl text-gold min-w-[200px] text-center">{meses[currentMonth]} {currentYear}</h2>
              <motion.button onClick={nextMonth} className="p-2 rounded-full border border-gold/20 text-gold hover:bg-gold/10 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="flex bg-cream/5 border border-gold/10 rounded-lg overflow-hidden">
              <button onClick={() => { setView('semana'); setSelectedDate(null) }} className={`px-5 py-2 text-sm uppercase tracking-wider transition-all ${view === 'semana' ? 'bg-gold text-charcoal font-medium' : 'text-cream/50 hover:text-cream'}`}>
                Esta Semana
              </button>
              <button onClick={() => { setView('mes'); setSelectedDate(null) }} className={`px-5 py-2 text-sm uppercase tracking-wider transition-all ${view === 'mes' ? 'bg-gold text-charcoal font-medium' : 'text-cream/50 hover:text-cream'}`}>
                Todo el Mes
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[340px_1fr] gap-10">
            {/* Mini calendario */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <MiniCalendar currentMonth={currentMonth} currentYear={currentYear} events={events} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                <div className="mt-6 space-y-2 px-2">
                  <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-gold" /><span className="text-sm text-cream/50">Evento destacado</span></div>
                  <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-cream/40" /><span className="text-sm text-cream/50">Evento regular</span></div>
                </div>
                {selectedDate && (
                  <motion.button onClick={() => setSelectedDate(null)} className="mt-4 w-full py-2 text-sm text-gold border border-gold/20 rounded-lg hover:bg-gold/10 transition-colors" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Ver todos los eventos del mes
                  </motion.button>
                )}
              </div>
            </div>

            {/* Lista de eventos */}
            <div>
              {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-cream/50">Cargando eventos...</p>
                </div>
              ) : displayEvents.length === 0 ? (
                <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Calendar className="w-16 h-16 text-gold/30 mx-auto mb-6" />
                  <h3 className="font-serif text-2xl text-gold/60 mb-3">{selectedDate ? 'Sin eventos este día' : 'Sin eventos programados'}</h3>
                  <p className="text-cream/40">{selectedDate ? 'Selecciona otro día o revisa todo el mes.' : 'Pronto publicaremos nuevos eventos.'}</p>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div key={`${currentMonth}-${selectedDate}-${view}`} className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                    {displayEvents.map((event, index) => {
                      const { dia, mes, diaSemana } = formatDate(event.fecha)
                      const colorClass = categoryColors[event.categoria] || categoryColors['default']
                      return (
                        <motion.div
                          key={`${event.fecha}-${event.titulo}-${index}`}
                          className={`group relative flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-2xl border transition-all duration-500 hover:shadow-xl ${
                            event.destacado ? 'bg-gold/5 border-gold/30 hover:border-gold/50' : 'bg-cream/5 border-gold/10 hover:border-gold/20'
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                          <div className="flex-shrink-0 text-center sm:text-left sm:min-w-[80px]">
                            <p className="text-gold/60 text-xs uppercase tracking-wider">{diaSemana}</p>
                            <p className="font-serif text-4xl text-gold leading-none mt-1">{dia}</p>
                            <p className="text-cream/40 text-sm mt-1">{mes}</p>
                          </div>
                          <div className="hidden sm:block w-px bg-gold/15 self-stretch" />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              {event.destacado && (
                                <span className="inline-flex items-center gap-1 text-xs text-gold uppercase tracking-wider">
                                  <Star className="w-3 h-3 fill-gold" />Destacado
                                </span>
                              )}
                              <span className={`text-xs px-3 py-1 rounded-full border ${colorClass}`}>{event.categoria}</span>
                            </div>
                            <h3 className="font-serif text-xl sm:text-2xl text-cream group-hover:text-gold transition-colors mb-3">{event.titulo}</h3>
                            <p className="text-cream/50 text-sm leading-relaxed mb-4">{event.descripcion}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-cream/40">
                              <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-gold/50" />{event.hora}</span>
                              <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-gold/50" />Casa de los Ángeles</span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* CTA */}
          <motion.div className="mt-20 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="bg-cream/5 border border-gold/10 rounded-2xl p-10 max-w-2xl mx-auto">
              <Sparkles className="w-8 h-8 text-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-gold mb-4">¿Quieres organizar tu evento aquí?</h3>
              <p className="text-cream/50 mb-8">Casa de los Ángeles es el espacio perfecto para tu evento. Contáctanos para conocer disponibilidad.</p>
              <motion.a
                href="https://wa.me/522206224222?text=Hola,%20me%20interesa%20organizar%20un%20evento%20en%20Casa%20de%20los%20%C3%81ngeles"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-sans text-sm uppercase tracking-[0.15em] font-medium transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              >
                Contáctanos por WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
