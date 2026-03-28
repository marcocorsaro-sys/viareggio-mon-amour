import type { Metadata } from 'next'
import { MapPin, Clock } from 'lucide-react'
import { sanityFetch } from '@/lib/sanity'
import { eventsQuery, pastEventsQuery } from '@/lib/queries'
import type { EventItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Calendario eventi',
  description: 'Tutti gli eventi della campagna di Marialina Marcucci. Incontri di quartiere, assemblee pubbliche e comizi.',
}

export const revalidate = 60

const typeColors: Record<string, string> = {
  'incontro': 'bg-teal-50 text-teal-800 border-teal-200',
  'evento': 'bg-gold/10 text-gold border-gold/30',
  'tour': 'bg-purple-50 text-purple-800 border-purple-200',
  'comizio': 'bg-red-50 text-red-800 border-red-200',
  'conferenza stampa': 'bg-blue-50 text-blue-800 border-blue-200',
}

function EventCard({ ev }: { ev: EventItem }) {
  const date = new Date(ev.dataInizio)
  const typeColor = typeColors[ev.tipo?.toLowerCase()] ?? 'bg-cream-100 text-navy-600 border-cream-300'

  return (
    <div className="border border-cream-200 bg-white hover:border-gold transition-colors group">
      <div className="flex items-stretch">
        {/* Date column */}
        <div className="w-24 shrink-0 bg-navy-900 flex flex-col items-center justify-center py-6 px-3 text-center">
          <div className="font-display text-3xl font-500 text-gold leading-none">{date.getDate()}</div>
          <div className="font-body text-xs uppercase tracking-wide text-cream-300 mt-1">
            {date.toLocaleDateString('it-IT', { month: 'short' })}
          </div>
          <div className="font-mono text-xs text-cream-500 mt-1">
            {date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 min-w-0">
          <span className={`inline-block text-xs font-body font-500 px-2.5 py-0.5 border rounded mb-3 ${typeColor}`}>
            {ev.tipo}
          </span>
          <h3 className="font-display text-xl font-400 text-navy-900 group-hover:text-gold transition-colors mb-2 leading-snug">
            {ev.titolo}
          </h3>
          {ev.descrizione && (
            <p className="font-body text-sm text-navy-500 leading-relaxed mb-3 line-clamp-2">{ev.descrizione}</p>
          )}
          <div className="flex flex-wrap gap-4">
            {ev.luogo && (
              <div className="flex items-center gap-1.5 text-navy-500">
                <MapPin size={12} />
                <span className="font-body text-xs">{ev.luogo}</span>
              </div>
            )}
            {ev.indirizzo && (
              <div className="flex items-center gap-1.5 text-navy-400">
                <Clock size={12} />
                <span className="font-body text-xs">{ev.indirizzo}</span>
              </div>
            )}
          </div>
        </div>

        {ev.registrazione && (
          <div className="shrink-0 flex items-center pr-6">
            <span className="font-body text-xs px-3 py-1.5 border border-gold text-gold">Registrazione</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default async function EventiPage() {
  const now = new Date().toISOString()
  const [upcoming, past] = await Promise.all([
    sanityFetch<EventItem[]>({ query: eventsQuery, params: { now }, tags: ['eventi'] }),
    sanityFetch<EventItem[]>({ query: pastEventsQuery, params: { now }, tags: ['eventi'] }),
  ])

  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-navy-900">
        <div className="container-site">
          <div className="section-label text-gold mb-4">Agenda</div>
          <h1 className="font-display text-5xl md:text-7xl font-300 text-cream-50">
            Calendario eventi
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container-site">
          {/* Prossimi */}
          <h2 className="font-display text-3xl font-400 text-navy-900 mb-2">Prossimi appuntamenti</h2>
          <div className="divider-gold mb-8" />

          {!upcoming || upcoming.length === 0 ? (
            <div className="border border-cream-200 bg-white p-12 text-center">
              <p className="font-body text-navy-500">Nessun evento in programma. Torna presto.</p>
            </div>
          ) : (
            <div className="space-y-4 mb-20">
              {upcoming.map(ev => <EventCard key={ev._id} ev={ev} />)}
            </div>
          )}

          {/* Passati */}
          {past && past.length > 0 && (
            <>
              <h2 className="font-display text-2xl font-400 text-navy-600 mb-2">Eventi passati</h2>
              <div className="divider-gold mb-8" />
              <div className="space-y-3 opacity-70">
                {past.map(ev => <EventCard key={ev._id} ev={ev} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
