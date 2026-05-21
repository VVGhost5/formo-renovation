import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'beforeAfterProject',
  title: 'Before & After Project',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'duration', title: 'Duration', type: 'string'}),
    defineField({name: 'year', title: 'Year', type: 'string'}),
    defineField({name: 'beforeImage', title: 'Before image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'afterImage', title: 'After image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'sortOrder', title: 'Sort order', type: 'number', initialValue: 0}),
  ],
  orderings: [
    {title: 'Sort order', name: 'sortOrderAsc', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'location', media: 'afterImage'},
  },
})
