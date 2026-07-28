const PHONE_MASK_MAX_LENGTH = 17 // +1 (XXX) XXX-XXXX

/** Strip non-digits and keep up to 10 national digits (drops a leading US country code). */
export function extractPhoneDigits(value: string): string {
  let digits = value.replace(/\D/g, '')
  if (digits.length > 10 && digits.startsWith('1')) digits = digits.slice(1)
  return digits.slice(0, 10)
}

/** Format up to 10 digits as +1 (XXX) XXX-XXXX. */
export function formatPhoneDigits(digits: string): string {
  if (!digits) return ''

  if (digits.length <= 3) return `+1 (${digits}`
  if (digits.length <= 6) return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/** Format a phone input value from raw or partial user input. */
export function formatPhoneInput(value: string): string {
  return formatPhoneDigits(extractPhoneDigits(value))
}

/** True when the user appears to be typing an email, not a phone number. */
export function isLikelyEmailInput(value: string): boolean {
  return /[a-zA-Z@]/.test(value)
}

/** Format phone-or-email fields: mask only when input looks like a phone number. */
export function formatContactInput(value: string): string {
  if (isLikelyEmailInput(value)) return value
  return formatPhoneInput(value)
}

export function bindPhoneMask(input: HTMLInputElement): void {
  input.setAttribute('inputmode', 'numeric')
  input.setAttribute('maxlength', String(PHONE_MASK_MAX_LENGTH))
  input.setAttribute('autocomplete', input.getAttribute('autocomplete') ?? 'tel')

  const onInput = () => {
    const formatted = formatPhoneInput(input.value)
    if (input.value === formatted) return
    input.value = formatted
    input.setSelectionRange(formatted.length, formatted.length)
  }

  input.addEventListener('input', onInput)

  input.addEventListener('keydown', (e) => {
    if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return
    if (!/\d/.test(e.key)) e.preventDefault()
  })

  input.addEventListener('paste', (e) => {
    e.preventDefault()
    const pasted = e.clipboardData?.getData('text') ?? ''
    const digits = extractPhoneDigits(input.value + pasted)
    input.value = formatPhoneDigits(digits)
    input.setSelectionRange(input.value.length, input.value.length)
    input.dispatchEvent(new Event('input', { bubbles: true }))
  })
}

export function initPhoneMasks(root: ParentNode = document): void {
  root.querySelectorAll<HTMLInputElement>('[data-phone-mask]').forEach(bindPhoneMask)
}
