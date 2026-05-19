import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import StarsBackground from '@/components/mercado/StarsBackground'
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

// Inline WhatsApp icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function LineamientosPage() {
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
              Lineamientos<br />Generales para<br />Expositores
            </h1>

            <div className="flex items-center justify-center gap-3 md:gap-4 mb-8">
              <div className="w-10 md:w-16 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <p className="font-sans uppercase tracking-[0.3em] text-gold text-[11px] md:text-xs whitespace-nowrap">
                {season.name} <span aria-hidden="true">🌙</span> Casa de los Ángeles
              </p>
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <div className="w-10 md:w-16 h-px bg-gold/40" />
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <p className="font-serif italic text-cream/85 text-base md:text-lg leading-relaxed">
                Gracias por formar parte de esta experiencia nocturna dentro de Casa de los Ángeles.
              </p>
              <p className="font-serif italic text-cream/85 text-base md:text-lg leading-relaxed">
                Nuestro objetivo es crear un mercado hermoso, organizado, rentable y con una experiencia premium tanto para expositores como para visitantes.
              </p>
              <p className="font-sans text-cream/70 text-sm md:text-base leading-relaxed">
                Para mantener la calidad y armonía del evento, les compartimos nuestros lineamientos generales.
              </p>
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="container-custom pb-12 md:pb-16">
          <div className="max-w-3xl mx-auto">
            {SECTIONS.map((section, i) => (
              <div key={i} className="mb-14 md:mb-16 last:mb-0">
                {/* Section divider */}
                <div className="flex items-center gap-4 mb-7">
                  <div className="flex-1 h-px bg-gold/30" />
                  <div className="w-2 h-2 bg-gold rotate-45" />
                  <div className="flex-1 h-px bg-gold/30" />
                </div>

                {/* Section title */}
                <h2
                  className="font-serif not-italic uppercase text-gold font-bold text-center leading-tight mb-8"
                  style={{
                    fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                    letterSpacing: '0.18em',
                  }}
                >
                  {section.title}
                </h2>

                {/* Items */}
                <ul className="space-y-4 md:space-y-5 max-w-2xl mx-auto">
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-4 text-cream/85 font-sans text-[15px] md:text-base leading-relaxed"
                    >
                      <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 bg-gold rotate-45" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Final divider */}
        <div className="container-custom">
          <div className="max-w-3xl mx-auto flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gold/30" />
            <div className="w-2 h-2 bg-gold rotate-45" />
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
