import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'serviceCard',
  title: 'Service card',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'link', title: 'Link', type: 'string', description: 'Optional URL or #anchor'}),
  ],
  preview: {
    select: {title: 'name', media: 'image'},
  },
})
