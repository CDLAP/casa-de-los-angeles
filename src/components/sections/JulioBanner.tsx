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
      aria-label="Convocatoria Mercado de los Ángeles — Edición Julio"
      className="relative w-full overflow-hidden bg-cream pt-24 md:pt-[120px] pb-16 md:pb-24"
    >
      {/* Fondo decorativo (objetos a los lados, centro libre) */}
      <div className="absolute inset-0">
        <Image
          src="/images/mercado/backjulio.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Glow cream centrado para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-radial from-cream via-cream/80 to-transparent" />
        {/* Velo extra en móvil donde los objetos se acercan al centro */}
        <div className="absolute inset-0 bg-cream/30 md:bg-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container-custom">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo Mercado de los Ángeles */}
          <motion.div
            className="flex justify-center mb-6 md:mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <Image
              src="/images/mercado/mdla-horizontal.png"
              alt="Mercado de los Ángeles"
              width={1200}
              height={610}
              priority
              className="w-[280px] sm:w-[360px] md:w-[440px] h-auto"
            />
          </motion.div>

          {/* CONVOCATORIA */}
          <h2
            className="font-serif not-italic text-gold-dark text-4xl md:text-6xl mb-4"
            style={{ letterSpacing: '0.08em' }}
          >
            CONVOCATORIA
          </h2>

          {/* Para nuestro mercado */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-gold/50" />
            <span className="font-sans uppercase tracking-[0.3em] text-charcoal-50 text-[0.65rem] md:text-xs">
              Para nuestro mercado
            </span>
            <span className="w-8 h-px bg-gold/50" />
          </div>

          {/* Vintage, de colección, moda y diseño */}
          <h3
            className="font-serif not-italic text-charcoal text-2xl md:text-4xl leading-tight mb-6"
            style={{ letterSpacing: '-0.01em' }}
          >
            Vintage, de colección<br />moda y diseño
          </h3>

          {/* Edición Julio */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center bg-bistro-300 text-white px-6 py-2 rounded-sm font-sans uppercase tracking-[0.25em] text-xs md:text-sm shadow-sm">
              Edición Julio
            </span>
          </div>

          {/* Descripción */}
          <p className="text-charcoal-50 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Aprovecha las ventas vacacionales en el mero Centro Histórico de Puebla,
            un punto clave para turistas y locales.
          </p>

          {/* Beneficios */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 max-w-xl mx-auto mb-10">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gold/10 border border-gold/20">
                  <Icon className="w-5 h-5 text-gold-dark" strokeWidth={1.5} />
                </span>
                <span className="text-charcoal-50 text-xs md:text-sm leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Oferta */}
          <div className="bg-bistro-50/90 border border-bistro-200/60 rounded-2xl px-6 py-6 md:px-10 md:py-8 mb-8 backdrop-blur-sm">
            <p className="font-sans uppercase tracking-[0.25em] text-bistro-500 text-[0.65rem] md:text-xs mb-3">
              Promoción válida hasta 30 de junio
            </p>
            <div className="flex items-end justify-center gap-2 mb-2">
              <span
                className="font-serif not-italic text-charcoal text-4xl md:text-5xl leading-none"
                style={{ letterSpacing: '-0.01em' }}
              >
                $4,000
              </span>
              <span className="font-sans uppercase tracking-[0.2em] text-charcoal-50 text-sm md:text-base mb-1">
                Pesos
              </span>
            </div>
            <p className="font-sans uppercase tracking-[0.2em] text-gold-dark text-xs md:text-sm">
              12 fechas en total · Precio especial por todo julio
            </p>
          </div>

          {/* CTA WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-filled inline-flex items-center gap-3"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Asegura tu lugar por WhatsApp
            </a>
            <p className="text-charcoal-50 text-xs md:text-sm mt-4">
              Sé parte de este mercado exclusivo
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
