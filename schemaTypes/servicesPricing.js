import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'servicesPricing',
  title: 'Services — Pricing Hint',
  type: 'document',
  fields: [
    isShowedField(),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'headlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'body', title: 'Body paragraph', type: 'text', rows: 4}),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{
        type: 'object',
        name: 'pricingHintCard',
        fields: [
          defineField({name: 'icon', type: 'string', title: 'Icon (FA class)', description: 'e.g. fa-solid fa-file-invoice'}),
          defineField({name: 'title', type: 'string', title: 'Title', validation: R => R.required()}),
          defineField({name: 'body', type: 'text', title: 'Body text', rows: 2}),
        ],
        preview: {
          select: {title: 'title'},
          prepare({title}) {return {title}},
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Services — Pricing Hint'}
    },
  },
})
