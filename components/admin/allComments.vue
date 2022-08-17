<template>
  <div class="m-col">
    <!-- <h2>Total Comments: {{ totalComments }} </h2> -->
    <div class="margin-bot" style="padding: 10px">
      <!-- <sort
        :type="'comments'"
        @triggerNewSearch="filterComments($event)"
      /> -->

      <v-card class="margin-top">
        <v-card-title class="primary_v--text">
          Total Comments: {{ totalComments }}
        </v-card-title>
        <v-card-text>
          <sort :type="'comments'" @triggerNewSearch="filterComments($event)" />
        </v-card-text>
      </v-card>

      <v-expansion-panels>
        <v-expansion-panel v-for="comment in allComments" :key="comment.id">
          <v-expansion-panel-header>
            {{ comment.comment }}?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
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
            <v-btn small outlined>
              <v-icon> mdi-cookie-outline </v-icon>
              {{ comment.likes.length }}
            </v-btn>
            <v-btn small outlined>
              <v-icon> mdi-comment-outline </v-icon>
              {{ comment.comments.count }}
            </v-btn>
            <v-btn
              v-if="admin"
              outlined
              small
              color="red"
              @click="deleteComment(comment)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <div
        v-if="commentsCount < totalComments && !commentsLoading"
        class="row"
        @click="loadMoreComments"
      >
        <v-btn outlined color="secondary">
          Load More
        </v-btn>
      </div>
      <v-progress-linear v-else-if="commentsLoading" indeterminate />
    </div>
  </div>
</template>

<script>
import { msToTime } from '../../utils'
import { endpoints } from '../../models/endpoints'
export default {
  name: 'AllComments',
  components: {
    Sort: () => import('~/components/questions/sort.vue')
  },
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
      cursorId: null,
      params: {
        enneagramTypes: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          'Unknown',
          'Rando'
        ],
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
    },
    user () {
      return this.$store.getters.getUser
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
    this.$store.dispatch('getSortedPaginatedComments')
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
      if (this.user) {
        this.params = event
        this.$store.dispatch('getSortedPaginatedComments', event)
      }
    }
  }
}
</script>

<style>
</style>
