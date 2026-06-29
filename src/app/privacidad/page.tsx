import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad',
  description:
    'Aviso de privacidad de Casa de los Ángeles, Puebla. Conoce cómo tratamos tus datos personales y el uso de cookies y Google Analytics en nuestro sitio.',
  alternates: { canonical: 'https://www.casadelosangelespuebla.com/privacidad' },
}

export default function PrivacidadPage() {
  return (
    <main className="bg-cream min-h-screen">
      <div className="container-custom pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold-dark text-xs uppercase tracking-[0.3em] mb-4">Casa de los Ángeles</p>
          <h1 className="font-serif text-4xl md:text-5xl text-gold-dark mb-3">Aviso de Privacidad</h1>
          <p className="text-charcoal/50 text-sm mb-12">Última actualización: junio de 2026</p>

          <div className="space-y-8 text-charcoal/75 text-[15px] leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl text-charcoal mb-3">Responsable del tratamiento</h2>
              <p>
                Casa de los Ángeles, con domicilio en Av. Don Juan de Palafox y Mendoza 222, Centro
                Histórico, Puebla, México, es responsable del uso y protección de tus datos
                personales, conforme a la Ley Federal de Protección de Datos Personales en Posesión
                de los Particulares.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-charcoal mb-3">Datos que recabamos</h2>
              <p>
                Cuando nos contactas, reservas o nos escribes por WhatsApp o correo, podemos recabar
                tu nombre, correo electrónico y número de teléfono. Al navegar el sitio se recopilan
                datos de uso de forma automática mediante cookies (ver la sección de Cookies).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-charcoal mb-3">Finalidades</h2>
              <p>
                Utilizamos tus datos para atender reservaciones y solicitudes, dar seguimiento a tu
                contacto, informarte sobre eventos y novedades, y mejorar nuestros servicios y la
                experiencia del sitio.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-charcoal mb-3">Cookies y Google Analytics</h2>
              <p>
                Este sitio utiliza cookies propias y de terceros, incluyendo Google Analytics (GA4),
                para entender de forma estadística y anónima cómo se usa el sitio: páginas visitadas,
                origen del tráfico, tipo de dispositivo y duración de la visita. Esta información nos
                ayuda a mejorar el contenido y la navegación.
              </p>
              <p className="mt-3">
                Al ingresar al sitio te mostramos un aviso donde puedes <strong>aceptar o rechazar</strong>{' '}
                el uso de cookies de analítica. Si las rechazas, Google Analytics no almacenará
                cookies en tu navegador. También puedes desactivarlas en cualquier momento desde la
                configuración de tu navegador o instalando el complemento oficial de inhabilitación
                de Google Analytics.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-charcoal mb-3">Derechos ARCO</h2>
              <p>
                Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos
                personales (derechos ARCO), así como a revocar tu consentimiento. Para ejercerlos,
                escríbenos a contacto@casadelosangelespuebla.com indicando tu solicitud.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-charcoal mb-3">Cambios a este aviso</h2>
              <p>
                Podemos actualizar este aviso de privacidad. Cualquier cambio se publicará en esta
                misma página, indicando la fecha de la última actualización.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-charcoal mb-3">Contacto</h2>
              <p>
                Para dudas sobre este aviso o el tratamiento de tus datos:
                contacto@casadelosangelespuebla.com · 220 622 4222 · Av. Don Juan de Palafox y
                Mendoza 222, Centro Histórico, Puebla.
              </p>
            </section>
          </div>

          <div className="mt-14">
            <Link
              href="/"
              className="text-gold-dark text-sm uppercase tracking-[0.14em] hover:text-gold transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
