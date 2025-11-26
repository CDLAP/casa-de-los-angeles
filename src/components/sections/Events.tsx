'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Users, Sparkles, Heart } from 'lucide-react'

const eventTypes = [
  {
    icon: Heart,
    title: 'Bodas Íntimas',
    description: 'Celebra el día más importante en un escenario histórico incomparable. Hasta 80 invitados.',
  },
  {
    icon: Users,
    title: 'Eventos Corporativos',
    description: 'Reuniones ejecutivas, lanzamientos y cenas de negocios con servicio de primer nivel.',
  },
  {
    icon: Calendar,
    title: 'Celebraciones Privadas',
    description: 'Cumpleaños, aniversarios y reuniones familiares en un ambiente exclusivo.',
  },
  {
    icon: Sparkles,
    title: 'Experiencias Gastronómicas',
    description: 'Cenas maridaje, catas de vino y talleres culinarios con nuestro chef.',
  },
]

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="eventos" ref={sectionRef} className="section bg-cream relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-display-md text-gold-dark mb-6">
              Eventos Especiales
            </h2>
            <p className="text-charcoal-50 text-lg leading-relaxed mb-8">
              Casa de los Ángeles es el escenario perfecto para sus momentos más importantes. 
              Nuestros espacios históricos se adaptan a sus necesidades, ofreciendo un ambiente 
              único y exclusivo para hasta 70 invitados.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {eventTypes.map((event, index) => (
                <motion.div
                  key={event.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <event.icon className="w-5 h-5 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-charcoal mb-1">{event.title}</h3>
                    <p className="text-sm text-charcoal-50">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-charcoal-50 mb-6">
                Contacte con nuestra directora, <span className="text-gold-dark font-medium">Elisabeth Brand y Taboada</span>, 
                para diseñar juntos el evento de sus sueños.
              </p>
              <motion.a
                href="#contacto"
                className="btn-elegant"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar Información
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image Composition */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images/eventos-especiales.png')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              </div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/30 rounded-2xl -z-10" />

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-gold text-charcoal p-6 rounded-xl shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-center">
                  <span className="block text-4xl font-serif mb-1">70</span>
                  <span className="text-xs uppercase tracking-wider">Invitados máximo</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
