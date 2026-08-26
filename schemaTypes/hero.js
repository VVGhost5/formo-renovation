import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'hero',
  title: 'Homepage Hero',
  type: 'document',
  description: 'Single homepage hero — create one document and publish it.',
  fields: [
    isShowedField(),
    defineField({
      name: 'locationLabel',
      title: 'Location label',
      type: 'string',
      description: 'Small line above the headline (e.g. Victoria & Vancouver Island)',
    }),
    defineField({
      name: 'titleLine1',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary button label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary button label',
      type: 'string',
    }),
    defineField({
      name: 'formTitle',
      title: 'Form — title',
      type: 'string',
    }),
    defineField({
      name: 'formSubtext',
      title: 'Form — subtext',
      type: 'string',
    }),
    defineField({
      name: 'formNote',
      title: 'Form — footnote',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'titleLine1',
      media: 'backgroundImage',
    },
    prepare({title, media}) {
      return {title: title || 'Homepage Hero', media}
    },
  },
})
