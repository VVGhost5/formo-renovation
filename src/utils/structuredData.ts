/** Shared Schema.org helpers for Formo Renovations */

export const SITE_URL = 'https://formorenovations.com'
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const BRAND_NAME = 'Formo Renovations'

export type OrganizationJsonLd = {
	'@type': 'GeneralContractor'
	'@id': string
	name: string
	url: string
	logo: Record<string, unknown>
	image: string
	description: string
	telephone: string
	email: string
	address: Record<string, unknown>
	geo: Record<string, unknown>
	areaServed: Record<string, unknown>[]
	openingHoursSpecification: Record<string, unknown>[]
	priceRange: string
	foundingDate: string
	contactPoint: Record<string, unknown>
	sameAs?: string[]
	aggregateRating?: Record<string, unknown>
}

/** Canonical GeneralContractor entity — defined fully on the homepage, referenced by @id elsewhere. */
export function buildOrganizationJsonLd(opts?: {
	description?: string
	telephone?: string
	email?: string
	sameAs?: string[]
	reviewCount?: number
	ratingValue?: number
}): OrganizationJsonLd {
	const telephone = (opts?.telephone ?? '+16729958850').replace(/\s+/g, '')
	const email = opts?.email ?? 'info@formorenovations.com'
	const description =
		opts?.description ??
		'Premium renovation and interior finishing solutions for homes across Victoria and Vancouver Island, BC, Canada. European standards. Transparent process.'

	return {
		'@type': 'GeneralContractor',
		'@id': ORG_ID,
		name: BRAND_NAME,
		url: `${SITE_URL}/`,
		logo: {
			'@type': 'ImageObject',
			'@id': `${SITE_URL}/#logo`,
			url: `${SITE_URL}/logo.png`,
			contentUrl: `${SITE_URL}/logo.png`,
			caption: BRAND_NAME,
		},
		image: `${SITE_URL}/logo.png`,
		description,
		telephone,
		email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: '350 Douglas St',
			addressLocality: 'Victoria',
			addressRegion: 'BC',
			postalCode: 'V8V 2P5',
			addressCountry: 'CA',
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 48.4149,
			longitude: -123.3668,
		},
		areaServed: [
			{
				'@type': 'City',
				name: 'Victoria',
				sameAs: 'https://en.wikipedia.org/wiki/Victoria,_British_Columbia',
			},
			{
				'@type': 'AdministrativeArea',
				name: 'Vancouver Island',
			},
		],
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '08:00',
				closes: '17:00',
			},
		],
		priceRange: '$$',
		foundingDate: '2016',
		contactPoint: {
			'@type': 'ContactPoint',
			telephone,
			email,
			contactType: 'customer service',
			areaServed: 'CA',
			availableLanguage: 'en',
			hoursAvailable: {
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '08:00',
				closes: '17:00',
			},
		},
		...(opts?.sameAs?.length ? {sameAs: opts.sameAs} : {}),
		...(opts?.reviewCount && opts.reviewCount > 0
			? {
					aggregateRating: {
						'@type': 'AggregateRating',
						ratingValue: String(opts.ratingValue ?? 5.0),
						reviewCount: String(opts.reviewCount),
						bestRating: '5',
						worstRating: '1',
					},
				}
			: {}),
	}
}

/** Compact provider reference used on service (and other) pages. */
export function organizationRef() {
	return {
		'@type': 'GeneralContractor' as const,
		name: BRAND_NAME,
		'@id': ORG_ID,
	}
}

export function buildServiceJsonLd(opts: {
	serviceType: string
	pageSlug: string
	description?: string
	name?: string
}) {
	const url = `${SITE_URL}/services/${opts.pageSlug}/`
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: opts.name ?? opts.serviceType,
		serviceType: opts.serviceType,
		...(opts.description ? {description: opts.description} : {}),
		provider: organizationRef(),
		areaServed: {
			'@type': 'City',
			name: 'Victoria',
			containedInPlace: {
				'@type': 'AdministrativeArea',
				name: 'British Columbia',
			},
		},
		url,
	}
}

export function serviceJsonLdString(opts: {
	serviceType: string
	pageSlug: string
	description?: string
	name?: string
}) {
	return JSON.stringify(buildServiceJsonLd(opts), null, 2)
}

// ── Page-level builders ──────────────────────────────────────────────────────

function breadcrumb(items: Array<{ name: string; item?: string }>) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
			...items.map((it, i) => ({
				'@type': 'ListItem',
				position: i + 2,
				name: it.name,
				...(it.item ? { item: it.item } : {}),
			})),
		],
	}
}

/** AboutPage — used on /about-us/ */
export function buildAboutPageJsonLd(opts?: { description?: string }): object {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': WEBSITE_ID,
				url: `${SITE_URL}/`,
				name: BRAND_NAME,
			},
			{
				'@type': 'AboutPage',
				'@id': `${SITE_URL}/about-us/#webpage`,
				name: 'About Formo Renovations — Our Story, Team & Values',
				description:
					opts?.description ??
					'Learn the story behind Formo Renovations — our team, values, and commitment to quality craftsmanship across Victoria and Vancouver Island, BC since 2016.',
				url: `${SITE_URL}/about-us/`,
				isPartOf: { '@id': WEBSITE_ID },
				about: { '@id': ORG_ID },
				breadcrumb: breadcrumb([{ name: 'About Us', item: `${SITE_URL}/about-us/` }]),
			},
		],
	}
}

/** CollectionPage + ItemList — used on /services/ */
export function buildServicesCollectionJsonLd(
	services: Array<{ pageSlug: string; quickName: string; lead?: string | null }>,
): object {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'CollectionPage',
				'@id': `${SITE_URL}/services/#webpage`,
				name: 'Our Services — Formo Renovations',
				description:
					'Full-range renovation and interior finishing services for Victoria and Vancouver Island — bathrooms, kitchens, flooring, full home renovations, and more.',
				url: `${SITE_URL}/services/`,
				isPartOf: { '@id': WEBSITE_ID },
				breadcrumb: breadcrumb([{ name: 'Services', item: `${SITE_URL}/services/` }]),
			},
			{
				'@type': 'ItemList',
				'@id': `${SITE_URL}/services/#service-list`,
				name: 'Renovation Services by Formo Renovations',
				itemListElement: services.map((svc, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					name: svc.quickName,
					url: `${SITE_URL}/services/${svc.pageSlug}/`,
					...(svc.lead ? { description: svc.lead } : {}),
				})),
			},
		],
	}
}

export type PortfolioProjectLd = {
	id?: string
	name?: string | null
	description?: string | null
	location?: string | null
	/** Primary display image — used as CreativeWork.image */
	imageUrl?: string | null
	imageAlt?: string | null
	/** Before photo URL — used for ImageObject pair */
	beforeUrl?: string | null
	/** After photo URL — used for ImageObject pair */
	afterUrl?: string | null
}

/** CollectionPage + ItemList of CreativeWork — used on /portfolio/ */
export function buildPortfolioJsonLd(projects: PortfolioProjectLd[]): object {
	const workItems = projects.map((p, i) => {
		const displayName = p.name ?? p.location ?? `Project ${i + 1}`
		const item: Record<string, unknown> = {
			'@type': 'CreativeWork',
			name: displayName,
			provider: { '@id': ORG_ID, '@type': 'GeneralContractor', name: BRAND_NAME },
			...(p.description ? { description: p.description.slice(0, 300) } : {}),
			...(p.location ? { locationCreated: { '@type': 'Place', name: p.location } } : {}),
		}
		if (p.imageUrl) {
			item.image = {
				'@type': 'ImageObject',
				contentUrl: p.imageUrl,
				caption: `${displayName} — renovation by ${BRAND_NAME}`,
				creditText: BRAND_NAME,
				creator: { '@id': ORG_ID },
				...(p.imageAlt ? { name: p.imageAlt } : {}),
			}
		}
		return { '@type': 'ListItem', position: i + 1, item }
	})

	const baImageObjects = projects.flatMap((p) => {
		if (!p.beforeUrl || !p.afterUrl) return []
		const label = p.name ?? p.location ?? 'Renovation project'
		return [
			{
				'@type': 'ImageObject',
				contentUrl: p.beforeUrl,
				caption: `${label} — before renovation`,
				creditText: BRAND_NAME,
				creator: { '@id': ORG_ID },
			},
			{
				'@type': 'ImageObject',
				contentUrl: p.afterUrl,
				caption: `${label} — after renovation`,
				creditText: BRAND_NAME,
				creator: { '@id': ORG_ID },
			},
		]
	})

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'CollectionPage',
				'@id': `${SITE_URL}/portfolio/#webpage`,
				name: 'Renovation Portfolio — Formo Projects in Victoria, BC',
				description:
					'Browse completed renovation projects across Victoria and Vancouver Island, BC — kitchens, bathrooms, living rooms, and full home transformations by Formo Renovations.',
				url: `${SITE_URL}/portfolio/`,
				isPartOf: { '@id': WEBSITE_ID },
				author: { '@id': ORG_ID },
				breadcrumb: breadcrumb([{ name: 'Portfolio', item: `${SITE_URL}/portfolio/` }]),
			},
			{
				'@type': 'ItemList',
				'@id': `${SITE_URL}/portfolio/#project-list`,
				name: 'Completed Renovation Projects — Formo Renovations',
				numberOfItems: projects.length,
				itemListElement: workItems,
			},
			...baImageObjects,
		],
	}
}

/** WebPage + AggregateRating on org — used on /reviews/ */
export function buildReviewsPageJsonLd(opts: { reviewCount: number }): object {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}/reviews/#webpage`,
				name: 'Client Reviews — Formo Renovations',
				description:
					'Read genuine client reviews from homeowners across Victoria and Vancouver Island, BC. Share your own experience with Formo Renovations.',
				url: `${SITE_URL}/reviews/`,
				isPartOf: { '@id': WEBSITE_ID },
				breadcrumb: breadcrumb([{ name: 'Reviews', item: `${SITE_URL}/reviews/` }]),
			},
			{
				'@type': 'GeneralContractor',
				'@id': ORG_ID,
				name: BRAND_NAME,
				aggregateRating: {
					'@type': 'AggregateRating',
					ratingValue: '5.0',
					reviewCount: String(opts.reviewCount > 0 ? opts.reviewCount : 8),
					bestRating: '5',
					worstRating: '1',
				},
			},
		],
	}
}

/** ContactPage — used on /contacts/ */
export function buildContactPageJsonLd(opts?: { telephone?: string; email?: string }): object {
	const telephone = (opts?.telephone ?? '+16729958850').replace(/\s+/g, '')
	const email = opts?.email ?? 'info@formorenovations.com'
	return {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		'@id': `${SITE_URL}/contacts/#webpage`,
		name: 'Contact Us — Formo Renovations',
		description:
			'Get in touch with Formo Renovations. Free on-site consultations across Victoria and Vancouver Island, BC. Call, email, or fill in the form.',
		url: `${SITE_URL}/contacts/`,
		isPartOf: { '@id': WEBSITE_ID },
		mainEntity: {
			'@type': 'GeneralContractor',
			'@id': ORG_ID,
			name: BRAND_NAME,
			telephone,
			email,
			address: {
				'@type': 'PostalAddress',
				streetAddress: '350 Douglas St',
				addressLocality: 'Victoria',
				addressRegion: 'BC',
				postalCode: 'V8V 2P5',
				addressCountry: 'CA',
			},
		},
		breadcrumb: breadcrumb([{ name: 'Contact', item: `${SITE_URL}/contacts/` }]),
	}
}

/** WebPage — used on /privacy/ */
export function buildPrivacyPageJsonLd(): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${SITE_URL}/privacy/#webpage`,
		name: 'Privacy Policy — Formo Renovations',
		description:
			'How Formo Renovations collects, uses, and protects personal information from homeowners across Victoria and Vancouver Island, BC.',
		url: `${SITE_URL}/privacy/`,
		isPartOf: { '@id': WEBSITE_ID },
		dateModified: '2026-08-19',
		breadcrumb: breadcrumb([{ name: 'Privacy Policy', item: `${SITE_URL}/privacy/` }]),
	}
}
