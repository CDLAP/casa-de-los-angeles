import type { Metadata } from 'next'

const siteUrl = 'https://www.casadelosangelespuebla.com'

export const metadata: Metadata = {
  title: 'Lineamientos para Expositores | Mercado de Casa de los Ángeles',
  description: 'Lineamientos, horarios, costos y requisitos para participar como expositor en el Mercado de Casa de los Ángeles. Viernes, Sábados y Domingos de 11AM a 8PM en el Centro Histórico de Puebla.',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: `${siteUrl}/lineamientos`,
    siteName: 'Casa de los Ángeles Puebla',
    title: 'Mercado de Casa de los Ángeles | Lineamientos para Expositores',
    description: 'Conoce los lineamientos, costos desde $350 MXN/día, horarios (Vie-Dom 11AM-8PM) y requisitos para ser expositor en el Mercado de Casa de los Ángeles, Puebla.',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Mercado de Casa de los Ángeles - Lineamientos para Expositores',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercado de Casa de los Ángeles | Lineamientos',
    description: 'Lineamientos, costos y requisitos para expositores. Viernes a Domingo, 11AM-8PM. Centro Histórico de Puebla.',
    images: [`${siteUrl}/images/og-image.jpg`],
  },
}

export default function LineamientosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
