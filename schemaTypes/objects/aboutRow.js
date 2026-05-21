import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutRow',
  title: 'About row',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Row label', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'headingBefore', title: 'Heading — before emphasis', type: 'string'}),
    defineField({name: 'headingEmphasis', title: 'Heading — emphasized part', type: 'string'}),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'pills',
      title: 'Pills',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'imageAlt', title: 'Image alt text', type: 'string'}),
    defineField({
      name: 'reverse',
      title: 'Reverse layout',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'label'},
  },
})
