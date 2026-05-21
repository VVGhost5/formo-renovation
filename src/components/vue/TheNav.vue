<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import logoWhite from '../../assets/images/formo-logo-white.svg'

type Page = 'home' | 'portfolio' | 'services' | 'contacts' | 'about-us'
const props = defineProps<{ page?: Page }>()

const menuOpen = ref(false)
const scrolled  = ref(false)

function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu()  { menuOpen.value = false }
function onScroll()   { scrolled.value = window.scrollY > 20 }

function scrollToContact() {
  closeMenu()
  const id = props.page === 'contacts' ? 'contact-main' : 'contact'
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav :class="{ scrolled }">
    <a class="nav-logo" href="/">
      <img :src="logoWhite.src" alt="Formo Renovations" class="nav-logo-img" />
    </a>

    <ul class="nav-links">
      <li><a href="/"          :class="{ active: page === 'home' }">Home</a></li>
      <li><a href="/portfolio" :class="{ active: page === 'portfolio' }">Portfolio</a></li>
      <li><a href="/services"  :class="{ active: page === 'services' }">Services</a></li>
      <li><a href="/about-us"  :class="{ active: page === 'about-us' }">About</a></li>
      <li><a href="/contacts"  :class="{ active: page === 'contacts' }">Contact</a></li>
    </ul>

    <button class="nav-cta" @click="scrollToContact">Get a Free Estimate →</button>

    <button
      class="nav-hamburger"
      :class="{ open: menuOpen }"
      aria-label="Menu"
      @click="toggleMenu"
    >
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="nav-mobile-menu" :class="{ open: menuOpen }">
    <a href="/"          @click="closeMenu" :class="{ active: page === 'home' }">Home</a>
    <a href="/portfolio" @click="closeMenu" :class="{ active: page === 'portfolio' }">Portfolio</a>
    <a href="/services"  @click="closeMenu" :class="{ active: page === 'services' }">Services</a>
    <a href="/about-us"  @click="closeMenu" :class="{ active: page === 'about-us' }">About Us</a>
    <a href="/contacts"  @click="closeMenu" :class="{ active: page === 'contacts' }">Contact</a>
    <a class="mob-cta"   href="/contacts" @click="closeMenu">Get a Free Estimate →</a>
  </div>
</template>
