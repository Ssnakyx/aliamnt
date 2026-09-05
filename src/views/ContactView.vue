<template>
  <main>
    <section class="phero" style="padding-bottom:2rem">
      <div class="phero__blobs" aria-hidden="true">
        <div class="blob blob--1"></div>
        <div class="blob blob--2"></div>
      </div>
      <div class="wrap phero__inner">
        <div class="phero__crumb">
          <RouterLink to="/">Accueil</RouterLink><span>/</span><span style="color:var(--gray-light)">Contact</span>
        </div>
        <h1 class="phero__title">Rejoins le <span class="gradient-text">mouvement</span></h1>
        <p class="phero__lead">
          Une question, une envie de t'engager, un projet de campagne ? Écris-nous. Chaque message compte,
          chaque jeune mobilisé fait la différence.
        </p>
      </div>
    </section>

    <!-- FORMULAIRE + INFOS -->
    <section class="sec" style="padding-top:1rem">
      <div class="wrap contact-grid">
        <div class="reveal">
          <form class="form" novalidate @submit.prevent="onSubmit">
            <div class="field">
              <label for="nom">Nom complet</label>
              <input id="nom" v-model="nom" type="text" name="nom" placeholder="Ton nom" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" v-model="email" type="email" name="email" placeholder="toi@exemple.com" required />
            </div>
            <div class="field">
              <label for="sujet">Je souhaite…</label>
              <select id="sujet" v-model="sujet" name="sujet">
                <option>Devenir bénévole</option>
                <option>Proposer une campagne</option>
                <option>Faire un partenariat</option>
                <option>Poser une question santé</option>
                <option>Autre</option>
              </select>
            </div>
            <div class="field">
              <label for="msg">Message</label>
              <textarea id="msg" v-model="msg" name="msg" placeholder="Dis-nous tout…" required></textarea>
            </div>
            <button v-show="!sent" type="submit" class="btn btn--primary" style="align-self:flex-start">Envoyer le message
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </button>
            <div class="form__ok" :class="{ show: sent }">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
              Merci ! Ton message a bien été envoyé. On revient vers toi vite.
            </div>
            <p class="form__note">Démo — aucun message n'est réellement transmis. Ne partage pas d'informations médicales personnelles.</p>
          </form>
        </div>

        <div class="reveal" data-d="1">
          <div class="cinfo">
            <div class="cinfo__item">
              <div class="cinfo__ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg></div>
              <div><div class="cinfo__k">Email</div><div class="cinfo__v"><a href="mailto:contact@aliamnt.org">contact@aliamnt.org</a></div></div>
            </div>
            <div class="cinfo__item">
              <div class="cinfo__ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div><div class="cinfo__k">Présence</div><div class="cinfo__v">Niger · Burkina Faso · Côte d'Ivoire</div></div>
            </div>
            <div class="cinfo__item">
              <div class="cinfo__ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
              <div><div class="cinfo__k">Réponse</div><div class="cinfo__v">Sous 48h en moyenne</div></div>
            </div>
            <div>
              <div class="cinfo__k" style="margin-bottom:.6rem">Suivre l'alliance</div>
              <div class="social-row">
                <a href="https://www.instagram.com/aliamnt_" target="_blank" rel="noopener" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
                <a href="https://www.tiktok.com/@aliamnt_" target="_blank" rel="noopener" aria-label="TikTok"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3v3.5a5.5 5.5 0 0 0 4 5.3V15a8.5 8.5 0 0 1-4-1v5.5A5.5 5.5 0 1 1 10.5 14v3a2.5 2.5 0 1 0 2.5 2.5V3h3z"/></svg></a>
                <a href="#" rel="noopener" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.1c0-1.7 0-3.9-2.37-3.9-2.38 0-2.74 1.85-2.74 3.77V24h-4V8z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DON -->
    <section class="stats" id="don" style="scroll-margin-top:90px">
      <div class="wrap" style="padding-top:clamp(4rem,8vw,6rem);padding-bottom:clamp(4rem,8vw,6rem)">
        <div class="split" style="align-items:center">
          <div class="reveal">
            <span class="label" style="display:block;margin-bottom:1rem">Faire un don</span>
            <h2 class="sec-title">Ton soutien<br />devient <em>action</em></h2>
            <p class="pilier__desc" style="margin-top:1.4rem">
              Chaque contribution finance des campagnes de terrain, des supports éducatifs et des dépistages dans
              les communautés qui en ont le plus besoin.
            </p>
          </div>
          <div class="reveal" data-d="1">
            <div style="background:var(--bg);border:1px solid var(--border);border-radius:24px;padding:clamp(1.8rem,4vw,2.6rem)">
              <div style="display:flex;gap:.7rem;flex-wrap:wrap;margin-bottom:1.4rem">
                <button
                  v-for="a in amounts"
                  :key="a"
                  class="chip"
                  :class="{ active: selected === a && !customAmount }"
                  @click="selectAmount(a)"
                >{{ fmt(a) }} FCFA</button>
              </div>
              <div class="field" style="margin-bottom:1.4rem">
                <label for="amt">Montant personnalisé (FCFA)</label>
                <input id="amt" v-model="customAmount" type="number" placeholder="10 000" min="0" />
              </div>
              <button class="btn btn--primary" style="width:100%;justify-content:center" @click="donate">
                Faire un don de {{ fmt(currentAmount) }} FCFA
              </button>
              <p class="form__note" style="margin-top:1rem;text-align:center">Paiement sécurisé · Mobile Money &amp; carte · Démo</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="sec">
      <div class="wrap" style="max-width:820px">
        <div class="sec-head reveal" style="margin-bottom:2rem">
          <span class="label">Questions fréquentes</span>
          <h2 class="sec-title">Tout savoir sur <em>ALIAMNT</em></h2>
        </div>
        <div class="faq reveal">
          <div v-for="(item, i) in faq" :key="i" class="faq__item" :class="{ open: openFaq === i }">
            <button class="faq__q" @click="openFaq = openFaq === i ? -1 : i">
              {{ item.q }}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </button>
            <div class="faq__a" :style="{ maxHeight: openFaq === i ? '300px' : '0' }"><p>{{ item.a }}</p></div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

/* formulaire (démo) */
const nom = ref('')
const email = ref('')
const sujet = ref('Devenir bénévole')
const msg = ref('')
const sent = ref(false)

function onSubmit(e: Event) {
  const form = e.target as HTMLFormElement
  if (!form.checkValidity()) {
    form.reportValidity()
    return
  }
  sent.value = true
  nom.value = ''
  email.value = ''
  msg.value = ''
}

/* don (démo) */
const amounts = [2000, 5000, 10000, 25000]
const selected = ref(5000)
const customAmount = ref('')
const currentAmount = computed(() => (customAmount.value ? Number(customAmount.value) : selected.value))

function selectAmount(a: number) {
  selected.value = a
  customAmount.value = ''
}
function fmt(n: number) {
  return n.toLocaleString('fr-FR')
}
function donate() {
  window.alert('Démo — la plateforme de paiement serait intégrée ici.')
}

/* faq */
const openFaq = ref(-1)
const faq = [
  { q: "Qu'est-ce qu'une maladie non transmissible (MNT) ?", a: 'Ce sont des maladies chroniques non contagieuses : hypertension, diabète, cancers, maladies cardiaques, maladies respiratoires… Elles représentent la première cause de mortalité dans le monde et progressent vite en Afrique.' },
  { q: "Comment puis-je m'engager auprès d'ALIAMNT ?", a: 'Tu peux devenir bénévole, relayer nos campagnes, proposer une action dans ta communauté ou ton école, ou soutenir financièrement. Remplis le formulaire ci-dessus en précisant ton envie.' },
  { q: 'Le test santé remplace-t-il un médecin ?', a: "Non. C'est un outil de sensibilisation qui t'aide à identifier tes facteurs de risque. En cas de doute ou de symptôme, consulte toujours un professionnel de santé." },
  { q: "Où agit concrètement l'alliance ?", a: "Nous sommes actifs au Niger, au Burkina Faso et en Côte d'Ivoire, à travers des campagnes de terrain, des actions digitales et des partenariats avec des soignants et des écoles." },
  { q: 'À quoi servent les dons ?', a: 'Les dons financent la production de supports éducatifs, les campagnes de terrain, les dépistages communautaires et la formation de jeunes ambassadeurs santé.' },
]

onMounted(() => {
  // Préselection du sujet via ?sujet= (ex. lien « proposer une campagne »)
  const q = route.query.sujet
  if (typeof q === 'string') {
    const match = ['Devenir bénévole', 'Proposer une campagne', 'Faire un partenariat', 'Poser une question santé', 'Autre']
      .find((s) => s.toLowerCase() === q.toLowerCase())
    if (match) sujet.value = match
  }
})
</script>
