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
    <v-col v-if="subscriptions && subscriptions.length">
      <div v-for="sub in subscriptions" :key="sub.id" @click="goTo(sub)">
        <question-display :question="sub" :interact="true" @click="goTo(sub)" />
      </div>
    </v-col>
    <v-col v-else>
      <p>No Questions Following</p>
    </v-col>

    <h3 id="askedQs">
      Asked Questions
    </h3>
    <v-col v-if="askedQuestions && askedQuestions.length">
      <div v-for="aqs in askedQuestions" :key="aqs.id" @click="goTo(aqs)">
        <question-display :question="aqs" :interact="false" @click="goTo(aqs)" />
      </div>
    </v-col>
    <v-col v-else>
      <p>You have asked no qestions</p>
    </v-col>

    <h3 id="newQs">
      New Questions
    </h3>
    <v-col v-if="newQuestions && newQuestions.length">
      <div v-for="nqs in newQuestions" :key="nqs.id" @click="goTo(nqs)">
        <question-display :question="nqs" :interact="false" @click="goTo(nqs)" />
      </div>
    </v-col>
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
