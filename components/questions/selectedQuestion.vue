<template>
  <div v-if="question">
    <div class="margin-top">
      <h5>Question</h5>
      <v-textarea
        :value="`${question.question}?`"
        type="text"
        rows="1"
        auto-grow
        readonly
        hide-details
        class="pad-bot limit-height"
      >
        <template
          v-if="
            $auth.user &&
              question.author &&
              question.author.id === $auth.user.id
          "
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
    </div>
    <div v-if="showComments" class="margin-top">
      <h5>Sorting</h5>
      <sort
        :type="'comments'"
        :selectable-types="commentTypes"
        @triggerNewSearch="filterComments($event)"
      />
    </div>
    <div v-if="showComments" class="margin-top">
      <comments
        v-if="showComments"
        :comments="question.comments"
        :parent-id="question.id"
        @commentUpdated="updateComment"
      />
    </div>
    <div v-else class="m-col">
      Answer Question to see other answers
    </div>
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
    commentCursorId: null,
    commenterIds: {},
    showComments: false,
    commentTypes: []
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
          this.commenterIds = this.question.commenterIds
          this.showComments = this.commenterIds[this.$auth.user.id]
          this.getTypes(this.question.comments.comments)
        } else {
          const resp = await this.$axios.get(
            `${endpoints.getQuestion}/${questionId}`
          )

          if (resp && resp.data) {
            this.commenterIds = resp.data.commenterIds
            this.showComments = this.commenterIds[this.$auth.user.id]
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
          // debugger
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
