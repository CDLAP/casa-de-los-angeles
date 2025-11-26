'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')
    
    const formData = new FormData(e.currentTarget)
    const form = e.currentTarget

    try {
      const web3formsResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      
      const web3formsData = await web3formsResponse.json()
      
      const sheetParams = new URLSearchParams({
        nombre: formData.get('nombre') as string,
        email: formData.get('email') as string,
        telefono: formData.get('telefono') as string,
        fecha: formData.get('fecha') as string,
        hora: formData.get('hora') as string,
        personas: formData.get('personas') as string,
        mensaje: (formData.get('mensaje') || 'N/A') as string
      })

      fetch(`https://script.google.com/macros/s/AKfycbzropllGyfIp4yLyVGPOO0iJu7ZkSAIyqIbFqGdXCkGUxdjWTd-eRkGwzagSJ13boDpfQ/exec?${sheetParams.toString()}`, {
        method: 'GET',
        mode: 'no-cors'
      }).catch(err => console.log('Sheet save:', err))
      
      if (web3formsData.success) {
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
    <section id="contacto" ref={sectionRef} className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Visítanos</h2>
          <p className="section-subtitle">
            Estamos esperándote en el corazón de Puebla
          </p>
          <div className="divider" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-stretch">
          {/* Contact Info + Map */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
              <div className="p-4 sm:p-6 bg-cream rounded-xl">
                <MapPin className="w-6 h-6 text-gold mb-4" />
                <h3 className="font-serif text-base sm:text-lg text-charcoal mb-2">Dirección</h3>
                <p className="text-charcoal-50 text-sm leading-relaxed">
                  Av. Don Juan de Palafox y Mendoza 222<br />
                  Centro Histórico, 72000<br />
                  Puebla, México
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-cream rounded-xl">
                <Clock className="w-6 h-6 text-gold mb-4" />
                <h3 className="font-serif text-base sm:text-lg text-charcoal mb-2">Horarios</h3>
                <p className="text-charcoal-50 text-sm leading-relaxed">
                  Lunes a Domingo<br />
                  8:00 AM a 8:00 PM
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-cream rounded-xl">
                <Phone className="w-6 h-6 text-gold mb-4" />
                <h3 className="font-serif text-base sm:text-lg text-charcoal mb-2">Teléfono</h3>
                <a
                  href="tel:+522206224222"
                  className="text-gold-dark hover:text-gold transition-colors"
                >
                  +52 220 622 4222
                </a>
              </div>

              <div className="p-4 sm:p-6 bg-cream rounded-xl">
                <Mail className="w-6 h-6 text-gold mb-4" />
                <h3 className="font-serif text-base sm:text-lg text-charcoal mb-2">Email</h3>
                <a
                  href="mailto:contacto@casadelosangelespuebla.com"
                  className="text-gold-dark hover:text-gold transition-colors text-base font-medium"
                >
                  ¡Contáctanos!
                </a>
              </div>
            </div>

            {/* Map */}
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

          {/* Reservation Form */}
          <motion.div
            id="reservar"
            className="flex"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-cream rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg w-full flex flex-col">
              <h3 className="font-serif text-xl sm:text-2xl text-gold-dark mb-4 sm:mb-6 text-center">
                Reservaciones
              </h3>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                {/* Campos ocultos para Web3Forms */}
                <input type="hidden" name="access_key" value="0204484f-e044-4904-844f-a1d49da8394e" />
                <input type="hidden" name="from_name" value="CDLAP" />
                <input type="hidden" name="subject" value="Nueva Reservación - Casa de los Ángeles Puebla" />

                <div className="flex-1 flex flex-col gap-4 sm:gap-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal-50 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      className="w-full px-4 py-3 bg-white border border-gold/20 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal-50 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      className="w-full px-4 py-3 bg-white border border-gold/20 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                      placeholder="+52 220 622 4222"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-50 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white border border-gold/20 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal-50 mb-2">
                      Fecha *
                    </label>
                    <input
                      type="date"
                      name="fecha"
                      required
                      className="w-full px-4 py-3 bg-white border border-gold/20 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all cursor-pointer select-none"
                      onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal-50 mb-2">
                      Hora *
                    </label>
                    <select
                      name="hora"
                      required
                      className="w-full pl-4 pr-12 py-3 bg-white border border-gold/20 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                    >
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
                    <label className="block text-xs uppercase tracking-wider text-charcoal-50 mb-2">
                      Personas *
                    </label>
                    <select
                      name="personas"
                      required
                      className="w-full pl-4 pr-12 py-3 bg-white border border-gold/20 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                    >
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
                  <label className="block text-xs uppercase tracking-wider text-charcoal-50 mb-2">
                    Solicitudes especiales
                  </label>
                  <textarea
                    name="mensaje"
                    className="w-full px-4 py-3 bg-white border border-gold/20 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none flex-1 min-h-[80px]"
                    placeholder="Alergias, celebraciones, preferencias..."
                  />
                </div>
                </div>

                <div className="mt-auto pt-6">
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-emerald text-white font-sans text-sm uppercase tracking-[0.15em] rounded-lg transition-all hover:bg-emerald-light hover:shadow-2xl hover:shadow-emerald/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    <>
                      ✖ Error al enviar
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Confirmar Reservación
                    </>
                  )}
                </motion.button>
                </div>
              </form>

              <p className="text-center text-xs text-charcoal-50 mt-6 px-2">
                También puedes llamarnos al{' '}
                <a href="tel:+522206224222" className="text-gold-dark hover:text-gold whitespace-nowrap">
                  +52 220 622 4222
                </a>
                {' '}o escribirnos por{' '}
                <a
                  href="https://wa.me/522206224222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-dark hover:text-gold"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
