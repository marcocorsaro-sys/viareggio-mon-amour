import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, FileText } from 'lucide-react'
import { sanityFetch } from '@/lib/sanity'
import { pressListQuery } from '@/lib/queries'
import type { PressItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Area stampa',
  description: 'Comunicati stampa e materiali per i media. Campagna di Marialina Marcucci — Viareggio Mon Amour.',
}

export const revalidate = 60

const contacts = [
  { role: 'Portavoce campagna', name: 'Comitato Viareggio Mon Amour', email: 'stampa@viareggio-mon-amour.it' },
  { role: 'Richieste interviste', email: 'interviste@viareggio-mon-amour.it' },
]

export default async function StampaPage() {
  const press = await sanityFetch<PressItem[]>({ query: pressListQuery, tags: ['stampa'] })

  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-navy-900">
        <div className="container-site">
          <div className="section-label text-gold mb-4">Media</div>
          <h1 className="font-display text-5xl md:text-7xl font-300 text-cream-50">Area stampa</h1>
          <p className="font-body text-cream-300 text-lg mt-4 max-w-xl">
            Comunicati ufficiali, kit fotografico e contatti per i media.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Comunicati */}
            <div className="md:col-span-2">
              <h2 className="font-display text-3xl font-400 text-navy-900 mb-2">Comunicati stampa</h2>
              <div className="divider-gold mb-8" />

              {!press || press.length === 0 ? (
                <p className="font-body text-navy-500">Nessun comunicato al momento.</p>
              ) : (
                <div className="space-y-4">
                  {press.map((item) => (
                    <div key={item._id} className="border border-cream-200 bg-white p-6 hover:border-gold transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-body text-xs text-gold mb-2">
                            {new Date(item.data).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </div>
                          <h3 className="font-display text-xl font-400 text-navy-900 mb-2 leading-snug">{item.titolo}</h3>
                          <p className="font-body text-sm text-navy-500 leading-relaxed">{item.sommario}</p>
                        </div>
                        {item.allegato && (
                          <a
                            href={item.allegato.asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 flex items-center gap-2 border border-cream-300 px-4 py-2 text-navy-600 hover:border-gold hover:text-gold transition-colors font-body text-sm"
                          >
                            <Download size={14} />
                            PDF
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <h2 className="font-display text-2xl font-400 text-navy-900 mb-2">Contatti media</h2>
              <div className="divider-gold mb-6" />
              <div className="space-y-5">
                {contacts.map((c, i) => (
                  <div key={i} className="border border-cream-200 bg-white p-5">
                    <div className="section-label mb-1">{c.role}</div>
                    {c.name && <div className="font-display text-lg font-400 text-navy-900 mb-1">{c.name}</div>}
                    <a href={`mailto:${c.email}`} className="font-body text-sm text-gold hover:underline">{c.email}</a>
                  </div>
                ))}
              </div>

              <div className="mt-8 border border-cream-200 bg-white p-5">
                <div className="flex items-center gap-3 mb-3">
                  <FileText size={18} className="text-gold" />
                  <span className="font-display text-lg font-400 text-navy-900">Kit stampa</span>
                </div>
                <p className="font-body text-sm text-navy-500 mb-4">
                  Foto in alta risoluzione, logo e branding della campagna.
                </p>
                <a
                  href="mailto:stampa@viareggio-mon-amour.it?subject=Richiesta kit stampa"
                  className="btn-outline w-full justify-center text-sm py-2.5"
                >
                  Richiedi il kit
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
