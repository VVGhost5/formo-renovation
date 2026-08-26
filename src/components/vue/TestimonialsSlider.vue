<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TestimonialSlide } from '../../utils/sanity'

const props = defineProps<{
  items?: TestimonialSlide[]
}>()

interface Testimonial {
  name: string
  meta: string
  text: string
  initial: string
  rating: number
}

const testimonials = computed<Testimonial[]>(() => {
  const fromSanity = props.items?.filter((t) => t.name && t.text) ?? []
  return fromSanity.map((t) => ({
    name: t.name,
    meta: t.meta,
    text: t.text,
    initial: t.initial,
    rating: t.rating,
  }))
})

const VISIBLE = 3
const current = ref(0)

const maxIndex = computed(() => Math.max(0, testimonials.value.length - VISIBLE))

const trackStyle = computed(() => {
  const cardWidth  = `calc((100% - 32px) / ${VISIBLE})`
  const offset     = `calc(${current.value} * (${cardWidth} + 16px))`
  return { transform: `translateX(calc(-1 * ${offset}))` }
})

function prev() {
  if (current.value > 0) current.value--
}

function next() {
  if (current.value < maxIndex.value) current.value++
}

function goTo(i: number) {
  current.value = Math.min(i, maxIndex.value)
}
</script>

<template>
  <section id="testimonials">
    <div class="testi-head">
      <div class="testi-head-left">
        <div class="testi-eyebrow">Client Testimonials</div>
        <h2 class="testi-headline">What Our Clients <em>Say</em></h2>
      </div>
      <div class="testi-head-right">
        <button
          class="testi-arrow"
          :class="{ disabled: current === 0 }"
          aria-label="Previous"
          @click="prev"
        >←</button>
        <button
          class="testi-arrow"
          :class="{ disabled: current >= maxIndex }"
          aria-label="Next"
          @click="next"
        >→</button>
      </div>
    </div>

    <div class="testi-slider-wrap">
      <div class="testi-track" :style="trackStyle">
        <div v-for="t in testimonials" :key="`${t.name}-${t.meta}`" class="testi-card">
          <div class="testi-stars">
            <span
              v-for="i in 5"
              :key="i"
              class="testi-star"
              :class="{ filled: i <= t.rating }"
            >★</span>
          </div>
          <p class="testi-text">{{ t.text }}</p>
          <div class="testi-author">
            <div class="testi-avatar">{{ t.initial }}</div>
            <div class="testi-author-info">
              <div class="testi-name">{{ t.name }}</div>
              <div class="testi-meta">{{ t.meta }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="testimonials.length > VISIBLE" class="testi-dots">
      <span
        v-for="i in testimonials.length - VISIBLE + 1"
        :key="i"
        class="testi-dot"
        :class="{ active: current === i - 1 }"
        @click="goTo(i - 1)"
      ></span>
    </div>

    <div class="testi-cta">
      <a href="/reviews/" class="btn-dark">Read All Reviews →</a>
    </div>
  </section>
</template>
