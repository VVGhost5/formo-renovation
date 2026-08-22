import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meta',
      title: 'Location & date',
      type: 'string',
      description: 'e.g. Oak Bay, Victoria · March 2025',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'Client review text (include quotation marks if you like)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'initial',
      title: 'Avatar initial',
      type: 'string',
      description: 'Single letter in the avatar circle. Leave empty to use the first letter of the name.',
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: '1–5 stars',
      validation: (Rule) => Rule.min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower number = appears earlier in the slider. Leave empty to place at the end.',
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'sortOrderAsc',
      by: [
        {field: 'sortOrder', direction: 'asc'},
        {field: '_createdAt', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'meta', quote: 'quote'},
    prepare({title, subtitle, quote}) {
      return {
        title: title || 'Testimonial',
        subtitle: subtitle || (quote ? `${quote.slice(0, 60)}…` : ''),
      }
    },
  },
})
