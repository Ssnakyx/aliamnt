<template>
  <main>
    <section class="phero">
      <div class="phero__blobs" aria-hidden="true">
        <div class="blob blob--1"></div>
        <div class="blob blob--2"></div>
      </div>
      <div class="wrap phero__inner">
        <div class="phero__crumb">
          <RouterLink to="/">Accueil</RouterLink><span>/</span><span style="color:var(--gray-light)">À propos</span>
        </div>
        <h1 class="phero__title">La santé, une <span class="gradient-text">priorité africaine</span></h1>
        <p class="phero__lead">
          ALIAMNT est une alliance de jeunes engagés contre les maladies non transmissibles. Nous croyons que la
          prévention, portée par et pour la jeunesse, peut transformer la santé publique en Afrique.
        </p>
      </div>
    </section>

    <div style="padding-top:1rem">
      <MissionSection />
    </div>

    <StatsSection />

    <!-- VALEURS -->
    <section class="sec">
      <div class="wrap">
        <div class="sec-head reveal">
          <span class="label">Nos Valeurs</span>
          <h2 class="sec-title">Ce qui nous <em>guide</em></h2>
        </div>
        <div class="vgrid">
          <article
            v-for="(v, i) in valeurs"
            :key="v.titre"
            class="vcard reveal"
            :data-d="i % 3 || undefined"
          >
            <div class="vcard__ic" v-html="v.icon"></div>
            <h3 class="vcard__t">{{ v.titre }}</h3>
            <p class="vcard__d">{{ v.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- HISTOIRE / TIMELINE -->
    <section class="sec" style="padding-top:0">
      <div class="wrap split">
        <div class="reveal">
          <span class="label" style="display:block;margin-bottom:1rem">Notre Histoire</span>
          <h2 class="sec-title">D'une prise de<br />conscience à<br /><em>un mouvement</em></h2>
          <p class="pilier__desc" style="margin-top:1.4rem">
            Tout est parti d'un constat simple : les maladies non transmissibles explosent en Afrique, et la
            jeunesse est en première ligne — pourtant personne ne lui parle vraiment.
          </p>
        </div>
        <div class="tl reveal" data-d="1">
          <div v-for="t in timeline" :key="t.yr" class="tl__item">
            <div class="tl__yr">{{ t.yr }}</div>
            <div class="tl__t">{{ t.titre }}</div>
            <div class="tl__d">{{ t.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ÉQUIPE -->
    <section class="sec" style="padding-top:0">
      <div class="wrap">
        <div class="sec-head reveal">
          <span class="label">L'équipe</span>
          <h2 class="sec-title">Des visages <em>engagés</em></h2>
        </div>
        <div class="tgrid">
          <article
            v-for="(m, i) in team"
            :key="m.nom"
            class="tcard reveal"
            :data-d="i % 4 || undefined"
          >
            <div class="tcard__av">
              <div class="mono-av" :style="{ background: `linear-gradient(135deg, ${m.c1}, ${m.c2})` }">{{ initials(m.nom) }}</div>
            </div>
            <div class="tcard__n">{{ m.nom }}</div>
            <div class="tcard__r">{{ m.role }}</div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MissionSection from '@/components/sections/MissionSection.vue'
import StatsSection from '@/components/sections/StatsSection.vue'

const valeurs = [
  { titre: "Prévention d'abord", desc: "La prévention vaut mille fois mieux que la guérison. Nous misons sur l'information avant la maladie, pas après.", icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { titre: 'Par et pour les jeunes', desc: "Nos messages parlent le langage de la jeunesse africaine, sans jargon ni leçon de morale. La santé, version réelle.", icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85"/></svg>' },
  { titre: 'Ancré en Afrique', desc: "Des solutions adaptées aux réalités, cultures et contraintes locales — pas des modèles importés tels quels.", icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
  { titre: 'Sans tabou', desc: "Cancer, santé mentale, dépendances : nous abordons frontalement ce dont on n'ose pas parler.", icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-6 0v4M5 9h14l1 12H4L5 9z"/></svg>' },
  { titre: 'Preuves & rigueur', desc: "Chaque chiffre, chaque conseil s'appuie sur des données fiables et des sources de santé reconnues.", icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>' },
  { titre: 'Action collective', desc: "Communautés, soignants, décideurs : la santé publique est un combat qui se gagne ensemble.", icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>' },
]

const timeline = [
  { yr: '2023', titre: 'La prise de conscience', desc: "Un groupe d'étudiants en santé constate l'absence de prévention adaptée aux jeunes et lance les premières actions de terrain." },
  { yr: '2024', titre: "Naissance de l'alliance", desc: 'ALIAMNT se structure et lance #NonAuPuff, sa première campagne virale, qui dépasse toutes les attentes.' },
  { yr: '2025', titre: 'Expansion régionale', desc: "L'alliance s'étend à trois pays et couvre neuf maladies, avec plus de 12 000 personnes sensibilisées." },
  { yr: 'Demain', titre: 'Une jeunesse actrice', desc: 'Faire de chaque jeune informé un défenseur de la santé de sa communauté, partout en Afrique.' },
]

const team = [
  { nom: 'Aïcha D.', role: 'Présidente', c1: '#4191FF', c2: '#6FB4FF' },
  { nom: 'Moussa K.', role: 'Coordination terrain', c1: '#A78BFA', c2: '#6FB4FF' },
  { nom: 'Fatou S.', role: 'Campagnes digitales', c1: '#EC4899', c2: '#A78BFA' },
  { nom: 'Ibrahim T.', role: 'Santé & contenus', c1: '#10B981', c2: '#4191FF' },
  { nom: 'Nadia B.', role: 'Partenariats', c1: '#F59E0B', c2: '#EC4899' },
  { nom: 'Yacouba O.', role: 'Bénévolat', c1: '#06B6D4', c2: '#4191FF' },
  { nom: 'Mariam C.', role: 'Communication', c1: '#8B5CF6', c2: '#A78BFA' },
  { nom: 'Salif N.', role: 'Données & impact', c1: '#3B82F6', c2: '#6FB4FF' },
]

function initials(n: string) {
  return n.split(' ').map((p) => p[0]).join('').slice(0, 2)
}
</script>
