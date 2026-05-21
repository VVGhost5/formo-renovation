import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  fields: [
    defineField({name: 'locationLabel', title: 'Location label', type: 'string'}),
    defineField({name: 'titleBefore', title: 'Title — before emphasis', type: 'string'}),
    defineField({name: 'titleEmphasis', title: 'Title — emphasis', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({name: 'primaryCtaLabel', title: 'Primary CTA', type: 'string'}),
    defineField({name: 'primaryCtaLink', title: 'Primary CTA link', type: 'string'}),
    defineField({name: 'secondaryCtaLabel', title: 'Secondary CTA', type: 'string'}),
    defineField({name: 'secondaryCtaLink', title: 'Secondary CTA link', type: 'string'}),
    defineField({name: 'heroImage', title: 'Hero background', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'stats',
      title: 'Hero stats',
      type: 'array',
      of: [{type: 'statItem'}],
      validation: (R) => R.max(4),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Portfolio Page'}
    },
  },
})
