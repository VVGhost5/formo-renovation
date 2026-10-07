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

/** How many national digits sit before this caret in a formatted phone string. */
export function digitIndexFromCaret(formatted: string, caret: number): number {
  return extractPhoneDigits(formatted.slice(0, Math.max(0, caret))).length
}

/** Caret position just after the given national digit count. */
export function caretFromDigitIndex(formatted: string, digitIndex: number): number {
  if (!formatted) return 0
  if (digitIndex <= 0) {
    const open = formatted.indexOf('(')
    return open === -1 ? 0 : open + 1
  }

  let seen = 0
  let index = 0
  if (formatted.startsWith('+1')) {
    const open = formatted.indexOf('(')
    index = open === -1 ? formatted.length : open + 1
  }

  for (; index < formatted.length; index++) {
    if (/\d/.test(formatted[index] ?? '')) {
      seen++
      if (seen === digitIndex) return index + 1
    }
  }

  return formatted.length
}

export type PhoneEdit =
  | { kind: 'insert'; text: string; start: number; end: number }
  | { kind: 'delete'; start: number; end: number; direction: 'backward' | 'forward' }

/** Apply an insert or delete to national digits. Indexes are digit positions, not string offsets. */
export function editNationalDigits(digits: string, edit: PhoneEdit): { digits: string; caret: number } {
  const current = digits.slice(0, 10)
  const start = clamp(edit.start, 0, current.length)
  const end = clamp(edit.end, start, current.length)

  if (edit.kind === 'insert') {
    const incoming = extractPhoneDigits(edit.text)
    if (!incoming) return { digits: current, caret: start }
    // A full number replaces the field so paste and autofill land cleanly.
    if (incoming.length >= 10) return { digits: incoming.slice(0, 10), caret: 10 }
    const next = (current.slice(0, start) + incoming + current.slice(end)).slice(0, 10)
    return { digits: next, caret: Math.min(start + incoming.length, next.length) }
  }

  if (end > start) {
    return { digits: current.slice(0, start) + current.slice(end), caret: start }
  }

  if (edit.direction === 'forward') {
    if (start >= current.length) return { digits: current, caret: start }
    return { digits: current.slice(0, start) + current.slice(start + 1), caret: start }
  }

  if (start <= 0) return { digits: current, caret: 0 }
  return { digits: current.slice(0, start - 1) + current.slice(start), caret: start - 1 }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function setPhoneDigits(input: HTMLInputElement, digits: string, caretDigitIndex?: number): void {
  const national = digits.slice(0, 10)
  phoneDigits.set(input, national)
  const formatted = formatPhoneDigits(national)
  input.value = formatted
  if (document.activeElement !== input) return

  const caret = caretFromDigitIndex(
    formatted,
    caretDigitIndex ?? national.length,
  )
  const place = () => {
    if (document.activeElement !== input) return
    const pos = Math.max(0, Math.min(caret, input.value.length))
    try {
      input.setSelectionRange(pos, pos)
    } catch {
      // Some mobile browsers reject selection updates while the keyboard is settling.
    }
  }
  place()
  requestAnimationFrame(place)
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

type CaretRange = { start: number; end: number }

function readCaretRange(input: HTMLInputElement): CaretRange {
  const start = input.selectionStart ?? input.value.length
  const end = input.selectionEnd ?? start
  return { start: Math.min(start, end), end: Math.max(start, end) }
}

function widerRange(primary: CaretRange, extra: CaretRange | null): CaretRange {
  if (!extra || extra.end <= extra.start) return primary
  if (extra.end - extra.start > primary.end - primary.start) return extra
  return primary
}

function rangeFromInputEvent(input: HTMLInputElement, event: InputEvent): CaretRange {
  let range = readCaretRange(input)
  if (typeof event.getTargetRanges === 'function') {
    const ranges = event.getTargetRanges()
    if (ranges.length > 0) {
      let start = ranges[0]?.startOffset ?? range.start
      let end = ranges[0]?.endOffset ?? range.end
      for (const item of ranges) {
        start = Math.min(start, item.startOffset)
        end = Math.max(end, item.endOffset)
      }
      range = { start, end }
    }
  }
  return range
}

export function bindPhoneMask(input: HTMLInputElement): void {
  if (boundInputs.has(input)) return
  boundInputs.add(input)

  input.setAttribute('inputmode', 'numeric')
  input.setAttribute('maxlength', String(PHONE_MASK_MAX_LENGTH))
  input.setAttribute('autocomplete', input.getAttribute('autocomplete') ?? 'tel')

  setPhoneDigits(input, extractPhoneDigits(input.value))

  // Captured on keydown, before mobile browsers collapse a selection.
  let keySelection: CaretRange | null = null
  // Last highlighted range. A collapsed selectionchange on mobile can land before delete.
  let savedRange: CaretRange | null = null
  let pastedText = ''

  const rememberSelection = () => {
    const range = readCaretRange(input)
    if (range.end > range.start) savedRange = range
  }

  input.addEventListener('select', rememberSelection)
  input.addEventListener('pointerup', () => {
    const range = readCaretRange(input)
    if (range.start === range.end) savedRange = null
    else savedRange = range
  })
  document.addEventListener('selectionchange', () => {
    if (document.activeElement === input) rememberSelection()
  })

  input.addEventListener('paste', (event) => {
    pastedText = event.clipboardData?.getData('text') ?? ''
  })

  input.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return
    if (ALLOWED_KEYS.has(event.key)) {
      savedRange = null
      return
    }

    if (event.key === 'Backspace' || event.key === 'Delete' || (event.key.length === 1 && /\d/.test(event.key))) {
      keySelection = readCaretRange(input)
    }

    if (event.key === 'Backspace' || event.key === 'Delete') return
    if (event.key.length === 1 && /\d/.test(event.key)) return
    if (event.key.length === 1) event.preventDefault()
  })

  input.addEventListener('beforeinput', (event) => {
    const inputEvent = event as InputEvent
    const type = inputEvent.inputType
    let selection = widerRange(rangeFromInputEvent(input, inputEvent), keySelection)
    keySelection = null
    // Mobile often collapses a highlight before delete, so fall back to the last real selection.
    if (type.startsWith('delete') && selection.start === selection.end && savedRange) selection = savedRange
    if (type.startsWith('delete') || type.startsWith('insert')) savedRange = null

    const current = extractPhoneDigits(input.value)
    const digitStart = digitIndexFromCaret(input.value, selection.start)
    const digitEnd = digitIndexFromCaret(input.value, selection.end)

    if (type === 'insertText' || type === 'insertCompositionText') {
      const text = inputEvent.data ?? ''
      if (!text) return
      if (text.length === 1 && !/\d/.test(text)) {
        inputEvent.preventDefault()
        return
      }
      inputEvent.preventDefault()
      const next = editNationalDigits(current, {
        kind: 'insert',
        text,
        start: digitStart,
        end: digitEnd,
      })
      setPhoneDigits(input, next.digits, next.caret)
      input.dispatchEvent(new Event('input', { bubbles: true }))
      return
    }

    if (
      type === 'insertFromPaste' ||
      type === 'insertFromDrop' ||
      type === 'insertReplacementText' ||
      type === 'insertFromYank'
    ) {
      inputEvent.preventDefault()
      const text =
        inputEvent.data ??
        (inputEvent as InputEvent & { dataTransfer?: DataTransfer }).dataTransfer?.getData('text') ??
        pastedText
      pastedText = ''
      const next = editNationalDigits(current, {
        kind: 'insert',
        text,
        start: digitStart,
        end: digitEnd,
      })
      setPhoneDigits(input, next.digits, next.caret)
      input.dispatchEvent(new Event('input', { bubbles: true }))
      return
    }

    if (type.startsWith('delete')) {
      inputEvent.preventDefault()
      const direction = type === 'deleteContentForward' || type === 'deleteWordForward' ? 'forward' : 'backward'
      const clearingLine =
        selection.end === selection.start &&
        (type === 'deleteWordBackward' ||
          type === 'deleteSoftLineBackward' ||
          type === 'deleteHardLineBackward' ||
          type === 'deleteEntireSoftLine')
      const next = editNationalDigits(current, {
        kind: 'delete',
        start: clearingLine ? 0 : digitStart,
        end: digitEnd,
        direction,
      })
      setPhoneDigits(input, next.digits, next.caret)
      input.dispatchEvent(new Event('input', { bubbles: true }))
    }
  })
}

export function initPhoneMasks(root: ParentNode = document): void {
  root.querySelectorAll<HTMLInputElement>('[data-phone-mask]').forEach(bindPhoneMask)
}
