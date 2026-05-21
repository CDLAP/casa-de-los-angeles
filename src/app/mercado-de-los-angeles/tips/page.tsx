import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, Check } from 'lucide-react'
import StarsBackground from '@/components/mercado/StarsBackground'
import ReadingProgress from '@/components/mercado/ReadingProgress'
import WhatsAppIcon from '@/components/mercado/WhatsAppIcon'
import mercadoData from '@/data/mercado-de-los-angeles.json'

export const metadata: Metadata = {
  title: '10 Tips para Vender Mejor | Mercado de la Luna · Casa de los Ángeles',
  description:
    '10 principios prácticos para vender mejor en mercados y eventos. Guía para expositores del Mercado de la Luna en Casa de los Ángeles.',
  robots: {
    index: false,
    follow: true,
  },
}

interface TipItem {
  title: string
  content: string[]
}

const TIPS: TipItem[] = [
  {
    title: 'Tu stand es tu escaparate',
    content: [
      'La presentación lo es todo.',
      'Un espacio limpio, iluminado, ordenado y visualmente atractivo vende muchísimo más que uno saturado o improvisado.',
    ],
  },
  {
    title: 'La iluminación vende',
    content: [
      'Los mercados nocturnos dependen muchísimo de la luz.',
      'Una buena iluminación cálida puede hacer que tu producto se vea hasta 3 veces más atractivo.',
    ],
  },
  {
    title: 'No te sientes todo el tiempo',
    content: [
      'Los clientes conectan mucho más con expositores presentes, sonrientes y activos.',
      'La energía del vendedor cambia completamente las ventas.',
    ],
  },
  {
    title: 'Los precios deben ser claros',
    content: [
      'Cuando la gente no entiende cuánto cuesta algo, normalmente no pregunta.',
      'Tener precios visibles aumenta muchísimo la conversión.',
    ],
  },
  {
    title: 'Ofrece productos desde diferentes rangos',
    content: [
      'Tener productos pequeños impulsa compras impulsivas.',
      'Muchas veces una venta pequeña termina convirtiéndose en una venta grande.',
    ],
  },
  {
    title: 'Crea experiencia, no solo venta',
    content: [
      'La gente recuerda emociones.',
      'Cuenta la historia de tu marca, explica procesos, deja que toquen, huelan o prueben productos cuando sea posible.',
    ],
  },
  {
    title: 'Graba y sube contenido todo el evento',
    content: [
      'Las historias generan tráfico en tiempo real.',
      'Los expositores que más publican normalmente son los que más venden.',
    ],
  },
  {
    title: 'Los clientes observan más de lo que hablan',
    content: [
      'Aunque parezca que hay poco movimiento, muchas personas primero recorren el mercado y regresan después.',
      'Mantén siempre tu stand listo y tu mejor actitud.',
    ],
  },
  {
    title: 'Haz red con los demás expositores',
    content: [
      'Los mejores mercados funcionan como comunidad.',
      'Cuando los expositores se recomiendan entre sí, todos venden más.',
    ],
  },
  {
    title: 'La constancia es lo que más vende',
    content: [
      'Muchas marcas comienzan vendiendo poco y terminan convirtiéndose en favoritas del público simplemente por estar presentes constantemente.',
      'Los clientes necesitan ver una marca varias veces para confiar en ella.',
    ],
  },
]

export default function TipsPage() {
  const { settings, season } = mercadoData

  const reservaMessage = encodeURIComponent(
    `Hola, leí los 10 tips para vender mejor de ${season.name} y quiero reservar mi espacio como expositor.`
  )

  const yaLeiMessage = encodeURIComponent(
    `Hola, ya leí los 10 tips para vender mejor en ${season.name}. Listo para participar como expositor.`
  )

  return (
    <main className="relative min-h-screen bg-[#070E22] text-cream overflow-hidden">
      <ReadingProgress />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #070E22 0%, #0C1830 35%, #091529 70%, #070E22 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 0%, rgba(201, 169, 97, 0.08) 0%, transparent 45%), radial-gradient(ellipse at 70% 100%, rgba(201, 169, 97, 0.05) 0%, transparent 50%)',
          }}
        />
      </div>

      <StarsBackground />

      <div className="relative z-10">
        {/* Hero */}
        <section className="container-custom pt-[150px] md:pt-[210px] pb-12 md:pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/mercado-de-los-angeles"
              className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.22em] text-cream/80 hover:text-gold transition-colors duration-300 mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Mercado de la Luna
            </Link>

            <p className="font-serif italic text-gold text-2xl mb-5" aria-hidden="true">
              ✨
            </p>

            <h1
              className="not-italic text-gold uppercase leading-[1.05] mb-7"
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(2rem, 5.5vw, 3.75rem)',
                fontWeight: 700,
                letterSpacing: '0.01em',
                textShadow: '0 0 30px rgba(201, 169, 97, 0.15)',
              }}
            >
              10 Tips para<br />Vender Mejor
            </h1>

            <div className="flex items-center justify-center gap-3 md:gap-4 mb-9">
              <div className="w-10 md:w-16 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <p className="font-sans uppercase tracking-[0.25em] text-gold text-[11px] md:text-xs whitespace-nowrap">
                {season.name} · Casa de los Ángeles
              </p>
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <div className="w-10 md:w-16 h-px bg-gold/40" />
            </div>

            <p className="font-sans text-cream text-[17px] md:text-[19px] leading-[1.75] max-w-2xl mx-auto">
              Los mercados son una mezcla entre estrategia, presentación y energía. Hay días de flujo alto y otros más tranquilos, pero los expositores que más venden normalmente siguen estos principios.
            </p>
          </div>
        </section>

        {/* Section transition */}
        <div className="container-custom">
          <div className="max-w-3xl mx-auto flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gold/30" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="flex-1 h-px bg-gold/30" />
          </div>
        </div>

        {/* Tips */}
        <section className="container-custom py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            {TIPS.map((tip, i) => (
              <article key={i} className="mb-14 md:mb-16 last:mb-0">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-serif italic text-gold/80 text-2xl md:text-3xl leading-none tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-gold/40 leading-none">—</span>
                  <h2
                    className="not-italic text-cream leading-tight"
                    style={{
                      fontFamily: 'var(--font-fraunces), Georgia, serif',
                      fontSize: 'clamp(1.375rem, 2.6vw, 1.75rem)',
                      fontWeight: 700,
                      letterSpacing: '0.005em',
                    }}
                  >
                    {tip.title}
                  </h2>
                </div>
                <div className="h-px bg-cream/15 mb-5" />
                <div className="space-y-3.5 text-cream font-sans text-[17px] md:text-[19px] leading-[1.75] pl-1">
                  {tip.content.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section transition */}
        <div className="container-custom">
          <div className="max-w-3xl mx-auto flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gold/30" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="flex-1 h-px bg-gold/30" />
          </div>
        </div>

        {/* Recuerda reflection */}
        <section className="container-custom py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-serif italic text-gold text-2xl md:text-3xl mb-5">
              <span aria-hidden="true">✨</span> Recuerda
            </p>
            <p className="font-sans text-cream text-[17px] md:text-[19px] leading-[1.75]">
              Las ventas no dependen únicamente del flujo. Dependen muchísimo de presentación, actitud, experiencia y constancia.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="container-custom py-8 md:py-12">
          <div className="max-w-2xl mx-auto text-center">
            <p
              className="font-serif italic text-gold leading-tight"
              style={{ fontSize: 'clamp(1.375rem, 3vw, 2rem)' }}
            >
              Gracias por formar parte de {season.name} <span aria-hidden="true">🌙</span>
            </p>
          </div>
        </section>

        {/* Cross-link to Lineamientos */}
        <section className="container-custom pb-10 md:pb-12">
          <Link
            href="/mercado-de-los-angeles/informacion"
            className="group block max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-4 md:gap-5 border border-cream/15 group-hover:border-gold bg-[#0F1A2E]/40 group-hover:bg-[#0F1A2E]/70 px-6 py-6 md:px-7 md:py-7 transition-all duration-500">
              <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 border border-gold/40 group-hover:border-gold text-gold flex-shrink-0 transition-colors">
                <BookOpen className="w-5 h-5" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-sans uppercase tracking-[0.25em] text-gold text-[11px] md:text-xs mb-2">
                  Lee también
                </span>
                <span
                  className="block not-italic text-cream leading-tight"
                  style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.125rem, 1.9vw, 1.375rem)', fontWeight: 700, letterSpacing: '0.005em' }}
                >
                  Lineamientos Generales
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-cream/50 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
            </div>
          </Link>
        </section>

        {/* CTAs — three-level system */}
        <section className="container-custom pb-20 md:pb-28 pt-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-3 sm:gap-4">
            <Link
              href="/mercado-de-los-angeles"
              className="order-3 sm:order-1 inline-flex items-center justify-center gap-2 text-cream/80 hover:text-gold px-3 py-3 text-xs md:text-sm uppercase tracking-[0.25em] font-sans font-medium transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Mercado
            </Link>

            <a
              href={`https://wa.me/${settings.whatsapp}?text=${yaLeiMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="order-1 sm:order-2 inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-charcoal px-6 py-4 text-sm md:text-base uppercase tracking-[0.18em] font-sans font-medium transition-all duration-500"
            >
              <Check className="w-4 h-4" />
              Ya leí, confirmo participación
            </a>

            <a
              href={`https://wa.me/${settings.whatsapp}?text=${reservaMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="order-2 sm:order-3 inline-flex items-center justify-center gap-2.5 border border-cream/45 hover:border-cream text-cream hover:bg-cream/5 px-6 py-4 text-sm md:text-base uppercase tracking-[0.18em] font-sans font-medium transition-all duration-500"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Reservar
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
