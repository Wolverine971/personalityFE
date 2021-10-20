<template>
  <div>
    <div class="btn-group">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="!user"
            outlined
            small
            v-bind="attrs"
            :color="isLiked ? 'primary' : null"
            class="margin-right"
            v-on="on"
            @click="like"
          >
            {{ $vuetify.breakpoint.mobile && likes.length ? likes.length : '' }}
            <v-icon>
              {{ isLiked ? 'mdi-cookie' : 'mdi-cookie-outline' }}
            </v-icon>
          </v-btn>
        </template>
        Likes {{ likes.length }}
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            small
            class="margin-right"
            :disabled="!user"
            color="secondary"
            v-bind="attrs"
            @click="expandComment"
            v-on="on"
          >
            <v-icon> mdi-comment-outline </v-icon>
          </v-btn>
        </template>
        Comment
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="type === 'question'"
            v-bind="attrs"
            :disabled="!user"
            outlined
            small
            :color="isSubscribed ? 'primary' : null"
            v-on="on"
            @click="subscribe"
          >
            <span class="peep-btn">
              {{ isSubscribed ? 'peeped' : 'peep' }}
            </span>
            <v-icon> face </v-icon>
          </v-btn>
        </template>
        Follow/ Subscribe
      </v-tooltip>
    </div>

    <v-expand-transition>
      <div v-show="commentIsExpanded" class="margin-top">
        <v-textarea
          ref="newComment"
          v-model="comment"
          type="text"
          filled
          placeholder="Make a comment"
          outlined
          rows="1"
          auto-grow
          hide-details
          class="pad-bot margin-left"
          maxlength="1000"
          counter
        >
          <template v-if="!$vuetify.breakpoint.mobile" slot="append">
            <v-btn v-if="comment" small outlined @click="submitComment">
              Submit Comment
            </v-btn>
          </template>
        </v-textarea>
        <div v-if="$vuetify.breakpoint.mobile" class="margin-bot">
          <v-btn v-if="comment" small outlined @click="submitComment">
            Submit Comment
          </v-btn>
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'Interact',
  props: {
    post: {
      type: Object,
      required: true,
      default: null
    },
    type: {
      type: String,
      required: true,
      default: null
    }
  },
  data () {
    return {
      comment: '',
      isLiked: false,
      likes: [],
      subscribers: [],
      isSubscribed: false,
      commentIsExpanded: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    post (post) {
      if (post) {
        this.parsePost(post)
      }
    },
    likes (likes) {
      if (this.user) {
        if (likes) {
          this.isLiked = likes.includes(this.user.id)
        } else {
          this.isLiked = false
        }
      }
    },
    subscribers (subs) {
      if (this.user) {
        if (subs) {
          this.isSubscribed = subs.includes(this.user.id)
        } else {
          this.isSubscribed = false
        }
      }
    }
  },
  mounted () {
    this.parsePost(this.post)
  },
  methods: {
    async like () {
      if (this.user) {
        try {
          const isLiked = !this.isLiked
          let resp
          let newLikes

          isLiked
            ? (newLikes = [...this.likes, this.user.id])
            : (newLikes = this.likes.filter(l => l !== this.user.id))

          this.likes = newLikes
          this.$emit('likeChange', this.likes)
          if (this.type === 'question') {
            resp = await this.$axios.get(
              `${endpoints.likeQuestion}/${this.post.id}/${
                isLiked ? 'add' : 'remove'
              }`
            )
            if (resp && resp.data) {
              this.post.likes = [...newLikes]
              this.$store.commit('addAllQuestions', [this.post])
            }
          } else if (this.type === 'comment') {
            resp = await this.$axios.get(
              `${endpoints.likeComment}/${this.post.id}/${
                isLiked ? 'add' : 'remove'
              }/${this.user.enneagramId}`
            )
          } else if (this.type === 'content') {
            resp = await this.$axios.get(
              `${endpoints.likeContent}/${this.post.id}/${
                isLiked ? 'add' : 'remove'
              }/${this.user.enneagramId}`
            )
          } else {
            resp = await this.$axios.get(
              `${endpoints.likeThread}/${this.post.id}/${
                isLiked ? 'add' : 'remove'
              }/${this.user.enneagramId}`
            )
          }
          if (isLiked) {
            this.$store.dispatch('toastSuccess', 'Liked Comment')
          } else {
            this.$store.dispatch('toastSuccess', 'Unliked Comment')
          }
        } catch (error) {
          this.$store.dispatch('toastError', 'Question Like Failed')
        }
      } else {
        this.$store.dispatch('toastError', 'Must Login')
      }
    },
    async submitComment () {
      if (this.user) {
        const resp = await this.$axios.post(
          `${endpoints.addComment}/${this.type}/${this.post.id}/${
            this.type === 'content' ? this.user.enneagramId : ''
          }`,
          {
            comment: this.comment
          }
        )
        if (resp && resp.data) {
          this.comment = ''
          this.$emit('emitComment', resp.data)
          this.$store.dispatch('toastSuccess', 'Comment Submitted')
        } else {
          this.$store.dispatch('toastError', 'Failed To Submit Comment')
        }
      } else {
        this.$store.dispatch('toastError', 'Must Login')
      }
    },
    async subscribe () {
      if (this.user) {
        try {
          const isSubscribed = !this.isSubscribed
          let newSubscribers = []

          const resp = await this.$axios.get(
            `${endpoints.subQuestion}/${this.post.id}/${
              isSubscribed ? 'add' : 'remove'
            }`
          )
          if (resp && resp.data) {
            if (isSubscribed) {
              newSubscribers = [...this.subscribers, this.user.id]
              this.$store.dispatch('toastSuccess', 'Subscibed')
            } else {
              newSubscribers = this.subscribers.filter(
                l => l !== this.user.id
              )
              this.$store.dispatch('toastSuccess', 'Unsubscibed')
            }
            this.post.subscribers = [...newSubscribers]
            this.subscribers = newSubscribers
            this.$store.commit('addAllQuestions', [this.post])
            this.$store.commit('setRefreshDashboard', true)
          } else {
            this.$store.dispatch('toastError', 'Failed To Subscribe')
          }
        } catch (error) {
          this.$store.dispatch('toastError', 'Question Like Failed')
        }
      } else {
        this.$store.dispatch('toastError', 'Must Login')
      }
    },
    expandComment () {
      if (this.user) {
        this.commentIsExpanded = true
        this.$refs.newComment.focus()
      } else {
        this.$store.dispatch('toastError', 'Must Login')
      }
    },
    parsePost (post) {
      this.likes = [...post.likes]
      if (this.type === 'question' && this.user) {
        this.commentIsExpanded = !post.commenterIds[this.user.id]
        this.subscribers = [...post.subscribers]
      }
    }
  }
}
</script>

<style></style>
