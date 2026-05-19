'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Lightbulb } from 'lucide-react'

/**
 * Promoted block linking expositors to the Lineamientos and Tips pages.
 * Sits between Paquetes and Incluye so it's seen before reservation.
 */
export default function RecursosExpositores() {
  return (
    <section className="container-custom py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-9 md:mb-11">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </div>
          <h3
            className="font-serif not-italic text-cream leading-tight"
            style={{
              fontSize: 'clamp(1.625rem, 3.5vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '0.005em',
            }}
          >
            Antes de Reservar
          </h3>
          <p className="font-sans text-cream/80 text-base md:text-[17px] leading-[1.7] max-w-xl mx-auto mt-4">
            Léenos con calma. Estos dos documentos son parte de tu participación.
          </p>
        </div>

        {/* Two link cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Link
            href="/mercado-de-los-angeles/informacion"
            className="group relative flex items-center gap-4 md:gap-5 border border-cream/15 hover:border-gold bg-[#0F1A2E]/40 hover:bg-[#0F1A2E]/70 px-6 py-6 md:px-7 md:py-7 transition-all duration-500"
          >
            <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 border border-gold/40 group-hover:border-gold text-gold flex-shrink-0 transition-colors">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-sans uppercase tracking-[0.25em] text-gold text-[10px] md:text-[11px] mb-2">
                Documento 01
              </span>
              <span
                className="block font-serif not-italic text-cream leading-tight"
                style={{ fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', fontWeight: 700, letterSpacing: '0.005em' }}
              >
                Lineamientos Generales
              </span>
              <span className="block font-sans text-cream/65 text-sm mt-1.5 leading-snug">
                Reglamento oficial completo
              </span>
            </span>
            <ArrowRight className="w-4 h-4 text-cream/50 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
          </Link>

          <Link
            href="/mercado-de-los-angeles/tips"
            className="group relative flex items-center gap-4 md:gap-5 border border-cream/15 hover:border-gold bg-[#0F1A2E]/40 hover:bg-[#0F1A2E]/70 px-6 py-6 md:px-7 md:py-7 transition-all duration-500"
          >
            <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 border border-gold/40 group-hover:border-gold text-gold flex-shrink-0 transition-colors">
              <Lightbulb className="w-5 h-5" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-sans uppercase tracking-[0.25em] text-gold text-[10px] md:text-[11px] mb-2">
                Documento 02
              </span>
              <span
                className="block font-serif not-italic text-cream leading-tight"
                style={{ fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', fontWeight: 700, letterSpacing: '0.005em' }}
              >
                10 Tips para Vender Mejor
              </span>
              <span className="block font-sans text-cream/65 text-sm mt-1.5 leading-snug">
                Guía práctica para expositores
              </span>
            </span>
            <ArrowRight className="w-4 h-4 text-cream/50 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
