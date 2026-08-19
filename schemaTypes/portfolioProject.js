import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'ID / anchor',
      type: 'slug',
      options: {source: 'name'},
      validation: (R) => R.required(),
    }),
    defineField({name: 'num', title: 'Number label', type: 'string', description: 'e.g. 01'}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Kitchen', value: 'kitchen'},
          {title: 'Bathroom', value: 'bathroom'},
          {title: 'Living', value: 'living'},
          {title: 'Full renovation', value: 'full'},
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({name: 'name', title: 'Project name', type: 'string', validation: (R) => R.required()}),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'duration', title: 'Duration', type: 'string'}),
    defineField({name: 'year', title: 'Year', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    defineField({
      name: 'specs',
      title: 'Specs',
      type: 'array',
      of: [{type: 'keyValue'}],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
        }),
      ],
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before image',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional. Together with After, shows the before/after slider on the project page.',
    }),
    defineField({
      name: 'afterImage',
      title: 'After image',
      type: 'image',
      options: {hotspot: true},
      description: 'Cover image. If empty, the first gallery photo is used instead.',
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'homeTag',
      title: 'Homepage card tag',
      type: 'string',
      description: 'Short tag on homepage portfolio grid',
    }),
    defineField({name: 'homeMeta', title: 'Homepage card meta', type: 'string'}),
    defineField({name: 'sortOrder', title: 'Sort order', type: 'number', initialValue: 0}),
  ],
  orderings: [
    {title: 'Sort order', name: 'sortOrderAsc', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'location', media: 'afterImage'},
  },
})
