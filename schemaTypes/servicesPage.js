import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fieldsets: [
    {name: 'hero', title: 'Hero', options: {collapsible: true, collapsed: false}},
    {name: 'list', title: 'Services list', options: {collapsible: true, collapsed: true}},
    {name: 'process', title: 'Process', options: {collapsible: true, collapsed: true}},
    {name: 'pricing', title: 'Pricing hint', options: {collapsible: true, collapsed: true}},
    {name: 'faq', title: 'FAQ', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    // ── HERO ────────────────────────────────────────────────────────────────
    isShowedField({name: 'heroIsShowed', fieldset: 'hero'}),
    defineField({name: 'locationLabel', title: 'Location label', type: 'string', fieldset: 'hero'}),
    defineField({name: 'titleBefore', title: 'Title — before emphasis', type: 'string', fieldset: 'hero'}),
    defineField({name: 'titleEmphasis', title: 'Title — emphasis', type: 'string', fieldset: 'hero'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3, fieldset: 'hero'}),
    defineField({name: 'primaryCtaLabel', title: 'Primary CTA', type: 'string', fieldset: 'hero'}),
    defineField({name: 'primaryCtaLink', title: 'Primary CTA link', type: 'string', fieldset: 'hero'}),
    defineField({name: 'secondaryCtaLabel', title: 'Secondary CTA', type: 'string', fieldset: 'hero'}),
    defineField({name: 'secondaryCtaLink', title: 'Secondary CTA link', type: 'string', fieldset: 'hero'}),
    defineField({name: 'heroImage', title: 'Hero background', type: 'image', options: {hotspot: true}, fieldset: 'hero'}),

    // ── SERVICES LIST ───────────────────────────────────────────────────────
    isShowedField({
      name: 'listIsShowed',
      fieldset: 'list',
      description: 'Show the services strip and detailed service blocks.',
    }),

    // ── OUR PROCESS ─────────────────────────────────────────────────────────
    isShowedField({name: 'processIsShowed', fieldset: 'process'}),
    defineField({name: 'processEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'process'}),
    defineField({name: 'processHeadline', title: 'Headline', type: 'string', fieldset: 'process'}),
    defineField({name: 'processHeadlineEmphasis', title: 'Headline emphasis', type: 'string', fieldset: 'process'}),
    defineField({name: 'processDescription', title: 'Description', type: 'text', rows: 2, fieldset: 'process'}),
    defineField({
      name: 'processHeroBackground',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
      description: 'Background for the "How We Work" band on the services page',
      fieldset: 'process',
    }),
    defineField({
      name: 'processSteps',
      title: 'Steps',
      type: 'array',
      of: [{
        type: 'object',
        name: 'svcProcessStep',
        fields: [
          defineField({name: 'icon', type: 'string', title: 'Icon (FA class)', description: 'e.g. fa-solid fa-phone'}),
          defineField({name: 'title', type: 'string', title: 'Title', validation: R => R.required()}),
          defineField({name: 'body', type: 'text', title: 'Body text', rows: 3}),
        ],
        preview: {
          select: {title: 'title'},
        },
      }],
      fieldset: 'process',
    }),

    // ── PRICING HINT ────────────────────────────────────────────────────────
    isShowedField({name: 'pricingIsShowed', fieldset: 'pricing'}),
    defineField({name: 'pricingEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'pricing'}),
    defineField({name: 'pricingHeadline', title: 'Headline', type: 'string', fieldset: 'pricing'}),
    defineField({name: 'pricingHeadlineEmphasis', title: 'Headline emphasis', type: 'string', fieldset: 'pricing'}),
    defineField({name: 'pricingBody', title: 'Body paragraph', type: 'text', rows: 4, fieldset: 'pricing'}),
    defineField({
      name: 'pricingCards',
      title: 'Cards',
      type: 'array',
      of: [{
        type: 'object',
        name: 'pricingHintCard',
        fields: [
          defineField({name: 'icon', type: 'string', title: 'Icon (FA class)', description: 'e.g. fa-solid fa-file-invoice'}),
          defineField({name: 'title', type: 'string', title: 'Title', validation: R => R.required()}),
          defineField({name: 'body', type: 'text', title: 'Body text', rows: 2}),
        ],
        preview: {
          select: {title: 'title'},
          prepare({title}) {
            return {title}
          },
        },
      }],
      fieldset: 'pricing',
    }),

    // ── FAQ ─────────────────────────────────────────────────────────────────
    isShowedField({name: 'faqIsShowed', fieldset: 'faq'}),
    defineField({name: 'faqEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'faq'}),
    defineField({name: 'faqTitle', title: 'Title', type: 'string', fieldset: 'faq'}),
    defineField({name: 'faqTitleEmphasis', title: 'Title emphasis', type: 'string', fieldset: 'faq'}),
    defineField({name: 'faqSub', title: 'Sub text', type: 'text', rows: 2, fieldset: 'faq'}),
    defineField({
      name: 'faqItems',
      title: 'Items',
      type: 'array',
      of: [{
        type: 'object',
        name: 'faqItem',
        fields: [
          defineField({name: 'question', type: 'string', title: 'Question', validation: R => R.required()}),
          defineField({name: 'answer', type: 'text', title: 'Answer', rows: 3}),
        ],
        preview: {
          select: {question: 'question'},
          prepare({question}) {
            return {title: question}
          },
        },
      }],
      fieldset: 'faq',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Services Page'}
    },
  },
})
