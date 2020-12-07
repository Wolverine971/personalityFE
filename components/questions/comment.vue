<template>
  <v-card v-if="componentComment">
    <v-card-title>
      <v-avatar
        elevation="2"
        icon
        outlined
        raised
        large
        class="bubble-font"
        :class="`class${componentComment.author.enneagramId}`"
      >
        {{ componentComment.author.enneagramId }}
      </v-avatar>
      <p class="ml-3">
        {{ componentComment.comment }}
      </p>
    </v-card-title>
    <div class="btn-group">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            small
            v-bind="attrs"
            :class="{ 'btn-selected': isLiked }"
            class="margin-right"
            v-on="on"
            @click="likeComment"
          >
            <v-icon>
              {{ isLiked ? 'mdi-cookie' : 'mdi-cookie-outline' }}
            </v-icon>
          </v-btn>
        </template>
        {{ componentComment.likes.length }}
      </v-tooltip>
      <v-btn outlined small @click="expandComment">
        <v-icon color="primary">
          mdi-comment-outline
        </v-icon>
      </v-btn>
    </div>

    <div class="comment-div">
      <v-expansion-panels
        v-if="componentComment.comments.length"
        @click="checkComments"
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ componentComment.comments.length }} Comments
          </v-expansion-panel-header>
          <v-expansion-panel-content
            v-for="(c, i) in componentComment.comments"
            :key="i"
          >
            <comment :comment="c" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-expand-transition>
        <div v-show="commentIsExpanded" class="margin-top">
          <v-textarea
            ref="newComment"
            v-model="commentOnComment"
            type="text"
            placeholder="Make a comment"
            outlined
            rows="1"
            auto-grow
            solo
            class="user-comment"
          >
            <template slot="append">
              <v-btn v-if="commentOnComment" @click="submitComment">
                Submit Comment
              </v-btn>
            </template>
          </v-textarea>
        </div>
      </v-expand-transition>
    </div>
  </v-card>
</template>

<script>
import { endpoints } from '../../models/endpoints'
import { comment } from '../../models/interfaces'
export default {
  name: 'Comment',
  props: {
    comment: {
      type: comment,
      required: true,
      default: null
    }
  },
  data: () => ({
    isLiked: false,
    likes: [],
    componentComment: null,
    commentIsExpanded: false,
    commentOnComment: ''
  }),
  computed: {},
  watch: {
    likes (likes) {
      if (likes) {
        this.isLiked = likes.includes(this.$auth.user.email)
      } else {
        this.isLiked = false
      }
    },
    comment (comment) {
      this.componentComment = comment
      this.isLiked = comment.likes.includes(this.$auth.user.email)
      this.likes = comment.likes
    }
  },
  async mounted () {
    if (!this.comment.comment) {
      const resp = await this.$axios.get(
        `${endpoints.getComment}/${this.comment.id}`
      )
      this.componentComment = Object.assign({}, resp.data)
    } else {
      this.componentComment = this.comment
    }
    this.likes = this.componentComment.likes
  },
  methods: {
    async likeComment () {
      try {
        const isLiked = !this.isLiked
        let resp = null
        let newLikes = []
        if (isLiked) {
          newLikes = [...this.likes, this.$auth.user.email]
          resp = await this.$axios.get(
            `${endpoints.likeComment}/${this.componentComment.id}/add`
          )
        } else {
          newLikes = this.likes.filter(l => l !== this.$auth.user.email)
          resp = await this.$axios.get(
            `${endpoints.likeComment}/${this.componentComment.id}/remove`
          )
        }
        if (resp) {
          this.componentComment.likes = [...newLikes]
          this.likes = newLikes
          if (isLiked) {
            this.$store.dispatch('toastSuccess', 'Liked Comment')
          } else {
            this.$store.dispatch('toastSuccess', 'Unliked Comment')
          }
        }
      } catch (error) {
        this.$store.dispatch('toastError', 'Comment Like Failed')
      }
    },
    async submitComment () {
      try {
        const resp = await this.$axios.post(
          `${endpoints.addComment}/comment/${this.componentComment.id}`,
          {
            comment: this.commentOnComment
          }
        )
        if (resp) {
          this.componentComment.comments = this.componentComment.comments
            ? [...this.componentComment.comments, resp.data]
            : [resp.data]

          this.commentOnComment = ''
          this.$store.dispatch('toastSuccess', 'Comment Submitted')
        }
      } catch (error) {
        console.log(error)
        this.$store.dispatch('toastError', 'Comment Submittion Failed')
      }
    },
    expandComment () {
      this.commentIsExpanded = true
      this.$refs.newComment.focus()
    },
    async checkComments () {
      if (!this.componentComment.comment) {
        const resp = await this.$axios.get(
          `${endpoints.getComment}/${this.componentComment.id}`
        )
        this.componentComment = Object.assign({}, resp.data)
      }
    }
  }
}
</script>

<style>
.user-comment {
  color: aqua;
}
.comment-div {
  margin: 0 0 10px 10px;
}
</style>
