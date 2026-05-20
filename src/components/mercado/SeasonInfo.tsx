'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Check } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'

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
      <section className="container-custom py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto border border-gold/35 py-10 md:py-12 px-6 md:px-12 text-center"
        >
          <h3
            className="not-italic text-cream mb-8"
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(1.625rem, 3.2vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '0.005em',
            }}
          >
            Incluye para Expositores
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-3 max-w-3xl mx-auto">
            {includes.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="font-sans text-cream/95 text-base md:text-[17px] leading-snug">
                  {item}
                </span>
                {i < includes.length - 1 && (
                  <span className="text-cream/25 ml-1 hidden md:inline">·</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* NOTES */}
      <section className="container-custom pb-14 md:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-3 px-5 py-5 border border-cream/15 bg-[#0F1A2E]/30"
            >
              <AlertCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <p className="font-sans text-cream/90 text-[15px] md:text-base leading-[1.6]">
                {note}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER — corner brackets stay here as the climax */}
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
              {/* WhatsApp button block — primary CTA, stays gold */}
              <div className="text-center md:text-left">
                <p className="font-sans uppercase tracking-[0.3em] text-gold text-[10px] md:text-[11px] mb-5">
                  Reservaciones al WhatsApp
                </p>

                <motion.a
                  href={`https://wa.me/${whatsapp}?text=${reservaMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-4 md:gap-5 border-2 border-gold bg-gold/5 hover:bg-gold px-5 py-4 md:px-7 md:py-5 transition-all duration-500 w-full md:w-auto justify-center md:justify-start"
                >
                  <span className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-40 animate-ping" />

                  <span className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold text-charcoal flex-shrink-0">
                    <WhatsAppIcon className="w-6 h-6 md:w-7 md:h-7" />
                  </span>

                  <span className="relative flex flex-col items-start">
                    <span
                      className="font-serif not-italic text-gold group-hover:text-charcoal font-bold leading-none mb-1.5 transition-colors"
                      style={{
                        fontSize: 'clamp(1.625rem, 4vw, 2.25rem)',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {whatsappDisplay}
                    </span>
                    <span className="font-sans uppercase tracking-[0.2em] text-gold/85 group-hover:text-charcoal/80 text-[10px] md:text-[11px] transition-colors">
                      Click para reservar →
                    </span>
                  </span>
                </motion.a>

                <p className="font-sans text-cream/65 text-sm mt-4 max-w-xs mx-auto md:mx-0 leading-relaxed">
                  Te abrimos WhatsApp con tu mensaje de reservación listo.
                </p>
              </div>

              <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-cream/15 pt-8 md:pt-0 md:pl-12">
                <h4
                  className="font-serif italic text-cream leading-tight mb-3"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
                >
                  Casa de los Ángeles
                </h4>
                <p className="font-sans text-cream/85 text-base md:text-[17px] leading-[1.7]">
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
