<template>
  <div v-if="displayedComments && displayedComments.comments && displayedComments.comments.length">
    <h5 v-if="displayedComments && displayCount" class="primary_v--text">
      Total Comments: {{ displayedComments.count }}
    </h5>
    <div
      v-for="(c, i) in displayedComments.comments"
      :key="i"
      class="comment-div margin-top"
    >
      <comment :comment="c" :interact="true" @commentUpdated="$emit('commentUpdated', {index: i, comment: $event})" />
    </div>
    <div
      v-if="
        displayedComments.comments.length < displayedComments.count &&
          !commentsLoading
      "
      class="margin-top row"
      @click="loadMore"
    >
      <v-btn outlined>
        Load More
      </v-btn>
    </div>
    <v-progress-linear v-else-if="commentsLoading" indeterminate />
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'AllComments',
  components: { Comment: () => import('./comment') },
  props: {
    comments: {
      type: Object,
      required: true,
      default: null
    },
    parentId: {
      type: String,
      required: true,
      default: null
    },
    displayCount: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data: () => ({
    commentCursorId: null,
    displayedComments: null,
    commentsLoading: false,
    lastDate: null
  }),
  watch: {
    comments (vals) {
      this.parseContent(vals)
    }
  },
  mounted () {
    this.parseContent(this.comments)
  },
  methods: {
    parseContent (vals) {
      this.displayedComments = vals
      if (vals.comments && vals.comments.length) {
        this.lastDate = vals.comments[vals.comments.length - 1].dateCreated
      }
      this.displayedComments.count = vals.count
    },
    loadMore () {
      this.contentLoading = true
      return this.$axios
        .get(`${endpoints.loadMoreContent}/${this.parentId}/${this.lastDate}`)
        .then((resp) => {
          if (resp && resp.data) {
            const newComments = [
              ...this.displayedComments.comments,
              ...resp.data.comments
            ]
            const replaceComments = Object.assign({}, this.displayedComments, {
              comments: newComments
            })
            this.parseContent(replaceComments)
          }
        })
    },
    async checkComments (comment) {
      if (!comment.comments) {
        const resp = await this.$axios.get(
          `${endpoints.getComment}/${comment.id}`
        )
        this.displayedComments = Object.assign({}, resp.data)
      }
    }
  }
}
</script>

<style></style>
