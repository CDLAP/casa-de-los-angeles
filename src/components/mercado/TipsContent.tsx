'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Store,
  Lightbulb,
  Smile,
  Tag,
  Layers,
  Heart,
  Camera,
  Eye,
  Users,
  Repeat,
} from 'lucide-react'
import WhatsAppIcon from '@/components/mercado/WhatsAppIcon'
import ReadingProgress from '@/components/mercado/ReadingProgress'
import mercadoData from '@/data/mercado-de-los-angeles.json'

interface TipItem {
  title: string
  content: string
}

const TIPS: TipItem[] = [
  {
    title: 'Tu stand es tu escaparate',
    content:
      'La presentación lo es todo. Un espacio limpio, iluminado, ordenado y visualmente atractivo vende muchísimo más que uno saturado o improvisado.',
  },
  {
    title: 'La iluminación vende',
    content:
      'Los mercados dependen muchísimo de la luz. Una buena iluminación cálida puede hacer que tu producto se vea hasta 3 veces más atractivo.',
  },
  {
    title: 'No te sientes todo el tiempo',
    content:
      'Los clientes conectan mucho más con expositores presentes, sonrientes y activos. La energía del vendedor cambia completamente las ventas.',
  },
  {
    title: 'Los precios deben ser claros',
    content:
      'Cuando la gente no entiende cuánto cuesta algo, normalmente no pregunta. Tener precios visibles aumenta muchísimo la conversión.',
  },
  {
    title: 'Ofrece diferentes rangos',
    content:
      'Tener productos pequeños impulsa compras espontáneas. Muchas veces una venta pequeña termina convirtiéndose en una venta grande.',
  },
  {
    title: 'Crea experiencia, no solo venta',
    content:
      'La gente recuerda emociones. Cuenta la historia de tu marca, explica procesos y deja que toquen, huelan o prueben cuando sea posible.',
  },
  {
    title: 'Graba y sube contenido',
    content:
      'Las historias generan tráfico en tiempo real. Los expositores que más publican durante el evento normalmente son los que más venden.',
  },
  {
    title: 'Los clientes observan',
    content:
      'Aunque parezca que hay poco movimiento, muchas personas primero recorren el mercado y regresan después. Mantén tu stand listo y tu mejor actitud.',
  },
  {
    title: 'Haz red con otros expositores',
    content:
      'Los mejores mercados funcionan como comunidad. Cuando los expositores se recomiendan entre sí, todos venden más.',
  },
  {
    title: 'La constancia es lo que más vende',
    content:
      'Muchas marcas comienzan vendiendo poco y terminan siendo favoritas del público por estar presentes constantemente. Los clientes necesitan ver una marca varias veces para confiar.',
  },
]

const TIP_ICONS = [
  Store,
  Lightbulb,
  Smile,
  Tag,
  Layers,
  Heart,
  Camera,
  Eye,
  Users,
  Repeat,
]

export default function TipsContent() {
  const { settings, season } = mercadoData

  const reservaMessage = encodeURIComponent(
    `Hola, leí los 10 tips para vender mejor de ${season.name} y quiero reservar mi espacio como expositor.`
  )

  const yaLeiMessage = encodeURIComponent(
    `Hola, ya leí los 10 tips para vender mejor en ${season.name}. Listo para participar como expositor.`
  )

  return (
    <main className="bg-cream text-charcoal">
      <ReadingProgress />

      {/* HERO */}
      <section className="section bg-cream pt-[150px] md:pt-[230px]">
        <div className="container-custom max-w-3xl text-center">
          <Link
            href="/mercados"
            className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.22em] text-charcoal-50 hover:text-gold-dark transition-colors duration-300 mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Mercado de los Ángeles
          </Link>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm mb-6"
          >
            {season.name} · Guía para expositores
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-display-md text-gold-dark mb-7"
          >
            10 Tips para Vender Mejor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-charcoal-50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Los mercados son una mezcla entre estrategia, presentación y energía. Los
            expositores que más venden normalmente siguen estos principios.
          </motion.p>
        </div>
      </section>

      {/* TIPS — lista limpia */}
      <section className="section bg-cream-200">
        <div className="container-custom max-w-2xl">
          <div className="divide-y divide-gold/15">
            {TIPS.map((tip, i) => {
              const Icon = TIP_ICONS[i] ?? Store
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                  className="py-9 first:pt-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-gold-dark flex-shrink-0" strokeWidth={1.5} />
                    <h2 className="font-serif text-xl md:text-2xl text-charcoal leading-tight">
                      {tip.title}
                    </h2>
                  </div>
                  <p className="text-charcoal-50 text-base md:text-[17px] leading-relaxed pl-8">
                    {tip.content}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* RECUERDA */}
      <section className="section bg-cream">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="text-center bg-emerald/5 border border-emerald/20 rounded-2xl p-10 md:p-14"
          >
            <p className="font-sans uppercase tracking-[0.3em] text-emerald text-xs md:text-sm mb-4">
              Recuerda
            </p>
            <p className="font-serif text-display-sm text-emerald-forest leading-tight mb-3">
              No solo se trata del flujo.
            </p>
            <p className="text-charcoal-50 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
              Las ventas dependen muchísimo de presentación, actitud, experiencia y
              constancia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CROSS-LINK to Lineamientos */}
      <section className="bg-cream-200 pt-16 md:pt-20">
        <div className="container-custom max-w-2xl">
          <Link
            href="/mercado-de-los-angeles/informacion"
            className="group bg-white border border-gold/20 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-6 md:p-7 flex items-center gap-5"
          >
            <span className="flex items-center justify-center w-14 h-14 bg-gold/10 rounded-full flex-shrink-0 group-hover:bg-gold/20 transition-colors">
              <BookOpen className="w-6 h-6 text-gold-dark" strokeWidth={1.5} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-sans uppercase tracking-[0.22em] text-gold text-[11px] md:text-xs mb-1.5">
                Lee también
              </span>
              <span className="block font-serif text-xl md:text-2xl text-charcoal leading-tight">
                Lineamientos Generales
              </span>
            </span>
            <ArrowRight className="w-5 h-5 text-charcoal-50 group-hover:text-gold-dark transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
          </Link>
        </div>
      </section>

      {/* CTAs */}
      <section className="section bg-cream-200 !pt-0">
        <div className="container-custom max-w-4xl flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/mercados"
            className="order-3 sm:order-1 inline-flex items-center justify-center gap-2 text-charcoal-50 hover:text-gold-dark px-3 py-3 text-xs md:text-sm uppercase tracking-[0.25em] font-sans font-medium transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Mercado
          </Link>

          <a
            href={`https://wa.me/${settings.whatsapp}?text=${yaLeiMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-filled order-1 sm:order-2 inline-flex items-center justify-center gap-3"
          >
            <Check className="w-4 h-4" />
            Ya leí, confirmo participación
          </a>

          <a
            href={`https://wa.me/${settings.whatsapp}?text=${reservaMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="order-2 sm:order-3 inline-flex items-center justify-center gap-2.5 border border-gold/40 hover:border-gold-dark text-charcoal hover:bg-gold/5 rounded-full px-6 py-3.5 text-sm md:text-base uppercase tracking-[0.18em] font-sans font-medium transition-all duration-300"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Reservar
          </a>
        </div>
      </section>
    </main>
  )
}
