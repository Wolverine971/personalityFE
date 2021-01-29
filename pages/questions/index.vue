<template>
  <v-container>
    <h1>Search Or Add A Questions</h1>
    <add-question />
    <v-spacer />
    <div>
      <h2>All Questions</h2>
      <v-col>
        Total: {{ totalQuestions }}
        <v-card v-for="q in allQuestions" :key="q.id" class="margin-bot">
          <v-card-text class="pad-bot clickable" @click="goToQuestion(q)">
            {{ q.question }}
          </v-card-text>
        </v-card>

        <v-row
          v-if="questionsCount < totalQuestions && !questionsLoading"
          @click="loadMoreQuestions"
        >
          <v-btn outlined>
            Load More
          </v-btn>
        </v-row>
        <v-progress-linear v-else-if="questionsLoading" indeterminate />
      </v-col>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  // middleware: 'accessToken',

  components: { AddQuestion: () => import('../../components/shared/addQuestion') },
  data () {
    return {
      allQuestions: [],
      pageSize: 10,
      questionsCount: 0,
      questionsLoading: false,
      key: -1
    }
  },
  computed: {
    questions () {
      return this.$store.getters.getAllQuestions
    },
    totalQuestions () {
      return this.$store.getters.getAllQuestionsCount
    }
  },
  watch: {
    questions (questions) {
      this.parseQuestions(questions)
    },
    allQuestions (val) {
      this.questionsCount = val.length
    }
  },
  mounted () {
    if (!this.totalQuestions) {
      this.$store.dispatch('getPaginatedQuestions', this.pageSize)
    } else {
      const questions = this.$store.getters.getAllQuestions
      this.parseQuestions(questions)
    }
  },
  methods: {
    async loadMoreQuestions () {
      this.questionsLoading = true
      await this.$store.dispatch('getPaginatedQuestions', this.pageSize)
      this.questionsLoading = false
    },
    goToQuestion (item) {
      this.typeAhead = []
      this.$router.push({ path: `/questions/${item.id}` })
      this.$router.go(1)
    },
    parseQuestions (questions) {
      this.allQuestions = Object.keys(questions).map((q) => {
        return questions[q]
      }).sort(function (a, b) {
        return new Date(b.dateCreated) - new Date(a.dateCreated)
      })
    }

  }
}
</script>

<style></style>
