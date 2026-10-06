import {defineField, defineType} from 'sanity'

export const DOOR_IMAGE_OPTIONS = [
  {title: 'Front entry', value: 'front-entry'},
  {title: 'Patio door', value: 'patio-door'},
  {title: 'Sliding closet door', value: 'closet-door'},
  {title: 'Interior door', value: 'interior-door'},
  {title: 'Door glass insert', value: 'glass-insert'},
  {title: 'Garage door', value: 'garage-door'},
  {title: 'Commercial door', value: 'commercial-door'},
  {title: 'Storefront door', value: 'storefront-door'},
  {title: 'Fire-rated door', value: 'fire-rated-door'},
  {title: 'Industrial door', value: 'industrial-door'},
]

export default defineType({
  name: 'doorsCard',
  title: 'Door service card',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({
      name: 'imageKey',
      title: 'Image',
      type: 'string',
      description: 'Photo file in the site image library. Repair cards can reuse an installation photo.',
      options: {list: DOOR_IMAGE_OPTIONS, layout: 'dropdown'},
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'imageKey'},
  },
})
