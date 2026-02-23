'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Configuración del punto de anclaje
// El ángel se fija cuando la línea inferior del nav queda a la altura de su "frente"
// La frente está aprox al 35% desde arriba de la imagen
// Solo cabeza y alas asoman por encima del nav (~20% desde arriba)
const FOREHEAD_RATIO = 0.0

export default function Hero() {
  const angelRef = useRef<HTMLDivElement>(null)
  const [angelStyle, setAngelStyle] = useState<'flow' | 'fixed'>('flow')
  const [fixedTop, setFixedTop] = useState(0)

  const isMd = useCallback(() => window.innerWidth >= 768, [])

  const getNavHeight = useCallback(() => {
    // Nav: pt-6(24px) + pb-32(128px) + text ~20px ≈ 172px
    return isMd() ? 172 : 0
  }, [isMd])

  useEffect(() => {
    const angel = angelRef.current
    if (!angel) return

    // Tamaño del ángel según breakpoint
    const getAngelHeight = () => window.innerWidth >= 768 ? 224 : 176 // md:w-56=224px, w-44=176px

    const handleScroll = () => {
      if (!angel) return

      const navH = getNavHeight()
      const angelH = getAngelHeight()
      const foreheadOffset = angelH * FOREHEAD_RATIO

      // Posición donde quiero que se fije:
      // La base del nav (navH) coincide con la frente del ángel
      // Entonces el top del ángel fijo = navH - foreheadOffset
      const targetFixedTop = navH - foreheadOffset

      // Posición actual del ángel en el viewport (su centro original está en top:0 del section con -translate-y-1/2)
      // Calculamos dónde está el top del ángel
      const rect = angel.getBoundingClientRect()

      if (angelStyle === 'flow') {
        // Solo fijar en desktop (md+)
        if (isMd() && rect.top <= targetFixedTop) {
          setFixedTop(targetFixedTop)
          setAngelStyle('fixed')
        }
      } else {
        // Para volver a flow: necesitamos saber la posición absoluta original
        // El ángel está en top:0 del section con -translate-y-1/2
        // Su posición original en el documento = sectionTop - angelH/2
        const section = angel.parentElement
        if (section) {
          const sectionRect = section.getBoundingClientRect()
          const originalAngelTop = sectionRect.top - angelH / 2
          // Si la posición original vuelve a estar por debajo del punto de anclaje, soltar
          if (originalAngelTop > targetFixedTop) {
            setAngelStyle('flow')
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', () => {
      setAngelStyle('flow')
      handleScroll()
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [angelStyle, getNavHeight, isMd])

  return (
    <>
      {/* BLOQUE 1: Foto de la casa */}
      <section id="inicio" className="relative w-full pt-[88px] md:pt-[172px] bg-[#3F1F26]">
        <Image
          src="/images/casa.jpeg"
          alt="Casa de los Ángeles - Fachada"
          width={2400}
          height={1600}
          className="w-full h-auto block"
          priority
          sizes="100vw"
        />
      </section>

      {/* BLOQUE 2: Pleca guinda */}
      <section className="relative w-full bg-[#3F1F26] pb-16 md:pb-20 pt-20 md:pt-32">
        {/* Línea dorada */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gold/60" />

        {/* Ángel — un solo elemento, cambia de absolute a fixed */}
        <div
          ref={angelRef}
          className="flex justify-center pointer-events-none"
          style={
            angelStyle === 'fixed'
              ? {
                  position: 'fixed',
                  top: `${fixedTop}px`,
                  left: 0,
                  right: 0,
                  zIndex: 55,
                }
              : {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  transform: 'translateY(-50%)',
                  zIndex: 55,
                }
          }
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image
              src="/images/logo-short-1000x1000.png"
              alt="Casa de los Ángeles"
              width={160}
              height={160}
              className="object-contain drop-shadow-2xl w-44 h-44 md:w-56 md:h-56"
              priority
            />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-5">
          <motion.h1
            className="font-serif text-4xl md:text-6xl text-gold tracking-wide mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Casa de los Ángeles
          </motion.h1>

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
            Un espacio único en el corazón histórico de Puebla donde el café artesanal,<br className="md:hidden" />{' '}
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
