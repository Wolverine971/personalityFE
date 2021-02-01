<template>
  <div v-if="question">
    <div>
      <v-textarea
        :value="`${question.question}?`"
        label="Question"
        type="text"
        rows="1"
        auto-grow
        readonly
        hide-details
        class="pad-bot"
      >
        <template
          v-if="$auth.user && question.author.id === $auth.user.id"
          v-slot:append
        >
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="fpink"
                v-bind="attrs"
                v-on="on"
                @click="updatedQuestion = question.question"
              >
                <v-icon> edit </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <h2>Edit Question</h2>
              </v-card-title>
              <v-card-text>
                <v-textarea
                  v-model="updatedQuestion"
                  label="Update Question"
                  type="text"
                  rows="1"
                  auto-grow
                  hide-details
                  class="pad-bot"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn color="fpink" @click="updateQuestion">
                  Update Question
                  <v-icon> keyboard_arrow_right </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-textarea>
      <interact :post="question" @emitComment="newComment($event)" />
      <sort :type="'comments'" @triggerNewSearch="filterComments($event)" />
    </div>

    <comments
      v-if="showComments"
      :comments="question.comments"
      :parent-id="question.id"
    />
    <v-col v-else>
      Answer Question to see other comments
    </v-col>
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'SelectedQuestion',
  components: {
    Sort: () => import('./sort'),
    Interact: () => import('../shared/interact'),
    Comments: () => import('./comments')
  },

  data: () => ({
    comment: '',
    question: null,
    commentCursorId: null,
    commenterIds: {},
    showComments: false,
    updatedQuestion: '',
    dialog: false
  }),
  computed: {
    alreadyFetchedQuestions () {
      return this.$store.getters.getAllQuestions
    },
    questionId () {
      return this.$route.params.id
    }
  },
  watch: {
    questionId (questionId) {
      this.getQuestion(questionId)
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.id) {
      this.getQuestion(this.$route.params.id)
    }
  },
  methods: {
    async getQuestion (questionId) {
      if (this.$auth.user) {
        if (
          this.alreadyFetchedQuestions &&
          this.alreadyFetchedQuestions[questionId] &&
          this.alreadyFetchedQuestions[questionId].comments
        ) {
          this.question = Object.assign({},
            this.alreadyFetchedQuestions[questionId]
          )
          this.commenterIds = this.question.commenterIds
          this.showComments = this.commenterIds[this.$auth.user.id]
        } else {
          const resp = await this.$axios.get(
            `${endpoints.getQuestion}/${questionId}`
          )

          if (resp && resp.data) {
            this.commenterIds = resp.data.commenterIds
            this.showComments = this.commenterIds[this.$auth.user.id]
            this.question = Object.assign({}, resp.data)
            this.$store.commit('addAllQuestions', [resp.data])
          } else {
            this.$store.dispatch('toastError', 'Failed To Get Question')
            this.$router.replace({ path: '/questions' })
          }
        }
      } else {
        const resp = await this.$axios.get(
          `${endpoints.getJustQuestion}/${questionId}`
        )
        if (resp && resp.data) {
          this.question = Object.assign({}, resp.data)
          this.$store.commit('addAllQuestions', [resp.data])
        } else {
          this.$store.dispatch('toastError', 'Failed To Get Question')
          this.$router.replace({ path: '/questions' })
        }
      }
    },
    async filterComments (event) {
      if (this.$auth.user) {
        if (this.cursorId) {
          event.cursorId = this.cursorId
        }
        const resp = await this.$axios.post(
          `${endpoints.getSortedComments}/${this.questionId}`,
          event
        )
        if (resp && resp.data && resp.data.comments) {
          if (resp.data.comments.length) {
            this.cursorId =
              resp.data.comments[resp.data.comments.length - 1].dateCreated
          }
          this.question.comments = resp.data
          this.$store.commit('addAllQuestions', [this.question])
        }
      }
    },
    newComment (event) {
      this.showComments = true
      const newComments = [event, ...this.question.comments.comments]
      this.question.commenterIds[this.$auth.user.id] = 1
      this.question = Object.assign({}, this.question, {
        comments: Object.assign({},
          this.question.comments,
          {
            comments: newComments
          },
          {
            count: (this.question.comments.count += 1)
          }
        )
      })
      this.$store.commit('addAllQuestions', [this.question])
    },
    async updateQuestion () {
      const formattedQuestion = this.updatedQuestion.replace('?', '')
      const resp = await this.$axios.post(
        `${endpoints.updateQuestion}/${this.questionId}`,
        {
          question: formattedQuestion
        }
      )
      if (resp && resp.data) {
        this.question.question = formattedQuestion
        this.question = Object.assign({}, this.question, {
          question: formattedQuestion
        })
        this.$store.commit('addAllQuestions', [this.question])
        this.$store.dispatch('toastSuccess', 'Updated Question')
      } else {
        this.$store.dispatch('toastError', 'Updated Question Failure')
      }
      this.dialog = false
    }
  }
}
</script>

<style scoped></style>
