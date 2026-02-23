'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useHeroTheme } from '@/context/HeroThemeContext'

export default function Hero() {
  const heroTheme = useHeroTheme()
  const isWine = heroTheme === 'wine'

  return (
    <>
      {/* BLOQUE 1: Ángel + título + texto sobre fondo verde/vino */}
      <section 
        id="inicio" 
        className={`w-full pt-16 sm:pt-14 pb-12 md:pb-16 ${isWine ? 'bg-[#3F1F26]' : 'bg-[#1A3A2E]'}`}
      >
        <div className="max-w-4xl mx-auto text-center px-5">
          {/* Ángel */}
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-gold/15 scale-150" />
              <div className="relative w-36 h-36 md:w-48 md:h-48">
                <Image
                  src="/images/logo-short-1000x1000.png"
                  alt="Casa de los Ángeles"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* CAFÉ • ARTE • BOUTIQUE */}
          <motion.p
            className="text-gold-light uppercase tracking-[0.4em] text-sm md:text-base font-light mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Café &bull; Arte &bull; Boutique
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="w-12 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
            <div className="w-12 h-px bg-gold/40" />
          </motion.div>

          <motion.p
            className="text-cream/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Un espacio único en el corazón histórico de Puebla donde el café artesanal, 
            la cultura y el arte se encuentran
          </motion.p>

          <motion.a
            href="/#contacto"
            className={`inline-block mt-6 px-8 py-3 text-sm uppercase tracking-[0.2em] font-light border transition-all duration-300 ${isWine ? 'border-gold/50 text-gold hover:bg-gold hover:text-[#3F1F26]' : 'border-gold/50 text-gold hover:bg-gold hover:text-[#1A3A2E]'}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Reservar
          </motion.a>
        </div>
      </section>

      {/* BLOQUE 2: Foto completa de la casa */}
      <section className="w-full">
        <Image
          src="/images/casa.png"
          alt="Casa de los Ángeles - Fachada"
          width={2400}
          height={1600}
          className="w-full h-auto block"
          priority
          sizes="100vw"
        />
      </section>
    </>
  )
}
