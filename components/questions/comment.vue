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
      <p :id="componentComment.id" class="ml-3">
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
    componentComment: null,
    commentIsExpanded: false,
    panels: []
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
