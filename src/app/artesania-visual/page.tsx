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
  MessageCircle,
  Check,
  Send,
} from 'lucide-react'

// ─── Configuración rápida ───────────────────────────────────────────
// Agregar más es tan simple como sumar objetos a este arreglo.
// type 'image' o 'video'; los videos se reproducen solos en silencio. El label aparece sobre cada pieza.
const galleryItems: { type: 'image' | 'video'; src: string; label: string; hideLabel?: boolean }[] = [
  { type: 'image', src: '/images/artesania/dp.jpg', label: 'Desayuno París', hideLabel: true },
  { type: 'image', src: '/images/artesania/ss.jpg', label: 'Lifestyle' },
  { type: 'image', src: '/images/artesania/cc.jpg', label: 'Café' },
  { type: 'image', src: '/images/artesania/pan.jpg', label: 'Panadería' },
  { type: 'video', src: '/images/artesania/madres.mp4', label: 'Reel' },
  { type: 'image', src: '/images/artesania/branding.jpg', label: 'Branding' },
  { type: 'image', src: '/images/artesania/talavera.jpg', label: 'Talavera' },
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

const plans = [
  {
    icon: Camera,
    title: 'Plan Estático',
    description:
      'Posteos mensuales en formato imagen: fotografía de producto, montajes y piezas gráficas con identidad uniforme para alimentar tus redes con constancia.',
  },
  {
    icon: Film,
    title: 'Plan Video',
    description:
      'Posteos mensuales en formato video: reels y piezas cinematográficas que dan movimiento a tu marca y conectan con tu audiencia de forma orgánica.',
  },
]

export default function ArtesaniaVisualPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: '-100px' })

  const [form, setForm] = useState({ nombre: '', marca: '', contacto: '', plan: 'Ambos', mensaje: '' })

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
    'w-full bg-cream/5 border border-gold/15 rounded-xl px-4 py-3 text-cream text-base placeholder:text-cream/30 focus:border-gold/50 focus:outline-none transition-colors'

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

          {/* ── Planes mensuales ── */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-gold mb-4">Planes de posteo mensual</h2>
            <p className="text-cream/50 text-lg max-w-2xl mx-auto">
              Elige el formato que mejor cuenta tu historia. Cada plan mantiene una estética uniforme y un branding visual
              consistente mes con mes.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.title}
                className="group p-8 rounded-2xl border border-gold/10 bg-cream/5 hover:border-gold/25 transition-all duration-500 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                  <plan.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-cream mb-3 group-hover:text-gold transition-colors">
                  {plan.title}
                </h3>
                <p className="text-cream/50 text-base leading-relaxed">{plan.description}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Paquete Impulso Artesanal ── */}
          <motion.div
            className="max-w-3xl mx-auto mb-28"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative bg-gold/5 border border-gold/20 rounded-2xl p-8 md:p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-gold/70 text-sm uppercase tracking-[0.2em] mb-5">
                  <Sparkles className="w-4 h-4" />
                  Paquete destacado
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-gold mb-3">Impulso Artesanal</h3>
                <p className="text-cream text-2xl font-light mb-6">Desde $3,500 MXN mensuales</p>
                <p className="text-cream/50 text-lg max-w-xl mx-auto mb-8">
                  Ideal para artesanos, marcas emergentes, expositores, diseñadores, proyectos creativos y negocios
                  mexicanos que buscan crecer visualmente.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-cream/60 text-base">
                  {['Producción de video', 'Contenido para redes', 'Dirección creativa', 'Promoción en el ecosistema'].map(
                    (f) => (
                      <span key={f} className="inline-flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" />
                        {f}
                      </span>
                    )
                  )}
                </div>
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

          {/* ── CTA: formulario + WhatsApp ── */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gold/5 border border-gold/15 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 text-gold/70 text-sm uppercase tracking-[0.2em] mb-4">
                  <TrendingUp className="w-4 h-4" />
                  Haz crecer tu marca
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-gold mb-4">Pregunta por nuestros planes</h3>
                <p className="text-cream/50 text-lg max-w-xl mx-auto">
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
                  <option value="Ambos">Plan: Ambos (estático y video)</option>
                  <option value="Estático">Plan Estático</option>
                  <option value="Video">Plan Video</option>
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
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-charcoal text-sm uppercase tracking-[0.15em] font-sans font-medium transition-all duration-300 hover:bg-gold-light rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" />
                  Enviar por WhatsApp
                </motion.button>
                <motion.a
                  href={`mailto:${EMAIL}?subject=Casa%20de%20los%20%C3%81ngeles%20Studio%20-%20Informaci%C3%B3n%20de%20planes`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold text-gold text-sm uppercase tracking-[0.15em] font-sans font-medium transition-all duration-500 hover:bg-gold hover:text-white rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4" />
                  Escribirnos
                </motion.a>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6">
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola, me interesa Casa de los Ángeles Studio')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cream/40 text-sm hover:text-gold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  O escríbenos directo por WhatsApp
                </a>
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
