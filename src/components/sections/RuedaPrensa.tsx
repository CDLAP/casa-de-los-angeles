'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mic, Camera, Wifi, Users, MonitorPlay, ShieldCheck, Coffee, UtensilsCrossed, Check } from 'lucide-react'

const features = [
  {
    icon: Mic,
    title: 'Mobiliario Completo',
    description: 'Mesas, sillas, atril y todo el mobiliario necesario para la realización de su conferencia de prensa.',
  },
  {
    icon: Camera,
    title: 'Iluminación & Acústica',
    description: 'Ambientes con luz natural e iluminación controlada, acústica óptima para grabación profesional.',
  },
  {
    icon: Wifi,
    title: 'Conectividad',
    description: 'WiFi de alta velocidad y soporte técnico para transmisiones en vivo y streaming.',
  },
  {
    icon: Users,
    title: 'Capacidad Flexible',
    description: 'Configuraciones modulares para grupos de 10 a 70 personas según el formato de su evento.',
  },
  {
    icon: MonitorPlay,
    title: 'Equipamiento Audiovisual',
    description: 'Pantallas, proyección y sistema de sonido disponibles para presentaciones impactantes.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacidad & Exclusividad',
    description: 'Acceso controlado y espacios privados que garantizan la confidencialidad de su evento.',
  },
]

export default function RuedaPrensa() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="rueda-de-prensa" ref={sectionRef} className="section bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Ruedas de Prensa</h2>
          <p className="section-subtitle">
            Un escenario histórico y sofisticado para sus conferencias de prensa y eventos mediáticos.
          </p>
          <div className="divider" />
        </motion.div>

        {/* Main Content: Image + Description */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative pb-4 pr-4 md:pb-8 md:pr-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url('/images/eventos-especiales.png')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/20 to-transparent" />
                
                {/* Badge overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <p className="text-sm text-charcoal-50 uppercase tracking-wider mb-1">Centro Histórico de Puebla</p>
                    <p className="font-serif text-lg text-gold-dark">Av. Don Juan de Palafox y Mendoza 222</p>
                  </div>
                </div>
              </div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/20 rounded-2xl -z-10 hidden md:block" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="font-serif text-display-sm text-gold-dark mb-6">
              El escenario perfecto para su mensaje
            </h3>
            <p className="text-charcoal-50 text-lg leading-relaxed mb-6">
              Casa de los Ángeles ofrece un entorno único e inigualable para la realización de ruedas de prensa 
              y conferencias mediáticas. Nuestra casona del siglo XVIII, ubicada en el corazón del centro 
              histórico de Puebla, brinda un marco de distinción y elegancia que eleva cualquier evento de comunicación.
            </p>
            <p className="text-charcoal-50 text-lg leading-relaxed mb-8">
              Ya sea para lanzamientos de productos, anuncios corporativos, presentaciones institucionales o 
              conferencias de prensa, nuestros espacios se adaptan a sus necesidades con atención impecable 
              y servicio de catering premium.
            </p>

            {/* Key highlights */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['Catering Gourmet', 'Ubicación Céntrica', 'Servicio Personalizado'].map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 bg-gold/10 text-gold-dark text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <motion.a
              href="#contacto"
              className="btn-elegant"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Reservar Ahora
            </motion.a>
          </motion.div>
        </div>

        {/* Packages */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="font-serif text-display-sm text-gold-dark text-center mb-4">Paquetes</h3>
          <p className="text-charcoal-50 text-center mb-12 max-w-2xl mx-auto">
            Servicio para 20 personas con todo lo necesario para una conferencia de prensa exitosa.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Paquete Esencial */}
            <motion.div
              className="relative rounded-2xl border-2 border-gold/20 bg-cream/30 p-8 md:p-10 hover:border-gold/40 hover:shadow-xl transition-all duration-500"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-gold-dark" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-charcoal">Esencial</h4>
                  <p className="text-sm text-charcoal-50">Conferencia + Coffee Break</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl text-gold-dark">$2,500</span>
                  <span className="text-charcoal-50 text-sm">MXN</span>
                </div>
                <p className="text-sm text-charcoal-50 mt-1">Precio fijo · 20 personas</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Espacio privado para 20 personas',
                  'Sistema de audio profesional',
                  'Servicio de café de especialidad',
                  'Selección de galletas artesanales',
                  'WiFi de alta velocidad',
                  'Montaje y desmontaje incluido',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
                    <span className="text-charcoal-50">{item}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#contacto"
                className="btn-elegant w-full text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reservar
              </motion.a>
            </motion.div>

            {/* Paquete Premium */}
            <motion.div
              className="relative rounded-2xl border-2 border-gold bg-gradient-to-b from-cream to-white p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500"
              whileHover={{ y: -4 }}
            >
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gold text-white text-xs uppercase tracking-[0.15em] font-medium px-5 py-1.5 rounded-full shadow-md">
                  Recomendado
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6 text-gold-dark" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-charcoal">Premium</h4>
                  <p className="text-sm text-charcoal-50">Conferencia + Catering Completo</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl text-gold-dark">$3,000</span>
                  <span className="text-charcoal-50 text-sm">MXN</span>
                </div>
                <p className="text-sm text-charcoal-50 mt-1">Precio fijo · 20 personas</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Todo lo incluido en el paquete Esencial',
                  'Sistema de audio profesional',
                  'Servicio de café de especialidad',
                  'Sándwiches gourmet artesanales',
                  'WiFi de alta velocidad',
                  'Montaje y desmontaje incluido',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
                    <span className="text-charcoal-50">{item}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#contacto"
                className="btn-filled w-full text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reservar
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group p-8 rounded-2xl border border-gold/10 bg-cream/50 hover:bg-cream hover:border-gold/30 hover:shadow-lg transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-gold-dark" />
              </div>
              <h4 className="font-serif text-xl text-charcoal mb-3">{feature.title}</h4>
              <p className="text-charcoal-50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
