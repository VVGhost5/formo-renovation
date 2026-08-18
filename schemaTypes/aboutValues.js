import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'aboutValues',
  title: 'About — Our Values',
  type: 'document',
  fields: [
    isShowedField(),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'headlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    defineField({name: 'heroBackground', title: 'Background image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'cards',
      title: 'Value cards',
      type: 'array',
      of: [{
        type: 'object',
        name: 'valueCard',
        fields: [
          defineField({name: 'icon', type: 'string', title: 'Icon (FA class)', description: 'e.g. fa-solid fa-magnifying-glass'}),
          defineField({name: 'num', type: 'string', title: 'Number'}),
          defineField({name: 'title', type: 'string', title: 'Title', validation: R => R.required()}),
          defineField({name: 'body', type: 'text', title: 'Body text', rows: 3}),
        ],
        preview: {
          select: {num: 'num', title: 'title'},
          prepare({num, title}) {return {title: `${num} — ${title}`}},
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About — Our Values'}
    },
  },
})
