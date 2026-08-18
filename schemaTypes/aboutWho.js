import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'aboutWho',
  title: 'About — Who We Are',
  type: 'document',
  fields: [
    isShowedField(),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'headlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'lead', title: 'Lead paragraph', type: 'text', rows: 3}),
    defineField({
      name: 'body',
      title: 'Body paragraphs',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Each item is one paragraph of body text.',
    }),
    defineField({
      name: 'pills',
      title: 'Pills / tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'ctaLabel', title: 'CTA label', type: 'string'}),
    defineField({name: 'ctaLink', title: 'CTA link', type: 'string'}),
  ],
  preview: {
    prepare() {
      return {title: 'About — Who We Are'}
    },
  },
})
