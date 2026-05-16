<script setup lang="ts">
import { ref, computed } from 'vue'

interface Testimonial {
  name: string
  meta: string
  text: string
  initial: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    meta: 'Oak Bay, Victoria · March 2025',
    initial: 'S',
    text: '"From the very first consultation, we felt heard and understood. The team delivered exactly what they promised — on time, within budget, and with quality that genuinely exceeded our expectations. Our kitchen feels like a completely different home."',
  },
  {
    name: 'James & Linda K.',
    meta: 'Saanich, BC · January 2025',
    initial: 'J',
    text: '"We\'ve worked with renovators before who disappeared after signing the contract. Formo was completely different — constant updates, immediate responses, and a finished result we\'re incredibly proud of. Would recommend to anyone."',
  },
  {
    name: 'Rachel T.',
    meta: 'Langford, BC · February 2025',
    initial: 'R',
    text: '"The quality of finishing work is on an entirely different level. I\'ve seen many renovated homes — none matched the level of detail and care that went into ours. The attention to small details made all the difference. Worth every penny."',
  },
  {
    name: 'David & Anna P.',
    meta: 'Colwood, BC · November 2024',
    initial: 'D',
    text: '"Honest pricing, no hidden surprises, and they actually stuck to the timeline. I was skeptical at first — renovations are usually chaotic — but this team runs a tight, professional operation. The bathroom looks absolutely stunning."',
  },
  {
    name: 'Michael R.',
    meta: 'Esquimalt, BC · December 2024',
    initial: 'M',
    text: '"We hired Formo for a full living room and hallway renovation. Communication was exceptional throughout — we always knew what stage the project was at. The result speaks for itself: clean, elegant, and exactly what we envisioned."',
  },
  {
    name: 'Catherine L.',
    meta: 'Victoria, BC · October 2024',
    initial: 'C',
    text: '"Professional from start to finish. The estimate was detailed and accurate, the site was kept clean daily, and the project wrapped exactly on schedule. I\'ve already referred two neighbours. Absolutely the best renovation experience I\'ve had."',
  },
  {
    name: 'Natalie G.',
    meta: 'James Bay, Victoria · September 2024',
    initial: 'N',
    text: '"I cannot say enough good things about Formo. They guided me through the entire process, helped me make material choices, and never once made me feel overwhelmed. The kitchen renovation exceeded every expectation I had."',
  },
  {
    name: 'Tom & Julie W.',
    meta: 'Fairfield, Victoria · August 2024',
    initial: 'T',
    text: '"Formo transformed our dated main floor into something we\'re genuinely proud to show off. The crew was respectful, clean, and never once left us wondering what was happening. Transparent, skilled, and truly professional."',
  },
]

const VISIBLE = 3
const current = ref(0)

const maxIndex = computed(() => testimonials.length - VISIBLE)

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
        <div v-for="t in testimonials" :key="t.name" class="testi-card">
          <div class="testi-stars">
            <span v-for="i in 5" :key="i" class="testi-star">★</span>
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

    <div class="testi-dots">
      <span
        v-for="i in testimonials.length - VISIBLE + 1"
        :key="i"
        class="testi-dot"
        :class="{ active: current === i - 1 }"
        @click="goTo(i - 1)"
      ></span>
    </div>

    <div class="testi-cta">
      <a href="/reviews" class="btn-dark">Read All Reviews →</a>
    </div>
  </section>
</template>
