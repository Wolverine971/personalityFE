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
        :author="componentComment.author.id"
        @commentUpdated="$emit('commentUpdated', $event)"
      />
    </v-card-title>
    <interact
      v-if="interact"
      :post="componentComment"
      :type="'comment'"
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
          <comments
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
export default {
  name: 'Comment',
  components: {
    Interact: () => import('../shared/interact'),
    CookieComment: () => import('../shared/cookieComment'),
    comments: () => import('./comments.vue')
  },
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
      if (resp && resp.data) {
        this.componentComment = Object.assign({}, resp.data)
      } else {
        this.$store.dispatch('toastError', 'Must Login to See Comments', 6000)
      }
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
