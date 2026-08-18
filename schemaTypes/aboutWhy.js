import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'aboutWhy',
  title: 'About — Why Choose Us',
  type: 'document',
  fields: [
    isShowedField(),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'bannerHeadline', title: 'Banner headline', type: 'string'}),
    defineField({name: 'bannerHeadlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'bannerDescription', title: 'Banner description', type: 'text', rows: 3}),
    defineField({name: 'bannerBackground', title: 'Banner background image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [{
        type: 'object',
        name: 'whyRow',
        fields: [
          defineField({name: 'num', type: 'string', title: 'Number'}),
          defineField({name: 'label', type: 'string', title: 'Mono label'}),
          defineField({name: 'title', type: 'string', title: 'Title', validation: R => R.required()}),
          defineField({name: 'body', type: 'text', title: 'Body text', rows: 3}),
          defineField({name: 'pills', type: 'array', title: 'Pills', of: [{type: 'string'}]}),
          defineField({name: 'image', type: 'image', title: 'Image', options: {hotspot: true}}),
          defineField({name: 'imageAlt', type: 'string', title: 'Image alt text'}),
        ],
        preview: {
          select: {num: 'num', title: 'title', media: 'image'},
          prepare({num, title, media}) {return {title: `${num} — ${title}`, media}},
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About — Why Choose Us'}
    },
  },
})
