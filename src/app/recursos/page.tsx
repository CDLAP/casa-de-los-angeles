import { redirect } from 'next/navigation'

// Esta ruta quedó en desuso: la descarga de la guía vive dentro de
// /mercado-de-los-angeles/tips. Redirigimos para no dejar una página rota.
// Se puede borrar la carpeta src/app/recursos por completo sin problema.
export default function RecursosRedirect() {
  redirect('/mercado-de-los-angeles/tips#guia')
}
