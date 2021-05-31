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
  }
}
</script>

<style></style>
