<template>
  <div class="m-col">
    Total Comments: {{ totalComments }}
    <sort
      :type="'comments'"
      :selectable-types="enneagramTypes"
      @triggerNewSearch="filterComments($event)"
    />
    <v-card v-for="comment in allComments" :key="comment.id" class="margin-bot">
      <v-card-text
        class="pad-bot clickable"
      >
        <div class="row space-between">
          <div class="margin-left">
            {{ comment.comment }}?
          </div>
          <div>
            <v-btn v-if="admin" outlined small>
              Id: {{ comment.id }}
            </v-btn>
            <v-btn v-if="admin" outlined small>
              Author Enneagram: {{ comment.author.enneagramId }}
            </v-btn>
            <v-btn v-if="admin" outlined small>
              DateCreated: {{ getTime(comment.dateCreated) }}
            </v-btn>
            <v-btn v-if="admin" outlined small>
              Modified: {{ comment.modified }}
            </v-btn>
            <v-btn icon small>
              <v-icon> mdi-cookie-outline </v-icon>
              {{ comment.likes.length }}
            </v-btn>
            <v-btn icon small>
              <v-icon> mdi-comment-outline </v-icon>
              {{ comment.comments.count }}
            </v-btn>
            <v-btn
              v-if="admin"
              outlined
              icon
              small
              color="red"
              @click="deleteComment(q)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <div
      v-if="commentsCount < totalComments && !commentsLoading"
      class="row"
      @click="loadMoreComments"
    >
      <v-btn outlined>
        Load More
      </v-btn>
    </div>
    <v-progress-linear v-else-if="commentsLoading" indeterminate />
  </div>
</template>

<script>
import { msToTime } from '../../utils'
import { endpoints } from '../../models/endpoints'
export default {
  name: 'AllComments',
  props: {
    admin: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      allComments: [],
      pageSize: 10,
      commentsCount: 0,
      commentsLoading: false,
      key: -1,
      enneagramTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      cursorId: null,
      params: {
        enneagramTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        dateRange: '',
        sortBy: ''
      }
    }
  },
  computed: {
    comments () {
      return this.$store.getters.getAllComments
    },
    totalComments () {
      return this.$store.getters.getAllCommentsCount
    }
  },
  watch: {
    comments (comments) {
      this.parseComments(comments)
    },
    allComments (val) {
      this.commentsCount = val.length
    }
  },
  mounted () {
    if (!this.totalComments) {
      this.$store.dispatch('getSortedPaginatedComments', this.params)
    } else {
      const comments = this.$store.getters.getAllComments
      this.parseComments(comments)
    }
  },
  methods: {
    async loadMoreComments () {
      this.commentsLoading = true
      await this.$store.dispatch('getSortedPaginatedComments', this.params)
      this.commentsLoading = false
    },
    parseComments (comments) {
      this.allComments = [...comments]
    },
    getTime (time) {
      return msToTime(time)
    },
    async deleteComment (comment) {
      const resp = await this.$axios.post(`${endpoints.change}`, {
        type: 'comment',
        tag: comment.id
      })
      if (resp && resp.data) {
        this.allComments = this.allComments.filter(c => c.id !== comment.id)
      }
    },
    filterComments (event) {
      if (this.$auth.user) {
        this.params = event
        this.$store.dispatch('getSortedPaginatedComments', event)
      }
    }
  }
}
</script>

<style>
</style>
