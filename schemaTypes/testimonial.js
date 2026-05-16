import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: '1–5 stars',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'quote'},
    prepare({title, subtitle}) {
      return {
        title: title || 'Testimonial',
        subtitle: subtitle ? `${subtitle.slice(0, 80)}${subtitle.length > 80 ? '…' : ''}` : '',
      }
    },
  },
})
