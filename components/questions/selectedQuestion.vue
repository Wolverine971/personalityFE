<template>
  <div v-if="question">
    <div>
      <v-textarea
        :value="question.question"
        label="Selected Question"
        type="text"
        rows="1"
        auto-grow
        readonly
        hide-details
        class="pad-bot"
      />
      <interact :post="question" @emitComment="newComment($event)" />
      <sort :type="'comments'" @triggerNewSearch="filterComments($event)" />
    </div>

    <v-col>
      <comments
        v-if="showComments"
        :comments="question.comments"
        :parent-id="question.id"
      />
      <v-col v-else>
        Answer Question to see other comments
      </v-col>
    </v-col>
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
import Interact from '../shared/interact'
import Sort from './sort'
import Comments from './comments'
export default {
  name: 'SelectedQuestion',
  components: { Sort, Interact, Comments },

  data: () => ({
    comment: '',
    question: null,
    commentCursorId: null,
    commentorIds: {},
    showComments: false
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
          this.question = Object.assign(
            {},
            this.alreadyFetchedQuestions[questionId]
          )
          this.commentorIds = this.question.commentorIds
          this.showComments = this.commentorIds[this.$auth.user.id]
        } else {
          const resp = await this.$axios.get(
            `${endpoints.getQuestion}/${questionId}`
          )

          if (resp && resp.data) {
            this.commentorIds = resp.data.commentorIds
            this.showComments = this.commentorIds[this.$auth.user.id]
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
      if (this.cursorId) {
        event.cursorId = this.cursorId
      }
      const resp = await this.$axios.post(
        `${endpoints.getSortedComments}/${this.questionId}`,
        event
      )
      if (resp && resp.data && resp.data.comments) {
        if (resp.data.comments.length) {
          this.cursorId = resp.data.comments[resp.data.comments.length - 1].dateCreated
        }
        this.question.comments = resp.data
        this.$store.commit('addAllQuestions', [this.question])
      }
    },
    newComment (event) {
      this.showComments = true
      const newComments = [event, ...this.question.comments.comments]
      this.question.commentorIds[this.$auth.user.id] = 1
      this.question = Object.assign({}, this.question, {
        comments: Object.assign({}, this.question.comments, {
          comments: newComments
        }, {
          count: this.question.comments.count += 1
        })
      })
      this.$store.commit('addAllQuestions', [this.question])
    }
  }
}
</script>

<style scoped></style>
