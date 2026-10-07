export const CONTACT_SERVICE_OPTIONS = [
  'Interior Finishing',
  'Finish Carpentry',
  'Bathroom Renovations',
  'Kitchen Renovations',
  'Flooring',
  'Painting',
  'Project Management',
  'Doors',
  'Free Estimate Only',
] as const

const SLUG_RULES: { test: RegExp; option: string }[] = [
  { test: /finish-?carpentry|carpentry/, option: 'Finish Carpentry' },
  { test: /finish/, option: 'Interior Finishing' },
  { test: /bath/, option: 'Bathroom Renovations' },
  { test: /kitchen/, option: 'Kitchen Renovations' },
  { test: /floor/, option: 'Flooring' },
  { test: /paint/, option: 'Painting' },
  { test: /project/, option: 'Project Management' },
  { test: /door/, option: 'Doors' },
]

function matchInterest(value: string): string {
  const normalized = value.trim().toLowerCase()
  if (!normalized) return ''
  const exact = CONTACT_SERVICE_OPTIONS.find((option) => option.toLowerCase() === normalized)
  if (exact) return exact
  return SLUG_RULES.find((rule) => rule.test.test(normalized))?.option ?? ''
}

/** Option label for the contact form on the service page the visitor is viewing. */
export function serviceInterestForPage(service: {
  pageSlug?: string
  quickName?: string
  stripName?: string
}): string {
  const fromSlug = matchInterest(service.pageSlug ?? '')
  if (fromSlug) return fromSlug
  const fromName = matchInterest(service.quickName ?? '') || matchInterest(service.stripName ?? '')
  if (fromName) return fromName
  return service.quickName?.trim() || service.stripName?.trim() || ''
}

/** Keep the standard list, and insert a page-specific service when it is not already an option. */
export function contactServiceOptions(serviceInterest = ''): string[] {
  const options: string[] = [...CONTACT_SERVICE_OPTIONS]
  const interest = serviceInterest.trim()
  if (!interest || options.includes(interest)) return options
  const freeEstimate = options.indexOf('Free Estimate Only')
  if (freeEstimate === -1) options.push(interest)
  else options.splice(freeEstimate, 0, interest)
  return options
}
