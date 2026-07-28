const PHONE_MASK_MAX_LENGTH = 17 // +1 (XXX) XXX-XXXX

const phoneDigits = new WeakMap<HTMLInputElement, string>()
const boundInputs = new WeakSet<HTMLInputElement>()

/** National digits only — ignores the +1 mask prefix already shown in the field. */
export function extractPhoneDigits(value: string): string {
  let digits = value.replace(/^\+1\s*/, '').replace(/\D/g, '')
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

function setPhoneDigits(input: HTMLInputElement, digits: string): void {
  const national = digits.slice(0, 10)
  phoneDigits.set(input, national)
  const formatted = formatPhoneDigits(national)
  input.value = formatted
  input.setSelectionRange(formatted.length, formatted.length)
}

const ALLOWED_KEYS = new Set([
  'Tab',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
])

export function bindPhoneMask(input: HTMLInputElement): void {
  if (boundInputs.has(input)) return
  boundInputs.add(input)

  input.setAttribute('inputmode', 'numeric')
  input.setAttribute('maxlength', String(PHONE_MASK_MAX_LENGTH))
  input.setAttribute('autocomplete', input.getAttribute('autocomplete') ?? 'tel')

  setPhoneDigits(input, extractPhoneDigits(input.value))

  // Only block non-digit printable keys that don't generate a beforeinput event;
  // digits, Backspace, and Delete are handled exclusively in beforeinput below.
  input.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (ALLOWED_KEYS.has(e.key)) return
    if (e.key === 'Backspace' || e.key === 'Delete') return
    if (e.key.length === 1 && /\d/.test(e.key)) return
    if (e.key.length === 1) e.preventDefault()
  })

  // beforeinput fires before the DOM change and its preventDefault() is the
  // only reliable cross-browser / cross-device way to block text insertion.
  // Handling both insertion and deletion here prevents the double-digit bug
  // that occurred when the browser inserted the character despite keydown
  // preventDefault() (common on Android virtual keyboards).
  input.addEventListener('beforeinput', (e) => {
    const ie = e as InputEvent
    ie.preventDefault()

    if (ie.inputType === 'insertText') {
      const char = ie.data ?? ''
      if (!/^\d$/.test(char)) return
      const current = phoneDigits.get(input) ?? ''
      if (current.length >= 10) return
      setPhoneDigits(input, current + char)
      input.dispatchEvent(new Event('input', { bubbles: true }))
    } else if (
      ie.inputType === 'deleteContentBackward' ||
      ie.inputType === 'deleteContentForward'
    ) {
      const current = phoneDigits.get(input) ?? ''
      if (current.length > 0) {
        setPhoneDigits(input, current.slice(0, -1))
        input.dispatchEvent(new Event('input', { bubbles: true }))
      }
    }
    // insertFromPaste is handled by the paste listener below
  })

  input.addEventListener('paste', (e) => {
    e.preventDefault()
    const pasted = e.clipboardData?.getData('text') ?? ''
    setPhoneDigits(input, extractPhoneDigits(pasted))
    input.dispatchEvent(new Event('input', { bubbles: true }))
  })
}

export function initPhoneMasks(root: ParentNode = document): void {
  root.querySelectorAll<HTMLInputElement>('[data-phone-mask]').forEach(bindPhoneMask)
}
