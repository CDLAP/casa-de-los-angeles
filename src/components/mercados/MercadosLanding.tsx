'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Check,
  Crown,
  Sparkles,
  MapPinned,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Camera,
} from 'lucide-react'
import WhatsAppIcon from '@/components/mercado/WhatsAppIcon'
import { GALLERY_PHOTOS } from '@/data/gallery-photos'

/* ============================================================
   DATA — single source of truth from Elisabeth's brief
   ============================================================ */

// CLIENTE: re-activar cuando Mercado de la Luna esté listo
const SHOW_LUNA = false

// Gallery photos viven en src/data/gallery-photos.ts (auto-generado).
// Para agregar fotos: pon archivos en /public/images/mercado/gallery/ y corre `npm run gallery`
// (o solo push — corre automático antes de cada build de Vercel).

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
    day: 'Viernes',
    hours: '4:00 PM — 9:00 PM',
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
    day: 'Viernes, Sábado y Domingo',
    hours: '11:00 AM — 8:00 PM',
    concept:
      'Turismo, café, compras, recorrido de la casa y movimiento constante durante el día.',
    logo: '/images/mercado/mercado-de-los-angeles-logo.png',
    href: `https://wa.me/522206224222?text=${encodeURIComponent('Hola, quiero información sobre el Mercado de los Ángeles (viernes, sábado y domingo) en Casa de los Ángeles. Mi marca se llama: __ y vendo: __.')}`,
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

const ZONAS = [
  {
    id: 'signature',
    name: 'Espacios Signature',
    description: 'Primeras mesas visibles al entrar. Mayor impacto visual.',
    Icon: Crown,
  },
  {
    id: 'premium',
    name: 'Zona Premium',
    description:
      'Ubicaciones principales dentro del recorrido de la casa. Mayor visibilidad y movimiento.',
    Icon: Sparkles,
  },
  {
    id: 'maravillas',
    name: 'Zona Maravillas',
    sublabel: 'Segundo Patio',
    description:
      'Espacios más accesibles para marcas que quieren iniciar o probar con menor inversión.',
    Icon: MapPinned,
  },
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
      <section className="relative pt-[160px] md:pt-[300px] pb-12 md:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[60vh] opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at center top, rgba(201, 169, 97, 0.18) 0%, rgba(201, 169, 97, 0.04) 35%, transparent 70%)',
            }}
          />
        </div>

        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-[13px] mb-7"
          >
            Casa de los Ángeles · Centro Histórico de Puebla
          </motion.p>

          {/* Title — three-tier editorial composition */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6 md:mb-7"
          >
            <span
              className="block font-serif not-italic text-cream leading-tight"
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(1.75rem, 4.4vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '0.005em',
              }}
            >
              Participa en {VISIBLE_MARKETS.length === 1 ? 'nuestro mercado' : 'nuestros mercados'}
            </span>
            <span
              className="block font-serif italic text-cream/70 my-2.5 md:my-3.5"
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(0.9rem, 1.6vw, 1.125rem)',
                fontWeight: 400,
                letterSpacing: '0.04em',
              }}
            >
              dentro de
            </span>
            <span
              className="block font-serif not-italic text-gold leading-[1.05]"
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(2.25rem, 5.8vw, 4.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.005em',
              }}
            >
              Casa de los Ángeles
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="font-serif italic text-cream/90 leading-[1.5] mb-9 md:mb-11 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1.125rem, 2.4vw, 1.5rem)' }}
          >
            Una casa histórica en el Centro de Puebla donde las marcas forman parte de una
            experiencia, no de un bazar tradicional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <a
              href={`https://wa.me/${WHATSAPP}?text=${HERO_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-charcoal px-7 py-4 md:px-9 md:py-5 text-sm md:text-base uppercase tracking-[0.2em] font-sans font-medium transition-all duration-500"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Reservar / Hablar por WhatsApp
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================
          2. NUESTROS MERCADOS — cards
          ========================================================== */}
      <section className="container-custom py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </div>

          <h2
            className="not-italic text-cream text-center mb-10 md:mb-12 leading-tight"
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(2rem, 4.8vw, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '0.005em',
            }}
          >
            {VISIBLE_MARKETS.length === 1 ? 'Nuestro mercado' : 'Nuestros mercados'}
          </h2>

          <div className={`grid grid-cols-1 ${VISIBLE_MARKETS.length > 1 ? 'md:grid-cols-2' : 'max-w-md mx-auto'} gap-6 md:gap-8`}>
            {VISIBLE_MARKETS.map((market, i) => {
              const cardInner = (
                <div className="p-7 md:p-9 flex flex-col flex-1 text-center h-full">
                  <h3 className="flex justify-center mb-6 md:mb-7">
                    <span className="sr-only">{market.name}</span>
                    <img
                      src={market.logo}
                      alt={market.name}
                      className="w-full max-w-[220px] md:max-w-[260px] h-auto select-none"
                      style={{
                        filter: 'drop-shadow(0 0 30px rgba(201, 169, 97, 0.18)) drop-shadow(0 2px 12px rgba(0, 0, 0, 0.25))',
                      }}
                      draggable={false}
                    />
                  </h3>

                  <div className="mb-5 space-y-1.5">
                    <p className="font-sans uppercase tracking-[0.22em] text-gold text-xs md:text-[13px]">
                      {market.day}
                    </p>
                    <p className="font-serif not-italic text-gold/90 font-bold" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)' }}>
                      {market.hours}
                    </p>
                  </div>

                  <p className="font-sans text-cream/90 text-[16px] md:text-[17px] leading-[1.65] flex-1 max-w-sm mx-auto">
                    {market.concept}
                  </p>

                  <span className="inline-flex items-center justify-center gap-2 mt-6 font-sans uppercase tracking-[0.22em] text-gold group-hover:text-gold-light text-xs md:text-[13px] transition-colors duration-300">
                    {market.ctaLabel}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              )

              const cardClasses = "group block relative flex flex-col h-full bg-[#0F1A2E]/50 border border-cream/15 hover:border-gold/60 hover:bg-[#0F1A2E]/70 transition-all duration-500 cursor-pointer"

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
                      className={cardClasses}
                    >
                      {cardInner}
                    </a>
                  ) : (
                    <Link href={market.href} className={cardClasses}>
                      {cardInner}
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* ==========================================================
          3. POR QUÉ FUNCIONA
          ========================================================== */}
      <section className="container-custom py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </div>

          <h2
            className="not-italic text-cream text-center mb-7 leading-tight"
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(2rem, 4.8vw, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '0.005em',
            }}
          >
            Por qué funciona
          </h2>

          <p className="font-serif italic text-cream/90 text-center text-[17px] md:text-[19px] leading-[1.65] max-w-2xl mx-auto mb-9 md:mb-11">
            Casa de los Ángeles funciona distinto porque la gente recorre la casa y
            descubre las marcas durante la experiencia. Muchas personas pasan por las
            mesas al entrar y también al salir.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-2xl mx-auto">
            {RAZONES.map((razon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="font-sans text-cream text-[16px] md:text-[17px]">
                  {razon}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========================================================
          4. ASÍ SE PUEDE VER TU ESPACIO — Swipe carousel
          ========================================================== */}
      <section className="py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="container-custom">
            <div className="flex items-center justify-center gap-3 mb-7">
              <div className="w-12 md:w-20 h-px bg-gold/50" />
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <div className="w-12 md:w-20 h-px bg-gold/50" />
            </div>

            <h2
              className="not-italic text-cream text-center mb-5 leading-tight"
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(2rem, 4.8vw, 3.25rem)',
                fontWeight: 700,
                letterSpacing: '0.005em',
              }}
            >
              Así se puede ver tu espacio
            </h2>

            <p className="font-sans text-cream/85 text-center text-[16px] md:text-[17px] leading-[1.65] max-w-2xl mx-auto mb-10 md:mb-12">
              Te recomendamos venir con una presentación cuidada, precios visibles y un
              montaje fácil de recorrer.
            </p>
          </div>

          {/* Swipe carousel — horizontal snap scroll, edges bleed for premium feel */}
          {GALLERY_PHOTOS.length > 0 ? (
            <>
              <div
                className="overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex gap-3 md:gap-4 px-[10vw] sm:px-[15vw] md:px-[calc((100vw-880px)/2)]">
                  {GALLERY_PHOTOS.map((photo, i) => (
                    <motion.div
                      key={photo.src}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.5, delay: Math.min(0.04 * i, 0.3) }}
                      className="snap-center shrink-0 w-[80vw] sm:w-[65vw] md:w-[420px] aspect-[4/5] overflow-hidden bg-[#0F1A2E]/40 group cursor-grab active:cursor-grabbing"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                        draggable={false}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="container-custom">
                <p className="text-center font-sans uppercase tracking-[0.3em] text-cream/45 text-[10px] md:text-[11px] mt-7 md:mt-9">
                  ← Desliza para ver más →
                </p>
              </div>
            </>
          ) : (
            <div className="container-custom">
              <div className="border border-gold/20 bg-[#0F1A2E]/40 py-16 md:py-20 px-6 flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
                <Camera className="w-10 h-10 text-gold/40 mb-4" strokeWidth={1.5} />
                <p className="font-serif italic text-cream/70 text-lg md:text-xl leading-snug mb-2">
                  Galería en construcción
                </p>
                <p className="font-sans text-cream/55 text-sm max-w-md leading-[1.65]">
                  Las fotos de los montajes se sumarán próximamente.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* ==========================================================
          5. TIPOS DE ESPACIOS — 3 zones
          ========================================================== */}
      <section className="container-custom py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </div>

          <h2
            className="not-italic text-cream text-center mb-10 md:mb-12 leading-tight"
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(2rem, 4.8vw, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '0.005em',
            }}
          >
            Tipos de espacios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {ZONAS.map((zona, i) => (
              <motion.div
                key={zona.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="bg-[#0F1A2E]/40 border border-cream/15 hover:border-gold/50 p-6 md:p-7 transition-all duration-500"
              >
                <div className="flex justify-start mb-5">
                  <div className="w-12 h-12 flex items-center justify-center border border-gold/40 bg-gold/5">
                    <zona.Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                  </div>
                </div>

                <h3
                  className="not-italic text-cream mb-2 leading-tight"
                  style={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)',
                    fontWeight: 700,
                    letterSpacing: '0.005em',
                  }}
                >
                  {zona.name}
                </h3>

                {zona.sublabel && (
                  <p className="font-sans uppercase tracking-[0.22em] text-gold/85 text-[11px] md:text-xs mb-3">
                    {zona.sublabel}
                  </p>
                )}

                <p className="font-sans text-cream/85 text-[15px] md:text-base leading-[1.6]">
                  {zona.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==========================================================
          6. TARIFAS
          ========================================================== */}
      <section className="container-custom py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </div>

          <h2
            className="not-italic text-cream text-center mb-10 md:mb-12 leading-tight"
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(2rem, 4.8vw, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '0.005em',
            }}
          >
            Tarifas
          </h2>

          <div className="space-y-5 max-w-2xl mx-auto">
            {TARIFAS.map((tarifa, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-5 md:gap-6 border-b border-cream/15 pb-5"
              >
                <div className="flex-shrink-0 min-w-[110px] md:min-w-[150px] text-right">
                  {tarifa.price ? (
                    <>
                      <p className="font-sans uppercase tracking-[0.2em] text-cream/55 text-[10px] md:text-[11px] mb-1">
                        Desde
                      </p>
                      <p
                        className="font-serif not-italic text-gold font-bold leading-none"
                        style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.5rem)', letterSpacing: '0.005em' }}
                      >
                        ${tarifa.price}
                        <span
                          className="font-sans text-cream/55 align-baseline ml-1"
                          style={{ fontSize: '0.32em', letterSpacing: '0.15em', fontWeight: 500 }}
                        >
                          MXN
                        </span>
                      </p>
                    </>
                  ) : (
                    <p
                      className="font-serif italic text-gold/85 leading-tight"
                      style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
                    >
                      Preferencial
                    </p>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-sans uppercase tracking-[0.18em] text-cream text-sm md:text-base font-medium mb-1.5">
                    {tarifa.name}
                  </h3>
                  <p className="font-sans text-cream/80 text-[15px] md:text-base leading-[1.55]">
                    {tarifa.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="font-sans italic text-cream/65 text-center text-[15px] md:text-base mt-8 max-w-xl mx-auto leading-[1.65]">
            La ubicación se asigna según zona, disponibilidad y orden de pago.
          </p>
        </motion.div>
      </section>

      {/* ==========================================================
          7. LINEAMIENTOS Y TIPS — two cards
          ========================================================== */}
      <section className="container-custom py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <Link
              href="/mercado-de-los-angeles/informacion"
              className="group relative flex items-center gap-4 border border-cream/15 hover:border-gold bg-[#0F1A2E]/40 hover:bg-[#0F1A2E]/70 px-6 py-5 md:px-7 md:py-6 transition-all duration-500"
            >
              <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 border border-gold/40 group-hover:border-gold text-gold flex-shrink-0 transition-colors">
                <BookOpen className="w-5 h-5" />
              </span>
              <span className="flex-1 min-w-0">
                <span
                  className="block not-italic text-cream leading-tight"
                  style={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontSize: 'clamp(1.125rem, 1.9vw, 1.375rem)',
                    fontWeight: 700,
                    letterSpacing: '0.005em',
                  }}
                >
                  Ver lineamientos para expositores
                </span>
                <span className="block font-sans text-cream/75 text-[14px] md:text-[15px] mt-1 leading-snug">
                  Reglas, requisitos y proceso
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-cream/50 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
            </Link>

            <Link
              href="/mercado-de-los-angeles/tips"
              className="group relative flex items-center gap-4 border border-cream/15 hover:border-gold bg-[#0F1A2E]/40 hover:bg-[#0F1A2E]/70 px-6 py-5 md:px-7 md:py-6 transition-all duration-500"
            >
              <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 border border-gold/40 group-hover:border-gold text-gold flex-shrink-0 transition-colors">
                <Lightbulb className="w-5 h-5" />
              </span>
              <span className="flex-1 min-w-0">
                <span
                  className="block not-italic text-cream leading-tight"
                  style={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontSize: 'clamp(1.125rem, 1.9vw, 1.375rem)',
                    fontWeight: 700,
                    letterSpacing: '0.005em',
                  }}
                >
                  Ver tips para vender mejor
                </span>
                <span className="block font-sans text-cream/75 text-[14px] md:text-[15px] mt-1 leading-snug">
                  Guía práctica para expositores
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-cream/50 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ==========================================================
          8. CTA FINAL
          ========================================================== */}
      <section className="container-custom py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </div>

          <h2
            className="not-italic text-cream mb-5 leading-tight"
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '0.005em',
            }}
          >
            ¿Quieres participar?
          </h2>

          <p className="font-serif italic text-cream/90 text-[17px] md:text-[19px] leading-[1.65] mb-9 md:mb-10 max-w-xl mx-auto">
            Escríbenos y te orientamos para ver qué espacio puede funcionar mejor para tu
            marca.
          </p>

          <a
            href={`https://wa.me/${WHATSAPP}?text=${FINAL_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 bg-gold hover:bg-gold-light text-charcoal px-7 py-4 md:px-9 md:py-5 transition-all duration-500"
          >
            <WhatsAppIcon className="w-6 h-6 md:w-7 md:h-7" />
            <span className="flex flex-col items-start">
              <span
                className="font-serif not-italic font-bold leading-none mb-1"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', letterSpacing: '0.005em' }}
              >
                {WHATSAPP_DISPLAY}
              </span>
              <span className="font-sans uppercase tracking-[0.2em] text-charcoal/80 text-[10px] md:text-[11px]">
                Hablar por WhatsApp →
              </span>
            </span>
          </a>

          <p className="font-sans text-cream/55 text-sm mt-7 max-w-md mx-auto leading-[1.65]">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Casa+de+los+Angeles+Palafox+222+Puebla"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300"
            >
              Av. Don Juan de Palafox y Mendoza 222 · Centro Histórico de Puebla
            </a>
          </p>
        </motion.div>
      </section>
    </>
  )
}
