import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'aboutFounder',
  title: 'About — Hero Side Card',
  type: 'document',
  fields: [
    isShowedField({
      initialValue: false,
      description: 'Show the glass card on the right side of the About hero. Hidden until you turn this on.',
    }),
    defineField({
      name: 'initial',
      title: 'Card initial',
      type: 'string',
      description: 'Single letter shown in the avatar circle (e.g. company initial).',
    }),
    defineField({
      name: 'name',
      title: 'Card title',
      type: 'string',
      description: 'e.g. company name, a trust line, or a short heading.',
    }),
    defineField({
      name: 'role',
      title: 'Card subtitle',
      type: 'string',
      description: 'e.g. service area, licensed/insured, or a short label.',
    }),
    defineField({
      name: 'quote',
      title: 'Card quote / promise',
      type: 'text',
      rows: 3,
      description: 'A company promise, client quote, or short positioning line.',
    }),
    defineField({
      name: 'stats',
      title: 'Card stats',
      type: 'array',
      of: [{type: 'statItem'}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About — Hero Side Card'}
    },
  },
})
