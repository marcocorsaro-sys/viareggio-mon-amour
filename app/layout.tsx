import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Marialina Marcucci — Sindaca di Viareggio',
    template: '%s | Marialina Marcucci',
  },
  description:
    'Marialina Marcucci candidata a sindaca di Viareggio con la lista civica "Viareggio Mon Amour". Elezioni comunali 24–25 maggio 2026.',
  keywords: ['Viareggio', 'elezioni', 'sindaco', 'Marcucci', 'Viareggio Mon Amour', '2026'],
  authors: [{ name: 'Comitato Viareggio Mon Amour' }],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://viareggio-mon-amour.it',
    siteName: 'Marialina Marcucci — Sindaca di Viareggio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className="bg-cream-50 text-navy-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
