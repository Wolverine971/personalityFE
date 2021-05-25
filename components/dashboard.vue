<template>
  <div class="smooth-scroll">
    <h2>Following</h2>
    <v-tabs v-if="!$vuetify.breakpoint.mobile">
      <v-tab @click="scrollTo('subs')">
        Peeps
      </v-tab>
      <v-tab @click="scrollTo('askedQs')">
        Your Asked Questions
      </v-tab>
      <v-tab @click="scrollTo('newQs')">
        New Questions
      </v-tab>
    </v-tabs>
    <h3 id="subs">
      Questions Peeped
    </h3>
    <div v-if="subscriptions && subscriptions.length" class="col">
      <div v-for="sub in subscriptions" :key="sub.id" @click="goTo(sub)">
        <question-display :question="sub" :interact="true" @click="goTo(sub)" />
      </div>
    </div>
    <div v-else class="col">
      <p>No Questions Following</p>
    </div>

    <h3 id="askedQs">
      Asked Questions
    </h3>
    <div v-if="askedQuestions && askedQuestions.length" class="col">
      <div v-for="aqs in askedQuestions" :key="aqs.id" @click="goTo(aqs)">
        <question-display :question="aqs" :interact="false" @click="goTo(aqs)" />
      </div>
    </div>
    <div v-else class="col">
      <p>You have asked no qestions</p>
    </div>

    <h3 id="newQs">
      New Questions
    </h3>
    <div v-if="newQuestions && newQuestions.length" class="col">
      <div v-for="nqs in newQuestions" :key="nqs.id" @click="goTo(nqs)">
        <question-display :question="nqs" :interact="false" @click="goTo(nqs)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: { QuestionDisplay: () => import('../components/questions/questionDisplay') },
  data () {
    return {}
  },
  middleware: ['accessToken', 'loggedIn'],

  computed: {
    subscriptions () {
      return this.$store.getters.getSubscriptions
    },
    newQuestions () {
      return this.$store.getters.getNewQuestions
    },
    askedQuestions () {
      return this.$store.getters.getAskedQuestions
    }
  },
  watch: {},
  mounted () {
    const dash = this.$store.getters.getNewQuestions
    if (dash.length === 0 || this.$store.getters.getRefreshDashboard) {
      this.$store.dispatch('getDashboard')
      this.$store.commit('setRefreshDashboard', false)
    }
  },
  methods: {
    goTo (item) {
      this.$router.push({ path: `/questions/${item.id}` })
      this.$router.go(1)
    },
    scrollTo (id) {
      document.getElementById(id).scrollIntoView()
    }
  }
}
</script>

<style>
.smooth-scroll {
  scroll-behavior: smooth;
}

</style>
