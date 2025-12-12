/**
 * Genera og-image.jpg para SEO de redes sociales
 * 
 * Ejecutar:
 * 1. npm install sharp
 * 2. node scripts/generate-og-image.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const WIDTH = 1200;
const HEIGHT = 630;
const BRAND_GREEN = '#1A3A2E';

async function generateOgImage() {
  const logoPath = path.join(__dirname, '..', 'public', 'images', 'logo-CDLA.png');
  const outputPath = path.join(__dirname, '..', 'public', 'images', 'og-image.jpg');

  if (!fs.existsSync(logoPath)) {
    console.error('❌ No se encontró el logo en:', logoPath);
    process.exit(1);
  }

  console.log('🎨 Generando og-image.jpg (1200x630)...');

  try {
    // Redimensionar logo para que quepa bien (máximo 400px de alto)
    const logoBuffer = await sharp(logoPath)
      .resize({ height: 380, fit: 'inside' })
      .toBuffer();

    const logoMeta = await sharp(logoBuffer).metadata();

    // Calcular posición centrada
    const logoLeft = Math.round((WIDTH - logoMeta.width) / 2);
    const logoTop = Math.round((HEIGHT - logoMeta.height) / 2) - 20;

    // Crear SVG de fondo con gradiente y patrón sutil
    const svgBackground = `
      <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1A3A2E"/>
            <stop offset="50%" stop-color="#1F4538"/>
            <stop offset="100%" stop-color="#1A3A2E"/>
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="45%" r="40%">
            <stop offset="0%" stop-color="#C9A961" stop-opacity="0.12"/>
            <stop offset="100%" stop-color="#C9A961" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        <rect width="100%" height="100%" fill="url(#glow)"/>
        <!-- Línea decorativa inferior -->
        <line x1="400" y1="580" x2="800" y2="580" stroke="#C9A961" stroke-width="1" opacity="0.4"/>
        <!-- Texto inferior -->
        <text x="600" y="605" font-family="Georgia, serif" font-size="18" fill="#C9A961" text-anchor="middle" opacity="0.8">
          Bistró Francés &amp; Centro Cultural • Puebla
        </text>
      </svg>
    `;

    // Generar imagen final
    await sharp(Buffer.from(svgBackground))
      .composite([
        {
          input: logoBuffer,
          left: logoLeft,
          top: logoTop,
        }
      ])
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log('✅ og-image.jpg generada exitosamente en:', outputPath);
    console.log('📐 Tamaño: 1200x630px');

  } catch (error) {
    console.error('❌ Error generando imagen:', error.message);
    process.exit(1);
  }
}

generateOgImage();
