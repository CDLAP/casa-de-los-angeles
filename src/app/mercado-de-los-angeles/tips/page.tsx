import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import StarsBackground from '@/components/mercado/StarsBackground'
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

// Inline WhatsApp icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function TipsPage() {
  const { settings, season } = mercadoData

  const reservaMessage = encodeURIComponent(
    `Hola, quiero reservar mi espacio para ${season.name} en Casa de los Ángeles.`
  )

  return (
    <main className="relative min-h-screen bg-[#070C18] text-cream overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #060A14 0%, #0A1428 35%, #08101F 70%, #050912 100%)',
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
              className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/55 hover:text-gold transition-colors duration-300 mb-10"
            >
              <ArrowLeft className="w-3 h-3" />
              Volver al Mercado de la Luna
            </Link>

            <p className="font-serif italic text-gold text-2xl mb-4" aria-hidden="true">
              ✨
            </p>

            <h1
              className="font-serif not-italic text-gold uppercase leading-[1.05] mb-5"
              style={{
                fontSize: 'clamp(1.875rem, 5vw, 3.5rem)',
                fontWeight: 900,
                letterSpacing: '0.05em',
                textShadow: '0 0 30px rgba(201, 169, 97, 0.15)',
              }}
            >
              10 Tips para<br />Vender Mejor
            </h1>

            <div className="flex items-center justify-center gap-3 md:gap-4 mb-8">
              <div className="w-10 md:w-16 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <p className="font-sans uppercase tracking-[0.3em] text-gold text-[11px] md:text-xs whitespace-nowrap">
                {season.name} · Casa de los Ángeles
              </p>
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <div className="w-10 md:w-16 h-px bg-gold/40" />
            </div>

            <p className="font-serif italic text-cream/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Los mercados son una mezcla entre estrategia, presentación y energía. Hay días de flujo alto y otros más tranquilos, pero los expositores que más venden normalmente siguen estos principios.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="container-custom">
          <div className="max-w-3xl mx-auto flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gold/25" />
            <div className="w-2 h-2 bg-gold rotate-45" />
            <div className="flex-1 h-px bg-gold/25" />
          </div>
        </div>

        {/* Tips */}
        <section className="container-custom py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            {TIPS.map((tip, i) => (
              <article key={i} className="mb-12 md:mb-14 last:mb-0">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-serif italic text-gold/70 text-lg md:text-xl leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-gold/40 leading-none">—</span>
                  <h2
                    className="font-serif not-italic uppercase text-gold font-bold leading-tight"
                    style={{
                      fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {tip.title}
                  </h2>
                </div>
                <div className="h-px bg-gold/20 mb-5" />
                <div className="space-y-3 text-cream/85 font-sans text-[15px] md:text-base leading-relaxed pl-1">
                  {tip.content.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="container-custom">
          <div className="max-w-3xl mx-auto flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gold/25" />
            <div className="w-2 h-2 bg-gold rotate-45" />
            <div className="flex-1 h-px bg-gold/25" />
          </div>
        </div>

        {/* Recuerda reflection */}
        <section className="container-custom py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-serif italic text-gold text-xl md:text-2xl mb-5">
              <span aria-hidden="true">✨</span> Recuerda
            </p>
            <p className="font-serif italic text-cream/85 text-base md:text-lg leading-relaxed">
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

        {/* CTAs */}
        <section className="container-custom pb-20 md:pb-28">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <Link
              href="/mercado-de-los-angeles"
              className="inline-flex items-center justify-center gap-2 border border-gold/60 hover:border-gold text-gold hover:bg-gold/10 px-6 py-4 text-sm uppercase tracking-[0.25em] font-sans font-medium transition-all duration-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Mercado
            </Link>

            <a
              href={`https://wa.me/${settings.whatsapp}?text=${reservaMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-charcoal px-6 py-4 text-sm uppercase tracking-[0.25em] font-sans font-medium transition-all duration-500"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Reservar por WhatsApp
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
