import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'homeContact',
  title: 'Homepage — Contact',
  type: 'document',
  fields: [
    isShowedField({
      description: 'When off, this section is hidden on the homepage. Other pages still show the contact block.',
    }),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Contact Us'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'headlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'lead', title: 'Lead text', type: 'text', rows: 3}),
    defineField({name: 'ctaLabel', title: 'CTA label', type: 'string'}),
    defineField({name: 'formTitle', title: 'Form title', type: 'string'}),
    defineField({name: 'formSubtext', title: 'Form subtext', type: 'string'}),
    defineField({name: 'photo', title: 'Side photo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'photoAlt', title: 'Photo alt text', type: 'string'}),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage — Contact'}
    },
  },
})
