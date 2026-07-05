'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import WhatsAppIcon from '@/components/mercado/WhatsAppIcon'

const WHATSAPP = '522206224222'
const WA_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  'Hola, quiero asegurar mi lugar en el Mercado Vacacional de Casa de los Ángeles (del 15 al 31 de julio, de lunes a domingo). Mi marca se llama: __ y vendo: __.'
)}`

export default function JulioBanner() {
  return (
    <motion.section
      id="inicio"
      aria-label="Mercado Vacacional en Casa de los Ángeles — del 15 al 31 de julio"
      className="relative w-full bg-cream pt-16 md:pt-[84px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Poster oficial de la campaña — responsive: 16:9 en desktop, 9:16 en móvil.
          Todo el arte es clickeable hacia WhatsApp. */}
      <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="block">
        {/* Desktop — 16:9 */}
        <Image
          src="/images/mercado/16-9.png"
          alt="Mercado Vacacional en Casa de los Ángeles. ¿Y si vendes de lunes a domingo? Del 15 al 31 de julio. Aumenta tus ventas por solo 250 pesos por día, en el corazón del Centro Histórico de Puebla."
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          className="hidden md:block w-full h-auto"
        />
        {/* Móvil — 9:16 */}
        <Image
          src="/images/mercado/9-16.jpeg"
          alt="Mercado Vacacional en Casa de los Ángeles. ¿Y si vendes de lunes a domingo? Del 15 al 31 de julio. Aumenta tus ventas por solo 250 pesos por día."
          width={1080}
          height={1920}
          priority
          sizes="100vw"
          className="md:hidden w-full h-auto"
        />
      </a>

      {/* Banda CTA — WhatsApp (el arte no basta como acción, aquí va el botón) */}
      <div className="border-t border-gold/40 bg-cream">
        <div className="container-custom py-6 md:py-7 text-center">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-filled inline-flex items-center gap-3 justify-center w-full max-w-sm mx-auto"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Reservar por WhatsApp
          </a>
          <p className="font-sans uppercase tracking-[0.18em] text-[0.65rem] md:text-xs mt-3 text-charcoal-50">
            Asegura tu lugar · sé parte de este mercado exclusivo
          </p>
        </div>
      </div>

      {/* Aire para separar de la siguiente sección */}
      <div className="h-12 md:h-20 bg-cream" />
    </motion.section>
  )
}
