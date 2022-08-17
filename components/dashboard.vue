<template>
  <v-card>
    <h2 class="secondary--text">
      Following
    </h2>
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
    <div>
      <h3 id="subs" class="primary_v--text">
        Questions Peeped
      </h3>
      <div v-if="subscriptions && subscriptions.length" class="m-col">
        <NuxtLink
          v-for="sub in subscriptions"
          :key="sub.id"
          :to="{
            path: `/questions/${sub.url}`,
            query: {},
          }"
        >
          <question-display
            :question="sub"
            :interact="true"
          />
        </NuxtLink>
      </div>
      <div v-else class="m-col">
        <p>No Questions Following</p>
      </div>

      <h3 id="askedQs" class="primary_v--text">
        Asked Questions
      </h3>
      <div v-if="askedQuestions && askedQuestions.length" class="m-col">
        <NuxtLink
          v-for="aqs in askedQuestions"
          :key="aqs.id"
          :to="{
            path: `/questions/${aqs.url}`,
            query: {},
          }"
        >
          <question-display
            :question="aqs"
            :interact="false"
          />
        </NuxtLink>
      </div>
      <div v-else class="m-col">
        <p>You have asked no questions</p>
      </div>

      <h3 id="newQs" class="primary_v--text">
        New Questions
      </h3>
      <div v-if="newQuestions && newQuestions.length" class="m-col">
        <NuxtLink
          v-for="nqs in newQuestions"
          :key="nqs.id"
          :to="{
            path: `/questions/${nqs.url}`,
            query: {},
          }"
        >
          <question-display
            :question="nqs"
            :interact="false"
          />
        </NuxtLink>
      </div>
      <!-- <NuxtLink
          v-for="nqs in newQuestions"
          :key="nqs.id"
          :to="{
            path: `/questions/${nqs.url}`,
            query: {},
          }"
          router
          style="text-decoration: none"
        >
          <question-display :question="nqs" :interact="false" />
        </NuxtLink> -->
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {
    QuestionDisplay: () => import('../components/questions/questionDisplay')
  },

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

    scrollTo (id) {
      if (id) {
        document.getElementById(id).scrollIntoView()
      }
    }
  }
}
</script>

<style>
</style>
