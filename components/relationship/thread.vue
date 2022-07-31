<template>
  <div>
    <v-card
      v-if="thread"
      :id="thread.id"
      :class="'shadow'"
      @mouseover="showCookies = true"
    >
      <v-card-title>
        <v-avatar
          elevation="2"
          outlined
          raised
          large
          :class="thread.author ? 'class' + thread.author.enneagramId : ''"
          color="offWhite"
        >
          {{ thread.author ? thread.author.enneagramId : 0 }}
        </v-avatar>
        <cookie-comment
          :text="thread.text"
          :likes="thread.likes.length"
          :parent-id="thread.id"
          :show-cookies="showCookies"
          :author="thread.author.id"
          @commentUpdated="$emit('threadUpdated', $event)"
        />
      </v-card-title>
      <interact
        :post="thread"
        :type="'relationship'"
        @emitComment="newComment($event)"
        @likeChange="likeChange"
      />

      <v-expansion-panels v-if="thread.comments.count" v-model="panels" popout>
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ thread.comments.count }} Comments
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <comments
              :comments="thread.comments"
              :parent-id="thread.id"
              @commentUpdated="updateComment"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>
<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'Thread',
  components: {
    Interact: () => import('../shared/interact'),
    Comments: () => import('../questions/comments'),
    CookieComment: () => import('../shared/cookieComment.vue'),
  },
  props: {
    thread: {
      type: Object,
      default() {
        return {}
      },
      required: false,
    },
    index: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  data: () => ({
    panels: [],
    showCookies: false,
  }),
  methods: {
    newComment(event) {
      let newComments
      if (this.thread.comments.comments) {
        newComments = [event, ...this.thread.comments.comments]
      } else {
        newComments = [event]
      }

      this.thread.comments = Object.assign({}, this.thread.comments, {
        comments: newComments,
      })
      this.thread.comments.count += 1
    },
    async updateComment(event) {
      const selectedComment = this.thread.comments.comments[event.index]
      const resp = await this.$axios.post(
        `${endpoints.updateComment}/${selectedComment.id}`,
        {
          comment: event.comment,
        }
      )
      if (resp && resp.data) {
        this.thread.comments.comments[event.index].comment = event.comment
        this.$store.dispatch('toastSuccess', 'Updated Comment')
      } else {
        this.$store.dispatch('toastError', 'Update Comment Failure')
      }
    },
    likeChange(event) {
      this.thread.likes = event
    },
  },
}
</script>

<style>
</style>
