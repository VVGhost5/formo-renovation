import type {
	AboutPageContent,
	BeforeAfterSlide,
	ContactsPageContent,
	HomeAboutContent,
	HomeBeforeAfterBannerContent,
	HomeContactContent,
	HomeNumbersContent,
	HomePortfolioContent,
	HomePricingContent,
	HomeProcessContent,
	HomeServicesContent,
	HeroContent,
	PortfolioPageContent,
	ReviewsPageContent,
	ServiceDetail,
	ServicesPageContent,
	SiteSettingsContent,
	PageSeo,
	SiteMetadataPageKey,
} from './types'

export const DEFAULT_HERO: HeroContent = {
	isShowed: true,
	locationLabel: '',
	titleLine1: '',
	description: '',
	primaryCtaLabel: '',
	secondaryCtaLabel: '',
	formTitle: '',
	formSubtext: '',
	formNote: '',
	backgroundImageUrl: '',
	backgroundImageAlt: null,
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsContent = {
	testimonialsIsShowed: true,
	testimonialsBackgroundUrl: '',
	testimonialsBackgroundAlt: null,
	footerDescription: '',
	phone: '',
	phoneHours: '',
	officeWeekdayHours: '',
	email: '',
	emailNote: '',
	notificationEmail: '',
	whatsapp: '',
	whatsappNote: '',
	serviceArea: '',
	serviceAreaNote: '',
	instagramUrl: '',
	facebookUrl: '',
	houzzUrl: '',
	homestarsUrl: '',
}

export const DEFAULT_PAGE_SEO: Record<SiteMetadataPageKey, PageSeo> = {
	home: {
		title: 'Formo Renovations — Design & Renovation Solutions',
		description:
			'Premium renovation and interior finishing solutions for homes across Victoria and Vancouver Island, BC.',
		ogImageUrl: null,
		jsonLd: '',
	},
	aboutUs: {
		title: 'About Us — Formo Renovations',
		description:
			'Learn the story behind Formo Renovations — our team, values, and commitment to quality craftsmanship across Victoria and Vancouver Island, BC since 2016.',
		ogImageUrl: null,
		jsonLd: '',
	},
	services: {
		title: 'Our Services — Formo Renovations',
		description:
			'Full-range renovation and interior finishing services for Victoria and Vancouver Island — bathrooms, kitchens, flooring, full home renovations, and more.',
		ogImageUrl: null,
		jsonLd: '',
	},
	portfolio: {
		title: 'Portfolio — Formo Renovations',
		description:
			'Browse our completed renovation projects across Victoria and Vancouver Island, BC — kitchens, bathrooms, living rooms, and full apartment transformations.',
		ogImageUrl: null,
		jsonLd: '',
	},
	reviews: {
		title: 'Client Reviews — Formo Renovations',
		description:
			'Read genuine client reviews from homeowners across Victoria and Vancouver Island, BC. Share your own experience with Formo Renovations.',
		ogImageUrl: null,
		jsonLd: '',
	},
	contacts: {
		title: 'Contact Us — Formo Renovations',
		description:
			'Get in touch with Formo Renovations. Free on-site consultations across Victoria and Vancouver Island, BC. Call, email, or fill in the form.',
		ogImageUrl: null,
		jsonLd: '',
	},
}

export const DEFAULT_HOME_NUMBERS: HomeNumbersContent = {
	isShowed: true,
	eyebrow: '',
	headline: '',
	stats: [],
}

export const DEFAULT_HOME_SERVICES: HomeServicesContent = {
	isShowed: true,
	eyebrow: '',
	title: '',
	titleAccent: '',
	cards: [],
}

export const DEFAULT_HOME_ABOUT: HomeAboutContent = {
	isShowed: true,
	eyebrow: '',
	headline: '',
	headlineEmphasis: '',
	heroDescription: '',
	heroCtaLabel: '',
	heroCtaLink: '',
	heroImageUrl: '',
	rows: [],
}

export const DEFAULT_HOME_PORTFOLIO: HomePortfolioContent = {
	isShowed: true,
	eyebrow: '',
	headline: '',
	headlineEmphasis: '',
	description: '',
	ctaLabel: '',
	ctaLink: '',
	heroImageUrl: '',
	projects: [],
}

export const DEFAULT_HOME_PROCESS: HomeProcessContent = {
	isShowed: true,
	eyebrow: '',
	headline: '',
	headlineEmphasis: '',
	description: '',
	ctaLabel: '',
	heroImageUrl: '',
	steps: [],
}

export const DEFAULT_HOME_PRICING: HomePricingContent = {
	isShowed: true,
	eyebrow: '',
	headline: '',
	headlineEmphasis: '',
	heroDescription: '',
	heroCtaLabel: '',
	heroImageUrl: '',
	introTitle: '',
	introText: '',
	factors: [],
	ctaLabel: '',
	ctaTitle: '',
	ctaSubtext: '',
	ctaPrimaryLabel: '',
	ctaSecondaryLabel: '',
}

export const DEFAULT_HOME_CONTACT: HomeContactContent = {
	isShowed: true,
	eyebrow: '',
	headline: '',
	headlineEmphasis: '',
	lead: '',
	ctaLabel: '',
	formTitle: '',
	formSubtext: '',
	photoUrl: '',
	photoAlt: '',
}

export const DEFAULT_HOME_BEFORE_AFTER_BANNER: HomeBeforeAfterBannerContent = {
	isShowed: true,
	eyebrow: '',
	headline: '',
	headlineEmphasis: '',
	description: '',
	ctaLabel: '',
	heroBackgroundUrl: '',
}

export const DEFAULT_BEFORE_AFTER: BeforeAfterSlide[] = []

export const DEFAULT_PORTFOLIO_PAGE: PortfolioPageContent = {
	locationLabel: '',
	titleBefore: '',
	titleEmphasis: '',
	description: '',
	primaryCtaLabel: '',
	primaryCtaLink: '',
	secondaryCtaLabel: '',
	secondaryCtaLink: '',
	heroImageUrl: '',
	stats: [],
}

export const DEFAULT_SERVICES_PAGE: ServicesPageContent = {
	heroIsShowed: true,
	listIsShowed: true,
	processIsShowed: true,
	pricingIsShowed: true,
	faqIsShowed: true,
	locationLabel: '',
	titleBefore: '',
	titleEmphasis: '',
	description: '',
	primaryCtaLabel: '',
	primaryCtaLink: '',
	secondaryCtaLabel: '',
	secondaryCtaLink: '',
	heroImageUrl: '',
	processHeroBackgroundUrl: '',
	processEyebrow: '',
	processHeadline: '',
	processHeadlineEmphasis: '',
	processDescription: '',
	processSteps: [],
	pricingEyebrow: '',
	pricingHeadline: '',
	pricingHeadlineEmphasis: '',
	pricingBody: '',
	pricingCards: [],
	faqEyebrow: '',
	faqTitle: '',
	faqTitleEmphasis: '',
	faqSub: '',
	faqItems: [],
}

export const DEFAULT_ABOUT_PAGE: AboutPageContent = {
	heroIsShowed: true,
	founderCardIsShowed: false,
	whoIsShowed: true,
	storyIsShowed: false,
	valuesIsShowed: true,
	teamIsShowed: false,
	whyIsShowed: true,
	certIsShowed: true,
	locationLabel: '',
	titleBefore: '',
	titleEmphasis: '',
	description: '',
	primaryCtaLabel: '',
	primaryCtaLink: '',
	secondaryCtaLabel: '',
	secondaryCtaLink: '',
	heroImageUrl: '',
	valuesHeroBackgroundUrl: '',
	whyBannerBackgroundUrl: '',
	founderInitial: '',
	founderName: '',
	founderRole: '',
	founderQuote: '',
	founderStats: [],
	whoEyebrow: '',
	whoHeadline: '',
	whoHeadlineEmphasis: '',
	whoLead: '',
	whoBody: [],
	whoPills: [],
	whoCtaLabel: '',
	whoCtaLink: '',
	storyEyebrow: '',
	storyHeadline: '',
	storyHeadlineEmphasis: '',
	storyLead: '',
	timeline: [],
	valuesEyebrow: '',
	valuesHeadline: '',
	valuesHeadlineEmphasis: '',
	valuesDescription: '',
	valueCards: [],
	teamEyebrow: '',
	teamHeadline: '',
	teamHeadlineEmphasis: '',
	teamDescription: '',
	teamMembers: [],
	whyEyebrow: '',
	whyBannerHeadline: '',
	whyBannerHeadlineEmphasis: '',
	whyBannerDescription: '',
	whyRows: [],
	certEyebrow: '',
	certHeadline: '',
	certHeadlineEmphasis: '',
	certDescription: '',
	certBadges: [],
	guaranteeCards: [],
}

export const DEFAULT_REVIEWS_PAGE: ReviewsPageContent = {
	heroImageUrl: '',
}

export const DEFAULT_CONTACTS_PAGE: ContactsPageContent = {
	eyebrow: '',
	titleBefore: '',
	titleEmphasis: '',
	description: '',
	heroImageUrl: '',
	formEyebrow: '',
	formTitleBefore: '',
	formTitleEmphasis: '',
	formSubtext: '',
}

export const DEFAULT_SERVICES: ServiceDetail[] = []
