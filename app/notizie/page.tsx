import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { newsListQuery } from '@/lib/queries'
import type { NewsItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Notizie',
  description: 'Aggiornamenti dalla campagna di Marialina Marcucci per le elezioni comunali di Viareggio 2026.',
}

export const revalidate = 60

export default async function NotizePage() {
  const news = await sanityFetch<NewsItem[]>({
    query: newsListQuery,
    params: { limit: 50 },
    tags: ['news'],
  })

  const featured = news?.[0]
  const rest = news?.slice(1) ?? []

  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-navy-900">
        <div className="container-site">
          <div className="section-label text-gold mb-4">Aggiornamenti</div>
          <h1 className="font-display text-5xl md:text-7xl font-300 text-cream-50">
            Notizie dalla campagna
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container-site">
          {!news || news.length === 0 ? (
            <p className="font-body text-navy-500 text-center py-20">Nessuna notizia al momento. Torna presto.</p>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <Link
                  href={`/notizie/${featured.slug.current}`}
                  className="grid md:grid-cols-2 gap-0 border border-cream-300 bg-white hover:border-gold transition-colors mb-12 group"
                >
                  <div className="aspect-[4/3] bg-cream-200 relative overflow-hidden">
                    {featured.immagine ? (
                      <Image
                        src={urlFor(featured.immagine).width(800).height(600).url()}
                        alt={featured.immagine.alt ?? featured.titolo}
                        fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-cream-400 text-sm font-body">[Immagine]</div>
                    )}
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="section-label mb-3">{featured.categoria}</div>
                    <h2 className="font-display text-3xl md:text-4xl font-400 text-navy-900 mb-4 group-hover:text-gold transition-colors leading-tight">
                      {featured.titolo}
                    </h2>
                    <p className="font-body text-navy-600 leading-relaxed mb-6">{featured.sommario}</p>
                    <div className="flex items-center gap-2 text-gold">
                      <span className="font-body text-sm">Leggi l'articolo</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {rest.map((item) => (
                  <Link
                    key={item._id}
                    href={`/notizie/${item.slug.current}`}
                    className="border border-cream-300 bg-white hover:border-gold transition-colors group flex flex-col"
                  >
                    <div className="aspect-video bg-cream-200 relative overflow-hidden">
                      {item.immagine ? (
                        <Image
                          src={urlFor(item.immagine).width(600).height(340).url()}
                          alt={item.immagine.alt ?? item.titolo}
                          fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-cream-400 text-xs font-body">[Immagine]</div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="section-label mb-2">{item.categoria}</div>
                      <h3 className="font-display text-xl font-400 text-navy-900 group-hover:text-gold transition-colors leading-snug mb-3 flex-1">
                        {item.titolo}
                      </h3>
                      <p className="font-body text-sm text-navy-500 leading-relaxed line-clamp-3 mb-4">{item.sommario}</p>
                      <div className="flex items-center gap-2 text-gold text-sm mt-auto">
                        <span className="font-body">Leggi</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
