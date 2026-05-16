<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const scrolled  = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onScroll() {
  scrolled.value = window.scrollY > 20
}

function scrollTo(id: string) {
  closeMenu()
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav :class="{ scrolled }">
    <a class="nav-logo" href="#">
      <strong>FORMO</strong>
      <span>Renovations</span>
    </a>

    <ul class="nav-links">
      <li><a href="#services">Services</a></li>
      <li><a href="#portfolio">Projects</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#process">Process</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>

    <button class="nav-cta" @click="scrollTo('contact')">Get a Free Estimate →</button>

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
    <a href="#services"    @click="closeMenu">Services</a>
    <a href="#portfolio"   @click="closeMenu">Projects</a>
    <a href="#about"       @click="closeMenu">About Us</a>
    <a href="#process"     @click="closeMenu">How We Work</a>
    <a href="#pricing"     @click="closeMenu">Pricing</a>
    <a href="#beforeafter" @click="closeMenu">Before &amp; After</a>
    <a href="#contact"     @click="closeMenu">Contact</a>
    <a class="mob-cta" href="#contact" @click="closeMenu">Get a Free Estimate →</a>
  </div>
</template>
