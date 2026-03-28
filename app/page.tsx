import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, FileText, Users } from 'lucide-react'
import { sanityFetch } from '@/lib/sanity'
import { newsListQuery, eventsQuery } from '@/lib/queries'
import type { NewsItem, EventItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Marialina Marcucci — Sindaca di Viareggio',
}

const programHighlights = [
  { num: '01', area: 'Infrastrutture', title: 'Manutenzione prima', desc: 'Censimento pubblico entro 60 giorni. App di segnalazione con risposta garantita.' },
  { num: '02', area: 'Economia', title: 'Porto e nautica', desc: '180 imprese, 2.105 addetti. Concessioni certe, fondi PNRR, tavolo permanente.' },
  { num: '03', area: 'Cultura', title: 'Carnevale come industria', desc: '10 anni di presidenza. Fondi europei, contratti dignitosi alle maestranze.' },
  { num: '04', area: 'Governance', title: 'Trasparenza dal giorno 1', desc: 'Agenda pubblica della sindaca. Rapporto trimestrale. Bilancio partecipato.' },
]

const stats = [
  { value: '52.115', label: 'Elettori', sub: 'aventi diritto' },
  { value: '10 anni', label: 'Fondazione Carnevale', sub: 'presidenza' },
  { value: '12', label: 'Punti di programma', sub: 'concreti e verificabili' },
  { value: '24 mag', label: 'Data del voto', sub: '2026' },
]

export default async function HomePage() {
  const [news, events] = await Promise.all([
    sanityFetch<NewsItem[]>({ query: newsListQuery, params: { limit: 3 }, tags: ['news'] }),
    sanityFetch<EventItem[]>({ query: eventsQuery, params: { now: new Date().toISOString() }, tags: ['eventi'] }),
  ])

  const upcomingEvents = events?.slice(0, 3) ?? []

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end bg-navy-900 overflow-hidden pt-20">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, #c8973a22 0%, transparent 60%)' }}
        />

        <div className="container-site pb-20 md:pb-28 relative z-10">
          <div className="max-w-4xl">
            <div className="section-label text-gold mb-6 opacity-0 animate-fade-up">
              Lista civica · Viareggio Mon Amour · Elezioni 2026
            </div>

            <h1 className="font-display text-cream-50 leading-[1.05] mb-8 opacity-0 animate-fade-up animation-delay-100">
              <span className="block text-5xl md:text-7xl lg:text-8xl font-300">
                Viareggio non ha bisogno
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-300">
                di nuovi partiti.
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-300 text-gold">
                Ha bisogno di qualcuno
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-300 text-gold">
                che la conosca davvero.
              </span>
            </h1>

            <p className="font-body text-cream-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 opacity-0 animate-fade-up animation-delay-200">
              Marialina Marcucci. Dieci anni alla guida del Carnevale di Viareggio.
              Ex Vicepresidente della Regione Toscana. Imprenditrice.
              Candidata sindaca con la lista civica "Viareggio Mon Amour".
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up animation-delay-300">
              <Link href="/programma" className="btn-gold">
                Leggi il programma <ArrowRight size={16} />
              </Link>
              <Link href="/chi-sono" className="btn-outline border-cream-300 text-cream-100 hover:bg-cream-100 hover:text-navy-900">
                Chi è Marialina
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent" />
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-navy-800 border-y border-navy-700">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-navy-700">
            {stats.map((s) => (
              <div key={s.value} className="px-8 py-8 text-center">
                <div className="font-display text-3xl md:text-4xl font-400 text-gold mb-1">{s.value}</div>
                <div className="font-body text-xs text-cream-100 font-500 uppercase tracking-wide">{s.label}</div>
                <div className="font-body text-xs text-cream-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSITIONING ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-cream-100">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4">Chi è Marialina</div>
              <h2 className="section-title mb-6">
                Libera per scegliere.<br />
                <em className="text-gold not-italic">Pronta per governare.</em>
              </h2>
              <div className="divider-gold" />
              <p className="font-body text-navy-600 text-lg leading-relaxed mb-6">
                Per dieci anni ha guidato la Fondazione Carnevale di Viareggio —
                gestendo milioni di euro di bilancio, centinaia di lavoratori e rapporti
                con istituzioni europee. Prima ancora era Vicepresidente della Regione Toscana.
              </p>
              <p className="font-body text-navy-600 text-lg leading-relaxed mb-8">
                Si è dimessa dalla Fondazione il 13 marzo 2026 per candidarsi.
                Non per un partito. Per Viareggio.
              </p>
              <Link href="/chi-sono" className="btn-primary">
                Scopri di più <ArrowRight size={16} />
              </Link>
            </div>

            {/* Photo placeholder */}
            <div className="relative aspect-[4/5] bg-navy-100 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-navy-300 font-body text-sm">
                [Foto di Marialina Marcucci]
              </div>
              {/* Decorative frame */}
              <div className="absolute inset-4 border border-gold opacity-30 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMMA HIGHLIGHTS ─────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-cream-50">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="section-label mb-4">Il programma</div>
              <h2 className="section-title">
                12 punti concreti.<br />
                <em className="text-gold not-italic">Con azioni e tempi reali.</em>
              </h2>
            </div>
            <Link href="/programma" className="btn-outline shrink-0">
              Tutto il programma <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {programHighlights.map((p, i) => (
              <div
                key={p.num}
                className="border border-cream-300 bg-white p-8 hover:border-gold transition-colors duration-300 group"
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-5xl font-300 text-cream-300 group-hover:text-gold transition-colors leading-none">
                    {p.num}
                  </span>
                  <div>
                    <div className="section-label mb-2">{p.area}</div>
                    <h3 className="font-display text-2xl font-400 text-navy-900 mb-3">{p.title}</h3>
                    <p className="font-body text-sm text-navy-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTIZIE ──────────────────────────────────────────────────────── */}
      {news && news.length > 0 && (
        <section className="py-24 md:py-32 bg-navy-900">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="section-label text-gold mb-4">Aggiornamenti</div>
                <h2 className="font-display text-4xl md:text-5xl font-300 text-cream-50">
                  Ultime notizie
                </h2>
              </div>
              <Link href="/notizie" className="btn-outline border-cream-300 text-cream-100 hover:bg-cream-100 hover:text-navy-900 shrink-0">
                Tutte le notizie <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {news.map((item) => (
                <Link
                  key={item._id}
                  href={`/notizie/${item.slug.current}`}
                  className="border border-navy-700 hover:border-gold p-6 transition-colors duration-300 group"
                >
                  <div className="section-label text-gold mb-3">{item.categoria}</div>
                  <h3 className="font-display text-xl font-400 text-cream-100 mb-3 group-hover:text-gold transition-colors leading-snug">
                    {item.titolo}
                  </h3>
                  <p className="font-body text-sm text-cream-400 leading-relaxed line-clamp-3">{item.sommario}</p>
                  <div className="flex items-center gap-2 mt-4 text-gold">
                    <span className="font-body text-xs">Leggi</span>
                    <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EVENTI ───────────────────────────────────────────────────────── */}
      {upcomingEvents.length > 0 && (
        <section className="py-24 md:py-32 bg-cream-100">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="section-label mb-4">Agenda</div>
                <h2 className="section-title">Prossimi eventi</h2>
              </div>
              <Link href="/eventi" className="btn-outline shrink-0">
                Tutto il calendario <ArrowRight size={16} />
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((ev) => (
                <Link
                  key={ev._id}
                  href={`/eventi`}
                  className="flex flex-col md:flex-row items-start md:items-center gap-6 border border-cream-300 bg-white px-8 py-6 hover:border-gold transition-colors duration-300 group"
                >
                  <div className="shrink-0 text-center min-w-[64px]">
                    <div className="font-display text-3xl font-500 text-gold leading-none">
                      {new Date(ev.dataInizio).getDate()}
                    </div>
                    <div className="font-body text-xs uppercase tracking-wide text-navy-500 mt-1">
                      {new Date(ev.dataInizio).toLocaleDateString('it-IT', { month: 'short' })}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="section-label mb-1">{ev.tipo}</div>
                    <h3 className="font-display text-xl font-400 text-navy-900 group-hover:text-gold transition-colors">
                      {ev.titolo}
                    </h3>
                    <p className="font-body text-sm text-navy-500 mt-1">{ev.luogo}</p>
                  </div>
                  <ArrowRight size={18} className="text-gold shrink-0 hidden md:block" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA VOLONTARI ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-gold">
        <div className="container-site text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-300 text-white mb-6">
              Unisciti alla campagna.
            </h2>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-10">
              Puoi fare la differenza. Porta a porta, presidio degli eventi,
              social media: ogni contributo conta in una campagna a 52.000 elettori.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/volontari" className="btn-primary bg-navy-900 hover:bg-navy-800 text-cream-100">
                <Users size={16} />
                Diventa volontario
              </Link>
              <Link href="/contatti" className="btn-outline border-white text-white hover:bg-white hover:text-gold">
                <FileText size={16} />
                Contattaci
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
