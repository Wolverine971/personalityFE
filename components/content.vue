<template>
  <v-card :id="content.id" @mouseover="showCookies = true">
    <p>{{ getTime(content.dateCreated) }}</p>
    <v-card-title>
      <img
        v-if="content.img"
        :src="`https://personality-app.s3.amazonaws.com/${content.img}`"
        class="pic-box pic-display"
        :style="{ width: picWidth - 30 + 'px' }"
      >
      <cookie-comment
        class="ml-3"
        :text="content.text"
        :likes="content.likes.length"
        :parent-id="content.id"
        :author-id="content.authorId"
        :show-cookies="showCookies"
      />
    </v-card-title>

    <interact
      v-if="interact"
      :post="content"
      :type="'content'"
      @emitComment="newComment($event)"
      @likeChange="likeChange"
    />

    <div class="comment-div">
      <v-expansion-panels v-if="content.comments && content.comments.count">
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ content.comments.count }} Comments
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <comments
              v-if="content.comments.comments"
              :comments="content.comments"
              :parent-id="content.id"
              :display-count="false"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-card>
</template>

<script>
import { msToDate } from '../utils'
export default {
  name: 'Content',
  components: {
    comments: () => import('./questions/comments'),
    Interact: () => import('./shared/interact')
  },
  props: {
    content: {
      type: Object,
      required: true,
      default: null
    },

    interact: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      showCookies: false,
      picWidth: 0
    }
  },
  mounted () {
    const box = document.getElementById('c-box')
    this.picWidth = box.clientWidth
  },
  methods: {
    newComment (event) {
      let newComments
      if (this.content.comments.comments) {
        newComments = [event, ...this.content.comments.comments]
      } else {
        newComments = [event]
      }

      this.content.comments = Object.assign({}, this.content.comments, {
        comments: newComments
      })
      this.content.comments.count += 1
    },
    likeChange (event) {
      this.content.likes = event
    },
    getTime (time) {
      return msToDate(time)
    }
  }
}
</script>

<style>
.pic-display {
  max-width: 1000px;
}
.pic-box {
  display: flex;
  justify-content: center;
}
</style>
