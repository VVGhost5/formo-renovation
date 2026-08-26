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

const banner = computed(() => props.banner ?? {
  isShowed: true,
  eyebrow: '',
  headline: '',
  headlineEmphasis: '',
  description: '',
  ctaLabel: '',
  heroBackgroundUrl: '',
})
const bannerBg = computed(() =>
  banner.value.heroBackgroundUrl
    ? `background-image: url(${banner.value.heroBackgroundUrl})`
    : '',
)

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
  return []
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
  <section id="beforeafter" :style="bannerBg">
    <div class="ba-grid">

      <!-- LEFT col (2fr): Drag slider -->
      <div v-if="projects.length" class="ba-slider-col">
        <div
          class="ba-slider-wrap"
          @mousedown="startDrag"
          @touchstart.prevent="startDrag"
        >
          <img
            width="1280"
            height="720"
            class="ba-after-img"
            :src="active().after"
            alt="After renovation"
            draggable="false"
          />
          <div
            class="ba-before-layer"
            :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
          >
            <img
              width="1280"
              height="720"
              :src="active().before"
              alt="Before renovation"
              draggable="false"
            />
          </div>
          <div class="ba-label ba-label-before">Before</div>
          <div class="ba-label ba-label-after">After</div>
          <div class="ba-handle" :style="{ left: position + '%' }">
            <div class="ba-handle-grip">
              <div class="ba-arrows">
                <div class="ba-arrow ba-arrow-left"></div>
                <div class="ba-arrow ba-arrow-right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT col (1fr): Data about object -->
      <div class="ba-data-col">
        <div class="ba-data-top">
          <div class="ba-eyebrow">{{ banner.eyebrow }}</div>
          <h2 class="ba-headline">
            {{ banner.headline }}
            <em>{{ banner.headlineEmphasis }}</em>
          </h2>
          <p class="ba-desc">{{ banner.description }}</p>
        </div>

        <template v-if="projects.length">
          <div class="ba-tabs">
            <button
              v-for="(p, i) in projects"
              :key="p.name"
              class="ba-tab"
              :class="{ active: activeIdx === i }"
              @click="loadProject(i)"
            >{{ p.name }}</button>
          </div>

          <div class="ba-info">
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
        </template>

        <a href="/portfolio/" class="btn-outline">{{ banner.ctaLabel }}</a>
      </div>

    </div>
  </section>
</template>
