import { defineField, defineType } from 'sanity'

export const evento = defineType({
  name: 'evento',
  title: 'Eventi',
  type: 'document',
  fields: [
    defineField({ name: 'titolo', title: 'Titolo', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titolo' } }),
    defineField({
      name: 'tipo',
      title: 'Tipo di evento',
      type: 'string',
      options: { list: ['Incontro', 'Tour', 'Evento', 'Comizio', 'Conferenza stampa'] },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'dataInizio', title: 'Data e ora inizio', type: 'datetime', validation: (R) => R.required() }),
    defineField({ name: 'dataFine', title: 'Data e ora fine', type: 'datetime' }),
    defineField({ name: 'luogo', title: 'Luogo / nome venue', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'indirizzo', title: 'Indirizzo completo', type: 'string' }),
    defineField({ name: 'descrizione', title: 'Descrizione breve', type: 'text', rows: 3 }),
    defineField({ name: 'immagine', title: 'Immagine', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'registrazione', title: 'Richiede registrazione?', type: 'boolean', initialValue: false }),
    defineField({ name: 'linkRegistrazione', title: 'Link registrazione', type: 'url' }),
  ],
  preview: {
    select: { title: 'titolo', subtitle: 'dataInizio', media: 'immagine' },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? new Date(subtitle).toLocaleDateString('it-IT') : '',
    }),
  },
  orderings: [{ title: 'Data evento', name: 'dateAsc', by: [{ field: 'dataInizio', direction: 'asc' }] }],
})

export const comunicatoStampa = defineType({
  name: 'comunicatoStampa',
  title: 'Comunicati stampa',
  type: 'document',
  fields: [
    defineField({ name: 'titolo', title: 'Titolo', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titolo' } }),
    defineField({ name: 'data', title: 'Data', type: 'date', validation: (R) => R.required() }),
    defineField({ name: 'sommario', title: 'Sommario', type: 'text', rows: 3 }),
    defineField({
      name: 'allegato',
      title: 'Allegato PDF',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
  ],
  preview: {
    select: { title: 'titolo', subtitle: 'data' },
  },
})
