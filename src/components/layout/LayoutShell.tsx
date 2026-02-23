'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Loader from '@/components/animations/Loader'

const standalonePages = ['/lineamientos']

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStandalone = standalonePages.includes(pathname)

  if (isStandalone) {
    return <main className="overflow-x-hidden">{children}</main>
  }

  return (
    <>
      <Loader />
      <Header />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </>
  )
}
