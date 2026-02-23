'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Coffee, UtensilsCrossed, Check, Clock, Monitor, ClipboardList, Camera, Plus } from 'lucide-react'

const pressImages = [
  { src: '/images/prensa/prensa1.jpg', alt: 'Rueda de prensa en Casa de los Ángeles - Vista de panelistas' },
  { src: '/images/prensa/prensa2.jpg', alt: 'Conferencia de prensa en Casa de los Ángeles - Vista panorámica' },
  { src: '/images/prensa/prensa3.jpg', alt: 'Evento de prensa en Casa de los Ángeles - Detalle del presidium' },
]

const baseIncludes = [
  'Uso del espacio por 2 horas',
  'Montaje tipo conferencia',
  'Bocina y micrófono incluidos',
  'Café americano ilimitado',
  'Agua natural',
  'Personal de apoyo',
  'Limpieza antes y después',
  'Conexión eléctrica para equipo',
]

const extras = [
  {
    icon: Clock,
    title: 'Hora extra del espacio',
    price: '$800 MXN',
  },
  {
    icon: Monitor,
    title: 'Pantalla para presentaciones',
    price: '$1,000 MXN',
    note: 'Sin proyector incluido',
  },
  {
    icon: ClipboardList,
    title: 'Registro de invitados / recepción',
    price: '$400 MXN',
  },
  {
    icon: Camera,
    title: 'Fotografía del evento',
    price: 'Desde $1,500 MXN',
  },
]

function PressCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % pressImages.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
      {pressImages.map((img, index) => (
        <motion.img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
    </div>
  )
}

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
            Atmósfera de casona histórica con todo lo necesario para su conferencia de prensa.
          </p>
          <div className="divider" />
        </motion.div>

        {/* Main Content: Image + Description */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Carousel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <PressCarousel />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="font-serif text-display-sm text-gold-dark mb-6 text-center lg:text-left">
              El escenario perfecto para su mensaje
            </h3>
            <p className="text-charcoal-50 text-lg leading-relaxed mb-6 text-center lg:text-left">
              Casa de los Ángeles ofrece un entorno único para la realización de ruedas de prensa 
              y conferencias mediáticas. Nuestra casona del siglo XVIII, en el corazón del centro 
              histórico de Puebla, brinda un marco de distinción que eleva cualquier evento de comunicación.
            </p>
            <p className="text-charcoal-50 text-lg leading-relaxed mb-8 text-center lg:text-left">
              Ideal para comunicados oficiales, lanzamientos de productos, anuncios corporativos 
              y presentaciones institucionales ante medios. Usted trae su mensaje, nosotros ponemos 
              la atmósfera y el servicio.
            </p>

            {/* Key highlights */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
              {['Casona Histórica', 'Ubicación Céntrica', 'Servicio Completo', 'Audio Incluido'].map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 bg-gold/10 text-gold-dark text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-center lg:text-left">
              <motion.a
                href="#contacto"
                className="btn-elegant"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reservar Ahora
              </motion.a>
            </div>
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
            Hasta 20 personas · Todo incluido para una conferencia de prensa profesional.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Paquete Base Café */}
            <motion.div
              className="relative rounded-2xl border-2 border-gold/20 bg-cream/30 p-8 hover:border-gold/40 hover:shadow-xl transition-all duration-500 flex flex-col"
              whileHover={{ y: -4 }}
            >
              <div className="flex flex-col items-center md:flex-row md:items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-gold-dark" />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-serif text-xl text-charcoal">Paquete Base</h4>
                  <p className="text-sm text-charcoal-50">Conferencia + Café</p>
                </div>
              </div>

              <div className="mb-6 text-center md:text-left">
                <div className="flex items-baseline gap-1 justify-center md:justify-start">
                  <span className="font-serif text-3xl md:text-4xl text-gold-dark">$2,500</span>
                  <span className="text-charcoal-50 text-sm">MXN</span>
                </div>
                <p className="text-sm text-charcoal-50 mt-1">Hasta 20 personas</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {baseIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-gold-dark flex-shrink-0 mt-1" />
                    <span className="text-charcoal-50 text-sm">{item}</span>
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

            {/* Paquete Café + Sándwiches ó Pan Dulce */}
            <motion.div
              className="relative rounded-2xl border-2 border-gold bg-gradient-to-b from-cream to-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
              whileHover={{ y: -4 }}
            >
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gold text-white text-xs uppercase tracking-[0.15em] font-medium px-5 py-1.5 rounded-full shadow-md whitespace-nowrap">
                  Más Popular
                </span>
              </div>

              <div className="flex flex-col items-center md:flex-row md:items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6 text-gold-dark" />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-serif text-xl text-charcoal">Café + Sándwiches ó Pan Dulce</h4>
                  <p className="text-sm text-charcoal-50">Conferencia + Catering a elegir</p>
                </div>
              </div>

              <div className="mb-6 text-center md:text-left">
                <div className="flex items-baseline gap-1 justify-center md:justify-start">
                  <span className="font-serif text-3xl md:text-4xl text-gold-dark">$3,000</span>
                  <span className="text-charcoal-50 text-sm">MXN</span>
                </div>
                <p className="text-sm text-charcoal-50 mt-1">Hasta 20 personas</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gold-dark font-medium mb-2">Todo lo del Paquete Base +</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {[
                  'Sándwiches salados individuales ó selección de pan dulce fresco',
                  'Presentación tipo catering',
                  'Menaje completo y servilletas',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-gold-dark flex-shrink-0 mt-1" />
                    <span className="text-charcoal-50 text-sm">{item}</span>
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

        {/* Servicios Adicionales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-gold-dark" />
              <h3 className="font-serif text-2xl text-gold-dark">Servicios Adicionales</h3>
            </div>
            <p className="text-charcoal-50 max-w-xl mx-auto">
              Personalice su evento con los complementos que necesite.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {extras.map((extra, index) => (
              <motion.div
                key={extra.title}
                className="group p-6 rounded-2xl border border-gold/10 bg-cream/30 hover:bg-cream hover:border-gold/30 hover:shadow-lg transition-all duration-500 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <extra.icon className="w-5 h-5 text-gold-dark" />
                </div>
                <h4 className="font-serif text-lg text-charcoal mb-2">{extra.title}</h4>
                {extra.note && (
                  <p className="text-xs text-charcoal-50 mb-2 italic">{extra.note}</p>
                )}
                <p className="text-gold-dark font-semibold">{extra.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
