import type {ServiceDetail} from './types'

/** Finish Carpentry's page slug. Doors follows it until Studio publishes an order. */
const CARPENTRY_PAGE_SLUG = 'finish-carpentry'

export type ServiceOrderRef = {
	_id: string
	_type: string
}

export type ServiceDirectoryEntry =
	| {kind: 'service'; service: ServiceDetail}
	| {kind: 'doors'}

/**
 * Order for /services/.
 * A published Studio list wins. Services (and Doors) missing from that list are appended.
 * With no published list, Doors is inserted immediately after Finish Carpentry.
 */
export function orderServicesDirectory(
	services: ServiceDetail[],
	order: ServiceOrderRef[] | null | undefined,
): ServiceDirectoryEntry[] {
	const regular = services.filter((service) => service.pageSlug !== 'doors')
	const refs = (order ?? []).filter((item) => item?._id && item?._type)

	if (refs.length === 0) {
		const entries: ServiceDirectoryEntry[] = regular.map((service) => ({kind: 'service', service}))
		const carpentryAt = regular.findIndex((service) => service.pageSlug === CARPENTRY_PAGE_SLUG)
		const insertAt = carpentryAt >= 0 ? carpentryAt + 1 : entries.length
		entries.splice(insertAt, 0, {kind: 'doors'})
		return entries
	}

	const byId = new Map(regular.map((service) => [service._id, service]))
	const used = new Set<string>()
	const entries: ServiceDirectoryEntry[] = []
	let doorsPlaced = false

	for (const ref of refs) {
		if (ref._type === 'doorsPage') {
			if (!doorsPlaced) {
				entries.push({kind: 'doors'})
				doorsPlaced = true
			}
			continue
		}
		const service = byId.get(ref._id)
		if (!service || used.has(service._id)) continue
		used.add(service._id)
		entries.push({kind: 'service', service})
	}

	for (const service of regular) {
		if (!used.has(service._id)) entries.push({kind: 'service', service})
	}
	if (!doorsPlaced) entries.push({kind: 'doors'})
	return entries
}
