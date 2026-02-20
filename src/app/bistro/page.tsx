'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

const menuCategories = [
  {
    id: 'tablas',
    name: 'Tablas para Compartir',
    subtitle: '',
    items: [
      {
        name: 'Tabla de Charcutería · Individual',
        description: 'Selección de quesos curados y salami europeo, acompañados de uvas frescas, galletas artesanales y baguette tostada. (260 g)',
        price: '295',
      },
      {
        name: 'Tabla de Charcutería · Para Dos',
        description: 'Quesos seleccionados, jamón serrano y salami europeo, con fruta fresca, galletas artesanales y baguette crujiente. (670 g) Pensada para compartir sin prisa.',
        price: '495',
      },
      {
        name: 'Tabla Vegetariana Gourmet',
        description: 'Selección de quesos (incluye queso de cabra), uvas frescas, tomatitos cherry, galletas artesanales y baguette tostada. (720 g)',
        price: '445',
      },
    ],
  },
  {
    id: 'vinos',
    name: 'Vinos',
    subtitle: '',
    items: [
      {
        name: 'Copa de Vino',
        description: 'Tinto, blanco o lambrusco. (150 ml)',
        price: '145',
      },
      {
        name: 'Botella de Vino',
        description: 'Consulta nuestra selección del momento. (750 ml)',
        price: 'Desde 480',
      },
    ],
  },
  {
    id: 'paquetes',
    name: 'Paquetes',
    subtitle: 'Experiencias pensadas para compartir y quedarse un poco más',
    items: [
      {
        name: 'Tabla para Dos & Vino de la Casa',
        description: 'Tabla de charcutería para dos personas acompañada de una botella de vino a elegir (tinto, blanco o lambrusco). (670 g + 750 ml)',
        price: '895',
      },
      {
        name: 'Tabla Grande & Dos Botellas de Vino',
        description: 'Tabla generosa para compartir, acompañada de dos botellas de vino. (950 g + 1,500 ml) Ideal para mesas grandes o celebraciones pequeñas.',
        price: '1,490',
      },
    ],
  },
  {
    id: 'complementos',
    name: 'Complementos',
    subtitle: '',
    items: [
      {
        name: 'Baguette Tostada Extra',
        description: '(80 g)',
        price: '45',
      },
      {
        name: 'Porción Extra de Queso',
        description: '(40 g)',
        price: '65',
      },
      {
        name: 'Porción Extra de Jamón o Salami',
        description: '(40 g)',
        price: '75',
      },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    subtitle: '',
    items: [
      {
        name: 'Agua Mineral Perrier',
        description: '(330 ml)',
        price: '65',
      },
      {
        name: 'Café Americano',
        description: '(355 ml)',
        price: '78',
      },
      {
        name: 'Té Gourmet a elegir',
        description: '(355 ml)',
        price: '85',
      },
      {
        name: 'Sodas Artesanales',
        description: 'Pregunta por nuestras variedades. (355 ml)',
        price: '',
      },
    ],
  },
]

export default function BistroPage() {
  const menuRef = useRef<HTMLDivElement>(null)
  const isMenuInView = useInView(menuRef, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('tablas')

  const activeCategoryData = menuCategories.find(cat => cat.id === activeCategory)
  const activeItems = activeCategoryData?.items || []
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')
    const formData = new FormData(e.currentTarget)
    const form = e.currentTarget
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()
      const sheetParams = new URLSearchParams({
        nombre: formData.get('nombre') as string,
        email: formData.get('email') as string,
        telefono: formData.get('telefono') as string,
        fecha: formData.get('fecha') as string,
        hora: formData.get('hora') as string,
        personas: formData.get('personas') as string,
        mensaje: (formData.get('mensaje') || 'N/A') as string
      })
      fetch(`https://script.google.com/macros/s/AKfycbzropllGyfIp4yLyVGPOO0iJu7ZkSAIyqIbFqGdXCkGUxdjWTd-eRkGwzagSJ13boDpfQ/exec?${sheetParams.toString()}`, { method: 'GET', mode: 'no-cors' }).catch(err => console.log('Sheet save:', err))
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
    <div className="min-h-screen bg-bistro">
      {/* ═══ HERO BISTRÓ ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo con textura */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-bistro-dark via-bistro to-bistro-600" />
          <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L50 100M0 50L100 50' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23C9A961' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bistro-900/60 via-transparent to-bistro-dark/40" />
        </div>

        {/* Círculos decorativos */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 border border-gold rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 border border-bistro-200 rounded-full"
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Contenido Hero */}
        <div className="relative z-10 text-center text-white px-5 max-w-5xl mx-auto pt-24">
          {/* Logo */}
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

          {/* Título principal */}
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Nuestro Bistró
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            className="text-gold-light/80 uppercase tracking-[0.4em] text-sm md:text-base mb-8 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Café • Cultura & Bistró
          </motion.p>

          {/* Ornamento */}
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

          {/* Descripción */}
          <motion.p
            className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Sabores artesanales, café de especialidad y una experiencia gastronómica 
            francesa en el corazón histórico de Puebla
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.a
              href="#menu-bistro"
              className="px-10 py-4 bg-gold text-bistro-dark font-sans text-sm uppercase tracking-[0.2em] font-medium transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver Menú
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ═══ MENÚ ═══ */
      <section id="menu-bistro" ref={menuRef} className="py-20 md:py-28 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A961' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          {/* Header del menú */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isMenuInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-2xl">⚜</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold mb-4 tracking-tight">
              Nuestro Menú
            </h2>
          </motion.div>

          {/* Tabs de categorías */}
          <motion.div
            className="mb-16 -mx-5 md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMenuInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <nav className="flex md:justify-center gap-2 md:gap-8 overflow-x-auto no-scrollbar px-5 md:px-0 pb-2">
              {menuCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative font-serif italic text-lg md:text-xl whitespace-nowrap transition-all duration-500 py-2 px-4 md:px-6 flex-shrink-0 ${
                    activeCategory === category.id
                      ? 'text-gold'
                      : 'text-cream/40 hover:text-cream/70'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.name}
                  
                  {activeCategory === category.id && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full"
                      layoutId="bistroActiveIndicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Subtitle de categoría si existe */}
          {activeCategoryData && 'subtitle' in activeCategoryData && activeCategoryData.subtitle && (
            <motion.p
              className="text-center text-cream/50 text-sm italic mb-10 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {activeCategoryData.subtitle}
            </motion.p>
          )}

          {/* Items del menú */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {activeItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-serif text-gold/50 text-sm mt-1 min-w-[24px]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-2">
                          <h3 className="font-serif italic text-xl text-gold group-hover:text-gold-light transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex-1 border-b border-dotted border-gold/40 min-w-[20px] mb-1" />
                          <span className="font-serif text-lg text-gold whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                        
                        <p className="text-cream/65 text-sm leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    {index < activeItems.length - 1 && (
                      <div className="w-16 h-px bg-gold/20 mt-6" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Ornamento inferior */}
              <div className="flex items-center justify-center gap-4 mt-16">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
                <span className="text-gold text-xl">❖</span>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nota del menú */}
          <motion.p
            className="text-center text-cream/35 text-xs italic mt-12 font-light"
            initial={{ opacity: 0 }}
            animate={isMenuInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Todos nuestros productos se preparan al momento y están pensados para compartirse y disfrutarse sin prisa • Todos nuestros precios incluyen IVA
          </motion.p>
        </div>
      </section>

      {/* ═══ CONTACTO / RESERVAR ═══ */}
      <section id="reservar" className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          {/* Header */}
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
              Visítanos
            </h2>
            <p className="text-cream/60 text-lg max-w-2xl mx-auto font-light italic">
              Estamos esperándote en el corazón de Puebla
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
                <div className="p-4 sm:p-6 bg-bistro-dark/50 rounded-xl border border-gold/10">
                  <MapPin className="w-6 h-6 text-gold mb-4" />
                  <h3 className="font-serif text-base sm:text-lg text-gold mb-2">Dirección</h3>
                  <p className="text-cream/60 text-sm leading-relaxed">
                    Av. Don Juan de Palafox y Mendoza 222<br />
                    Centro Histórico, 72000<br />
                    Puebla, México
                  </p>
                </div>
                <div className="p-4 sm:p-6 bg-bistro-dark/50 rounded-xl border border-gold/10">
                  <Clock className="w-6 h-6 text-gold mb-4" />
                  <h3 className="font-serif text-base sm:text-lg text-gold mb-2">Horarios</h3>
                  <p className="text-cream/60 text-sm leading-relaxed">
                    Lunes a Domingo<br />
                    8:00 AM a 10:00 PM
                  </p>
                </div>
                <div className="p-4 sm:p-6 bg-bistro-dark/50 rounded-xl border border-gold/10">
                  <Phone className="w-6 h-6 text-gold mb-4" />
                  <h3 className="font-serif text-base sm:text-lg text-gold mb-2">Teléfono</h3>
                  <a href="tel:+522206224222" className="text-gold hover:text-gold-light transition-colors">
                    +52 220 622 4222
                  </a>
                </div>
                <div className="p-4 sm:p-6 bg-bistro-dark/50 rounded-xl border border-gold/10">
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
              <div className="bg-bistro-dark/50 border border-gold/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg w-full flex flex-col">
                <h3 className="font-serif text-xl sm:text-2xl text-gold mb-4 sm:mb-6 text-center">
                  Reservaciones
                </h3>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                  <input type="hidden" name="access_key" value="0204484f-e044-4904-844f-a1d49da8394e" />
                  <input type="hidden" name="from_name" value="CDLAP Bistró" />
                  <input type="hidden" name="subject" value="Nueva Reservación Bistró - Casa de los Ángeles Puebla" />

                  <div className="flex-1 flex flex-col gap-4 sm:gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-cream/50 mb-2">Nombre *</label>
                        <input type="text" name="nombre" required className="w-full px-4 py-3 bg-bistro-dark/80 border border-gold/20 rounded-lg text-cream placeholder-cream/30 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" placeholder="Tu nombre" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-cream/50 mb-2">Teléfono *</label>
                        <input type="tel" name="telefono" required className="w-full px-4 py-3 bg-bistro-dark/80 border border-gold/20 rounded-lg text-cream placeholder-cream/30 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" placeholder="+52 220 622 4222" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-cream/50 mb-2">Email *</label>
                      <input type="email" name="email" required className="w-full px-4 py-3 bg-bistro-dark/80 border border-gold/20 rounded-lg text-cream placeholder-cream/30 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" placeholder="tu@email.com" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-cream/50 mb-2">Fecha *</label>
                        <input type="date" name="fecha" required className="w-full px-4 py-3 bg-bistro-dark/80 border border-gold/20 rounded-lg text-cream focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all cursor-pointer" onFocus={(e) => e.target.showPicker && e.target.showPicker()} />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-cream/50 mb-2">Hora *</label>
                        <select name="hora" required className="w-full pl-4 pr-12 py-3 bg-bistro-dark/80 border border-gold/20 rounded-lg text-cream focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all">
                          <option value="">Elegir</option>
                          <option value="8:00 AM">8:00 AM</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                          <option value="6:00 PM">6:00 PM</option>
                          <option value="7:00 PM">7:00 PM</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-cream/50 mb-2">Personas *</label>
                        <select name="personas" required className="w-full pl-4 pr-12 py-3 bg-bistro-dark/80 border border-gold/20 rounded-lg text-cream focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all">
                          <option value="">Elegir</option>
                          <option value="1">1 persona</option>
                          <option value="2">2 personas</option>
                          <option value="3">3 personas</option>
                          <option value="4">4 personas</option>
                          <option value="5">5 personas</option>
                          <option value="6">6 personas</option>
                          <option value="7+">Más de 6</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <label className="block text-xs uppercase tracking-wider text-cream/50 mb-2">Solicitudes especiales</label>
                      <textarea name="mensaje" className="w-full px-4 py-3 bg-bistro-dark/80 border border-gold/20 rounded-lg text-cream placeholder-cream/30 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none flex-1 min-h-[80px]" placeholder="Alergias, celebraciones, preferencias..." />
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-gold text-bistro-dark font-sans text-sm uppercase tracking-[0.15em] rounded-lg transition-all hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                          <div className="text-base font-medium mb-1">✓ ¡Reservación recibida!</div>
                          <div className="text-xs opacity-90">Te contactaremos por teléfono</div>
                        </div>
                      ) : formStatus === 'error' ? (
                        <>✖ Error al enviar</>
                      ) : (
                        <>
                          <Send size={16} />
                          Confirmar Reservación
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>

                <p className="text-center text-xs text-cream/40 mt-6 px-2">
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
