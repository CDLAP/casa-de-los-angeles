'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Tag, Clock, Calendar, Gift, Sparkles, ArrowRight } from 'lucide-react'

// ============================================
// CONFIGURACIÓN - GOOGLE SHEETS
// ============================================
// Para conectar con Google Sheets:
// 1. Crea una hoja con columnas:
//    fecha | titulo | descripcion | precio_normal | precio_promo | condiciones | activa
//    (fecha: YYYY-MM-DD, activa: SI o NO)
// 2. Archivo → Compartir → Publicar en la web → CSV
// 3. Pegar la URL aquí:
const GOOGLE_SHEET_CSV_URL = ''

// ============================================
// DATOS DE EJEMPLO (se reemplazan con Google Sheets)
// ============================================
const samplePromos: PromoItem[] = [
  {
    fecha: '2026-02-23',
    titulo: '2x1 en Café Americano',
    descripcion: 'Disfruta de dos cafés americanos al precio de uno. Perfecto para compartir con alguien especial en tu visita a Casa de los Ángeles.',
    precio_normal: '$78',
    precio_promo: '$78 por 2',
    condiciones: 'Válido todo el día. No acumulable con otras promociones.',
    activa: true,
  },
  {
    fecha: '2026-02-24',
    titulo: 'Tabla de Charcutería + Copa de Vino',
    descripcion: 'Tabla individual de charcutería acompañada de una copa de vino tinto, blanco o lambrusco a elegir.',
    precio_normal: '$440',
    precio_promo: '$365',
    condiciones: 'Válido de 4:00 PM a 9:00 PM. Sujeto a disponibilidad.',
    activa: true,
  },
  {
    fecha: '2026-02-25',
    titulo: 'Martes de Té & Galletas',
    descripcion: 'Selección de té gourmet acompañado de galletas artesanales de la casa.',
    precio_normal: '$120',
    precio_promo: '$85',
    condiciones: 'Válido todo el día.',
    activa: true,
  },
]

interface PromoItem {
  fecha: string
  titulo: string
  descripcion: string
  precio_normal: string
  precio_promo: string
  condiciones: string
  activa: boolean
}

function parseCSV(csv: string): PromoItem[] {
  const lines = csv.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
    const obj: any = {}
    headers.forEach((h, i) => { obj[h] = values[i] || '' })
    return {
      fecha: obj.fecha || '',
      titulo: obj.titulo || '',
      descripcion: obj.descripcion || '',
      precio_normal: obj.precio_normal || '',
      precio_promo: obj.precio_promo || '',
      condiciones: obj.condiciones || '',
      activa: (obj.activa || '').toUpperCase() === 'SI',
    }
  }).filter(e => e.titulo)
}

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

export default function PromocionPage() {
  const [promos, setPromos] = useState<PromoItem[]>(samplePromos)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!GOOGLE_SHEET_CSV_URL) return
    setLoading(true)
    fetch(GOOGLE_SHEET_CSV_URL)
      .then(res => res.text())
      .then(csv => {
        const parsed = parseCSV(csv)
        if (parsed.length > 0) setPromos(parsed)
      })
      .catch(err => console.error('Error loading promos:', err))
      .finally(() => setLoading(false))
  }, [])

  // Buscar promo de hoy
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const todayPromo = promos.find(p => p.fecha === todayStr && p.activa)

  // Próximas promos (después de hoy)
  const upcomingPromos = promos
    .filter(p => p.fecha > todayStr && p.activa)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .slice(0, 5)

  const formatDate = (fecha: string) => {
    const d = new Date(fecha + 'T00:00:00')
    return `${diasSemana[d.getDay()]} ${d.getDate()} de ${meses[d.getMonth()]}`
  }

  return (
    <div className="min-h-screen bg-bistro">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-bistro-dark via-bistro to-bistro-600" />
          <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L50 100M0 50L100 50' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-24">
          <motion.h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold mb-4 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            Promoción del Día
          </motion.h1>
          <motion.p className="text-gold-light/70 uppercase tracking-[0.3em] text-sm mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}>
            Ofertas especiales que cambian cada día
          </motion.p>
          <motion.div className="flex items-center justify-center gap-4" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.9 }}>
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-2 h-2 bg-gold/60 rotate-45" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>
        </div>
      </section>

      {/* ═══ PROMO DE HOY ═══ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-cream/50">Cargando promociones...</p>
            </div>
          ) : todayPromo ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Fecha de hoy */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 bg-gold/10 border border-gold/20 rounded-full px-6 py-2">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="text-gold text-sm uppercase tracking-wider">
                    {formatDate(todayStr)}
                  </span>
                </div>
              </div>

              {/* Card principal */}
              <div className="relative bg-gradient-to-br from-bistro-dark/80 to-bistro-dark/40 border-2 border-gold/30 rounded-3xl p-8 sm:p-12 overflow-hidden">
                <div className="relative z-10">
                  {/* Badge */}
                  <div className="flex justify-center mb-8">
                    <motion.div
                      className="inline-flex items-center gap-2 bg-gold text-charcoal px-5 py-2 rounded-full text-sm font-medium uppercase tracking-wider"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Tag className="w-4 h-4" />
                      Promoción de Hoy
                    </motion.div>
                  </div>

                  {/* Título */}
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold text-center mb-6 tracking-tight">
                    {todayPromo.titulo}
                  </h2>

                  {/* Descripción */}
                  <p className="text-cream/70 text-lg text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                    {todayPromo.descripcion}
                  </p>

                  {/* Precios */}
                  {(todayPromo.precio_normal || todayPromo.precio_promo) && (
                    <div className="flex items-center justify-center gap-8 mb-10">
                      {todayPromo.precio_normal && (
                        <div className="text-center">
                          <p className="text-xs text-cream/40 uppercase tracking-wider mb-1">Precio regular</p>
                          <p className="font-serif text-2xl text-cream/40 line-through">{todayPromo.precio_normal}</p>
                        </div>
                      )}
                      {todayPromo.precio_promo && (
                        <div className="text-center">
                          <p className="text-xs text-gold uppercase tracking-wider mb-1">Hoy</p>
                          <p className="font-serif text-4xl text-gold font-medium">{todayPromo.precio_promo}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Condiciones */}
                  {todayPromo.condiciones && (
                    <p className="text-center text-cream/35 text-sm italic mb-10">
                      {todayPromo.condiciones}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="text-center">
                    <motion.a
                      href="https://wa.me/522206224222?text=Hola,%20me%20interesa%20la%20promoci%C3%B3n%20del%20d%C3%ADa"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-sans text-sm uppercase tracking-[0.15em] font-medium transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    >
                      Reservar Ahora
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Gift className="w-16 h-16 text-gold/30 mx-auto mb-6" />
              <h3 className="font-serif text-2xl text-gold/60 mb-3">Sin promoción especial hoy</h3>
              <p className="text-cream/40 mb-8">Pero te esperamos con nuestro menú completo y la mejor experiencia.</p>
              <Link href="/bistro" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
                Ver Menú del Bistró <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}

          {/* ═══ PRÓXIMAS PROMOS ═══ */}
          {upcomingPromos.length > 0 && (
            <motion.div
              className="mt-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-10">
                <h3 className="font-serif text-2xl text-gold mb-2">Próximas Promociones</h3>
                <p className="text-cream/40 text-sm">Lo que viene en los siguientes días</p>
              </div>

              <div className="space-y-4">
                {upcomingPromos.map((promo, index) => (
                  <motion.div
                    key={`${promo.fecha}-${promo.titulo}`}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-cream/5 border border-gold/10 rounded-xl hover:border-gold/25 transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 text-center sm:text-left sm:min-w-[160px]">
                      <p className="text-gold/70 text-xs uppercase tracking-wider">{formatDate(promo.fecha)}</p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-gold/15" />
                    <div className="flex-1">
                      <h4 className="font-serif text-lg text-cream mb-1">{promo.titulo}</h4>
                      <p className="text-cream/40 text-sm">{promo.descripcion}</p>
                    </div>
                    {promo.precio_promo && (
                      <div className="flex-shrink-0">
                        <span className="font-serif text-xl text-gold">{promo.precio_promo}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Link a eventos */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 text-gold/60 hover:text-gold transition-colors text-sm uppercase tracking-wider"
            >
              Ver calendario completo de eventos <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
