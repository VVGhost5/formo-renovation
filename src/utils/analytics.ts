declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type LeadEvent = {
  requestId: string
  serviceCategory: string
  formId: string
}

export type LeadTracking = {
  serviceCategory: string
  formId: string
}

/**
 * Service category and form id for a contact form on this page.
 * A service page (`services-<slug>`) uses the service slug. Any other page uses the page name.
 */
export function leadTrackingForPage(page: string): LeadTracking {
  const key = page.trim().toLowerCase()
  const serviceCategory = key.startsWith('services-') ? key.slice('services-'.length) : key
  const formId = key === 'contacts' ? 'contacts-form' : `section-contact-${key}`
  return { serviceCategory, formId }
}

/** Send one analytics event after the server has accepted the lead. */
export function trackLeadOnce({ requestId, serviceCategory, formId }: LeadEvent): void {
  const id = requestId.trim()
  if (!id) return

  const storageKey = `lead_sent_${id}`
  try {
    if (sessionStorage.getItem(storageKey)) return
    sessionStorage.setItem(storageKey, '1')
  } catch {
    // Private mode can block storage. Still try to send this attempt.
  }

  if (typeof window.gtag !== 'function') return

  window.gtag('event', 'generate_lead', {
    service_category: serviceCategory,
    form_id: formId,
  })
    window.gtag('event', 'conversion', {
        send_to: 'AW-18500972696/F2_LCLC1nZUdEJjh-fVE',
        transaction_id: id,
    })
}