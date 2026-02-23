'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palette, Brush, Landmark, Sparkles } from 'lucide-react'

const highlights = [
  {
    icon: Brush,
    title: 'Pintura & Muralismo',
    description: 'Óleo, acrílico y muralismo. Realismo fusionado con elementos oníricos y delicadas veladuras.',
  },
  {
    icon: Landmark,
    title: 'Restauración Patrimonial',
    description: 'Restauración integral del Zócalo de Puebla y conservación de "La Batalla del Cinco de Mayo" del Palacio Municipal.',
  },
  {
    icon: Palette,
    title: 'Creación en Vivo',
    description: 'Un espacio activo donde el visitante presencia el proceso creativo del artista.',
  },
  {
    icon: Sparkles,
    title: 'Obra Única',
    description: 'Piezas originales disponibles para coleccionistas. Pintura, escultura y obra restaurada.',
  },
]

export default function Atelier() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="atelier" ref={sectionRef} className="section bg-[#3F1F26] text-cream relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A961' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-gold">Atelier</h2>
          <p className="section-subtitle text-cream/70">
            by Bruno Adorate Lua
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
            <div className="space-y-8 text-cream/70 leading-relaxed text-lg">
              <p>
                El <span className="text-gold font-medium">Atelier by Bruno Adorate Lua</span> es un espacio de creación artística y restauración donde la tradición pictórica dialoga con la exploración contemporánea. Dirigido por el artista plástico Bruno Adorate Lua, el atelier reúne obra original, procesos creativos y proyectos especializados vinculados al arte y al patrimonio cultural.
              </p>
              <p>
                La producción de Bruno se centra principalmente en la pintura al óleo, aunque también explora el acrílico, el muralismo y la escultura. Su trabajo fusiona el realismo con elementos sutilmente oníricos, creando composiciones donde la luz, la atmósfera y la materia pictórica adquieren un papel protagónico mediante el uso de delicadas veladuras.
              </p>
              <p>
                Tras iniciar su trayectoria artística a temprana edad, el artista se apartó durante más de una década de los circuitos expositivos para profundizar en su técnica y visión personal. Retomó su presencia pública en 2023 con exposiciones en espacios de alto nivel, incluyendo el lobby del Senado de la República Mexicana.
              </p>
              <p>
                Paralelamente, Bruno ha desarrollado una sólida labor en el ámbito de la restauración, participando en proyectos de preservación patrimonial de gran relevancia, entre ellos la restauración integral del Zócalo de Puebla y la conservación de piezas históricas como la pintura <span className="text-gold italic">"La Batalla del Cinco de Mayo"</span> del Palacio Municipal.
              </p>
              <p>
                Esta doble dimensión, creador y conservador, otorga a su obra una profundidad singular, donde el rigor técnico se une a una sensibilidad estética contemporánea.
              </p>
              <p className="text-gold font-medium italic text-xl">
                Arte, patrimonio y creación viva: una experiencia íntima con el proceso artístico.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              className="text-center p-6 rounded-2xl border border-gold/10 bg-cream/5 hover:bg-cream/10 hover:border-gold/25 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-serif text-lg text-gold mb-2">{item.title}</h4>
              <p className="text-cream/50 text-sm leading-relaxed">{item.description}</p>
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
            Visitar el Atelier
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
