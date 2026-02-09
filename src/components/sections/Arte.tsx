'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palette, Layers, Music, Sparkles } from 'lucide-react'

const arteSpaces = [
  {
    icon: Palette,
    title: 'Galería Permanente',
    description: 'Un recorrido visual por las paredes de una casa con más de 100 años de historia. Arte que dialoga con la arquitectura colonial y los detalles originales del espacio.',
    status: 'Abierto',
  },
  {
    icon: Layers,
    title: 'Exposiciones Rotativas',
    description: 'Cada temporada, nuevas voces artísticas llenan nuestros muros. Pintura, fotografía, arte mixto y propuestas emergentes de creadores locales e internacionales.',
    status: 'Próximamente',
  },
  {
    icon: Music,
    title: 'Veladas Culturales',
    description: 'Jazz en vivo, música clásica, lecturas de poesía y noches temáticas que transforman la casa en un escenario íntimo donde el arte cobra vida.',
    status: 'Próximamente',
  },
  {
    icon: Sparkles,
    title: 'Talleres & Experiencias',
    description: 'Workshops de arte, catas de vino, talleres de escritura creativa y experiencias sensoriales. Un espacio para aprender, crear y conectar.',
    status: 'Próximamente',
  },
]

export default function Arte() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="cultura" ref={sectionRef} className="section bg-white relative overflow-hidden">
      {/* Decoración sutil */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-gold" />
            <span className="text-gold text-2xl">🎨</span>
            <div className="w-12 h-px bg-gradient-gold" />
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold-dark mb-4 tracking-tight">
            Cultura & Arte
          </h2>
          <p className="text-charcoal-50 text-lg md:text-xl max-w-2xl mx-auto font-light italic">
            Un espacio donde la creatividad, la historia y la expresión artística conviven en cada rincón
          </p>
          <div className="divider" />
        </motion.div>

        {/* Texto introductorio */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-charcoal-50 text-lg leading-relaxed font-light">
            Casa de los Ángeles no es solo un lugar para comer y beber — es un <span className="text-gold-dark font-medium">centro cultural vivo</span>. 
            Cada pared, cada rincón de esta casa centenaria respira arte. Aquí el café se acompaña de belleza, 
            y cada visita es una experiencia que alimenta tanto el cuerpo como el alma.
          </p>
        </motion.div>

        {/* 4 Espacios de Arte */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {arteSpaces.map((space, index) => (
            <motion.div
              key={space.title}
              className="group relative p-8 md:p-10 border border-gold/15 rounded-2xl hover:border-gold/30 transition-all duration-500 hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
            >
              {/* Status badge */}
              <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium ${
                space.status === 'Abierto' 
                  ? 'bg-emerald/10 text-emerald' 
                  : 'bg-gold/10 text-gold-dark'
              }`}>
                {space.status}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 mb-6 border border-gold/25 rounded-full flex items-center justify-center text-gold-dark group-hover:bg-gold/10 transition-all duration-500">
                <space.icon size={26} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl text-gold-dark mb-4 group-hover:text-gold transition-colors">
                {space.title}
              </h3>
              <p className="text-charcoal-50 leading-relaxed font-light">
                {space.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden rounded-br-2xl">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold/5 rotate-45 translate-x-16 translate-y-16 group-hover:bg-gold/10 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote / CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold/30" />
            <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
            <div className="w-8 h-px bg-gold/30" />
          </div>
          
          <p className="font-serif text-xl md:text-2xl text-gold-dark italic max-w-2xl mx-auto mb-8">
            "El arte no es lo que ves, sino lo que haces que otros vean."
          </p>
          <p className="text-charcoal-50/60 text-sm mb-10">— Edgar Degas</p>

          <motion.a
            href="#contacto"
            className="inline-block px-10 py-4 border border-gold/40 text-gold-dark font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-gold hover:text-white hover:border-gold hover:shadow-xl"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Propón tu Exposición
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
