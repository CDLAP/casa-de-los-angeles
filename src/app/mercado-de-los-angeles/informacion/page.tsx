import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import StarsBackground from '@/components/mercado/StarsBackground'
import mercadoData from '@/data/mercado-de-los-angeles.json'

export const metadata: Metadata = {
  title: 'Información para Expositores | Mercado de la Luna · Casa de los Ángeles',
  description:
    'Información importante para expositores del Mercado de la Luna en Casa de los Ángeles. Horarios, lineamientos, servicios y todo lo que necesitas saber antes de tu participación.',
  robots: {
    index: false,
    follow: true,
  },
}

interface InfoItem {
  title: string
  content: string[]
}

const ITEMS: InfoItem[] = [
  {
    title: 'Horarios y puntualidad',
    content: [
      'El montaje es de 4:00 PM a 5:00 PM.',
      'La venta comienza a las 5:00 PM, por lo que todos los expositores deberán estar listos o al menos presentes a esa hora.',
      'Después de las 5:00 PM se aplica una cuota de puntualidad de $100 MXN.',
    ],
  },
  {
    title: 'Presentación del espacio',
    content: [
      'Les pedimos montar un espacio bonito y cuidado.',
      'Expositores de ropa y joyería: recomendamos ampliamente traer espejos para mejorar la experiencia de compra.',
    ],
  },
  {
    title: 'Conexión eléctrica',
    content: [
      'La conexión eléctrica tiene un costo adicional de $50 MXN por día.',
      'Recomendamos traer lámparas recargables USB para mantener la estética cálida del mercado.',
    ],
  },
  {
    title: 'Servicios incluidos',
    content: [
      'Incluimos acceso a baño limpio durante todo el evento, agua potable ilimitada y precios preferenciales dentro de nuestra cafetería.',
      'Les recomendamos traer su propia botella para rellenarla.',
    ],
  },
  {
    title: 'Ambiente familiar',
    content: [
      'Nos encanta mantener un ambiente familiar y agradable para todos.',
      'Por respeto a los demás expositores, evitamos alimentos con olores muy fuertes o grasosos dentro del espacio.',
    ],
  },
  {
    title: 'Restricciones de Protección Civil',
    content: [
      'No aceptamos giros que utilicen gas, fuego, humo o materiales flamables, por lineamientos de Protección Civil.',
    ],
  },
  {
    title: 'Asignación de espacios',
    content: [
      'La colocación de espacios se realiza conforme al orden de pago y prioridad de expositores residentes.',
    ],
  },
  {
    title: 'Comunicación y comunidad',
    content: [
      'Valoramos muchísimo la buena comunicación y el trato humano entre todos.',
      'Queremos construir una comunidad bonita, respetuosa y colaborativa.',
    ],
  },
  {
    title: 'Difusión compartida',
    content: [
      'Pedimos el apoyo de todos los expositores para subir mínimo 5 historias al día del mercado.',
      'La difusión compartida ayuda muchísimo a que todos vendan más y el evento siga creciendo.',
    ],
  },
  {
    title: 'Cuidado del mobiliario',
    content: [
      'El mobiliario deberá entregarse en las mismas condiciones en las que se recibe.',
      'En caso de daños, se aplicará una cuota de recuperación de $500 MXN.',
    ],
  },
  {
    title: 'Mercancía durante la noche',
    content: [
      'Permitimos dejar mercancía durante la noche.',
      'El desmontaje se realiza el sábado al finalizar el mercado.',
    ],
  },
  {
    title: 'Acompañantes',
    content: [
      'Incluimos únicamente 1 silla por expositor.',
      'Si asistirán más personas, deberá notificarse previamente para autorización.',
    ],
  },
  {
    title: 'Pago anticipado',
    content: [
      'Las mesas deberán quedar liquidadas antes de la fecha del evento.',
      'Pagando presencialmente en Casa de los Ángeles ofrecemos 5% de descuento sobre el monto total.',
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

export default function InformacionExpositoresPage() {
  const { settings, season } = mercadoData

  const reservaMessage = encodeURIComponent(
    `Hola, quiero reservar mi espacio para ${season.name} en Casa de los Ángeles.`
  )

  return (
    <main className="relative min-h-screen bg-[#070C18] text-cream overflow-hidden">
      {/* Background layers */}
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
        {/* Hero — compact */}
        <section className="container-custom pt-[150px] md:pt-[210px] pb-12 md:pb-16">
          <div className="max-w-3xl mx-auto text-center">
            {/* Back link */}
            <Link
              href="/mercado-de-los-angeles"
              className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/55 hover:text-gold transition-colors duration-300 mb-10"
            >
              <ArrowLeft className="w-3 h-3" />
              Volver al Mercado de la Luna
            </Link>

            {/* Sparkle eyebrow */}
            <p className="font-serif italic text-gold text-2xl mb-4" aria-hidden="true">
              ✨
            </p>

            {/* Title */}
            <h1
              className="font-serif not-italic text-gold uppercase leading-[1.05] mb-5"
              style={{
                fontSize: 'clamp(1.875rem, 5vw, 3.5rem)',
                fontWeight: 900,
                letterSpacing: '0.05em',
                textShadow: '0 0 30px rgba(201, 169, 97, 0.15)',
              }}
            >
              Información Importante<br />para Expositores
            </h1>

            {/* Subtitle */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-8">
              <div className="w-10 md:w-16 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <p className="font-sans uppercase tracking-[0.3em] text-gold text-[11px] md:text-xs whitespace-nowrap">
                {season.name} · Casa de los Ángeles
              </p>
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <div className="w-10 md:w-16 h-px bg-gold/40" />
            </div>

            {/* Intro paragraph */}
            <p className="font-serif italic text-cream/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Nos emociona muchísimo recibirlos dentro de esta experiencia nocturna tan especial en el Centro Histórico de Puebla. Para mantener un ambiente hermoso, organizado y familiar para todos, les compartimos algunos puntos importantes.
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

        {/* Items */}
        <section className="container-custom py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            {ITEMS.map((item, i) => (
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
                    {item.title}
                  </h2>
                </div>
                <div className="h-px bg-gold/20 mb-5" />
                <div className="space-y-3 text-cream/85 font-sans text-[15px] md:text-base leading-relaxed pl-1">
                  {item.content.map((p, j) => (
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

        {/* Closing */}
        <section className="container-custom py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <p
              className="font-serif italic text-gold mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}
            >
              Gracias por formar parte de {season.name} <span aria-hidden="true">🌙</span>
            </p>
            <p className="font-serif italic text-cream/75 text-base md:text-lg leading-relaxed">
              Estamos creando algo verdaderamente especial entre todos.
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
              className="group inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-charcoal px-6 py-4 text-sm uppercase tracking-[0.25em] font-sans font-medium transition-all duration-500"
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
