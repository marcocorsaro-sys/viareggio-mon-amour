import { defineField, defineType } from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'Notizie',
  type: 'document',
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'titolo', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Campagna', value: 'Campagna' },
          { title: 'Programma', value: 'Programma' },
          { title: 'Quartieri', value: 'Quartieri' },
          { title: 'Media', value: 'Media' },
          { title: 'Comunicato', value: 'Comunicato' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sommario',
      title: 'Sommario',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'corpo',
      title: 'Corpo articolo',
      type: 'array',
      of: [
        { type: 'block', styles: [
          { title: 'Normale', value: 'normal' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'Citazione', value: 'blockquote' },
        ]},
        { type: 'image', options: { hotspot: true }, fields: [
          { name: 'alt', title: 'Testo alternativo', type: 'string' },
        ]},
      ],
    }),
    defineField({
      name: 'immagine',
      title: 'Immagine di copertina',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Testo alternativo', type: 'string' }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data pubblicazione',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'autore',
      title: 'Autore',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    select: { title: 'titolo', subtitle: 'categoria', media: 'immagine' },
  },
  orderings: [{ title: 'Data (più recente)', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})
