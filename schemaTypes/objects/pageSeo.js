import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pageSeo',
  title: 'Page SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta title',
      type: 'string',
      description: 'Shown in browser tab and search results (aim for ~50–60 characters).',
      validation: (Rule) => Rule.max(70).warning('Keep under 60 characters when possible'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Short summary for search engines (aim for ~150–160 characters).',
      validation: (Rule) => Rule.max(200).warning('Keep under 160 characters when possible'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      description: 'Optional. Used when this page is shared on social media (1200×630 recommended).',
      options: {hotspot: true},
    }),
    defineField({
      name: 'jsonLd',
      title: 'Structured Data (JSON-LD)',
      type: 'text',
      rows: 20,
      description:
        'Paste the full JSON-LD content here (without <script> tags). Must be valid JSON. Overrides the auto-generated schema.',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true
          try {
            JSON.parse(value)
            return true
          } catch {
            return 'Must be valid JSON'
          }
        }),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})
