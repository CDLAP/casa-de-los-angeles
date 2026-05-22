'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'
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
      {/* INCLUYE — open layout, no boxed container */}
      <section className="container-custom py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Section transition rombo */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </div>

          <h3
            className="not-italic text-cream mb-8"
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(1.625rem, 3.2vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '0.005em',
            }}
          >
            Tu mesa incluye
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-x-5 md:gap-x-7 gap-y-3 max-w-3xl mx-auto">
            {includes.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="font-sans text-cream text-[17px] md:text-[19px] leading-snug">
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

      {/* NOTES — single inline row, compact */}
      <section className="container-custom pb-10 md:pb-12">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-2.5 text-cream/85 font-sans text-[15px] md:text-base leading-snug"
            >
              <span
                className="flex-shrink-0 w-2.5 h-[1.5px] bg-gold"
                aria-hidden="true"
              />
              <span>{note}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER — open layout, no outer box, no corner brackets */}
      <section className="container-custom py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section transition rombo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* WhatsApp CTA — primary visual focus, eyebrow removed */}
            <div className="text-center md:text-left">
              <motion.a
                href={`https://wa.me/${whatsapp}?text=${reservaMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-4 md:gap-5 bg-gold/10 hover:bg-gold border border-gold hover:border-gold-light px-5 py-4 md:px-7 md:py-5 transition-all duration-500 w-full md:w-auto justify-center md:justify-start"
              >
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
                  <span className="font-sans uppercase tracking-[0.2em] text-gold/90 group-hover:text-charcoal/85 text-xs md:text-[13px] transition-colors">
                    Click para reservar →
                  </span>
                </span>
              </motion.a>
            </div>

            {/* Dirección — clean text, subtle separator on desktop only */}
            <div className="text-center md:text-right md:border-l md:border-cream/15 md:pl-12 pt-8 md:pt-0 border-t md:border-t-0 border-cream/15">
              <h4
                className="font-serif italic text-cream leading-tight mb-3 mt-8 md:mt-0"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
              >
                Casa de los Ángeles
              </h4>
              <p className="font-sans text-cream/90 text-[17px] md:text-[19px] leading-[1.75]">
                Av. Don Juan de Palafox y Mendoza 222<br />
                Centro Histórico, Puebla
              </p>
            </div>
          </div>

          {/* Subtle post-footer links — reference docs available after the main CTA */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-12 md:mt-14 pt-7 border-t border-cream/10 max-w-3xl mx-auto">
            <Link
              href="/mercado-de-los-angeles/informacion"
              className="font-sans uppercase tracking-[0.22em] text-cream/55 hover:text-gold transition-colors duration-300 text-[11px] md:text-xs"
            >
              Lineamientos del mercado
            </Link>
            <span className="text-cream/20 text-xs" aria-hidden="true">·</span>
            <Link
              href="/mercado-de-los-angeles/tips"
              className="font-sans uppercase tracking-[0.22em] text-cream/55 hover:text-gold transition-colors duration-300 text-[11px] md:text-xs"
            >
              Tips para vender mejor
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}
