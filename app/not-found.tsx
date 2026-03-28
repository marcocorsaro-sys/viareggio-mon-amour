import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 pt-20">
      <div className="text-center max-w-lg px-6">
        <div className="font-display text-8xl font-light text-cream-300 mb-4">404</div>
        <h1 className="font-display text-3xl font-medium text-navy-900 mb-4">Pagina non trovata</h1>
        <p className="font-body text-navy-600 mb-8">La pagina che cerchi non esiste o è stata spostata.</p>
        <Link href="/" className="btn-primary"><ArrowLeft size={16} /> Torna alla home</Link>
      </div>
    </div>
  )
}
