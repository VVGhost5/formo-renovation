<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BeforeAfterSlide, HomeBeforeAfterBannerContent } from '../../utils/sanity'

const props = defineProps<{
  items?: BeforeAfterSlide[]
  banner?: HomeBeforeAfterBannerContent
}>()

interface Project {
  name: string
  loc: string
  dur: string
  year: string
  after: string
  before: string
}

const DEFAULT_BANNER: HomeBeforeAfterBannerContent = {
  eyebrow: 'Before & After',
  headline: 'Real Results,',
  headlineEmphasis: 'Real Spaces',
  description:
    'Every transformation starts with a vision. Drag the slider to see exactly how we turned each space from its original condition into a finished result our clients love.',
  ctaLabel: 'View All Projects →',
  heroBackgroundUrl:
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1800&q=85',
}

const banner = computed(() => props.banner ?? DEFAULT_BANNER)
const bannerBg = computed(() => `background-image: url(${banner.value.heroBackgroundUrl})`)

const FALLBACK: Project[] = [
  {
    name: 'Kitchen Renovation',
    loc: 'Fairfield, Victoria',
    dur: '6 weeks',
    year: '2024',
    after:  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85',
    before: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1400&q=85',
  },
  {
    name: 'Bathroom Remodel',
    loc: 'Oak Bay, Victoria',
    dur: '4 weeks',
    year: '2024',
    after:  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&q=85',
    before: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=1400&q=85',
  },
  {
    name: 'Living Room',
    loc: 'Saanich, BC',
    dur: '3 weeks',
    year: '2024',
    after:  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=85',
    before: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85',
  },
  {
    name: 'Full Apartment',
    loc: 'Langford, BC',
    dur: '12 weeks',
    year: '2025',
    after:  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1400&q=85',
    before: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=85',
  },
]

const projects = computed<Project[]>(() => {
  const fromSanity = props.items?.filter((p) => p.name && p.after && p.before) ?? []
  if (fromSanity.length > 0) {
    return fromSanity.map((p) => ({
      name: p.name,
      loc: p.location,
      dur: p.duration,
      year: p.year,
      after: p.after,
      before: p.before,
    }))
  }
  return FALLBACK
})

const activeIdx  = ref(0)
const position   = ref(50) // percent
const isDragging = ref(false)

const active = () => projects.value[activeIdx.value]

function loadProject(idx: number) {
  activeIdx.value = idx
  position.value  = 50
}

function getPercent(clientX: number, el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
}

function startDrag(e: MouseEvent | TouchEvent) {
  isDragging.value = true
  const sliderEl = (e.currentTarget as HTMLElement)

  function move(ev: MouseEvent | TouchEvent) {
    if (!isDragging.value) return
    const clientX = 'touches' in ev ? ev.touches[0].clientX : ev.clientX
    position.value = getPercent(clientX, sliderEl)
  }

  function stop() {
    isDragging.value = false
    window.removeEventListener('mousemove', move)
    window.removeEventListener('touchmove', move)
    window.removeEventListener('mouseup',   stop)
    window.removeEventListener('touchend',  stop)
  }

  window.addEventListener('mousemove', move)
  window.addEventListener('touchmove', move, { passive: true })
  window.addEventListener('mouseup',   stop)
  window.addEventListener('touchend',  stop)

  // Initial position on click/touch
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  position.value = getPercent(clientX, sliderEl)
}
</script>

<template>
  <section id="beforeafter">
    <!-- Banner -->
    <div class="ba-hero">
      <div class="ba-hero-img" :style="bannerBg"></div>
      <div class="ba-hero-content">
        <div class="ba-eyebrow">{{ banner.eyebrow }}</div>
        <h2 class="ba-headline">
          {{ banner.headline }}
          <em>{{ banner.headlineEmphasis }}</em>
        </h2>
        <p class="ba-desc">{{ banner.description }}</p>
        <a href="/portfolio" class="btn-outline-light">{{ banner.ctaLabel }}</a>
      </div>
    </div>

    <!-- Interactive slider content -->
    <div class="ba-content">

      <!-- Project selector tabs -->
      <div class="ba-tabs">
        <button
          v-for="(p, i) in projects"
          :key="p.name"
          class="ba-tab"
          :class="{ active: activeIdx === i }"
          @click="loadProject(i)"
        >{{ p.name }}</button>
      </div>

      <!-- Drag slider -->
      <div
        class="ba-slider-wrap"
        @mousedown="startDrag"
        @touchstart.prevent="startDrag"
      >
        <!-- After image (base layer) -->
        <img
          class="ba-after-img"
          :src="active().after"
          alt="After renovation"
          draggable="false"
        />

        <!-- Before image (clipped overlay) -->
        <div
          class="ba-before-layer"
          :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
        >
          <img :src="active().before" alt="Before renovation" draggable="false"/>
        </div>

        <!-- Labels -->
        <div class="ba-label ba-label-before">Before</div>
        <div class="ba-label ba-label-after">After</div>

        <!-- Drag handle -->
        <div class="ba-handle" :style="{ left: position + '%' }">
          <div class="ba-handle-grip">
            <div class="ba-arrows">
              <div class="ba-arrow ba-arrow-left"></div>
              <div class="ba-arrow ba-arrow-right"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project info row -->
      <div class="ba-info-row">
        <div class="ba-info-cell">
          <div class="ba-info-label">Project</div>
          <div class="ba-info-value">{{ active().name }}</div>
        </div>
        <div class="ba-info-cell">
          <div class="ba-info-label">Location</div>
          <div class="ba-info-value">{{ active().loc }}</div>
        </div>
        <div class="ba-info-cell">
          <div class="ba-info-label">Duration</div>
          <div class="ba-info-value">{{ active().dur }}</div>
        </div>
        <div class="ba-info-cell">
          <div class="ba-info-label">Completed</div>
          <div class="ba-info-value">{{ active().year }}</div>
        </div>
      </div>

    </div>
  </section>
</template>
