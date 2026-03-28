import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chi sono',
  description: 'Il profilo di Marialina Marcucci, candidata sindaca di Viareggio Mon Amour.',
}

export default function ChiSonoPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-navy-900">
        <div className="container-site">
          <div className="section-label text-gold mb-4">La candidata</div>
          <h1 className="font-display text-5xl md:text-7xl font-light text-cream-50 max-w-3xl leading-tight">
            Marialina Marcucci.<br /><em className="text-gold not-italic">Una storia di Viareggio.</em>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="relative aspect-[3/4] bg-navy-100 flex items-center justify-center sticky top-24">
              <div className="text-navy-300 font-body text-sm">[Foto di Marialina Marcucci]</div>
              <div className="absolute inset-4 border border-gold opacity-30" />
            </div>
            <div>
              <div className="section-label mb-4">Il profilo</div>
              <h2 className="section-title mb-6">Competenza.<br /><em className="text-gold not-italic">Libertà. Viareggio.</em></h2>
              <div className="divider-gold" />
              <div className="space-y-5 font-body text-navy-600 text-lg leading-relaxed mt-6">
                <p>Per dieci anni Marialina Marcucci ha guidato la Fondazione Carnevale di Viareggio — gestendo milioni di euro di bilancio, centinaia di lavoratori, rapporti con istituzioni nazionali ed europee.</p>
                <p>Prima ancora era Vicepresidente della Regione Toscana. Sa come funzionano le istituzioni, dove trovare i finanziamenti, come costruire alleanze e far funzionare una macchina pubblica.</p>
                <p>Imprenditrice. Viareggina. Si è dimessa dalla Fondazione il 13 marzo 2026 per candidarsi. Non per un partito — per questa città.</p>
                <p>La lista civica "Viareggio Mon Amour" non risponde a nessuna segreteria. Le sue decisioni saranno prese guardando in faccia i viareggini, non Roma o Firenze.</p>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6">
                {[
                  { v: '10 anni', l: 'Fondazione Carnevale' },
                  { v: '1', l: 'Vicepresidenza Regione' },
                  { v: '1', l: 'Candidatura civica' },
                ].map(s => (
                  <div key={s.l} className="text-center border border-cream-200 bg-white p-4">
                    <div className="font-display text-3xl font-medium text-gold mb-1">{s.v}</div>
                    <div className="font-body text-xs text-navy-500 uppercase tracking-wide">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/programma" className="btn-primary">Leggi il programma <ArrowRight size={16} /></Link>
                <Link href="/volontari" className="btn-gold">Sostienimi <ArrowRight size={16} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
