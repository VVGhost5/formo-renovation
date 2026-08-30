const SVC_PREFIX = /^svc-/

/** URL slug for /services/{slug}/ — from pageSlug or stripped section id. */
export function servicePageSlug(sectionId: string, pageSlug?: string | null): string {
	const custom = pageSlug?.trim()
	if (custom) return custom
	return sectionId.replace(SVC_PREFIX, '')
}

/** Default portfolio category hints when CMS categories are not set. */
export const DEFAULT_SERVICE_PORTFOLIO_CATEGORIES: Record<string, string[]> = {
	'svc-kitchen': ['kitchen'],
	'svc-bathroom': ['bathroom'],
	'svc-living': ['living', 'bedroom'],
	'svc-full': [],
	'svc-flooring': ['hallway'],
	'svc-finishing': ['wardrobe', 'hallway'],
}
