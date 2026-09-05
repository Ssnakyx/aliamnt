<template>
  <main>
    <section class="phero">
      <div class="phero__blobs" aria-hidden="true">
        <div class="blob blob--1"></div>
        <div class="blob blob--2"></div>
      </div>
      <div class="wrap phero__inner">
        <div class="phero__crumb">
          <RouterLink to="/">Accueil</RouterLink><span>/</span><span style="color:var(--gray-light)">Campagnes</span>
        </div>
        <h1 class="phero__title">Des campagnes <span class="gradient-text">qui marquent</span></h1>
        <p class="phero__lead">
          Du terrain aux réseaux sociaux, nos campagnes parlent le langage de la jeunesse africaine pour faire
          bouger les comportements. Voici celles qui ont touché le plus de monde.
        </p>
        <div class="phero__meta">
          <span class="chip">1,3M+ personnes touchées</span>
          <span class="chip">3 pays</span>
          <span class="chip">50+ actions menées</span>
        </div>
      </div>
    </section>

    <section class="sec" style="padding-top:1rem">
      <div class="wrap">
        <article v-for="c in campagnes" :key="c.titre" class="cfeat reveal">
          <div class="cfeat__media"><img :src="`/Images/${c.img}`" :alt="c.titre" loading="lazy" /></div>
          <div>
            <span class="cfeat__tag" :style="{ background: c.tagc }">{{ c.tag }}</span>
            <h2 class="cfeat__title">{{ c.titre }}</h2>
            <p class="cfeat__desc">{{ c.desc }}</p>
            <div class="cfeat__stats">
              <div v-for="(s, i) in c.stats" :key="i" class="cfeat__stat"><b>{{ s[0] }}</b><span>{{ s[1] }}</span></div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="join">
      <div class="blob" aria-hidden="true"></div>
      <div class="wrap">
        <div class="join__inner reveal">
          <h2 class="join__title">Une idée de <span class="gradient-text">campagne</span> ?</h2>
          <p class="join__sub">Tu veux porter un message de santé dans ta communauté, ton école ou ton réseau ? Parlons-en.</p>
          <div class="join__cta">
            <RouterLink class="btn btn--primary" to="/contact">Nous contacter
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </RouterLink>
            <RouterLink class="btn btn--outline" to="/maladies">Explorer les maladies</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const campagnes: { img: string; tag: string; tagc: string; titre: string; desc: string; stats: [string, string][] }[] = [
  { img: 'campagne_puff_1.jpg', tag: 'Viral', tagc: '#1AE05A', titre: '#NonAuPuff', desc: "La campagne virale qui a alerté toute une génération sur les dangers de la cigarette électronique. Vidéos TikTok, témoignages, et décryptage du marketing de l'industrie — un format pensé pour et par les jeunes.", stats: [['890K', 'personnes touchées'], ['#1', 'tendance TikTok Niger'], ['3', 'pays']] },
  { img: 'novembre_bleu.jpg', tag: 'Cancer Prostate', tagc: '#3B82F6', titre: 'Novembre Bleu', desc: "Briser le tabou autour du cancer de la prostate et encourager le dépistage précoce chez les hommes africains. Affiches, radios communautaires et discussions intergénérationnelles.", stats: [['127K', 'touchés'], ['+40%', 'intentions de dépistage']] },
  { img: 'octobre_rose.jpg', tag: 'Cancer du Sein', tagc: '#EC4899', titre: 'Octobre Rose', desc: "Sensibiliser à l'autopalpation et au dépistage du cancer du sein. Ateliers dans les marchés, écoles et universités, avec des supports adaptés aux réalités locales.", stats: [['89K', 'touchés'], ['200+', "femmes formées à l'autopalpation"]] },
  { img: 'habitude_3.jpg', tag: 'Éducation', tagc: '#4191FF', titre: 'Habitudes toxiques', desc: "Une série pédagogique qui décortique les gestes du quotidien — sucre, sel, sédentarité, écrans — et propose des alternatives saines, accessibles et ancrées dans la culture africaine.", stats: [['215K', 'touchés'], ['12', 'épisodes']] },
  { img: 'aliamnt_explique_1.jpg', tag: 'Pédagogie', tagc: '#93C5FD', titre: "ALIAMNT t'explique", desc: "Le format court qui répond aux questions santé que tout le monde se pose mais n'ose pas poser. Du diabète à la santé mentale, en une minute et dans un langage clair.", stats: [['54K', 'touchés'], ['1 min', 'par épisode']] },
  { img: 'journee_soignants.jpg', tag: 'Hommage', tagc: '#A78BFA', titre: 'Journée des Soignants', desc: "Rendre hommage aux soignants africains, premiers remparts face aux maladies chroniques, et valoriser leur rôle dans la prévention au sein des communautés.", stats: [['38K', 'touchés'], ['80+', 'soignants mis en avant']] },
]
</script>
