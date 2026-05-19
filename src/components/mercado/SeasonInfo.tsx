'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertCircle, ArrowRight, Check } from 'lucide-react'

interface SeasonInfoProps {
  eventName: string
  includes: string[]
  notes: string[]
  whatsapp: string
  whatsappDisplay: string
}

// Inline WhatsApp icon (lucide doesn't ship brand marks)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
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

        {/* Link to full expositores info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10 md:mt-12"
        >
          <Link
            href="/mercado-de-los-angeles/informacion"
            className="group inline-flex items-center gap-2 text-gold hover:text-gold-light text-xs md:text-sm uppercase tracking-[0.25em] font-sans font-medium transition-colors duration-300 border-b border-gold/30 hover:border-gold pb-1.5"
          >
            Ver información completa para expositores
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
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
              {/* WhatsApp button block */}
              <div className="text-center md:text-left">
                <p className="font-sans uppercase tracking-[0.3em] text-gold text-[10px] md:text-xs mb-5">
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
                      className="font-serif not-italic text-gold group-hover:text-charcoal font-bold leading-none mb-1 transition-colors"
                      style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {whatsappDisplay}
                    </span>
                    <span className="font-sans uppercase tracking-[0.25em] text-gold/80 group-hover:text-charcoal/80 text-[10px] md:text-xs transition-colors">
                      Click para reservar →
                    </span>
                  </span>
                </motion.a>

                <p className="font-sans text-cream/55 text-xs italic mt-4 max-w-xs mx-auto md:mx-0">
                  Te abrimos WhatsApp con tu mensaje de reservación listo.
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
