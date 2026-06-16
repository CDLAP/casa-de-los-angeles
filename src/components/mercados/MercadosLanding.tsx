'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Check,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Camera,
  Clock,
  CalendarDays,
} from 'lucide-react'
import WhatsAppIcon from '@/components/mercado/WhatsAppIcon'
import { GALLERY_PHOTOS } from '@/data/gallery-photos'

/* ============================================================
   DATA
   ============================================================ */

// CLIENTE: re-activar cuando Mercado de la Luna esté listo
const SHOW_LUNA = false

const WHATSAPP = '522206224222'
const WHATSAPP_DISPLAY = '220 6224 222'

const HERO_MSG = encodeURIComponent(
  'Hola, quiero información para participar en los mercados de Casa de los Ángeles. Mi marca se llama: __ y vendo: __.'
)

const FINAL_MSG = encodeURIComponent(
  'Hola, quiero participar en los mercados de Casa de los Ángeles. Mi nombre es: __ Mi marca se llama: __ Vendo: __ Me interesa: Mercado de la Luna / Mercado de los Ángeles / ambos.'
)

const MARKETS = [
  {
    id: 'luna',
    name: 'Mercado de la Luna',
    schedule: [
      { day: 'Viernes', hours: '4:00 PM — 9:00 PM' },
    ],
    concept:
      'Mercado nocturno. Ambiente especial, música, velas, mezcal y recorrido dentro de la casa histórica.',
    logo: '/images/mercado/mercado-de-la-luna-logo.png',
    href: '/mercado-de-los-angeles',
    isExternal: false,
    ctaLabel: 'Ver detalles',
  },
  {
    id: 'angeles',
    name: 'Mercado de los Ángeles',
    schedule: [
      { day: 'Viernes', hours: '5:00 PM — 9:00 PM' },
      { day: 'Sábado y Domingo', hours: '11:00 AM — 8:00 PM' },
    ],
    concept:
      'Turismo, café, compras, recorrido de la casa y movimiento constante durante el día.',
    logo: '/images/mercado/mercado-de-los-angeles-logo.png',
    href: `https://wa.me/522206224222?text=${encodeURIComponent('Hola, quiero información sobre el Mercado de los Ángeles (viernes 5–9pm, sábado y domingo 11am–8pm) en Casa de los Ángeles. Mi marca se llama: __ y vendo: __.')}`,
    isExternal: true,
    ctaLabel: 'Hablar por WhatsApp',
  },
]

const VISIBLE_MARKETS = SHOW_LUNA ? MARKETS : MARKETS.filter(m => m.id !== 'luna')

const RAZONES = [
  'Casa histórica en el Centro de Puebla',
  'Recorrido natural dentro del espacio',
  'Mesa y silla incluidas',
  'Diferentes zonas según visibilidad',
  'Comunidad de expositores',
  'Opción de primera participación',
  'Opción de expositor residente',
]

const TARIFAS = [
  {
    name: 'Primera participación',
    price: '300',
    description: 'Mesa y silla incluidas. Para marcas que quieren probar el mercado.',
  },
  {
    name: 'Tarifa regular',
    price: '500',
    description: 'Por fecha, según zona y disponibilidad.',
  },
  {
    name: 'Expositor residente',
    price: null,
    description: 'Tarifa preferencial para marcas que participan de forma constante.',
  },
]

/* ============================================================
   COMPONENT
   ============================================================ */

export default function MercadosLanding() {
  return (
    <>
      {/* ==========================================================
          1. HERO
          ========================================================== */}
      <section className="section bg-cream relative overflow-hidden pt-[160px] md:pt-[260px]">
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm mb-6"
          >
            Centro Histórico de Puebla
          </motion.p>

          {/* Title — Participa en nuestro mercado */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-display-md text-charcoal mb-4"
          >
            Participa en {VISIBLE_MARKETS.length === 1 ? 'nuestro mercado' : 'nuestros mercados'}
          </motion.h1>

          {/* Connector — dentro de */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-sans uppercase tracking-[0.3em] text-charcoal-50 text-xs md:text-sm mb-4"
          >
            dentro de
          </motion.p>

          {/* Brand emphasis */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-display-lg text-gold-dark mb-10"
          >
            Casa de los Ángeles
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-charcoal-50 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Una casa histórica del siglo XVIII donde las marcas forman parte de una
            experiencia, no de un bazar tradicional.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <a
              href={`https://wa.me/${WHATSAPP}?text=${HERO_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-filled inline-flex items-center gap-3"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Reservar por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================
          2. NUESTRO MERCADO — single big card
          ========================================================== */}
      <section className="section bg-cream-200">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm mb-4 text-center">
              El mercado
            </p>
            <h2 className="font-serif text-display-md text-gold-dark text-center mb-12">
              {VISIBLE_MARKETS.length === 1 ? 'Nuestro mercado' : 'Nuestros mercados'}
            </h2>

            <div className={`grid grid-cols-1 ${VISIBLE_MARKETS.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'} gap-8`}>
              {VISIBLE_MARKETS.map((market, i) => {
                const cardInner = (
                  <div className="bg-white border border-gold/20 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col text-center group-hover:-translate-y-1 will-change-transform">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                      <img
                        src={market.logo}
                        alt={market.name}
                        className="w-full max-w-[240px] h-auto select-none"
                        draggable={false}
                      />
                    </div>

                    {/* Schedule blocks — uno por cada bloque de horario */}
                    <div className="mb-6 space-y-4">
                      {market.schedule.map((s, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-center gap-2 mb-1.5">
                            <CalendarDays className="w-5 h-5 text-gold-dark" strokeWidth={1.5} />
                            <p className="font-sans uppercase tracking-[0.22em] text-gold-dark text-xs md:text-sm font-medium">
                              {s.day}
                            </p>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Clock className="w-5 h-5 text-charcoal-50" strokeWidth={1.5} />
                            <p className="font-sans text-charcoal text-lg md:text-xl font-medium">
                              {s.hours}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Concept */}
                    <p className="text-charcoal-50 text-base md:text-lg leading-relaxed flex-1 max-w-md mx-auto">
                      {market.concept}
                    </p>

                    {/* CTA hint */}
                    <span className="inline-flex items-center justify-center gap-2 mt-8 font-sans uppercase tracking-[0.22em] text-gold-dark text-xs md:text-sm font-medium">
                      {market.ctaLabel}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                )

                return (
                  <motion.div
                    key={market.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
                    className="flex"
                  >
                    {market.isExternal ? (
                      <a
                        href={market.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block w-full cursor-pointer"
                      >
                        {cardInner}
                      </a>
                    ) : (
                      <Link href={market.href} className="group block w-full cursor-pointer">
                        {cardInner}
                      </Link>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================
          3. POR QUÉ FUNCIONA
          ========================================================== */}
      <section className="section bg-cream">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm mb-4 text-center">
              La experiencia
            </p>
            <h2 className="font-serif text-display-md text-gold-dark text-center mb-6">
              Por qué funciona
            </h2>

            <p className="text-charcoal-50 text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto mb-12">
              Casa de los Ángeles funciona distinto porque la gente recorre la casa y
              descubre las marcas durante la experiencia. Muchas personas pasan por las
              mesas al entrar y también al salir.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 max-w-2xl mx-auto">
              {RAZONES.map((razon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex items-center justify-center w-8 h-8 bg-gold/10 rounded-full flex-shrink-0">
                    <Check className="w-4 h-4 text-gold-dark" strokeWidth={2} />
                  </span>
                  <span className="text-charcoal text-base md:text-lg">{razon}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================
          4. ASÍ SE PUEDE VER TU ESPACIO — Swipe carousel with polaroid cards
          ========================================================== */}
      <section className="section bg-cream-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="container-custom max-w-5xl">
            <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm mb-4 text-center">
              Galería
            </p>
            <h2 className="font-serif text-display-md text-gold-dark text-center mb-6">
              Así se puede ver tu espacio
            </h2>
            <p className="text-charcoal-50 text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto mb-12">
              Te recomendamos venir con una presentación cuidada, precios visibles y un
              montaje fácil de recorrer.
            </p>
          </div>

          {/* Carousel — polaroid cards */}
          {GALLERY_PHOTOS.length > 0 ? (
            <>
              <div className="overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
                <div className="flex gap-5 md:gap-6 px-[10vw] sm:px-[15vw] md:px-[calc((100vw-1024px)/2)] py-4">
                  {GALLERY_PHOTOS.map((photo, i) => (
                    <motion.div
                      key={photo.src}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.5, delay: Math.min(0.04 * i, 0.3) }}
                      className="snap-center shrink-0 w-[78vw] sm:w-[62vw] md:w-[400px] bg-white rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-grab active:cursor-grabbing"
                    >
                      <div className="aspect-[4/5] overflow-hidden rounded-xl bg-cream-200">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                          draggable={false}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="container-custom">
                <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm text-center mt-10">
                  ← Desliza para ver más →
                </p>
              </div>
            </>
          ) : (
            <div className="container-custom max-w-4xl">
              <div className="bg-white border border-gold/20 rounded-2xl py-16 md:py-20 px-6 flex flex-col items-center justify-center text-center shadow-lg">
                <div className="flex items-center justify-center w-14 h-14 bg-gold/10 rounded-full mb-5">
                  <Camera className="w-7 h-7 text-gold-dark" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-display-sm text-gold-dark mb-3">
                  Galería en construcción
                </h3>
                <p className="text-charcoal-50 text-base md:text-lg leading-relaxed max-w-md">
                  Las fotos de los montajes se sumarán próximamente.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* ==========================================================
          5. TARIFAS
          ========================================================== */}
      <section className="section bg-cream">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm mb-4 text-center">
              Participación
            </p>
            <h2 className="font-serif text-display-md text-gold-dark text-center mb-12">
              Modalidades de participación
            </h2>

            <div className="bg-white border border-gold/20 rounded-2xl shadow-lg overflow-hidden">
              {TARIFAS.map((tarifa, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className={`p-6 md:p-8 ${i < TARIFAS.length - 1 ? 'border-b border-cream-300' : ''}`}
                >
                  <h3 className="font-sans uppercase tracking-[0.18em] text-charcoal text-sm md:text-base font-semibold mb-2 not-italic">
                    {tarifa.name}
                  </h3>
                  <p className="text-charcoal-50 text-base md:text-lg leading-relaxed">
                    {tarifa.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="text-charcoal-50 italic text-center text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
              La ubicación se asigna según zona, disponibilidad y orden de pago.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================
          6. LINEAMIENTOS Y TIPS
          ========================================================== */}
      <section className="section bg-cream-200">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <Link
                href="/mercado-de-los-angeles/informacion"
                className="group bg-white border border-gold/20 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-6 md:p-7 flex items-center gap-5"
              >
                <span className="flex items-center justify-center w-14 h-14 bg-gold/10 rounded-full flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-gold-dark" strokeWidth={1.5} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-serif text-xl md:text-2xl text-charcoal leading-tight mb-1.5">
                    Lineamientos para expositores
                  </span>
                  <span className="block text-charcoal-50 text-sm md:text-base leading-snug not-italic">
                    Reglas, requisitos y proceso
                  </span>
                </span>
                <ArrowRight className="w-5 h-5 text-charcoal-50 group-hover:text-gold-dark transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
              </Link>

              <Link
                href="/mercado-de-los-angeles/tips"
                className="group bg-white border border-gold/20 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-6 md:p-7 flex items-center gap-5"
              >
                <span className="flex items-center justify-center w-14 h-14 bg-gold/10 rounded-full flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Lightbulb className="w-6 h-6 text-gold-dark" strokeWidth={1.5} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-serif text-xl md:text-2xl text-charcoal leading-tight mb-1.5">
                    Tips para vender mejor
                  </span>
                  <span className="block text-charcoal-50 text-sm md:text-base leading-snug not-italic">
                    Guía práctica para expositores
                  </span>
                </span>
                <ArrowRight className="w-5 h-5 text-charcoal-50 group-hover:text-gold-dark transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================
          7. CTA FINAL
          ========================================================== */}
      <section className="section bg-cream">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="text-center bg-emerald/5 border border-emerald/20 rounded-2xl p-10 md:p-14"
          >
            <p className="font-sans uppercase tracking-[0.3em] text-emerald text-xs md:text-sm mb-4">
              Contacto directo
            </p>
            <h2 className="font-serif text-display-md text-emerald-forest mb-6">
              ¿Quieres participar?
            </h2>

            <p className="text-charcoal-50 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
              Escríbenos y te orientamos para ver qué espacio puede funcionar mejor para tu
              marca.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP}?text=${FINAL_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-filled inline-flex items-center gap-3 mb-6"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {WHATSAPP_DISPLAY}
            </a>

            <p className="text-charcoal-50 text-sm md:text-base mt-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Casa+de+los+Angeles+Palafox+222+Puebla"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-dark transition-colors underline decoration-gold/30 hover:decoration-gold not-italic"
              >
                Av. Don Juan de Palafox y Mendoza 222 · Centro Histórico de Puebla
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
