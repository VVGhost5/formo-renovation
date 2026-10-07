import {defineField, defineType} from 'sanity'

const card = (title, description, imageKey) => ({_type: 'doorsCard', title, description, imageKey})

const residentialCards = [
  card('Front Entry Door', 'Make a welcoming first impression with a front entrance that suits your home.', 'front-entry'),
  card('Patio Door', 'Connect your living space and garden with sliding, French or bi-fold door options.', 'patio-door'),
  card('Sliding Closet Door', 'Make everyday storage easier with doors chosen to fit your room and opening.', 'closet-door'),
  card('Interior Door', 'Bring a consistent look to bedrooms, hallways and the spaces in between.', 'interior-door'),
  card('Door Glass Insert', 'Refresh the look of an existing entrance with a decorative or privacy glass insert.', 'glass-insert'),
  card('Garage Door', 'Explore replacement and new installation options for your garage entrance.', 'garage-door'),
]

const commercialCards = [
  card('Commercial Door', 'Door installation and replacement for offices, shops and other commercial spaces.', 'commercial-door'),
  card('Commercial Glass Entry Door', 'Create a bright, welcoming entrance with commercial glass and aluminum doors.', 'storefront-door'),
  card('Commercial Fire-Rated Door', 'Discuss the specified fire rating, hardware and requirements for your project.', 'fire-rated-door'),
  card('Industrial Door', 'Explore door options suited to your building, access needs and day-to-day use.', 'industrial-door'),
]

const repairCards = [
  card('Entry Door Repair', 'Help with sticking doors, worn hinges, handles and everyday opening problems.', 'front-entry'),
  card('Exterior Door Repair', 'Discuss drafts, weather seals, alignment and damage around your outside entrance.', 'glass-insert'),
  card('Interior Door Repair', 'Get bedroom, hallway and other interior doors moving and closing smoothly again.', 'interior-door'),
  card('Patio Door Repair', 'Ask about difficult sliding, damaged tracks, rollers, locks and weather sealing.', 'patio-door'),
  card('Commercial Door Repair', 'Help with closers, hinges, hardware and daily access to your business.', 'commercial-door'),
  card('Storefront Door Repair', 'Discuss alignment, handles and closing problems with your glass storefront entrance.', 'storefront-door'),
  card('Residential Garage Door Repair', 'Tell us about noise, movement, hardware or opening issues with your garage door.', 'garage-door'),
  card('Commercial Garage Door Repair', 'Explore repair options for overhead doors serving a workshop or commercial property.', 'industrial-door'),
]

const step = (title, description) => ({_type: 'processStep', title, description})

export default defineType({
  name: 'doorsPage',
  title: 'Doors Page',
  type: 'document',
  fieldsets: [
    {name: 'hero', title: 'Hero', options: {collapsible: true}},
    {name: 'strip', title: 'Service strip', options: {collapsible: true, collapsed: true}},
    {name: 'intro', title: 'Intro', options: {collapsible: true, collapsed: true}},
    {name: 'estimate', title: 'Estimate panel', options: {collapsible: true, collapsed: true}},
    {name: 'residential', title: 'Residential', options: {collapsible: true, collapsed: true}},
    {name: 'commercial', title: 'Commercial', options: {collapsible: true, collapsed: true}},
    {name: 'repairs', title: 'Repairs', options: {collapsible: true, collapsed: true}},
    {name: 'process', title: 'Process', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'pageSeo',
      title: 'Page SEO',
      type: 'pageSeo',
      description: 'Meta title and description for /services/doors/',
    }),

    defineField({name: 'heroEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'hero', initialValue: 'Door installation & repair · Victoria, BC'}),
    defineField({name: 'heroTitleBefore', title: 'Title — first line', type: 'string', fieldset: 'hero', initialValue: 'A better door.'}),
    defineField({name: 'heroTitleEmphasis', title: 'Title — emphasis line', type: 'string', fieldset: 'hero', initialValue: 'A better welcome.'}),
    defineField({name: 'heroSubtitle', title: 'Subtitle', type: 'string', fieldset: 'hero', initialValue: 'Thoughtfully chosen. Carefully installed.'}),
    defineField({name: 'heroPrimaryCtaLabel', title: 'Primary button', type: 'string', fieldset: 'hero', initialValue: 'Get a free estimate'}),
    defineField({name: 'heroSecondaryCtaLabel', title: 'Secondary link', type: 'string', fieldset: 'hero', initialValue: 'Explore doors'}),
    defineField({name: 'heroImageAlt', title: 'Hero image alt', type: 'string', fieldset: 'hero', initialValue: 'Architectural concept: a modern West Coast home with cedar siding and a charcoal entry door'}),
    defineField({name: 'heroCaption', title: 'Hero caption', type: 'string', fieldset: 'hero', initialValue: 'Made for the way you live.'}),

    defineField({
      name: 'stripItems',
      title: 'Strip labels',
      type: 'array',
      of: [{type: 'string'}],
      fieldset: 'strip',
      initialValue: ['New doors', 'Replacements', 'Repairs'],
    }),
    defineField({name: 'stripLocation', title: 'Strip location', type: 'string', fieldset: 'strip', initialValue: 'Homes & businesses in Victoria, BC'}),

    defineField({name: 'introEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'intro', initialValue: 'Meet Formo'}),
    defineField({name: 'introTitleBefore', title: 'Title — first line', type: 'string', fieldset: 'intro', initialValue: 'Good design.'}),
    defineField({name: 'introTitleEmphasis', title: 'Title — emphasis', type: 'string', fieldset: 'intro', initialValue: 'Down to the details.'}),
    defineField({
      name: 'introBody',
      title: 'Body',
      type: 'text',
      rows: 4,
      fieldset: 'intro',
      initialValue: 'Formo Renovations is a Victoria-based renovation and finishing company, bringing experience from Europe and Canada to homes across Vancouver Island. Our door services bring that same attention to the details you see and use every day.',
    }),
    defineField({name: 'introLinkLabel', title: 'Link label', type: 'string', fieldset: 'intro', initialValue: 'About Formo Renovations'}),
    defineField({name: 'introLinkHref', title: 'Link', type: 'string', fieldset: 'intro', initialValue: '/about-us/'}),
    defineField({name: 'availabilityLabel', title: 'Availability label', type: 'string', fieldset: 'intro', initialValue: 'Here when you need us.'}),

    defineField({name: 'estimateEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'estimate', initialValue: 'Your project starts here'}),
    defineField({name: 'estimateTitle', title: 'Title', type: 'string', fieldset: 'estimate', initialValue: 'Let’s talk doors.'}),
    defineField({name: 'estimateLead', title: 'Lead', type: 'string', fieldset: 'estimate', initialValue: 'A few details. A clear next step.'}),
    defineField({name: 'estimateSubmitLabel', title: 'Submit button', type: 'string', fieldset: 'estimate', initialValue: 'Request a free estimate'}),
    defineField({
      name: 'estimatePrivacy',
      title: 'Privacy note',
      type: 'string',
      fieldset: 'estimate',
      initialValue: 'By submitting, you agree to be contacted about your request.',
    }),

    defineField({name: 'residentialEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'residential', initialValue: 'For your home'}),
    defineField({name: 'residentialTitleBefore', title: 'Title — first line', type: 'string', fieldset: 'residential', initialValue: 'Make yourself'}),
    defineField({name: 'residentialTitleEmphasis', title: 'Title — emphasis', type: 'string', fieldset: 'residential', initialValue: 'at home.'}),
    defineField({name: 'residentialLead', title: 'Lead', type: 'text', rows: 2, fieldset: 'residential', initialValue: 'New installations and replacements.\nFrom the front step to the back garden.'}),
    defineField({name: 'catalogResidentialLabel', title: 'Catalog nav — residential', type: 'string', fieldset: 'residential', initialValue: 'Residential'}),
    defineField({name: 'catalogCommercialLabel', title: 'Catalog nav — commercial', type: 'string', fieldset: 'residential', initialValue: 'Commercial & industrial'}),
    defineField({name: 'catalogRepairsLabel', title: 'Catalog nav — repairs', type: 'string', fieldset: 'residential', initialValue: 'Door repairs'}),
    defineField({name: 'residentialWideAlt', title: 'Wide photo alt', type: 'string', fieldset: 'residential', initialValue: 'Sliding glass patio doors connecting a living room to a leafy garden'}),
    defineField({name: 'residentialWideCaption', title: 'Wide photo caption', type: 'string', fieldset: 'residential', initialValue: 'Open up\nthe possibilities.'}),
    defineField({
      name: 'residentialCards',
      title: 'Residential cards',
      type: 'array',
      of: [{type: 'doorsCard'}],
      fieldset: 'residential',
      initialValue: residentialCards,
    }),

    defineField({name: 'commercialEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'commercial', initialValue: 'For your business'}),
    defineField({name: 'commercialTitleBefore', title: 'Title — first line', type: 'string', fieldset: 'commercial', initialValue: 'A better entrance.'}),
    defineField({name: 'commercialTitleEmphasis', title: 'Title — emphasis', type: 'string', fieldset: 'commercial', initialValue: 'For every business.'}),
    defineField({
      name: 'commercialLead',
      title: 'Lead',
      type: 'text',
      rows: 3,
      fieldset: 'commercial',
      initialValue: 'Entrances that welcome customers. Doors that work with your space. Explore installation options for commercial and industrial properties in Victoria.',
    }),
    defineField({name: 'commercialCtaLabel', title: 'Button label', type: 'string', fieldset: 'commercial', initialValue: 'Discuss your project'}),
    defineField({name: 'commercialCtaService', title: 'Button preselects service', type: 'string', fieldset: 'commercial', initialValue: 'Commercial Door'}),
    defineField({name: 'commercialImageAlt', title: 'Image alt', type: 'string', fieldset: 'commercial', initialValue: 'Contemporary commercial glass entry doors in dark aluminum frames'}),
    defineField({
      name: 'commercialCards',
      title: 'Commercial cards',
      type: 'array',
      of: [{type: 'doorsCard'}],
      fieldset: 'commercial',
      initialValue: commercialCards,
    }),

    defineField({name: 'repairsEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'repairs', initialValue: 'Door repairs'}),
    defineField({name: 'repairsTitleBefore', title: 'Title — first line', type: 'string', fieldset: 'repairs', initialValue: 'Not quite right?'}),
    defineField({name: 'repairsTitleEmphasis', title: 'Title — emphasis', type: 'string', fieldset: 'repairs', initialValue: 'Let’s fix that.'}),
    defineField({name: 'repairsLead', title: 'Lead', type: 'text', rows: 2, fieldset: 'repairs', initialValue: 'Sticking, scraping, damaged or difficult to close?\nChoose your door type to start a repair enquiry.'}),
    defineField({
      name: 'repairCards',
      title: 'Repair cards',
      type: 'array',
      of: [{type: 'doorsCard'}],
      fieldset: 'repairs',
      initialValue: repairCards,
    }),
    defineField({name: 'emergencyEyebrow', title: 'Emergency eyebrow', type: 'string', fieldset: 'repairs', initialValue: 'Need a hand?'}),
    defineField({name: 'emergencyTitle', title: 'Emergency title', type: 'string', fieldset: 'repairs', initialValue: 'Ask about emergency garage door repair.'}),
    defineField({name: 'emergencyLead', title: 'Emergency lead', type: 'string', fieldset: 'repairs', initialValue: 'Tell us what happened and confirm the next available appointment.'}),
    defineField({name: 'emergencyCtaLabel', title: 'Emergency button', type: 'string', fieldset: 'repairs', initialValue: 'Request assistance'}),
    defineField({name: 'emergencyService', title: 'Emergency service name', type: 'string', fieldset: 'repairs', initialValue: 'Emergency Garage Door Repair'}),

    defineField({name: 'processEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'process', initialValue: 'The Formo approach'}),
    defineField({name: 'processTitleBefore', title: 'Title — first line', type: 'string', fieldset: 'process', initialValue: 'A clear process.'}),
    defineField({name: 'processTitleEmphasis', title: 'Title — emphasis', type: 'string', fieldset: 'process', initialValue: 'A considered finish.'}),
    defineField({name: 'processLead', title: 'Lead', type: 'text', rows: 2, fieldset: 'process', initialValue: 'Renovation experience.\nAttention to every door.'}),
    defineField({
      name: 'processSteps',
      title: 'Steps',
      type: 'array',
      of: [{type: 'processStep'}],
      fieldset: 'process',
      initialValue: [
        step('Consultation & assessment', 'Talk through your project, then assess the opening, measurements and scope on site.'),
        step('A clear, written estimate', 'Review materials, labour and timing before agreeing on the work and signing a contract.'),
        step('Installation & quality checks', 'Coordinate the work, check the details and finish with a walkthrough of the completed project.'),
      ],
    }),
    defineField({
      name: 'proofStats',
      title: 'Proof stats',
      type: 'array',
      of: [{
        type: 'object',
        name: 'doorsProofStat',
        fields: [
          defineField({name: 'value', title: 'Value', type: 'string'}),
          defineField({name: 'label', title: 'Label', type: 'string'}),
        ],
        preview: {select: {title: 'value', subtitle: 'label'}},
      }],
      fieldset: 'process',
      initialValue: [
        {_type: 'doorsProofStat', value: '10+', label: 'Years of renovation experience'},
        {_type: 'doorsProofStat', value: '150+', label: 'Renovation projects completed'},
        {_type: 'doorsProofStat', value: 'Victoria &\nVancouver Island', label: 'Our home. Our service area.'},
      ],
    }),
    defineField({name: 'proofLinkLabel', title: 'Proof link label', type: 'string', fieldset: 'process', initialValue: 'Meet our renovation clients'}),
    defineField({name: 'proofLinkHref', title: 'Proof link', type: 'string', fieldset: 'process', initialValue: '/reviews/'}),
  ],
  preview: {
    prepare() {
      return {title: 'Doors Page'}
    },
  },
})
