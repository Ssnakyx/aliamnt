<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface NavLink {
  label: string
  to: string
}

interface DiseaseLink {
  label: string
  to: string
}

const navLinks: NavLink[] = [
  { label: 'Accueil', to: '/' },
  { label: 'À Propos', to: '/a-propos' },
  { label: 'Maladies', to: '/maladies' },
  { label: 'Campagnes', to: '/campagnes' },
  { label: 'Médias', to: '/media' },
  { label: 'Rejoindre', to: '/rejoindre' },
  { label: 'Contact', to: '/contact' },
]

const diseaseLinks: DiseaseLink[] = [
  { label: 'Diabète', to: '/maladies' },
  { label: 'Hypertension', to: '/maladies' },
  { label: 'Maladies cardiovasculaires', to: '/maladies' },
  { label: 'Obésité', to: '/maladies' },
  { label: 'Cancer', to: '/maladies' },
]
</script>

<template>
  <footer class="footer" role="contentinfo">
    <!-- Top separator -->
    <div class="footer__separator" aria-hidden="true" />

    <div class="footer__container">
      <!-- Main grid -->
      <div class="footer__main">
        <!-- Brand column -->
        <div class="footer__brand">
          <RouterLink to="/" class="footer__logo" aria-label="ALIAMNT — Accueil">
            <img src="/Images/logo.jpg" alt="ALIAMNT" class="footer__logo-img" />
          </RouterLink>
          <p class="footer__tagline">Prévention · Éducation · Mobilisation</p>
          <p class="footer__desc">
            Association africaine engagée dans la lutte contre les maladies non transmissibles.
            Ensemble, construisons une Afrique plus saine.
          </p>
        </div>

        <!-- Navigation column -->
        <div class="footer__col">
          <h3 class="footer__col-title">Navigation</h3>
          <ul class="footer__col-links" role="list">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink :to="link.to" class="footer__link">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Diseases column -->
        <div class="footer__col">
          <h3 class="footer__col-title">Maladies</h3>
          <ul class="footer__col-links" role="list">
            <li v-for="disease in diseaseLinks" :key="disease.label">
              <RouterLink :to="disease.to" class="footer__link">
                {{ disease.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact column -->
        <div class="footer__col footer__col--contact">
          <h3 class="footer__col-title">Contact</h3>
          <a href="mailto:contact@aliamnt.org" class="footer__email">
            contact@aliamnt.org
          </a>

          <div class="footer__social" role="list" aria-label="Réseaux sociaux">
            <!-- TikTok -->
            <a
              href="https://www.tiktok.com/@aliamnt_"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-link"
              aria-label="TikTok ALIAMNT"
              role="listitem"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
              </svg>
            </a>

            <!-- Instagram -->
            <a
              href="https://www.instagram.com/aliamnt_"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-link"
              aria-label="Instagram ALIAMNT"
              role="listitem"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <!-- Facebook -->
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-link"
              aria-label="Facebook"
              role="listitem"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            <!-- Twitter / X -->
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-link"
              aria-label="Twitter / X"
              role="listitem"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer__bottom">
        <p class="footer__copyright">
          &copy; 2024 ALIAMNT. Tous droits réservés.
        </p>
        <p class="footer__made-with">
          Fait avec ❤️ pour l'Afrique
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.footer {
  background: var(--color-bg, #0a0d0a);
  position: relative;
}

.footer__separator {
  width: 100%;
  height: 1px;
  background: rgba(26, 224, 90, 0.15);
}

/* ─── Container ─────────────────────────────────────────── */
.footer__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 2rem 2.5rem;
}

/* ─── Main grid ─────────────────────────────────────────── */
.footer__main {
  display: grid;
  grid-template-columns: 1fr 0.6fr 0.6fr 0.85fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

/* ─── Brand column ──────────────────────────────────────── */
.footer__logo {
  display: inline-flex;
  text-decoration: none;
  margin-bottom: 0.75rem;
}

.footer__logo-img {
  height: 52px;
  width: auto;
  object-fit: contain;
  border-radius: 6px;
  background: #fff;
  padding: 4px 8px;
  display: block;
}

.footer__tagline {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--color-green, #1ae05a);
  margin: 0 0 1rem;
}

.footer__desc {
  font-family: var(--font-dm, 'DM Sans', sans-serif);
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--color-gray, #6b7280);
  margin: 0;
  max-width: 28ch;
}

/* ─── Generic column ────────────────────────────────────── */
.footer__col-title {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-gray, #6b7280);
  margin: 0 0 1.25rem;
}

.footer__col-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer__link {
  font-family: var(--font-dm, 'DM Sans', sans-serif);
  font-size: 0.9rem;
  color: var(--color-gray, #6b7280);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer__link:hover {
  color: var(--color-green, #1ae05a);
}

/* ─── Contact column ────────────────────────────────────── */
.footer__col--contact {
  display: flex;
  flex-direction: column;
}

.footer__email {
  font-family: var(--font-dm, 'DM Sans', sans-serif);
  font-size: 0.9rem;
  color: var(--color-gray, #6b7280);
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
}

.footer__email:hover {
  color: var(--color-green, #1ae05a);
}

/* ─── Social icons ──────────────────────────────────────── */
.footer__social {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer__social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray, #6b7280);
  text-decoration: none;
  transition: color 0.3s ease;
  line-height: 0;
}

.footer__social-link:hover {
  color: var(--color-green, #1ae05a);
}

/* ─── Bottom bar ────────────────────────────────────────── */
.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(26, 224, 90, 0.08);
}

.footer__copyright,
.footer__made-with {
  font-family: var(--font-dm, 'DM Sans', sans-serif);
  font-size: 0.8125rem;
  color: var(--color-gray, #6b7280);
  margin: 0;
}

/* ─── Responsive ────────────────────────────────────────── */
@media (max-width: 1023px) {
  .footer__main {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }

  .footer__brand {
    grid-column: 1 / -1;
  }

  .footer__desc {
    max-width: 100%;
  }
}

@media (max-width: 639px) {
  .footer__container {
    padding: 3.5rem 1.25rem 2rem;
  }

  .footer__main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer__brand {
    grid-column: auto;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
