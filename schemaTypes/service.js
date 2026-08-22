import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service (detail)',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Section ID',
      type: 'slug',
      description: 'Anchor on /services, e.g. svc-bathroom',
      options: {source: 'title'},
      validation: (R) => R.required(),
    }),
    defineField({name: 'num', title: 'Number', type: 'string'}),
    defineField({name: 'icon', title: 'Font Awesome icon class', type: 'string', description: 'e.g. fa-solid fa-shower'}),
    defineField({name: 'stripName', title: 'Strip name', type: 'string'}),
    defineField({name: 'quickName', title: 'Quick link name', type: 'string'}),
    defineField({name: 'quickSub', title: 'Quick link subtext', type: 'string'}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'lead', title: 'Lead paragraph', type: 'text', rows: 3}),
    defineField({
      name: 'includes',
      title: "What's included",
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'meta',
      title: 'Meta items',
      type: 'array',
      description: 'e.g. Typical Duration, Warranty. Do not add starting prices.',
      of: [{type: 'keyValue'}],
    }),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'imageAlt', title: 'Image alt', type: 'string'}),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower number = earlier in the list. Leave empty to place at the end.',
    }),
  ],
  orderings: [
    {title: 'Sort order', name: 'sortOrderAsc', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow', media: 'image'},
  },
})
