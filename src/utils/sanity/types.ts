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
	notificationEmail: string
	whatsapp: string
	whatsappNote: string
	serviceArea: string
	serviceAreaNote: string
	instagramUrl: string
	facebookUrl: string
	houzzUrl: string
	homestarsUrl: string
}

export type SiteMetadataPageKey =
	| 'home'
	| 'aboutUs'
	| 'services'
	| 'portfolio'
	| 'reviews'
	| 'contacts'

export type PageSeo = {
	title: string
	description: string
	ogImageUrl: string | null
	jsonLd: string
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

// ── About Page ───────────────────────────────────────────────────────────────

export type AboutStatItem = {
	value: string
	suffix?: string
	label: string
	description: string
}

export type TimelineItem = {
	year: string
	title: string
	text: string
	highlight?: boolean
}

export type ValueCard = {
	icon: string
	num: string
	title: string
	body: string
}

export type TeamMember = {
	name: string
	role: string
	bio: string
	photoUrl: string
}

export type WhyRow = {
	num: string
	label: string
	title: string
	body: string
	pills: string[]
	imageUrl: string
	imageAlt: string
}

export type CertBadge = {
	icon: string
	name: string
}

export type GuaranteeCard = {
	icon: string
	title: string
	text: string
}

export type AboutPageContent = PageHeroContent & {
	valuesHeroBackgroundUrl: string
	whyBannerBackgroundUrl: string
	founderInitial: string
	founderName: string
	founderRole: string
	founderQuote: string
	founderStats: Stat[]
	// Who We Are
	whoEyebrow: string
	whoHeadline: string
	whoHeadlineEmphasis: string
	whoLead: string
	whoBody: string[]
	whoPills: string[]
	whoCtaLabel: string
	whoCtaLink: string
	// Numbers
	aboutStats: AboutStatItem[]
	// Our Story
	storyEyebrow: string
	storyHeadline: string
	storyHeadlineEmphasis: string
	storyLead: string
	timeline: TimelineItem[]
	// Values
	valuesEyebrow: string
	valuesHeadline: string
	valuesHeadlineEmphasis: string
	valuesDescription: string
	valueCards: ValueCard[]
	// Team
	teamEyebrow: string
	teamHeadline: string
	teamHeadlineEmphasis: string
	teamDescription: string
	teamMembers: TeamMember[]
	// Why Us
	whyEyebrow: string
	whyBannerHeadline: string
	whyBannerHeadlineEmphasis: string
	whyBannerDescription: string
	whyRows: WhyRow[]
	// Certifications
	certEyebrow: string
	certHeadline: string
	certHeadlineEmphasis: string
	certDescription: string
	certBadges: CertBadge[]
	guaranteeCards: GuaranteeCard[]
}

// ── Services Page ────────────────────────────────────────────────────────────

export type ServiceProcessStep = {
	num: string
	icon: string
	title: string
	body: string
}

export type PricingHintCard = {
	icon: string
	title: string
	body: string
}

export type FaqItem = {
	question: string
	answer: string
}

export type ServicesPageContent = PageHeroContent & {
	processHeroBackgroundUrl: string
	// Process section
	processEyebrow: string
	processHeadline: string
	processHeadlineEmphasis: string
	processDescription: string
	processSteps: ServiceProcessStep[]
	// Pricing hint
	pricingEyebrow: string
	pricingHeadline: string
	pricingHeadlineEmphasis: string
	pricingBody: string
	pricingCards: PricingHintCard[]
	// FAQ
	faqEyebrow: string
	faqTitle: string
	faqTitleEmphasis: string
	faqSub: string
	faqItems: FaqItem[]
}

export type Review = {
	_id: string
	name: string
	location: string
	service: string
	rating: number
	comment: string
	approved: boolean
	_createdAt: string
}

export type ServiceDetail = {
	id: string
	num: string
	icon: string
	stripName: string
	quickName: string
	quickSub: string
	eyebrow: string
	title: string
	lead: string
	includes: string[]
	meta: {key: string; val: string}[]
	imageUrl: string
	imageAlt: string
}

export type PortfolioPageContent = PageHeroContent & {stats: Stat[]}

export type ReviewsPageContent = {
	heroImageUrl: string
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
