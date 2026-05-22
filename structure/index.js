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
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              singleton(S, 'servicesPage', 'Services — Page', 'servicesPage'),
              S.listItem()
                .title('Services — Details')
                .child(S.documentTypeList('service').title('Service sections')),
              singleton(S, 'portfolioPage', 'Portfolio — Hero', 'portfolioPage'),
              S.listItem()
                .title('Portfolio — Projects')
                .child(
                  S.documentTypeList('portfolioProject').title('Portfolio Projects'),
                ),
              singleton(S, 'aboutPage', 'About — Page', 'aboutPage'),
              singleton(S, 'contactsPage', 'Contacts — Hero & Form', 'contactsPage'),
            ]),
        ),
    ])
