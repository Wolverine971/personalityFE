<template>
  <div v-if="componentComment && componentComment.comment" :class="'shadow'">
    <v-card-title>
      <v-avatar
        elevation="2"
        icon
        outlined
        raised
        large
        :class="`class${componentComment.author.enneagramId}`"
        color="offWhite"
      >
        {{ componentComment.author.enneagramId }}
      </v-avatar>
      <p class="ml-3">
        {{ componentComment.comment }}
      </p>
    </v-card-title>
    <interact :post="componentComment" @emitComment="newComment($event)" />

    <v-expansion-panels
      v-if="componentComment.comments.length"
      v-model="panels"
      inset
    >
      <v-expansion-panel>
        <v-expansion-panel-header @click="checkComments">
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
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
import Interact from '../shared/interact'
export default {
  name: 'Comment',
  components: { Interact },
  props: {
    comment: {
      type: Object,
      required: true,
      default: null
    },
    type: {
      type: String,
      required: false,
      default: null
    }
  },
  data: () => ({
    isLiked: false,
    likes: [],
    componentComment: null,
    commentIsExpanded: false,
    commentOnComment: '',
    panels: []
  }),
  computed: {},
  watch: {
    likes (likes) {
      if (likes) {
        this.isLiked = likes.includes(this.$auth.user.id)
      } else {
        this.isLiked = false
      }
    },
    async comment (comment) {
      this.componentComment = comment
      this.panels = []
      if (comment.comment) {
        this.isLiked = comment.likes.includes(this.$auth.user.id)
        this.likes = comment.likes
      } else {
        const resp = await this.$axios.get(
          `${endpoints.getComment}/${this.componentComment.id}`
        )
        this.componentComment = Object.assign({}, resp.data)
      }
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
          newLikes = [...this.likes, this.$auth.user.id]
          resp = await this.$axios.get(
            `${endpoints.likeComment}/${this.componentComment.id}/add`
          )
        } else {
          newLikes = this.likes.filter(l => l !== this.$auth.user.id)
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
    },
    newComment (event) {
      this.componentComment.comments = this.componentComment.comments
        ? [event, ...this.componentComment.comments]
        : [event]
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
