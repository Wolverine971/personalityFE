<template>
  <div v-if="question">
    <div>
      <v-textarea
        :value="question.question"
        label="Selected Question"
        type="text"
        filled
        rows="1"
        auto-grow
        readonly
        hide-details
        class="pad-bot"
      />
      <div class="btn-group">
        <v-tooltip v-if="likes" top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              small
              v-bind="attrs"
              :class="{ 'btn-selected': isLiked }"
              class="margin-right"
              v-on="on"
              @click="likeQuestion"
            >
              <v-icon>
                {{ isLiked ? 'mdi-cookie' : 'mdi-cookie-outline' }}
              </v-icon>
            </v-btn>
          </template>
          {{ likes.length }}
        </v-tooltip>
        <v-btn
          outlined
          small
          class="margin-right"
          @click="$refs.answerQuestion.focus()"
        >
          <v-icon color="primary">
            mdi-comment-outline
          </v-icon>
        </v-btn>
        <v-btn
          outlined
          small
          :class="{ 'btn-selected': isSubscribed }"
          @click="subscribe"
        >
          <span class="peep-btn">
            {{ isSubscribed ? 'peeped' : 'peep' }}
          </span>
          <v-icon> face </v-icon>
        </v-btn>
      </div>
    </div>
    <v-col>
      <v-col v-if="comments && comments.length" class="pad-answer">
        <div v-for="(c, i) in comments" :key="i">
          <comment :comment="c" />
        </div>
      </v-col>
      <v-text-field
        ref="answerQuestion"
        v-model="comment"
        label="Answer"
        class="flex-column"
        rows="1"
        @keydown.enter="submitComment"
      />
      <v-row>
        <v-btn @click="cancel">
          Cancel
        </v-btn>
        <v-btn @click="submitComment">
          Submit Answer
        </v-btn>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
// import { selectedQuestion } from '../../models/interfaces'
import Comment from './comment'
export default {
  name: 'SelectedQuestion',
  components: { Comment },

  data: () => ({
    comment: '',
    isLiked: false,
    question: null,
    comments: [],
    likes: [],
    subscribers: [],
    isSubscribed: false
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
    },
    likes (likes) {
      if (likes) {
        this.isLiked = likes.includes(this.$auth.user.email)
      } else {
        this.isLiked = false
      }
    },
    subscribers (subs) {
      if (subs) {
        this.isSubscribed = subs.includes(this.$auth.user.email)
      } else {
        this.isSubscribed = false
      }
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.id) {
      this.getQuestion(this.$route.params.id)
    }
  },
  methods: {
    cancel () {
      this.comment = ''
    },
    async likeQuestion () {
      try {
        const isLiked = !this.isLiked
        let resp = null
        let newLikes = []
        if (isLiked) {
          newLikes = [...this.likes, this.$auth.user.email]
          resp = await this.$axios.get(
            `${endpoints.likeQuestion}/${this.question.id}/add`
          )
        } else {
          newLikes = this.likes.filter(l => l !== this.$auth.user.email)
          resp = await this.$axios.get(
            `${endpoints.likeQuestion}/${this.question.id}/remove`
          )
        }
        if (resp && resp.data) {
          this.question.likes = [...newLikes]
          this.$store.commit('addAllQuestions', [this.question])
          this.likes = newLikes
          if (isLiked) {
            this.$store.dispatch('toastSuccess', 'Liked Comment')
          } else {
            this.$store.dispatch('toastSuccess', 'Unliked Comment')
          }
        } else {
          this.$store.dispatch('toastError', 'Failed To Like Comment')
        }
      } catch (error) {
        this.$store.dispatch('toastError', 'Question Like Failed')
      }
    },
    async getQuestion (questionId) {
      // this.question = questionId
      // debugger
      // const question = this.alreadyFetchedQuestions[questionId]
      if (
        this.alreadyFetchedQuestions &&
        this.alreadyFetchedQuestions[questionId] &&
        this.alreadyFetchedQuestions[questionId].comments
      ) {
        this.question = Object.assign(
          {},
          this.alreadyFetchedQuestions[questionId]
        )
        this.comments = [...this.alreadyFetchedQuestions[questionId].comments]
        this.likes = [...this.alreadyFetchedQuestions[questionId].likes]
        this.subscribers = [
          ...this.alreadyFetchedQuestions[questionId].subscribers
        ]
      } else {
        // if (!question.comments) {
        const resp = await this.$axios.get(
          `${endpoints.getQuestion}/${questionId}`
        )
        if (resp && resp.data) {
          // this.question = question
          this.question = Object.assign({}, resp.data)
          this.comments = [...resp.data.comments]
          this.likes = [...resp.data.likes]
          this.subscribers = [...resp.data.subscribers]
          this.$store.commit('addAllQuestions', [resp.data])
        } else {
          this.$store.dispatch('toastError', 'Failed To Get Question')
        }
      }
    },
    async submitComment () {
      try {
        const resp = await this.$axios.post(
          `${endpoints.addComment}/question/${this.question.id}`,
          {
            comment: this.comment
          }
        )
        if (resp && resp.data) {
          this.comments = [...this.comments, resp.data]
          this.question = Object.assign({}, this.question, {
            comments: this.comments
          })
          this.$store.commit('addAllQuestions', [this.question])
          this.$store.dispatch('toastSuccess', 'Comment Submitted')
          this.comment = ''
        } else {
          this.$store.dispatch('toastError', 'Failed To Submit Comment')
        }
      } catch (error) {
        console.log(error)
        this.$store.dispatch('toastError', 'Comment Submittion Failed')
      }
    },
    async subscribe () {
      try {
        const isSubscribed = !this.isSubscribed
        let resp = null
        let newSubscribers = []
        if (isSubscribed) {
          newSubscribers = [...this.subscribers, this.$auth.user.email]
          resp = await this.$axios.get(
            `${endpoints.subQuestion}/${this.question.id}/add`
          )
        } else {
          newSubscribers = this.subscribers.filter(
            l => l !== this.$auth.user.email
          )
          resp = await this.$axios.get(
            `${endpoints.subQuestion}/${this.question.id}/remove`
          )
        }
        if (resp && resp.data) {
          this.question.subscribers = [...newSubscribers]
          this.subscribers = newSubscribers
          // this.question = Object.assign({}, this.question, { comments: this.comments })
          this.$store.commit('addAllQuestions', [this.question])
          if (isSubscribed) {
            this.$store.dispatch('toastSuccess', 'Subscibed')
          } else {
            this.$store.dispatch('toastSuccess', 'Unsubscibed')
          }
          this.$store.commit('setRefreshDashboard', true)
        } else {
          this.$store.dispatch('toastError', 'Failed To Subscribe')
        }
      } catch (error) {
        this.$store.dispatch('toastError', 'Question Like Failed')
      }
    }
  }
}
</script>

<style scoped>
.pad-answer {
  margin-left: 10px;
}
</style>
