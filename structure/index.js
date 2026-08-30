const singleton = (S, type, title, documentId) =>
  S.listItem()
    .title(title)
    .id(documentId)
    .child(S.document().schemaType(type).documentId(documentId))

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'siteSettings', 'Site Settings', 'siteSettings'),
      singleton(S, 'metaData', 'Metadata & SEO', 'metaData'),

      S.divider(),

      S.listItem()
        .title('Homepage')
        .child(
          S.list()
            .title('Homepage')
            .items([
              singleton(S, 'hero', 'Hero', 'hero'),
              singleton(S, 'homeNumbers', 'Numbers', 'homeNumbers'),
              singleton(S, 'homeServices', 'Services', 'homeServices'),
              singleton(S, 'homeAbout', 'About', 'homeAbout'),
              singleton(S, 'homePortfolio', 'Portfolio', 'homePortfolio'),
              singleton(S, 'homeProcess', 'Process', 'homeProcess'),
              singleton(S, 'homePricing', 'Pricing', 'homePricing'),
              singleton(S, 'homeContact', 'Contact', 'homeContact'),
              singleton(S, 'homeBeforeAfter', 'Before & After', 'homeBeforeAfter'),
              S.divider(),
              S.listItem()
                .title('Testimonials')
                .child(
                  S.documentTypeList('testimonial')
                    .title('Testimonials')
                    .defaultOrdering([{field: 'sortOrder', direction: 'asc'}]),
                ),
              S.listItem()
                .title('Before & After — Projects')
                .child(
                  S.documentTypeList('beforeAfterProject')
                    .title('Slider projects')
                    .defaultOrdering([{field: 'sortOrder', direction: 'asc'}]),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Reviews')
        .child(
          S.list()
            .title('Reviews')
            .items([
              singleton(S, 'reviewsPage', 'Page — Hero', 'reviewsPage'),
              S.listItem()
                .title('Client Reviews')
                .child(S.documentTypeList('review').title('Client Reviews')),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Services')
        .child(
          S.list()
            .title('Services')
            .items([
              singleton(S, 'servicesHero', 'Hero', 'servicesHero'),
              singleton(S, 'servicePageHero', 'Service Pages — Hero', 'servicePageHero'),
              S.listItem()
                .title('Services List')
                .child(
                  S.documentTypeList('service')
                    .title('Service Items')
                    .defaultOrdering([{field: 'sortOrder', direction: 'asc'}]),
                ),
              singleton(S, 'servicesProcess', 'Process', 'servicesProcess'),
              singleton(S, 'servicesPricing', 'Pricing Hint', 'servicesPricing'),
              singleton(S, 'servicesFaq', 'FAQ', 'servicesFaq'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Portfolio')
        .child(
          S.list()
            .title('Portfolio')
            .items([
              singleton(S, 'portfolioPage', 'Page — Hero', 'portfolioPage'),
              S.listItem()
                .title('Projects')
                .child(
                  S.documentTypeList('portfolioProject')
                    .title('Portfolio Projects')
                    .defaultOrdering([{field: 'sortOrder', direction: 'asc'}]),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('About')
        .child(
          S.list()
            .title('About')
            .items([
              singleton(S, 'aboutHero', 'Hero', 'aboutHero'),
              singleton(S, 'aboutFounder', 'Hero Side Card', 'aboutFounder'),
              singleton(S, 'aboutWho', 'Who We Are', 'aboutWho'),
              singleton(S, 'aboutStory', 'Our Story', 'aboutStory'),
              singleton(S, 'aboutValues', 'Our Values', 'aboutValues'),
              singleton(S, 'aboutTeam', 'Our Team', 'aboutTeam'),
              singleton(S, 'aboutWhy', 'Why Choose Us', 'aboutWhy'),
              singleton(S, 'aboutCert', 'Certifications', 'aboutCert'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Contacts')
        .child(
          S.list()
            .title('Contacts')
            .items([
              singleton(S, 'contactsPage', 'Page Content', 'contactsPage'),
            ]),
        ),
    ])
