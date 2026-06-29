<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Review {
  _id: string
  name: string
  location: string
  service: string
  rating: number
  comment: string
  _createdAt: string
}

const props = defineProps<{
  initialReviews?: Review[]
}>()

const SANITY_PROJECT_ID = '9g3zb5ng'
const SANITY_DATASET = 'production'
const SANITY_API_VERSION = '2024-01-01'

const READ_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
const MUTATE_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`

const reviews = ref<Review[]>(props.initialReviews ?? [])
const loading = ref(!props.initialReviews?.length)
const fetchError = ref('')

const form = ref({ name: '', location: '', service: '', rating: 5, comment: '' })
const submitting = ref(false)
const submitted = ref(false)
const submitError = ref('')
const fieldErrors = ref<Record<string, string>>({})

const avgRating = computed(() => {
  if (!reviews.value.length) return 0
  return reviews.value.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.value.length
})

const avgRatingDisplay = computed(() => avgRating.value.toFixed(1))

const ratingCounts = computed(() => {
  const counts = [0, 0, 0, 0, 0]
  reviews.value.forEach(r => {
    const idx = Math.min(5, Math.max(1, Math.round(r.rating || 5))) - 1
    counts[idx]++
  })
  return counts
})

async function fetchReviews() {
  try {
    const query = encodeURIComponent(
      '*[_type == "review" && approved == true] | order(_createdAt desc){ _id, name, location, service, rating, comment, _createdAt }'
    )
    const res = await fetch(`${READ_URL}?query=${query}`)
    const data = await res.json()
    reviews.value = data.result || []
  } catch {
    fetchError.value = 'Could not load reviews right now.'
  } finally {
    loading.value = false
  }
}

function validateForm() {
  const errors: Record<string, string> = {}
  if (!form.value.name.trim()) errors.name = 'Please enter your name.'
  if (!form.value.comment.trim()) errors.comment = 'Please write your review.'
  if (form.value.comment.trim().length < 20) errors.comment = 'Review must be at least 20 characters.'
  fieldErrors.value = errors
  return Object.keys(errors).length === 0
}

async function submitReview() {
  if (!validateForm()) return
  submitting.value = true
  submitError.value = ''

  const token = import.meta.env.PUBLIC_SANITY_WRITE_TOKEN

  const doc = {
    _type: 'review',
    name: form.value.name.trim(),
    location: form.value.location.trim(),
    service: form.value.service.trim(),
    rating: form.value.rating,
    comment: form.value.comment.trim(),
    approved: false,
  }

  try {
    const res = await fetch(MUTATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ mutations: [{ create: doc }] }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error((err as { message?: string }).message || 'Submission failed')
    }
    submitted.value = true
  } catch (e: unknown) {
    submitError.value =
      e instanceof Error ? e.message : 'Could not submit your review. Please try again.'
  } finally {
    submitting.value = false
  }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'long' })
  } catch {
    return ''
  }
}

function setRating(n: number) {
  form.value.rating = n
}

onMounted(() => {
  if (!props.initialReviews?.length) {
    fetchReviews()
  }
})
</script>

<template>
  <!-- ══ REVIEWS GRID ══ -->
  <section id="reviews-list">
    <div class="rvs-container">

      <div class="rvs-header">
        <span class="rvs-eyebrow">Client Reviews</span>
        <h2 class="rvs-headline">What our <em>clients say</em></h2>
        <p class="rvs-sub">Real feedback from homeowners across Victoria and Vancouver Island.</p>
      </div>

      <div v-if="reviews.length" class="rvs-summary">
        <div class="rvs-avg">
          <span class="rvs-avg-num">{{ avgRatingDisplay }}</span>
          <div class="rvs-avg-stars">
            <i
              v-for="i in 5"
              :key="i"
              class="fa-star"
              :class="i <= Math.round(avgRating) ? 'fa-solid' : 'fa-regular'"
            ></i>
          </div>
          <span class="rvs-avg-label">{{ reviews.length }} verified {{ reviews.length === 1 ? 'review' : 'reviews' }}</span>
        </div>
        <div class="rvs-bars">
          <div
            v-for="n in [5, 4, 3, 2, 1]"
            :key="n"
            class="rvs-bar-row"
          >
            <span class="rvs-bar-label">{{ n }}<i class="fa-solid fa-star"></i></span>
            <div class="rvs-bar-track">
              <div
                class="rvs-bar-fill"
                :style="{ width: reviews.length ? (ratingCounts[n - 1] / reviews.length * 100) + '%' : '0%' }"
              ></div>
            </div>
            <span class="rvs-bar-count">{{ ratingCounts[n - 1] }}</span>
          </div>
        </div>
      </div>

      <div v-if="loading" class="rvs-loading">
        <div class="rvs-spinner"></div>
        <span>Loading reviews…</span>
      </div>

      <div v-else-if="fetchError" class="rvs-error">
        <i class="fa-solid fa-circle-exclamation"></i> {{ fetchError }}
      </div>

      <div v-else-if="!reviews.length" class="rvs-empty">
        <div class="rvs-empty-icon"><i class="fa-regular fa-comment-dots"></i></div>
        <div class="rvs-empty-title">No reviews yet</div>
        <p class="rvs-empty-sub">Be the first to share your experience with Formo Renovations.</p>
      </div>

      <div v-else class="rvs-grid">
        <article v-for="review in reviews" :key="review._id" class="rv-card">
          <div class="rv-card-top">
            <div class="rv-avatar">{{ review.name?.charAt(0)?.toUpperCase() || '?' }}</div>
            <div class="rv-meta">
              <div class="rv-name">{{ review.name }}</div>
              <div class="rv-location">
                <template v-if="review.location">
                  <i class="fa-solid fa-location-dot"></i> {{ review.location }}
                  <template v-if="review.service"> · {{ review.service }}</template>
                </template>
                <template v-else-if="review.service">{{ review.service }}</template>
              </div>
            </div>
            <div class="rv-date">{{ formatDate(review._createdAt) }}</div>
          </div>
          <div class="rv-stars">
            <i
              v-for="i in 5"
              :key="i"
              class="fa-star"
              :class="i <= (review.rating || 5) ? 'fa-solid' : 'fa-regular'"
            ></i>
          </div>
          <p class="rv-comment">"{{ review.comment }}"</p>
        </article>
      </div>

    </div>
  </section>

  <!-- ══ SUBMIT REVIEW ══ -->
  <section id="submit-review">
    <div class="srvs-inner">

      <div class="srvs-left">
        <span class="form-eyebrow">Share Your Experience</span>
        <h2 class="form-title">Leave a <em>review</em></h2>
        <p class="form-sub">
          Worked with us? We'd love to hear your feedback. Your review helps other homeowners make confident decisions.
        </p>
        <div class="srvs-note">
          <div class="srvs-note-icon"><i class="fa-solid fa-shield-halved"></i></div>
          <div>
            <div class="srvs-note-title">Moderated reviews</div>
            <div class="srvs-note-body">All reviews are verified before appearing on the site, typically within 24 hours.</div>
          </div>
        </div>
      </div>

      <div class="srvs-right">

        <div v-if="submitted" class="form-success show">
          <div class="success-icon"><i class="fa-solid fa-check"></i></div>
          <div class="success-title">Thank you for your review!</div>
          <p class="success-body">Your feedback has been received and will appear on the site after a quick review. We really appreciate you taking the time.</p>
        </div>

        <form v-else class="cform" @submit.prevent="submitReview" novalidate>
          <div class="cform-row">
            <div class="fg" :class="{ 'fg--error': fieldErrors.name }">
              <label>Your Name *</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="e.g. Sarah M."
                @input="delete fieldErrors.name"
              />
              <span v-if="fieldErrors.name" class="fg-error">{{ fieldErrors.name }}</span>
            </div>
            <div class="fg">
              <label>Location</label>
              <input v-model="form.location" type="text" placeholder="e.g. Oak Bay, Victoria, BC" />
            </div>
          </div>

          <div class="fg">
            <label>Service Type</label>
            <select v-model="form.service">
              <option value="">Select a service…</option>
              <option>Bathroom Renovation</option>
              <option>Kitchen Renovation</option>
              <option>Living / Bedroom</option>
              <option>Full Home Renovation</option>
              <option>Flooring</option>
              <option>Interior Finishing</option>
              <option>Other</option>
            </select>
          </div>

          <div class="fg">
            <label>Your Rating *</label>
            <div class="rv-rating-picker">
              <button
                v-for="n in 5"
                :key="n"
                type="button"
                class="rv-star-btn"
                :class="{ active: n <= form.rating }"
                @click="setRating(n)"
                :aria-label="`Rate ${n} star${n > 1 ? 's' : ''}`"
              >
                <i class="fa-star" :class="n <= form.rating ? 'fa-solid' : 'fa-regular'"></i>
              </button>
              <span class="rv-rating-label">{{ ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][form.rating] }}</span>
            </div>
          </div>

          <div class="fg" :class="{ 'fg--error': fieldErrors.comment }">
            <label>Your Review *</label>
            <textarea
              v-model="form.comment"
              rows="5"
              placeholder="Share your experience — the quality of work, communication, and overall satisfaction…"
              @input="delete fieldErrors.comment"
            ></textarea>
            <span v-if="fieldErrors.comment" class="fg-error">{{ fieldErrors.comment }}</span>
          </div>

          <div v-if="submitError" class="srvs-submit-error">
            <i class="fa-solid fa-triangle-exclamation"></i> {{ submitError }}
          </div>

          <div class="form-submit-row">
            <button class="cform-submit" type="submit" :disabled="submitting">
              <template v-if="submitting">
                <span class="btn-spinner"></span> Submitting…
              </template>
              <template v-else>Submit Review →</template>
            </button>
            <p class="form-privacy">Your review is moderated before publishing.</p>
          </div>
        </form>

      </div>
    </div>
  </section>
</template>
