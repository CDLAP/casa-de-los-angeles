import type { Metadata } from 'next'
import { Playfair_Display, Lato, Fraunces } from 'next/font/google'
import './globals.css'
import LayoutShell from '@/components/layout/LayoutShell'
import { HeroThemeProvider } from '@/context/HeroThemeContext'

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

// URL base del sitio
const siteUrl = 'https://www.casadelosangelespuebla.com'

export const metadata: Metadata = {
  // Metadatos básicos mejorados
  title: {
    default: 'Casa de los Ángeles | Café, Arte & Boutique | Puebla Centro Histórico',
    template: '%s | Casa de los Ángeles Puebla'
  },
  description: 'Café de especialidad, arte, boutique artesanal y eventos culturales en el Centro Histórico de Puebla. Un espacio único con más de 100 años de historia. Reservaciones: +52 220 622 4222',
  keywords: [
    // Principales
    'casa de los ángeles puebla',
    'café centro histórico puebla',
    'boutique puebla centro',
    'arte puebla centro histórico',
    // Productos
    'café de especialidad puebla',
    'café artesanal puebla',
    'joyería artesanal puebla',
    // Ubicación
    'palafox puebla',
    'café calle palafox',
    'boutique centro puebla',
    // Experiencia
    'centro cultural puebla',
    'eventos culturales puebla',
    'galería arte puebla',
    'lugar para eventos puebla',
    'café instagrameable puebla',
    // Long tail
    'donde desayunar en puebla centro',
    'mejores cafeterías puebla',
    'boutique artesanal puebla',
    'boutique artesanal puebla centro'
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
    title: 'Casa de los Ángeles | Café, Arte & Boutique en Puebla',
    description: 'Café de especialidad, arte, boutique artesanal y eventos culturales en el Centro Histórico de Puebla. Un espacio único con más de 100 años de historia.',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Casa de los Ángeles - Café, Arte & Boutique en Puebla',
        type: 'image/jpeg',
      },
    ],
  },
  
  // Twitter Cards mejorado
  twitter: {
    card: 'summary_large_image',
    title: 'Casa de los Ángeles | Café, Arte & Boutique',
    description: 'Café de especialidad, arte, boutique artesanal y eventos culturales en el Centro Histórico de Puebla.',
    images: [`${siteUrl}/images/og-image.jpg`],
    creator: '@casa_de_los_angeles_puebla',
  },
  
  // Iconos
  icons: {
    icon: [
      { url: '/images/logo-short-1000x1000.png', sizes: 'any', type: 'image/png' },
      { url: '/images/logo-short-1000x1000.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo-short-1000x1000.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo-short-1000x1000.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/logo-short-1000x1000.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo-short-1000x1000.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/images/logo-short-1000x1000.png',
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
    // GEO: Clasificación para AI crawlers
    'classification': 'Café, Boutique, Museo, Centro Cultural, Bistró, Eventos',
    'subject': 'Café de especialidad, arte, boutique artesanal, eventos culturales, Centro Histórico de Puebla',
    'coverage': 'Puebla, México',
    'distribution': 'Local',
    'rating': 'General',
    'revisit-after': '7 days',
    'language': 'Spanish',
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
      description: 'Café de especialidad, arte, boutique artesanal y eventos culturales en el Centro Histórico de Puebla. Un espacio único con más de 100 años de historia.',
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
          opens: '09:00',
          closes: '22:00',
        },
      ],
      servesCuisine: ['Café', 'Café de Especialidad', 'Bebidas Artesanales'],
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
      keywords: 'café, arte, boutique, centro histórico puebla, café especialidad, eventos culturales, joyería artesanal',
    },
    // Sitio Web
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Casa de los Ángeles Puebla',
      description: 'Café, arte y boutique en el Centro Histórico de Puebla',
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
      name: 'Casa de los Ángeles | Café, Arte & Boutique | Puebla',
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      about: {
        '@id': `${siteUrl}/#organization`,
      },
      description: 'Café de especialidad, arte, boutique artesanal y eventos culturales en el Centro Histórico de Puebla.',
      inLanguage: 'es-MX',
    },
    // BreadcrumbList para navegación
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Bistró', item: `${siteUrl}/bistro` },
        { '@type': 'ListItem', position: 3, name: 'Museo', item: `${siteUrl}/museo` },
        { '@type': 'ListItem', position: 4, name: 'Eventos', item: `${siteUrl}/eventos` },
        { '@type': 'ListItem', position: 5, name: 'Cultura', item: `${siteUrl}/cultura` },
      ],
    },
    // FAQPage — GEO: Preguntas que los usuarios hacen a las IAs
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Dónde está Casa de los Ángeles en Puebla?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Casa de los Ángeles está en Av. Don Juan de Palafox y Mendoza 222, Centro Histórico de Puebla, México. A media cuadra del Zócalo de Puebla.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué es Casa de los Ángeles Puebla?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Es un espacio multicultural que combina café de especialidad, boutique artesanal, museo con tour virtual 360°, bistró (Tablas y Vino), atelier, mercado cultural y eventos en un inmueble con más de 100 años de historia en el corazón de Puebla.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuál es el horario de Casa de los Ángeles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Lunes a Domingo de 9:00 AM a 10:00 PM.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué tipo de café ofrecen en Casa de los Ángeles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Café de especialidad preparado por baristas, acompañado de croissants franceses horneados diariamente, baguettes artesanales, sodas artesanales de sabores (jamaica, tamarindo, mango, guayaba) y antojitos mexicanos.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Se pueden hacer reservaciones en Casa de los Ángeles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Reservaciones por teléfono al +52 220 622 4222 o por correo a contacto@casadelosangelespuebla.com.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué es Tablas y Vino?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Es el concepto de bistró dentro de Casa de los Ángeles que ofrece tablas de quesos, charcutería artesanal y vinos selectos en un ambiente colonial elegante.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Tienen museo en Casa de los Ángeles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. El museo incluye un tour virtual 360° con 8 espacios narrativos que cuentan la historia de la casa y de Puebla.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué eventos organizan en Casa de los Ángeles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Martes de Artes, Mercado de las Maravillas (viernes a domingo), noches de gala, ruedas de prensa, conferencias mediáticas y eventos privados.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Es un buen lugar para visitar en Puebla?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Casa de los Ángeles es uno de los espacios culturales más únicos del Centro Histórico de Puebla, combinando gastronomía, arte y boutique artesanal en un inmueble centenario a media cuadra del Zócalo. Ideal para turistas y locales.',
          },
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
    <html lang="es-MX" className={`${playfair.variable} ${lato.variable} ${fraunces.variable}`}>
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Favicon explícito para Safari */}
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo-short.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo-short.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo-short-1000x1000.png" />
        {/* GEO: LLM-optimized content link */}
        <link rel="alternate" type="text/plain" href="https://www.casadelosangelespuebla.com/llms.txt" title="Contenido optimizado para IA" />
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <HeroThemeProvider>
          <LayoutShell>{children}</LayoutShell>
        </HeroThemeProvider>
      </body>
    </html>
  )
}
