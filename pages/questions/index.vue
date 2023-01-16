<template>
  <v-container>
    <v-card class="pad-left pad-right">
      <v-card-title>
        <h1 class="primary_v--text">
          Search For Or Add A Questions
        </h1>
      </v-card-title>
      <v-row class="row-center margin">
        <NuxtLink
          :to="{
            path: `/questions/createQuestion`,
            query: {},
          }"
        >
          <v-btn outlined text>
            Ask Question
          </v-btn>
        </NuxtLink>
      </v-row>

      <v-spacer />
      <h2 class="secondary--text">
        All Questions
      </h2>
      <ask-question />
    </v-card>
    <client-only>
      <all-questions />
    </client-only>
  </v-container>
</template>
<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'Index',
  components: {
    AskQuestion: () => import('../../components/shared/askQuestion'),
    AllQuestions: () => import('../../components/admin/allQuestions')
  },
  auth: 'guest',

  async asyncData ({ $axios, store }) {
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
      console.log('did not get questions')
    }
  },
  head () {
    return {
      title: 'Questions',
      meta: [
        {
          hid: 'questions description',
          name: 'description',
          content: 'Look through asked questions about personality'
        }
      ],
      link: [{ rel: 'canonical', href: 'https://9takes.com/questions' }]
    }
  }
}
</script>

<style>
.margin {
  margin: 1em 0;
}
</style>
