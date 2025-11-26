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
          <h2 className="section-title">Nuestra Historia</h2>
          <p className="section-subtitle">
            Donde el encanto francés se encuentra con el corazón de Puebla.
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
            <h3 className="font-serif text-display-sm text-gold-dark mb-8 text-center">
              Donde el pasado y el presente se encuentran
            </h3>
            
            <div className="space-y-8 text-charcoal-50 leading-relaxed text-lg">
              {/* Párrafo 1: El Origen */}
              <p>
                La idea de este lugar nació hace veintidós años. Dos décadas llenas de sueños, pausas necesarias y obstáculos que la vida puso en el camino… pero también de perseverancia, visión y un profundo amor por esta casa. Hoy, finalmente, ese sueño comienza a hacerse realidad. <span className="text-gold-dark font-medium">Casa de los Ángeles</span> fue concebida como un espacio donde el tiempo puede detenerse. Un lugar para reencontrarse, para dejarse encantar, para sentir historia. Un rincón que te invita a mirar al pasado con nostalgia y, al mismo tiempo, a soñar con el futuro.
              </p>
              
              {/* Párrafo 2: La Dualidad y el Legado */}
              <p>
                Aquí conviven dos mundos: la calidez de Puebla y la elegancia íntima de un pequeño bistró parisino. Puedes desayunar, comer o cenar sintiendo la delicadeza europea, pero sin perder la sensación de estar en casa. Esa dualidad es el corazón de nuestro concepto. Durante más de cien años, esta casa ha sido resguardada por mujeres, quienes la han mantenido viva, cuidada y llena de carácter. Hubo un breve periodo en el que perdió su esencia, pero el destino la ha devuelto a manos que creen en su valor y que buscan restaurar el brillo que merece.
              </p>
              
              {/* Párrafo 3: Historia Cinematográfica */}
              <p>
                Este lugar ha sido escenario de telenovelas, películas y momentos memorables, incluyendo producciones protagonizadas por figuras como <span className="text-gold-dark font-medium">Salma Hayek</span> en <span className="italic">Frida</span>. Hoy queremos compartir esa belleza con quienes nos visitan: turistas, poblanos, soñadores, amantes del café y de los espacios con alma.
              </p>
              
              {/* Párrafo 4: El Cierre Poderoso */}
              <p className="text-gold-dark font-medium italic text-xl text-center">
                Casa de los Ángeles renace para ser lo que siempre debió ser: un refugio lleno de historia, encanto y magia… donde cada visita se siente como volver a casa y, a la vez, viajar a un rincón de París.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-gold/20 max-w-2xl mx-auto">
              <div className="text-center">
                <span className="block font-serif text-3xl text-gold-dark">22</span>
                <span className="text-sm text-charcoal-50 uppercase tracking-wider">Años de Sueño</span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-3xl text-gold-dark">100+</span>
                <span className="text-sm text-charcoal-50 uppercase tracking-wider">Años de Historia</span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-3xl text-gold-dark">∞</span>
                <span className="text-sm text-charcoal-50 uppercase tracking-wider">Encanto</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
