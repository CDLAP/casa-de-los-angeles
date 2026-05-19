'use client'

import { motion } from 'framer-motion'

export default function MercadoHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Decorative radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140%] h-[140%] opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at center top, rgba(201, 169, 97, 0.18) 0%, rgba(201, 169, 97, 0.05) 30%, transparent 65%)',
          }}
        />
      </div>

      {/* Subtle texture overlay (optional, if /images/noise.png exists) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: 'url(/images/noise.png)',
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[11px] md:text-xs uppercase tracking-[0.4em] text-gold mb-6 md:mb-8"
          >
            Centro Histórico · Puebla
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif italic text-cream leading-[1.05] mb-8"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            Mercado<br />de los Ángeles
          </motion.h1>

          {/* Divider — gold rhombus */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-16 md:w-24 h-px bg-gold/40" />
            <div className="w-2 h-2 bg-gold rotate-45" />
            <div className="w-16 md:w-24 h-px bg-gold/40" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-serif italic text-cream/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Un programa de ediciones curadas dentro de una casona del siglo XVIII. Marcas con alma, gastronomía, mezcal y música en vivo a media cuadra del Zócalo de Puebla.
          </motion.p>

          {/* Sub-info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="font-sans text-[11px] md:text-xs uppercase tracking-[0.3em] text-cream/50"
          >
            Av. Don Juan de Palafox y Mendoza 222
          </motion.p>
        </div>

        {/* Anchor cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold/70 mb-3">Próximas ediciones</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-px h-8 bg-gold/40" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
