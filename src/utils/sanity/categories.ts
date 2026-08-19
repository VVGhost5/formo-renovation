export const PORTFOLIO_CATEGORY_OPTIONS = [
	{title: 'Kitchen', value: 'kitchen'},
	{title: 'Bedroom', value: 'bedroom'},
	{title: 'Hallway', value: 'hallway'},
	{title: 'Wardrobe', value: 'wardrobe'},
	{title: 'Bathroom', value: 'bathroom'},
	{title: 'Living Room', value: 'living'},
] as const

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORY_OPTIONS)[number]['value']

export const PORTFOLIO_CATEGORY_VALUES: PortfolioCategory[] = PORTFOLIO_CATEGORY_OPTIONS.map(
	(option) => option.value,
)

const allowed = new Set<string>(PORTFOLIO_CATEGORY_VALUES)

export function isPortfolioCategory(value: string): value is PortfolioCategory {
	return allowed.has(value)
}

export function categoryLabel(value: PortfolioCategory): string {
	return PORTFOLIO_CATEGORY_OPTIONS.find((option) => option.value === value)?.title ?? value
}

const LEGACY_CATEGORY_MAP: Record<string, PortfolioCategory> = {
	guest: 'living',
}

export function normalizeCategories(raw: unknown): PortfolioCategory[] {
	const list = Array.isArray(raw) ? raw : typeof raw === 'string' && raw ? [raw] : []
	return [
		...new Set(
			list.flatMap((value) => {
				if (typeof value !== 'string') return []
				const mapped = LEGACY_CATEGORY_MAP[value] ?? value
				return isPortfolioCategory(mapped) ? [mapped] : []
			}),
		),
	]
}

export function projectMatchesCategory(
	project: {categories: readonly string[]; tags: readonly string[]},
	filter: PortfolioCategory,
): boolean {
	if (project.categories.includes(filter)) return true
	const needle = filter.toLowerCase()
	return project.tags.some((tag) => {
		const normalized = tag.trim().toLowerCase()
		if (normalized === needle || normalized.replace(/\s+/g, '') === needle) return true
		return normalized.split(/[\s,/|+_-]+/).includes(needle)
	})
}
