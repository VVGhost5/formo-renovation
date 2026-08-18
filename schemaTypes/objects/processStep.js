import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'processStep',
  title: 'Process step',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
  ],
  preview: {
    select: {title: 'title'},
  },
})
