<template>
  <v-card flat class="m-col">
    <v-card-title> Total Questions: {{ totalQuestions }} </v-card-title>
    <v-expansion-panels>
      <v-expansion-panel v-for="q in questions" :key="q.id" class="margin-bot">
        <v-expansion-panel-header> {{ q.question }}? </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn v-if="admin" outlined small>
            Id: {{ q.id }}
          </v-btn>
          <v-btn v-if="admin" outlined small>
            Url: {{ q.url }}
          </v-btn>
          <v-btn v-if="admin" outlined small>
            Author Enneagram: {{ q.author ? q.author.enneagramId : '' }}
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
          <v-btn v-if="q.likes" outlined small>
            <v-icon> mdi-cookie-outline </v-icon>
            {{ q.likes.length }}
          </v-btn>
          <v-btn v-if="q.comments" outlined small>
            <v-icon> mdi-comment-outline </v-icon>
            {{ q.comments.count }}
          </v-btn>
          <NuxtLink
            :to="{
              path: `/questions/${q.url}`,
              query: {},
            }"
            style="text-decoration: none; margin-left: 8px"
          >
            <v-btn outlined small>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </NuxtLink>

          <v-btn
            v-if="admin"
            outlined
            small
            color="red"
            @click="deleteQuestion(q)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-card-actions>
      <v-btn
        v-if="questionsCount < totalQuestions && !questionsLoading"
        outlined
        color="secondary"
        @click="loadMoreQuestions"
      >
        Load More
      </v-btn>
      <v-progress-linear v-else-if="questionsLoading" indeterminate />
    </v-card-actions>
  </v-card>
</template>

<script>
import { msToTime } from '../../utils'
import { endpoints } from '../../models/endpoints'
export default {
  name: 'AdminQuestions',
  props: {
    admin: {
      type: Boolean,
      default: false,
      required: false
    },
    numberOfQuestions: {
      type: String,
      default: '10',
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
      const questions = this.$store.getters.getAllQuestions
      if (questions) {
        return Object.keys(questions)
          .map((q) => {
            return questions[q]
          })
          .sort((a, b) => {
            return new Date(b.dateCreated) - new Date(a.dateCreated)
          })
      } else {
        return []
      }
      // return this.$store.getters.getAllQuestions
    },
    totalQuestions () {
      return this.$store.getters.getAllQuestionsCount
    }
  },
  watch: {
    allQuestions (val) {
      this.questionsCount = val.length
    },
    numberOfQuestions (val) {
      if (val) {
        this.pageSize = val
      }
    }
  },
  mounted () {
    //   this.pageSize = this.numberOfQuestions
    if (!this.totalQuestions) {
      this.$store.dispatch('getPaginatedQuestions', this.pageSize)
    }
    // else {
    //   const questions = this.$store.getters.getAllQuestions
    //   this.parseQuestions(questions)
    // }
  },
  methods: {
    async loadMoreQuestions () {
      this.questionsLoading = true
      await this.$store.dispatch('getPaginatedQuestions', this.pageSize)
      this.questionsLoading = false
    },
    goToQuestion (item) {
      this.typeAhead = []
      this.$router.push({ path: `/questions/${item.url}` })
      this.$router.go(1)
    },
    // parseQuestions(questions) {
    //   this.allQuestions = Object.keys(questions)
    //     .map((q) => {
    //       return questions[q]
    //     })
    //     .sort(function (a, b) {
    //       return new Date(b.dateCreated) - new Date(a.dateCreated)
    //     })
    // },
    getTime (time) {
      return msToTime(time)
    },
    async deleteQuestion (question) {
      const resp = await this.$axios.post(`${endpoints.change}`, {
        type: 'question',
        tag: question.id
      })
      if (resp && resp.data) {
        // pop from store
        this.allQuestions = this.allQuestions.filter(
          q => q.id !== question.id
        )
      }
    }
  }
}
</script>

<style>
.flex-end {
  margin-left: auto;
}
@media only screen and (max-width: 400px) {
  .flex-end {
    display: flex;
    justify-content: flex-end !important;
    column-gap: 5%;
  }
}
.space-between {
  margin-right: 0px !important;
}
</style>
