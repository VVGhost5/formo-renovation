import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'processStep',
  title: 'Process step',
  type: 'object',
  fields: [
    defineField({name: 'num', title: 'Number', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({
      name: 'arrow',
      title: 'Arrow symbol',
      type: 'string',
      initialValue: '→',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'num'},
  },
})
