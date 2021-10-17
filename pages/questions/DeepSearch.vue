<template>
  <div>
    <h1 class="primary_v--text">
      Question
    </h1>

    <v-text-field
      v-model="question"
      label="Search for Question"
      @keydown.enter="searchQuestion(question)"
    />
  </div>
</template>

<script>
export default {
  name: 'DeepSearch',
  middleware: ['disabled'],
  data () {
    return {
      question: ''
    }
  },
  methods: {
    searchQuestion () {
      console.log('search for questions')
    }
  }
}
</script>

<style>
</style>
