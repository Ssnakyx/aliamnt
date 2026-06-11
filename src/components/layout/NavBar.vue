<script setup lang="ts">
import { useNavbar } from '@/composables/useNavbar'
import { RouterLink } from 'vue-router'

const { isScrolled, isMenuOpen, toggleMenu, closeMenu } = useNavbar()

interface NavLink {
  label: string
  to: string
}

const navLinks: NavLink[] = [
  { label: 'Accueil', to: '/' },
  { label: 'À Propos', to: '/a-propos' },
  { label: 'Maladies', to: '/maladies' },
  { label: 'Campagnes', to: '/campagnes' },
  { label: 'Médias', to: '/media' },
  { label: 'Test Santé', to: '/evaluation' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <header :class="['navbar', { 'navbar--scrolled': isScrolled }]" role="banner">
    <div class="navbar__inner">
      <!-- Logo -->
      <RouterLink to="/" class="navbar__logo" @click="closeMenu" aria-label="ALIAMNT — Accueil">
        <img src="/Images/logo.jpg" alt="ALIAMNT — Alliance contre les maladies non transmissibles" class="navbar__logo-img" />
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="navbar__nav" aria-label="Navigation principale">
        <ul class="navbar__links" role="list">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              class="navbar__link"
              active-class="navbar__link--active"
              exact-active-class="navbar__link--active"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- CTA -->
      <div class="navbar__cta-wrap">
        <RouterLink to="/rejoindre" class="navbar__cta" @click="closeMenu">
          Faire un don
        </RouterLink>
      </div>

      <!-- Hamburger -->
      <button
        class="navbar__burger"
        :class="{ 'navbar__burger--open': isMenuOpen }"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        aria-label="Ouvrir le menu"
        type="button"
        @click="toggleMenu"
      >
        <span class="navbar__burger-line navbar__burger-line--top" />
        <span class="navbar__burger-line navbar__burger-line--mid" />
        <span class="navbar__burger-line navbar__burger-line--bot" />
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        class="navbar__mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
      >
        <nav aria-label="Navigation mobile">
          <ul class="navbar__mobile-links" role="list">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="navbar__mobile-link"
                active-class="navbar__mobile-link--active"
                exact-active-class="navbar__mobile-link--active"
                @click="closeMenu"
              >
                {{ link.label }}
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/rejoindre" class="navbar__mobile-cta" @click="closeMenu">
                Faire un don
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition:
    background var(--duration-base, 0.4s) var(--ease-expo, cubic-bezier(0.16, 1, 0.3, 1)),
    border-color var(--duration-base, 0.4s) var(--ease-expo, cubic-bezier(0.16, 1, 0.3, 1)),
    backdrop-filter var(--duration-base, 0.4s) var(--ease-expo, cubic-bezier(0.16, 1, 0.3, 1));
}

.navbar--scrolled {
  background: rgba(5, 10, 19, 0.65);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom-color: rgba(255, 255, 255, 0.07);
}

/* ─── Inner layout ──────────────────────────────────────── */
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 76px;
  transition: height 0.4s var(--ease-expo);
}

.navbar--scrolled .navbar__inner {
  height: 60px;
}

/* ─── Logo ──────────────────────────────────────────────── */
.navbar__logo {
  text-decoration: none;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.navbar__logo-img {
  height: 44px;
  width: auto;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
  padding: 3px 6px;
  display: block;
  transition: height 0.4s var(--ease-expo);
}

.navbar--scrolled .navbar__logo-img {
  height: 38px;
}

/* ─── Desktop links ─────────────────────────────────────── */
.navbar__nav {
  display: flex;
  align-items: center;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__link {
  font-family: var(--font-dm, 'DM Sans', sans-serif);
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--color-white, #f5f0e8);
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
  white-space: nowrap;
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-green, #1ae05a);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.navbar__link:hover {
  color: var(--color-green, #1ae05a);
}

.navbar__link:hover::after,
.navbar__link--active::after {
  transform: scaleX(1);
}

.navbar__link--active {
  color: var(--color-green, #1ae05a);
}

/* ─── CTA ───────────────────────────────────────────────── */
.navbar__cta-wrap {
  flex-shrink: 0;
}

.navbar__cta {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-dm, 'DM Sans', sans-serif);
  font-weight: 500;
  font-size: 0.9375rem;
  color: #0a0d0a;
  background: var(--color-green, #1ae05a);
  text-decoration: none;
  padding: 0.6rem 1.5rem;
  border-radius: var(--radius-full, 9999px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.navbar__cta:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-green-sm, 0 0 20px rgba(26, 224, 90, 0.35));
}

/* ─── Hamburger ─────────────────────────────────────────── */
.navbar__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.navbar__burger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-white, #f5f0e8);
  border-radius: 2px;
  transform-origin: center;
  transition:
    transform 0.35s var(--ease-expo, cubic-bezier(0.16, 1, 0.3, 1)),
    opacity 0.25s ease,
    width 0.3s ease;
}

/* X animation */
.navbar__burger--open .navbar__burger-line--top {
  transform: translateY(7px) rotate(45deg);
}

.navbar__burger--open .navbar__burger-line--mid {
  opacity: 0;
  width: 0;
}

.navbar__burger--open .navbar__burger-line--bot {
  transform: translateY(-7px) rotate(-45deg);
}

/* ─── Mobile menu ───────────────────────────────────────── */
.navbar__mobile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(5, 10, 19, 0.92);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.navbar__mobile-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 2rem;
}

.navbar__mobile-link {
  font-family: var(--font-playfair, 'Playfair Display', serif);
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-white, #f5f0e8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar__mobile-link:hover,
.navbar__mobile-link--active {
  color: var(--color-green, #1ae05a);
}

.navbar__mobile-cta {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-dm, 'DM Sans', sans-serif);
  font-weight: 500;
  font-size: 1rem;
  color: #0a0d0a;
  background: var(--color-green, #1ae05a);
  text-decoration: none;
  padding: 0.75rem 2rem;
  border-radius: var(--radius-full, 9999px);
  margin-top: 0.5rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.navbar__mobile-cta:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-green-sm, 0 0 20px rgba(26, 224, 90, 0.35));
}

/* ─── Transitions ───────────────────────────────────────── */
.mobile-menu-enter-active {
  transition: opacity 0.35s ease, transform 0.4s var(--ease-expo, cubic-bezier(0.16, 1, 0.3, 1));
}

.mobile-menu-leave-active {
  transition: opacity 0.25s ease, transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* ─── Responsive ────────────────────────────────────────── */
@media (max-width: 1023px) {
  .navbar__nav,
  .navbar__cta-wrap {
    display: none;
  }

  .navbar__burger {
    display: flex;
  }
}
</style>
