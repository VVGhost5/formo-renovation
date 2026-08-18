import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fieldsets: [
    {name: 'hero', title: 'Hero', options: {collapsible: true, collapsed: false}},
    {name: 'founder', title: 'Hero side card', description: 'Hidden on the live site until Is showed is on. Use this for a company snapshot, not founder bio.', options: {collapsible: true, collapsed: true}},
    {name: 'who', title: 'Who We Are', options: {collapsible: true, collapsed: true}},
    {name: 'story', title: 'Our Story', description: 'Hidden on the live site until Is showed is on.', options: {collapsible: true, collapsed: true}},
    {name: 'values', title: 'Our Values', options: {collapsible: true, collapsed: true}},
    {name: 'team', title: 'Our Team', description: 'Hidden on the live site until Is showed is on.', options: {collapsible: true, collapsed: true}},
    {name: 'why', title: 'Why Choose Us', options: {collapsible: true, collapsed: true}},
    {name: 'cert', title: 'Certifications', options: {collapsible: true, collapsed: true}},
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

    // ── HERO SIDE CARD (formerly founder) ───────────────────────────────────
    isShowedField({
      name: 'founderCardIsShowed',
      initialValue: false,
      fieldset: 'founder',
      description: 'Show the glass card on the right side of the About hero. Hidden until you turn this on.',
    }),
    defineField({
      name: 'founderInitial',
      title: 'Card initial',
      type: 'string',
      description: 'Single letter shown in the avatar circle (e.g. company initial).',
      fieldset: 'founder',
    }),
    defineField({
      name: 'founderName',
      title: 'Card title',
      type: 'string',
      description: 'e.g. company name, a trust line, or a short heading.',
      fieldset: 'founder',
    }),
    defineField({
      name: 'founderRole',
      title: 'Card subtitle',
      type: 'string',
      description: 'e.g. service area, licensed/insured, or a short label.',
      fieldset: 'founder',
    }),
    defineField({
      name: 'founderQuote',
      title: 'Card quote / promise',
      type: 'text',
      rows: 3,
      description: 'A company promise, client quote, or short positioning line — not founder bio.',
      fieldset: 'founder',
    }),
    defineField({
      name: 'founderStats',
      title: 'Card stats',
      type: 'array',
      of: [{type: 'statItem'}],
      fieldset: 'founder',
    }),

    // ── WHO WE ARE ──────────────────────────────────────────────────────────
    isShowedField({name: 'whoIsShowed', fieldset: 'who'}),
    defineField({name: 'whoEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'who'}),
    defineField({name: 'whoHeadline', title: 'Headline', type: 'string', fieldset: 'who'}),
    defineField({name: 'whoHeadlineEmphasis', title: 'Headline emphasis', type: 'string', fieldset: 'who'}),
    defineField({name: 'whoLead', title: 'Lead paragraph', type: 'text', rows: 3, fieldset: 'who'}),
    defineField({
      name: 'whoBody',
      title: 'Body paragraphs',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Each item is one paragraph of body text.',
      fieldset: 'who',
    }),
    defineField({
      name: 'whoPills',
      title: 'Pills / tags',
      type: 'array',
      of: [{type: 'string'}],
      fieldset: 'who',
    }),
    defineField({name: 'whoCtaLabel', title: 'CTA label', type: 'string', fieldset: 'who'}),
    defineField({name: 'whoCtaLink', title: 'CTA link', type: 'string', fieldset: 'who'}),

    // ── OUR STORY ───────────────────────────────────────────────────────────
    isShowedField({name: 'storyIsShowed', initialValue: false, fieldset: 'story'}),
    defineField({name: 'storyEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'story'}),
    defineField({name: 'storyHeadline', title: 'Headline', type: 'string', fieldset: 'story'}),
    defineField({name: 'storyHeadlineEmphasis', title: 'Headline emphasis', type: 'string', fieldset: 'story'}),
    defineField({name: 'storyLead', title: 'Lead paragraph', type: 'text', rows: 3, fieldset: 'story'}),
    defineField({
      name: 'timeline',
      title: 'Timeline items',
      type: 'array',
      of: [{
        type: 'object',
        name: 'timelineItem',
        fields: [
          defineField({name: 'year', type: 'string', title: 'Year', validation: R => R.required()}),
          defineField({name: 'title', type: 'string', title: 'Title', validation: R => R.required()}),
          defineField({name: 'text', type: 'text', title: 'Text', rows: 3}),
          defineField({name: 'highlight', type: 'boolean', title: 'Highlight?', initialValue: false}),
        ],
        preview: {
          select: {year: 'year', title: 'title'},
          prepare({year, title}) {
            return {title: `${year} — ${title}`}
          },
        },
      }],
      fieldset: 'story',
    }),

    // ── OUR VALUES ──────────────────────────────────────────────────────────
    isShowedField({name: 'valuesIsShowed', fieldset: 'values'}),
    defineField({name: 'valuesEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'values'}),
    defineField({name: 'valuesHeadline', title: 'Headline', type: 'string', fieldset: 'values'}),
    defineField({name: 'valuesHeadlineEmphasis', title: 'Headline emphasis', type: 'string', fieldset: 'values'}),
    defineField({name: 'valuesDescription', title: 'Description', type: 'text', rows: 2, fieldset: 'values'}),
    defineField({
      name: 'valuesHeroBackground',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'values',
    }),
    defineField({
      name: 'valueCards',
      title: 'Value cards',
      type: 'array',
      of: [{
        type: 'object',
        name: 'valueCard',
        fields: [
          defineField({name: 'icon', type: 'string', title: 'Icon (FA class)', description: 'e.g. fa-solid fa-magnifying-glass'}),
          defineField({name: 'num', type: 'string', title: 'Number'}),
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
      fieldset: 'values',
    }),

    // ── OUR TEAM ────────────────────────────────────────────────────────────
    isShowedField({name: 'teamIsShowed', initialValue: false, fieldset: 'team'}),
    defineField({name: 'teamEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'team'}),
    defineField({name: 'teamHeadline', title: 'Headline', type: 'string', fieldset: 'team'}),
    defineField({name: 'teamHeadlineEmphasis', title: 'Headline emphasis', type: 'string', fieldset: 'team'}),
    defineField({name: 'teamDescription', title: 'Description', type: 'text', rows: 2, fieldset: 'team'}),
    defineField({
      name: 'teamMembers',
      title: 'Members',
      type: 'array',
      of: [{
        type: 'object',
        name: 'teamMember',
        fields: [
          defineField({name: 'name', type: 'string', title: 'Name', validation: R => R.required()}),
          defineField({name: 'role', type: 'string', title: 'Role'}),
          defineField({name: 'bio', type: 'text', title: 'Bio', rows: 3}),
          defineField({name: 'photo', type: 'image', title: 'Photo', options: {hotspot: true}}),
        ],
        preview: {
          select: {name: 'name', role: 'role', media: 'photo'},
          prepare({name, role, media}) {
            return {title: name, subtitle: role, media}
          },
        },
      }],
      fieldset: 'team',
    }),

    // ── WHY CHOOSE US ───────────────────────────────────────────────────────
    isShowedField({name: 'whyIsShowed', fieldset: 'why'}),
    defineField({name: 'whyEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'why'}),
    defineField({name: 'whyBannerHeadline', title: 'Banner headline', type: 'string', fieldset: 'why'}),
    defineField({name: 'whyBannerHeadlineEmphasis', title: 'Headline emphasis', type: 'string', fieldset: 'why'}),
    defineField({name: 'whyBannerDescription', title: 'Banner description', type: 'text', rows: 3, fieldset: 'why'}),
    defineField({
      name: 'whyBannerBackground',
      title: 'Banner background image',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'why',
    }),
    defineField({
      name: 'whyRows',
      title: 'Rows',
      type: 'array',
      of: [{
        type: 'object',
        name: 'whyRow',
        fields: [
          defineField({name: 'num', type: 'string', title: 'Number'}),
          defineField({name: 'label', type: 'string', title: 'Mono label'}),
          defineField({name: 'title', type: 'string', title: 'Title', validation: R => R.required()}),
          defineField({name: 'body', type: 'text', title: 'Body text', rows: 3}),
          defineField({name: 'pills', type: 'array', title: 'Pills', of: [{type: 'string'}]}),
          defineField({name: 'image', type: 'image', title: 'Image', options: {hotspot: true}}),
          defineField({name: 'imageAlt', type: 'string', title: 'Image alt text'}),
        ],
        preview: {
          select: {num: 'num', title: 'title', media: 'image'},
          prepare({num, title, media}) {
            return {title: `${num} — ${title}`, media}
          },
        },
      }],
      fieldset: 'why',
    }),

    // ── CERTIFICATIONS ──────────────────────────────────────────────────────
    isShowedField({name: 'certIsShowed', fieldset: 'cert'}),
    defineField({name: 'certEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'cert'}),
    defineField({name: 'certHeadline', title: 'Headline', type: 'string', fieldset: 'cert'}),
    defineField({name: 'certHeadlineEmphasis', title: 'Headline emphasis', type: 'string', fieldset: 'cert'}),
    defineField({name: 'certDescription', title: 'Description', type: 'text', rows: 3, fieldset: 'cert'}),
    defineField({
      name: 'certBadges',
      title: 'Badges',
      type: 'array',
      of: [{
        type: 'object',
        name: 'certBadge',
        fields: [
          defineField({name: 'icon', type: 'string', title: 'Icon (FA class)', description: 'e.g. fa-solid fa-building-columns'}),
          defineField({name: 'name', type: 'string', title: 'Name', validation: R => R.required()}),
        ],
        preview: {
          select: {name: 'name'},
          prepare({name}) {
            return {title: name}
          },
        },
      }],
      fieldset: 'cert',
    }),
    defineField({
      name: 'guaranteeCards',
      title: 'Guarantee cards',
      type: 'array',
      of: [{
        type: 'object',
        name: 'guaranteeCard',
        fields: [
          defineField({name: 'icon', type: 'string', title: 'Icon (FA class)'}),
          defineField({name: 'title', type: 'string', title: 'Title', validation: R => R.required()}),
          defineField({name: 'text', type: 'text', title: 'Text', rows: 3}),
        ],
        preview: {
          select: {title: 'title'},
          prepare({title}) {
            return {title}
          },
        },
      }],
      fieldset: 'cert',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About Page'}
    },
  },
})
