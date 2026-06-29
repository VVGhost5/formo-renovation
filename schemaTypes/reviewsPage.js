import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'reviewsPage',
  title: 'Reviews Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero background',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Reviews Page'}
    },
  },
})
