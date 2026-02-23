'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

// ============================================
// CONFIGURACIÓN - GOOGLE SHEETS
// ============================================
// 1. Columnas: fecha | hora | titulo | descripcion | categoria | destacado
//    (fecha: YYYY-MM-DD, destacado: SI o NO)
// 2. Archivo → Compartir → Publicar en la web → CSV
// 3. Pegar URL aquí:
const GOOGLE_SHEET_CSV_URL = ''

const sampleEvents: EventItem[] = [
  { fecha: '2026-03-01', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Boutique y mercado artesanal con las mejores marcas locales e independientes.', categoria: 'Mercado', destacado: true },
  { fecha: '2026-03-02', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Último día del fin de semana para disfrutar nuestro mercado boutique.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-07', hora: '6:00 PM – 9:00 PM', titulo: 'Noche de Vinos & Quesos', descripcion: 'Una velada especial con selección de vinos y tabla de quesos artesanales.', categoria: 'Gastronomía', destacado: true },
  { fecha: '2026-03-08', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado Edición Especial — Día de la Mujer', descripcion: 'Celebramos a las mujeres emprendedoras con una edición especial de nuestro mercado.', categoria: 'Mercado', destacado: true },
  { fecha: '2026-03-14', hora: '5:00 PM – 8:00 PM', titulo: 'Tarde de Jazz en el Jardín', descripcion: 'Música en vivo acompañada de café de especialidad y ambiente inigualable.', categoria: 'Música', destacado: false },
  { fecha: '2026-03-15', hora: '10:00 AM – 1:00 PM', titulo: 'Taller de Sombreros Artesanales', descripcion: 'Aprende el arte de la sombrerería de la mano de nuestros maestros artesanos.', categoria: 'Taller', destacado: false },
  { fecha: '2026-03-21', hora: '7:00 PM – 10:00 PM', titulo: 'Cena Privada — Menú Degustación', descripcion: 'Experiencia gastronómica exclusiva con menú de 5 tiempos. Cupo limitado.', categoria: 'Gastronomía', destacado: true },
  { fecha: '2026-03-22', hora: '11:00 AM – 8:00 PM', titulo: 'Mercado de las Maravillas', descripcion: 'Fin de semana de mercado con nuevos expositores y sorpresas.', categoria: 'Mercado', destacado: false },
  { fecha: '2026-03-28', hora: '4:00 PM – 7:00 PM', titulo: 'Exposición de Arte — Artistas Locales', descripcion: 'Inauguración de exposición colectiva de artistas emergentes de Puebla.', categoria: 'Arte', destacado: true },
]

interface EventItem {
  fecha: string
  hora: string
  titulo: string
  descripcion: string
  categoria: string
  destacado: boolean
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
    }
  }).filter(e => e.fecha && e.titulo)
}

export default function EventosPage() {
  const [events, setEvents] = useState<EventItem[]>(sampleEvents)
  const [loading, setLoading] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

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

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) } else setCurrentMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) } else setCurrentMonth(m => m + 1)
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
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-bistro-dark via-bistro to-bistro-600" />
          <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L50 100M0 50L100 50' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-24">
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Programa de Eventos
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-2 h-2 bg-gold/60 rotate-45" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>

          <motion.p
            className="text-cream/50 text-lg max-w-xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Lo que está pasando en Casa de los Ángeles
          </motion.p>
        </div>
      </section>

      {/* ═══ NAVEGACIÓN DE MES ═══ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5">
          
          {/* Mes */}
          <motion.div
            className="flex items-center justify-center gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={prevMonth}
              className="p-3 text-gold/50 hover:text-gold transition-colors"
              aria-label="Mes anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <h2 className="font-serif text-3xl sm:text-4xl text-gold min-w-[260px] text-center tracking-tight">
              {meses[currentMonth]} {currentYear}
            </h2>
            
            <button
              onClick={nextMonth}
              className="p-3 text-gold/50 hover:text-gold transition-colors"
              aria-label="Mes siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* ═══ LISTA DE EVENTOS ═══ */}
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-6 h-6 border-2 border-gold border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-cream/40 text-sm">Cargando eventos...</p>
            </div>
          ) : monthEvents.length === 0 ? (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Calendar className="w-12 h-12 text-gold/20 mx-auto mb-6" />
              <p className="font-serif text-xl text-gold/40 mb-2">Sin eventos este mes</p>
              <p className="text-cream/30 text-sm">Pronto publicaremos nuevos eventos.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentMonth}-${currentYear}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {monthEvents.map((event, index) => {
                  const { dia, diaSemana } = formatDate(event.fecha)
                  const isLast = index === monthEvents.length - 1

                  return (
                    <motion.div
                      key={`${event.fecha}-${event.titulo}-${index}`}
                      className={`group grid grid-cols-[70px_1fr] sm:grid-cols-[100px_1fr] gap-6 sm:gap-10 py-8 sm:py-10 ${
                        !isLast ? 'border-b border-gold/10' : ''
                      }`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
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
                      <div>
                        <p className="text-gold/40 text-xs uppercase tracking-[0.2em] mb-2">
                          {event.categoria}
                        </p>
                        
                        <h3 className="font-serif text-xl sm:text-2xl text-cream group-hover:text-gold transition-colors duration-300 mb-3">
                          {event.titulo}
                        </h3>

                        <p className="text-cream/45 text-sm leading-relaxed mb-4 max-w-xl">
                          {event.descripcion}
                        </p>

                        <div className="flex items-center gap-5 text-xs text-cream/30 uppercase tracking-wider">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gold/30" />
                            {event.hora}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gold/30" />
                            Palafox 222
                          </span>
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
    </div>
  )
}
