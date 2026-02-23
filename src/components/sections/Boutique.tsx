'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Crown, Gem, Shirt, Sparkles } from 'lucide-react'

const boutiqueItems = [
  {
    icon: Crown,
    title: 'Sombrería',
    description: 'Sombreros artesanales y de diseñador, piezas únicas que combinan tradición y estilo contemporáneo.',
  },
  {
    icon: Gem,
    title: 'Joyería Artesanal',
    description: 'Colección curada de joyería hecha a mano por artesanos locales con materiales selectos.',
  },
  {
    icon: Shirt,
    title: 'Moda & Accesorios',
    description: 'Prendas y accesorios de diseñadores independientes con identidad y personalidad.',
  },
  {
    icon: Sparkles,
    title: 'Objetos de Arte',
    description: 'Piezas decorativas, cerámica y arte popular seleccionado con cuidado y buen gusto.',
  },
]

export default function Boutique() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="boutique" ref={sectionRef} className="section bg-cream relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Boutique</h2>
          <p className="section-subtitle">
            Sombrería, artesanías y productos selectos en un espacio con alma.
          </p>
          <div className="divider" />
        </motion.div>

        {/* Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 text-charcoal-50 leading-relaxed text-lg">
              <p>
                Nuestra <span className="text-gold-dark font-medium">Boutique</span> es un espacio permanente dentro de Casa de los Ángeles donde encontrarás una selección curada de sombrería artesanal, joyería, moda de autor y objetos de arte.
              </p>
              <p>
                Cada pieza ha sido elegida por su calidad, originalidad y conexión con la tradición artesanal mexicana. Un lugar para descubrir regalos únicos y llevarte un pedazo del alma de Puebla.
              </p>
              <p className="text-gold-dark font-medium italic text-xl">
                Donde la tradición artesanal se viste de elegancia.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {boutiqueItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="text-center p-6 rounded-2xl border border-gold/10 bg-white hover:bg-gold/5 hover:border-gold/25 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-5 h-5 text-gold-dark" />
              </div>
              <h4 className="font-serif text-lg text-charcoal mb-2">{item.title}</h4>
              <p className="text-charcoal-50 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="#contacto"
            className="btn-elegant"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Visitar la Boutique
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
