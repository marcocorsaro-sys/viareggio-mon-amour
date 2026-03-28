import { groq } from 'next-sanity'

// Notizie
export const newsListQuery = groq`
  *[_type == "news"] | order(publishedAt desc) [0...$limit] {
    _id,
    titolo,
    slug,
    categoria,
    sommario,
    immagine,
    publishedAt,
    autore
  }
`

export const newsDetailQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    titolo,
    slug,
    categoria,
    sommario,
    corpo,
    immagine,
    publishedAt,
    autore,
    tags
  }
`

// Eventi
export const eventsQuery = groq`
  *[_type == "evento" && dataInizio >= $now] | order(dataInizio asc) {
    _id,
    titolo,
    slug,
    tipo,
    dataInizio,
    dataFine,
    luogo,
    indirizzo,
    descrizione,
    immagine,
    registrazione
  }
`

export const pastEventsQuery = groq`
  *[_type == "evento" && dataInizio < $now] | order(dataInizio desc) [0...10] {
    _id,
    titolo,
    tipo,
    dataInizio,
    luogo,
    descrizione
  }
`

// Comunicati stampa
export const pressListQuery = groq`
  *[_type == "comunicatoStampa"] | order(data desc) {
    _id,
    titolo,
    slug,
    data,
    sommario,
    allegato
  }
`

// Punti programma (se gestiti da Sanity)
export const programmaQuery = groq`
  *[_type == "puntoProgramma"] | order(numero asc) {
    _id,
    numero,
    titolo,
    area,
    introduzione,
    azioni,
    percheSoloMarialina
  }
`
