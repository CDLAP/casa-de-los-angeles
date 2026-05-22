'use client'

import { motion } from 'framer-motion'
import { Calendar, FileText, MessageCircle } from 'lucide-react'

interface Step {
  number: string
  title: string
  description: string
  Icon: typeof Calendar
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Elige tus fechas',
    description:
      'Mira qué fines de semana de la temporada quieres participar. Puedes ir 1 sola noche, un fin de semana o toda la temporada.',
    Icon: Calendar,
  },
  {
    number: '02',
    title: 'Llena el formulario',
    description:
      'Dinos tu marca, tu Instagram y qué productos vendes. Te toma un minuto desde el celular.',
    Icon: FileText,
  },
  {
    number: '03',
    title: 'Confirma por WhatsApp',
    description:
      'Nosotros te respondemos con los datos para liquidar tu reservación y apartar tu mesa.',
    Icon: MessageCircle,
  },
]

export default function ComoFunciona() {
  return (
    <section className="container-custom py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto"
      >
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-12 md:w-20 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 md:w-20 h-px bg-gold/50" />
          </div>
          <h2
            className="not-italic text-cream leading-tight"
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(2rem, 4.8vw, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '0.005em',
            }}
          >
            Cómo Reservar tu Mesa
          </h2>
          <p className="font-sans text-cream/85 text-[17px] md:text-[19px] leading-[1.75] mt-4 max-w-xl mx-auto">
            Tres pasos sencillos. Te toma menos de cinco minutos.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
          {/* Connecting hairline on desktop (decorative) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-gold/20"
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              className="relative text-center"
            >
              {/* Number + Icon badge */}
              <div className="flex justify-center mb-6 relative z-10">
                <div className="relative w-20 h-20 flex items-center justify-center border border-gold/50 bg-[#0B1730]">
                  <step.Icon className="w-8 h-8 text-gold" strokeWidth={1.4} />
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0B1730] px-2.5 font-serif italic text-gold text-sm tabular-nums">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3
                className="not-italic text-cream mb-3"
                style={{
                  fontFamily: 'var(--font-fraunces), Georgia, serif',
                  fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)',
                  fontWeight: 700,
                  letterSpacing: '0.005em',
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-cream/90 text-base md:text-[17px] leading-[1.65] max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
