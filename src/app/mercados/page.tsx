import type { Metadata } from 'next'
import MercadosLanding from '@/components/mercados/MercadosLanding'

export const metadata: Metadata = {
  title: 'Mercados de Casa de los Ángeles | Centro Histórico de Puebla',
  description:
    'Participa en los mercados de Casa de los Ángeles. Una casa histórica del siglo XVIII en el Centro de Puebla donde las marcas forman parte de una experiencia, no de un bazar tradicional.',
  openGraph: {
    title: 'Mercados de Casa de los Ángeles',
    description:
      'Mercado de los Ángeles diurno (viernes, sábado y domingo) dentro de una casona histórica del Centro de Puebla.',
    type: 'website',
  },
}

export default function MercadosPage() {
  return (
    <main className="relative min-h-screen bg-cream text-charcoal overflow-hidden">
      <MercadosLanding />
    </main>
  )
}
