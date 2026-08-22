/// <reference types="@sanity/astro/module" />
import {sanityClient} from 'sanity:client'
import {defineQuery} from 'groq'
import {urlForImage} from './image'
import {resolveBgUrl, type BackgroundKey} from './backgrounds'
import {categoryLabel, normalizeCategories} from './categories'
import {
	DEFAULT_ABOUT_PAGE,
	DEFAULT_BEFORE_AFTER,
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
	PricingHintCard,
	PortfolioPageContent,
	PortfolioProject,
	PortfolioSlide,
	Review,
	ReviewsPageContent,
	ServiceDetail,
	ServiceProcessStep,
	ServicesPageContent,
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
  locationLabel, titleLine1, titleLine2, titleSub, description,
  primaryCtaLabel, secondaryCtaLabel, formTitle, formSubtext, formNote,
  backgroundImage{ asset, alt }
}`)

const SITE_Q = defineQuery(`*[_id == "siteSettings"][0]{
  "testimonialsIsShowed": coalesce(testimonialsIsShowed, true),
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

const TESTIMONIALS_Q = defineQuery(`*[_type == "testimonial"] | order(coalesce(sortOrder, 9999) asc, _createdAt asc){
  name, meta, quote, initial, rating
}`)

const BEFORE_AFTER_Q = defineQuery(`*[_type == "beforeAfterProject"] | order(coalesce(sortOrder, 9999) asc, _createdAt asc){
  name, location, duration, year,
  beforeImage{ asset, alt }, afterImage{ asset, alt }
}`)

const PORTFOLIO_PROJECTS_Q = defineQuery(`*[_type == "portfolioProject"] | order(coalesce(sortOrder, 9999) asc, _createdAt asc){
  "id": slug.current, num, category, name, tags, location, duration, year, description,
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

const SERVICES_LIST_Q = defineQuery(`*[_type == "service"] | order(coalesce(sortOrder, 9999) asc, _createdAt asc){
  "id": slug.current, num, icon, stripName, quickName, quickSub,
  eyebrow, title, lead,
  includes,
  meta[]{ key, val },
  image{ asset, alt }, imageAlt
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
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HERO.isShowed),
		locationLabel: str(d.locationLabel as string, DEFAULT_HERO.locationLabel),
		titleLine1: str(d.titleLine1 as string, DEFAULT_HERO.titleLine1),
		titleLine2: str(d.titleLine2 as string, DEFAULT_HERO.titleLine2),
		titleSub: str(d.titleSub as string, DEFAULT_HERO.titleSub),
		description: str(d.description as string, DEFAULT_HERO.description),
		primaryCtaLabel: str(d.primaryCtaLabel as string, DEFAULT_HERO.primaryCtaLabel),
		secondaryCtaLabel: str(d.secondaryCtaLabel as string, DEFAULT_HERO.secondaryCtaLabel),
		formTitle: str(d.formTitle as string, DEFAULT_HERO.formTitle),
		formSubtext: str(d.formSubtext as string, DEFAULT_HERO.formSubtext),
		formNote: str(d.formNote as string, DEFAULT_HERO.formNote),
		backgroundImageUrl: resolveBgUrl(urlForImage(d.backgroundImage as never), 'homeHero'),
		backgroundImageAlt: str((d.backgroundImage as {alt?: string})?.alt, DEFAULT_HERO.backgroundImageAlt ?? ''),
	}
}

export function mapSiteSettings(doc: Record<string, unknown> | null): SiteSettingsContent {
	if (!doc) return DEFAULT_SITE_SETTINGS
	const d = doc as SiteSettingsContent
	return {
		testimonialsIsShowed: shown((d as {testimonialsIsShowed?: boolean}).testimonialsIsShowed, DEFAULT_SITE_SETTINGS.testimonialsIsShowed),
		footerDescription: str(d.footerDescription, DEFAULT_SITE_SETTINGS.footerDescription),
		phone: str(d.phone, DEFAULT_SITE_SETTINGS.phone),
		phoneHours: str(d.phoneHours, DEFAULT_SITE_SETTINGS.phoneHours),
		officeWeekdayHours: str(d.officeWeekdayHours, DEFAULT_SITE_SETTINGS.officeWeekdayHours),
		email: str(d.email, DEFAULT_SITE_SETTINGS.email),
		emailNote: str(d.emailNote, DEFAULT_SITE_SETTINGS.emailNote),
		notificationEmail: str(d.notificationEmail, DEFAULT_SITE_SETTINGS.notificationEmail),
		whatsapp: str(d.whatsapp, DEFAULT_SITE_SETTINGS.whatsapp),
		whatsappNote: str(d.whatsappNote, DEFAULT_SITE_SETTINGS.whatsappNote),
		serviceArea: str(d.serviceArea, DEFAULT_SITE_SETTINGS.serviceArea),
		serviceAreaNote: str(d.serviceAreaNote, DEFAULT_SITE_SETTINGS.serviceAreaNote),
		instagramUrl: str(d.instagramUrl),
		facebookUrl: str(d.facebookUrl),
		houzzUrl: str(d.houzzUrl),
		homestarsUrl: str(d.homestarsUrl),
	}
}

function mapStats(raw: {value?: string; suffix?: string; label?: string}[] | undefined, fallback: Stat[]): Stat[] {
	const stats = (raw ?? [])
		.filter((s) => s?.value && s?.label)
		.map((s) => ({
			value: str(s.value),
			suffix: str(s.suffix),
			label: str(s.label),
		}))
	return stats.length ? stats : fallback
}

export function mapHomeNumbers(doc: Record<string, unknown> | null): HomeNumbersContent {
	if (!doc) return DEFAULT_HOME_NUMBERS
	const d = doc as HomeNumbersContent
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_NUMBERS.isShowed),
		eyebrow: str(d.eyebrow, DEFAULT_HOME_NUMBERS.eyebrow),
		headline: str(d.headline, DEFAULT_HOME_NUMBERS.headline),
		stats: mapStats(d.stats as never, DEFAULT_HOME_NUMBERS.stats),
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
		eyebrow: str(d.eyebrow, DEFAULT_HOME_SERVICES.eyebrow),
		title: str(d.title, DEFAULT_HOME_SERVICES.title),
		titleAccent: str(d.titleAccent, DEFAULT_HOME_SERVICES.titleAccent),
		cards: cards.length ? cards : DEFAULT_HOME_SERVICES.cards,
	}
}

export function mapHomeAbout(doc: Record<string, unknown> | null): HomeAboutContent {
	if (!doc) return DEFAULT_HOME_ABOUT
	const d = doc as HomeAboutContent & {rows?: AboutRow[]; heroImage?: unknown}
	const rows = (d.rows as AboutRow[] | undefined)?.map((r, i) => {
		const fb = DEFAULT_HOME_ABOUT.rows[i] ?? DEFAULT_HOME_ABOUT.rows[0]
		const img = (r as AboutRow & {image?: unknown}).image
		return {
			label: str(r.label, fb.label),
			headingBefore: str(r.headingBefore, fb.headingBefore),
			headingEmphasis: str(r.headingEmphasis, fb.headingEmphasis),
			paragraphs: (r.paragraphs ?? fb.paragraphs).filter(Boolean),
			pills: (r.pills ?? fb.pills).filter(Boolean),
			imageUrl: urlForImage(img as never, 1000) ?? fb.imageUrl,
			imageAlt: str(r.imageAlt, fb.imageAlt),
			reverse: Boolean(r.reverse),
		}
	})
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_ABOUT.isShowed),
		eyebrow: str(d.eyebrow, DEFAULT_HOME_ABOUT.eyebrow),
		headline: str(d.headline, DEFAULT_HOME_ABOUT.headline),
		headlineEmphasis: str(d.headlineEmphasis, DEFAULT_HOME_ABOUT.headlineEmphasis),
		heroDescription: str(d.heroDescription, DEFAULT_HOME_ABOUT.heroDescription),
		heroCtaLabel: str(d.heroCtaLabel, DEFAULT_HOME_ABOUT.heroCtaLabel),
		heroCtaLink: str(d.heroCtaLink, DEFAULT_HOME_ABOUT.heroCtaLink),
		heroImageUrl: resolveBgUrl(urlForImage(d.heroImage as never), 'homeAbout'),
		rows: rows?.length ? rows : DEFAULT_HOME_ABOUT.rows,
	}
}

export function mapHomePortfolio(
	doc: Record<string, unknown> | null,
	featured: PortfolioSlide[],
): HomePortfolioContent {
	if (!doc) return {...DEFAULT_HOME_PORTFOLIO, projects: featured.length ? featured : DEFAULT_HOME_PORTFOLIO.projects}
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
			: manual.length
				? manual
				: DEFAULT_HOME_PORTFOLIO.projects
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_PORTFOLIO.isShowed),
		eyebrow: str(d.eyebrow, DEFAULT_HOME_PORTFOLIO.eyebrow),
		headline: str(d.headline, DEFAULT_HOME_PORTFOLIO.headline),
		headlineEmphasis: str(d.headlineEmphasis, DEFAULT_HOME_PORTFOLIO.headlineEmphasis),
		description: str(d.description, DEFAULT_HOME_PORTFOLIO.description),
		ctaLabel: str(d.ctaLabel, DEFAULT_HOME_PORTFOLIO.ctaLabel),
		ctaLink: str(d.ctaLink, DEFAULT_HOME_PORTFOLIO.ctaLink),
		heroImageUrl: resolveBgUrl(urlForImage(d.heroImage as never), 'homePortfolio'),
		projects,
	}
}

export function mapHomeProcess(doc: Record<string, unknown> | null): HomeProcessContent {
	if (!doc) return DEFAULT_HOME_PROCESS
	const d = doc as HomeProcessContent & {heroImage?: unknown; steps?: HomeProcessContent['steps']}
	const steps = (d.steps ?? [])
		.filter((s) => s?.title)
		.map((s, i) => {
			const fb = DEFAULT_HOME_PROCESS.steps[i] ?? DEFAULT_HOME_PROCESS.steps[0]
			return {
				title: str(s.title, fb.title),
				description: str(s.description, fb.description),
			}
		})
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_PROCESS.isShowed),
		eyebrow: str(d.eyebrow, DEFAULT_HOME_PROCESS.eyebrow),
		headline: str(d.headline, DEFAULT_HOME_PROCESS.headline),
		headlineEmphasis: str(d.headlineEmphasis, DEFAULT_HOME_PROCESS.headlineEmphasis),
		description: str(d.description, DEFAULT_HOME_PROCESS.description),
		ctaLabel: str(d.ctaLabel, DEFAULT_HOME_PROCESS.ctaLabel),
		heroImageUrl: resolveBgUrl(urlForImage(d.heroImage as never), 'homeProcess'),
		steps: steps.length ? steps : DEFAULT_HOME_PROCESS.steps,
	}
}

export function mapHomePricing(doc: Record<string, unknown> | null): HomePricingContent {
	if (!doc) return DEFAULT_HOME_PRICING
	const d = doc as HomePricingContent & {heroImage?: unknown; factors?: HomePricingContent['factors']}
	const factors = (d.factors ?? [])
		.filter((f) => f?.title)
		.map((f, i) => {
			const fb = DEFAULT_HOME_PRICING.factors[i] ?? DEFAULT_HOME_PRICING.factors[0]
			return {num: str(f.num, fb.num), title: str(f.title, fb.title), description: str(f.description, fb.description)}
		})
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_PRICING.isShowed),
		eyebrow: str(d.eyebrow, DEFAULT_HOME_PRICING.eyebrow),
		headline: str(d.headline, DEFAULT_HOME_PRICING.headline),
		headlineEmphasis: str(d.headlineEmphasis, DEFAULT_HOME_PRICING.headlineEmphasis),
		heroDescription: str(d.heroDescription, DEFAULT_HOME_PRICING.heroDescription),
		heroCtaLabel: str(d.heroCtaLabel, DEFAULT_HOME_PRICING.heroCtaLabel),
		heroImageUrl: resolveBgUrl(urlForImage(d.heroImage as never), 'homePricing'),
		introTitle: str(d.introTitle, DEFAULT_HOME_PRICING.introTitle),
		introText: str(d.introText, DEFAULT_HOME_PRICING.introText),
		factors: factors.length ? factors : DEFAULT_HOME_PRICING.factors,
		ctaLabel: str(d.ctaLabel, DEFAULT_HOME_PRICING.ctaLabel),
		ctaTitle: str(d.ctaTitle, DEFAULT_HOME_PRICING.ctaTitle),
		ctaSubtext: str(d.ctaSubtext, DEFAULT_HOME_PRICING.ctaSubtext),
		ctaPrimaryLabel: str(d.ctaPrimaryLabel, DEFAULT_HOME_PRICING.ctaPrimaryLabel),
		ctaSecondaryLabel: str(d.ctaSecondaryLabel, DEFAULT_HOME_PRICING.ctaSecondaryLabel),
	}
}

export function mapHomeContact(doc: Record<string, unknown> | null): HomeContactContent {
	if (!doc) return DEFAULT_HOME_CONTACT
	const d = doc as HomeContactContent & {photo?: unknown}
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_CONTACT.isShowed),
		eyebrow: str(d.eyebrow, DEFAULT_HOME_CONTACT.eyebrow),
		headline: str(d.headline, DEFAULT_HOME_CONTACT.headline),
		headlineEmphasis: str(d.headlineEmphasis, DEFAULT_HOME_CONTACT.headlineEmphasis),
		lead: str(d.lead, DEFAULT_HOME_CONTACT.lead),
		ctaLabel: str(d.ctaLabel, DEFAULT_HOME_CONTACT.ctaLabel),
		formTitle: str(d.formTitle, DEFAULT_HOME_CONTACT.formTitle),
		formSubtext: str(d.formSubtext, DEFAULT_HOME_CONTACT.formSubtext),
		photoUrl: urlForImage(d.photo as never, 1200) ?? DEFAULT_HOME_CONTACT.photoUrl,
		photoAlt: str(d.photoAlt, DEFAULT_HOME_CONTACT.photoAlt),
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
				tag: str(d.homeTag, firstCategory ? categoryLabel(firstCategory) : 'Project'),
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
	bgKey: BackgroundKey,
): T {
	if (!doc) return defaults
	const d = doc as T & {heroImage?: unknown}
	return {
		...defaults,
		locationLabel: str((d as {locationLabel?: string}).locationLabel, (defaults as {locationLabel?: string}).locationLabel ?? ''),
		titleBefore: str((d as {titleBefore?: string}).titleBefore, (defaults as {titleBefore?: string}).titleBefore ?? ''),
		titleEmphasis: str((d as {titleEmphasis?: string}).titleEmphasis, (defaults as {titleEmphasis?: string}).titleEmphasis ?? ''),
		description: str((d as {description?: string}).description, (defaults as {description?: string}).description ?? ''),
		primaryCtaLabel: str((d as {primaryCtaLabel?: string}).primaryCtaLabel, (defaults as {primaryCtaLabel?: string}).primaryCtaLabel ?? ''),
		primaryCtaLink: str((d as {primaryCtaLink?: string}).primaryCtaLink, (defaults as {primaryCtaLink?: string}).primaryCtaLink ?? ''),
		secondaryCtaLabel: str((d as {secondaryCtaLabel?: string}).secondaryCtaLabel, (defaults as {secondaryCtaLabel?: string}).secondaryCtaLabel ?? ''),
		secondaryCtaLink: str((d as {secondaryCtaLink?: string}).secondaryCtaLink, (defaults as {secondaryCtaLink?: string}).secondaryCtaLink ?? ''),
		heroImageUrl: resolveBgUrl(urlForImage(d.heroImage as never), bgKey),
	} as T
}

export function mapHomeBeforeAfterBanner(
	doc: Record<string, unknown> | null,
): HomeBeforeAfterBannerContent {
	if (!doc) return DEFAULT_HOME_BEFORE_AFTER_BANNER
	const d = doc as HomeBeforeAfterBannerContent & {heroBackground?: unknown}
	return {
		isShowed: shown((d as {isShowed?: boolean}).isShowed, DEFAULT_HOME_BEFORE_AFTER_BANNER.isShowed),
		eyebrow: str(d.eyebrow, DEFAULT_HOME_BEFORE_AFTER_BANNER.eyebrow),
		headline: str(d.headline, DEFAULT_HOME_BEFORE_AFTER_BANNER.headline),
		headlineEmphasis: str(d.headlineEmphasis, DEFAULT_HOME_BEFORE_AFTER_BANNER.headlineEmphasis),
		description: str(d.description, DEFAULT_HOME_BEFORE_AFTER_BANNER.description),
		ctaLabel: str(d.ctaLabel, DEFAULT_HOME_BEFORE_AFTER_BANNER.ctaLabel),
		heroBackgroundUrl: resolveBgUrl(urlForImage(d.heroBackground as never), 'homeBeforeAfter'),
	}
}

export function mapPortfolioPage(doc: Record<string, unknown> | null): PortfolioPageContent {
	if (!doc) return DEFAULT_PORTFOLIO_PAGE
	const base = mapPageHero(doc, DEFAULT_PORTFOLIO_PAGE, 'portfolioHero')
	return {...base, stats: mapStats((doc as PortfolioPageContent).stats as never, DEFAULT_PORTFOLIO_PAGE.stats)}
}

export function mapServicesPage(doc: Record<string, unknown> | null): ServicesPageContent {
	if (!doc) return DEFAULT_SERVICES_PAGE
	const d = doc as ServicesPageContent & {heroImage?: unknown; processHeroBackground?: unknown}
	const base = mapPageHero(doc, DEFAULT_SERVICES_PAGE, 'servicesHero')

	const processSteps = ((d as {processSteps?: ServiceProcessStep[]}).processSteps ?? [])
		.filter((s) => s?.title)
		.map((s, i) => {
			const fb = DEFAULT_SERVICES_PAGE.processSteps[i] ?? DEFAULT_SERVICES_PAGE.processSteps[0]
			return {
				icon: str(s.icon, fb.icon),
				title: str(s.title, fb.title),
				body: str(s.body, fb.body),
			}
		})

	const pricingCards = ((d as {pricingCards?: PricingHintCard[]}).pricingCards ?? [])
		.filter((c) => c?.title)
		.map((c, i) => {
			const fb = DEFAULT_SERVICES_PAGE.pricingCards[i] ?? DEFAULT_SERVICES_PAGE.pricingCards[0]
			return {icon: str(c.icon, fb.icon), title: str(c.title, fb.title), body: str(c.body, fb.body)}
		})

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
		processHeroBackgroundUrl: resolveBgUrl(urlForImage(d.processHeroBackground as never), 'servicesProcess'),
		processEyebrow: str((d as {processEyebrow?: string}).processEyebrow, DEFAULT_SERVICES_PAGE.processEyebrow),
		processHeadline: str((d as {processHeadline?: string}).processHeadline, DEFAULT_SERVICES_PAGE.processHeadline),
		processHeadlineEmphasis: str((d as {processHeadlineEmphasis?: string}).processHeadlineEmphasis, DEFAULT_SERVICES_PAGE.processHeadlineEmphasis),
		processDescription: str((d as {processDescription?: string}).processDescription, DEFAULT_SERVICES_PAGE.processDescription),
		processSteps: processSteps.length ? processSteps : DEFAULT_SERVICES_PAGE.processSteps,
		pricingEyebrow: str((d as {pricingEyebrow?: string}).pricingEyebrow, DEFAULT_SERVICES_PAGE.pricingEyebrow),
		pricingHeadline: str((d as {pricingHeadline?: string}).pricingHeadline, DEFAULT_SERVICES_PAGE.pricingHeadline),
		pricingHeadlineEmphasis: str((d as {pricingHeadlineEmphasis?: string}).pricingHeadlineEmphasis, DEFAULT_SERVICES_PAGE.pricingHeadlineEmphasis),
		pricingBody: str((d as {pricingBody?: string}).pricingBody, DEFAULT_SERVICES_PAGE.pricingBody),
		pricingCards: pricingCards.length ? pricingCards : DEFAULT_SERVICES_PAGE.pricingCards,
		faqEyebrow: str((d as {faqEyebrow?: string}).faqEyebrow, DEFAULT_SERVICES_PAGE.faqEyebrow),
		faqTitle: str((d as {faqTitle?: string}).faqTitle, DEFAULT_SERVICES_PAGE.faqTitle),
		faqTitleEmphasis: str((d as {faqTitleEmphasis?: string}).faqTitleEmphasis, DEFAULT_SERVICES_PAGE.faqTitleEmphasis),
		faqSub: str((d as {faqSub?: string}).faqSub, DEFAULT_SERVICES_PAGE.faqSub),
		faqItems: faqItems.length ? faqItems : DEFAULT_SERVICES_PAGE.faqItems,
	}
}

export function mapAboutPage(doc: Record<string, unknown> | null): AboutPageContent {
	if (!doc) return DEFAULT_ABOUT_PAGE
	const base = mapPageHero(doc, DEFAULT_ABOUT_PAGE, 'aboutHero')
	const d = doc as AboutPageContent & {valuesHeroBackground?: unknown; whyBannerBackground?: unknown}

	const timeline = ((d as {timeline?: TimelineItem[]}).timeline ?? [])
		.filter((t) => t?.year && t?.title)
		.map((t, i) => {
			const fb = DEFAULT_ABOUT_PAGE.timeline[i] ?? DEFAULT_ABOUT_PAGE.timeline[0]
			return {year: str(t.year, fb.year), title: str(t.title, fb.title), text: str(t.text, fb.text), highlight: Boolean(t.highlight)}
		})

	const valueCards = ((d as {valueCards?: ValueCard[]}).valueCards ?? [])
		.filter((v) => v?.title)
		.map((v, i) => {
			const fb = DEFAULT_ABOUT_PAGE.valueCards[i] ?? DEFAULT_ABOUT_PAGE.valueCards[0]
			return {icon: str(v.icon, fb.icon), num: str(v.num, fb.num), title: str(v.title, fb.title), body: str(v.body, fb.body)}
		})

	const teamMembers = ((d as {teamMembers?: (TeamMember & {photo?: unknown})[]}).teamMembers ?? [])
		.filter((m) => m?.name)
		.map((m, i) => {
			const fb = DEFAULT_ABOUT_PAGE.teamMembers[i] ?? DEFAULT_ABOUT_PAGE.teamMembers[0]
			return {
				name: str(m.name, fb.name),
				role: str(m.role, fb.role),
				bio: str(m.bio, fb.bio),
				photoUrl: urlForImage(m.photo as never, 400) ?? fb.photoUrl,
			}
		})

	const whyRows = ((d as {whyRows?: (WhyRow & {image?: unknown})[]}).whyRows ?? [])
		.filter((r) => r?.title)
		.map((r, i) => {
			const fb = DEFAULT_ABOUT_PAGE.whyRows[i] ?? DEFAULT_ABOUT_PAGE.whyRows[0]
			return {
				num: str(r.num, fb.num),
				label: str(r.label, fb.label),
				title: str(r.title, fb.title),
				body: str(r.body, fb.body),
				pills: (r.pills ?? fb.pills).filter(Boolean),
				imageUrl: urlForImage(r.image as never, 900) ?? fb.imageUrl,
				imageAlt: str(r.imageAlt, fb.imageAlt),
			}
		})

	const certBadges = ((d as {certBadges?: CertBadge[]}).certBadges ?? [])
		.filter((b) => b?.name)
		.map((b, i) => {
			const fb = DEFAULT_ABOUT_PAGE.certBadges[i] ?? DEFAULT_ABOUT_PAGE.certBadges[0]
			return {icon: str(b.icon, fb.icon), name: str(b.name, fb.name)}
		})

	const guaranteeCards = ((d as {guaranteeCards?: GuaranteeCard[]}).guaranteeCards ?? [])
		.filter((g) => g?.title)
		.map((g, i) => {
			const fb = DEFAULT_ABOUT_PAGE.guaranteeCards[i] ?? DEFAULT_ABOUT_PAGE.guaranteeCards[0]
			return {icon: str(g.icon, fb.icon), title: str(g.title, fb.title), text: str(g.text, fb.text)}
		})

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
		valuesHeroBackgroundUrl: resolveBgUrl(urlForImage(d.valuesHeroBackground as never), 'aboutValues'),
		whyBannerBackgroundUrl: resolveBgUrl(urlForImage(d.whyBannerBackground as never), 'aboutWhy'),
		founderInitial: str(d.founderInitial, DEFAULT_ABOUT_PAGE.founderInitial),
		founderName: str(d.founderName, DEFAULT_ABOUT_PAGE.founderName),
		founderRole: str(d.founderRole, DEFAULT_ABOUT_PAGE.founderRole),
		founderQuote: str(d.founderQuote, DEFAULT_ABOUT_PAGE.founderQuote),
		founderStats: mapStats(d.founderStats as never, DEFAULT_ABOUT_PAGE.founderStats),
		// Who We Are
		whoEyebrow: str((d as {whoEyebrow?: string}).whoEyebrow, DEFAULT_ABOUT_PAGE.whoEyebrow),
		whoHeadline: str((d as {whoHeadline?: string}).whoHeadline, DEFAULT_ABOUT_PAGE.whoHeadline),
		whoHeadlineEmphasis: str((d as {whoHeadlineEmphasis?: string}).whoHeadlineEmphasis, DEFAULT_ABOUT_PAGE.whoHeadlineEmphasis),
		whoLead: str((d as {whoLead?: string}).whoLead, DEFAULT_ABOUT_PAGE.whoLead),
		whoBody: ((d as {whoBody?: string[]}).whoBody ?? []).filter(Boolean).length ? (d as {whoBody?: string[]}).whoBody!.filter(Boolean) : DEFAULT_ABOUT_PAGE.whoBody,
		whoPills: ((d as {whoPills?: string[]}).whoPills ?? []).filter(Boolean).length ? (d as {whoPills?: string[]}).whoPills!.filter(Boolean) : DEFAULT_ABOUT_PAGE.whoPills,
		whoCtaLabel: str((d as {whoCtaLabel?: string}).whoCtaLabel, DEFAULT_ABOUT_PAGE.whoCtaLabel),
		whoCtaLink: str((d as {whoCtaLink?: string}).whoCtaLink, DEFAULT_ABOUT_PAGE.whoCtaLink),
		// Story
		storyEyebrow: str((d as {storyEyebrow?: string}).storyEyebrow, DEFAULT_ABOUT_PAGE.storyEyebrow),
		storyHeadline: str((d as {storyHeadline?: string}).storyHeadline, DEFAULT_ABOUT_PAGE.storyHeadline),
		storyHeadlineEmphasis: str((d as {storyHeadlineEmphasis?: string}).storyHeadlineEmphasis, DEFAULT_ABOUT_PAGE.storyHeadlineEmphasis),
		storyLead: str((d as {storyLead?: string}).storyLead, DEFAULT_ABOUT_PAGE.storyLead),
		timeline: timeline.length ? timeline : DEFAULT_ABOUT_PAGE.timeline,
		// Values
		valuesEyebrow: str((d as {valuesEyebrow?: string}).valuesEyebrow, DEFAULT_ABOUT_PAGE.valuesEyebrow),
		valuesHeadline: str((d as {valuesHeadline?: string}).valuesHeadline, DEFAULT_ABOUT_PAGE.valuesHeadline),
		valuesHeadlineEmphasis: str((d as {valuesHeadlineEmphasis?: string}).valuesHeadlineEmphasis, DEFAULT_ABOUT_PAGE.valuesHeadlineEmphasis),
		valuesDescription: str((d as {valuesDescription?: string}).valuesDescription, DEFAULT_ABOUT_PAGE.valuesDescription),
		valueCards: valueCards.length ? valueCards : DEFAULT_ABOUT_PAGE.valueCards,
		// Team
		teamEyebrow: str((d as {teamEyebrow?: string}).teamEyebrow, DEFAULT_ABOUT_PAGE.teamEyebrow),
		teamHeadline: str((d as {teamHeadline?: string}).teamHeadline, DEFAULT_ABOUT_PAGE.teamHeadline),
		teamHeadlineEmphasis: str((d as {teamHeadlineEmphasis?: string}).teamHeadlineEmphasis, DEFAULT_ABOUT_PAGE.teamHeadlineEmphasis),
		teamDescription: str((d as {teamDescription?: string}).teamDescription, DEFAULT_ABOUT_PAGE.teamDescription),
		teamMembers: teamMembers.length ? teamMembers : DEFAULT_ABOUT_PAGE.teamMembers,
		// Why Us
		whyEyebrow: str((d as {whyEyebrow?: string}).whyEyebrow, DEFAULT_ABOUT_PAGE.whyEyebrow),
		whyBannerHeadline: str((d as {whyBannerHeadline?: string}).whyBannerHeadline, DEFAULT_ABOUT_PAGE.whyBannerHeadline),
		whyBannerHeadlineEmphasis: str((d as {whyBannerHeadlineEmphasis?: string}).whyBannerHeadlineEmphasis, DEFAULT_ABOUT_PAGE.whyBannerHeadlineEmphasis),
		whyBannerDescription: str((d as {whyBannerDescription?: string}).whyBannerDescription, DEFAULT_ABOUT_PAGE.whyBannerDescription),
		whyRows: whyRows.length ? whyRows : DEFAULT_ABOUT_PAGE.whyRows,
		// Certifications
		certEyebrow: str((d as {certEyebrow?: string}).certEyebrow, DEFAULT_ABOUT_PAGE.certEyebrow),
		certHeadline: str((d as {certHeadline?: string}).certHeadline, DEFAULT_ABOUT_PAGE.certHeadline),
		certHeadlineEmphasis: str((d as {certHeadlineEmphasis?: string}).certHeadlineEmphasis, DEFAULT_ABOUT_PAGE.certHeadlineEmphasis),
		certDescription: str((d as {certDescription?: string}).certDescription, DEFAULT_ABOUT_PAGE.certDescription),
		certBadges: certBadges.length ? certBadges : DEFAULT_ABOUT_PAGE.certBadges,
		guaranteeCards: guaranteeCards.length ? guaranteeCards : DEFAULT_ABOUT_PAGE.guaranteeCards,
	}
}

export function mapReviewsPage(doc: Record<string, unknown> | null): ReviewsPageContent {
	if (!doc) return DEFAULT_REVIEWS_PAGE
	const d = doc as ReviewsPageContent & {heroImage?: unknown}
	return {
		heroImageUrl: resolveBgUrl(urlForImage(d.heroImage as never), 'reviewsHero'),
	}
}

export function mapContactsPage(doc: Record<string, unknown> | null): ContactsPageContent {
	if (!doc) return DEFAULT_CONTACTS_PAGE
	const d = doc as ContactsPageContent & {heroImage?: unknown}
	return {
		eyebrow: str(d.eyebrow, DEFAULT_CONTACTS_PAGE.eyebrow),
		titleBefore: str(d.titleBefore, DEFAULT_CONTACTS_PAGE.titleBefore),
		titleEmphasis: str(d.titleEmphasis, DEFAULT_CONTACTS_PAGE.titleEmphasis),
		description: str(d.description, DEFAULT_CONTACTS_PAGE.description),
		heroImageUrl: resolveBgUrl(urlForImage(d.heroImage as never), 'contactsHero'),
		formEyebrow: str(d.formEyebrow, DEFAULT_CONTACTS_PAGE.formEyebrow),
		formTitleBefore: str(d.formTitleBefore, DEFAULT_CONTACTS_PAGE.formTitleBefore),
		formTitleEmphasis: str(d.formTitleEmphasis, DEFAULT_CONTACTS_PAGE.formTitleEmphasis),
		formSubtext: str(d.formSubtext, DEFAULT_CONTACTS_PAGE.formSubtext),
	}
}

export function mapServicesList(docs: Record<string, unknown>[]): ServiceDetail[] {
	return docs
		.map((doc) => {
			const d = doc as {
				id?: string
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
		ogImageUrl: pageOgImageUrl ?? defaultOgImageUrl ?? fallback.ogImageUrl,
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
	const mapped = mapBeforeAfter(docs)
	return mapped.length ? mapped : DEFAULT_BEFORE_AFTER
}

export async function getPortfolioProjects() {
	const docs = await safeFetch(PORTFOLIO_PROJECTS_Q, [] as Record<string, unknown>[])
	return docs.map(mapPortfolioProject).filter((p): p is PortfolioProject => Boolean(p))
}

export async function getHomePortfolio() {
	const rawProjects = await safeFetch(PORTFOLIO_PROJECTS_Q, [] as Record<string, unknown>[])
	const featured = mapFeaturedSlides(rawProjects)
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
	const mapped = mapServicesList(docs)
	return mapped.length ? mapped : DEFAULT_SERVICES
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
		getTestimonialSlides(),
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
