/// <reference types="@sanity/astro/module" />
import {sanityClient} from 'sanity:client'
import {defineQuery} from 'groq'
import {urlForImage} from './image'
import {categoryLabel, normalizeCategories, projectMatchesCategory, isPortfolioCategory} from './categories'
import {servicePageSlug, DEFAULT_SERVICE_PORTFOLIO_CATEGORIES} from './serviceSlug'
import {
	DEFAULT_ABOUT_PAGE,
	DEFAULT_CONTACTS_PAGE,
	DEFAULT_REVIEWS_PAGE,
	DEFAULT_HERO,
	DEFAULT_HOME_ABOUT,
	DEFAULT_HOME_BEFORE_AFTER_BANNER,
	DEFAULT_HOME_CONTACT,
	DEFAULT_HOME_NUMBERS,
	DEFAULT_HOME_PORTFOLIO,
	DEFAULT_HOME_PRICING,
	DEFAULT_HOME_PROCESS,
	DEFAULT_HOME_SERVICES,
	DEFAULT_PORTFOLIO_PAGE,
	DEFAULT_SERVICES,
	DEFAULT_SERVICES_PAGE,
	DEFAULT_SERVICE_PAGE_HERO,
	DEFAULT_SITE_SETTINGS,
	DEFAULT_PAGE_SEO,
} from './defaults'
import type {
	AboutPageContent,
	AboutRow,
	BeforeAfterSlide,
	CertBadge,
	ContactsPageContent,
	FaqItem,
	GuaranteeCard,
	HomeAboutContent,
	Stat,
	HomeBeforeAfterBannerContent,
	HomeContactContent,
	HomeNumbersContent,
	HomePageContent,
	HomePortfolioContent,
	HomePricingContent,
	HomeProcessContent,
	HomeServicesContent,
	HeroContent,
	PageSeo,
	PricingHintCard,
	PortfolioPageContent,
	PortfolioProject,
	PortfolioSlide,
	Review,
	ReviewsPageContent,
	ServiceDetail,
	ServicePageContent,
	ServicePageHeroContent,
	ServiceProcessStep,
	ServicesPageContent,
	SiteMetadataPageKey,
	SiteSettingsContent,
	TeamMember,
	TestimonialSlide,
	TimelineItem,
	ValueCard,
	WhyRow,
} from './types'

const str = (v?: string | null, fallback = '') => (v?.trim() ? v.trim() : fallback)
const shown = (value: unknown, fallback = true) => (typeof value === 'boolean' ? value : fallback)
const HIDDEN_SERVICE_META = /starting\s*from/i

// ── Queries ─────────────────────────────────────────────────────────────────

const HERO_Q = defineQuery(`coalesce(*[_id == "hero"][0], *[_type == "hero"][0]){
  "isShowed": coalesce(isShowed, true),
  locationLabel, titleLine1, description,
  primaryCtaLabel, secondaryCtaLabel, formTitle, formSubtext, formNote,
  backgroundImage{ asset, alt }
}`)

const SITE_Q = defineQuery(`*[_id == "siteSettings"][0]{
  "testimonialsIsShowed": coalesce(testimonialsIsShowed, true),
  testimonialsBackground{ asset, alt },
  footerDescription, phone, phoneHours, officeWeekdayHours, email, emailNote, notificationEmail,
  whatsapp, whatsappNote, serviceArea, serviceAreaNote,
  instagramUrl, facebookUrl, houzzUrl, homestarsUrl
}`)

const NUMBERS_Q = defineQuery(`*[_id == "homeNumbers"][0]{
  "isShowed": coalesce(isShowed, true), eyebrow, headline, stats
}`)

const SERVICES_HOME_Q = defineQuery(`*[_id == "homeServices"][0]{
  "isShowed": coalesce(isShowed, true),
  eyebrow, title, titleAccent,
  cards[]{ name, link, image{ asset, alt } }
}`)

const ABOUT_HOME_Q = defineQuery(`*[_id == "homeAbout"][0]{
  "isShowed": coalesce(isShowed, true),
  eyebrow, headline, headlineEmphasis, heroDescription, heroCtaLabel, heroCtaLink,
  heroImage{ asset, alt },
  rows[]{
    label, headingBefore, headingEmphasis, paragraphs, pills, reverse, imageAlt,
    image{ asset, alt }
  }
}`)

const PORTFOLIO_HOME_Q = defineQuery(`*[_id == "homePortfolio"][0]{
  "isShowed": coalesce(isShowed, true),
  eyebrow, headline, headlineEmphasis, description, ctaLabel, ctaLink, useFeaturedProjects,
  heroImage{ asset, alt },
  cards[]{ tag, title, meta, image{ asset, alt } }
}`)

const PROCESS_Q = defineQuery(`*[_id == "homeProcess"][0]{
  "isShowed": coalesce(isShowed, true),
  eyebrow, headline, headlineEmphasis, description, ctaLabel,
  heroImage{ asset, alt },
  steps[]{ title, description }
}`)

const PRICING_Q = defineQuery(`*[_id == "homePricing"][0]{
  "isShowed": coalesce(isShowed, true),
  eyebrow, headline, headlineEmphasis, heroDescription, heroCtaLabel,
  heroImage{ asset, alt },
  introTitle, introText,
  factors[]{ num, title, description },
  ctaLabel, ctaTitle, ctaSubtext, ctaPrimaryLabel, ctaSecondaryLabel
}`)

const CONTACT_HOME_Q = defineQuery(`*[_id == "homeContact"][0]{
  "isShowed": coalesce(isShowed, true),
  eyebrow, headline, headlineEmphasis, lead, ctaLabel, formTitle, formSubtext,
  photo{ asset, alt }, photoAlt
}`)

const HOME_BEFORE_AFTER_BANNER_Q = defineQuery(`*[_id == "homeBeforeAfter"][0]{
  "isShowed": coalesce(isShowed, true),
  eyebrow, headline, headlineEmphasis, description, ctaLabel,
  heroBackground{ asset, alt }
}`)

const SORT_ORDER = `select(defined(sortOrder) && sortOrder > 0 => sortOrder, 9999)`

const TESTIMONIALS_Q = defineQuery(`*[_type == "testimonial"] | order(${SORT_ORDER} asc, _createdAt asc){
  name, meta, quote, initial, rating
}`)

const BEFORE_AFTER_Q = defineQuery(`*[_type == "beforeAfterProject"] | order(${SORT_ORDER} asc, _createdAt asc){
  name, location, duration, year,
  beforeImage{ asset, alt }, afterImage{ asset, alt }
}`)

const PORTFOLIO_PROJECTS_Q = defineQuery(`*[_type == "portfolioProject"] | order(${SORT_ORDER} asc, _createdAt asc){
  "id": slug.current, "sortOrder": ${SORT_ORDER}, num, category, name, tags, location, duration, year, description,
  specs[]{ key, val },
  gallery[]{ alt, asset },
  beforeImage{ asset, alt }, afterImage{ asset, alt },
  featuredOnHome, homeTag, homeMeta
}`)

const SVC_HERO_Q = defineQuery(`*[_id == "servicesHero"][0]{
  "heroIsShowed": coalesce(isShowed, true),
  "listIsShowed": coalesce(listIsShowed, true),
  locationLabel, titleBefore, titleEmphasis, description,
  primaryCtaLabel, primaryCtaLink, secondaryCtaLabel, secondaryCtaLink,
  heroImage{ asset, alt }
}`)

const SVC_PROCESS_Q = defineQuery(`*[_id == "servicesProcess"][0]{
  "processIsShowed": coalesce(isShowed, true),
  "processEyebrow": eyebrow,
  "processHeadline": headline,
  "processHeadlineEmphasis": headlineEmphasis,
  "processDescription": description,
  "processHeroBackground": heroBackground{ asset, alt },
  "processSteps": steps[]{ icon, title, body }
}`)

const SVC_PRICING_Q = defineQuery(`*[_id == "servicesPricing"][0]{
  "pricingIsShowed": coalesce(isShowed, true),
  "pricingEyebrow": eyebrow,
  "pricingHeadline": headline,
  "pricingHeadlineEmphasis": headlineEmphasis,
  "pricingBody": body,
  "pricingCards": cards[]{ icon, title, body }
}`)

const SVC_FAQ_Q = defineQuery(`*[_id == "servicesFaq"][0]{
  "faqIsShowed": coalesce(isShowed, true),
  "faqEyebrow": eyebrow,
  "faqTitle": title,
  "faqTitleEmphasis": titleEmphasis,
  "faqSub": sub,
  "faqItems": items[]{ question, answer }
}`)

const SERVICE_PAGE_HERO_Q = defineQuery(`*[_id == "servicePageHero"][0]{
  "isShowed": coalesce(isShowed, true),
  locationLabel,
  primaryCtaLabel, primaryCtaLink,
  secondaryCtaLabel, secondaryCtaLink
}`)

const PORTFOLIO_PAGE_Q = defineQuery(`*[_id == "portfolioPage"][0]{
  locationLabel, titleBefore, titleEmphasis, description,
  primaryCtaLabel, primaryCtaLink, secondaryCtaLabel, secondaryCtaLink,
  heroImage{ asset, alt }, stats
}`)

const ABT_HERO_Q = defineQuery(`*[_id == "aboutHero"][0]{
  "heroIsShowed": coalesce(isShowed, true),
  locationLabel, titleBefore, titleEmphasis, description,
  primaryCtaLabel, primaryCtaLink, secondaryCtaLabel, secondaryCtaLink,
  heroImage{ asset, alt }
}`)

const ABT_FOUNDER_Q = defineQuery(`*[_id == "aboutFounder"][0]{
  "founderCardIsShowed": coalesce(isShowed, false),
  "founderInitial": initial,
  "founderName": name,
  "founderRole": role,
  "founderQuote": quote,
  "founderStats": stats
}`)

const ABT_WHO_Q = defineQuery(`*[_id == "aboutWho"][0]{
  "whoIsShowed": coalesce(isShowed, true),
  "whoEyebrow": eyebrow,
  "whoHeadline": headline,
  "whoHeadlineEmphasis": headlineEmphasis,
  "whoLead": lead,
  "whoBody": body,
  "whoPills": pills,
  "whoCtaLabel": ctaLabel,
  "whoCtaLink": ctaLink
}`)

const ABT_STORY_Q = defineQuery(`*[_id == "aboutStory"][0]{
  "storyIsShowed": coalesce(isShowed, false),
  "storyEyebrow": eyebrow,
  "storyHeadline": headline,
  "storyHeadlineEmphasis": headlineEmphasis,
  "storyLead": lead,
  timeline[]{ year, title, text, highlight }
}`)

const ABT_VALUES_Q = defineQuery(`*[_id == "aboutValues"][0]{
  "valuesIsShowed": coalesce(isShowed, true),
  "valuesEyebrow": eyebrow,
  "valuesHeadline": headline,
  "valuesHeadlineEmphasis": headlineEmphasis,
  "valuesDescription": description,
  "valuesHeroBackground": heroBackground{ asset, alt },
  "valueCards": cards[]{ icon, num, title, body }
}`)

const ABT_TEAM_Q = defineQuery(`*[_id == "aboutTeam"][0]{
  "teamIsShowed": coalesce(isShowed, false),
  "teamEyebrow": eyebrow,
  "teamHeadline": headline,
  "teamHeadlineEmphasis": headlineEmphasis,
  "teamDescription": description,
  "teamMembers": members[]{ name, role, bio, photo{ asset, alt } }
}`)

const ABT_WHY_Q = defineQuery(`*[_id == "aboutWhy"][0]{
  "whyIsShowed": coalesce(isShowed, true),
  "whyEyebrow": eyebrow,
  "whyBannerHeadline": bannerHeadline,
  "whyBannerHeadlineEmphasis": bannerHeadlineEmphasis,
  "whyBannerDescription": bannerDescription,
  "whyBannerBackground": bannerBackground{ asset, alt },
  "whyRows": rows[]{ num, label, title, body, pills, imageAlt, image{ asset, alt } }
}`)

const ABT_CERT_Q = defineQuery(`*[_id == "aboutCert"][0]{
  "certIsShowed": coalesce(isShowed, true),
  "certEyebrow": eyebrow,
  "certHeadline": headline,
  "certHeadlineEmphasis": headlineEmphasis,
  "certDescription": description,
  "certBadges": badges[]{ icon, name },
  guaranteeCards[]{ icon, title, text }
}`)

const CONTACTS_PAGE_Q = defineQuery(`*[_id == "contactsPage"][0]{
  eyebrow, titleBefore, titleEmphasis, description, heroImage{ asset, alt },
  formEyebrow, formTitleBefore, formTitleEmphasis, formSubtext
}`)

const REVIEWS_PAGE_Q = defineQuery(`*[_id == "reviewsPage"][0]{
  heroImage{ asset, alt }
}`)

const REVIEWS_Q = defineQuery(`*[_type == "review" && approved == true] | order(_createdAt desc){
  _id, name, location, service, rating, comment, approved, _createdAt
}`)

const SERVICES_LIST_Q = defineQuery(`*[_type == "service"] | order(${SORT_ORDER} asc, _createdAt asc){
  "id": slug.current,
  "pageSlug": pageSlug.current,
  num, icon, stripName, quickName, quickSub,
  eyebrow, title, lead,
  includes,
  meta[]{ key, val },
  image{ asset, alt }, imageAlt
}`)

const SERVICE_PAGE_FIELDS = `
  "id": slug.current,
  "pageSlug": pageSlug.current,
  num, icon, stripName, quickName, quickSub,
  eyebrow, title, lead,
  includes,
  meta[]{ key, val },
  image{ asset, alt }, imageAlt,
  "heroIsShowed": coalesce(heroIsShowed, true),
  heroEyebrow, heroTitleBefore, heroTitleEmphasis, heroDescription,
  heroImage{ asset, alt },
  "detailIsShowed": coalesce(detailIsShowed, true),
  "portfolioIsShowed": coalesce(portfolioIsShowed, true),
  portfolioEyebrow, portfolioTitle, portfolioTitleEmphasis, portfolioDescription,
  portfolioCategories,
  "faqIsShowed": coalesce(faqIsShowed, false),
  faqEyebrow, faqTitle, faqTitleEmphasis, faqSub,
  faqItems[]{ question, answer },
  pageSeo{ title, description, ogImage{ asset, alt }, jsonLd }
`

const SERVICE_BY_PAGE_SLUG_Q = defineQuery(`*[_type == "service" && (
  pageSlug.current == $slug ||
  (!defined(pageSlug.current) && slug.current == $fallbackId)
)][0]{ ${SERVICE_PAGE_FIELDS} }`)

const ALL_SERVICE_PAGES_Q = defineQuery(`*[_type == "service"] | order(${SORT_ORDER} asc, _createdAt asc){
  ${SERVICE_PAGE_FIELDS}
}`)

const PAGE_SEO_FIELDS = `title, description, ogImage{ asset, alt }, jsonLd`

const METADATA_Q = defineQuery(`*[_id == "metaData"][0]{
  defaultOgImage{ asset, alt },
  home{ ${PAGE_SEO_FIELDS} },
  aboutUs{ ${PAGE_SEO_FIELDS} },
  services{ ${PAGE_SEO_FIELDS} },
  portfolio{ ${PAGE_SEO_FIELDS} },
  reviews{ ${PAGE_SEO_FIELDS} },
  contacts{ ${PAGE_SEO_FIELDS} }
}`)

// ── Mappers ─────────────────────────────────────────────────────────────────

export function mapHero(doc: Record<string, unknown> | null): HeroContent {
	if (!doc) return DEFAULT_HERO
	const d = doc as HeroContent & {backgroundImage?: {alt?: string}}
	const alt = str((d.backgroundImage as {alt?: string})?.alt)
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HERO.isShowed),
		locationLabel: str(d.locationLabel as string),
		titleLine1: str(d.titleLine1 as string),
		description: str(d.description as string),
		primaryCtaLabel: str(d.primaryCtaLabel as string),
		secondaryCtaLabel: str(d.secondaryCtaLabel as string),
		formTitle: str(d.formTitle as string),
		formSubtext: str(d.formSubtext as string),
		formNote: str(d.formNote as string),
		backgroundImageUrl: urlForImage(d.backgroundImage as never) ?? '',
		backgroundImageAlt: alt || null,
	}
}

export function mapSiteSettings(doc: Record<string, unknown> | null): SiteSettingsContent {
	if (!doc) return DEFAULT_SITE_SETTINGS
	const d = doc as SiteSettingsContent & {testimonialsBackground?: {alt?: string}}
	const testiAlt = str((d.testimonialsBackground as {alt?: string} | undefined)?.alt)
	return {
		testimonialsIsShowed: shown((d as {testimonialsIsShowed?: boolean}).testimonialsIsShowed, DEFAULT_SITE_SETTINGS.testimonialsIsShowed),
		testimonialsBackgroundUrl: urlForImage(d.testimonialsBackground as never, 1920) ?? '',
		testimonialsBackgroundAlt: testiAlt || null,
		footerDescription: str(d.footerDescription),
		phone: str(d.phone),
		phoneHours: str(d.phoneHours),
		officeWeekdayHours: str(d.officeWeekdayHours),
		email: str(d.email),
		emailNote: str(d.emailNote),
		notificationEmail: str(d.notificationEmail),
		whatsapp: str(d.whatsapp),
		whatsappNote: str(d.whatsappNote),
		serviceArea: str(d.serviceArea),
		serviceAreaNote: str(d.serviceAreaNote),
		instagramUrl: str(d.instagramUrl),
		facebookUrl: str(d.facebookUrl),
		houzzUrl: str(d.houzzUrl),
		homestarsUrl: str(d.homestarsUrl),
	}
}

function mapStats(raw: {value?: string; suffix?: string; label?: string}[] | undefined): Stat[] {
	return (raw ?? [])
		.filter((s) => s?.value && s?.label)
		.map((s) => ({
			value: str(s.value),
			suffix: str(s.suffix),
			label: str(s.label),
		}))
}

export function mapHomeNumbers(doc: Record<string, unknown> | null): HomeNumbersContent {
	if (!doc) return DEFAULT_HOME_NUMBERS
	const d = doc as HomeNumbersContent
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_NUMBERS.isShowed),
		eyebrow: str(d.eyebrow),
		headline: str(d.headline),
		stats: mapStats(d.stats as never),
	}
}

export function mapHomeServices(doc: Record<string, unknown> | null): HomeServicesContent {
	if (!doc) return DEFAULT_HOME_SERVICES
	const d = doc as {eyebrow?: string; title?: string; titleAccent?: string; cards?: {name?: string; link?: string; image?: unknown}[]}
	const cards = (d.cards ?? [])
		.map((c) => ({
			name: str(c.name),
			link: str(c.link),
			imageUrl: urlForImage(c.image as never, 800) ?? '',
		}))
		.filter((c) => c.name && c.imageUrl)
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_SERVICES.isShowed),
		eyebrow: str(d.eyebrow),
		title: str(d.title),
		titleAccent: str(d.titleAccent),
		cards,
	}
}

export function mapHomeAbout(doc: Record<string, unknown> | null): HomeAboutContent {
	if (!doc) return DEFAULT_HOME_ABOUT
	const d = doc as HomeAboutContent & {rows?: AboutRow[]; heroImage?: unknown}
	const rows = (d.rows as AboutRow[] | undefined)?.map((r) => {
		const img = (r as AboutRow & {image?: unknown}).image
		return {
			label: str(r.label),
			headingBefore: str(r.headingBefore),
			headingEmphasis: str(r.headingEmphasis),
			paragraphs: (r.paragraphs ?? []).filter(Boolean),
			pills: (r.pills ?? []).filter(Boolean),
			imageUrl: urlForImage(img as never, 1000) ?? '',
			imageAlt: str(r.imageAlt),
			reverse: Boolean(r.reverse),
		}
	})
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_ABOUT.isShowed),
		eyebrow: str(d.eyebrow),
		headline: str(d.headline),
		headlineEmphasis: str(d.headlineEmphasis),
		heroDescription: str(d.heroDescription),
		heroCtaLabel: str(d.heroCtaLabel),
		heroCtaLink: str(d.heroCtaLink),
		heroImageUrl: urlForImage(d.heroImage as never) ?? '',
		rows: rows ?? [],
	}
}

export function mapHomePortfolio(
	doc: Record<string, unknown> | null,
	featured: PortfolioSlide[],
): HomePortfolioContent {
	if (!doc) return {...DEFAULT_HOME_PORTFOLIO, projects: featured}
	const d = doc as HomePortfolioContent & {useFeaturedProjects?: boolean; cards?: PortfolioSlide[]; heroImage?: unknown}
	const manual = (d.cards ?? [])
		.map((c) => ({
			tag: str((c as PortfolioSlide).tag),
			title: str((c as PortfolioSlide).title),
			meta: str((c as PortfolioSlide).meta),
			imageUrl: urlForImage((c as {image?: unknown}).image as never, 900) ?? '',
		}))
		.filter((c) => c.title && c.imageUrl)
	const projects =
		d.useFeaturedProjects !== false && featured.length
			? featured
			: manual
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_PORTFOLIO.isShowed),
		eyebrow: str(d.eyebrow),
		headline: str(d.headline),
		headlineEmphasis: str(d.headlineEmphasis),
		description: str(d.description),
		ctaLabel: str(d.ctaLabel),
		ctaLink: str(d.ctaLink),
		heroImageUrl: urlForImage(d.heroImage as never) ?? '',
		projects,
	}
}

export function mapHomeProcess(doc: Record<string, unknown> | null): HomeProcessContent {
	if (!doc) return DEFAULT_HOME_PROCESS
	const d = doc as HomeProcessContent & {heroImage?: unknown; steps?: HomeProcessContent['steps']}
	const steps = (d.steps ?? [])
		.filter((s) => s?.title)
		.map((s) => ({
			title: str(s.title),
			description: str(s.description),
		}))
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_PROCESS.isShowed),
		eyebrow: str(d.eyebrow),
		headline: str(d.headline),
		headlineEmphasis: str(d.headlineEmphasis),
		description: str(d.description),
		ctaLabel: str(d.ctaLabel),
		heroImageUrl: urlForImage(d.heroImage as never) ?? '',
		steps,
	}
}

export function mapHomePricing(doc: Record<string, unknown> | null): HomePricingContent {
	if (!doc) return DEFAULT_HOME_PRICING
	const d = doc as HomePricingContent & {heroImage?: unknown; factors?: HomePricingContent['factors']}
	const factors = (d.factors ?? [])
		.filter((f) => f?.title)
		.map((f) => ({
			num: str(f.num),
			title: str(f.title),
			description: str(f.description),
		}))
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_PRICING.isShowed),
		eyebrow: str(d.eyebrow),
		headline: str(d.headline),
		headlineEmphasis: str(d.headlineEmphasis),
		heroDescription: str(d.heroDescription),
		heroCtaLabel: str(d.heroCtaLabel),
		heroImageUrl: urlForImage(d.heroImage as never) ?? '',
		introTitle: str(d.introTitle),
		introText: str(d.introText),
		factors,
		ctaLabel: str(d.ctaLabel),
		ctaTitle: str(d.ctaTitle),
		ctaSubtext: str(d.ctaSubtext),
		ctaPrimaryLabel: str(d.ctaPrimaryLabel),
		ctaSecondaryLabel: str(d.ctaSecondaryLabel),
	}
}

export function mapHomeContact(doc: Record<string, unknown> | null): HomeContactContent {
	if (!doc) return DEFAULT_HOME_CONTACT
	const d = doc as HomeContactContent & {photo?: unknown}
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_CONTACT.isShowed),
		eyebrow: str(d.eyebrow),
		headline: str(d.headline),
		headlineEmphasis: str(d.headlineEmphasis),
		lead: str(d.lead),
		ctaLabel: str(d.ctaLabel),
		formTitle: str(d.formTitle),
		formSubtext: str(d.formSubtext),
		photoUrl: urlForImage(d.photo as never, 1200) ?? '',
		photoAlt: str(d.photoAlt),
	}
}

export function mapTestimonial(doc: {
	name?: string
	meta?: string
	quote?: string
	initial?: string
	rating?: number
}): TestimonialSlide | null {
	if (!doc.name || !doc.quote) return null
	const name = doc.name.trim()
	return {
		name,
		meta: str(doc.meta),
		text: doc.quote.trim(),
		initial: doc.initial?.trim().charAt(0).toUpperCase() || name.charAt(0).toUpperCase(),
		rating: Math.min(5, Math.max(1, Math.round(doc.rating ?? 5))),
	}
}

export function mapReviewToTestimonial(review: Review): TestimonialSlide | null {
	if (!review.name || !review.comment) return null
	const name = review.name.trim()
	const meta = [review.location, review.service].map((v) => v?.trim()).filter(Boolean).join(' · ')
	return {
		name,
		meta,
		text: review.comment.trim(),
		initial: name.charAt(0).toUpperCase(),
		rating: Math.min(5, Math.max(1, Math.round(review.rating ?? 5))),
	}
}

export function mapBeforeAfter(docs: Record<string, unknown>[]): BeforeAfterSlide[] {
	return docs
		.map((doc) => {
			const d = doc as {name?: string; location?: string; duration?: string; year?: string; beforeImage?: unknown; afterImage?: unknown}
			const after = urlForImage(d.afterImage as never, 1400)
			const before = urlForImage(d.beforeImage as never, 1400)
			if (!d.name || !after || !before) return null
			return {
				name: d.name,
				location: str(d.location),
				duration: str(d.duration),
				year: str(d.year),
				before,
				after,
			}
		})
		.filter((x): x is BeforeAfterSlide => Boolean(x))
}

export function mapPortfolioProject(doc: Record<string, unknown>, index: number): PortfolioProject | null {
	const d = doc as {
		id?: string
		num?: string
		category?: string | string[]
		name?: string
		tags?: string[]
		location?: string
		duration?: string
		year?: string
		description?: string
		specs?: {key?: string; val?: string}[]
		gallery?: {alt?: string; asset?: unknown}[]
		beforeImage?: unknown
		afterImage?: unknown
	}
	const gallery = (d.gallery ?? [])
		.map((g) => {
			const src = urlForImage(g as never, 1200)
			return src ? {src, alt: str(g.alt, d.name)} : null
		})
		.filter((g): g is {src: string; alt: string} => Boolean(g))
	const afterImage = urlForImage(d.afterImage as never, 1400)
	const beforeImage = urlForImage(d.beforeImage as never, 1400)
	const cover = afterImage ?? gallery[0]?.src ?? null
	if (!d.name || !cover) return null
	return {
		id: str(d.id, `project-${index + 1}`),
		num: str(d.num, String(index + 1).padStart(2, '0')),
		categories: normalizeCategories(d.category),
		name: d.name,
		tags: (d.tags ?? []).filter(Boolean),
		location: str(d.location),
		duration: str(d.duration),
		year: str(d.year),
		description: str(d.description),
		specs: (d.specs ?? [])
			.filter((s) => s.key && s.val)
			.map((s) => ({key: str(s.key), val: str(s.val)})),
		gallery: gallery.length ? gallery : [{src: cover, alt: d.name}],
		baAfter: afterImage && beforeImage ? afterImage : '',
		baBefore: afterImage && beforeImage ? beforeImage : '',
	}
}

export function mapFeaturedSlides(docs: Record<string, unknown>[]): PortfolioSlide[] {
	return docs
		.filter((d) => (d as {featuredOnHome?: boolean}).featuredOnHome)
		.map((doc) => {
			const d = doc as {
				homeTag?: string
				name?: string
				homeMeta?: string
				afterImage?: unknown
				category?: string | string[]
				gallery?: {asset?: unknown}[]
			}
			const imageUrl =
				urlForImage(d.afterImage as never, 900) ?? urlForImage(d.gallery?.[0] as never, 900)
			if (!d.name || !imageUrl) return null
			const firstCategory = normalizeCategories(d.category)[0]
			return {
				tag: str(d.homeTag, firstCategory ? categoryLabel(firstCategory) : ''),
				title: d.name,
				meta: str(d.homeMeta),
				imageUrl,
			}
		})
		.filter((x): x is PortfolioSlide => Boolean(x))
}

function mapPageHero<T extends {heroImageUrl: string}>(
	doc: Record<string, unknown> | null,
	defaults: T,
): T {
	if (!doc) return defaults
	const d = doc as T & {heroImage?: unknown}
	return {
		...defaults,
		locationLabel: str((d as {locationLabel?: string}).locationLabel),
		titleBefore: str((d as {titleBefore?: string}).titleBefore),
		titleEmphasis: str((d as {titleEmphasis?: string}).titleEmphasis),
		description: str((d as {description?: string}).description),
		primaryCtaLabel: str((d as {primaryCtaLabel?: string}).primaryCtaLabel),
		primaryCtaLink: str((d as {primaryCtaLink?: string}).primaryCtaLink),
		secondaryCtaLabel: str((d as {secondaryCtaLabel?: string}).secondaryCtaLabel),
		secondaryCtaLink: str((d as {secondaryCtaLink?: string}).secondaryCtaLink),
		heroImageUrl: urlForImage(d.heroImage as never) ?? '',
	} as T
}

export function mapHomeBeforeAfterBanner(
	doc: Record<string, unknown> | null,
): HomeBeforeAfterBannerContent {
	if (!doc) return DEFAULT_HOME_BEFORE_AFTER_BANNER
	const d = doc as HomeBeforeAfterBannerContent & {heroBackground?: unknown}
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_BEFORE_AFTER_BANNER.isShowed),
		eyebrow: str(d.eyebrow),
		headline: str(d.headline),
		headlineEmphasis: str(d.headlineEmphasis),
		description: str(d.description),
		ctaLabel: str(d.ctaLabel),
		heroBackgroundUrl: urlForImage(d.heroBackground as never) ?? '',
	}
}

export function mapPortfolioPage(doc: Record<string, unknown> | null): PortfolioPageContent {
	if (!doc) return DEFAULT_PORTFOLIO_PAGE
	const base = mapPageHero(doc, DEFAULT_PORTFOLIO_PAGE)
	return {...base, stats: mapStats((doc as PortfolioPageContent).stats as never)}
}

export function mapServicesPage(doc: Record<string, unknown> | null): ServicesPageContent {
	if (!doc) return DEFAULT_SERVICES_PAGE
	const d = doc as ServicesPageContent & {heroImage?: unknown; processHeroBackground?: unknown}
	const base = mapPageHero(doc, DEFAULT_SERVICES_PAGE)

	const processSteps = ((d as {processSteps?: ServiceProcessStep[]}).processSteps ?? [])
		.filter((s) => s?.title)
		.map((s) => ({
			icon: str(s.icon),
			title: str(s.title),
			body: str(s.body),
		}))

	const pricingCards = ((d as {pricingCards?: PricingHintCard[]}).pricingCards ?? [])
		.filter((c) => c?.title)
		.map((c) => ({
			icon: str(c.icon),
			title: str(c.title),
			body: str(c.body),
		}))

	const faqItems = ((d as {faqItems?: FaqItem[]}).faqItems ?? [])
		.filter((f) => f?.question)
		.map((f) => ({question: str(f.question), answer: str(f.answer)}))

	return {
		...base,
		heroIsShowed: shown((d as {heroIsShowed?: boolean}).heroIsShowed, DEFAULT_SERVICES_PAGE.heroIsShowed),
		listIsShowed: shown((d as {listIsShowed?: boolean}).listIsShowed, DEFAULT_SERVICES_PAGE.listIsShowed),
		processIsShowed: shown((d as {processIsShowed?: boolean}).processIsShowed, DEFAULT_SERVICES_PAGE.processIsShowed),
		pricingIsShowed: shown((d as {pricingIsShowed?: boolean}).pricingIsShowed, DEFAULT_SERVICES_PAGE.pricingIsShowed),
		faqIsShowed: shown((d as {faqIsShowed?: boolean}).faqIsShowed, DEFAULT_SERVICES_PAGE.faqIsShowed),
		processHeroBackgroundUrl: urlForImage(d.processHeroBackground as never) ?? '',
		processEyebrow: str((d as {processEyebrow?: string}).processEyebrow),
		processHeadline: str((d as {processHeadline?: string}).processHeadline),
		processHeadlineEmphasis: str((d as {processHeadlineEmphasis?: string}).processHeadlineEmphasis),
		processDescription: str((d as {processDescription?: string}).processDescription),
		processSteps,
		pricingEyebrow: str((d as {pricingEyebrow?: string}).pricingEyebrow),
		pricingHeadline: str((d as {pricingHeadline?: string}).pricingHeadline),
		pricingHeadlineEmphasis: str((d as {pricingHeadlineEmphasis?: string}).pricingHeadlineEmphasis),
		pricingBody: str((d as {pricingBody?: string}).pricingBody),
		pricingCards,
		faqEyebrow: str((d as {faqEyebrow?: string}).faqEyebrow),
		faqTitle: str((d as {faqTitle?: string}).faqTitle),
		faqTitleEmphasis: str((d as {faqTitleEmphasis?: string}).faqTitleEmphasis),
		faqSub: str((d as {faqSub?: string}).faqSub),
		faqItems,
	}
}

export function mapAboutPage(doc: Record<string, unknown> | null): AboutPageContent {
	if (!doc) return DEFAULT_ABOUT_PAGE
	const base = mapPageHero(doc, DEFAULT_ABOUT_PAGE)
	const d = doc as AboutPageContent & {valuesHeroBackground?: unknown; whyBannerBackground?: unknown}

	const timeline = ((d as {timeline?: TimelineItem[]}).timeline ?? [])
		.filter((t) => t?.year && t?.title)
		.map((t) => ({
			year: str(t.year),
			title: str(t.title),
			text: str(t.text),
			highlight: Boolean(t.highlight),
		}))

	const valueCards = ((d as {valueCards?: ValueCard[]}).valueCards ?? [])
		.filter((v) => v?.title)
		.map((v) => ({
			icon: str(v.icon),
			num: str(v.num),
			title: str(v.title),
			body: str(v.body),
		}))

	const teamMembers = ((d as {teamMembers?: (TeamMember & {photo?: unknown})[]}).teamMembers ?? [])
		.filter((m) => m?.name)
		.map((m) => ({
			name: str(m.name),
			role: str(m.role),
			bio: str(m.bio),
			photoUrl: urlForImage(m.photo as never, 400) ?? '',
		}))

	const whyRows = ((d as {whyRows?: (WhyRow & {image?: unknown})[]}).whyRows ?? [])
		.filter((r) => r?.title)
		.map((r) => ({
			num: str(r.num),
			label: str(r.label),
			title: str(r.title),
			body: str(r.body),
			pills: (r.pills ?? []).filter(Boolean),
			imageUrl: urlForImage(r.image as never, 900) ?? '',
			imageAlt: str(r.imageAlt),
		}))

	const certBadges = ((d as {certBadges?: CertBadge[]}).certBadges ?? [])
		.filter((b) => b?.name)
		.map((b) => ({
			icon: str(b.icon),
			name: str(b.name),
		}))

	const guaranteeCards = ((d as {guaranteeCards?: GuaranteeCard[]}).guaranteeCards ?? [])
		.filter((g) => g?.title)
		.map((g) => ({
			icon: str(g.icon),
			title: str(g.title),
			text: str(g.text),
		}))

	return {
		...base,
		heroIsShowed: shown(d.heroIsShowed, DEFAULT_ABOUT_PAGE.heroIsShowed),
		founderCardIsShowed: shown(d.founderCardIsShowed, DEFAULT_ABOUT_PAGE.founderCardIsShowed),
		whoIsShowed: shown(d.whoIsShowed, DEFAULT_ABOUT_PAGE.whoIsShowed),
		storyIsShowed: shown(d.storyIsShowed, DEFAULT_ABOUT_PAGE.storyIsShowed),
		valuesIsShowed: shown(d.valuesIsShowed, DEFAULT_ABOUT_PAGE.valuesIsShowed),
		teamIsShowed: shown(d.teamIsShowed, DEFAULT_ABOUT_PAGE.teamIsShowed),
		whyIsShowed: shown(d.whyIsShowed, DEFAULT_ABOUT_PAGE.whyIsShowed),
		certIsShowed: shown(d.certIsShowed, DEFAULT_ABOUT_PAGE.certIsShowed),
		valuesHeroBackgroundUrl: urlForImage(d.valuesHeroBackground as never) ?? '',
		whyBannerBackgroundUrl: urlForImage(d.whyBannerBackground as never) ?? '',
		founderInitial: str(d.founderInitial),
		founderName: str(d.founderName),
		founderRole: str(d.founderRole),
		founderQuote: str(d.founderQuote),
		founderStats: mapStats(d.founderStats as never),
		whoEyebrow: str((d as {whoEyebrow?: string}).whoEyebrow),
		whoHeadline: str((d as {whoHeadline?: string}).whoHeadline),
		whoHeadlineEmphasis: str((d as {whoHeadlineEmphasis?: string}).whoHeadlineEmphasis),
		whoLead: str((d as {whoLead?: string}).whoLead),
		whoBody: ((d as {whoBody?: string[]}).whoBody ?? []).filter(Boolean),
		whoPills: ((d as {whoPills?: string[]}).whoPills ?? []).filter(Boolean),
		whoCtaLabel: str((d as {whoCtaLabel?: string}).whoCtaLabel),
		whoCtaLink: str((d as {whoCtaLink?: string}).whoCtaLink),
		storyEyebrow: str((d as {storyEyebrow?: string}).storyEyebrow),
		storyHeadline: str((d as {storyHeadline?: string}).storyHeadline),
		storyHeadlineEmphasis: str((d as {storyHeadlineEmphasis?: string}).storyHeadlineEmphasis),
		storyLead: str((d as {storyLead?: string}).storyLead),
		timeline,
		valuesEyebrow: str((d as {valuesEyebrow?: string}).valuesEyebrow),
		valuesHeadline: str((d as {valuesHeadline?: string}).valuesHeadline),
		valuesHeadlineEmphasis: str((d as {valuesHeadlineEmphasis?: string}).valuesHeadlineEmphasis),
		valuesDescription: str((d as {valuesDescription?: string}).valuesDescription),
		valueCards,
		teamEyebrow: str((d as {teamEyebrow?: string}).teamEyebrow),
		teamHeadline: str((d as {teamHeadline?: string}).teamHeadline),
		teamHeadlineEmphasis: str((d as {teamHeadlineEmphasis?: string}).teamHeadlineEmphasis),
		teamDescription: str((d as {teamDescription?: string}).teamDescription),
		teamMembers,
		whyEyebrow: str((d as {whyEyebrow?: string}).whyEyebrow),
		whyBannerHeadline: str((d as {whyBannerHeadline?: string}).whyBannerHeadline),
		whyBannerHeadlineEmphasis: str((d as {whyBannerHeadlineEmphasis?: string}).whyBannerHeadlineEmphasis),
		whyBannerDescription: str((d as {whyBannerDescription?: string}).whyBannerDescription),
		whyRows,
		certEyebrow: str((d as {certEyebrow?: string}).certEyebrow),
		certHeadline: str((d as {certHeadline?: string}).certHeadline),
		certHeadlineEmphasis: str((d as {certHeadlineEmphasis?: string}).certHeadlineEmphasis),
		certDescription: str((d as {certDescription?: string}).certDescription),
		certBadges,
		guaranteeCards,
	}
}

export function mapReviewsPage(doc: Record<string, unknown> | null): ReviewsPageContent {
	if (!doc) return DEFAULT_REVIEWS_PAGE
	const d = doc as ReviewsPageContent & {heroImage?: unknown}
	return {
		heroImageUrl: urlForImage(d.heroImage as never) ?? '',
	}
}

export function mapContactsPage(doc: Record<string, unknown> | null): ContactsPageContent {
	if (!doc) return DEFAULT_CONTACTS_PAGE
	const d = doc as ContactsPageContent & {heroImage?: unknown}
	return {
		eyebrow: str(d.eyebrow),
		titleBefore: str(d.titleBefore),
		titleEmphasis: str(d.titleEmphasis),
		description: str(d.description),
		heroImageUrl: urlForImage(d.heroImage as never) ?? '',
		formEyebrow: str(d.formEyebrow),
		formTitleBefore: str(d.formTitleBefore),
		formTitleEmphasis: str(d.formTitleEmphasis),
		formSubtext: str(d.formSubtext),
	}
}

export function mapServicesList(docs: Record<string, unknown>[]): ServiceDetail[] {
	return docs
		.map((doc) => {
			const d = doc as {
				id?: string
				pageSlug?: string
				num?: string
				icon?: string
				stripName?: string
				quickName?: string
				quickSub?: string
				eyebrow?: string
				title?: string
				lead?: string
				includes?: string[]
				meta?: {key?: string; val?: string}[]
				image?: unknown
				imageAlt?: string
			}
			if (!d.id || !d.title) return null
			return {
				id: str(d.id),
				pageSlug: servicePageSlug(str(d.id), d.pageSlug),
				num: str(d.num),
				icon: str(d.icon),
				stripName: str(d.stripName, d.eyebrow ?? d.title ?? ''),
				quickName: str(d.quickName, d.title ?? ''),
				quickSub: str(d.quickSub),
				eyebrow: str(d.eyebrow, d.title ?? ''),
				title: str(d.title),
				lead: str(d.lead),
				includes: (d.includes ?? []).filter(Boolean),
				meta: (d.meta ?? [])
					.filter((m) => m.key && m.val && !HIDDEN_SERVICE_META.test(m.key))
					.map((m) => ({key: str(m.key), val: str(m.val)})),
				imageUrl: urlForImage(d.image as never, 900) ?? '',
				imageAlt: str(d.imageAlt, d.title ?? ''),
			}
		})
		.filter((s): s is ServiceDetail => Boolean(s))
}

function mapServicePortfolioCategories(
	serviceId: string,
	raw: unknown,
): ServicePageContent['portfolioCategories'] {
	const fromCms = normalizeCategories(raw)
	if (fromCms.length) return fromCms
	const defaults = DEFAULT_SERVICE_PORTFOLIO_CATEGORIES[serviceId] ?? []
	return defaults.filter(isPortfolioCategory)
}

export function mapServicePageHero(doc: Record<string, unknown> | null): ServicePageHeroContent {
	if (!doc) return DEFAULT_SERVICE_PAGE_HERO
	const d = doc as ServicePageHeroContent
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_SERVICE_PAGE_HERO.isShowed),
		locationLabel: str(d.locationLabel),
		primaryCtaLabel: str(d.primaryCtaLabel),
		primaryCtaLink: str(d.primaryCtaLink, '#contact'),
		secondaryCtaLabel: str(d.secondaryCtaLabel),
		secondaryCtaLink: str(d.secondaryCtaLink, '/services/'),
	}
}

export function mapServicePage(
	doc: Record<string, unknown> | null,
	fallbackSeo: PageSeo,
	defaultOgImageUrl: string | null,
): ServicePageContent | null {
	if (!doc) return null
	const base = mapServicesList([doc])[0]
	if (!base) return null

	const d = doc as {
		heroIsShowed?: boolean
		heroEyebrow?: string
		heroTitleBefore?: string
		heroTitleEmphasis?: string
		heroDescription?: string
		heroImage?: unknown
		detailIsShowed?: boolean
		portfolioIsShowed?: boolean
		portfolioEyebrow?: string
		portfolioTitle?: string
		portfolioTitleEmphasis?: string
		portfolioDescription?: string
		portfolioCategories?: unknown
		faqIsShowed?: boolean
		faqEyebrow?: string
		faqTitle?: string
		faqTitleEmphasis?: string
		faqSub?: string
		faqItems?: FaqItem[]
		pageSeo?: RawPageSeo
	}

	const seoFallback: PageSeo = {
		title: `${base.title} — Formo Renovations`,
		description: base.lead || fallbackSeo.description,
		ogImageUrl: base.imageUrl || fallbackSeo.ogImageUrl,
		jsonLd: '',
	}

	const faqItems = (d.faqItems ?? [])
		.filter((f) => f?.question)
		.map((f) => ({question: str(f.question), answer: str(f.answer)}))

	return {
		...base,
		heroIsShowed: shown(d.heroIsShowed, true),
		heroEyebrow: str(d.heroEyebrow),
		heroTitleBefore: str(d.heroTitleBefore, base.title),
		heroTitleEmphasis: str(d.heroTitleEmphasis),
		heroDescription: str(d.heroDescription, base.lead),
		heroImageUrl: urlForImage(d.heroImage as never) ?? '',
		detailIsShowed: shown(d.detailIsShowed, true),
		portfolioIsShowed: shown(d.portfolioIsShowed, true),
		portfolioEyebrow: str(d.portfolioEyebrow),
		portfolioTitle: str(d.portfolioTitle),
		portfolioTitleEmphasis: str(d.portfolioTitleEmphasis),
		portfolioDescription: str(d.portfolioDescription),
		portfolioCategories: mapServicePortfolioCategories(base.id, d.portfolioCategories),
		faqIsShowed: shown(d.faqIsShowed, false),
		faqEyebrow: str(d.faqEyebrow),
		faqTitle: str(d.faqTitle),
		faqTitleEmphasis: str(d.faqTitleEmphasis),
		faqSub: str(d.faqSub),
		faqItems,
		seo: mapPageSeo(d.pageSeo, seoFallback, defaultOgImageUrl),
	}
}

export function filterProjectsForService(
	projects: PortfolioProject[],
	service: Pick<ServicePageContent, 'id' | 'title' | 'portfolioCategories'>,
): PortfolioProject[] {
	const categories = service.portfolioCategories
	if (categories.length) {
		return projects.filter((project) =>
			categories.some((cat) => projectMatchesCategory(project, cat)),
		)
	}

	const needle = service.title.trim().toLowerCase()
	if (!needle) return projects

	return projects.filter((project) =>
		project.tags.some((tag) => tag.trim().toLowerCase().includes(needle)) ||
		project.name.trim().toLowerCase().includes(needle),
	)
}

type RawPageSeo = {title?: string; description?: string; ogImage?: unknown; jsonLd?: string}

type RawMetadataDoc = {
	defaultOgImage?: unknown
} & Partial<Record<SiteMetadataPageKey, RawPageSeo | null>>

export function mapPageSeo(
	doc: RawPageSeo | null | undefined,
	fallback: PageSeo,
	defaultOgImageUrl: string | null,
): PageSeo {
	if (!doc) return fallback
	const pageOgImageUrl = urlForImage(doc.ogImage as never, 1200)
	return {
		title: str(doc.title, fallback.title),
		description: str(doc.description, fallback.description),
		ogImageUrl: pageOgImageUrl ?? defaultOgImageUrl ?? null,
		jsonLd: str(doc.jsonLd, fallback.jsonLd),
	}
}

export function mapSiteMetadata(doc: Record<string, unknown> | null): Record<SiteMetadataPageKey, PageSeo> {
	const defaultOgImageUrl = doc
		? urlForImage((doc as RawMetadataDoc).defaultOgImage as never, 1200)
		: null
	const d = doc as RawMetadataDoc | null

	return {
		home: mapPageSeo(d?.home, DEFAULT_PAGE_SEO.home, defaultOgImageUrl),
		aboutUs: mapPageSeo(d?.aboutUs, DEFAULT_PAGE_SEO.aboutUs, defaultOgImageUrl),
		services: mapPageSeo(d?.services, DEFAULT_PAGE_SEO.services, defaultOgImageUrl),
		portfolio: mapPageSeo(d?.portfolio, DEFAULT_PAGE_SEO.portfolio, defaultOgImageUrl),
		reviews: mapPageSeo(d?.reviews, DEFAULT_PAGE_SEO.reviews, defaultOgImageUrl),
		contacts: mapPageSeo(d?.contacts, DEFAULT_PAGE_SEO.contacts, defaultOgImageUrl),
	}
}

// ── Fetchers ────────────────────────────────────────────────────────────────

async function safeFetch<T>(query: string, fallback: T): Promise<T> {
	try {
		const result = await sanityClient.fetch<T>(query)
		return result ?? fallback
	} catch {
		return fallback
	}
}

export async function getHeroContent() {
	return mapHero(await safeFetch(HERO_Q, null))
}

export async function getSiteSettings() {
	return mapSiteSettings(await safeFetch(SITE_Q, null))
}

export async function getHomeNumbers() {
	return mapHomeNumbers(await safeFetch(NUMBERS_Q, null))
}

export async function getHomeServices() {
	return mapHomeServices(await safeFetch(SERVICES_HOME_Q, null))
}

export async function getHomeAbout() {
	return mapHomeAbout(await safeFetch(ABOUT_HOME_Q, null))
}

export async function getHomeProcess() {
	return mapHomeProcess(await safeFetch(PROCESS_Q, null))
}

export async function getHomePricing() {
	return mapHomePricing(await safeFetch(PRICING_Q, null))
}

export async function getHomeContact() {
	return mapHomeContact(await safeFetch(CONTACT_HOME_Q, null))
}

export async function getTestimonialSlides() {
	const docs = await safeFetch(TESTIMONIALS_Q, [] as Record<string, unknown>[])
	return docs.map(mapTestimonial).filter((t): t is TestimonialSlide => Boolean(t))
}

export async function getBeforeAfterSlides() {
	const docs = await safeFetch(BEFORE_AFTER_Q, [] as Record<string, unknown>[])
	return mapBeforeAfter(docs)
}

function bySortOrder(a: Record<string, unknown>, b: Record<string, unknown>) {
	const ao = typeof a.sortOrder === 'number' && a.sortOrder > 0 ? a.sortOrder : 9999
	const bo = typeof b.sortOrder === 'number' && b.sortOrder > 0 ? b.sortOrder : 9999
	return ao - bo
}

export async function getPortfolioProjects() {
	const docs = await safeFetch(PORTFOLIO_PROJECTS_Q, [] as Record<string, unknown>[])
	return docs
		.slice()
		.sort(bySortOrder)
		.map(mapPortfolioProject)
		.filter((p): p is PortfolioProject => Boolean(p))
}

export async function getHomePortfolio() {
	const rawProjects = await safeFetch(PORTFOLIO_PROJECTS_Q, [] as Record<string, unknown>[])
	const featured = mapFeaturedSlides(rawProjects.slice().sort(bySortOrder))
	const doc = await safeFetch(PORTFOLIO_HOME_Q, null)
	return mapHomePortfolio(doc, featured)
}

export async function getHomeBeforeAfterBanner() {
	return mapHomeBeforeAfterBanner(await safeFetch(HOME_BEFORE_AFTER_BANNER_Q, null))
}

export async function getServicesPage() {
	const [hero, process, pricing, faq] = await Promise.all([
		safeFetch(SVC_HERO_Q, null),
		safeFetch(SVC_PROCESS_Q, null),
		safeFetch(SVC_PRICING_Q, null),
		safeFetch(SVC_FAQ_Q, null),
	])
	return mapServicesPage(Object.assign({}, hero, process, pricing, faq))
}

export async function getServicesList(): Promise<ServiceDetail[]> {
	const docs = await safeFetch(SERVICES_LIST_Q, [] as Record<string, unknown>[])
	return mapServicesList(docs)
}

export async function getServicePageHero() {
	return mapServicePageHero(await safeFetch(SERVICE_PAGE_HERO_Q, null))
}

export async function getServiceByPageSlug(slug: string): Promise<ServicePageContent | null> {
	const [doc, metadata] = await Promise.all([
		sanityClient.fetch<Record<string, unknown> | null>(SERVICE_BY_PAGE_SLUG_Q, {
			slug,
			fallbackId: `svc-${slug}`,
		}),
		getSiteMetadata(),
	])
	const defaultOgImageUrl = metadata.services.ogImageUrl
	return mapServicePage(doc, metadata.services, defaultOgImageUrl)
}

export async function getAllServicePages(): Promise<ServicePageContent[]> {
	const [docs, metadata] = await Promise.all([
		safeFetch(ALL_SERVICE_PAGES_Q, [] as Record<string, unknown>[]),
		getSiteMetadata(),
	])
	const defaultOgImageUrl = metadata.services.ogImageUrl
	return docs
		.map((doc) => mapServicePage(doc, metadata.services, defaultOgImageUrl))
		.filter((s): s is ServicePageContent => Boolean(s))
}

export async function getPortfolioPage() {
	return mapPortfolioPage(await safeFetch(PORTFOLIO_PAGE_Q, null))
}

export async function getAboutPage() {
	const [hero, founder, who, story, values, team, why, cert] = await Promise.all([
		safeFetch(ABT_HERO_Q, null),
		safeFetch(ABT_FOUNDER_Q, null),
		safeFetch(ABT_WHO_Q, null),
		safeFetch(ABT_STORY_Q, null),
		safeFetch(ABT_VALUES_Q, null),
		safeFetch(ABT_TEAM_Q, null),
		safeFetch(ABT_WHY_Q, null),
		safeFetch(ABT_CERT_Q, null),
	])
	return mapAboutPage(Object.assign({}, hero, founder, who, story, values, team, why, cert))
}

export async function getContactsPage() {
	return mapContactsPage(await safeFetch(CONTACTS_PAGE_Q, null))
}

export async function getReviewsPage() {
	return mapReviewsPage(await safeFetch(REVIEWS_PAGE_Q, null))
}

export async function getReviews(): Promise<Review[]> {
	return safeFetch(REVIEWS_Q, [] as Review[])
}

export async function getSiteMetadata(): Promise<Record<SiteMetadataPageKey, PageSeo>> {
	return mapSiteMetadata(await safeFetch(METADATA_Q, null))
}

export async function getPageMetadata(page: SiteMetadataPageKey): Promise<PageSeo> {
	const metadata = await getSiteMetadata()
	return metadata[page]
}

export async function getHomePageContent(): Promise<HomePageContent> {
	const [
		hero,
		numbers,
		services,
		about,
		portfolio,
		process,
		pricing,
		contact,
		testimonials,
		beforeAfter,
		beforeAfterBanner,
		site,
	] = await Promise.all([
		getHeroContent(),
		getHomeNumbers(),
		getHomeServices(),
		getHomeAbout(),
		getHomePortfolio(),
		getHomeProcess(),
		getHomePricing(),
		getHomeContact(),
		getReviews().then((reviews) =>
			reviews.map(mapReviewToTestimonial).filter((t): t is TestimonialSlide => Boolean(t)),
		),
		getBeforeAfterSlides(),
		getHomeBeforeAfterBanner(),
		getSiteSettings(),
	])
	return {
		hero,
		numbers,
		services,
		about,
		portfolio,
		process,
		pricing,
		contact,
		testimonials,
		beforeAfter,
		beforeAfterBanner,
		site,
	}
}
