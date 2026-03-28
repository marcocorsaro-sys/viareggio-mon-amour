export interface NewsItem {
  _id: string
  titolo: string
  slug: { current: string }
  categoria: string
  sommario: string
  immagine?: SanityImage
  publishedAt: string
  autore?: string
  corpo?: PortableTextBlock[]
  tags?: string[]
}

export interface EventItem {
  _id: string
  titolo: string
  slug: { current: string }
  tipo: string
  dataInizio: string
  dataFine?: string
  luogo: string
  indirizzo?: string
  descrizione?: string
  immagine?: SanityImage
  registrazione?: boolean
}

export interface PressItem {
  _id: string
  titolo: string
  slug: { current: string }
  data: string
  sommario: string
  allegato?: { asset: { url: string } }
}

export interface ProgramPoint {
  _id: string
  numero: number
  titolo: string
  area: 'infrastrutture' | 'economia' | 'cultura' | 'sociale' | 'governance' | 'ambiente'
  introduzione: string
  azioni: { testo: string; tempistica: string }[]
  percheSoloMarialina: string
}

export interface SanityImage {
  asset: { _ref: string; _type: string }
  alt?: string
  hotspot?: { x: number; y: number; width: number; height: number }
}

export type PortableTextBlock = {
  _type: string
  _key: string
  [key: string]: unknown
}
