import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ArrowLeft } from 'lucide-react'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { newsDetailQuery } from '@/lib/queries'
import type { NewsItem } from '@/lib/types'

export const revalidate = 60

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news = await sanityFetch<NewsItem>({
    query: newsDetailQuery,
    params: { slug: params.slug },
    tags: [`news-${params.slug}`],
  })
  if (!news) return { title: 'Articolo non trovato' }
  return {
    title: news.titolo,
    description: news.sommario,
    openGraph: {
      title: news.titolo,
      description: news.sommario,
      images: news.immagine ? [urlFor(news.immagine).width(1200).height(630).url()] : [],
    },
  }
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-body text-navy-700 text-lg leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display text-3xl font-400 text-navy-900 mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display text-2xl font-400 text-navy-900 mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gold pl-6 py-1 my-8 font-display text-xl font-300 text-navy-600 italic">
        {children}
      </blockquote>
    ),
  },
}

export default async function NewsDetailPage({ params }: Props) {
  const news = await sanityFetch<NewsItem>({
    query: newsDetailQuery,
    params: { slug: params.slug },
    tags: [`news-${params.slug}`],
  })

  if (!news) notFound()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 bg-navy-900">
        <div className="container-site max-w-3xl">
          <Link href="/notizie" className="flex items-center gap-2 text-cream-400 hover:text-cream-100 transition-colors font-body text-sm mb-8">
            <ArrowLeft size={14} /> Tutte le notizie
          </Link>
          <div className="section-label text-gold mb-4">{news.categoria}</div>
          <h1 className="font-display text-4xl md:text-5xl font-300 text-cream-50 leading-tight mb-6">
            {news.titolo}
          </h1>
          <p className="font-body text-cream-300 text-lg leading-relaxed">{news.sommario}</p>
          <div className="mt-6 font-body text-xs text-cream-500">
            {new Date(news.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
            {news.autore && ` · ${news.autore}`}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {news.immagine && (
        <div className="relative aspect-[16/7] bg-cream-200">
          <Image
            src={urlFor(news.immagine).width(1400).height(612).url()}
            alt={news.immagine.alt ?? news.titolo}
            fill className="object-cover"
            priority
          />
        </div>
      )}

      {/* Body */}
      <article className="py-16 md:py-24 bg-cream-50">
        <div className="container-site max-w-2xl">
          {news.corpo ? (
            <PortableText value={news.corpo} components={portableTextComponents} />
          ) : (
            <p className="font-body text-navy-500">Contenuto non disponibile.</p>
          )}

          {news.tags && news.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-cream-200 flex flex-wrap gap-2">
              {news.tags.map(tag => (
                <span key={tag} className="font-body text-xs px-3 py-1 bg-cream-100 border border-cream-300 text-navy-500">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12">
            <Link href="/notizie" className="btn-outline">
              <ArrowLeft size={16} /> Tutte le notizie
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
