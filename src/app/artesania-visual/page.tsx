'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Film,
  Camera,
  Palette,
  Megaphone,
  Sparkles,
  TrendingUp,
  Mail,
  Check,
  Send,
  Quote,
  ArrowRight,
} from 'lucide-react'

// ─── Configuración rápida ───────────────────────────────────────────
// Agregar más es tan simple como sumar objetos a este arreglo.
// type 'image' o 'video'; los videos se reproducen solos en silencio. El label aparece sobre cada pieza.
const galleryItems: { type: 'image' | 'video'; src: string; label: string; hideLabel?: boolean }[] = [
  { type: 'image', src: '/images/artesania/dp.jpg', label: 'Desayuno París', hideLabel: true },
  { type: 'video', src: '/images/artesania/talavera.mp4', label: 'Talavera' },
  { type: 'image', src: '/images/artesania/ss.jpg', label: 'Lifestyle' },
  { type: 'image', src: '/images/artesania/cc.jpg', label: 'Café' },
  { type: 'image', src: '/images/artesania/pan.jpg', label: 'Panadería' },
  { type: 'video', src: '/images/artesania/madres.mp4', label: 'Reel' },
  { type: 'image', src: '/images/artesania/branding.jpg', label: 'Branding' },
  { type: 'image', src: '/images/artesania/talavera.jpg', label: 'Cerámica' },
  { type: 'image', src: '/images/artesania/textil.jpg', label: 'Textil' },
  { type: 'image', src: '/images/artesania/moda.jpg', label: 'Moda' },
  { type: 'video', src: '/images/artesania/te.mp4', label: 'Té' },
  { type: 'image', src: '/images/artesania/cita.jpg', label: 'Editorial' },
  { type: 'image', src: '/images/artesania/mezcal.jpg', label: 'Mezcal' },
  { type: 'image', src: '/images/artesania/plata.jpg', label: 'Joyería' },
  { type: 'image', src: '/images/artesania/talagold.jpg', label: 'Cerámica' },
  { type: 'image', src: '/images/artesania/artes.jpg', label: 'Arte' },
]

const WHATSAPP = '522206224222'
const EMAIL = 'contacto@casadelosangelespuebla.com'

const services = [
  {
    icon: Film,
    title: 'Producción visual mensual',
    description:
      'Video promocional cinematográfico de 45 segundos grabado dentro de Casa de los Ángeles, con tomas de producto y lifestyle, integración de tu logo y branding, y edición profesional lista para redes sociales.',
  },
  {
    icon: Camera,
    title: 'Contenido mensual para redes',
    description:
      'Treinta fotografías verticales para historias, optimizadas para Instagram y WhatsApp, con edición estética, branding visual uniforme y fotografías de producto y montaje.',
  },
  {
    icon: Palette,
    title: 'Dirección creativa y asesoría',
    description:
      'Acompañamos a cada marca a mejorar su presentación visual, el acomodo de sus productos, la estética de su stand, su identidad visual, su narrativa de marca y su comunicación comercial.',
  },
  {
    icon: Megaphone,
    title: 'Promoción dentro del ecosistema',
    description:
      'Las marcas participantes también aparecen en campañas oficiales, redes sociales, mercados temáticos, contenido promocional y experiencias dentro de Casa de los Ángeles.',
  },
]

const packages = [
  {
    icon: Camera,
    title: 'Presencia Artesanal',
    price: '$1,500 MXN',
    period: 'al mes',
    description:
      'Ideal para artesanos, emprendedores y pequeños negocios que quieren mantener presencia digital constante.',
    features: [
      '8 fotografías profesionales de producto',
      '4 diseños para publicaciones de feed',
      '4 historias para Instagram o WhatsApp',
      'Adaptación de logo y datos de contacto',
      '1 publicación en las historias de Casa de los Ángeles',
      'Asesoría de imagen y presentación (30 min)',
    ],
    featured: false,
  },
  {
    icon: Film,
    title: 'Impulso Artesanal',
    price: '$3,500 MXN',
    period: 'al mes',
    description:
      'Para marcas que buscan crecer visualmente con video, más contenido y dirección creativa completa.',
    features: [
      'Video cinematográfico mensual (45 segundos)',
      '30 fotografías profesionales para redes',
      'Diseños para publicaciones de feed e historias',
      'Dirección creativa completa',
      'Adaptación de logo, branding y datos de contacto',
      'Publicación en las historias de Casa de los Ángeles',
      'Promoción dentro del ecosistema (campañas y mercados)',
    ],
    featured: true,
  },
]

// Testimonios de MUESTRA — reemplazar por testimonios reales antes de publicar.
const testimonials = [
  {
    quote:
      'El contenido cambió por completo cómo se ve mi marca. Las fotos parecen de revista y mis ventas en redes crecieron.',
    author: 'Mariana',
    role: 'Joyería artesanal',
  },
  {
    quote:
      'La dirección creativa hizo la diferencia. Por fin mi negocio se ve profesional y con identidad propia.',
    author: 'Carlos',
    role: 'Cerámica de Talavera',
  },
  {
    quote:
      'Contenido profesional sin gastar una fortuna. El entorno de Casa de los Ángeles le da un nivel increíble a las fotos.',
    author: 'Lucía',
    role: 'Textiles artesanales',
  },
  {
    quote:
      'Pasé de tomar fotos con el celular a tener un feed que de verdad representa mi trabajo. La diferencia se nota en las ventas.',
    author: 'Diego',
    role: 'Mezcalería',
  },
  {
    quote:
      'Me ayudaron a contar la historia detrás de cada pieza. Mis clientes ahora entienden por qué vale lo que vale.',
    author: 'Fernanda',
    role: 'Repostería artesanal',
  },
  {
    quote:
      'El video que hicieron de mi taller se volvió mi mejor herramienta de venta. Lo mando por WhatsApp y cierra solo.',
    author: 'Andrés',
    role: 'Marroquinería',
  },
  {
    quote:
      'Súper fácil todo. Yo solo mando mis productos y ellos se encargan de que se vean increíbles cada mes.',
    author: 'Paola',
    role: 'Velas y aromas',
  },
  {
    quote:
      'La constancia del contenido mensual mantuvo mi marca presente. Ya no desaparezco de las redes entre mercados.',
    author: 'Roberto',
    role: 'Café de especialidad',
  },
  {
    quote:
      'Me encantó que entendieron mi estética desde el primer momento. Todo salió con la identidad de mi marca.',
    author: 'Sofía',
    role: 'Moda sustentable',
  },
  {
    quote:
      'Invertir en buenas fotos fue lo mejor que hice este año. Mi tienda en línea por fin se ve a la altura de mi producto.',
    author: 'Mateo',
    role: 'Arte y decoración',
  },
]

export default function ArtesaniaVisualPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: '-100px' })

  const [form, setForm] = useState({ nombre: '', marca: '', contacto: '', plan: 'Presencia Artesanal', mensaje: '' })

  const selectPlan = (plan: string) => {
    setForm((f) => ({ ...f, plan }))
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    const texto =
      `Hola, me interesan los planes de Casa de los Ángeles Studio.%0A%0A` +
      `Nombre: ${form.nombre}%0A` +
      `Marca / Negocio: ${form.marca}%0A` +
      `Contacto: ${form.contacto}%0A` +
      `Plan de interés: ${form.plan}%0A` +
      `Mensaje: ${form.mensaje}`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(decodeURIComponent(texto))}`, '_blank')
  }

  const inputClass =
    'w-full bg-white border border-gold/25 rounded-xl px-4 py-3 text-charcoal text-base placeholder:text-charcoal/40 focus:border-gold focus:outline-none transition-colors'

  return (
    <div className="min-h-screen bg-bistro">
      {/* ═══ HERO ═══ */}
      <section className="relative flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-bistro-dark via-bistro to-bistro-600" />
          <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-[150px] md:pt-[290px] pb-16">
          <motion.p
            className="text-gold/70 text-sm uppercase tracking-[0.3em] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Estudio creativo
          </motion.p>
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Casa de los Ángeles Studio
          </motion.h1>
          <motion.p
            className="text-cream/60 text-xl max-w-2xl mx-auto font-light mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Marketing creativo para marcas artesanales mexicanas
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-2 h-2 bg-gold/60 rotate-45" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTENIDO ═══ */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5">
          {/* ── Manifiesto ── */}
          <motion.div
            className="max-w-3xl mx-auto text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-cream/70 text-xl leading-relaxed mb-8">
              Un estudio creativo especializado en impulsar marcas artesanales mexicanas a través de contenido visual,
              narrativa de marca y dirección creativa. Trabajamos desde una de las casonas más emblemáticas del Centro
              Histórico de Puebla, creando contenido dentro de un entorno artístico, cultural y arquitectónico único.
            </p>
            <p className="text-cream/50 text-lg leading-relaxed">
              No somos únicamente una agencia de publicidad. Somos un espacio donde la artesanía encuentra identidad,
              los productos cuentan historias y las marcas mexicanas elevan su imagen.
            </p>
          </motion.div>

          {/* ── ¿Qué hacemos? ── */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-gold mb-4">¿Qué hacemos?</h2>
            <p className="text-cream/50 text-lg max-w-2xl mx-auto">
              Creamos contenido visual pensado para redes sociales, posicionamiento de marca, campañas, storytelling y el
              crecimiento visual de negocios artesanales.
            </p>
          </motion.div>

          {/* ── Servicios ── */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-28">
            {services.map((item, index) => (
              <motion.div
                key={item.title}
                className="group p-8 rounded-2xl border border-gold/10 bg-cream/5 hover:bg-cream/10 hover:border-gold/25 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-5">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-cream mb-3 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-cream/50 text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Planes y paquetes ── */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-gold mb-4">Planes y paquetes</h2>
            <p className="text-cream/50 text-lg max-w-2xl mx-auto">
              Elige el nivel que mejor acompaña a tu marca. Toca un plan y te llevamos al formulario con esa opción lista.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8 items-stretch">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.title}
                onClick={() => selectPlan(pkg.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    selectPlan(pkg.title)
                  }
                }}
                className={`group relative p-8 md:p-10 rounded-2xl transition-all duration-500 flex flex-col cursor-pointer bg-cream shadow-xl hover:shadow-2xl hover:-translate-y-1 ${
                  pkg.featured ? 'border-2 border-gold' : 'border border-cream-300'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-gold text-charcoal text-xs uppercase tracking-[0.18em] font-medium px-4 py-1.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    Más popular
                  </div>
                )}
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  <pkg.icon className="w-6 h-6 text-gold-dark" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal mb-2">{pkg.title}</h3>
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="font-serif text-3xl text-gold-dark">{pkg.price}</span>
                  <span className="text-charcoal/40 text-sm">{pkg.period}</span>
                </div>
                <p className="text-charcoal/60 text-base leading-relaxed mb-6">{pkg.description}</p>
                <ul className="space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-charcoal/70 text-[15px] leading-relaxed">
                      <Check className="w-4 h-4 text-gold-dark flex-shrink-0 mt-1" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-7 inline-flex items-center gap-1.5 text-gold-dark text-sm uppercase tracking-[0.14em] font-medium group-hover:gap-3 transition-all">
                  Me interesa <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            ))}
          </div>

          {/* ── Complemento: video por pieza ── */}
          <motion.div
            className="max-w-4xl mx-auto mb-28"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              onClick={() => selectPlan('Video por pieza')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  selectPlan('Video por pieza')
                }
              }}
              className="group flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 rounded-2xl bg-cream shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer px-8 py-6 text-center sm:text-left"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Film className="w-5 h-5 text-gold-dark" />
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-xl text-charcoal mb-1">¿Solo quieres un video?</h4>
                <p className="text-charcoal/55 text-base">
                  Video cinematográfico de 15 segundos, listo para redes. Disponible como pieza individual.
                </p>
              </div>
              <div className="flex items-baseline gap-2 flex-shrink-0">
                <span className="font-serif text-2xl text-gold-dark">$1,000 MXN</span>
                <span className="text-charcoal/40 text-sm">c/u</span>
              </div>
            </div>
          </motion.div>

          {/* ── Galería de ejemplos ── */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-gold mb-4">Ejemplos de nuestro trabajo</h2>
            <p className="text-cream/50 text-lg max-w-2xl mx-auto">
              Una muestra del contenido que creamos para las marcas que forman parte de Casa de los Ángeles.
            </p>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-28">
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative mb-4 md:mb-6 break-inside-avoid rounded-2xl overflow-hidden border border-gold/10 bg-cream/5 group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
              >
                {item.type === 'video' ? (
                  <video src={item.src} className="w-full h-auto block" autoPlay muted loop playsInline preload="metadata" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}
                {!item.hideLabel && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bistro-dark/90 via-bistro-dark/30 to-transparent px-5 pt-12 pb-4">
                    <span className="text-cream text-sm uppercase tracking-[0.18em] font-sans">{item.label}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── Testimonios ── */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-gold mb-4">Lo que dicen las marcas</h2>
            <p className="text-cream/50 text-lg max-w-2xl mx-auto">
              Marcas que ya elevaron su imagen con nosotros.
            </p>
          </motion.div>

          <div className="-mx-5 px-5 mb-28">
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:thin]">
              {testimonials.map((t, index) => (
                <motion.div
                  key={index}
                  className="snap-start shrink-0 w-[280px] sm:w-[340px] p-8 rounded-2xl border border-gold/10 bg-cream/5 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: Math.min(0.1 + index * 0.06, 0.8) }}
                >
                  <Quote className="w-8 h-8 text-gold/40 mb-4" />
                  <p className="text-cream/70 text-base leading-relaxed italic mb-6 flex-1">“{t.quote}”</p>
                  <div>
                    <p className="font-serif text-lg text-cream">{t.author}</p>
                    <p className="text-cream/40 text-sm uppercase tracking-[0.12em]">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── CTA: formulario + WhatsApp ── */}
          <motion.div
            ref={formRef}
            className="max-w-3xl mx-auto scroll-mt-28"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-cream shadow-2xl rounded-2xl p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 text-gold-dark text-sm uppercase tracking-[0.2em] mb-4">
                  <TrendingUp className="w-4 h-4" />
                  Haz crecer tu marca
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-gold-dark mb-4">Pregunta por nuestros planes</h3>
                <p className="text-charcoal/60 text-lg max-w-xl mx-auto">
                  Cuéntanos sobre tu marca y te enviamos la propuesta ideal para llevar tu artesanía al siguiente nivel.
                </p>
              </div>

              {/* Formulario */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className={inputClass}
                />
                <input
                  name="marca"
                  value={form.marca}
                  onChange={handleChange}
                  placeholder="Tu marca o negocio"
                  className={inputClass}
                />
                <input
                  name="contacto"
                  value={form.contacto}
                  onChange={handleChange}
                  placeholder="WhatsApp o correo"
                  className={inputClass}
                />
                <select name="plan" value={form.plan} onChange={handleChange} className={inputClass}>
                  <option value="Presencia Artesanal">Presencia Artesanal — $1,500</option>
                  <option value="Impulso Artesanal">Impulso Artesanal — $3,500</option>
                  <option value="Video por pieza">Video por pieza — $1,000</option>
                  <option value="No estoy seguro">No estoy seguro aún</option>
                </select>
              </div>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu marca (opcional)"
                rows={4}
                className={`${inputClass} mb-6 resize-none`}
              />

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-charcoal text-sm uppercase tracking-[0.15em] font-sans font-medium transition-all duration-300 hover:bg-gold-dark hover:text-white rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" />
                  Enviar por WhatsApp
                </motion.button>
                <motion.a
                  href={`mailto:${EMAIL}?subject=Casa%20de%20los%20%C3%81ngeles%20Studio%20-%20Informaci%C3%B3n%20de%20planes`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold-dark text-gold-dark text-sm uppercase tracking-[0.15em] font-sans font-medium transition-all duration-500 hover:bg-gold-dark hover:text-white rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4" />
                  Escribirnos
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* ── Cierre ── */}
          <motion.p
            className="text-center font-serif text-2xl sm:text-3xl text-gold/80 mt-24"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Donde la artesanía se convierte en marca.
          </motion.p>
        </div>
      </section>
    </div>
  )
}
