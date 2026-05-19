'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Lightbulb } from 'lucide-react'

/**
 * Promoted block linking expositors to the Lineamientos and Tips pages.
 * Sits between Paquetes and Incluye so it's seen before reservation,
 * not buried near the footer.
 */
export default function RecursosExpositores() {
  return (
    <section className="container-custom py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-7 md:mb-9">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 md:w-16 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-10 md:w-16 h-px bg-gold/40" />
          </div>
          <h3
            className="font-serif not-italic uppercase text-gold leading-tight"
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.375rem)',
              fontWeight: 700,
              letterSpacing: '0.18em',
            }}
          >
            Antes de Reservar
          </h3>
          <p className="font-serif italic text-cream/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto mt-3">
            Léenos con calma. Estos dos documentos son parte de tu participación.
          </p>
        </div>

        {/* Two link cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Link
            href="/mercado-de-los-angeles/informacion"
            className="group relative flex items-center gap-4 md:gap-5 border border-gold/30 hover:border-gold bg-[#0F1A2E]/40 hover:bg-[#0F1A2E]/70 px-5 py-5 md:px-7 md:py-6 transition-all duration-500"
          >
            <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 border border-gold/40 group-hover:border-gold text-gold flex-shrink-0 transition-colors">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-sans uppercase tracking-[0.2em] text-gold/70 group-hover:text-gold text-[10px] md:text-xs transition-colors mb-1">
                Documento 01
              </span>
              <span className="block font-serif not-italic uppercase text-gold font-bold text-sm md:text-base leading-tight tracking-wider">
                Lineamientos Generales
              </span>
              <span className="block font-sans text-cream/60 text-xs mt-1.5">
                Reglamento oficial completo
              </span>
            </span>
            <ArrowRight className="w-4 h-4 text-gold/60 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
          </Link>

          <Link
            href="/mercado-de-los-angeles/tips"
            className="group relative flex items-center gap-4 md:gap-5 border border-gold/30 hover:border-gold bg-[#0F1A2E]/40 hover:bg-[#0F1A2E]/70 px-5 py-5 md:px-7 md:py-6 transition-all duration-500"
          >
            <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 border border-gold/40 group-hover:border-gold text-gold flex-shrink-0 transition-colors">
              <Lightbulb className="w-5 h-5" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-sans uppercase tracking-[0.2em] text-gold/70 group-hover:text-gold text-[10px] md:text-xs transition-colors mb-1">
                Documento 02
              </span>
              <span className="block font-serif not-italic uppercase text-gold font-bold text-sm md:text-base leading-tight tracking-wider">
                10 Tips para Vender Mejor
              </span>
              <span className="block font-sans text-cream/60 text-xs mt-1.5">
                Guía práctica para expositores
              </span>
            </span>
            <ArrowRight className="w-4 h-4 text-gold/60 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
