'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useHeroTheme } from '@/context/HeroThemeContext'

export default function Hero() {
  const heroTheme = useHeroTheme()
  const isWine = heroTheme === 'wine'

  return (
    <>
      {/* BLOQUE 1: Solo la foto */}
      <section id="inicio" className="w-full">
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

      {/* BLOQUE 2: Pleca sólida, sección independiente */}
      <section 
        className={`w-full ${isWine ? 'bg-[#3F1F26]' : 'bg-[#1A3A2E]'}`}
      >
        <motion.div
          className="py-12 md:py-16 px-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold-light uppercase tracking-[0.4em] text-sm md:text-base font-light mb-4">
              Café &bull; Arte &bull; Boutique
            </p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
              <div className="w-12 h-px bg-gold/40" />
            </div>
            <p className="text-cream/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
              Un espacio único en el corazón histórico de Puebla donde el café artesanal, 
              la cultura y el arte se encuentran
            </p>
          </div>
        </motion.div>
      </section>
    </>
  )
}
