<template>
  <div class="smooth-scroll">
    <h1>Dashboard</h1>
    <v-tabs v-if="!$vuetify.breakpoint.mobile">
      <v-tab @click="scrollTo('subs')">
        Subscriptions
      </v-tab>
      <v-tab @click="scrollTo('newQs')">
        New Questions
      </v-tab>
      <v-tab @click="scrollTo('askedQs')">
        Your Asked Questions
      </v-tab>
    </v-tabs>
    <v-tabs v-else vertical>
      <v-tab class="align" @click="scrollTo('subs')">
        Subscriptions
      </v-tab>
      <v-tab class="align" @click="scrollTo('newQs')">
        New Questions
      </v-tab>
      <v-tab class="align" @click="scrollTo('askedQs')">
        Your Asked Questions
      </v-tab>
    </v-tabs>
    <h2 id="subs">
      Subscriptions
    </h2>
    <v-col v-if="subscriptions && subscriptions.length">
      <div v-for="item in subscriptions" :key="item.id" @click="goTo(item)">
        <question-display :question="item" @click="goTo(item)" />
      </div>
    </v-col>
    <div v-else>
      <h2>No Subscriptions</h2>
    </div>

    <h2 id="newQs">
      New Questions
    </h2>
    <v-col v-if="newQuestions && newQuestions.length">
      <div v-for="item in newQuestions" :key="item.id" @click="goTo(item)">
        <question-display :question="item" @click="goTo(item)" />
      </div>
    </v-col>

    <h2 id="askedQs">
      Asked Questions
    </h2>
    <v-col v-if="askedQuestions && askedQuestions.length">
      <div v-for="item in askedQuestions" :key="item.id" @click="goTo(item)">
        <question-display :question="item" @click="goTo(item)" />
      </div>
    </v-col>

    <div v-else>
      <h2>No Questions Asked</h2>
    </div>
  </div>
</template>

<script>
import QuestionDisplay from '../components/questions/questionDisplay'
export default {
  name: 'Dashboard',
  components: { QuestionDisplay },
  data () {
    return {}
  },
  middleware: 'authenticated',

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
    // debugger
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
.align {
  align-self: start;
}
</style>
