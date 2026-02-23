'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <>
      {/* BLOQUE 1: Foto de la casa con degradado inferior */}
      <section id="inicio" className="relative w-full pt-[88px] md:pt-[96px] bg-[#3F1F26]">
        <Image
          src="/images/casa.png"
          alt="Casa de los Ángeles - Fachada"
          width={2400}
          height={1600}
          className="w-full h-auto block"
          priority
          sizes="100vw"
        />
        {/* Degradado sutil que funde la foto con el guinda */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#3F1F26] via-[#3F1F26]/60 to-transparent" />
      </section>

      {/* BLOQUE 2: Pleca guinda con ángel + nombre + tagline */}
      <section className="w-full bg-[#3F1F26] pb-16 md:pb-20 pt-10 md:pt-14">
        <div className="max-w-4xl mx-auto text-center px-5">
          {/* Ángel */}
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative w-36 h-36 md:w-48 md:h-48">
              <Image
                src="/images/logo-short-1000x1000.png"
                alt="Casa de los Ángeles"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* Casa de los Ángeles — serif dorado */}
          <motion.h1
            className="font-serif text-2xl md:text-4xl text-gold tracking-wide mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Casa de los Ángeles
          </motion.h1>

          {/* CAFÉ • ARTE • BOUTIQUE */}
          <motion.p
            className="text-gold-light uppercase tracking-[0.4em] text-sm md:text-base font-light mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Café &bull; Arte &bull; Boutique
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="w-12 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
            <div className="w-12 h-px bg-gold/40" />
          </motion.div>

          <motion.p
            className="text-cream/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Un espacio único en el corazón histórico de Puebla donde el café artesanal, 
            la cultura y el arte se encuentran
          </motion.p>

          <motion.a
            href="/#contacto"
            className="inline-block px-8 py-3 text-sm uppercase tracking-[0.2em] font-light border border-gold/50 text-gold transition-all duration-300 hover:bg-gold hover:text-[#3F1F26]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            Reservar
          </motion.a>
        </div>
      </section>
    </>
  )
}
