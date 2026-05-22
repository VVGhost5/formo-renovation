import type {SanityImageObject} from '@sanity/image-url'

export type SanityImage = (SanityImageObject & {alt?: string | null}) | null | undefined

export type Stat = {value: string; suffix?: string; label: string}

export type HeroContent = {
	locationLabel: string
	titleLine1: string
	titleLine2: string
	titleSub: string
	description: string
	primaryCtaLabel: string
	secondaryCtaLabel: string
	formTitle: string
	formSubtext: string
	formNote: string
	backgroundImageUrl: string
	backgroundImageAlt: string | null
}

export type TestimonialSlide = {
	name: string
	meta: string
	text: string
	initial: string
	rating: number
}

export type SiteSettingsContent = {
	footerDescription: string
	phone: string
	phoneHours: string
	email: string
	emailNote: string
	whatsapp: string
	whatsappNote: string
	serviceArea: string
	serviceAreaNote: string
	instagramUrl: string
	facebookUrl: string
	houzzUrl: string
}

export type HomeNumbersContent = {
	eyebrow: string
	headline: string
	stats: Stat[]
}

export type ServiceCard = {name: string; imageUrl: string; link?: string}

export type HomeServicesContent = {
	eyebrow: string
	title: string
	titleAccent: string
	cards: ServiceCard[]
}

export type AboutRow = {
	label: string
	headingBefore: string
	headingEmphasis: string
	paragraphs: string[]
	pills: string[]
	imageUrl: string
	imageAlt: string
	reverse: boolean
}

export type HomeAboutContent = {
	eyebrow: string
	headline: string
	headlineEmphasis: string
	heroDescription: string
	heroCtaLabel: string
	heroCtaLink: string
	heroImageUrl: string
	rows: AboutRow[]
}

export type PortfolioSlide = {
	tag: string
	title: string
	meta: string
	imageUrl: string
}

export type HomePortfolioContent = {
	eyebrow: string
	headline: string
	headlineEmphasis: string
	description: string
	ctaLabel: string
	ctaLink: string
	heroImageUrl: string
	projects: PortfolioSlide[]
}

export type ProcessStep = {
	num: string
	title: string
	description: string
	arrow: string
}

export type HomeProcessContent = {
	eyebrow: string
	headline: string
	headlineEmphasis: string
	description: string
	ctaLabel: string
	heroImageUrl: string
	steps: ProcessStep[]
}

export type PricingFactor = {num: string; title: string; description: string}

export type HomePricingContent = {
	eyebrow: string
	headline: string
	headlineEmphasis: string
	heroDescription: string
	heroCtaLabel: string
	heroImageUrl: string
	introTitle: string
	introText: string
	factors: PricingFactor[]
	ctaLabel: string
	ctaTitle: string
	ctaSubtext: string
	ctaPrimaryLabel: string
	ctaSecondaryLabel: string
}

export type HomeContactContent = {
	eyebrow: string
	headline: string
	headlineEmphasis: string
	lead: string
	ctaLabel: string
	formTitle: string
	formSubtext: string
	photoUrl: string
	photoAlt: string
}

export type HomeBeforeAfterBannerContent = {
	eyebrow: string
	headline: string
	headlineEmphasis: string
	description: string
	ctaLabel: string
	heroBackgroundUrl: string
}

export type BeforeAfterSlide = {
	name: string
	location: string
	duration: string
	year: string
	before: string
	after: string
}

export type PageHeroContent = {
	locationLabel: string
	titleBefore: string
	titleEmphasis: string
	description: string
	primaryCtaLabel: string
	primaryCtaLink: string
	secondaryCtaLabel: string
	secondaryCtaLink: string
	heroImageUrl: string
}

export type ServicesPageContent = PageHeroContent & {
	processHeroBackgroundUrl: string
}
export type PortfolioPageContent = PageHeroContent & {stats: Stat[]}
export type AboutPageContent = PageHeroContent & {
	valuesHeroBackgroundUrl: string
	whyBannerBackgroundUrl: string
	founderInitial: string
	founderName: string
	founderRole: string
	founderQuote: string
	founderStats: Stat[]
}
export type ContactsPageContent = {
	eyebrow: string
	titleBefore: string
	titleEmphasis: string
	description: string
	heroImageUrl: string
	formEyebrow: string
	formTitleBefore: string
	formTitleEmphasis: string
	formSubtext: string
}

export type PortfolioProject = {
	id: string
	num: string
	category: 'kitchen' | 'bathroom' | 'living' | 'full'
	name: string
	tags: string[]
	location: string
	duration: string
	year: string
	description: string
	specs: {key: string; val: string}[]
	gallery: {src: string; alt: string}[]
	baAfter: string
	baBefore: string
}

export type HomePageContent = {
	hero: HeroContent
	numbers: HomeNumbersContent
	services: HomeServicesContent
	about: HomeAboutContent
	portfolio: HomePortfolioContent
	process: HomeProcessContent
	pricing: HomePricingContent
	contact: HomeContactContent
	testimonials: TestimonialSlide[]
	beforeAfter: BeforeAfterSlide[]
	beforeAfterBanner: HomeBeforeAfterBannerContent
	site: SiteSettingsContent
}
