import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'homeAbout',
  title: 'Homepage — About',
  type: 'document',
  fields: [
    isShowedField(),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'About Us'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'headlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'heroDescription', title: 'Hero description', type: 'text', rows: 3}),
    defineField({name: 'heroCtaLabel', title: 'Hero CTA label', type: 'string'}),
    defineField({name: 'heroCtaLink', title: 'Hero CTA link', type: 'string'}),
    defineField({name: 'heroImage', title: 'Hero background', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'rows',
      title: 'Content rows',
      type: 'array',
      of: [{type: 'aboutRow'}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage — About'}
    },
  },
})
