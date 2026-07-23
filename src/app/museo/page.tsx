'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function MuseoPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative pt-48 md:pt-64 pb-16 md:pb-24 bg-[#1A3A2E] overflow-hidden">
        {/* Textura sutil */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23C9A961\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold/70 text-sm uppercase tracking-[0.3em] mb-4 font-sans">Casa Museo</p>
            <h1 className="font-serif text-5xl md:text-7xl text-cream mb-6">Museo</h1>
            <p className="text-cream/60 font-serif italic text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-4">
              &ldquo;En Puebla los ángeles construyeron la ciudad. En esta casa decidieron quedarse.&rdquo;
            </p>
            <p className="text-cream/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              Un museo donde la historia, la luz y los ángeles habitan.
              Descubre a los guardianes que protegen esta casa desde sus ventanas y cristales.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-16 h-px bg-gold/40" />
              <div className="w-2 h-2 rotate-45 bg-gold/50" />
              <div className="w-16 h-px bg-gold/40" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CASA MUSEO — historia y tour presencial ===== */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Casa Museo</h2>
            <p className="font-sans uppercase tracking-[0.2em] text-gold text-xs md:text-sm">
              Un recorrido por la historia de Puebla
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-3xl mx-auto space-y-6 text-charcoal/70 text-base md:text-lg leading-relaxed font-sans"
          >
            <p>
              Cuenta la leyenda que Puebla nació de un sueño: en 1531, los ángeles trazaron sus
              calles ante los ojos del obispo Julián Garcés, y de aquel sueño se fundó la Puebla de
              los Ángeles, la ciudad que llegaría a ser puente entre el puerto de Veracruz y la
              capital del virreinato.
            </p>
            <p>
              Su eje ha sido siempre el mismo: la Avenida Don Juan de Palafox y Mendoza, la calle
              que nace frente a la Catedral y el Zócalo y atraviesa el corazón antiguo de la ciudad.
              Por ella caminaron virreyes y comerciantes, artesanos y poetas; sobre ella se
              levantaron las casonas que hoy cuentan, piedra a piedra, la historia poblana.
            </p>
            <p>
              En el número 222 de esa avenida, a media cuadra del Zócalo, se encuentra Casa de los
              Ángeles: una casona del siglo XVIII que guarda en sus patios, herrerías y vitrales la
              memoria de la ciudad que la vio nacer y los guardianes de luz que le dan nombre.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="columns-2 md:columns-3 gap-3 mt-12"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <Image
                key={n}
                src={`/images/museo/casa/cdla${n}.jpeg`}
                alt={`Casa de los Ángeles, Casa Museo, imagen ${n}`}
                width={900}
                height={1200}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="w-full h-auto rounded-xl break-inside-avoid mb-3 shadow-sm"
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mt-14"
          >
            <p className="font-serif italic text-xl md:text-2xl text-charcoal/80 max-w-2xl mx-auto leading-relaxed mb-4">
              Un tour personalizado, guiado por los dueños de la casa.
            </p>
            <p className="text-charcoal/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans mb-8">
              No es una visita con guion: quienes te abren las puertas son quienes hacen su vida
              entre estos muros. Cada recorrido se adapta a ti, entre anécdotas, rincones y siglos
              de historia. Agenda tu visita por WhatsApp.
            </p>
            <a
              href="https://wa.me/522206224222?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20el%20tour%20de%20Casa%20Museo%20en%20Casa%20de%20los%20%C3%81ngeles."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-filled inline-flex items-center justify-center gap-3"
            >
              Agendar tour por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Visítanos */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-6">Visítanos en Persona</h2>
            <p className="text-charcoal/50 font-serif italic text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-6">
              La casa cambió de dueños, de usos y de épocas, pero los guardianes en sus ventanas nunca se fueron.
            </p>
            <p className="text-charcoal/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans mb-8">
              Te invitamos a cruzar el portón y sentir lo que sus guardianes
              han ofrecido durante siglos: protección, inspiración y la luz que solo este lugar puede darte.
              Hay cosas que no se transmiten a través de una pantalla.
            </p>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-16 h-px bg-gold/40" />
              <div className="w-2 h-2 rotate-45 bg-gold/50" />
              <div className="w-16 h-px bg-gold/40" />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-charcoal/50 font-sans uppercase tracking-[0.15em]">
              <span>Don Juan de Palafox y Mendoza 222</span>
              <span className="hidden md:inline text-gold/40">◆</span>
              <span>Centro Histórico, Puebla</span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
