import type {
	AboutPageContent,
	BeforeAfterSlide,
	ContactsPageContent,
	HomeAboutContent,
	HomeContactContent,
	HomeNumbersContent,
	HomePortfolioContent,
	HomePricingContent,
	HomeProcessContent,
	HomeServicesContent,
	HeroContent,
	PortfolioPageContent,
	PortfolioSlide,
	ServicesPageContent,
	SiteSettingsContent,
} from './types'

export const DEFAULT_HERO: HeroContent = {
	locationLabel: 'Victoria & Vancouver Island',
	titleLine1: 'Premium',
	titleLine2: 'Renovations',
	titleSub: '& Interior Finishing',
	description:
		'We deliver premium renovation and interior finishing solutions that combine craftsmanship, transparent communication, and meticulous quality control — from concept to completion.',
	primaryCtaLabel: 'Get a Free Estimate →',
	secondaryCtaLabel: 'View Our Projects →',
	formTitle: 'Request a Free Estimate',
	formSubtext: "We'll call you back within one business day",
	formNote: 'No commitment — just an honest conversation',
	backgroundImageUrl: null,
	backgroundImageAlt: null,
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsContent = {
	footerDescription:
		'Premium renovation and interior finishing solutions for homes across Victoria and Vancouver Island, BC. European standards. Transparent process.',
	phone: '+1 (250) 000-0000',
	phoneHours: 'Mon – Fri, 8:00 AM – 6:00 PM',
	email: 'hello@formorenovations.ca',
	emailNote: 'Response within 1 business day',
	whatsapp: '+1 (250) 000-0000',
	whatsappNote: 'Quick questions & project photos',
	serviceArea: 'Victoria & Vancouver Island',
	serviceAreaNote: 'BC, Canada',
	instagramUrl: '#',
	facebookUrl: '#',
	houzzUrl: '#',
}

export const DEFAULT_HOME_NUMBERS: HomeNumbersContent = {
	eyebrow: 'By the Numbers',
	headline: '15 years of delivering spaces',
	stats: [
		{value: '150', suffix: '+', label: 'Projects Completed'},
		{value: '98', suffix: '%', label: 'Client Satisfaction'},
		{value: '15', suffix: '+', label: 'Years Experience'},
		{value: '12', suffix: 'mo', label: 'Warranty Included'},
	],
}

export const DEFAULT_HOME_SERVICES: HomeServicesContent = {
	eyebrow: 'Our Services',
	title: 'Comprehensive Renovation',
	titleAccent: '& Interior Finishing Solutions',
	cards: [
		{name: 'Interior Finishing', imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80'},
		{name: 'Bathroom Renovations', imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80'},
		{name: 'Kitchen Renovations', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80'},
		{name: 'Flooring', imageUrl: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=400&q=80'},
		{name: 'Painting', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80'},
		{name: 'Project Management', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80'},
	],
}

export const DEFAULT_HOME_ABOUT: HomeAboutContent = {
	eyebrow: 'About Us',
	headline: 'Built on Craft,',
	headlineEmphasis: 'Driven by Standards',
	heroDescription:
		'We are a Victoria-based renovation company bringing European precision and transparency to every project — from a single room to a full home transformation.',
	heroCtaLabel: 'Read More About Us →',
	heroCtaLink: '/about-us',
	heroImageUrl: null,
	rows: [
		{
			label: 'Our Story',
			headingBefore: 'A decade of ',
			headingEmphasis: 'getting it right',
			paragraphs: [
				'Formo Renovations was founded with a simple belief: renovations should be stress-free. Transparent pricing, honest timelines, and work you can be proud of — every single time.',
				"With over 10 years operating across Victoria and Vancouver Island, we've completed more than 200 projects ranging from bathroom refreshes to complete whole-home transformations.",
			],
			pills: ['Est. 2014', '200+ projects', 'Victoria, BC'],
			imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85',
			imageAlt: 'Our story',
			reverse: false,
		},
		{
			label: 'Our Approach',
			headingBefore: 'European standards, ',
			headingEmphasis: 'local heart',
			paragraphs: [
				'Our team was trained and refined across European renovation markets, where precision and material quality are non-negotiable. We brought those standards home to BC.',
				'Every project gets a dedicated coordinator, a fixed-price contract, and stage-by-stage quality inspections — so you always know exactly where things stand.',
			],
			pills: ['Fixed price', 'Stage QC', 'European finish'],
			imageUrl: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=900&q=85',
			imageAlt: 'Our approach',
			reverse: true,
		},
		{
			label: 'Our Team',
			headingBefore: 'Tradespeople who ',
			headingEmphasis: 'take pride',
			paragraphs: [
				'We work with a carefully selected network of licensed tradespeople — carpenters, tilers, electricians and painters — who share our commitment to quality and reliability.',
				'No subcontractor surprises. Everyone on your project has been personally vetted by our management team and has worked with us on multiple projects.',
			],
			pills: ['Licensed trades', 'Vetted network', 'Insured & bonded'],
			imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85',
			imageAlt: 'Our team',
			reverse: false,
		},
	],
}

export const DEFAULT_HOME_PORTFOLIO: HomePortfolioContent = {
	eyebrow: 'Our Work',
	headline: 'Real Projects,',
	headlineEmphasis: 'Real Transformations',
	description:
		"Every space tells a story. Browse our completed projects — from full-home renovations to carefully detailed finishes — and see what's possible for your home.",
	ctaLabel: 'View Full Portfolio →',
	ctaLink: '/portfolio',
	heroImageUrl: null,
	projects: [
		{tag: 'Full Renovation', title: 'Oak Bay Residence', meta: 'Full renovation · Victoria, BC', imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=82'},
		{tag: 'Kitchen', title: 'Modern Kitchen Remodel', meta: 'Kitchen redesign · Saanich, BC', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80'},
		{tag: 'Bathroom', title: 'Spa Bathroom', meta: 'Bathroom · Langford, BC', imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=80'},
		{tag: 'Living Room', title: 'Contemporary Living Room', meta: 'Interior design · Colwood, BC', imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&q=80'},
		{tag: 'Full Renovation', title: 'Esquimalt Full Reno', meta: 'Complete renovation · Esquimalt, BC', imageUrl: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=700&q=80'},
	],
}

export const DEFAULT_HOME_PROCESS: HomeProcessContent = {
	eyebrow: 'How We Work',
	headline: 'A Clear Process,',
	headlineEmphasis: 'No Surprises',
	description:
		'Eight carefully structured stages that keep you informed, protected, and confident — from the first inquiry to the final walkthrough.',
	ctaLabel: 'Book a Free Consultation →',
	heroImageUrl: null,
	steps: [
		{num: '01', title: 'Inquiry', description: 'You reach out or submit a request. We respond within 24 hours to schedule a first conversation.', arrow: '→'},
		{num: '02', title: 'Free Consultation', description: 'We discuss your vision, scope and goals. No commitment required — this call is completely free.', arrow: '→'},
		{num: '03', title: 'Site Assessment', description: 'We visit the property, take precise measurements and evaluate the full scope of work on-site.', arrow: '→'},
		{num: '04', title: 'Estimate & Proposal', description: 'A detailed, itemised estimate with timeline, materials and full cost breakdown. No hidden fees.', arrow: '→'},
		{num: '05', title: 'Contract Signing', description: 'A clear, fair agreement that protects both parties and outlines every commitment.', arrow: '→'},
		{num: '06', title: 'Execution', description: 'Work begins with our team and vetted tradespeople under full coordination.', arrow: '→'},
		{num: '07', title: 'Quality Checks', description: 'Documented inspections at each stage to ensure standards are met before proceeding.', arrow: '→'},
		{num: '08', title: 'Project Handover', description: 'Final walkthrough, documentation package, and warranty confirmation.', arrow: '✓'},
	],
}

export const DEFAULT_HOME_PRICING: HomePricingContent = {
	eyebrow: 'Pricing',
	headline: 'No Ballpark Figures,',
	headlineEmphasis: 'Just Honest Numbers',
	heroDescription:
		"We don't publish flat rates — every project is unique. But we're fully transparent about what drives the cost, and we always deliver a fixed-price estimate before any work begins.",
	heroCtaLabel: 'Request a Price Estimate →',
	heroImageUrl: null,
	introTitle: 'What shapes the cost of your project',
	introText:
		'Every estimate we produce is itemised line by line — materials, labour, timeline, waste disposal. Below are the main factors that influence the final number. We walk through all of these with you during the free consultation.',
	factors: [
		{num: '01', title: 'Scope & Complexity', description: 'A cosmetic refresh costs very differently from a structural renovation. We assess the full scope on-site before quoting — no assumptions.'},
		{num: '02', title: 'Materials & Finishes', description: 'You choose the tier — budget, mid-range or premium. We present options with clear cost implications so you can decide with full information.'},
		{num: '03', title: 'Square Footage', description: 'Total area, number of rooms and ceiling heights all affect labour and material quantities. We measure precisely during the site visit.'},
		{num: '04', title: 'Trades Required', description: 'Projects involving electrical, plumbing or structural work require licensed tradespeople. We coordinate everything — their fees are included in your estimate.'},
		{num: '05', title: 'Timeline & Scheduling', description: 'Standard schedules are most cost-efficient. Accelerated timelines or strict occupancy constraints may affect crew allocation and cost.'},
		{num: '06', title: 'Site Conditions', description: 'Access restrictions, existing damage discovered on-site, or permit requirements can affect the final number — we always flag these early and transparently.'},
	],
	ctaLabel: 'Free of charge · No obligation',
	ctaTitle: 'Get a precise estimate for your project',
	ctaSubtext:
		'We visit the site, assess the full scope, and deliver a detailed line-by-line breakdown — within two business days. The estimate is fixed: the invoice will match.',
	ctaPrimaryLabel: 'Request a Price Estimate →',
	ctaSecondaryLabel: 'Book a Free Consultation',
}

export const DEFAULT_HOME_CONTACT: HomeContactContent = {
	eyebrow: 'Contact Us',
	headline: "Let's Start",
	headlineEmphasis: 'Your Project',
	lead: "Whether you're ready to begin or just exploring options — reach out. No pressure, just an honest conversation about what you need and how we can help.",
	ctaLabel: 'Book a Free Consultation →',
	formTitle: 'Send Us a Message',
	formSubtext: "We'll get back to you within one business day.",
	photoUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85',
	photoAlt: 'Contact Formo Renovations',
}

export const DEFAULT_BEFORE_AFTER: BeforeAfterSlide[] = [
	{name: 'Kitchen Renovation', location: 'Fairfield, Victoria', duration: '6 weeks', year: '2024', before: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1400&q=85', after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85'},
	{name: 'Bathroom Remodel', location: 'Oak Bay, Victoria', duration: '4 weeks', year: '2024', before: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=1400&q=85', after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&q=85'},
	{name: 'Living Room', location: 'Saanich, BC', duration: '3 weeks', year: '2024', before: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85', after: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=85'},
	{name: 'Full Apartment', location: 'Langford, BC', duration: '12 weeks', year: '2025', before: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=85', after: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1400&q=85'},
]

export const DEFAULT_PORTFOLIO_PAGE: PortfolioPageContent = {
	locationLabel: 'Victoria & Vancouver Island, BC',
	titleBefore: 'Our',
	titleEmphasis: 'Portfolio',
	description:
		'Every project tells a story. Browse our completed renovations — from full apartment transformations to precise kitchen and bathroom upgrades — each one delivered on time, on budget, and built to last.',
	primaryCtaLabel: 'Browse Projects ↓',
	primaryCtaLink: '#our-works',
	secondaryCtaLabel: 'Start Your Project',
	secondaryCtaLink: '#contact',
	heroImageUrl: null,
	stats: [
		{value: '120', suffix: '+', label: 'Projects Done'},
		{value: '8', suffix: 'yr', label: 'Experience'},
		{value: '98', suffix: '%', label: 'Satisfaction Rate'},
	],
}

export const DEFAULT_SERVICES_PAGE: ServicesPageContent = {
	locationLabel: 'Victoria & Vancouver Island, BC',
	titleBefore: 'What we',
	titleEmphasis: 'build for you',
	description:
		'From a single bathroom refresh to a complete home transformation — we offer a full range of renovation and interior finishing services, all backed by our 12-month workmanship warranty.',
	primaryCtaLabel: 'Explore Services ↓',
	primaryCtaLink: '#services-list',
	secondaryCtaLabel: 'Get a Free Quote',
	secondaryCtaLink: '#contact',
	heroImageUrl: null,
}

export const DEFAULT_ABOUT_PAGE: AboutPageContent = {
	locationLabel: 'Victoria & Vancouver Island, BC',
	titleBefore: 'Built on',
	titleEmphasis: 'trust & craft',
	description:
		"Formo Renovations was founded on a single belief: that every home deserves to be treated with the same care we'd give our own. Since 2016, we've been turning renovation visions into reality — on time, on budget, and built to last.",
	primaryCtaLabel: 'Our Story ↓',
	primaryCtaLink: '#our-story',
	secondaryCtaLabel: 'See Our Work',
	secondaryCtaLink: '/portfolio',
	heroImageUrl: null,
	founderInitial: 'M',
	founderName: 'Michael Formo',
	founderRole: 'Founder & Lead Contractor',
	founderQuote:
		'"I started Formo because I believed clients deserved complete transparency — from the first estimate to the final walkthrough. That principle still guides everything we do."',
	founderStats: [
		{value: '8', suffix: 'yr', label: 'In Business'},
		{value: '120', suffix: '+', label: 'Projects'},
		{value: '98', suffix: '%', label: 'Satisfaction'},
		{value: '12', suffix: 'mo', label: 'Warranty'},
	],
}

export const DEFAULT_CONTACTS_PAGE: ContactsPageContent = {
	eyebrow: 'We respond within 24 hours',
	titleBefore: "Let's talk about",
	titleEmphasis: 'your project',
	description:
		"Whether you have a firm plan or just a rough idea, we're happy to listen. Reach out however suits you best — call, email, or fill in the form below. Free on-site consultations across Victoria and Vancouver Island.",
	heroImageUrl: null,
	formEyebrow: 'Send Us a Message',
	formTitleBefore: 'Tell us about your',
	formTitleEmphasis: 'project',
	formSubtext:
		"The more detail you can share, the more accurate our quote will be. We'll get back to you within one business day.",
}

