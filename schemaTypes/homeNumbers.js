import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'homeNumbers',
  title: 'Homepage — Numbers',
  type: 'document',
  fields: [
    isShowedField(),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'By the Numbers'}),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: '15 years of delivering spaces',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{type: 'statItem'}],
      validation: (R) => R.min(1).max(6),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage — Numbers'}
    },
  },
})
