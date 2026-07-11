'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
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
  ShoppingBag,
  Moon,
  Hammer,
} from 'lucide-react'
import WhatsAppIcon from '@/components/mercado/WhatsAppIcon'
import ReadingProgress from '@/components/mercado/ReadingProgress'
import mercadoData from '@/data/mercado-de-los-angeles.json'

interface Section {
  title: string
  items: string[]
}

const SECTIONS: Section[] = [
  {
    title: 'Horarios y montaje',
    items: [
      'El montaje se realiza durante la hora previa a la apertura: viernes a las 4:00 PM, y sábado y domingo a las 10:00 AM.',
      'Los horarios son: viernes de 5:00 PM a 9:00 PM; sábado y domingo de 11:00 AM a 8:00 PM.',
      'Todos los expositores deberán estar listos o presentes a la hora de apertura.',
      'Pasada la hora de apertura se aplica una cuota de puntualidad de $100 MXN.',
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
      'Incluimos 1 mesa de 1.80 m, 1 mantel y 1 silla por expositor.',
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

const SCHEDULE = {
  viernes: { label: 'Viernes', montaje: '4:00 PM', apertura: '5:00 PM', cierre: '9:00 PM' },
  finde: { label: 'Sábado y Domingo', montaje: '10:00 AM', apertura: '11:00 AM', cierre: '8:00 PM' },
} as const

type DayKey = keyof typeof SCHEDULE

const COSTS = [
  { value: 100, label: 'Puntualidad', sub: 'tras la hora de apertura' },
  { value: 50, label: 'Electricidad', sub: 'por día' },
  { value: 500, label: 'Daños', sub: 'a mobiliario' },
]

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

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

function CountUp({ value, prefix = '' }: { value: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const duration = 900
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {prefix}
      {display}
    </span>
  )
}

export default function LineamientosContent() {
  const { settings, season } = mercadoData
  const [day, setDay] = useState<DayKey>('viernes')
  const current = SCHEDULE[day]

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
            {season.name} · Lineamientos
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-display-md text-gold-dark mb-7"
          >
            Lineamientos para Expositores
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <p className="text-charcoal-50 text-lg md:text-xl leading-relaxed">
              Gracias por formar parte de esta experiencia dentro de Casa de los Ángeles.
            </p>
            <p className="text-charcoal-50 text-base md:text-lg leading-relaxed">
              Nuestro objetivo es crear un mercado hermoso, organizado y rentable, con una
              experiencia premium tanto para expositores como para visitantes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EL DÍA DE UN VISTAZO — timeline + costos */}
      <section className="bg-cream-200 py-16 md:py-24">
        <div className="container-custom max-w-3xl">
          <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm mb-3 text-center">
            El día, de un vistazo
          </p>
          <h2 className="font-serif text-display-sm text-gold-dark text-center mb-12">
            ¿Cómo transcurre el mercado?
          </h2>

          {/* Toggle de día */}
          <div className="flex justify-center gap-2 mb-10">
            {(Object.keys(SCHEDULE) as DayKey[]).map((d) => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-sans uppercase tracking-[0.15em] transition-all duration-300 ${
                  day === d
                    ? 'bg-emerald text-white shadow-md'
                    : 'bg-white border border-gold/30 text-charcoal-50 hover:border-gold hover:text-gold-dark'
                }`}
              >
                {SCHEDULE[d].label}
              </button>
            ))}
          </div>

          {/* Timeline — Montaje → Apertura → Cierre */}
          <div className="flex items-start justify-center max-w-2xl mx-auto mb-14">
            {/* Montaje */}
            <div className="text-center w-20 md:w-24 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-cream-200 border-2 border-gold/40 text-gold-dark flex items-center justify-center mx-auto mb-3">
                <Hammer className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </div>
              <motion.div
                key={`mo-${day}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="font-serif text-charcoal text-base md:text-lg"
              >
                {current.montaje}
              </motion.div>
              <div className="text-charcoal-50 text-[13px] mt-0.5">Montaje</div>
            </div>

            <div className="flex-1 max-w-[64px] md:max-w-[96px] h-[2px] bg-gold/20 mt-[19px] relative overflow-hidden">
              <motion.div
                key={`line1-${day}`}
                className="absolute inset-0 bg-gold/50 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </div>

            {/* Apertura */}
            <div className="text-center w-20 md:w-24 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-emerald border-2 border-emerald text-white flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </div>
              <motion.div
                key={`ap-${day}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="font-serif text-charcoal text-base md:text-lg"
              >
                {current.apertura}
              </motion.div>
              <div className="text-charcoal-50 text-[13px] mt-0.5">Apertura</div>
            </div>

            <div className="flex-1 max-w-[64px] md:max-w-[96px] h-[2px] bg-gold/20 mt-[19px] relative overflow-hidden">
              <motion.div
                key={`line2-${day}`}
                className="absolute inset-0 bg-gold origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
              />
            </div>

            {/* Cierre */}
            <div className="text-center w-20 md:w-24 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-gold text-gold-dark flex items-center justify-center mx-auto mb-3">
                <Moon className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </div>
              <motion.div
                key={`ci-${day}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="font-serif text-charcoal text-base md:text-lg"
              >
                {current.cierre}
              </motion.div>
              <div className="text-charcoal-50 text-[13px] mt-0.5">Cierre</div>
            </div>
          </div>

          {/* Costos */}
          <p className="font-sans uppercase tracking-[0.3em] text-gold text-xs md:text-sm mb-6 text-center">
            Costos a considerar
          </p>
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-xl mx-auto">
            {COSTS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                className="bg-white border border-gold/20 rounded-2xl shadow-sm p-5 text-center"
              >
                <div className="font-serif text-gold-dark text-2xl md:text-[2rem] leading-none">
                  <CountUp value={c.value} prefix="$" />
                </div>
                <div className="text-charcoal text-sm font-medium mt-2 leading-tight">
                  {c.label}
                </div>
                <div className="text-charcoal-50 text-xs mt-1 leading-tight">{c.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LINEAMIENTOS — check-list limpia */}
      <section className="section bg-cream">
        <div className="container-custom max-w-2xl">
          <div className="divide-y divide-gold/15">
            {SECTIONS.map((section, i) => {
              const Icon = SECTION_ICONS[i] ?? Sparkles
              return (
                <motion.div
                  key={i}
                  id={slugify(section.title)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                  className="scroll-mt-28 py-9 first:pt-0"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-gold-dark flex-shrink-0" strokeWidth={1.5} />
                    <h3 className="font-serif text-xl md:text-2xl text-charcoal leading-tight">
                      {section.title}
                    </h3>
                  </div>

                  <ul className="space-y-3.5">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-charcoal-50 text-base md:text-[17px] leading-relaxed"
                      >
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold/15 flex-shrink-0 mt-1">
                          <Check className="w-3 h-3 text-gold-dark" strokeWidth={2.5} />
                        </span>
                        <span>{highlightMoney(item)}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
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
