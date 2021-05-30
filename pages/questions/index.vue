<template>
  <v-container>
    <h1>Search For Or Add A Questions</h1>
    <add-question />
    <v-spacer />
    <div>
      <h2>All Asked Questions</h2>
      <div class="m-col">
        Total Questions: {{ totalQuestions }}
        <v-card v-for="q in allQuestions" :key="q.id" class="margin-bot">
          <v-card-text class="pad-bot clickable" @click="goToQuestion(q)">
            <div class="row space-between">
              <div>{{ q.question }}?</div>
              <div>
                <v-btn icon>
                  <v-icon> mdi-cookie-outline </v-icon>
                  {{ q.likes.length }}
                </v-btn>
                <v-btn icon>
                  <v-icon> mdi-comment-outline </v-icon>
                  {{ q.comments.count }}
                </v-btn>
                <v-btn outlined icon>
                  <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <div
          v-if="questionsCount < totalQuestions && !questionsLoading"
          class="row"
          @click="loadMoreQuestions"
        >
          <v-btn outlined>
            Load More
          </v-btn>
        </div>
        <v-progress-linear v-else-if="questionsLoading" indeterminate />
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  // middleware: 'accessToken',

  components: {
    AddQuestion: () => import('../../components/shared/addQuestion')
  },
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
