/// <reference types="@sanity/astro/module" />
import {sanityClient} from 'sanity:client'
import {defineQuery} from 'groq'
import {urlForImage} from './image'
import {resolveBgUrl, type BackgroundKey} from './backgrounds'
import {
	DEFAULT_ABOUT_PAGE,
	DEFAULT_BEFORE_AFTER,
	DEFAULT_CONTACTS_PAGE,
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
	DEFAULT_SERVICES_PAGE,
	DEFAULT_SITE_SETTINGS,
} from './defaults'
import type {
	AboutPageContent,
	AboutRow,
	BeforeAfterSlide,
	ContactsPageContent,
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
	PortfolioPageContent,
	PortfolioProject,
	PortfolioSlide,
	ServicesPageContent,
	SiteSettingsContent,
	TestimonialSlide,
} from './types'

const str = (v?: string | null, fallback = '') => (v?.trim() ? v.trim() : fallback)

// ── Queries ─────────────────────────────────────────────────────────────────

const HERO_Q = defineQuery(`coalesce(*[_id == "hero"][0], *[_type == "hero"][0]){
  locationLabel, titleLine1, titleLine2, titleSub, description,
  primaryCtaLabel, secondaryCtaLabel, formTitle, formSubtext, formNote,
  backgroundImage{ asset, alt }
}`)

const SITE_Q = defineQuery(`*[_id == "siteSettings"][0]{
  footerDescription, phone, phoneHours, email, emailNote,
  whatsapp, whatsappNote, serviceArea, serviceAreaNote,
  instagramUrl, facebookUrl, houzzUrl
}`)

const NUMBERS_Q = defineQuery(`*[_id == "homeNumbers"][0]{ eyebrow, headline, stats }`)

const SERVICES_HOME_Q = defineQuery(`*[_id == "homeServices"][0]{
  eyebrow, title, titleAccent,
  cards[]{ name, link, image{ asset, alt } }
}`)

const ABOUT_HOME_Q = defineQuery(`*[_id == "homeAbout"][0]{
  eyebrow, headline, headlineEmphasis, heroDescription, heroCtaLabel, heroCtaLink,
  heroImage{ asset, alt },
  rows[]{
    label, headingBefore, headingEmphasis, paragraphs, pills, reverse, imageAlt,
    image{ asset, alt }
  }
}`)

const PORTFOLIO_HOME_Q = defineQuery(`*[_id == "homePortfolio"][0]{
  eyebrow, headline, headlineEmphasis, description, ctaLabel, ctaLink, useFeaturedProjects,
  heroImage{ asset, alt },
  cards[]{ tag, title, meta, image{ asset, alt } }
}`)

const PROCESS_Q = defineQuery(`*[_id == "homeProcess"][0]{
  eyebrow, headline, headlineEmphasis, description, ctaLabel,
  heroImage{ asset, alt },
  steps[]{ num, title, description, arrow }
}`)

const PRICING_Q = defineQuery(`*[_id == "homePricing"][0]{
  eyebrow, headline, headlineEmphasis, heroDescription, heroCtaLabel,
  heroImage{ asset, alt },
  introTitle, introText,
  factors[]{ num, title, description },
  ctaLabel, ctaTitle, ctaSubtext, ctaPrimaryLabel, ctaSecondaryLabel
}`)

const CONTACT_HOME_Q = defineQuery(`*[_id == "homeContact"][0]{
  eyebrow, headline, headlineEmphasis, lead, ctaLabel, formTitle, formSubtext,
  photo{ asset, alt }, photoAlt
}`)

const HOME_BEFORE_AFTER_BANNER_Q = defineQuery(`*[_id == "homeBeforeAfter"][0]{
  eyebrow, headline, headlineEmphasis, description, ctaLabel,
  heroBackground{ asset, alt }
}`)

const TESTIMONIALS_Q = defineQuery(`*[_type == "testimonial"] | order(sortOrder asc, _createdAt asc){
  name, meta, quote, initial, rating
}`)

const BEFORE_AFTER_Q = defineQuery(`*[_type == "beforeAfterProject"] | order(sortOrder asc, _createdAt asc){
  name, location, duration, year,
  beforeImage{ asset, alt }, afterImage{ asset, alt }
}`)

const PORTFOLIO_PROJECTS_Q = defineQuery(`*[_type == "portfolioProject"] | order(sortOrder asc, _createdAt asc){
  "id": slug.current, num, category, name, tags, location, duration, year, description,
  specs[]{ key, val },
  gallery[]{ alt, asset },
  beforeImage{ asset, alt }, afterImage{ asset, alt },
  featuredOnHome, homeTag, homeMeta
}`)

const SERVICES_PAGE_Q = defineQuery(`*[_id == "servicesPage"][0]{
  locationLabel, titleBefore, titleEmphasis, description,
  primaryCtaLabel, primaryCtaLink, secondaryCtaLabel, secondaryCtaLink,
  heroImage{ asset, alt },
  processHeroBackground{ asset, alt }
}`)

const PORTFOLIO_PAGE_Q = defineQuery(`*[_id == "portfolioPage"][0]{
  locationLabel, titleBefore, titleEmphasis, description,
  primaryCtaLabel, primaryCtaLink, secondaryCtaLabel, secondaryCtaLink,
  heroImage{ asset, alt }, stats
}`)

const ABOUT_PAGE_Q = defineQuery(`*[_id == "aboutPage"][0]{
  locationLabel, titleBefore, titleEmphasis, description,
  primaryCtaLabel, primaryCtaLink, secondaryCtaLabel, secondaryCtaLink,
  heroImage{ asset, alt },
  valuesHeroBackground{ asset, alt },
  whyBannerBackground{ asset, alt },
  founderInitial, founderName, founderRole, founderQuote, founderStats
}`)

const CONTACTS_PAGE_Q = defineQuery(`*[_id == "contactsPage"][0]{
  eyebrow, titleBefore, titleEmphasis, description, heroImage{ asset, alt },
  formEyebrow, formTitleBefore, formTitleEmphasis, formSubtext
}`)

// ── Mappers ─────────────────────────────────────────────────────────────────

export function mapHero(doc: Record<string, unknown> | null): HeroContent {
	if (!doc) return DEFAULT_HERO
	const d = doc as HeroContent & {backgroundImage?: {alt?: string}}
	return {
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
		footerDescription: str(d.footerDescription, DEFAULT_SITE_SETTINGS.footerDescription),
		phone: str(d.phone, DEFAULT_SITE_SETTINGS.phone),
		phoneHours: str(d.phoneHours, DEFAULT_SITE_SETTINGS.phoneHours),
		email: str(d.email, DEFAULT_SITE_SETTINGS.email),
		emailNote: str(d.emailNote, DEFAULT_SITE_SETTINGS.emailNote),
		whatsapp: str(d.whatsapp, DEFAULT_SITE_SETTINGS.whatsapp),
		whatsappNote: str(d.whatsappNote, DEFAULT_SITE_SETTINGS.whatsappNote),
		serviceArea: str(d.serviceArea, DEFAULT_SITE_SETTINGS.serviceArea),
		serviceAreaNote: str(d.serviceAreaNote, DEFAULT_SITE_SETTINGS.serviceAreaNote),
		instagramUrl: str(d.instagramUrl, DEFAULT_SITE_SETTINGS.instagramUrl),
		facebookUrl: str(d.facebookUrl, DEFAULT_SITE_SETTINGS.facebookUrl),
		houzzUrl: str(d.houzzUrl, DEFAULT_SITE_SETTINGS.houzzUrl),
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
				num: str(s.num, fb.num),
				title: str(s.title, fb.title),
				description: str(s.description, fb.description),
				arrow: str(s.arrow, fb.arrow),
			}
		})
	return {
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
		category?: string
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
	const after = urlForImage(d.afterImage as never, 1400)
	const before = urlForImage(d.beforeImage as never, 1400)
	if (!d.name || !after || !before) return null
	const cat = d.category as PortfolioProject['category']
	const category =
		cat === 'kitchen' || cat === 'bathroom' || cat === 'living' || cat === 'full' ? cat : 'full'
	const gallery = (d.gallery ?? [])
		.map((g) => {
			const src = urlForImage(g as never, 1200)
			return src ? {src, alt: str(g.alt, d.name)} : null
		})
		.filter((g): g is {src: string; alt: string} => Boolean(g))
	return {
		id: str(d.id, `project-${index + 1}`),
		num: str(d.num, String(index + 1).padStart(2, '0')),
		category,
		name: d.name,
		tags: (d.tags ?? []).filter(Boolean),
		location: str(d.location),
		duration: str(d.duration),
		year: str(d.year),
		description: str(d.description),
		specs: (d.specs ?? [])
			.filter((s) => s.key && s.val)
			.map((s) => ({key: str(s.key), val: str(s.val)})),
		gallery: gallery.length ? gallery : [{src: after, alt: d.name}],
		baAfter: after,
		baBefore: before,
	}
}

export function mapFeaturedSlides(docs: Record<string, unknown>[]): PortfolioSlide[] {
	return docs
		.filter((d) => (d as {featuredOnHome?: boolean}).featuredOnHome)
		.map((doc) => {
			const d = doc as {homeTag?: string; name?: string; homeMeta?: string; afterImage?: unknown; category?: string}
			const imageUrl = urlForImage(d.afterImage as never, 900)
			if (!d.name || !imageUrl) return null
			return {
				tag: str(d.homeTag, d.category ?? 'Project'),
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
	return {
		...base,
		processHeroBackgroundUrl: resolveBgUrl(
			urlForImage(d.processHeroBackground as never),
			'servicesProcess',
		),
	}
}

export function mapAboutPage(doc: Record<string, unknown> | null): AboutPageContent {
	if (!doc) return DEFAULT_ABOUT_PAGE
	const base = mapPageHero(doc, DEFAULT_ABOUT_PAGE, 'aboutHero')
	const d = doc as AboutPageContent & {valuesHeroBackground?: unknown; whyBannerBackground?: unknown}
	return {
		...base,
		valuesHeroBackgroundUrl: resolveBgUrl(
			urlForImage(d.valuesHeroBackground as never),
			'aboutValues',
		),
		whyBannerBackgroundUrl: resolveBgUrl(
			urlForImage(d.whyBannerBackground as never),
			'aboutWhy',
		),
		founderInitial: str(d.founderInitial, DEFAULT_ABOUT_PAGE.founderInitial),
		founderName: str(d.founderName, DEFAULT_ABOUT_PAGE.founderName),
		founderRole: str(d.founderRole, DEFAULT_ABOUT_PAGE.founderRole),
		founderQuote: str(d.founderQuote, DEFAULT_ABOUT_PAGE.founderQuote),
		founderStats: mapStats(d.founderStats as never, DEFAULT_ABOUT_PAGE.founderStats),
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
	return mapServicesPage(await safeFetch(SERVICES_PAGE_Q, null))
}

export async function getPortfolioPage() {
	return mapPortfolioPage(await safeFetch(PORTFOLIO_PAGE_Q, null))
}

export async function getAboutPage() {
	return mapAboutPage(await safeFetch(ABOUT_PAGE_Q, null))
}

export async function getContactsPage() {
	return mapContactsPage(await safeFetch(CONTACTS_PAGE_Q, null))
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
