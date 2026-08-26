import {defineField, defineType} from 'sanity'

const pageSeoField = (name, title, initialTitle, initialDescription) =>
  defineField({
    name,
    title,
    type: 'pageSeo',
    initialValue: {
      title: initialTitle,
      description: initialDescription,
    },
  })

export default defineType({
  name: 'metaData',
  title: 'Metadata',
  type: 'document',
  description: 'SEO titles and descriptions for each public page.',
  fields: [
    defineField({
      name: 'defaultOgImage',
      title: 'Default social share image',
      type: 'image',
      description:
        'Fallback image for pages without their own social image (1200×630 recommended).',
      options: {hotspot: true},
    }),
    pageSeoField(
      'home',
      'Homepage (/)',
      'Formo Renovations — Design & Renovation Solutions',
      'Premium renovation and interior finishing solutions for homes across Victoria and Vancouver Island, BC.',
    ),
    pageSeoField(
      'aboutUs',
      'About Us (/about-us)',
      'About Formo Renovations — Our Story, Team & Values',
      'Learn the story behind Formo Renovations — our team, values, and commitment to quality craftsmanship across Victoria and Vancouver Island, BC since 2016.',
    ),
    pageSeoField(
      'services',
      'Services (/services)',
      'Our Services — Formo Renovations',
      'Full-range renovation and interior finishing services for Victoria and Vancouver Island — bathrooms, kitchens, flooring, full home renovations, and more.',
    ),
    pageSeoField(
      'portfolio',
      'Portfolio (/portfolio)',
      'Renovation Portfolio — Formo Projects in Victoria, BC',
      'Browse our completed renovation projects across Victoria and Vancouver Island, BC — kitchens, bathrooms, living rooms, and full apartment transformations.',
    ),
    pageSeoField(
      'reviews',
      'Reviews (/reviews)',
      'Client Reviews — Formo Renovations',
      'Read genuine client reviews from homeowners across Victoria and Vancouver Island, BC. Share your own experience with Formo Renovations.',
    ),
    pageSeoField(
      'contacts',
      'Contacts (/contacts)',
      'Contact Us — Formo Renovations',
      'Get in touch with Formo Renovations. Free on-site consultations across Victoria and Vancouver Island, BC. Call, email, or fill in the form.',
    ),
  ],
  preview: {
    prepare() {
      return {title: 'Metadata'}
    },
  },
})
