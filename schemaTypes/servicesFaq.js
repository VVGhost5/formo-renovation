import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'servicesFaq',
  title: 'Services — FAQ',
  type: 'document',
  fields: [
    isShowedField(),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'titleEmphasis', title: 'Title emphasis', type: 'string'}),
    defineField({name: 'sub', title: 'Sub text', type: 'text', rows: 2}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{
        type: 'object',
        name: 'faqItem',
        fields: [
          defineField({name: 'question', type: 'string', title: 'Question', validation: R => R.required()}),
          defineField({name: 'answer', type: 'text', title: 'Answer', rows: 3}),
        ],
        preview: {
          select: {question: 'question'},
          prepare({question}) {return {title: question}},
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Services — FAQ'}
    },
  },
})
