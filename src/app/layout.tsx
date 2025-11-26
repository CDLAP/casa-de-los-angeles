import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
// import SmoothScroll from '@/components/animations/SmoothScroll' // Desactivado para mejor performance
import Loader from '@/components/animations/Loader'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Casa de los Ángeles | Cafetería & Centro de Cultura | Puebla',
  description: 'Un espacio único en el corazón histórico de Puebla donde el café artesanal, la cultura y el arte se encuentran. Cafetería premium con exposiciones de arte y eventos culturales exclusivos.',
  keywords: ['cafetería puebla', 'café artesanal puebla', 'centro histórico puebla', 'cafetería cultural', 'eventos puebla', 'galería arte puebla', 'casa de los ángeles'],
  authors: [{ name: 'Casa de los Ángeles' }],
  creator: 'Casa de los Ángeles',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://casadelosangeles.mx',
    siteName: 'Casa de los Ángeles',
    title: 'Casa de los Ángeles | Cafetería & Centro de Cultura',
    description: 'Un espacio único en el corazón histórico de Puebla donde el café artesanal, la cultura y el arte se encuentran.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Casa de los Ángeles - Centro de Cultura & Bistró',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casa de los Ángeles | Cafetería & Centro de Cultura',
    description: 'Un espacio único en el corazón histórico de Puebla donde el café artesanal, la cultura y el arte se encuentran.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/images/logo-short-1000x1000.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo-short-1000x1000.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo-short-1000x1000.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/images/logo-short-1000x1000.png',
    shortcut: '/images/logo-short-1000x1000.png',
  },
  manifest: '/manifest.json',
  themeColor: '#006B54', // Verde esmeralda - Identidad cafetería
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans antialiased">
        <Loader />
        {/* SmoothScroll desactivado para mejor performance */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
