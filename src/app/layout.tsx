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

// URL base del sitio
const siteUrl = 'https://www.casadelosangelespuebla.com'

export const metadata: Metadata = {
  // Metadatos básicos mejorados
  title: {
    default: 'Casa de los Ángeles | Bistró Francés & Centro Cultural | Puebla Centro Histórico',
    template: '%s | Casa de los Ángeles Puebla'
  },
  description: 'Bistró francés y cafetería artesanal en el Centro Histórico de Puebla. Croissants, baguettes, café de especialidad, eventos culturales y un espacio único con más de 100 años de historia. Reservaciones: +52 220 622 4222',
  keywords: [
    // Principales
    'casa de los ángeles puebla',
    'bistró francés puebla',
    'cafetería centro histórico puebla',
    'café artesanal puebla',
    // Productos
    'croissants puebla',
    'baguettes artesanales puebla', 
    'café de especialidad puebla',
    'desayunos centro histórico puebla',
    'brunch puebla',
    // Ubicación
    'restaurante palafox puebla',
    'café calle palafox',
    'restaurante centro puebla',
    // Experiencia
    'centro cultural puebla',
    'eventos culturales puebla',
    'galería arte puebla',
    'lugar para eventos puebla',
    'restaurante romántico puebla',
    'café instagrameable puebla',
    // Long tail
    'donde desayunar en puebla centro',
    'mejores cafeterías puebla',
    'bistró con historia puebla',
    'café francés puebla'
  ],
  authors: [{ name: 'Casa de los Ángeles Puebla' }],
  creator: 'Casa de los Ángeles',
  publisher: 'Casa de los Ángeles Puebla',
  
  // Configuración de robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // URL canónica
  alternates: {
    canonical: siteUrl,
  },
  
  // Open Graph mejorado
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteUrl,
    siteName: 'Casa de los Ángeles Puebla',
    title: 'Casa de los Ángeles | Bistró Francés & Centro Cultural en Puebla',
    description: 'Bistró francés y cafetería artesanal en el Centro Histórico de Puebla. Croissants, baguettes, café de especialidad y eventos culturales en un espacio con más de 100 años de historia.',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Casa de los Ángeles - Bistró Francés y Centro Cultural en Puebla',
        type: 'image/jpeg',
      },
    ],
  },
  
  // Twitter Cards mejorado
  twitter: {
    card: 'summary_large_image',
    title: 'Casa de los Ángeles | Bistró Francés & Centro Cultural',
    description: 'Bistró francés y cafetería artesanal en el Centro Histórico de Puebla. Croissants, café de especialidad y eventos culturales.',
    images: [`${siteUrl}/images/og-image.jpg`],
    creator: '@casa_de_los_angeles_puebla',
  },
  
  // Iconos
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo-short-1000x1000.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo-short-1000x1000.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo-short-1000x1000.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/logo-short-1000x1000.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo-short-1000x1000.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  
  // Manifest PWA
  manifest: '/manifest.json',
  
  // Color de tema - Verde bosque de la marca
  themeColor: '#1A3A2E',
  
  // Verificación (agregar cuando tengas los códigos)
  // verification: {
  //   google: 'tu-codigo-de-google-search-console',
  // },
  
  // Categoría
  category: 'restaurant',
  
  // Metadatos adicionales
  other: {
    // Geo localización para SEO local
    'geo.region': 'MX-PUE',
    'geo.placename': 'Puebla',
    'geo.position': '19.0431;-98.1960',
    'ICBM': '19.0431, -98.1960',
    // Información de contacto
    'contact:phone_number': '+52 220 622 4222',
    'contact:email': 'contacto@casadelosangelespuebla.com',
    // Formato de precios (México)
    'price-currency': 'MXN',
  },
}

// Schema.org JSON-LD para SEO estructurado
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Organización/Negocio Local
    {
      '@type': ['Restaurant', 'CafeOrCoffeeShop', 'LocalBusiness'],
      '@id': `${siteUrl}/#organization`,
      name: 'Casa de los Ángeles',
      alternateName: 'Casa de los Ángeles Puebla',
      description: 'Bistró francés y cafetería artesanal en el Centro Histórico de Puebla. Un espacio único con más de 100 años de historia donde el café artesanal, la cultura y el arte se encuentran.',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo-CDLA.png`,
        width: 1000,
        height: 1000,
      },
      image: [
        `${siteUrl}/images/og-image.jpg`,
        `${siteUrl}/images/logo-CDLA.png`,
      ],
      telephone: '+52 220 622 4222',
      email: 'contacto@casadelosangelespuebla.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Don Juan de Palafox y Mendoza 222',
        addressLocality: 'Puebla',
        addressRegion: 'Puebla',
        postalCode: '72000',
        addressCountry: 'MX',
        neighborhood: 'Centro Histórico',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 19.0431,
        longitude: -98.1960,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday', 
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ],
          opens: '08:00',
          closes: '20:00',
        },
      ],
      servesCuisine: ['French', 'Café', 'Bakery', 'Brunch'],
      priceRange: '$$',
      currenciesAccepted: 'MXN',
      paymentAccepted: 'Cash, Credit Card, Debit Card',
      hasMenu: `${siteUrl}/#menu`,
      acceptsReservations: true,
      sameAs: [
        'https://instagram.com/casa_de_los_angeles_puebla',
      ],
      areaServed: {
        '@type': 'City',
        name: 'Puebla',
        '@id': 'https://www.wikidata.org/wiki/Q46475',
      },
      keywords: 'bistró francés, cafetería artesanal, centro histórico puebla, croissants, baguettes, café especialidad, eventos culturales',
    },
    // Sitio Web
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Casa de los Ángeles Puebla',
      description: 'Bistró francés y centro cultural en el Centro Histórico de Puebla',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: 'es-MX',
    },
    // Página Principal
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: 'Casa de los Ángeles | Bistró Francés & Centro Cultural | Puebla',
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      about: {
        '@id': `${siteUrl}/#organization`,
      },
      description: 'Bistró francés y cafetería artesanal en el Centro Histórico de Puebla. Croissants, baguettes, café de especialidad y eventos culturales.',
      inLanguage: 'es-MX',
    },
    // BreadcrumbList para navegación
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: siteUrl,
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX" className={`${playfair.variable} ${lato.variable}`}>
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
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
