import {DEFAULT_BACKGROUNDS} from './backgrounds'
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
	PortfolioSlide,
	ReviewsPageContent,
	ServiceDetail,
	ServicesPageContent,
	SiteSettingsContent,
	PageSeo,
	SiteMetadataPageKey,
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
	backgroundImageUrl: DEFAULT_BACKGROUNDS.homeHero,
	backgroundImageAlt: null,
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsContent = {
	footerDescription:
		'Premium renovation and interior finishing solutions for homes across Victoria and Vancouver Island, BC. European standards. Transparent process.',
	phone: '+1 (250) 000-0000',
	phoneHours: 'Mon – Fri, 8:00 AM – 6:00 PM',
	email: 'hello@formorenovations.ca',
	emailNote: 'Response within 1 business day',
	notificationEmail: '',
	whatsapp: '+1 (250) 000-0000',
	whatsappNote: 'Quick questions & project photos',
	serviceArea: 'Victoria & Vancouver Island',
	serviceAreaNote: 'BC, Canada',
	instagramUrl: '#',
	facebookUrl: '#',
	houzzUrl: '#',
	homestarsUrl: '#',
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
		{name: 'Interior Finishing', imageUrl: '/services/living.webp', link: '/services#svc-finishing'},
		{name: 'Bathroom Renovations', imageUrl: '/services/bathroom.webp', link: '/services#svc-bathroom'},
		{name: 'Kitchen Renovations', imageUrl: '/services/kitchen.webp', link: '/services#svc-kitchen'},
		{name: 'Flooring', imageUrl: '/services/flooring.webp', link: '/services#svc-flooring'},
		{name: 'Painting', imageUrl: '/services/finishing.webp', link: '/services#svc-finishing'},
		{name: 'Project Management', imageUrl: '/services/full-home.webp', link: '/services#svc-full'},
	],
}

export const DEFAULT_HOME_ABOUT: HomeAboutContent = {
	eyebrow: 'About Us',
	headline: 'Built on Craft,',
	headlineEmphasis: 'Driven by Standards',
	heroDescription:
		'We are a Victoria-based renovation company bringing European precision and transparency to every project — from a single room to a full home transformation.',
	heroCtaLabel: 'Read More About Us →',
	heroCtaLink: '/about-us/',
	heroImageUrl: DEFAULT_BACKGROUNDS.homeAbout,
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
			imageUrl: '/bgs/our-story.webp',
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
            imageUrl: '/bgs/our-approach.webp',
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
            imageUrl: '/bgs/our-team.webp',
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
	ctaLink: '/portfolio/',
	heroImageUrl: DEFAULT_BACKGROUNDS.homePortfolio,
	projects: [
		{tag: 'Full Renovation', title: 'Oak Bay Residence', meta: 'Full renovation · Victoria, BC', imageUrl: '/bgs/full-renovation.webp'},
		{tag: 'Kitchen', title: 'Modern Kitchen Remodel', meta: 'Kitchen redesign · Saanich, BC', imageUrl: '/bgs/kitchen.webp'},
		{tag: 'Bathroom', title: 'Spa Bathroom', meta: 'Bathroom · Langford, BC', imageUrl: '/bgs/bathroom.webp'},
		{tag: 'Living Room', title: 'Contemporary Living Room', meta: 'Interior design · Colwood, BC', imageUrl: '/bgs/living-room.webp'},
		{tag: 'Full Renovation', title: 'Esquimalt Full Reno', meta: 'Complete renovation · Esquimalt, BC', imageUrl: '/bgs/full-renovations-2.webp'},
	] as PortfolioSlide[],
}

export const DEFAULT_HOME_PROCESS: HomeProcessContent = {
	eyebrow: 'How We Work',
	headline: 'A Clear Process,',
	headlineEmphasis: 'No Surprises',
	description:
		'Eight carefully structured stages that keep you informed, protected, and confident — from the first inquiry to the final walkthrough.',
	ctaLabel: 'Book a Free Consultation →',
	heroImageUrl: DEFAULT_BACKGROUNDS.homeProcess,
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
	heroImageUrl: DEFAULT_BACKGROUNDS.homePricing,
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
	photoUrl: '/bgs/contact-us.webp',
	photoAlt: 'Contact Formo Renovations',
}

export const DEFAULT_HOME_BEFORE_AFTER_BANNER: HomeBeforeAfterBannerContent = {
	eyebrow: 'Before & After',
	headline: 'Real Results,',
	headlineEmphasis: 'Real Spaces',
	description:
		'Every transformation starts with a vision. Drag the slider to see exactly how we turned each space from its original condition into a finished result our clients love.',
	ctaLabel: 'View All Projects →',
	heroBackgroundUrl: DEFAULT_BACKGROUNDS.homeBeforeAfter,
}

export const DEFAULT_BEFORE_AFTER: BeforeAfterSlide[] = [
	{name: 'Kitchen Renovation', location: 'Fairfield, Victoria', duration: '6 weeks', year: '2024', before: '/bgs/our-approach.webp', after: '/bgs/kitchen.webp'},
	{name: 'Bathroom Remodel', location: 'Oak Bay, Victoria', duration: '4 weeks', year: '2024', before: '/bgs/our-approach.webp', after: '/bgs/kitchen.webp'},
	{name: 'Living Room', location: 'Saanich, BC', duration: '3 weeks', year: '2024', before: '/bgs/our-approach.webp', after: '/bgs/kitchen.webp'},
	{name: 'Full Apartment', location: 'Langford, BC', duration: '12 weeks', year: '2025', before: '/bgs/our-approach.webp', after: '/bgs/kitchen.webp'},
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
	heroImageUrl: DEFAULT_BACKGROUNDS.portfolioHero,
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
	heroImageUrl: DEFAULT_BACKGROUNDS.servicesHero,
	processHeroBackgroundUrl: DEFAULT_BACKGROUNDS.servicesProcess,
	// Process section
	processEyebrow: 'How We Work',
	processHeadline: 'From first call to',
	processHeadlineEmphasis: 'final walkthrough',
	processDescription: 'A clear, predictable process is how we eliminate stress and deliver consistent results — every time, for every client.',
	processSteps: [
		{num: '01', icon: 'fa-solid fa-phone', title: 'Free Consultation', body: 'We visit your home, listen to your goals, and assess the scope. No charge, no obligation. Usually 45–60 minutes.'},
		{num: '02', icon: 'fa-solid fa-file-lines', title: 'Detailed Quote', body: 'Within 48 hours you receive a line-by-line estimate — materials, labour, timeline, and payment schedule. Everything in writing.'},
		{num: '03', icon: 'fa-solid fa-file-signature', title: 'Signed Contract', body: "Once you're happy, we formalise everything in a clear contract. Scope, schedule, payment milestones, and warranty terms."},
		{num: '04', icon: 'fa-solid fa-hammer', title: 'Construction', body: 'Work begins on the agreed date. Daily updates, weekly site reports, and proactive communication throughout.'},
		{num: '05', icon: 'fa-solid fa-flag-checkered', title: 'Final Walkthrough', body: 'We walk the finished project with you. Any snags are addressed before final payment. Your warranty begins the day you sign off.'},
	],
	// Pricing hint
	pricingEyebrow: 'Transparent Pricing',
	pricingHeadline: 'Every quote is honest,',
	pricingHeadlineEmphasis: 'detailed, and fixed',
	pricingBody: "We don't use vague estimates or open-ended budgets. Every Formo quote is itemised line by line — materials, labour, disposal, and contingency — so you know exactly what you're committing to before we start.",
	pricingCards: [
		{icon: 'fa-solid fa-file-invoice', title: 'Line-by-Line Breakdown', body: 'Every cost is itemised — no lump-sum "labour and materials" lines that hide markups or assumptions.'},
		{icon: 'fa-solid fa-lock', title: 'Fixed-Price Options', body: "For defined scopes, we offer fixed-price contracts. What's quoted is what you pay — full stop."},
		{icon: 'fa-solid fa-check-double', title: 'Written Change Orders', body: 'Any change to scope requires your written approval before work proceeds. You\'re always in control.'},
	],
	// FAQ
	faqEyebrow: 'FAQ',
	faqTitle: 'Common',
	faqTitleEmphasis: 'questions',
	faqSub: 'Answers to the things most clients ask us before getting started.',
	faqItems: [
		{question: 'How quickly can you start my project?', answer: 'Our current lead time is typically 3–6 weeks from signed contract to project start. This varies by season — spring and summer are our busiest periods. We recommend reaching out as early as possible, especially if you have a firm move-in date or deadline.'},
		{question: 'Do you provide free quotes?', answer: 'Yes — always. We visit your home, assess the scope, and provide a detailed written estimate at no charge and with no obligation. The quote is itemised line by line so you can see exactly what you\'re paying for.'},
		{question: 'What areas do you serve?', answer: "We're based in Victoria, BC, and serve all of Greater Victoria including Fairfield, Oak Bay, Saanich, James Bay, Esquimalt, Langford, and Colwood. We also travel across Vancouver Island for larger projects. Free on-site consultations are available anywhere within 60 km of Victoria."},
		{question: 'Are you licensed and insured?', answer: 'Yes, fully. Formo Renovations is a licensed BC contractor with $5 million in general liability insurance. We carry WorkSafeBC coverage for all team members on site. All electrical and plumbing work is completed by licensed tradespeople and complies with BC Building Code.'},
		{question: 'Can I stay in my home during the renovation?', answer: "For most projects — bathroom, kitchen, flooring, living room — yes. We take extra care to contain dust, protect surrounding areas, and clean the site at the end of every day. For full-home renovations, we'll discuss what makes sense at the consultation stage."},
		{question: 'What does your warranty cover?', answer: "Every Formo project is backed by a 12-month workmanship warranty. If anything we've built or installed fails due to our workmanship within that period, we fix it at no cost. There's no fine print — if it's our work, it's our responsibility."},
		{question: 'How does the payment schedule work?', answer: 'We structure payments across project milestones — typically a deposit to secure your start date, a mid-project payment at an agreed milestone, and a final payment on the day you sign off. We never ask for full payment upfront.'},
	],
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
	secondaryCtaLink: '/portfolio/',
	heroImageUrl: DEFAULT_BACKGROUNDS.aboutHero,
	valuesHeroBackgroundUrl: DEFAULT_BACKGROUNDS.aboutValues,
	whyBannerBackgroundUrl: DEFAULT_BACKGROUNDS.aboutWhy,
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
	// Who We Are
	whoEyebrow: 'Who We Are',
	whoHeadline: 'A team of people who',
	whoHeadlineEmphasis: 'care about your home',
	whoLead: "We're a Victoria-based renovation company built around honest communication, skilled tradespeople, and a commitment to delivering work we're genuinely proud of.",
	whoBody: [
		"Unlike large contractors who treat every project as a number, our team is small by design. We take on fewer projects so we can give each one the full attention it deserves. Every renovation is managed directly by our senior team — you'll never be passed off to a junior coordinator or left chasing an update.",
		'We serve homeowners across Victoria, Oak Bay, Saanich, Esquimalt, and Vancouver Island. Whether it\'s a single bathroom refresh or a complete home transformation, our process stays the same: transparent quotes, clear timelines, and craftsmanship you can see and feel.',
	],
	whoPills: ['Licensed & Insured', 'BC HomeWarranty', 'Trusted Since 2016', 'Local Team', 'No Subcontracting Surprises'],
	whoCtaLabel: 'Start a Conversation →',
	whoCtaLink: '#contact',
	// Numbers
	aboutStats: [
		{value: '120', suffix: '+', label: 'Projects Completed', description: 'From single-room upgrades to full-home renovations across Victoria and the Island.'},
		{value: '98', suffix: '%', label: 'Client Satisfaction', description: 'Based on post-project surveys from every client since 2019.'},
		{value: '8', suffix: '+', label: 'Years in Business', description: 'Established in 2016 with a focus on quality over volume.'},
		{value: '12', suffix: 'mo', label: 'Workmanship Warranty', description: 'Every project backed by a full 12-month workmanship guarantee — no questions asked.'},
	],
	// Our Story
	storyEyebrow: 'Our Story',
	storyHeadline: 'Eight years of',
	storyHeadlineEmphasis: 'building better spaces',
	storyLead: 'From a one-man operation with a truck and a toolkit, to a trusted team of craftspeople serving Vancouver Island — this is how Formo Renovations came to be.',
	timeline: [
		{year: '2016', title: 'Formo Renovations is Founded', text: "Michael Formo launches the company in Victoria, BC, focusing on bathroom and kitchen renovations. The first year brings five projects, four referrals, and one very important lesson: clients don't just want a renovation — they want peace of mind throughout the process.", highlight: true},
		{year: '2017', title: 'First Full Apartment Renovation', text: "We take on our first complete apartment transformation in James Bay — a 1,200 sq ft unit that tests every skill the team has. It comes in on time and earns our first five-star Google review. Word begins to spread.", highlight: false},
		{year: '2019', title: 'The Team Grows to Five', text: "With consistent demand and a growing reputation, we hire three specialist tradespeople — a master tiler, a finish carpenter, and a licensed electrician. This lets us handle larger and more complex projects without compromising quality.", highlight: false},
		{year: '2021', title: '50 Projects Completed', text: "A milestone year. We complete our 50th project and introduce our formal 12-month workmanship warranty — something we'd always done informally, but now committed to in writing for every client.", highlight: false},
		{year: '2023', title: 'Expansion to Vancouver Island', text: 'Growing demand leads us to extend services across Vancouver Island. We add a second crew and begin serving Nanaimo, Parksville, and Comox alongside our core Victoria market.', highlight: false},
		{year: '2025', title: '120+ Projects and Still Growing', text: "Today, Formo Renovations has completed over 120 projects with a 98% client satisfaction rate. We're the same company we were in 2016 — focused on quality, honest about limitations, and genuinely invested in every space we touch.", highlight: true},
	],
	// Values
	valuesEyebrow: 'Our Values',
	valuesHeadline: 'What we stand for',
	valuesHeadlineEmphasis: 'every single project',
	valuesDescription: "These aren't slogans on a wall. They're the standards our team holds each other to — and the standards our clients can hold us to.",
	valueCards: [
		{icon: 'fa-solid fa-magnifying-glass', num: '01', title: 'Radical Transparency', body: "You'll always know exactly where your project stands and exactly what you're paying for. Our quotes are detailed line-by-line. Change orders require your written approval. No surprises at the end."},
		{icon: 'fa-solid fa-ruler-combined', num: '02', title: 'Uncompromising Craft', body: "We don't rush finishes, cut corners on materials, or take on more work than we can handle well. Every joint, every tile, every painted edge is inspected before we consider a job done."},
		{icon: 'fa-solid fa-handshake', num: '03', title: 'Respect for Your Home', body: 'We treat your space as if it were our own. That means covering floors, containing dust, working clean each day, and restoring the site at the end of every shift.'},
		{icon: 'fa-regular fa-calendar-check', num: '04', title: 'Schedules We Honour', body: "We build realistic timelines and stick to them. If something unexpected affects the schedule, you hear it from us first — not from the silence of a crew that hasn't shown up."},
		{icon: 'fa-solid fa-leaf', num: '05', title: 'Sustainable Choices', body: 'We give preference to locally-sourced materials, low-VOC finishes, and responsible disposal of renovation waste. Building better spaces shouldn\'t come at the cost of the wider environment.'},
		{icon: 'fa-solid fa-phone', num: '06', title: 'Available After Handover', body: "Our relationship doesn't end when we leave the site. Our 12-month workmanship warranty means we stand behind every project — and our clients know they can call us anytime, for anything."},
	],
	// Team
	teamEyebrow: 'Our Team',
	teamHeadline: 'The people behind',
	teamHeadlineEmphasis: 'every project',
	teamDescription: 'Small enough to care, experienced enough to deliver. Every member of the Formo team is a specialist in their trade.',
	teamMembers: [
		{name: 'Michael Formo', role: 'Founder & Lead Contractor', bio: '15+ years in residential renovation. Michael personally oversees every project from estimate to final walkthrough, ensuring standards never slip.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'},
		{name: 'Sarah Chen', role: 'Interior Design Lead', bio: 'Brings a design eye to every project. Sarah helps clients translate vague ideas into precise, beautiful outcomes — before a single tool is picked up.', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'},
		{name: 'David Okafor', role: 'Master Tiler & Finisher', bio: "12 years of precision tile work, stone installation, and finish carpentry. David's eye for alignment is legendary within the team.", photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'},
		{name: 'Lisa Park', role: 'Project Coordinator', bio: 'The person who keeps everything running. Lisa manages timelines, supplier relationships, and client communication so every project stays on track.', photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80'},
	],
	// Why Us
	whyEyebrow: 'Why Choose Formo',
	whyBannerHeadline: 'What makes us',
	whyBannerHeadlineEmphasis: 'different',
	whyBannerDescription: 'There are dozens of contractors on Vancouver Island. Here\'s why homeowners keep choosing — and returning to — Formo Renovations.',
	whyRows: [
		{num: '01', label: 'No Hidden Costs', title: 'Quotes you can actually trust', body: 'Our estimates are detailed, itemised, and honest. We include material costs, labour, waste disposal, and contingency — so what you see in the quote is what you see on the invoice.', pills: ['Line-by-line breakdown', 'Written change orders', 'Fixed-price options'], imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85', imageAlt: 'Transparent quoting'},
		{num: '02', label: 'Schedule Reliability', title: 'We show up when we say we will', body: '93% of our projects finish on or before the original timeline. For the other 7%, we send proactive updates before delays happen — not apologetic messages after the fact.', pills: ['Weekly progress reports', 'Daily site cleanup', 'Dedicated PM'], imageUrl: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=85', imageAlt: 'On-time delivery'},
		{num: '03', label: 'Material Quality', title: "We source materials we'd use ourselves", body: "We have long-standing relationships with quality suppliers across BC, which means we get better materials at better prices. We'll never substitute a specified product without your approval.", pills: ['Local BC suppliers', 'Low-VOC finishes', 'No substitutions without approval'], imageUrl: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=900&q=85', imageAlt: 'Quality materials'},
	],
	// Certifications
	certEyebrow: 'Credentials & Guarantees',
	certHeadline: 'Work backed by',
	certHeadlineEmphasis: 'qualifications',
	certDescription: "We're fully licensed, insured, and certified. Every project meets or exceeds BC Building Code requirements — and is backed by our written 12-month workmanship warranty.",
	certBadges: [
		{icon: 'fa-solid fa-building-columns', name: 'BC Licensed Contractor'},
		{icon: 'fa-solid fa-shield-halved', name: '$5M Liability Insurance'},
		{icon: 'fa-solid fa-house-circle-check', name: 'BC Home Warranty'},
		{icon: 'fa-solid fa-bolt', name: 'Licensed Electrical'},
		{icon: 'fa-solid fa-droplet', name: 'Licensed Plumbing'},
	],
	guaranteeCards: [
		{icon: 'fa-solid fa-circle-check', title: '12-Month Workmanship Warranty', text: "If anything we've done fails within 12 months due to workmanship, we fix it at no cost. Full stop. No fine print, no exclusions."},
		{icon: 'fa-solid fa-file-contract', title: 'Detailed Written Contracts', text: 'Every project begins with a clear, signed contract. Scope of work, payment schedule, timeline, and warranty terms — all in writing, before we touch a thing.'},
		{icon: 'fa-solid fa-rotate-left', title: 'Right to Pause or Stop', text: "You can pause or stop the project at any agreed milestone and pay only for work completed to that point. We believe you should never feel trapped by a renovation."},
	],
}

export const DEFAULT_REVIEWS_PAGE: ReviewsPageContent = {
	heroImageUrl: DEFAULT_BACKGROUNDS.reviewsHero,
}

export const DEFAULT_CONTACTS_PAGE: ContactsPageContent = {
	eyebrow: 'We respond within 24 hours',
	titleBefore: "Let's talk about",
	titleEmphasis: 'your project',
	description:
		"Whether you have a firm plan or just a rough idea, we're happy to listen. Reach out however suits you best — call, email, or fill in the form below. Free on-site consultations across Victoria and Vancouver Island.",
	heroImageUrl: DEFAULT_BACKGROUNDS.contactsHero,
	formEyebrow: 'Send Us a Message',
	formTitleBefore: 'Tell us about your',
	formTitleEmphasis: 'project',
	formSubtext:
		"The more detail you can share, the more accurate our quote will be. We'll get back to you within one business day.",
}

export const DEFAULT_SERVICES: ServiceDetail[] = [
	{
		id: 'svc-bathroom',
		num: '01',
		icon: 'fa-solid fa-shower',
		stripName: 'Bathroom',
		quickName: 'Bathroom Renovation',
		quickSub: 'Full remodels, tile, wetrooms',
		eyebrow: 'Bathroom Renovation',
		title: 'From dated to spa-worthy — completely reimagined',
		lead: "Whether you're working with a compact ensuite or a master bathroom with room to breathe, we design and deliver bathroom renovations that combine precise tile work, quality fixtures, and smart layout decisions.",
		includes: ['Full demolition & removal', 'Waterproofing & tanking', 'Large-format & mosaic tiling', 'Frameless glass shower enclosures', 'Freestanding & built-in tubs', 'Floating & vanity unit installation', 'Heated floor systems', 'LED & recessed lighting', 'Custom mirror & storage solutions', 'Plumbing rough-in & finishing'],
		meta: [{key: 'Typical Duration', val: '2 – 4 Weeks'}, {key: 'Starting From', val: '$8,500 CAD'}, {key: 'Warranty', val: '12 Months'}],
		imageUrl: '/services/bathroom.webp',
		imageAlt: 'Bathroom Renovation',
	},
	{
		id: 'svc-kitchen',
		num: '02',
		icon: 'fa-solid fa-kitchen-set',
		stripName: 'Kitchen',
		quickName: 'Kitchen Renovation',
		quickSub: 'Cabinets, countertops, layout',
		eyebrow: 'Kitchen Renovation',
		title: 'The heart of your home, done right',
		lead: 'We handle everything from a full kitchen gut-and-rebuild to a targeted cabinet refresh or countertop upgrade. Our team coordinates cabinetry, counters, tile, appliances, lighting, and plumbing.',
		includes: ['Custom & semi-custom cabinetry', 'Quartz, stone & solid-surface counters', 'Waterfall island designs', 'Backsplash tile installation', 'Appliance connection & integration', 'Under-cabinet & pot lighting', 'Open-plan layout reconfiguration', 'Pantry & storage optimisation', 'Sink, tap & plumbing rough-in', 'Soft-close hardware throughout'],
		meta: [{key: 'Typical Duration', val: '4 – 8 Weeks'}, {key: 'Starting From', val: '$14,000 CAD'}, {key: 'Warranty', val: '12 Months'}],
		imageUrl: '/services/kitchen.webp',
		imageAlt: 'Kitchen Renovation',
	},
	{
		id: 'svc-living',
		num: '03',
		icon: 'fa-solid fa-couch',
		stripName: 'Living & Bedroom',
		quickName: 'Living Room & Bedroom',
		quickSub: 'Open plans, built-ins, finishes',
		eyebrow: 'Living Room & Bedroom',
		title: 'Spaces that feel like they were meant to be yours',
		lead: 'We transform dark, compartmentalised, or simply tired spaces into open, light-filled rooms with thoughtful detailing — custom built-ins, feature walls, updated lighting, and finishes that last.',
		includes: ['Wall removal & structural work', 'Custom built-in shelving & wardrobes', 'Feature wall & accent finishes', 'Fireplace surround remodelling', 'Coffered & tray ceiling detail', 'Recessed & feature lighting', 'Window trim & casement upgrades', 'Closet organisation systems', 'Drywall, skim coat & paint', 'Baseboard & moulding installation'],
		meta: [{key: 'Typical Duration', val: '2 – 5 Weeks'}, {key: 'Starting From', val: '$6,000 CAD'}, {key: 'Warranty', val: '12 Months'}],
		imageUrl: '/services/living.webp',
		imageAlt: 'Living Room Renovation',
	},
	{
		id: 'svc-full',
		num: '04',
		icon: 'fa-solid fa-house',
		stripName: 'Full Home',
		quickName: 'Full Home Renovation',
		quickSub: 'Turnkey, end-to-end projects',
		eyebrow: 'Full Home Renovation',
		title: 'Turnkey transformations, one team, zero chaos',
		lead: 'We make it manageable by acting as your single point of contact across every trade — from demolition and structural work right through to the final coat of paint. You won\'t need to manage subcontractors. We do that.',
		includes: ['Full project management', 'Demolition & site preparation', 'Structural & framing work', 'Electrical rough-in & fit-out', 'Plumbing rough-in & fit-out', 'Insulation & drywall', 'All flooring throughout', 'Full kitchen & bathroom renovation', 'Interior painting & trim', 'Permit coordination & inspection'],
		meta: [{key: 'Typical Duration', val: '8 – 16 Weeks'}, {key: 'Starting From', val: '$45,000 CAD'}, {key: 'Warranty', val: '12 Months'}],
		imageUrl: '/services/full-home.webp',
		imageAlt: 'Full Home Renovation',
	},
	{
		id: 'svc-flooring',
		num: '05',
		icon: 'fa-solid fa-layer-group',
		stripName: 'Flooring',
		quickName: 'Flooring',
		quickSub: 'Hardwood, LVP, tile',
		eyebrow: 'Flooring',
		title: 'The foundation of every beautiful room',
		lead: 'We supply and install a full range of materials — from engineered hardwood and wide-plank oak to luxury vinyl plank and large-format porcelain. Every installation includes proper subfloor preparation.',
		includes: ['Engineered & solid hardwood', 'Wide-plank white oak & walnut', 'Luxury vinyl plank (LVP)', 'Large-format porcelain tile', 'Natural stone installation', 'Subfloor repair & levelling', 'Radiant heat system integration', 'Stair nosing & transition strips', 'Site finishing & staining', 'Old floor removal & disposal'],
		meta: [{key: 'Typical Duration', val: '3 – 10 Days'}, {key: 'Starting From', val: '$3,500 CAD'}, {key: 'Warranty', val: '12 Months'}],
		imageUrl: '/services/flooring.webp',
		imageAlt: 'Flooring',
	},
	{
		id: 'svc-finishing',
		num: '06',
		icon: 'fa-solid fa-paint-roller',
		stripName: 'Interior Finishing',
		quickName: 'Interior Finishing',
		quickSub: 'Painting, trim, moulding',
		eyebrow: 'Interior Finishing',
		title: 'The details that define the final result',
		lead: 'Our finishing team handles painting, trim carpentry, moulding, and all the fine detail work that separates a professional result from a DIY job. We use only low-VOC, premium-grade paints and prepare surfaces properly.',
		includes: ['Full-home interior painting', 'Surface preparation & skim coat', 'Crown moulding & coffering', 'Baseboard & casing installation', 'Wainscoting & panel moulding', 'Feature wall treatments', 'Door & window trim upgrades', 'Closet & built-in finishing', 'Low-VOC premium paint products', 'Final touch-up & inspection'],
		meta: [{key: 'Typical Duration', val: '3 Days – 3 Weeks'}, {key: 'Starting From', val: '$2,800 CAD'}, {key: 'Warranty', val: '12 Months'}],
		imageUrl: '/services/finishing.webp',
		imageAlt: 'Interior Finishing',
	},
]
