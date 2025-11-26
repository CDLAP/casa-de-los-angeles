'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Coffee, Wine, Palette, GlassWater, Sparkles, Music } from 'lucide-react'

const experiences = [
  {
    icon: Coffee,
    title: 'Cafetería',
    description: 'Desayunos artesanales, café de especialidad y repostería francesa desde temprano. Un espacio acogedor donde cada mañana comienza con el aroma de pan recién horneado y el sabor de un café perfectamente preparado.',
    image: '/images/experiences/cafeteria.png',
  },
  {
    icon: Wine,
    title: 'Bistró Gourmet',
    description: 'Alta cocina poblana con influencias internacionales. Nuestro chef crea platillos que honran la tradición mientras exploran nuevas fronteras del sabor. Maridajes exclusivos y una cava excepcional.',
    image: '/images/experiences/bistro.png',
  },
  {
    icon: Palette,
    title: 'Jardín de Arte',
    description: 'Un oasis cultural en el corazón de la ciudad. Exposiciones rotativas de artistas locales e internacionales en un jardín que respira historia y creatividad. Cada rincón cuenta una historia visual.',
    image: '/images/experiences/jardin-arte.png',
  },
  {
    icon: GlassWater,
    title: 'Bar de Autor',
    description: 'Mixología contemporánea con ingredientes locales y técnicas vanguardistas. Coctelería de autor que rinde homenaje a los sabores de Puebla con un toque parisino. Cada copa es una experiencia única.',
    image: '/images/experiences/bar-autor.png',
  },
  {
    icon: Sparkles,
    title: 'Experiencias Privadas',
    description: 'Cenas maridaje, catas de vino, talleres culinarios y eventos corporativos. Diseñamos experiencias a la medida para momentos verdaderamente especiales en un ambiente íntimo y exclusivo.',
    image: '/images/experiences/experiencias-privadas.png',
  },
  {
    icon: Music,
    title: 'Noches de Gala',
    description: 'Eventos especiales, conciertos íntimos y veladas temáticas que transforman la casa en un escenario mágico. Jazz en vivo, música clásica y propuestas artísticas que elevan cada noche a una celebración memorable.',
    image: '/images/experiences/noches-gala.png',
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="experiencia" ref={sectionRef} className="section bg-cream">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">La Experiencia</h2>
          <p className="section-subtitle">
            De la mañana a la noche: sabor, encanto y celebraciones.
          </p>
          <div className="divider" />
        </motion.div>

        {/* Experience Grid - 6 items en 3 columnas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${exp.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
                
                {/* Icon */}
                <div className="absolute top-6 left-6 w-14 h-14 bg-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                  <exp.icon size={24} />
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-serif text-2xl text-gold-dark mb-4 group-hover:text-gold transition-colors">
                  {exp.title}
                </h3>
                <p className="text-charcoal-50 leading-relaxed">
                  {exp.description}
                </p>
                
                {/* Link/Text - Condicional */}
                {exp.title === 'Cafetería' ? (
                  <motion.a
                    href="#reservar"
                    className="inline-flex items-center mt-6 text-gold-dark font-medium text-sm uppercase tracking-wider group/link"
                    whileHover={{ x: 5 }}
                  >
                    Descubrir más
                  </motion.a>
                ) : (
                  <div className="inline-flex items-center mt-6 text-gold-dark font-medium text-sm uppercase tracking-wider">
                    Apertura 2026
                  </div>
                )}
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rotate-45 translate-x-20 -translate-y-20 group-hover:bg-gold/20 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
