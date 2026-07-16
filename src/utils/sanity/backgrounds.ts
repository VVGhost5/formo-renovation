/** Fallback background URLs (match former SCSS defaults) */
export const DEFAULT_BACKGROUNDS = {
	homeHero: '/herosection.webp',
	homeAbout: '/about-us-homepage.webp',
	homePortfolio: '/bgs/our-work.webp',
	homeProcess: '/bgs/our-story.webp',
	homePricing: '/bgs/pricing.webp',
	homeBeforeAfter: '/bgs/kitchen.webp',
	servicesHero: '/bgs/our-team.webp',
	servicesProcess: '/bgs/contact-us.webp',
	portfolioHero: '/bgs/contact-us.webp',
	aboutHero: '/about-us-homepage.webp',
	aboutValues: '/bgs/our-team.webp',
	aboutWhy: '/bgs/contact-us.webp',
	contactsHero: '/bgs/contact-us.webp',
	reviewsHero: '/images/reviews-hero.jpg',
} as const

export type BackgroundKey = keyof typeof DEFAULT_BACKGROUNDS

export function resolveBgUrl(
	cmsUrl: string | null | undefined,
	key: BackgroundKey,
): string {
	return cmsUrl?.trim() || DEFAULT_BACKGROUNDS[key]
}

export function bgStyle(url: string): string {
	return `background-image: url(${url})`
}
