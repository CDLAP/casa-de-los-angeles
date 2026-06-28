'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users, MapPin, ShoppingBag, Camera } from 'lucide-react'
import WhatsAppIcon from '@/components/mercado/WhatsAppIcon'

const WHATSAPP = '522206224222'
const WA_MSG = encodeURIComponent(
  'Hola, quiero asegurar mi lugar en el Mercado de los Ángeles — Edición Julio (vintage, de colección, moda y diseño) en Casa de los Ángeles. Mi marca se llama: __ y vendo: __.'
)

const FEATURES = [
  { icon: Users, label: 'Gran flujo de visitantes' },
  { icon: MapPin, label: 'Ubicación privilegiada' },
  { icon: ShoppingBag, label: 'Ambiente único y curado' },
  { icon: Camera, label: 'Promoción en redes y medios' },
]

export default function JulioBanner() {
  return (
    <section
      id="inicio"
      aria-label="Convocatoria Mercado de los Ángeles — Edición Julio"
      className="relative w-full bg-cream pt-16 md:pt-[84px]"
    >
      {/* Marco 16:9 (en desktop define la altura; en móvil crece con el contenido) */}
      <div className="relative w-full overflow-hidden md:aspect-[16/9] md:max-h-[calc(100dvh-84px)]">
        {/* Fondo decorativo — objetos a los lados, centro libre */}
        <Image
          src="/images/mercado/backjulio.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Glow cream centrado para legibilidad */}
        <div className="absolute inset-0 bg-gradient-radial from-cream via-cream/75 to-transparent" />
        {/* Velo extra en móvil */}
        <div className="absolute inset-0 bg-cream/25 md:bg-transparent" />

        {/* Contenido — centrado dentro del 16:9 */}
        <div className="relative md:absolute md:inset-0 flex items-center justify-center">
          <motion.div
            className="w-full max-w-3xl mx-auto px-5 text-center py-10 md:py-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-2 md:mb-3">
              <Image
                src="/images/mercado/mdla-horizontal.png"
                alt="Mercado de los Ángeles"
                width={1200}
                height={610}
                priority
                className="w-[230px] sm:w-[270px] md:w-[300px] h-auto"
              />
            </div>

            {/* CONVOCATORIA */}
            <h2
              className="font-serif not-italic text-gold-dark text-3xl md:text-5xl mb-2"
              style={{ letterSpacing: '0.08em' }}
            >
              CONVOCATORIA
            </h2>

            {/* Para nuestro mercado */}
            <div className="flex items-center justify-center gap-3 mb-2 md:mb-3">
              <span className="w-8 h-px bg-gold/50" />
              <span className="font-sans uppercase tracking-[0.3em] text-charcoal-50 text-[0.6rem] md:text-xs">
                Para nuestro mercado
              </span>
              <span className="w-8 h-px bg-gold/50" />
            </div>

            {/* Vintage, de colección, moda y diseño */}
            <h3
              className="font-serif not-italic text-charcoal text-xl md:text-3xl leading-tight mb-3"
              style={{ letterSpacing: '-0.01em' }}
            >
              Vintage, de colección<br />moda y diseño
            </h3>

            {/* Edición Julio */}
            <div className="flex justify-center mb-3 md:mb-4">
              <span className="inline-flex items-center bg-bistro-300 text-white px-5 py-1.5 rounded-sm font-sans uppercase tracking-[0.25em] text-[0.7rem] md:text-sm shadow-sm">
                Edición Julio
              </span>
            </div>

            {/* Descripción */}
            <p className="text-charcoal-50 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-4 md:mb-5">
              Aprovecha las ventas vacacionales en el mero Centro Histórico de Puebla,
              un punto clave para turistas y locales.
            </p>

            {/* Beneficios */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4 max-w-xl mx-auto mb-4 md:mb-5">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gold/10 border border-gold/20">
                    <Icon className="w-4 h-4 text-gold-dark" strokeWidth={1.5} />
                  </span>
                  <span className="text-charcoal-50 text-[0.7rem] md:text-xs leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Oferta — fila compacta */}
            <div className="mb-4 md:mb-5">
              <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
                <span
                  className="font-serif not-italic text-charcoal text-3xl md:text-4xl leading-none"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  $4,000
                </span>
                <span className="font-sans uppercase tracking-[0.2em] text-charcoal-50 text-sm">
                  Pesos
                </span>
                <span className="text-gold/60">·</span>
                <span className="font-sans uppercase tracking-[0.2em] text-gold-dark text-xs md:text-sm">
                  12 fechas en total
                </span>
              </div>
              <p className="font-sans uppercase tracking-[0.2em] text-bistro-500 text-[0.6rem] md:text-xs mt-1.5">
                Promoción válida hasta 30 de junio · Precio especial por todo julio
              </p>
            </div>

            {/* CTA WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-filled inline-flex items-center gap-3"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Asegura tu lugar por WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
