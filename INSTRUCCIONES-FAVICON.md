# Instrucciones para crear favicon.ico

## ¿Por qué necesitas favicon.ico?
Aunque ya tienes el logo PNG, el formato `.ico` es necesario para:
- Compatibilidad con navegadores antiguos
- Pestañas del navegador
- Favoritos/bookmarks
- Algunos sistemas operativos

## Opción 1: Herramienta online (más fácil)
1. Ve a https://favicon.io/favicon-converter/
2. Sube el archivo `public/images/logo-short-1000x1000.png`
3. Descarga el paquete
4. Copia solo el archivo `favicon.ico` a la carpeta `public/`

## Opción 2: RealFaviconGenerator (más completo)
1. Ve a https://realfavicongenerator.net/
2. Sube el logo
3. Configura los colores de la marca:
   - Theme color: #1A3A2E
   - Background: #1A3A2E
4. Descarga y extrae en `public/`

## Archivos resultantes
Después de generar, deberías tener en `public/`:
- favicon.ico (obligatorio)
- apple-touch-icon.png (opcional pero recomendado)
- favicon-32x32.png (opcional)
- favicon-16x16.png (opcional)

## Nota
El sitio ya funciona con el logo PNG, pero tener el .ico mejora la compatibilidad y el SEO técnico.
