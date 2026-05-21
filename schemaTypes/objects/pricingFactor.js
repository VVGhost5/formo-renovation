import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pricingFactor',
  title: 'Pricing factor',
  type: 'object',
  fields: [
    defineField({name: 'num', title: 'Number', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'num'},
  },
})
