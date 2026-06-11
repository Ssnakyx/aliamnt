<template>
  <main class="page-404">
    <div class="blob" aria-hidden="true" />
    <div class="container">
      <span class="code">
        4<span class="code-pulse" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 12 6 12 8 6 10 18 12 10 14 14 16 12 21 12"/>
          </svg>
        </span>4
      </span>
      <h1 class="title">Cette page est introuvable.</h1>
      <p class="text">
        Bonne nouvelle : contrairement à une maladie silencieuse,
        cette erreur se détecte immédiatement. Revenons en lieu sûr.
      </p>
      <div class="actions">
        <RouterLink to="/" class="btn-primary">Retour à l'accueil</RouterLink>
        <RouterLink to="/maladies" class="btn-ghost">Découvrir les maladies</RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.page-404 {
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  position: relative;
  overflow: hidden;
  padding: 6rem 1.5rem 4rem;
}

.blob {
  position: absolute;
  width: clamp(300px, 50vw, 700px);
  height: clamp(300px, 50vw, 700px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(65, 145, 255, 0.1) 0%, transparent 65%);
  pointer-events: none;
}

.container {
  position: relative;
  text-align: center;
  max-width: 560px;
}

.code {
  font-family: var(--font-mono);
  font-size: clamp(5rem, 14vw, 9rem);
  color: var(--color-green);
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: -0.05em;
}

.code-pulse {
  display: inline-flex;
  width: clamp(3.5rem, 9vw, 6rem);
  height: clamp(3.5rem, 9vw, 6rem);
  color: var(--color-sand);
  animation: pulse404 1.6s ease-in-out infinite;
}

.code-pulse svg { width: 100%; height: 100%; }

@keyframes pulse404 {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.92); }
}

.title {
  font-family: var(--font-playfair);
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  color: var(--color-white);
  margin-top: 1.5rem;
  letter-spacing: -0.02em;
}

.text {
  font-family: var(--font-dm);
  color: var(--color-gray);
  line-height: 1.7;
  margin-top: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2.25rem;
}

.btn-primary,
.btn-ghost {
  font-family: var(--font-dm);
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.8rem 1.75rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: transform 0.3s var(--ease-expo), box-shadow 0.3s, border-color 0.3s, color 0.3s;
}

.btn-primary {
  background: var(--color-green);
  color: #07101E;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-green-sm);
}

.btn-ghost {
  color: var(--color-gray-light);
  border: 1.5px solid var(--color-border);
}
.btn-ghost:hover {
  color: var(--color-white);
  border-color: var(--color-green);
}
</style>
