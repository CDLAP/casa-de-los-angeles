import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Lightbulb } from 'lucide-react'
import StarsBackground from '@/components/mercado/StarsBackground'
import ReadingProgress from '@/components/mercado/ReadingProgress'
import WhatsAppIcon from '@/components/mercado/WhatsAppIcon'
import mercadoData from '@/data/mercado-de-los-angeles.json'

export const metadata: Metadata = {
  title: 'Lineamientos Generales para Expositores | Mercado de la Luna · Casa de los Ángeles',
  description:
    'Reglamento oficial para expositores del Mercado de la Luna en Casa de los Ángeles. Horarios, presentación, pagos, ambiente y lineamientos generales del evento.',
  robots: {
    index: false,
    follow: true,
  },
}

interface Section {
  title: string
  items: string[]
}

const SECTIONS: Section[] = [
  {
    title: 'Horarios y montaje',
    items: [
      'El montaje se realiza de 4:00 PM a 5:00 PM.',
      'La venta comienza oficialmente a las 5:00 PM.',
      'Todos los expositores deberán estar listos o presentes a esa hora.',
      'Después de las 5:00 PM se aplica una cuota de puntualidad de $100 MXN.',
    ],
  },
  {
    title: 'Montaje y presentación',
    items: [
      'Pedimos un montaje limpio, bonito y visualmente cuidado.',
      'Expositores de ropa y joyería: recomendamos ampliamente traer espejos.',
      'Procuramos mantener una estética elegante y organizada dentro del mercado.',
      'Recomendamos evitar cajas visibles, exceso de plástico, lonas improvisadas o montaje visualmente saturado.',
    ],
  },
  {
    title: 'Iluminación y electricidad',
    items: [
      'La conexión eléctrica tiene un costo adicional de $50 MXN por día.',
      'Recomendamos ampliamente traer lámparas recargables USB para mantener la atmósfera cálida y estética del mercado.',
    ],
  },
  {
    title: 'Servicios incluidos',
    items: [
      'Acceso a baño limpio durante todo el evento.',
      'Limpieza constante del área común.',
      'Agua potable ilimitada para expositores (recomendamos traer su propia botella).',
      'Precios preferenciales dentro de nuestra cafetería.',
    ],
  },
  {
    title: 'Alimentos y seguridad',
    items: [
      'Pedimos evitar alimentos con olores fuertes o comida grasosa dentro del espacio.',
      'No aceptamos giros que utilicen gas, fuego, humo o materiales flamables por lineamientos de Protección Civil.',
      'No está permitido prender ningún elemento que genere humo o fuego dentro del recinto.',
    ],
  },
  {
    title: 'Espacios y ubicaciones',
    items: [
      'La colocación de espacios se realiza conforme al orden de pago y prioridad de expositores residentes.',
      'Nosotros nos encargamos completamente de la organización y distribución general del espacio.',
      'No se permiten cambios de mesa, movimientos o intercambios de lugar sin autorización previa del equipo organizador.',
      'Los espacios son personales e intransferibles sin autorización previa.',
    ],
  },
  {
    title: 'Pagos y reservaciones',
    items: [
      'Las fechas deberán quedar liquidadas en su totalidad antes del evento.',
      'No manejamos apartados debido al cupo limitado del mercado.',
      'Los pagos normalmente se realizan vía transferencia bancaria.',
      'Ofrecemos 5% de descuento realizando pago presencial anticipado directamente en Casa de los Ángeles.',
      'En caso de requerir factura, deberá agregarse el 16% correspondiente al IVA.',
    ],
  },
  {
    title: 'Cancelaciones y cambios',
    items: [
      'No realizamos devoluciones ni reembolsos una vez confirmada la participación.',
      'Cualquier cambio deberá ser autorizado previamente por el equipo organizador.',
    ],
  },
  {
    title: 'Mobiliario y espacio',
    items: [
      'El mobiliario deberá entregarse en las mismas condiciones en las que fue recibido.',
      'En caso de daños, se aplicará una cuota de recuperación de $500 MXN.',
      'Incluimos únicamente 1 silla por expositor.',
      'En caso de asistir más personas, deberá notificarse previamente para autorización.',
    ],
  },
  {
    title: 'Mercancía y responsabilidad',
    items: [
      'Permitimos dejar mercancía durante la noche bajo responsabilidad del expositor.',
      'Cada expositor es responsable de su mercancía, inventario, ventas y objetos personales durante el evento.',
    ],
  },
  {
    title: 'Ambiente y convivencia',
    items: [
      'La comunicación, respeto y buena convivencia son fundamentales para nosotros.',
      'Cuidamos muchísimo el ambiente familiar, humano y colaborativo entre todos los participantes.',
      'Nos reservamos el derecho de admisión y permanencia de marcas o expositores que no respeten el ambiente, lineamientos o imagen del mercado.',
    ],
  },
  {
    title: 'Promoción y redes sociales',
    items: [
      'Pedimos el apoyo de todos los expositores para subir mínimo 5 historias al día del mercado.',
      'La promoción colectiva ayuda enormemente a incrementar las ventas y alcance de todos.',
      'Recomendamos traer tarjetas, bolsas bonitas, códigos QR, terminal bancaria y métodos de pago digitales para mejorar la experiencia de compra.',
    ],
  },
  {
    title: 'Recomendaciones de venta',
    items: [
      'Mantener una actitud activa y amable aumenta muchísimo las ventas.',
      'Los mercados tienen días de flujo alto y flujo bajo; la constancia y presencia hacen una enorme diferencia.',
      'Muchos clientes recorren primero y compran después, por lo que es importante mantener siempre el stand listo y bien presentado.',
    ],
  },
]

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function LineamientosPage() {
  const { settings, season } = mercadoData

  const reservaMessage = encodeURIComponent(
    `Hola, leí los Lineamientos Generales completos de ${season.name} y quiero reservar mi espacio como expositor.`
  )

  const yaLeiMessage = encodeURIComponent(
    `Hola, ya leí los Lineamientos Generales completos para ${season.name}. Confirmo que estoy de acuerdo y quiero participar como expositor.`
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

            {/* Page title — friendlier Fraunces */}
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
              Lineamientos<br />Generales para<br />Expositores
            </h1>

            <div className="flex items-center justify-center gap-3 md:gap-4 mb-9">
              <div className="w-10 md:w-16 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <p className="font-sans uppercase tracking-[0.25em] text-gold text-[11px] md:text-xs whitespace-nowrap">
                {season.name} <span aria-hidden="true">🌙</span> Casa de los Ángeles
              </p>
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <div className="w-10 md:w-16 h-px bg-gold/40" />
            </div>

            {/* Intro — sans-serif, generous size, real reading comfort */}
            <div className="space-y-4 md:space-y-5 max-w-2xl mx-auto">
              <p className="font-sans text-cream text-[17px] md:text-[19px] leading-[1.75]">
                Gracias por formar parte de esta experiencia nocturna dentro de Casa de los Ángeles.
              </p>
              <p className="font-sans text-cream/95 text-[17px] md:text-[19px] leading-[1.75]">
                Nuestro objetivo es crear un mercado hermoso, organizado, rentable y con una experiencia premium tanto para expositores como para visitantes.
              </p>
              <p className="font-sans text-cream/85 text-base md:text-[17px] leading-[1.75]">
                Para mantener la calidad y armonía del evento, les compartimos nuestros lineamientos generales.
              </p>
            </div>
          </div>
        </section>

        {/* TOC / Índice */}
        <section className="container-custom pb-12 md:pb-14">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-7">
              <div className="flex-1 max-w-[80px] h-px bg-gold/30" />
              <p className="font-sans uppercase tracking-[0.3em] text-gold text-[11px] md:text-xs">
                Índice
              </p>
              <div className="flex-1 max-w-[80px] h-px bg-gold/30" />
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0">
              {SECTIONS.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#${slugify(section.title)}`}
                    className="group flex items-baseline gap-3 text-cream/85 hover:text-gold py-3 transition-colors duration-300 border-b border-cream/10 hover:border-gold/50"
                  >
                    <span className="font-serif text-cream/55 text-sm group-hover:text-gold transition-colors flex-shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-base md:text-[17px] leading-snug">
                      {section.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Sections */}
        <section className="container-custom pb-12 md:pb-16">
          <div className="max-w-3xl mx-auto">
            {SECTIONS.map((section, i) => (
              <div
                key={i}
                id={slugify(section.title)}
                className="mb-16 md:mb-20 last:mb-0 scroll-mt-24 md:scroll-mt-28"
              >
                {/* Section transition rombo */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-gold/30" />
                  <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                  <div className="flex-1 h-px bg-gold/30" />
                </div>

                {/* Section title — Fraunces, friendlier */}
                <h2
                  className="not-italic text-cream text-center leading-tight mb-9"
                  style={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontSize: 'clamp(1.625rem, 3.4vw, 2.125rem)',
                    fontWeight: 700,
                    letterSpacing: '0.005em',
                  }}
                >
                  {section.title}
                </h2>

                {/* Items — editorial em-dash bullet, generous body type */}
                <ul className="space-y-5 max-w-2xl mx-auto">
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-4 text-cream font-sans text-[17px] md:text-[19px] leading-[1.75]"
                    >
                      <span
                        className="flex-shrink-0 mt-[0.75em] w-3.5 h-[1.5px] bg-gold"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Final transition */}
        <div className="container-custom">
          <div className="max-w-3xl mx-auto flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gold/30" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="flex-1 h-px bg-gold/30" />
          </div>
        </div>

        {/* Closing */}
        <section className="container-custom py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <p
              className="font-serif italic text-gold leading-tight"
              style={{ fontSize: 'clamp(1.375rem, 3vw, 2rem)' }}
            >
              Gracias por ayudarnos a construir uno de los mercados nocturnos más especiales y cuidados del Centro Histórico de Puebla. <span aria-hidden="true">🌙✨</span>
            </p>
          </div>
        </section>

        {/* Cross-link to Tips */}
        <section className="container-custom pb-10 md:pb-12">
          <Link
            href="/mercado-de-los-angeles/tips"
            className="group block max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-4 md:gap-5 border border-cream/15 group-hover:border-gold bg-[#0F1A2E]/40 group-hover:bg-[#0F1A2E]/70 px-6 py-6 md:px-7 md:py-7 transition-all duration-500">
              <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 border border-gold/40 group-hover:border-gold text-gold flex-shrink-0 transition-colors">
                <Lightbulb className="w-5 h-5" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-sans uppercase tracking-[0.25em] text-gold text-[11px] md:text-xs mb-2">
                  Sigue con
                </span>
                <span
                  className="block not-italic text-cream leading-tight"
                  style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.125rem, 1.9vw, 1.375rem)', fontWeight: 700, letterSpacing: '0.005em' }}
                >
                  10 Tips para Vender Mejor
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-cream/50 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
            </div>
          </Link>
        </section>

        {/* CTAs — three-level system: ghost / primary / secondary */}
        <section className="container-custom pb-20 md:pb-28 pt-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-3 sm:gap-4">
            {/* Volver — ghost link, last on mobile, first on desktop */}
            <Link
              href="/mercado-de-los-angeles"
              className="order-3 sm:order-1 inline-flex items-center justify-center gap-2 text-cream/80 hover:text-gold px-3 py-3 text-xs md:text-sm uppercase tracking-[0.25em] font-sans font-medium transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Mercado
            </Link>

            {/* Ya leí — primary gold filled */}
            <a
              href={`https://wa.me/${settings.whatsapp}?text=${yaLeiMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="order-1 sm:order-2 inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-charcoal px-6 py-4 text-sm md:text-base uppercase tracking-[0.18em] font-sans font-medium transition-all duration-500"
            >
              <Check className="w-4 h-4" />
              Ya leí, confirmo participación
            </a>

            {/* Reservar — secondary cream border */}
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
