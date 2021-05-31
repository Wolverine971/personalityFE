<template>
  <div class="m-col">
    Total Questions: {{ totalQuestions }}
    <v-card v-for="q in allQuestions" :key="q.id" class="margin-bot">
      <v-card-text class="pad-bot clickable" @click="admin ? '' : goToQuestion(q)">
        <div class="row space-between">
          <div class="margin-left">
            {{ q.question }}?
          </div>
          <div>
            <v-btn v-if="admin" outlined small>
              Id: {{ q.id }}
            </v-btn>
            <v-btn v-if="admin" outlined small>
              Author Enneagram: {{ q.author.enneagramId }}
            </v-btn>
            <v-btn v-if="admin" outlined small>
              DateCreated: {{ getTime(q.dateCreated) }}
            </v-btn>
            <v-btn v-if="admin" outlined small>
              Modified: {{ q.modified }}
            </v-btn>
            <v-btn v-if="admin" outlined small>
              Subscribers: {{ q.subscribers.length }}
            </v-btn>
            <v-btn icon small>
              <v-icon> mdi-cookie-outline </v-icon>
              {{ q.likes.length }}
            </v-btn>
            <v-btn icon small>
              <v-icon> mdi-comment-outline </v-icon>
              {{ q.comments.count }}
            </v-btn>
            <v-btn outlined icon small @click="admin ? goToQuestion(q): ''">
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
            <v-btn
              v-if="admin"
              outlined
              icon
              small
              color="red"
              @click="deleteQuestion(q)"
            >
              <v-icon>delete</v-icon>
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
</template>

<script>
import { msToTime } from '../../utils'
import { endpoints } from '../../models/endpoints'
export default {
  name: 'AllQuestions',
  props: {
    admin: {
      type: Boolean,
      default: false,
      required: false
    }
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
    },
    getTime (time) {
      return msToTime(time)
    },
    async deleteQuestion (question) {
      // this.$axios(endpoints.change)
      debugger
      const resp = await this.$axios.post(
          `${endpoints.change}`,
          { type: 'question', tag: question.id }
      )
      if (resp && resp.data) {
        this.allQuestions = this.allQuestions.filter(q => q.id !== question.id)
      }
    }
  }

}
</script>

<style>

</style>
