import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homeServices',
  title: 'Homepage — Services',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Our Services'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'titleAccent', title: 'Title accent line', type: 'string'}),
    defineField({
      name: 'cards',
      title: 'Service cards',
      type: 'array',
      of: [{type: 'serviceCard'}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage — Services'}
    },
  },
})
