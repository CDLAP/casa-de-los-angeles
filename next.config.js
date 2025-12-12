/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Formatos modernos para mejor performance
    formats: ['image/avif', 'image/webp'],
  },
  
  // Headers de seguridad y SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Seguridad
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Performance
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      // Cache para assets estáticos
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache para fuentes
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirecciones SEO (www y trailing slash)
  async redirects() {
    return [
      // Redirigir versión sin www a www (consistencia de URL)
      // Nota: Esto se maneja mejor en el hosting (Vercel/Netlify)
    ];
  },

  // Trailing slash consistente
  trailingSlash: false,
  
  // Generar sitemap y robots.txt desde /public
  // (Ya los creamos manualmente para más control)
  
  // Compresión habilitada
  compress: true,
  
  // Optimizaciones de producción
  poweredByHeader: false, // Ocultar header X-Powered-By por seguridad
  
  // React strict mode para mejor desarrollo
  reactStrictMode: true,
}

module.exports = nextConfig
