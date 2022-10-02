<template>
  <div>
    <h1 class="primary_v--text">
      All Question, WIP
    </h1>

    <!-- <v-text-field
      v-model="question"
      label="Search for Question"
      @keydown.enter="searchQuestion(question)"
    /> -->
    <client-only>
      <ul>
        <li
          v-for="(link, i) in allQuestions"
          :key="i"
        >
          <NuxtLink
            :to="{
              path: `/questions/${link.url}`,
            }"
          >
            {{ link.url }}
          </NuxtLink>
        </li>
      </ul>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'DeepSearch',
  // middleware: ['disabled'],
  async asyncData ({ $axios }) {
    const allQuestions = await $axios.get('/api/question/all')
    return {
      allQuestions: allQuestions.data
    }
  },
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
