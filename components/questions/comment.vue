<template>
  <div
    v-if="componentComment"
    :id="componentComment.id"
    :class="'shadow'"
    @mouseover="showCookies = true"
  >
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
      <cookie-comment
        :text="componentComment.comment"
        :likes="componentComment.likes.length"
        :parent-id="componentComment.id"
        :show-cookies="showCookies"
      />
    </v-card-title>
    <interact
      v-if="interact"
      :post="componentComment"
      @emitComment="newComment($event)"
      @likeChange="likeChange"
    />

    <v-expansion-panels
      v-if="componentComment.comments.count"
      v-model="panels"
      popout
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          {{ componentComment.comments.count }} Comments
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <all-comments
            v-if="componentComment.comments.comments"
            :comments="componentComment.comments"
            :parent-id="componentComment.id"
            :display-count="false"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
import Interact from '../shared/interact'
import CookieComment from '../shared/cookieComment'
export default {
  name: 'Comment',
  components: { Interact, CookieComment, AllComments: () => import('./comments.vue') },
  props: {
    comment: {
      type: Object,
      required: true,
      default: null
    },
    interact: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data: () => ({
    componentComment: null,
    commentIsExpanded: false,
    panels: [],
    showCookies: false
  }),
  watch: {
    async comment (comment) {
      this.componentComment = comment
      this.panels = []
      if (comment.comment) {
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
  },
  methods: {
    async checkComments () {
      if (!this.componentComment.comments.comment) {
        const resp = await this.$axios.get(
          `${endpoints.getComment}/${this.componentComment.id}`
        )
        this.componentComment = Object.assign({}, resp.data)
      }
    },
    newComment (event) {
      let newComments
      if (this.componentComment.comments.comments) {
        newComments = [event, ...this.componentComment.comments.comments]
      } else {
        newComments = [event]
      }

      this.componentComment = Object.assign({}, this.componentComment, {
        comments: Object.assign(
          {},
          this.componentComment.comments,
          {
            comments: newComments
          },
          {
            count: (this.componentComment.comments.count += 1)
          }
        )
      })
    },
    likeChange (event) {
      this.componentComment.likes = event
    }
  }
}
</script>

<style>
</style>
