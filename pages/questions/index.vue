<template>
  <v-container>
    <h1>Search For Or Add A Questions</h1>
    <add-question />
    <v-spacer />
    <div>
      <h2>All Asked Questions</h2>
      <all-questions />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Index',

  components: {
    AddQuestion: () => import('../../components/shared/addQuestion'),
    AllQuestions: () => import('../../components/questions/allQuestions')
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
