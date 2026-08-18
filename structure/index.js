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
                .child(S.documentTypeList('testimonial').title('Testimonials')),
              S.listItem()
                .title('Before & After — Projects')
                .child(
                  S.documentTypeList('beforeAfterProject').title('Slider projects'),
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
              singleton(S, 'servicesPage', 'Page Content', 'servicesPage'),
              S.listItem()
                .title('Service Details')
                .child(S.documentTypeList('service').title('Service sections')),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Portfolio')
        .child(
          S.list()
            .title('Portfolio')
            .items([
              singleton(S, 'portfolioPage', 'Page Content', 'portfolioPage'),
              S.listItem()
                .title('Projects')
                .child(S.documentTypeList('portfolioProject').title('Portfolio Projects')),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('About')
        .child(
          S.list()
            .title('About')
            .items([
              singleton(S, 'aboutPage', 'Page Content', 'aboutPage'),
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
