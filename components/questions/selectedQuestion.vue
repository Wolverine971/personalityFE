<template>
  <div v-if="question">
    <v-card class="margin-top">
      <v-card-title class="primary_v--text">
        Question
      </v-card-title>
      <v-card-text>
        <v-textarea
          cols="12"
          md="4"
          :value="`${question.question}?`"
          type="text"
          rows="1"
          auto-grow
          readonly
          hide-details
          class="pad-bot limit-height"
        >
          <template
            v-if="user && question.author && question.author.id === user.id"
            v-slot:append
          >
            <edit-content
              :content="question.question"
              :label="'Update Question'"
              @updateContent="updateQuestion"
            />
          </template>
        </v-textarea>
        <interact
          :post="question"
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
        <sort
          :type="'comments'"
          :selectable-types="commentTypes"
          @triggerNewSearch="filterComments($event)"
        />
      </v-card-text>
    </v-card>
    <comments
      v-if="showComments"
      class="margin-top"
      :comments="question.comments"
      :parent-id="question.id"
      :hide-loader="true"
      @commentUpdated="updateComment"
    />
    <v-btn
      v-if="
        question.comments.comments.length < question.comments.count &&
          !commentsLoading
      "
      class="margin-top row"
      color="secondary"
      @click="loadMore"
    >
      Load More
    </v-btn>
    <v-progress-linear v-else-if="commentsLoading" indeterminate />
    <v-card v-else-if="!showComments" class="m-col">
      Answer Question to see other answers
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
    EditContent: () => import('../shared/editContent.vue')
  },

  data: () => ({
    question: null,
    commenterIds: {},
    showComments: false,
    commentTypes: [],
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
          this.getTypes(this.question.comments.comments)
        } else {
          const resp = await this.$axios.get(
            `${endpoints.getQuestion}/${questionId}`
          )

          if (resp && resp.data) {
            this.commenterIds = resp.data.commenterIds
            this.showComments = this.commenterIds[this.user.id]
            this.getTypes(resp.data.comments.comments)
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

          this.question.comments = resp.data
          this.$store.commit('addAllQuestions', [this.question])
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
          ...this.question.comments.comments,
          ...resp.data.comments
        ]
        this.question.comments.comments = comments
        this.$store.commit('addAllQuestions', [this.question])
      }
      this.commentsLoading = false
    },
    newComment (event) {
      this.showComments = true
      const newComments = [event, ...this.question.comments.comments]
      this.question.commenterIds[this.user.id] = 1
      this.question = Object.assign({}, this.question, {
        comments: Object.assign(
          {},
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
    async updateQuestion (event) {
      const resp = await this.$axios.post(
        `${endpoints.updateQuestion}/${this.questionId}`,
        {
          question: event
        }
      )
      if (resp && resp.data) {
        this.question.question = event
        this.question = Object.assign({}, this.question, {
          question: event
        })
        this.$store.commit('addAllQuestions', [this.question])
        this.$store.dispatch('toastSuccess', 'Updated Question')
      } else {
        this.$store.dispatch('toastError', 'Update Question Failure')
      }
    },
    async updateComment (event) {
      const selectedComment = this.question.comments.comments[event.index]
      const resp = await this.$axios.post(
        `${endpoints.updateComment}/${selectedComment.id}`,
        {
          comment: event.comment
        }
      )
      if (resp && resp.data) {
        this.question.comments.comments[event.index].comment = event.comment

        this.$store.commit('addAllQuestions', [this.question])
        this.$store.dispatch('toastSuccess', 'Updated Comment')
      } else {
        this.$store.dispatch('toastError', 'Update Comment Failure')
      }
    },
    getTypes (comments) {
      const commentsObj = {}
      let commentTypes = []
      comments.forEach((c) => {
        if (c.author && !commentsObj[c.author.enneagramId]) {
          commentTypes = [...commentTypes, c.author.enneagramId]
          commentsObj[c.author.enneagramId] = 1
        }
      })
      this.commentTypes = commentTypes
    }
  }
}
</script>

<style scoped>
.qLabel {
  height: 19px !important;
}
.limit-height {
  margin-top: 0px !important;
  padding-top: 0px !important;
}
</style>
