import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  Clock,
  Sparkles,
  BadgeCheck,
  UtensilsCrossed,
  LayoutGrid,
  CreditCard,
  RefreshCw,
  Sofa,
  Package,
  Users,
  Share2,
  TrendingUp,
  Table,
  Layers,
  Armchair,
} from 'lucide-react'
import WhatsAppIcon from '@/components/mercado/WhatsAppIcon'
import ReadingProgress from '@/components/mercado/ReadingProgress'
import mercadoData from '@/data/mercado-de-los-angeles.json'

export const metadata: Metadata = {
  title: 'Lineamientos Generales para Expositores | Mercado de los Ángeles',
  description:
    'Reglamento oficial para expositores del Mercado de los Ángeles, en el Centro Histórico de Puebla. Horarios, presentación, pagos, ambiente y lineamientos generales del evento.',
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

const SECTION_ICONS = [
  Clock,
  Sparkles,
  Lightbulb,
  BadgeCheck,
  UtensilsCrossed,
  LayoutGrid,
  CreditCard,
  RefreshCw,
  Sofa,
  Package,
  Users,
  Share2,
  TrendingUp,
]

function highlightMoney(text: string) {
  return text.split(/(\$[\d,]+\s*MXN)/g).map((part, k) =>
    /^\$[\d,]+\s*MXN$/.test(part) ? (
      <span
        key={k}
        className="inline-flex items-center bg-gold/15 border border-gold/40 text-gold-700 px-2 py-[1px] rounded-full text-[12px] md:text-[13px] font-semibold tracking-wide whitespace-nowrap"
      >
        {part}
      </span>
    ) : (
      part
    )
  )
}

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
    <main className="bg-cream text-charcoal">
      <ReadingProgress />

      {/* HERO */}
      <section className="section bg-cream pt-[150px] md:pt-[230px]">
        <div className="container-custom max-w-3xl text-center">
          <Link
            href="/mercado-de-los-angeles"
            className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.22em] text-charcoal-50 hover:text-gold-dark transition-colors duration-300 mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Mercado de los Ángeles
          </Link>

          <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm mb-6">
            {season.name} · Lineamientos
          </p>

          <h1 className="font-serif text-display-md text-gold-dark mb-7">
            Lineamientos para Expositores
          </h1>

          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-charcoal-50 text-lg md:text-xl leading-relaxed">
              Gracias por formar parte de esta experiencia dentro de Casa de los Ángeles.
            </p>
            <p className="text-charcoal-50 text-base md:text-lg leading-relaxed">
              Nuestro objetivo es crear un mercado hermoso, organizado y rentable, con una
              experiencia premium tanto para expositores como para visitantes. Para mantener
              la calidad y armonía del evento, te compartimos nuestros lineamientos generales.
            </p>
          </div>
        </div>
      </section>

      {/* ÍNDICE */}
      <section className="bg-cream-200 py-12 md:py-16">
        <div className="container-custom max-w-4xl">
          <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm mb-8 text-center">
            Índice
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {SECTIONS.map((section, i) => (
              <li key={i}>
                <a
                  href={`#${slugify(section.title)}`}
                  className="group flex items-baseline gap-3 text-charcoal/80 hover:text-gold-dark py-3 transition-colors duration-300 border-b border-gold/15"
                >
                  <span className="font-serif text-gold-dark/60 text-sm group-hover:text-gold-dark transition-colors flex-shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-base leading-snug">{section.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECCIONES — cards */}
      <section className="section bg-cream">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">
            {SECTIONS.map((section, i) => {
              const Icon = SECTION_ICONS[i] ?? Sparkles
              return (
                <div
                  key={i}
                  id={slugify(section.title)}
                  className="scroll-mt-28 bg-white border border-gold/20 rounded-2xl shadow-lg p-7 md:p-8 flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-12 h-12 bg-gold/10 rounded-full flex-shrink-0">
                      <Icon className="w-5 h-5 text-gold-dark" strokeWidth={1.5} />
                    </span>
                    <div className="flex items-baseline gap-2.5 min-w-0">
                      <span className="font-serif text-gold-dark/50 text-lg tabular-nums flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-serif text-xl md:text-2xl text-charcoal leading-tight">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <ul className="space-y-3.5">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-charcoal-50 text-[15px] md:text-base leading-relaxed"
                      >
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold/10 flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-gold-dark" strokeWidth={2.5} />
                        </span>
                        <span>{highlightMoney(item)}</span>
                      </li>
                    ))}
                  </ul>

                  {section.title === 'Mobiliario y espacio' && (
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {[
                        { icon: Table, label: 'Mesa', detail: '1.80 m' },
                        { icon: Layers, label: 'Mantel', detail: 'Incluido' },
                        { icon: Armchair, label: 'Silla', detail: '1 pieza' },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="flex flex-col items-center text-center gap-2 bg-cream-200 rounded-xl px-2 py-4"
                        >
                          <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm">
                            <m.icon className="w-4 h-4 text-gold-dark" strokeWidth={1.5} />
                          </span>
                          <span className="font-serif text-charcoal text-sm leading-tight">
                            {m.label}
                          </span>
                          <span className="font-sans uppercase tracking-[0.14em] text-gold-dark text-[10px]">
                            {m.detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-cream-200 py-16 md:py-24">
        <div className="container-custom max-w-2xl text-center">
          <p className="font-serif text-display-sm text-gold-dark leading-tight">
            Gracias por ayudarnos a construir uno de los mercados más especiales y cuidados
            del Centro Histórico de Puebla.
          </p>
        </div>
      </section>

      {/* CROSS-LINK to Tips */}
      <section className="bg-cream pt-16 md:pt-20">
        <div className="container-custom max-w-2xl">
          <Link
            href="/mercado-de-los-angeles/tips"
            className="group bg-white border border-gold/20 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-6 md:p-7 flex items-center gap-5"
          >
            <span className="flex items-center justify-center w-14 h-14 bg-gold/10 rounded-full flex-shrink-0 group-hover:bg-gold/20 transition-colors">
              <Lightbulb className="w-6 h-6 text-gold-dark" strokeWidth={1.5} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-sans uppercase tracking-[0.22em] text-gold text-[11px] md:text-xs mb-1.5">
                Sigue con
              </span>
              <span className="block font-serif text-xl md:text-2xl text-charcoal leading-tight">
                10 Tips para Vender Mejor
              </span>
            </span>
            <ArrowRight className="w-5 h-5 text-charcoal-50 group-hover:text-gold-dark transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
          </Link>
        </div>
      </section>

      {/* CTAs */}
      <section className="section bg-cream">
        <div className="container-custom max-w-4xl flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/mercado-de-los-angeles"
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
