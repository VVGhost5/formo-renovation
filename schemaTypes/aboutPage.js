import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
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

    // ── FOUNDER CARD ────────────────────────────────────────────────────────
    defineField({name: 'founderInitial', title: 'Founder avatar initial', type: 'string'}),
    defineField({name: 'founderName', title: 'Founder name', type: 'string'}),
    defineField({name: 'founderRole', title: 'Founder role', type: 'string'}),
    defineField({name: 'founderQuote', title: 'Founder quote', type: 'text', rows: 3}),
    defineField({
      name: 'founderStats',
      title: 'Founder stats',
      type: 'array',
      of: [{type: 'statItem'}],
    }),

    // ── WHO WE ARE ──────────────────────────────────────────────────────────
    defineField({name: 'whoEyebrow', title: '[Who We Are] Eyebrow', type: 'string'}),
    defineField({name: 'whoHeadline', title: '[Who We Are] Headline', type: 'string'}),
    defineField({name: 'whoHeadlineEmphasis', title: '[Who We Are] Headline emphasis', type: 'string'}),
    defineField({name: 'whoLead', title: '[Who We Are] Lead paragraph', type: 'text', rows: 3}),
    defineField({
      name: 'whoBody',
      title: '[Who We Are] Body paragraphs',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Each item is one paragraph of body text.',
    }),
    defineField({
      name: 'whoPills',
      title: '[Who We Are] Pills / tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'whoCtaLabel', title: '[Who We Are] CTA label', type: 'string'}),
    defineField({name: 'whoCtaLink', title: '[Who We Are] CTA link', type: 'string'}),

    // ── NUMBERS ─────────────────────────────────────────────────────────────
    defineField({
      name: 'aboutStats',
      title: '[Numbers] Stat cells',
      type: 'array',
      of: [{
        type: 'object',
        name: 'aboutStatItem',
        fields: [
          defineField({name: 'value', type: 'string', title: 'Value', validation: R => R.required()}),
          defineField({name: 'suffix', type: 'string', title: 'Suffix (e.g. +, %, mo)'}),
          defineField({name: 'label', type: 'string', title: 'Label', validation: R => R.required()}),
          defineField({name: 'description', type: 'text', title: 'Description', rows: 2}),
        ],
        preview: {
          select: {value: 'value', suffix: 'suffix', label: 'label'},
          prepare({value, suffix, label}) {
            return {title: `${value}${suffix || ''} — ${label}`}
          },
        },
      }],
    }),

    // ── OUR STORY ───────────────────────────────────────────────────────────
    defineField({name: 'storyEyebrow', title: '[Our Story] Eyebrow', type: 'string'}),
    defineField({name: 'storyHeadline', title: '[Our Story] Headline', type: 'string'}),
    defineField({name: 'storyHeadlineEmphasis', title: '[Our Story] Headline emphasis', type: 'string'}),
    defineField({name: 'storyLead', title: '[Our Story] Lead paragraph', type: 'text', rows: 3}),
    defineField({
      name: 'timeline',
      title: '[Our Story] Timeline items',
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
    }),

    // ── OUR VALUES ──────────────────────────────────────────────────────────
    defineField({name: 'valuesEyebrow', title: '[Values] Eyebrow', type: 'string'}),
    defineField({name: 'valuesHeadline', title: '[Values] Headline', type: 'string'}),
    defineField({name: 'valuesHeadlineEmphasis', title: '[Values] Headline emphasis', type: 'string'}),
    defineField({name: 'valuesDescription', title: '[Values] Description', type: 'text', rows: 2}),
    defineField({
      name: 'valuesHeroBackground',
      title: '[Values] Background image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'valueCards',
      title: '[Values] Value cards',
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
    }),

    // ── OUR TEAM ────────────────────────────────────────────────────────────
    defineField({name: 'teamEyebrow', title: '[Team] Eyebrow', type: 'string'}),
    defineField({name: 'teamHeadline', title: '[Team] Headline', type: 'string'}),
    defineField({name: 'teamHeadlineEmphasis', title: '[Team] Headline emphasis', type: 'string'}),
    defineField({name: 'teamDescription', title: '[Team] Description', type: 'text', rows: 2}),
    defineField({
      name: 'teamMembers',
      title: '[Team] Members',
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
    }),

    // ── WHY CHOOSE US ───────────────────────────────────────────────────────
    defineField({name: 'whyEyebrow', title: '[Why Us] Eyebrow', type: 'string'}),
    defineField({name: 'whyBannerHeadline', title: '[Why Us] Banner headline', type: 'string'}),
    defineField({name: 'whyBannerHeadlineEmphasis', title: '[Why Us] Headline emphasis', type: 'string'}),
    defineField({name: 'whyBannerDescription', title: '[Why Us] Banner description', type: 'text', rows: 3}),
    defineField({
      name: 'whyBannerBackground',
      title: '[Why Us] Banner background image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'whyRows',
      title: '[Why Us] Rows',
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
    }),

    // ── CERTIFICATIONS ──────────────────────────────────────────────────────
    defineField({name: 'certEyebrow', title: '[Certifications] Eyebrow', type: 'string'}),
    defineField({name: 'certHeadline', title: '[Certifications] Headline', type: 'string'}),
    defineField({name: 'certHeadlineEmphasis', title: '[Certifications] Headline emphasis', type: 'string'}),
    defineField({name: 'certDescription', title: '[Certifications] Description', type: 'text', rows: 3}),
    defineField({
      name: 'certBadges',
      title: '[Certifications] Badges',
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
    }),
    defineField({
      name: 'guaranteeCards',
      title: '[Certifications] Guarantee cards',
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
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About Page'}
    },
  },
})
