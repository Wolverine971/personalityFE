<template>
  <div v-if="componentComment" :id="componentComment.id" :class="'shadow'" @mouseover="showCookies = true">
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
        class="ml-3"
        :text="componentComment.comment"
        :likes="componentComment.likes.length"
        :parent-id="componentComment.id"
        :show-cookies="showCookies"
      />
    </v-card-title>
    <interact v-if="interact" :post="componentComment" @emitComment="newComment($event)" @likeChange="likeChange" />

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
          <comment :comment="c" :interact="true" />
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
  components: { Interact, CookieComment },
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
  computed: {},
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
    },
    likeChange (event) {
      this.componentComment.likes = event
    }
  }
}
</script>

<style>

.comment-div {
  margin: 0 0 10px 10px;
}
</style>
