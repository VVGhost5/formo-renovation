import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'aboutCert',
  title: 'About — Certifications',
  type: 'document',
  fields: [
    isShowedField(),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'headlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{
        type: 'object',
        name: 'certBadge',
        fields: [
          defineField({name: 'icon', type: 'string', title: 'Icon (FA class)', description: 'e.g. fa-solid fa-building-columns'}),
          defineField({name: 'name', type: 'string', title: 'Name', validation: R => R.required()}),
        ],
        preview: {
          select: {name: 'name'},
          prepare({name}) {return {title: name}},
        },
      }],
    }),
    defineField({
      name: 'guaranteeCards',
      title: 'Guarantee cards',
      type: 'array',
      of: [{
        type: 'object',
        name: 'guaranteeCard',
        fields: [
          defineField({name: 'icon', type: 'string', title: 'Icon (FA class)'}),
          defineField({name: 'title', type: 'string', title: 'Title', validation: R => R.required()}),
          defineField({name: 'text', type: 'text', title: 'Text', rows: 3}),
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
      return {title: 'About — Certifications'}
    },
  },
})
