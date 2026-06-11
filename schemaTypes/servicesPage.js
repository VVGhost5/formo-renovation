import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    // ── HERO ────────────────────────────────────────────────────────────────
    defineField({name: 'locationLabel', title: 'Location label', type: 'string'}),
    defineField({name: 'titleBefore', title: 'Title — before emphasis', type: 'string'}),
    defineField({name: 'titleEmphasis', title: 'Title — emphasis', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({name: 'primaryCtaLabel', title: 'Primary CTA', type: 'string'}),
    defineField({name: 'primaryCtaLink', title: 'Primary CTA link', type: 'string'}),
    defineField({name: 'secondaryCtaLabel', title: 'Secondary CTA', type: 'string'}),
    defineField({name: 'secondaryCtaLink', title: 'Secondary CTA link', type: 'string'}),
    defineField({name: 'heroImage', title: 'Hero background', type: 'image', options: {hotspot: true}}),

    // ── OUR PROCESS ─────────────────────────────────────────────────────────
    defineField({name: 'processEyebrow', title: '[Process] Eyebrow', type: 'string'}),
    defineField({name: 'processHeadline', title: '[Process] Headline', type: 'string'}),
    defineField({name: 'processHeadlineEmphasis', title: '[Process] Headline emphasis', type: 'string'}),
    defineField({name: 'processDescription', title: '[Process] Description', type: 'text', rows: 2}),
    defineField({
      name: 'processHeroBackground',
      title: '[Process] Background image',
      type: 'image',
      options: {hotspot: true},
      description: 'Background for the "How We Work" band on the services page',
    }),
    defineField({
      name: 'processSteps',
      title: '[Process] Steps',
      type: 'array',
      of: [{
        type: 'object',
        name: 'svcProcessStep',
        fields: [
          defineField({name: 'num', type: 'string', title: 'Number'}),
          defineField({name: 'icon', type: 'string', title: 'Icon (FA class)', description: 'e.g. fa-solid fa-phone'}),
          defineField({name: 'title', type: 'string', title: 'Title', validation: R => R.required()}),
          defineField({name: 'body', type: 'text', title: 'Body text', rows: 3}),
        ],
        preview: {
          select: {num: 'num', title: 'title'},
          prepare({num, title}) {
            return {title: `${num} — ${title}`}
          },
        },
      }],
    }),

    // ── PRICING HINT ────────────────────────────────────────────────────────
    defineField({name: 'pricingEyebrow', title: '[Pricing Hint] Eyebrow', type: 'string'}),
    defineField({name: 'pricingHeadline', title: '[Pricing Hint] Headline', type: 'string'}),
    defineField({name: 'pricingHeadlineEmphasis', title: '[Pricing Hint] Headline emphasis', type: 'string'}),
    defineField({name: 'pricingBody', title: '[Pricing Hint] Body paragraph', type: 'text', rows: 4}),
    defineField({
      name: 'pricingCards',
      title: '[Pricing Hint] Cards',
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
    }),

    // ── FAQ ─────────────────────────────────────────────────────────────────
    defineField({name: 'faqEyebrow', title: '[FAQ] Eyebrow', type: 'string'}),
    defineField({name: 'faqTitle', title: '[FAQ] Title', type: 'string'}),
    defineField({name: 'faqTitleEmphasis', title: '[FAQ] Title emphasis', type: 'string'}),
    defineField({name: 'faqSub', title: '[FAQ] Sub text', type: 'text', rows: 2}),
    defineField({
      name: 'faqItems',
      title: '[FAQ] Items',
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
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Services Page'}
    },
  },
})
