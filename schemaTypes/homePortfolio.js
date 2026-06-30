import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePortfolio',
  title: 'Homepage — Portfolio',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Our Work'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'headlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({name: 'ctaLabel', title: 'CTA label', type: 'string'}),
    defineField({name: 'ctaLink', title: 'CTA link', type: 'string', initialValue: '/portfolio/'}),
    defineField({name: 'heroImage', title: 'Hero background', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'useFeaturedProjects',
      title: 'Use featured portfolio projects',
      type: 'boolean',
      description: 'When enabled, shows Portfolio Projects marked “Featured on homepage” instead of manual cards below.',
      initialValue: true,
    }),
    defineField({
      name: 'cards',
      title: 'Manual project cards',
      type: 'array',
      of: [
        defineField({
          name: 'card',
          type: 'object',
          fields: [
            defineField({name: 'tag', type: 'string', title: 'Tag'}),
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({name: 'meta', type: 'string', title: 'Meta'}),
            defineField({name: 'image', type: 'image', title: 'Image', options: {hotspot: true}}),
          ],
        }),
      ],
      hidden: ({parent}) => parent?.useFeaturedProjects,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage — Portfolio'}
    },
  },
})
