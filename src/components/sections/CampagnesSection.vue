<template>
  <section class="sec" id="campagnes">
    <div class="wrap">
      <div class="sec-head reveal">
        <span class="label">Nos Actions</span>
        <h2 class="sec-title">Des campagnes <em>qui marquent</em></h2>
      </div>
      <div class="camp-grid reveal" data-d="1">
        <article v-for="c in campagnes" :key="c.titre" class="camp">
          <img :src="`/Images/${c.img}`" :alt="c.titre" />
          <div class="camp__veil"></div>
          <div class="camp__body">
            <span class="camp__tag" :style="{ background: c.tagc }">{{ c.tag }}</span>
            <h3 class="camp__title">{{ c.titre }}</h3>
            <div v-if="c.reach" class="camp__reach">{{ c.reach }}</div>
            <p v-if="c.desc" class="camp__desc">{{ c.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const campagnes = [
  { img: 'campagne_puff_1.jpg', tag: 'Viral', tagc: '#1AE05A', titre: '#NonAuPuff', reach: '890 000 personnes touchées', desc: 'Campagne virale sur TikTok et Instagram contre les cigarettes électroniques ciblant les jeunes africains.' },
  { img: 'novembre_bleu.jpg', tag: 'Cancer Prostate', tagc: '#3B82F6', titre: 'Novembre Bleu', reach: '127 000 touchés', desc: '' },
  { img: 'octobre_rose.jpg', tag: 'Cancer Sein', tagc: '#EC4899', titre: 'Octobre Rose', reach: '89 000 touchés', desc: '' },
  { img: 'habitude_3.jpg', tag: 'Éducation', tagc: '#4191FF', titre: 'Habitudes toxiques', reach: '215 000 touchés', desc: '' },
  { img: 'aliamnt_explique_1.jpg', tag: 'Pédagogie', tagc: '#93C5FD', titre: "ALIAMNT t'explique", reach: '54 000 touchés', desc: '' },
]
</script>
