import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

const PORTFOLIO_CATEGORIES = [
  {title: 'Kitchen', value: 'kitchen'},
  {title: 'Bedroom', value: 'bedroom'},
  {title: 'Hallway', value: 'hallway'},
  {title: 'Wardrobe', value: 'wardrobe'},
  {title: 'Bathroom', value: 'bathroom'},
  {title: 'Living Room', value: 'living'},
]

export default defineType({
  name: 'service',
  title: 'Service (detail)',
  type: 'document',
  fieldsets: [
    {name: 'overview', title: 'Overview', options: {collapsible: true, collapsed: false}},
    {name: 'hero', title: 'Service page — Hero', options: {collapsible: true, collapsed: true}},
    {name: 'detail', title: 'Service page — Detail block', options: {collapsible: true, collapsed: true}},
    {name: 'portfolio', title: 'Service page — Portfolio', options: {collapsible: true, collapsed: true}},
    {name: 'faq', title: 'Service page — FAQ', options: {collapsible: true, collapsed: true}},
    {name: 'seo', title: 'Service page — SEO', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'Section ID',
      type: 'slug',
      description: 'Anchor on /services, e.g. svc-bathroom',
      options: {source: 'title'},
      validation: (R) => R.required(),
      fieldset: 'overview',
    }),
    defineField({
      name: 'pageSlug',
      title: 'Page URL slug',
      type: 'slug',
      description: 'URL path under /services/, e.g. kitchen → /services/kitchen/',
      options: {source: 'title', maxLength: 96},
      fieldset: 'overview',
    }),
    defineField({name: 'num', title: 'Number', type: 'string', fieldset: 'overview'}),
    defineField({
      name: 'icon',
      title: 'Font Awesome icon class',
      type: 'string',
      description: 'e.g. fa-solid fa-shower',
      fieldset: 'overview',
    }),
    defineField({name: 'stripName', title: 'Strip name', type: 'string', fieldset: 'overview'}),
    defineField({name: 'quickName', title: 'Quick link name', type: 'string', fieldset: 'overview'}),
    defineField({name: 'quickSub', title: 'Quick link subtext', type: 'string', fieldset: 'overview'}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', fieldset: 'overview'}),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
      fieldset: 'overview',
    }),
    defineField({name: 'lead', title: 'Lead paragraph', type: 'text', rows: 3, fieldset: 'overview'}),
    defineField({
      name: 'includes',
      title: "What's included",
      type: 'array',
      of: [{type: 'string'}],
      fieldset: 'overview',
    }),
    defineField({
      name: 'meta',
      title: 'Meta items',
      type: 'array',
      description: 'e.g. Typical Duration, Warranty. Do not add starting prices.',
      of: [{type: 'keyValue'}],
      fieldset: 'overview',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'overview',
    }),
    defineField({name: 'imageAlt', title: 'Image alt', type: 'string', fieldset: 'overview'}),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower number = earlier in the list. Leave empty to place at the end.',
      fieldset: 'overview',
    }),

    // ── Service page — Hero ──────────────────────────────────────────────────
    isShowedField({
      name: 'heroIsShowed',
      title: 'Hero — visibility',
      initialValue: true,
      fieldset: 'hero',
      description: 'Show the hero section on this service page. Shared location label and CTAs are in Services → Service Pages — Hero.',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow',
      type: 'string',
      fieldset: 'hero',
      description: 'Small label above the title (.hero-eyebrow). Falls back to Services → Service Pages — Hero → Eyebrow, then to Overview → Eyebrow.',
    }),
    defineField({
      name: 'heroTitleBefore',
      title: 'Title — before emphasis',
      type: 'string',
      fieldset: 'hero',
      description: 'Falls back to service title when empty.',
    }),
    defineField({
      name: 'heroTitleEmphasis',
      title: 'Title — emphasis',
      type: 'string',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      fieldset: 'hero',
      description: 'Falls back to service lead when empty.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero background',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'hero',
      description: 'Background image for this service page hero. Separate from the detail block image and the main /services/ page hero.',
      validation: (R) => R.required(),
    }),

    // ── Service page — Detail block ──────────────────────────────────────────
    isShowedField({
      name: 'detailIsShowed',
      title: 'Detail block — visibility',
      initialValue: true,
      fieldset: 'detail',
      description: 'Show the main service description block (image, includes, meta).',
    }),

    // ── Service page — Portfolio ─────────────────────────────────────────────
    isShowedField({
      name: 'portfolioIsShowed',
      title: 'Portfolio — visibility',
      initialValue: true,
      fieldset: 'portfolio',
      description: 'Show related portfolio projects on this service page.',
    }),
    defineField({
      name: 'portfolioEyebrow',
      title: 'Eyebrow',
      type: 'string',
      fieldset: 'portfolio',
      description: 'Falls back to the Portfolio page intro when empty.',
    }),
    defineField({
      name: 'portfolioTitle',
      title: 'Title — before emphasis',
      type: 'string',
      fieldset: 'portfolio',
    }),
    defineField({
      name: 'portfolioTitleEmphasis',
      title: 'Title — emphasis',
      type: 'string',
      fieldset: 'portfolio',
    }),
    defineField({
      name: 'portfolioDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      fieldset: 'portfolio',
    }),
    defineField({
      name: 'portfolioCategories',
      title: 'Portfolio categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: PORTFOLIO_CATEGORIES,
      },
      fieldset: 'portfolio',
      description: 'Projects matching these room categories are shown. Leave empty to match by service name in tags.',
    }),

    // ── Service page — FAQ ───────────────────────────────────────────────────
    isShowedField({
      name: 'faqIsShowed',
      title: 'FAQ — visibility',
      initialValue: false,
      fieldset: 'faq',
      description: 'Hidden by default. Enable when FAQ content is ready.',
    }),
    defineField({
      name: 'faqEyebrow',
      title: 'Eyebrow',
      type: 'string',
      fieldset: 'faq',
      description: 'Falls back to the Services page FAQ when empty.',
    }),
    defineField({name: 'faqTitle', title: 'Title', type: 'string', fieldset: 'faq'}),
    defineField({name: 'faqTitleEmphasis', title: 'Title emphasis', type: 'string', fieldset: 'faq'}),
    defineField({name: 'faqSub', title: 'Sub text', type: 'text', rows: 2, fieldset: 'faq'}),
    defineField({
      name: 'faqItems',
      title: 'FAQ items',
      type: 'array',
      of: [{
        type: 'object',
        name: 'serviceFaqItem',
        fields: [
          defineField({name: 'question', type: 'string', title: 'Question', validation: (R) => R.required()}),
          defineField({name: 'answer', type: 'text', title: 'Answer', rows: 3}),
        ],
        preview: {
          select: {question: 'question'},
          prepare({question}) {return {title: question}},
        },
      }],
      fieldset: 'faq',
    }),

    // ── Service page — SEO ───────────────────────────────────────────────────
    defineField({
      name: 'pageSeo',
      title: 'Page SEO',
      type: 'pageSeo',
      fieldset: 'seo',
      description: 'Meta title, description and social image for /services/{page-slug}/',
    }),
  ],
  orderings: [
    {title: 'Sort order', name: 'sortOrderAsc', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow', media: 'image'},
  },
})
