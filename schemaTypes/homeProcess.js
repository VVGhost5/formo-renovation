import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'homeProcess',
  title: 'Homepage — Process',
  type: 'document',
  fields: [
    isShowedField(),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'How We Work'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'headlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({name: 'ctaLabel', title: 'CTA label', type: 'string'}),
    defineField({name: 'heroImage', title: 'Hero background', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{type: 'processStep'}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage — Process'}
    },
  },
})
