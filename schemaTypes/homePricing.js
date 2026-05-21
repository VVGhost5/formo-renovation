import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePricing',
  title: 'Homepage — Pricing',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Pricing'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'headlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'heroDescription', title: 'Hero description', type: 'text', rows: 3}),
    defineField({name: 'heroCtaLabel', title: 'Hero CTA label', type: 'string'}),
    defineField({name: 'heroImage', title: 'Hero background', type: 'image', options: {hotspot: true}}),
    defineField({name: 'introTitle', title: 'Intro title', type: 'string'}),
    defineField({name: 'introText', title: 'Intro text', type: 'text', rows: 3}),
    defineField({
      name: 'factors',
      title: 'Cost factors',
      type: 'array',
      of: [{type: 'pricingFactor'}],
    }),
    defineField({name: 'ctaLabel', title: 'CTA band label', type: 'string'}),
    defineField({name: 'ctaTitle', title: 'CTA band title', type: 'string'}),
    defineField({name: 'ctaSubtext', title: 'CTA band subtext', type: 'text', rows: 3}),
    defineField({name: 'ctaPrimaryLabel', title: 'Primary button', type: 'string'}),
    defineField({name: 'ctaSecondaryLabel', title: 'Secondary button', type: 'string'}),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage — Pricing'}
    },
  },
})
