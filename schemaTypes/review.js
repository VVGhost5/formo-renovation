import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Oak Bay, Victoria, BC',
    }),
    defineField({
      name: 'service',
      title: 'Service Type',
      type: 'string',
      description: 'e.g. Kitchen Renovation, Bathroom, Full Home',
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
      name: 'comment',
      title: 'Comment',
      type: 'text',
      rows: 5,
      description: 'The client review text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Only approved reviews are shown on the website',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
    {
      title: 'Highest rating',
      name: 'ratingDesc',
      by: [
        {field: 'rating', direction: 'desc'},
        {field: '_createdAt', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'comment', rating: 'rating', approved: 'approved'},
    prepare({title, subtitle, rating, approved}) {
      const stars = '★'.repeat(rating ?? 5)
      const badge = approved ? '✅' : '⏳'
      return {
        title: `${badge} ${title || 'Review'}`,
        subtitle: subtitle ? `${stars} — ${subtitle.slice(0, 60)}…` : stars,
      }
    },
  },
})
