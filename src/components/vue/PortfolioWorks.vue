<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { PortfolioProject } from '../../utils/sanity'

const props = defineProps<{
  projects?: PortfolioProject[]
}>()

// ── Types ────────────────────────────────────────────────────────────────────
interface Spec  { key: string; val: string }
interface Image { src: string; alt: string }

interface Project {
  id: string
  num: string
  category: 'kitchen' | 'bathroom' | 'living' | 'full'
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

// ── Data ─────────────────────────────────────────────────────────────────────
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'project-1', num: '01', category: 'kitchen',
    name: 'Modern Kitchen Renovation',
    tags: ['Kitchen', 'Full Remodel', '2024'],
    location: 'Fairfield, Victoria', duration: '6 Weeks', year: '2024',
    description: 'Complete kitchen transformation for a family home in Fairfield. The project included full cabinetry replacement with custom shaker-style doors, installation of quartz waterfall countertops, recessed lighting, and a new island with integrated storage. The layout was also reconfigured to create an open-concept flow into the dining area.',
    specs: [
      { key: 'Location',    val: 'Fairfield, Victoria BC' },
      { key: 'Duration',    val: '6 Weeks' },
      { key: 'Year',        val: '2024' },
      { key: 'Scope',       val: 'Full Kitchen Remodel' },
      { key: 'Countertops', val: 'White Quartz Waterfall' },
      { key: 'Cabinetry',   val: 'Custom Shaker Style' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85', alt: 'Kitchen after renovation' },
      { src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=85',  alt: 'Kitchen island detail' },
      { src: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=85', alt: 'Kitchen cabinets' },
      { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=85', alt: 'Kitchen countertop' },
      { src: '/kitchen-lighting.webp',  alt: 'Kitchen lighting' },
    ],
    baAfter:  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85',
    baBefore: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1400&q=85',
  },
  {
    id: 'project-2', num: '02', category: 'bathroom',
    name: 'Spa-Style Bathroom Remodel',
    tags: ['Bathroom', 'Tile Work', '2024'],
    location: 'Oak Bay, Victoria', duration: '3 Weeks', year: '2024',
    description: 'A dated bathroom was completely reimagined into a spa-inspired retreat. Features include large-format marble-effect porcelain tiles floor-to-ceiling, a frameless glass walk-in shower with rainfall head, floating vanity with integrated LED lighting, and a freestanding soaker tub as the centerpiece. Every fixture was selected for both aesthetics and long-term durability.',
    specs: [
      { key: 'Location', val: 'Oak Bay, Victoria BC' },
      { key: 'Duration', val: '3 Weeks' },
      { key: 'Year',     val: '2024' },
      { key: 'Tiling',   val: 'Marble-Effect Porcelain' },
      { key: 'Shower',   val: 'Frameless Glass, Rainfall' },
      { key: 'Vanity',   val: 'Floating + LED Lighting' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=85', alt: 'Bathroom after' },
      { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=85',      alt: 'Shower' },
      { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=85',   alt: 'Bathroom vanity' },
      { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=85',   alt: 'Bath tub' },
      { src: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=85',   alt: 'Bathroom tiles' },
    ],
    baAfter:  'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1400&q=85',
    baBefore: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&q=85',
  },
  {
    id: 'project-3', num: '03', category: 'living',
    name: 'Contemporary Living Room',
    tags: ['Living Room', 'Flooring', '2025'],
    location: 'Saanich, Victoria', duration: '4 Weeks', year: '2025',
    description: 'This living room overhaul brought a dark, compartmentalized space into the modern era. We opened the ceiling to expose original beams, installed wide-plank white oak hardwood throughout, replaced the dated fireplace surround with a minimal slab of honed limestone, and added custom built-in shelving on either side. New pot lights and a feature pendant complete the transformation.',
    specs: [
      { key: 'Location',  val: 'Saanich, Victoria BC' },
      { key: 'Duration',  val: '4 Weeks' },
      { key: 'Year',      val: '2025' },
      { key: 'Flooring',  val: 'White Oak Hardwood' },
      { key: 'Fireplace', val: 'Honed Limestone Surround' },
      { key: 'Lighting',  val: 'Recessed + Feature Pendant' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=85', alt: 'Living room after' },
      { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85',  alt: 'Fireplace detail' },
      { src: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=85',  alt: 'Flooring detail' },
      { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85',     alt: 'Living room overview' },
      { src: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=85',  alt: 'Built-in shelving' },
    ],
    baAfter:  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1400&q=85',
    baBefore: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85',
  },
  {
    id: 'project-4', num: '04', category: 'full',
    name: 'Full Apartment Transformation',
    tags: ['Full Apartment', 'Turnkey', '2025'],
    location: 'James Bay, Victoria', duration: '12 Weeks', year: '2025',
    description: 'A complete end-to-end renovation of a 1,400 sq ft apartment in James Bay. From demolition to final touches, every room was reimagined: open-plan kitchen-living, two fully renovated bathrooms, three bedrooms with custom closets, and new electrical and plumbing throughout. Finished with consistent warm oak flooring and a neutral palette that made the unit 38% more valuable at sale.',
    specs: [
      { key: 'Location',    val: 'James Bay, Victoria BC' },
      { key: 'Duration',    val: '12 Weeks' },
      { key: 'Year',        val: '2025' },
      { key: 'Area',        val: '1,400 sq ft' },
      { key: 'Rooms',       val: '3 Bed, 2 Bath, Kitchen, Living' },
      { key: 'Value Added', val: '+38% At Sale' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85', alt: 'Apartment living room after' },
      { src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=85',  alt: 'Kitchen area' },
      { src: 'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&q=85',     alt: 'Bedroom' },
      { src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=85',  alt: 'Before renovation' },
      { src: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=800&q=85',  alt: 'Bathroom' },
    ],
    baAfter:  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=85',
    baBefore: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=85',
  },
]

const allProjects = computed<Project[]>(() =>
  props.projects?.length ? (props.projects as Project[]) : FALLBACK_PROJECTS,
)

// ── Filter ───────────────────────────────────────────────────────────────────
type Category = 'all' | 'kitchen' | 'bathroom' | 'living' | 'full'
const activeFilter = ref<Category>('all')

function setFilter(cat: Category) {
  activeFilter.value = cat
  // Close any open accordion when filter changes
  openId.value = null
}

const visibleProjects = computed(() =>
  activeFilter.value === 'all'
    ? allProjects.value
    : allProjects.value.filter(p => p.category === activeFilter.value),
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
const filterLabels: Record<Category, string> = {
  all:      'All Projects',
  kitchen:  'Kitchen',
  bathroom: 'Bathroom',
  living:   'Living Room',
  full:     'Full Apartment',
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
            v-for="f in (['all','kitchen','bathroom','living','full'] as const)"
            :key="f"
            class="works-filter"
            :class="{ active: activeFilter === f }"
            @click="setFilter(f)"
          >{{ filterLabels[f] }}</button>
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
            <span v-for="tag in p.tags" :key="tag" class="project-tag">{{ tag }}</span>
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
