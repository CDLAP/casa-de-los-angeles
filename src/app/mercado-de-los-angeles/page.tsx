import type { Metadata } from 'next'
import SeasonHero from '@/components/mercado/SeasonHero'
import SeasonFechas from '@/components/mercado/SeasonFechas'
import SeasonPaquetes from '@/components/mercado/SeasonPaquetes'
import RecursosExpositores from '@/components/mercado/RecursosExpositores'
import SeasonInfo from '@/components/mercado/SeasonInfo'
import StarsBackground from '@/components/mercado/StarsBackground'
import FloatingReserveButton from '@/components/mercado/FloatingReserveButton'
import mercadoData from '@/data/mercado-de-los-angeles.json'

export const metadata: Metadata = {
  title: 'Mercado de la Luna | Casa de los Ángeles · Temporada Mayo — Junio 2026',
  description:
    'Mercado de la Luna en Casa de los Ángeles. Temporada Mayo — Junio 2026. El primer y único punto de venta nocturno del Centro de Puebla. Reserva tu espacio como expositor.',
  openGraph: {
    title: 'Mercado de la Luna | Casa de los Ángeles',
    description:
      'Temporada Mayo — Junio 2026. Mercado nocturno curado dentro de una casona del siglo XVIII en el Centro Histórico de Puebla.',
    type: 'website',
  },
}

export default function MercadoDeLosAngelesPage() {
  const { settings, season } = mercadoData

  return (
    <main className="relative min-h-screen bg-[#070C18] text-cream overflow-hidden">
      {/* Layered background: deep blue base + radial glow + stars */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient with blue undertone */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #060A14 0%, #0A1428 35%, #08101F 70%, #050912 100%)',
          }}
        />
        {/* Gold radial accents */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 0%, rgba(201, 169, 97, 0.08) 0%, transparent 45%), radial-gradient(ellipse at 70% 100%, rgba(201, 169, 97, 0.05) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Stars layer */}
      <StarsBackground />

      <div className="relative z-10">
        <SeasonHero
          name={season.name}
          location={season.location}
          temporada={season.temporada}
          firstDateIso={season.firstDateIso}
          heroImage={season.heroImage}
          topStamp={season.topStamp}
          hours={season.hours}
          description={season.description}
        />

        <SeasonFechas
          eventName={season.name}
          weekends={season.weekends}
          note={season.datesNote}
          tagline={season.datesTagline}
        />

        <SeasonPaquetes
          eventName={season.name}
          packages={season.packages}
          weekends={season.weekends}
          whatsapp={settings.whatsapp}
        />

        <RecursosExpositores />

        <SeasonInfo
          eventName={season.name}
          includes={season.includes}
          notes={season.notes}
          whatsapp={settings.whatsapp}
          whatsappDisplay={settings.whatsappDisplay}
        />
      </div>

      {/* Floating CTA — appears after hero, hides over packages section */}
      <FloatingReserveButton targetId="paquetes" />
    </main>
  )
}
