import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'aboutStory',
  title: 'About — Our Story',
  type: 'document',
  fields: [
    isShowedField({
      initialValue: false,
      description: 'Hidden on the live site until Is showed is on.',
    }),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'headlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'lead', title: 'Lead paragraph', type: 'text', rows: 3}),
    defineField({
      name: 'timeline',
      title: 'Timeline items',
      type: 'array',
      of: [{
        type: 'object',
        name: 'timelineItem',
        fields: [
          defineField({name: 'year', type: 'string', title: 'Year', validation: R => R.required()}),
          defineField({name: 'title', type: 'string', title: 'Title', validation: R => R.required()}),
          defineField({name: 'text', type: 'text', title: 'Text', rows: 3}),
          defineField({name: 'highlight', type: 'boolean', title: 'Highlight?', initialValue: false}),
        ],
        preview: {
          select: {year: 'year', title: 'title'},
          prepare({year, title}) {return {title: `${year} — ${title}`}},
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About — Our Story'}
    },
  },
})
