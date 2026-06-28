'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users, MapPin, ShoppingBag, Camera, Heart } from 'lucide-react'
import WhatsAppIcon from '@/components/mercado/WhatsAppIcon'

const WHATSAPP = '522206224222'
const WA_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  'Hola, quiero asegurar mi lugar en el Mercado de los Ángeles — Edición Julio (vintage, de colección, moda y diseño) en Casa de los Ángeles. Mi marca se llama: __ y vendo: __.'
)}`

/* Paleta exacta de la campaña (muestreada del arte oficial) — NO cambiar, es el concepto */
const ROSE = {
  band: '#F3DDD5',
  dark: '#9E635E',
  price: '#BE7E74',
  soft: '#C99A92',
  line: '#E2C4BB',
  ribbon: '#C68D89',
}
const BROWN = '#4A3526'

const FEATURES = [
  { icon: Users, label: 'Gran flujo de visitantes' },
  { icon: MapPin, label: 'Ubicación privilegiada' },
  { icon: ShoppingBag, label: 'Ambiente único y curado' },
  { icon: Camera, label: 'Promoción en redes y medios' },
]

/* Bloque superior — logo, títulos, beneficios */
function Upper() {
  return (
    <div className="w-full max-w-xl lg:max-w-2xl mx-auto px-5 text-center">
      <div className="flex justify-center mb-3 md:mb-4">
        <Image
          src="/images/mercado/mdla-horizontal.png"
          alt="Mercado de los Ángeles"
          width={1200}
          height={610}
          priority
          className="w-[230px] md:w-[300px] h-auto"
        />
      </div>

      <h2 className="text-gradient-gold font-serif not-italic text-3xl md:text-5xl mb-2" style={{ letterSpacing: '0.1em' }}>
        CONVOCATORIA
      </h2>

      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="w-10 h-px bg-gold/50" />
        <span className="font-sans uppercase tracking-[0.32em] text-charcoal-50 text-[0.6rem] md:text-[0.7rem]">
          Para nuestro mercado
        </span>
        <span className="w-10 h-px bg-gold/50" />
      </div>

      <h3 className="font-serif not-italic text-xl md:text-3xl leading-tight mb-4" style={{ letterSpacing: '0.02em', color: BROWN }}>
        VINTAGE, DE COLECCIÓN<br />MODA Y DISEÑO
      </h3>

      <div className="flex justify-center mb-4 md:mb-5">
        <span
          className="inline-flex items-center text-white px-5 py-1.5 font-sans uppercase tracking-[0.3em] text-[0.65rem] md:text-xs shadow-sm"
          style={{ backgroundColor: ROSE.ribbon }}
        >
          Edición Julio
        </span>
      </div>

      <p className="text-charcoal-50 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-5 md:mb-6">
        Aprovecha las ventas vacacionales en el mero Centro Histórico de Puebla,
        un punto clave para turistas y locales.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-4 max-w-lg mx-auto">
        {FEATURES.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-cream border border-gold/30">
              <Icon className="w-4 h-4 text-gold-dark" strokeWidth={1.5} />
            </span>
            <span className="text-charcoal-50 text-[0.7rem] md:text-xs leading-snug">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Divisor — vertical en desktop, horizontal corto en móvil */
function Div() {
  return <span className="w-20 h-px md:w-px md:h-auto md:self-stretch" style={{ backgroundColor: ROSE.line }} />
}

/* Banda de oferta — rosa de la campaña, responsiva (apilada en móvil, en fila en desktop) */
function OfferBand() {
  return (
    <div className="border-t border-gold/40" style={{ backgroundColor: ROSE.band }}>
      <div className="container-custom py-6 md:py-4 lg:py-5">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-5 lg:gap-8">
          {/* Promoción */}
          <div className="flex flex-col justify-center text-center">
            <p className="font-sans uppercase tracking-[0.22em] text-sm lg:text-base font-semibold" style={{ color: ROSE.dark }}>
              Promoción
            </p>
            <p className="font-sans uppercase tracking-[0.18em] text-[0.6rem] lg:text-xs" style={{ color: ROSE.soft }}>
              Válida hasta
            </p>
            <p className="font-serif not-italic text-lg lg:text-xl" style={{ color: ROSE.dark }}>
              30 de junio
            </p>
          </div>

          <Div />

          {/* Precio */}
          <div className="flex flex-col justify-center text-center">
            <p className="leading-none mb-1">
              <span className="font-sans align-top text-xl lg:text-2xl mr-0.5" style={{ color: ROSE.soft }}>$</span>
              <span className="font-serif not-italic text-4xl lg:text-5xl" style={{ color: ROSE.price, letterSpacing: '-0.01em' }}>4,000</span>
              <span className="font-sans uppercase tracking-[0.2em] text-sm lg:text-base ml-2" style={{ color: ROSE.soft }}>Pesos</span>
            </p>
            <p className="font-serif not-italic text-base lg:text-lg" style={{ color: ROSE.dark }}>
              12 fechas en total
            </p>
            <span className="block w-24 h-px mx-auto my-1.5" style={{ backgroundColor: ROSE.line }} />
            <p className="font-sans uppercase tracking-[0.16em] text-[0.6rem] lg:text-xs" style={{ color: ROSE.soft }}>
              Precio especial por todo julio
            </p>
          </div>

          <Div />

          {/* CTA WhatsApp (prioridad) + remate de texto */}
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-filled inline-flex items-center gap-3 whitespace-nowrap shadow-md"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Reservar por WhatsApp
            </a>
            <p className="flex flex-col items-center gap-1.5" style={{ color: ROSE.dark }}>
              <Heart className="w-4 h-4" style={{ color: ROSE.price }} fill="currentColor" />
              <span className="font-sans uppercase tracking-[0.18em] text-[0.6rem] lg:text-xs leading-snug">
                Asegura tu lugar · sé parte<br />de este mercado exclusivo
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JulioBanner() {
  return (
    <motion.section
      id="inicio"
      aria-label="Convocatoria Mercado de los Ángeles — Edición Julio"
      className="relative w-full bg-cream pt-16 md:pt-[84px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* ===== DESKTOP — 16:9, contenido centrado, banda abajo ===== */}
      <div className="hidden md:block relative w-full aspect-[5/4] lg:aspect-[3/2] xl:aspect-[16/10] 2xl:aspect-[16/9] max-h-[calc(100dvh-84px)] overflow-hidden">
        <Image src="/images/mercado/backjulio.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 flex items-center justify-center pb-[170px] lg:pb-[180px]">
          <Upper />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <OfferBand />
        </div>
      </div>

      {/* ===== MÓVIL — arte vertical oficial (aprobado) + botón WhatsApp ===== */}
      <div className="md:hidden">
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="block">
          <Image
            src="/images/mercado/verticaljulio.jpeg"
            alt="Convocatoria Mercado de los Ángeles — Edición Julio. $4,000 pesos por 12 fechas, precio especial por todo julio."
            width={1080}
            height={1440}
            priority
            sizes="100vw"
            className="w-full h-auto block"
          />
        </a>
        <div className="px-5 py-6 text-center" style={{ backgroundColor: ROSE.band }}>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-filled inline-flex items-center gap-3 w-full max-w-sm mx-auto justify-center"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Asegura tu lugar por WhatsApp
          </a>
          <p className="font-sans uppercase tracking-[0.18em] text-[0.65rem] mt-3" style={{ color: ROSE.dark }}>
            Sé parte de este mercado exclusivo
          </p>
        </div>
      </div>

      {/* Aire para que el querubín de la pleca caiga sobre cream, no sobre la banda */}
      <div className="h-20 md:h-28 bg-cream" />
    </motion.section>
  )
}
