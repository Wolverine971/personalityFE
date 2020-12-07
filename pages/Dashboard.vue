<template>
  <div>
    <h1>Dashboard</h1>
    <v-row v-if="newQuestions">
      <v-col v-if="subscriptions && subscriptions.length">
        <h2>Subscriptions</h2>
        <div v-for="item in subscriptions" :key="item.id" @click="goTo(item)">
          <question-display :question="item" @click="goTo(item)" />
        </div>
      </v-col>
      <v-col v-else>
        <h2>No Subscriptions</h2>
      </v-col>
      <v-col v-if="newQuestions && newQuestions.length">
        <h2>New Questions</h2>
        <div v-for="item in newQuestions" :key="item.id" @click="goTo(item)">
          <question-display :question="item" @click="goTo(item)" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import QuestionDisplay from '../components/questions/questionDisplay'
// import { getQuestionsFromData } from '../utils'
export default {
  name: 'Dashboard',
  components: { QuestionDisplay },
  data () {
    return {}
  },

  computed: {
    subscriptions () {
      return this.$store.getters.getSubscriptions
    },
    newQuestions () {
      return this.$store.getters.getNewQuestions
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
      // $router.push({name: 'next-page', params: {foo: 1}})
      this.$router.go(1)
    }
  }
}
</script>

<style></style>
