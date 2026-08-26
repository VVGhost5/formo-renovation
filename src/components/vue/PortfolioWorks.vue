<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { PortfolioProject } from '../../utils/sanity'
import {
  PORTFOLIO_CATEGORY_OPTIONS,
  categoryLabel,
  projectMatchesCategory,
  type PortfolioCategory,
} from '../../utils/sanity/categories'

const props = defineProps<{
  projects?: PortfolioProject[]
}>()

// ── Types ────────────────────────────────────────────────────────────────────
interface Spec  { key: string; val: string }
interface Image { src: string; alt: string }

interface Project {
  id: string
  num: string
  categories: PortfolioCategory[]
  name: string
  tags: string[]
  location: string
  duration: string
  year: string
  description: string
  specs: Spec[]
  gallery: Image[]
  baAfter: string
  baBefore: string
}

const allProjects = computed<Project[]>(() =>
  (props.projects as Project[]) ?? [],
)

// ── Filter ───────────────────────────────────────────────────────────────────
type Filter = 'all' | PortfolioCategory
const activeFilter = ref<Filter>('all')

function setFilter(cat: Filter) {
  activeFilter.value = cat
  // Close any open accordion when filter changes
  openId.value = null
}

const visibleProjects = computed(() =>
  activeFilter.value === 'all'
    ? allProjects.value
    : allProjects.value.filter((p) => projectMatchesCategory(p, activeFilter.value as PortfolioCategory)),
)

// ── Accordion ────────────────────────────────────────────────────────────────
const openId = ref<string | null>(null)

function toggleProject(id: string) {
  const wasOpen = openId.value === id
  openId.value  = wasOpen ? null : id
  if (!wasOpen) {
    // Reset B/A slider for this project when opening
    const idx = allProjects.value.findIndex(p => p.id === id)
    if (idx >= 0) baPositions.value[idx] = 50
  }
}

// ── Per-project Before/After sliders ─────────────────────────────────────────
const baPositions = ref<number[]>([])

watch(
  allProjects,
  (list) => {
    baPositions.value = list.map(() => 50)
  },
  {immediate: true},
)
const baDragging  = ref<number | null>(null)

function startBaDrag(e: MouseEvent | TouchEvent, idx: number) {
  baDragging.value = idx
  updateBaPos(e, idx)
}

function updateBaPos(e: MouseEvent | TouchEvent, idx: number) {
  const target = (e.currentTarget as HTMLElement) ||
    document.querySelector(`[data-ba-idx="${idx}"]`) as HTMLElement
  if (!target) return
  const rect    = target.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  baPositions.value[idx] = Math.min(100, Math.max(0,
    ((clientX - rect.left) / rect.width) * 100
  ))
}

function onWindowMouseMove(e: MouseEvent) {
  if (baDragging.value === null) return
  const wrap = document.querySelector(`[data-ba-idx="${baDragging.value}"]`) as HTMLElement
  if (!wrap) return
  const rect = wrap.getBoundingClientRect()
  baPositions.value[baDragging.value] = Math.min(100, Math.max(0,
    ((e.clientX - rect.left) / wrap.offsetWidth) * 100
  ))
}

function onWindowMouseUp()  { baDragging.value = null }
function onWindowTouchEnd() { baDragging.value = null }

function onBaTouchMove(e: TouchEvent, idx: number) {
  if (baDragging.value !== idx) return
  const wrap = document.querySelector(`[data-ba-idx="${idx}"]`) as HTMLElement
  if (!wrap) return
  const rect = wrap.getBoundingClientRect()
  baPositions.value[idx] = Math.min(100, Math.max(0,
    ((e.touches[0].clientX - rect.left) / wrap.offsetWidth) * 100
  ))
}

onMounted(() => {
  window.addEventListener('mousemove', onWindowMouseMove)
  window.addEventListener('mouseup',   onWindowMouseUp)
  window.addEventListener('touchend',  onWindowTouchEnd, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onWindowMouseMove)
  window.removeEventListener('mouseup',   onWindowMouseUp)
  window.removeEventListener('touchend',  onWindowTouchEnd)
})

// ── Lightbox ─────────────────────────────────────────────────────────────────
const lbOpen    = ref(false)
const lbImages  = ref<Image[]>([])
const lbProject = ref('')
const lbIdx     = ref(0)

function openLightbox(project: Project, imgIdx: number) {
  lbImages.value  = project.gallery
  lbProject.value = project.name
  lbIdx.value     = imgIdx
  lbOpen.value    = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lbOpen.value = false
  document.body.style.overflow = ''
}

function lbNav(dir: 1 | -1) {
  lbIdx.value = (lbIdx.value + dir + lbImages.value.length) % lbImages.value.length
}

function onLbKey(e: KeyboardEvent) {
  if (!lbOpen.value) return
  if (e.key === 'Escape')     closeLightbox()
  if (e.key === 'ArrowRight') lbNav(1)
  if (e.key === 'ArrowLeft')  lbNav(-1)
}

onMounted(()  => document.addEventListener('keydown', onLbKey))
onUnmounted(() => document.removeEventListener('keydown', onLbKey))

// ── Filter labels ─────────────────────────────────────────────────────────────
const filterButtons: {id: Filter; label: string}[] = [
  {id: 'all', label: 'All Projects'},
  ...PORTFOLIO_CATEGORY_OPTIONS.map((option) => ({id: option.value, label: option.title})),
]

function displayTags(project: Project): string[] {
  const fromCategories = project.categories.map(categoryLabel)
  const extras = project.tags.filter(
    (tag) => !fromCategories.some((label) => label.toLowerCase() === tag.trim().toLowerCase()),
  )
  return [...fromCategories, ...extras]
}
</script>

<template>
  <!-- ═══════════ OUR WORKS ═══════════ -->
  <section id="our-works">
    <div class="works-intro">
      <div class="works-intro-left">
        <span class="eyebrow-light">Our Works</span>
        <h2 class="works-title">Spaces we've <em>transformed</em></h2>
      </div>
      <div class="works-intro-right">
        <p class="works-desc">
          Each project below represents our commitment to craftsmanship and detail. Click any project to see the full photo gallery, before/after comparison, and project specifications.
        </p>
        <div class="works-filter-row">
          <button
            v-for="f in filterButtons"
            :key="f.id"
            class="works-filter"
            :class="{ active: activeFilter === f.id }"
            @click="setFilter(f.id)"
          >{{ f.label }}</button>
        </div>
      </div>
    </div>

    <!-- Project blocks -->
    <div
      v-for="(p, idx) in visibleProjects"
      :key="p.id"
      class="project-block"
      :class="{ open: openId === p.id }"
    >
      <!-- Header row -->
      <div class="project-header" @click="toggleProject(p.id)">
        <div class="project-num">{{ String(idx + 1).padStart(2, '0') }}</div>
        <div class="project-meta">
          <span class="project-name">{{ p.name }}</span>
          <div class="project-tags">
            <span v-for="tag in displayTags(p)" :key="tag" class="project-tag">{{ tag }}</span>
          </div>
        </div>
        <div class="project-info">
          <div class="project-info-item">
            <span class="project-info-label">Location</span>
            <span class="project-info-value">{{ p.location }}</span>
          </div>
          <div class="project-info-item">
            <span class="project-info-label">Duration</span>
            <span class="project-info-value">{{ p.duration }}</span>
          </div>
        </div>
        <div class="project-toggle">+</div>
      </div>

      <!-- Collapsible content -->
      <div class="project-content">
        <div class="project-content-inner">

          <!-- Description + specs -->
          <div class="project-desc-row">
            <div>
              <div class="project-desc-label">About This Project</div>
              <p class="project-desc-text">{{ p.description }}</p>
            </div>
            <div class="project-specs">
              <div v-for="s in p.specs" :key="s.key" class="project-spec-row">
                <span class="project-spec-key">{{ s.key }}</span>
                <span class="project-spec-val">{{ s.val }}</span>
              </div>
            </div>
          </div>

          <!-- Gallery -->
          <div class="project-gallery-label">Photo Gallery</div>
          <div class="project-gallery has-feature">
            <div
              v-for="(img, i) in p.gallery"
              :key="img.src"
              class="gallery-item"
              @click="openLightbox(p, i)"
            >
              <img 
                  :src="img.src" 
                  :alt="img.alt" 
                  loading="lazy" 
                  width="630"
                  height="530"
              />
              <div class="gallery-item-overlay">
                <div class="gallery-zoom-icon">⤢</div>
              </div>
            </div>
          </div>

          <!-- Before / After slider — only when both images exist -->
          <template v-if="p.baBefore && p.baAfter">
            <div class="project-ba-label">Before &amp; After</div>
            <div
              class="project-ba-wrap"
              :data-ba-idx="idx"
              @mousedown.prevent="startBaDrag($event, idx)"
              @touchstart.prevent="startBaDrag($event, idx)"
              @touchmove.prevent="onBaTouchMove($event, idx)"
            >
              <img
                  width="1280"
                  height="420"
                  :src="p.baAfter"
                  alt="After"
              />
              <div
                class="project-ba-before-layer"
                :style="{ clipPath: `inset(0 ${100 - baPositions[idx]}% 0 0)` }"
              >
                <img
                    width="1280"
                    height="420"
                    :src="p.baBefore"
                    alt="Before"
                />
              </div>
              <span class="ba-label-inner before">BEFORE</span>
              <span class="ba-label-inner after">AFTER</span>
              <div class="ba-handle-inner" :style="{ left: baPositions[idx] + '%' }">
                <div class="ba-grip-inner">
                  <div class="ba-arr ba-arr-l"></div>
                  <div class="ba-arr ba-arr-r"></div>
                </div>
              </div>
            </div>
          </template>

        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════ LIGHTBOX ═══════════ -->
  <div class="lightbox-overlay" :class="{ open: lbOpen }" @click.self="closeLightbox">
    <div class="lb-inner">
      <button class="lb-close" @click="closeLightbox">✕</button>
      <button class="lb-nav prev" @click="lbNav(-1)">‹</button>
      <button class="lb-nav next" @click="lbNav(1)">›</button>
      <div class="lb-img-wrap">
        <img 
            width="1110"
            height="720"
            :src="lbImages[lbIdx]?.src" 
            :alt="lbImages[lbIdx]?.alt" 
        />
      </div>
      <div class="lb-caption">
        <div class="lb-caption-name">{{ lbProject }}</div>
        <div class="lb-caption-meta">Photo {{ lbIdx + 1 }} of {{ lbImages.length }}</div>
      </div>
      <div class="lb-counter">{{ lbIdx + 1 }} / {{ lbImages.length }}</div>
    </div>
  </div>
</template>
