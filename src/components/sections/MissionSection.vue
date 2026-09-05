<template>
  <section class="sec" id="mission">
    <div class="wrap">
      <div class="sec-head reveal">
        <span class="label">Notre Mission</span>
        <h2 class="sec-title">Trois piliers pour<br /><em>un avenir sain</em></h2>
      </div>
      <div class="mission__rows">
        <article
          v-for="(p, i) in piliers"
          :key="p.num"
          class="pilier reveal"
          :data-d="i || undefined"
        >
          <div class="pilier__num">{{ p.num }}</div>
          <div>
            <div class="pilier__head">
              <h3 class="pilier__title">{{ p.titre }}</h3>
              <span class="pilier__tag">{{ p.tag }}</span>
            </div>
            <p class="pilier__desc">{{ p.desc }}</p>
          </div>
          <div class="pilier__icon" v-html="p.icon"></div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const piliers = [
  {
    num: '01',
    titre: 'Sensibiliser',
    tag: 'Terrain & Digital',
    desc: "Informer et conscientiser sur les risques des maladies chroniques en Afrique à travers des campagnes terrain et digitales accessibles à tous.",
    icon: '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M30 8L10 16.5H6a2 2 0 00-2 2v3a2 2 0 002 2h4l3 8h3l-1-8 14 8.5V8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M34 10c2 2.5 2 7.5 0 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  },
  {
    num: '02',
    titre: 'Éduquer',
    tag: 'Ressources & Outils',
    desc: "Fournir des outils et ressources pour comprendre et prévenir les MNT, adaptés aux réalités et cultures africaines.",
    icon: '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M6 8h12c3.314 0 6 2.686 6 6v16c0-3.314-2.686-6-6-6H6V8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M34 8H22c-3.314 0-6 2.686-6 6v16c0-3.314 2.686-6 6-6h12V8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M20 14v16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  },
  {
    num: '03',
    titre: 'Mobiliser',
    tag: 'Communautés & Réseaux',
    desc: "Créer des réseaux d'action locale et nationale pour la santé publique en fédérant communautés, soignants et décideurs.",
    icon: '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="14" r="4" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="30" r="3.5" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="30" r="3.5" stroke="currentColor" stroke-width="2"/><path d="M20 18c0 4-5 6-8 8.5M20 18c0 4 5 6 8 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M11 30h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3"/></svg>',
  },
]
</script>
