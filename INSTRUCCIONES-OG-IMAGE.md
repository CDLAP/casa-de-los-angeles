# Instrucciones para crear og-image.jpg

## Tamaño requerido
- **1200 x 630 píxeles** (proporción 1.91:1)

## Opción 1: Herramienta online (más fácil)
1. Ve a https://www.canva.com o https://www.figma.com
2. Crea un lienzo de 1200x630px
3. Fondo: color verde bosque #1A3A2E
4. Coloca el logo (logo-CDLA.png) centrado
5. Exporta como JPG con nombre: `og-image.jpg`
6. Guarda en: `public/images/og-image.jpg`

## Opción 2: Con el logo actual
Si tienes Photoshop, Figma o Canva:
- Fondo: #1A3A2E (verde bosque de la marca)
- Logo centrado con un poco de resplandor dorado sutil
- Texto opcional abajo: "Bistró Francés & Centro Cultural • Puebla"

## Opción 3: Script automático
1. Instalar dependencia: `npm install sharp`
2. Ejecutar: `node scripts/generate-og-image.js`

## ¿Por qué es importante?
Esta imagen aparece cuando alguien comparte el sitio en:
- WhatsApp
- Facebook
- Twitter/X
- LinkedIn
- iMessage
- Telegram

Sin ella, los enlaces compartidos se ven "rotos" o sin vista previa.
