<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { validateQuickContactFields } from '../../utils/formValidation'
import { formatContactInput } from '../../utils/phoneMask'

const props = defineProps<{
  open: boolean
  phone?: string
  email?: string
  whatsapp?: string
}>()

const emit = defineEmits<{ close: [] }>()

const name  = ref('')
const contact = ref('')
const message = ref('')
const submitted = ref(false)
const submitting = ref(false)
const submitError = ref('')
const fieldErrors = ref<Record<string, string>>({})

function close() { emit('close') }

async function handleSubmit() {
  const errors = validateQuickContactFields({
    name: name.value,
    contact: contact.value,
    message: message.value,
  })
  fieldErrors.value = errors
  if (Object.keys(errors).length > 0) return

  submitting.value = true
  submitError.value = ''
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'request-message-response',
        Name: name.value.trim(),
        'Phone or Email': contact.value.trim(),
        Message: message.value.trim(),
      }),
    })
    const data = await res.json()
    if (data.ok) {
      submitted.value = true
    } else {
      submitError.value = 'Something went wrong. Please try again.'
    }
  } catch {
    submitError.value = 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}

function clearFieldError(field: string) {
  if (fieldErrors.value[field]) {
    const next = { ...fieldErrors.value }
    delete next[field]
    fieldErrors.value = next
  }
}

function onContactInput() {
  const formatted = formatContactInput(contact.value)
  if (formatted !== contact.value) contact.value = formatted
  clearFieldError('contact')
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) close()
}

onMounted(()  => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div v-if="open" class="cd-overlay" @click="close" aria-hidden="true" />
    </Transition>

    <Transition name="drawer-slide">
      <aside v-if="open" class="cd-drawer" role="dialog" aria-modal="true" aria-label="Contact us">
        <!-- Header -->
        <div class="cd-header">
          <div class="cd-header-left">
            <div class="cd-header-eyebrow">Free consultation</div>
            <h2 class="cd-header-title">Contact Us</h2>
          </div>
          <button class="cd-close" @click="close" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div class="cd-body">
          <!-- Contact channels -->
          <div class="cd-channels">
            <a :href="`tel:${(phone ?? '+12500000000').replace(/\D/g,'')}`" class="cd-channel">
              <span class="cd-ch-icon"><i class="fa-solid fa-phone"></i></span>
              <div class="cd-ch-body">
                <div class="cd-ch-label">Phone</div>
                <div class="cd-ch-value">{{ phone ?? '+1 (250) 000-0000' }}</div>
                <div class="cd-ch-note">Mon – Fri, 8:00 AM – 6:00 PM</div>
              </div>
              <span class="cd-ch-arrow">→</span>
            </a>

            <a :href="`mailto:${email ?? 'hello@formorenovations.ca'}`" class="cd-channel">
              <span class="cd-ch-icon"><i class="fa-solid fa-envelope"></i></span>
              <div class="cd-ch-body">
                <div class="cd-ch-label">Email</div>
                <div class="cd-ch-value">{{ email ?? 'hello@formorenovations.ca' }}</div>
                <div class="cd-ch-note">Response within 1 business day</div>
              </div>
              <span class="cd-ch-arrow">→</span>
            </a>
          </div>

          <!-- Working hours -->
          <div class="cd-hours">
            <div class="cd-hours-header">
              <span class="cd-hours-icon"><i class="fa-regular fa-clock"></i></span>
              <span class="cd-hours-title">Working Hours</span>
            </div>
            <div class="cd-hours-rows">
              <div class="cd-hours-row">
                <span class="cd-hours-day">Monday – Thursday</span>
                <span class="cd-hours-time">8:00 AM – 6:00 PM</span>
              </div>
              <div class="cd-hours-row">
                <span class="cd-hours-day">Friday</span>
                <span class="cd-hours-time">8:00 AM – 5:00 PM</span>
              </div>
              <div class="cd-hours-row">
                <span class="cd-hours-day">Saturday</span>
                <span class="cd-hours-time">10:00 AM – 3:00 PM</span>
              </div>
              <div class="cd-hours-row">
                <span class="cd-hours-day">Sunday</span>
                <span class="cd-hours-closed">Closed</span>
              </div>
            </div>
            <div class="cd-hours-badge">
              <span class="cd-hours-dot"></span>
              Currently accepting new projects
            </div>
          </div>

          <!-- Quick form -->
          <div class="cd-form-wrap">
            <div class="cd-form-title">Send a quick message</div>

            <div v-if="submitted" class="cd-success">
              <div class="cd-success-icon"><i class="fa-solid fa-check"></i></div>
              <div class="cd-success-title">Message sent!</div>
              <p class="cd-success-sub">We'll be in touch within one business day.</p>
            </div>

            <form v-else class="cd-form" @submit.prevent="handleSubmit" novalidate>
              <div class="cd-fg" :class="{ 'fg--error': fieldErrors.name }">
                <label for="cd-name">Your Name *</label>
                <input
                  id="cd-name"
                  v-model="name"
                  type="text"
                  placeholder="John Smith"
                  autocomplete="name"
                  @input="clearFieldError('name')"
                />
                <span v-if="fieldErrors.name" class="fg-error" role="alert">{{ fieldErrors.name }}</span>
              </div>
              <div class="cd-fg" :class="{ 'fg--error': fieldErrors.contact }">
                <label for="cd-contact">Phone or Email *</label>
                <input
                  id="cd-contact"
                  v-model="contact"
                  type="text"
                  placeholder="+1 (250) 000-0000 or email"
                  autocomplete="tel"
                  @input="onContactInput"
                />
                <span v-if="fieldErrors.contact" class="fg-error" role="alert">{{ fieldErrors.contact }}</span>
              </div>
              <div class="cd-fg" :class="{ 'fg--error': fieldErrors.message }">
                <label for="cd-message">Tell us about your project *</label>
                <textarea
                  id="cd-message"
                  v-model="message"
                  placeholder="Describe your project briefly…"
                  rows="3"
                  @input="clearFieldError('message')"
                ></textarea>
                <span v-if="fieldErrors.message" class="fg-error" role="alert">{{ fieldErrors.message }}</span>
              </div>
              <p v-if="submitError" class="cd-error">{{ submitError }}</p>
              <button
                type="submit"
                class="cd-submit"
                :class="{ loading: submitting }"
                :disabled="submitting"
              >
                <span v-if="!submitting">Send Message →</span>
                <span v-else class="cd-spinner"></span>
              </button>
            </form>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
