<template>
  <v-container>
    <v-card class="pad-left pad-right">
      <v-card-title>
        <h1 class="primary_v--text">Search For Or Add A Questions</h1>
      </v-card-title>
      <add-question />
      <v-spacer />
      <h2 class="secondary--text">All Asked Questions</h2>
      <all-questions />
    </v-card>
  </v-container>
</template>
<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'Index',
  components: {
    AddQuestion: () => import('../../components/shared/addQuestion'),
    AllQuestions: () => import('../../components/admin/allQuestions'),
  },

  async asyncData({ $axios, store }) {
    const lastDate = store.getters.getAllQuestionsLastDate
    if (
      !store.getters.getAllQuestions ||
      !store.getters.getAllQuestions.length
    ) {
      const resp = await $axios.get(
        `${endpoints.getAllQuestions}/${10}/${lastDate || ''}`
      )
      if (resp && resp.data) {
        store.commit('addAllQuestions', resp.data.questions)
        store.commit('setAllQuestionsCount', resp.data.count)
      }
    } else {
      console.log('dont get')
    }
  },
  head() {
    return {
      title: 'Questions',
      meta: [
        {
          hid: 'questions description',
          name: 'description',
          content: 'Look through asked questions about personality',
        },
      ],
      link: [{ rel: 'canonical', href: 'https://9takes.com/questions' }],
    }
  },
}
</script>

<style></style>
