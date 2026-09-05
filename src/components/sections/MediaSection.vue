<template>
  <section class="sec" id="media">
    <div class="wrap">
      <div class="sec-head reveal">
        <span class="label">Médias &amp; Presse</span>
        <h2 class="sec-title">On parle de <em>nous</em></h2>
      </div>
      <div class="media-grid">
        <article
          v-for="(p, i) in press"
          :key="p.title"
          class="press reveal"
          :data-d="i || undefined"
        >
          <div class="press__src">{{ p.src }}<time>{{ p.date }}</time></div>
          <h3 class="press__title">{{ p.title }}</h3>
          <p class="press__ex">{{ p.excerpt }}</p>
          <a class="press__link" :href="p.href">Lire l'article
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const press = [
  {
    src: 'RFI Afrique',
    date: 'Mars 2025',
    title: '#NonAuPuff : la campagne qui alerte la jeunesse',
    excerpt: "Retour sur le mouvement viral lancé par ALIAMNT contre les cigarettes électroniques, qui a touché plus de 890 000 jeunes à travers l'Afrique de l'Ouest.",
    href: '#',
  },
  {
    src: 'Le Sahel',
    date: 'Janv. 2025',
    title: 'Niger : sensibiliser avant de guérir',
    excerpt: "Portrait d'une alliance qui mise sur l'éducation et le terrain pour endiguer la montée des maladies non transmissibles chez les 18-35 ans.",
    href: '#',
  },
  {
    src: 'NCD Alliance',
    date: 'Nov. 2024',
    title: 'Une voix africaine dans la lutte mondiale contre les MNT',
    excerpt: 'ALIAMNT rejoint le réseau international des organisations engagées pour la prévention des maladies chroniques et la santé publique.',
    href: '#',
  },
]
</script>
