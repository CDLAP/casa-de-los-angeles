import type { Metadata } from 'next'

const siteUrl = 'https://www.casadelosangelespuebla.com'
const pageUrl = `${siteUrl}/cdla-studio`

export const metadata: Metadata = {
  title: 'CDLA Studio — Marketing creativo para marcas artesanales',
  description:
    'Casa de los Ángeles Studio es un estudio creativo para marcas artesanales, culturales y boutique de México: fotografía de producto, video cinematográfico, dirección creativa y contenido mensual para redes, producido en una casona del Centro Histórico de Puebla. Planes desde $1,500 MXN al mes.',
  keywords: [
    'estudio creativo puebla',
    'marketing para marcas artesanales',
    'fotografía de producto puebla',
    'contenido para redes artesanos',
    'video para marcas mexicanas',
    'dirección creativa puebla',
    'agencia para artesanos méxico',
    'branding artesanal puebla',
    'fotografía de producto para artesanos',
    'marketing para emprendedores puebla',
    'contenido mensual para redes sociales',
    'cdla studio',
    'casa de los ángeles studio',
    'página de instagram para marcas artesanales',
    'código qr para expositores',
    'carteles lista de precios para mercados',
    'kit para expositores de mercado',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: pageUrl,
    siteName: 'Casa de los Ángeles Puebla',
    title: 'CDLA Studio — Marketing creativo para marcas artesanales mexicanas',
    description:
      'Fotografía de producto, video cinematográfico, dirección creativa y contenido mensual para redes, producido dentro de Casa de los Ángeles, Puebla. Planes desde $1,500 MXN/mes.',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Casa de los Ángeles Studio — Marketing creativo para marcas artesanales',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CDLA Studio — Marketing creativo para marcas artesanales',
    description:
      'Estudio creativo para marcas artesanales mexicanas: fotografía, video, dirección creativa y contenido para redes. Producido en Puebla. Desde $1,500 MXN/mes.',
    images: [`${siteUrl}/images/og-image.jpg`],
  },
}

// Structured data específico del Studio (servicio B2B + catálogo de precios).
// GEO: permite que buscadores y motores de IA entiendan el servicio, a quién sirve y cuánto cuesta.
const studioJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['ProfessionalService', 'Service'],
      '@id': `${pageUrl}#service`,
      name: 'Casa de los Ángeles Studio',
      alternateName: 'CDLA Studio',
      serviceType:
        'Estudio creativo, fotografía, video y marketing de contenido para marcas artesanales',
      url: pageUrl,
      description:
        'Estudio creativo especializado en marcas artesanales, culturales y boutique de México. Ofrece fotografía de producto, video cinematográfico, dirección creativa, branding y contenido mensual para redes sociales, producido dentro de Casa de los Ángeles, una casona del Centro Histórico de Puebla. También crea materiales para expositores de mercado: páginas de Instagram, códigos QR personalizados, carteles con lista de precios y kits para tu mesa.',
      image: `${siteUrl}/images/og-image.jpg`,
      provider: { '@id': `${siteUrl}/#organization` },
      telephone: '+52 220 622 4222',
      email: 'contacto@casadelosangelespuebla.com',
      priceRange: '$$',
      currenciesAccepted: 'MXN',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Don Juan de Palafox y Mendoza 222',
        addressLocality: 'Puebla',
        addressRegion: 'Puebla',
        postalCode: '72000',
        addressCountry: 'MX',
      },
      areaServed: [
        { '@type': 'City', name: 'Puebla' },
        { '@type': 'Country', name: 'México' },
      ],
      audience: {
        '@type': 'Audience',
        audienceType: 'Marcas artesanales, emprendedores, negocios culturales y boutique',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Planes y paquetes de Casa de los Ángeles Studio',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Presencia Artesanal',
            description:
              'Plan mensual: 8 fotografías profesionales de producto, 4 diseños para feed, 4 historias, página de Instagram configurada y optimizada, código QR personalizado listo para imprimir, adaptación de logo y datos de contacto, 1 publicación en las historias de Casa de los Ángeles y asesoría de imagen (30 min).',
            priceCurrency: 'MXN',
            price: '1500',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: '1500',
              priceCurrency: 'MXN',
              referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
            },
            category: 'Contenido mensual para redes',
          },
          {
            '@type': 'Offer',
            name: 'Impulso Artesanal',
            description:
              'Plan mensual: video cinematográfico de 45 segundos, 30 fotografías para redes, diseños para feed e historias, página de Instagram profesional creada y optimizada, código QR personalizado para exhibidor, cartel con lista de precios listo para imprimir, dirección creativa completa, branding, publicación en las historias de Casa de los Ángeles y promoción dentro del ecosistema.',
            priceCurrency: 'MXN',
            price: '3500',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: '3500',
              priceCurrency: 'MXN',
              referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
            },
            category: 'Producción visual y dirección creativa mensual',
          },
          {
            '@type': 'Offer',
            name: 'Video por pieza',
            description:
              'Video cinematográfico de 15 segundos, listo para redes, disponible como pieza individual.',
            priceCurrency: 'MXN',
            price: '1000',
            category: 'Video individual',
          },
          {
            '@type': 'Offer',
            name: 'Kit Expositor',
            description:
              'Paquete de pago único para expositores de mercados: creación y optimización de página de Instagram, código QR personalizado con la imagen de la marca para exhibidor de mesa, cartel con lista de precios listo para imprimir, letrero o identificador de marca para la mesa, branding básico (logo y paleta) y asesoría de montaje y presentación del stand.',
            priceCurrency: 'MXN',
            category: 'Materiales y presencia para expositores de mercado',
          },
        ],
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: 'CDLA Studio — Estudio creativo para marcas artesanales',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${pageUrl}#service` },
      inLanguage: 'es-MX',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'CDLA Studio', item: pageUrl },
      ],
    },
  ],
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studioJsonLd) }}
      />
      {children}
    </>
  )
}
