import type { Metadata } from 'next'
import MercadoHero from '@/components/mercado/MercadoHero'
import EventGrid from '@/components/mercado/EventGrid'
import mercadoData from '@/data/mercado-de-los-angeles.json'

export const metadata: Metadata = {
  title: 'Mercado de los Ángeles | Próximas ediciones',
  description:
    'Reserva tu espacio en las próximas ediciones del Mercado de los Ángeles. Mercado curado dentro de una casona del siglo XVIII en el Centro Histórico de Puebla.',
  openGraph: {
    title: 'Mercado de los Ángeles | Casa de los Ángeles',
    description:
      'Programa de mercados curados dentro de Casa de los Ángeles, Puebla. Marcas con alma, gastronomía, mezcal y música en vivo.',
    type: 'website',
  },
}

export default function MercadoDeLosAngelesPage() {
  const { settings, events } = mercadoData

  return (
    <main className="relative min-h-screen bg-[#1A3A2E] text-cream overflow-hidden">
      {/* Subtle background pattern layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 20% 0%, rgba(201, 169, 97, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(201, 169, 97, 0.05) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10">
        <MercadoHero />
        <EventGrid
          events={events}
          whatsapp={settings.whatsapp}
          lastSpotsThreshold={settings.lastSpotsThreshold}
        />

        {/* Footer note */}
        <section className="container-custom pb-24 md:pb-32">
          <div className="max-w-2xl mx-auto text-center pt-16 border-t border-gold/15">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 bg-gold/60 rotate-45" />
              <div className="w-12 h-px bg-gold/40" />
            </div>
            <p className="font-serif italic text-cream/70 text-base md:text-lg leading-relaxed mb-3">
              Cada edición es curada con intención. Si tu marca está alineada con el espíritu de la casa, queremos conocerte.
            </p>
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold/70 mt-6">
              Av. Don Juan de Palafox y Mendoza 222 · Centro Histórico, Puebla
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
