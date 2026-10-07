export const PHONE_REGEX = /^\+1 \(\d{3}\) \d{3}-\d{4}$/
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const MESSAGE_LIMIT = 1200

export const MESSAGES = {
  required: 'This field is required.',
  name: 'Please enter your name.',
  email: 'Enter a valid email (e.g. john@example.com).',
  phone: 'Enter phone as +1 (XXX) XXX-XXXX.',
  phoneOrEmail: 'Enter a valid phone (+1 (XXX) XXX-XXXX) or email address.',
  project: 'Please tell us about your project.',
  service: 'Please select a service.',
  messageLimit: 'You have reached the 1,200 character limit.',
} as const

export function isRequired(value: string): boolean {
  return value.trim().length > 0
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim())
}

export function isValidPhone(value: string): boolean {
  return PHONE_REGEX.test(value.trim())
}

export function isValidPhoneOrEmail(value: string): boolean {
  const trimmed = value.trim()
  return isValidPhone(trimmed) || isValidEmail(trimmed)
}

export function validateOptionalMessage(value: string): string | null {
  const text = value.trim()
  if (!text) return null
  if (text.length > MESSAGE_LIMIT) return MESSAGES.messageLimit
  return null
}

export function validatePhoneField(value: string): string | null {
  if (!isRequired(value)) return MESSAGES.required
  if (!isValidPhone(value)) return MESSAGES.phone
  return null
}

export function validateEmailField(value: string): string | null {
  if (!isRequired(value)) return MESSAGES.required
  if (!isValidEmail(value)) return MESSAGES.email
  return null
}

export type FieldErrors = Record<string, string>

export function validateEstimateFields(values: {
  name: string
  phone: string
  email: string
}): FieldErrors {
  const errors: FieldErrors = {}

  if (!isRequired(values.name)) errors.name = MESSAGES.name

  const phoneError = validatePhoneField(values.phone)
  if (phoneError) errors.phone = phoneError

  const emailError = validateEmailField(values.email)
  if (emailError) errors.email = emailError

  return errors
}

export function validateDoorsEstimateFields(values: {
  name: string
  email: string
  phone: string
  service: string
  message?: string
}): FieldErrors {
  const errors: FieldErrors = {}

  if (!isRequired(values.name)) errors.name = MESSAGES.name

  const emailError = validateEmailField(values.email)
  if (emailError) errors.email = emailError

  const phoneError = validatePhoneField(values.phone)
  if (phoneError) errors.phone = phoneError

  if (!isRequired(values.service)) errors.service = MESSAGES.service

  const messageError = validateOptionalMessage(values.message ?? '')
  if (messageError) errors.message = messageError

  return errors
}

export function validateContactFields(values: {
  firstName: string
  email: string
  phone: string
  message: string
}): FieldErrors {
  const errors: FieldErrors = {}

  if (!isRequired(values.firstName)) errors.firstName = MESSAGES.name

  const emailError = validateEmailField(values.email)
  if (emailError) errors.email = emailError

  const phoneError = validatePhoneField(values.phone)
  if (phoneError) errors.phone = phoneError

  const messageError = validateOptionalMessage(values.message)
  if (messageError) errors.message = messageError

  return errors
}

export function validateQuickContactFields(values: {
  name: string
  contact: string
  message: string
}): FieldErrors {
  const errors: FieldErrors = {}

  if (!isRequired(values.name)) errors.name = MESSAGES.name
  if (!isRequired(values.contact)) {
    errors.contact = MESSAGES.required
  } else if (!isValidPhoneOrEmail(values.contact)) {
    errors.contact = MESSAGES.phoneOrEmail
  }
  const messageError = validateOptionalMessage(values.message)
  if (messageError) errors.message = messageError

  return errors
}

export function setFieldError(
  container: HTMLElement | null,
  message: string | null,
  errorClass = 'fg--error',
  clearOnInput = true,
): void {
  if (!container) return

  container.classList.toggle(errorClass, !!message)

  let errEl = container.querySelector('.fg-error') as HTMLElement | null
  if (message) {
    if (!errEl) {
      errEl = document.createElement('span')
      errEl.className = 'fg-error'
      errEl.setAttribute('role', 'alert')
      container.appendChild(errEl)
    }
    errEl.textContent = message
  } else if (errEl) {
    errEl.remove()
  }

  if (message && clearOnInput) {
    container.querySelectorAll('input, textarea, select').forEach((el) => {
      el.addEventListener('input', () => setFieldError(container, null, errorClass), { once: true })
      el.addEventListener('change', () => setFieldError(container, null, errorClass), { once: true })
    })
  }
}

export function bindOptionalMessageField(
  field: HTMLTextAreaElement | null,
  container: HTMLElement | null,
  errorClass = 'fg--error',
): void {
  if (!field || !container) return
  field.addEventListener('input', () => {
    queueMicrotask(() => {
      setFieldError(container, validateOptionalMessage(field.value), errorClass, false)
    })
  })
}

export function applyFieldErrors(
  fieldMap: Record<string, HTMLElement | null>,
  errors: FieldErrors,
  errorClass = 'fg--error',
): boolean {
  let valid = true
  for (const [key, container] of Object.entries(fieldMap)) {
    const message = errors[key] ?? null
    if (message) valid = false
    setFieldError(container, message, errorClass)
  }
  return valid
}

export function clearFormErrors(form: HTMLElement, errorClass = 'fg--error'): void {
  form.querySelectorAll(`.${errorClass}`).forEach((el) => {
    setFieldError(el as HTMLElement, null, errorClass)
  })
}
