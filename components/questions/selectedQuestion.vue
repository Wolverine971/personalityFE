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
    <v-col v-if="comments && comments.length && showComments">
      <div v-for="(c, i) in comments" :key="i" class="comment-div">
        <comment :comment="c" :type="'root'" />
      </div>
    </v-col>
    <v-col v-else>
      Answer Question to see other comments
    </v-col>
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
import Interact from '../shared/interact'
import Sort from './sort'
import Comment from './comment'
export default {
  name: 'SelectedQuestion',
  components: { Comment, Sort, Interact },

  data: () => ({
    comment: '',
    isLiked: false,
    question: null,
    comments: [],
    likes: [],
    subscribers: [],
    isSubscribed: false,
    commentCursorId: null,
    commentorIds: {},
    showComments: null
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
          this.commentorIds = this.alreadyFetchedQuestions[questionId].commentorIds
          this.showComments = this.commentorIds[this.$auth.user.id]
          this.comments = [...this.alreadyFetchedQuestions[questionId].comments]
          this.likes = [...this.alreadyFetchedQuestions[questionId].likes]
          this.subscribers = [
            ...this.alreadyFetchedQuestions[questionId].subscribers
          ]
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
      if (resp && resp.data && resp.data.length) {
        this.cursorId = resp.data[resp.data.length - 1].id
        this.comments = [...resp.data]
        this.question = Object.assign({}, this.question, {
          comments: this.comments
        })
        this.$store.commit('addAllQuestions', [this.question])
      }
    },
    newComment (event) {
      this.showComments = true
      this.comments = [event, ...this.comments]
      this.question.commentorIds[this.$auth.user.id] = 1
      this.question = Object.assign({}, this.question, {
        comments: this.comments
      })
      this.$store.commit('addAllQuestions', [this.question])
    }
  }
}
</script>

<style scoped></style>
