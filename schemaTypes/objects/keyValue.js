import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'keyValue',
  title: 'Key / value',
  type: 'object',
  fields: [
    defineField({name: 'key', title: 'Key', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'val', title: 'Value', type: 'string', validation: (R) => R.required()}),
  ],
  preview: {
    select: {title: 'key', subtitle: 'val'},
  },
})
