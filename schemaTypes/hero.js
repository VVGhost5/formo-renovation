import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Homepage Hero',
  type: 'document',
  description: 'Single homepage hero — create one document and publish it.',
  fields: [
    defineField({
      name: 'locationLabel',
      title: 'Location label',
      type: 'string',
      description: 'Small line above the headline (e.g. Victoria & Vancouver Island)',
      initialValue: 'Victoria & Vancouver Island',
    }),
    defineField({
      name: 'titleLine1',
      title: 'Headline — line 1',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Premium',
    }),
    defineField({
      name: 'titleLine2',
      title: 'Headline — line 2',
      type: 'string',
      initialValue: 'Renovations',
    }),
    defineField({
      name: 'titleSub',
      title: 'Headline — sub line',
      type: 'string',
      description: 'Shown below the main headline (e.g. & Interior Finishing)',
      initialValue: '& Interior Finishing',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      initialValue:
        'We deliver premium renovation and interior finishing solutions that combine craftsmanship, transparent communication, and meticulous quality control — from concept to completion.',
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary button label',
      type: 'string',
      initialValue: 'Get a Free Estimate →',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary button label',
      type: 'string',
      initialValue: 'View Our Projects →',
    }),
    defineField({
      name: 'formTitle',
      title: 'Form — title',
      type: 'string',
      initialValue: 'Request a Free Estimate',
    }),
    defineField({
      name: 'formSubtext',
      title: 'Form — subtext',
      type: 'string',
      initialValue: "We'll call you back within one business day",
    }),
    defineField({
      name: 'formNote',
      title: 'Form — footnote',
      type: 'string',
      initialValue: 'No commitment — just an honest conversation',
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
      line1: 'titleLine1',
      line2: 'titleLine2',
      media: 'backgroundImage',
    },
    prepare({line1, line2, media}) {
      const title = [line1, line2].filter(Boolean).join(' ') || 'Homepage Hero'
      return {title, media}
    },
  },
})
