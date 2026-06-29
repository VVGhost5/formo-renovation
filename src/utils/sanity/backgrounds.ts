/** Fallback background URLs (match former SCSS defaults) */
export const DEFAULT_BACKGROUNDS = {
	homeHero: '/herosection.png',
	homeAbout: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1800&q=85',
	homePortfolio: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1800&q=85',
	homeProcess: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85',
	homePricing: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1800&q=85',
	homeBeforeAfter: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1800&q=85',
	servicesHero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=2000&q=90',
	servicesProcess: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85',
	portfolioHero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=90',
	aboutHero: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=2000&q=90',
	aboutValues: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=85',
	aboutWhy: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85',
	contactsHero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=90',
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
