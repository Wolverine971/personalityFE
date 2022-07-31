<template>
  <div v-if="displayedQuestion">
    <v-card class="margin-top">
      <v-card-title class="primary_v--text">
        Question
      </v-card-title>
      <v-card-text>
        <v-textarea
          cols="12"
          md="4"
          :value="`${displayedQuestion.question}?`"
          type="text"
          rows="1"
          auto-grow
          readonly
          hide-details
          class="question-background"
        >
          <template
            v-if="
              user &&
                displayedQuestion.author &&
                displayedQuestion.author.id === user.id
            "
            v-slot:append
          >
            <edit-content
              :content="displayedQuestion.question"
              :label="'Update Question'"
              @updateContent="updateQuestion"
            />
          </template>
        </v-textarea>
        <sharebox :question="displayedQuestion.question" :meta="question" />
        <interact
          :post="displayedQuestion"
          :type="'question'"
          @emitComment="newComment($event)"
        />
      </v-card-text>
    </v-card>
    <v-card v-if="showComments" class="margin-top">
      <v-card-title class="primary_v--text">
        Sorting
      </v-card-title>
      <v-card-text>
        <sort :type="'comments'" @triggerNewSearch="filterComments($event)" />
      </v-card-text>
    </v-card>
    <comments
      v-if="showComments"
      class="margin-top"
      :comments="displayedQuestion.comments"
      :parent-id="displayedQuestion.id"
      :hide-loader="true"
      @commentUpdated="updateComment"
    />
    <v-btn
      v-if="
        displayedQuestion.comments.comments.length <
          displayedQuestion.comments.count && !commentsLoading
      "
      class="margin-top row"
      color="secondary"
      @click="loadMore"
    >
      Load More
    </v-btn>
    <v-progress-linear v-else-if="commentsLoading" indeterminate />
    <v-card v-else-if="!showComments" class="m-col">
      Answer the question to see other answers
    </v-card>
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'SelectedQuestion',
  components: {
    Sort: () => import('./sort'),
    Interact: () => import('../shared/interact'),
    Comments: () => import('./comments'),
    EditContent: () => import('../shared/editContent.vue'),
    Sharebox: () => import('../shared/sharebox.vue')
  },
  props: {
    question: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    displayedQuestion: null,
    commenterIds: {},
    showComments: false,
    commentsLoading: false,
    cursorId: null,
    params: null
  }),
  computed: {
    alreadyFetchedQuestions () {
      return this.$store.getters.getAllQuestions
    },
    questionId () {
      return this.$route.params.id
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    question (question) {
      this.parseQuestion(question)
    }
  },
  mounted () {
    this.parseQuestion(this.question)
  },
  methods: {
    parseQuestion (question) {
      if (this.user) {
        this.commenterIds = question.commenterIds
        this.showComments = this.commenterIds[this.user.id]

        this.displayedQuestion = Object.assign({}, question)
        this.$store.commit('updateAllQuestions', question)
      } else {
        this.displayedQuestion = question
      }
    },
    async getQuestion (questionId) {
      if (this.user) {
        if (
          this.alreadyFetchedQuestions &&
          this.alreadyFetchedQuestions[questionId] &&
          this.alreadyFetchedQuestions[questionId].comments
        ) {
          this.question = Object.assign(
            {},
            this.alreadyFetchedQuestions[questionId]
          )
          this.commenterIds = this.question.commenterIds
          this.showComments = this.commenterIds[this.user.id]
        } else {
          const resp = await this.$axios.get(
            `${endpoints.getQuestion}/${questionId}`
          )

          if (resp && resp.data) {
            this.commenterIds = resp.data.commenterIds
            this.showComments = this.commenterIds[this.user.id]
            this.question = Object.assign({}, resp.data)
            this.$store.commit('updateAllQuestions', resp.data)
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
          this.$store.commit('updateAllQuestions', resp.data)
        } else {
          this.$store.dispatch('toastError', 'Failed To Get Question')
          this.$router.replace({ path: '/questions' })
        }
      }
    },
    async filterComments (event) {
      if (this.user) {
        this.commentsLoading = true

        const resp = await this.$axios.post(
          `${endpoints.getSortedComments}/${this.questionId}`,
          event
        )
        if (resp && resp.data && resp.data.comments) {
          if (resp.data.comments.length) {
            this.params = { ...event }
            this.params.skip = 10
          }

          this.displayedQuestion.comments = resp.data
          this.$store.commit('updateAllQuestions', this.displayedQuestion)
        }
        this.commentsLoading = false
      }
    },
    async loadMore () {
      this.commentsLoading = true
      const resp = await this.$axios.post(
        `${endpoints.getSortedComments}/${this.questionId}`,
        this.params
      )
      if (resp && resp.data && resp.data.comments) {
        if (resp.data.comments.length) {
          this.params.skip += 10
        }
        const comments = [
          ...this.displayedQuestion.comments.comments,
          ...resp.data.comments
        ]
        this.displayedQuestion.comments.comments = comments
        this.$store.commit('updateAllQuestions', this.displayedQuestion)
      }
      this.commentsLoading = false
    },
    newComment (event) {
      this.showComments = true
      const newComments = [event, ...this.displayedQuestion.comments.comments]
      this.displayedQuestion.commenterIds[this.user.id] = 1
      this.displayedQuestion = Object.assign({}, this.displayedQuestion, {
        comments: Object.assign(
          {},
          this.displayedQuestion.comments,
          {
            comments: newComments
          },
          {
            count: (this.displayedQuestion.comments.count += 1)
          }
        )
      })
      this.$store.commit('updateAllQuestions', this.displayedQuestion)
    },
    async updateQuestion (event) {
      const resp = await this.$axios.post(
        `${endpoints.updateQuestion}/${this.questionId}`,
        {
          question: event
        }
      )
      if (resp && resp.data) {
        this.displayedQuestion.question = event
        this.displayedQuestion = Object.assign({}, this.displayedQuestion, {
          question: event
        })
        this.$store.commit('updateAllQuestions', this.displayedQuestion)
        this.$store.dispatch('toastSuccess', 'Updated Question')
      } else {
        this.$store.dispatch('toastError', 'Update Question Failure')
      }
    },
    async updateComment (event) {
      const selectedComment =
        this.displayedQuestion.comments.comments[event.index]
      const resp = await this.$axios.post(
        `${endpoints.updateComment}/${selectedComment.id}`,
        {
          comment: event.comment
        }
      )
      if (resp && resp.data) {
        this.displayedQuestion.comments.comments[event.index].comment =
          event.comment

        this.$store.commit('updateAllQuestions', this.displayedQuestion)
        this.$store.dispatch('toastSuccess', 'Updated Comment')
      } else {
        this.$store.dispatch('toastError', 'Update Comment Failure')
      }
    }
  }
}
</script>

<style lang="scss">
.qLabel {
  height: 19px !important;
}
.limit-height {
  margin-top: 0px !important;
  padding-top: 0px !important;
}
</style>
