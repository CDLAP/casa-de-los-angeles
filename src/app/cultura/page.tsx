'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Send, Music, Mic2, Wine, BookOpen, Palette, Camera, Users, Sparkles } from 'lucide-react'

const servicios = [
  {
    id: 'eventos',
    name: 'Eventos Privados',
    icon: Sparkles,
    description: 'Celebraciones íntimas, cumpleaños, aniversarios y reuniones especiales en un marco arquitectónico único del siglo XVIII.',
    features: ['Capacidad hasta 80 personas', 'Ambientación personalizada', 'Servicio de catering del Bistró', 'Audio e iluminación incluidos'],
  },
  {
    id: 'conciertos',
    name: 'Conciertos & Música en Vivo',
    icon: Music,
    description: 'Noches de jazz, trova, música clásica y acústica en un espacio con acústica privilegiada y atmósfera incomparable.',
    features: ['Escenario equipado', 'Sistema de sonido profesional', 'Iluminación escénica', 'Servicio de bar y cocktails'],
  },
  {
    id: 'conferencias',
    name: 'Conferencias de Prensa',
    icon: Mic2,
    description: 'El escenario perfecto para lanzamientos, ruedas de prensa y presentaciones corporativas con la elegancia que tu marca merece.',
    features: ['Podium y pantalla', 'Conexión multimedia', 'Catering ejecutivo', 'Zona de networking'],
  },
  {
    id: 'cockteles',
    name: 'Cócteles & Networking',
    icon: Wine,
    description: 'Recepciones elegantes, cocktails corporativos y eventos sociales con servicio de mixología artesanal y gastronomía francesa.',
    features: ['Barra de cocktails premium', 'Canapés del Bistró', 'Servicio de sommelier', 'Ambientación musical'],
  },
  {
    id: 'libros',
    name: 'Firmas de Libros & Presentaciones',
    icon: BookOpen,
    description: 'Un espacio literario para presentaciones editoriales, firmas de autores, clubes de lectura y eventos culturales.',
    features: ['Área de presentación', 'Mesa de firmas', 'Servicio de café gourmet', 'Cobertura fotográfica'],
  },
  {
    id: 'galeria',
    name: 'Galería & Exposiciones',
    icon: Palette,
    description: 'Muros preparados para exhibiciones de arte, fotografía, instalaciones y muestras culturales en un espacio colonial restaurado.',
    features: ['Iluminación para galerías', 'Muros de exhibición', 'Inauguración con cocktail', 'Exposición por temporada'],
  },
  {
    id: 'corporativos',
    name: 'Eventos Corporativos',
    icon: Users,
    description: 'Juntas directivas, team buildings, capacitaciones y retiros empresariales en un entorno que inspira creatividad y conexión.',
    features: ['Sala privada', 'Proyector y audio', 'Coffee break gourmet', 'Menú ejecutivo'],
  },
  {
    id: 'producciones',
    name: 'Producciones & Sesiones',
    icon: Camera,
    description: 'Locación para sesiones fotográficas, grabaciones audiovisuales, podcasts y producciones que necesiten un set con carácter único.',
    features: ['Arquitectura colonial', 'Luz natural excepcional', 'Acceso exclusivo', 'Permisos incluidos'],
  },
]

export default function CulturaPage() {
  const serviciosRef = useRef<HTMLDivElement>(null)
  const isServiciosInView = useInView(serviciosRef, { once: true, margin: '-100px' })
  const [activeServicio, setActiveServicio] = useState('eventos')
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const activeData = servicios.find(s => s.id === activeServicio)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')
    const formData = new FormData(e.currentTarget)
    const form = e.currentTarget
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) {
        setFormStatus('success')
        form.reset()
        setTimeout(() => setFormStatus('idle'), 5000)
      } else {
        setFormStatus('error')
        setTimeout(() => setFormStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('Error:', error)
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-emerald-dark">
      {/* ═══ HERO CULTURA ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-forest via-emerald-dark to-emerald-800" />
          <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L50 100M0 50L100 50' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-emerald-forest/40" />
        </div>

        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 border border-gold rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 border border-emerald-light rounded-full"
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        <div className="relative z-10 text-center text-white px-5 max-w-5xl mx-auto pt-24">
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-gold/15 scale-150" />
              <div className="relative w-56 h-56 md:w-[294px] md:h-[294px] lg:w-[368px] lg:h-[368px]">
                <Image
                  src="/images/logo-CDLA.png"
                  alt="Casa de los Ángeles Logo"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Espacio Cultural
          </motion.h1>

          <motion.p
            className="text-gold-light/80 uppercase tracking-[0.4em] text-sm md:text-base mb-8 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Eventos • Arte • Experiencias
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 mb-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-2 h-2 bg-gold/60 rotate-45" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>

          <motion.p
            className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Un espacio colonial del siglo XVIII en el corazón de Puebla, 
            listo para dar vida a tu próximo evento inolvidable
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.a
              href="#servicios"
              className="px-10 py-4 bg-emerald text-white font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-emerald-light hover:shadow-2xl hover:shadow-emerald/50"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Conoce Nuestros Espacios
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ═══ SERVICIOS ═══ */}
      <section id="servicios" ref={serviciosRef} className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A961' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isServiciosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-2xl">✦</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold mb-4 tracking-tight">
              Nuestros Espacios
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto font-light italic">
              Cada rincón de Casa de los Ángeles está diseñado para crear momentos extraordinarios
            </p>
          </motion.div>

          {/* Grid de servicios */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isServiciosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {servicios.map((servicio, index) => {
              const Icon = servicio.icon
              return (
                <motion.button
                  key={servicio.id}
                  onClick={() => setActiveServicio(servicio.id)}
                  className={`relative p-4 md:p-6 rounded-xl border transition-all duration-500 text-left ${
                    activeServicio === servicio.id
                      ? 'bg-gold/15 border-gold/40 shadow-lg shadow-gold/10'
                      : 'bg-emerald-800/30 border-gold/10 hover:border-gold/25 hover:bg-emerald-800/50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={`w-6 h-6 mb-3 transition-colors ${
                    activeServicio === servicio.id ? 'text-gold' : 'text-gold/50'
                  }`} />
                  <h3 className={`font-serif text-sm md:text-base transition-colors leading-tight ${
                    activeServicio === servicio.id ? 'text-gold' : 'text-white/70'
                  }`}>
                    {servicio.name}
                  </h3>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Detalle del servicio activo */}
          <AnimatePresence mode="wait">
            {activeData && (
              <motion.div
                key={activeServicio}
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-emerald-800/30 border border-gold/15 rounded-2xl p-8 md:p-12">
                  <div className="flex items-start gap-4 mb-6">
                    <activeData.icon className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl text-gold mb-3">
                        {activeData.name}
                      </h3>
                      <p className="text-white/60 text-lg leading-relaxed font-light">
                        {activeData.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-3 mt-8">
                    {activeData.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-white/50">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                        <span className="text-sm font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-gold/10">
                    <motion.a
                      href="#contacto-cultura"
                      className="inline-block px-10 py-4 bg-gold text-emerald-900 font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cotizar este Espacio
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ FRASE ═══ */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-2xl">⚜</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
            </div>
            <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-gold/80 leading-relaxed mb-8">
              &ldquo;Donde la historia de Puebla se encuentra con los momentos que definen tu historia&rdquo;
            </p>
            <p className="text-white/40 text-sm uppercase tracking-[0.3em]">
              Av. Don Juan de Palafox y Mendoza 222 • Centro Histórico
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACTO CULTURA ═══ */}
      <section id="contacto-cultura" className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-2xl">✦</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold mb-4 tracking-tight">
              Cotiza tu Evento
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto font-light italic">
              Cuéntanos tu visión y crearemos una propuesta a tu medida
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-stretch">
            {/* Info + Mapa */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
                <div className="p-4 sm:p-6 bg-emerald-800/30 rounded-xl border border-gold/10">
                  <MapPin className="w-6 h-6 text-gold mb-4" />
                  <h3 className="font-serif text-base sm:text-lg text-gold mb-2">Dirección</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Av. Don Juan de Palafox y Mendoza 222<br />
                    Centro Histórico, 72000<br />
                    Puebla, México
                  </p>
                </div>
                <div className="p-4 sm:p-6 bg-emerald-800/30 rounded-xl border border-gold/10">
                  <Clock className="w-6 h-6 text-gold mb-4" />
                  <h3 className="font-serif text-base sm:text-lg text-gold mb-2">Horarios</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Lunes a Domingo<br />
                    9:00 AM a 10:00 PM
                  </p>
                </div>
                <div className="p-4 sm:p-6 bg-emerald-800/30 rounded-xl border border-gold/10">
                  <Phone className="w-6 h-6 text-gold mb-4" />
                  <h3 className="font-serif text-base sm:text-lg text-gold mb-2">Teléfono</h3>
                  <a href="tel:+522206224222" className="text-gold hover:text-gold-light transition-colors">
                    +52 220 622 4222
                  </a>
                </div>
                <div className="p-4 sm:p-6 bg-emerald-800/30 rounded-xl border border-gold/10">
                  <Mail className="w-6 h-6 text-gold mb-4" />
                  <h3 className="font-serif text-base sm:text-lg text-gold mb-2">Email</h3>
                  <a href="mailto:contacto@casadelosangelespuebla.com" className="text-gold hover:text-gold-light transition-colors text-base font-medium">
                    ¡Contáctanos!
                  </a>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg flex-1 min-h-[320px] lg:min-h-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1732588895255!6m8!1m7!1sd1Dodj7zRMyS94H_li5Dtg!2m2!1d19.04310263743996!2d-98.19598203897476!3f38.10221571457995!4f-10.900318613716067!5f0.7820865974627469"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Casa de los Ángeles"
                />
              </div>
            </motion.div>

            {/* Formulario */}
            <motion.div
              className="flex"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-emerald-800/30 border border-gold/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg w-full flex flex-col">
                <h3 className="font-serif text-xl sm:text-2xl text-gold mb-4 sm:mb-6 text-center">
                  Solicita tu Cotización
                </h3>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                  <input type="hidden" name="access_key" value="0204484f-e044-4904-844f-a1d49da8394e" />
                  <input type="hidden" name="from_name" value="CDLAP Cultura" />
                  <input type="hidden" name="subject" value="Cotización Evento Cultural - Casa de los Ángeles Puebla" />

                  <div className="flex-1 flex flex-col gap-4 sm:gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Nombre *</label>
                        <input type="text" name="nombre" required className="w-full px-4 py-3 bg-emerald-900/50 border border-gold/20 rounded-lg text-white placeholder-white/25 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" placeholder="Tu nombre" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Teléfono *</label>
                        <input type="tel" name="telefono" required className="w-full px-4 py-3 bg-emerald-900/50 border border-gold/20 rounded-lg text-white placeholder-white/25 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" placeholder="+52 220 622 4222" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Email *</label>
                      <input type="email" name="email" required className="w-full px-4 py-3 bg-emerald-900/50 border border-gold/20 rounded-lg text-white placeholder-white/25 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" placeholder="tu@email.com" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Tipo de Evento *</label>
                        <select name="tipo_evento" required className="w-full pl-4 pr-12 py-3 bg-emerald-900/50 border border-gold/20 rounded-lg text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all">
                          <option value="">Seleccionar</option>
                          <option value="Evento Privado">Evento Privado</option>
                          <option value="Concierto / Música">Concierto / Música en Vivo</option>
                          <option value="Conferencia de Prensa">Conferencia de Prensa</option>
                          <option value="Cóctel / Networking">Cóctel / Networking</option>
                          <option value="Firma de Libros">Firma de Libros / Presentación</option>
                          <option value="Exposición / Galería">Exposición / Galería</option>
                          <option value="Evento Corporativo">Evento Corporativo</option>
                          <option value="Producción / Sesión">Producción / Sesión Fotográfica</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Fecha Estimada</label>
                        <input type="date" name="fecha" className="w-full px-4 py-3 bg-emerald-900/50 border border-gold/20 rounded-lg text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all cursor-pointer" onFocus={(e) => e.target.showPicker && e.target.showPicker()} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Número de Invitados</label>
                        <select name="personas" className="w-full pl-4 pr-12 py-3 bg-emerald-900/50 border border-gold/20 rounded-lg text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all">
                          <option value="">Estimado</option>
                          <option value="1-15">1 - 15 personas</option>
                          <option value="16-30">16 - 30 personas</option>
                          <option value="31-50">31 - 50 personas</option>
                          <option value="51-80">51 - 80 personas</option>
                          <option value="80+">Más de 80</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Presupuesto</label>
                        <select name="presupuesto" className="w-full pl-4 pr-12 py-3 bg-emerald-900/50 border border-gold/20 rounded-lg text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all">
                          <option value="">Rango</option>
                          <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                          <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                          <option value="$30,000 - $50,000">$30,000 - $50,000</option>
                          <option value="$50,000+">$50,000+</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Cuéntanos sobre tu evento</label>
                      <textarea name="mensaje" className="w-full px-4 py-3 bg-emerald-900/50 border border-gold/20 rounded-lg text-white placeholder-white/25 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none flex-1 min-h-[80px]" placeholder="Describe tu evento, necesidades especiales, horarios..." />
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-gold text-emerald-900 font-sans text-sm uppercase tracking-[0.15em] rounded-lg transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      disabled={formStatus === 'sending'}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Enviando...
                        </>
                      ) : formStatus === 'success' ? (
                        <div className="text-center">
                          <div className="text-base font-medium mb-1">✓ ¡Solicitud enviada!</div>
                          <div className="text-xs opacity-90">Te contactaremos pronto</div>
                        </div>
                      ) : formStatus === 'error' ? (
                        <>✖ Error al enviar</>
                      ) : (
                        <>
                          <Send size={16} />
                          Solicitar Cotización
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>

                <p className="text-center text-xs text-white/30 mt-6 px-2">
                  También puedes llamarnos al{' '}
                  <a href="tel:+522206224222" className="text-gold hover:text-gold-light whitespace-nowrap">+52 220 622 4222</a>
                  {' '}o escribirnos por{' '}
                  <a href="https://wa.me/522206224222" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light">WhatsApp</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
