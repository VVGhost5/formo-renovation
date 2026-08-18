import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'homeBeforeAfter',
  title: 'Homepage — Before & After',
  type: 'document',
  fields: [
    isShowedField(),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Before & After'}),
    defineField({name: 'headline', title: 'Headline', type: 'string', initialValue: 'Real Results,'}),
    defineField({
      name: 'headlineEmphasis',
      title: 'Headline emphasis',
      type: 'string',
      initialValue: 'Real Spaces',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      initialValue: 'View All Projects →',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Banner background',
      type: 'image',
      options: {hotspot: true},
      description: 'Background image for the Before & After section banner',
    }),
  ],
  preview: {
    select: {media: 'heroBackground'},
    prepare() {
      return {title: 'Homepage — Before & After'}
    },
  },
})
