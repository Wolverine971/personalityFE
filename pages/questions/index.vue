<template>
  <v-container>
    <h1 class="primary_v--text">
      Search For Or Add A Questions
    </h1>
    <add-question />
    <v-spacer />
    <div>
      <h2 class="secondary--text">
        All Asked Questions
      </h2>
      <all-questions />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  components: {
    AddQuestion: () => import('../../components/shared/addQuestion'),
    AllQuestions: () => import('../../components/admin/allQuestions')
  },
  head () {
    return {
      title: 'Questions',
      meta: [
        {
          hid: 'questions description',
          name: 'description',
          content:
          'Look through asked questions about personality'
        }
      ],
      link: [
        { rel: 'canonical', href: 'https://9takes.com/questions' }
      ]
    }
  }
}
</script>

<style></style>
