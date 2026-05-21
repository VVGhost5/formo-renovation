import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
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
    defineField({name: 'founderInitial', title: 'Founder avatar initial', type: 'string'}),
    defineField({name: 'founderName', title: 'Founder name', type: 'string'}),
    defineField({name: 'founderRole', title: 'Founder role', type: 'string'}),
    defineField({name: 'founderQuote', title: 'Founder quote', type: 'text', rows: 3}),
    defineField({
      name: 'founderStats',
      title: 'Founder stats',
      type: 'array',
      of: [{type: 'statItem'}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About Page'}
    },
  },
})
