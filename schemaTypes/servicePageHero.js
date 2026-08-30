import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'servicePageHero',
  title: 'Service Pages — Hero',
  type: 'document',
  description: 'Shared hero defaults for individual service pages (/services/kitchen/, etc.). Each service sets its own title and background image.',
  fields: [
    isShowedField({
      description: 'Default hero visibility on service detail pages. Can be overridden per service.',
    }),
    defineField({
      name: 'locationLabel',
      title: 'Eyebrow (shared default)',
      type: 'string',
      description: 'Small label above the title (.hero-eyebrow) on service pages. Used when a service has no own eyebrow set.',
    }),
    defineField({name: 'primaryCtaLabel', title: 'Primary CTA label', type: 'string'}),
    defineField({name: 'primaryCtaLink', title: 'Primary CTA link', type: 'string'}),
    defineField({name: 'secondaryCtaLabel', title: 'Secondary CTA label', type: 'string'}),
    defineField({name: 'secondaryCtaLink', title: 'Secondary CTA link', type: 'string'}),
  ],
  preview: {
    prepare() {
      return {title: 'Service Pages — Hero'}
    },
  },
})
