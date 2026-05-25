import type { Metadata } from 'next'
import MercadosLanding from '@/components/mercados/MercadosLanding'
import StarsBackground from '@/components/mercado/StarsBackground'

export const metadata: Metadata = {
  title: 'Mercados de Casa de los Ángeles | Centro Histórico de Puebla',
  description:
    'Participa en los mercados de Casa de los Ángeles. Una casa histórica del siglo XVIII en el Centro de Puebla donde las marcas forman parte de una experiencia, no de un bazar tradicional. Mercado de la Luna (viernes) y Mercado de los Ángeles (sábado y domingo).',
  openGraph: {
    title: 'Mercados de Casa de los Ángeles',
    description:
      'Mercado de la Luna nocturno (viernes) y Mercado de los Ángeles diurno (sábado y domingo) dentro de una casona histórica del Centro de Puebla.',
    type: 'website',
  },
}

export default function MercadosPage() {
  return (
    <main className="relative min-h-screen bg-[#070E22] text-cream overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #070E22 0%, #0C1830 35%, #091529 70%, #070E22 100%)',
          }}
        />
        <StarsBackground />
      </div>

      <div className="relative z-10">
        <MercadosLanding />
      </div>
    </main>
  )
}
