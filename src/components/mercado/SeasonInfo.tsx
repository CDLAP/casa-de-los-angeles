'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Check } from 'lucide-react'

interface SeasonInfoProps {
  eventName: string
  includes: string[]
  notes: string[]
  whatsapp: string
  whatsappDisplay: string
}

export default function SeasonInfo({
  eventName,
  includes,
  notes,
  whatsapp,
  whatsappDisplay,
}: SeasonInfoProps) {
  const reservaMessage = encodeURIComponent(
    `Hola, quiero reservar mi espacio para ${eventName} en Casa de los Ángeles.`
  )

  return (
    <>
      {/* INCLUYE */}
      <section className="container-custom py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-gold" />
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-gold" />
          <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-gold" />
          <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-gold" />

          <div className="border border-gold/40 py-8 md:py-10 px-6 md:px-12 text-center">
            <h3
              className="font-serif not-italic uppercase text-gold mb-7"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                fontWeight: 700,
                letterSpacing: '0.15em',
              }}
            >
              Incluye para Expositores
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-5 gap-y-3 max-w-3xl mx-auto">
              {includes.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Check className="w-3.5 h-3.5 text-gold/80 flex-shrink-0" />
                  <span className="font-sans text-cream/85 text-sm md:text-base">
                    {item}
                  </span>
                  {i < includes.length - 1 && (
                    <span className="text-gold/40 ml-1 hidden md:inline">·</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* NOTES */}
      <section className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-3 px-5 py-4 border border-gold/20 bg-[#0F1A2E]/30"
            >
              <AlertCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <p className="font-sans text-cream/85 text-sm leading-relaxed">
                {note}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <section className="container-custom py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-gold" />
          <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-gold" />
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-gold" />
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-gold" />

          <div className="border border-gold/50 py-10 md:py-14 px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
              <div className="text-center md:text-left">
                <p className="font-sans uppercase tracking-[0.3em] text-gold text-[10px] md:text-xs mb-3">
                  Reservaciones al WhatsApp
                </p>
                <a
                  href={`https://wa.me/${whatsapp}?text=${reservaMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-serif not-italic text-gold font-bold leading-none hover:text-gold-light transition-colors"
                  style={{
                    fontSize: 'clamp(1.875rem, 5vw, 3rem)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {whatsappDisplay}
                </a>
                <p className="font-sans text-cream/55 text-xs italic mt-3 max-w-xs">
                  Da clic para abrir WhatsApp y reservar tu espacio en {eventName}.
                </p>
              </div>

              <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-gold/25 pt-8 md:pt-0 md:pl-12">
                <h4 className="font-serif italic text-cream text-2xl md:text-3xl leading-tight mb-3">
                  Casa de los Ángeles
                </h4>
                <p className="font-sans text-cream/75 text-sm md:text-base leading-relaxed">
                  Av. Don Juan de Palafox y Mendoza 222<br />
                  Centro Histórico, Puebla
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
