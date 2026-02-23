'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="nosotros" ref={sectionRef} className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Casa de los Ángeles se presenta</h2>
          <p className="section-subtitle">
            En el corazón de Puebla, detrás de una fachada histórica, existe un lugar donde el tiempo no se detuvo: se transformó.
          </p>
          <div className="divider" />
        </motion.div>

        {/* Content - Solo texto centrado */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8 text-charcoal-50 leading-relaxed text-lg">
              <p>
                <span className="text-gold-dark font-medium">Casa de los Ángeles</span> es una casona patrimonial convertida en un espacio vivo que combina museo, café, diseño, arte y experiencias exclusivas. Aquí, cada visita es distinta: una mañana tranquila en el patio, un recorrido cultural, una compra única en el mercado o un evento privado en un entorno irrepetible.
              </p>
              
              <p>
                La casa no fue concebida como un museo tradicional ni como un simple centro comercial, sino como un refugio urbano donde lo histórico y lo contemporáneo conviven con naturalidad.
              </p>
              
              <p>
                Quienes cruzan sus puertas no solo visitan un edificio: entran a una atmósfera. Un lugar para descubrir, celebrar, crear y permanecer.
              </p>
              
              <p className="text-gold-dark font-medium italic text-xl text-center">
                Casa de los Ángeles no es solo un destino en Puebla.<br />
                Es una experiencia que se recuerda.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
