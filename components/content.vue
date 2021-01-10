<template>
  <v-card :id="content.id" @mouseover="showCookies = true">
    <v-card-title>
      <img
        v-if="content.img"
        :src="`https://personality-app.s3.amazonaws.com/${content.img}`"
        class="pic-box pic-display"
        :style="{ width: picWidth - 30 + 'px' }"
      >

      <p v-if="content.text">
        {{ content.text }}
      </p>
      <cookie-comment
        class="ml-3"
        :text="content.text"
        :likes="content.likes.length"
        :parent-id="content.id"
        :show-cookies="showCookies"
      />
    </v-card-title>

    <interact
      v-if="interact"
      :post="content"
      @emitComment="newComment($event)"
      @likeChange="likeChange"
    />

    <div class="comment-div">
      <v-expansion-panels v-if="content.comments && content.comments.length">
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ content.comments.length }} Comments
          </v-expansion-panel-header>
          <v-expansion-panel-content
            v-for="(c, j) in content.comments"
            :key="j"
          >
            <comment :comment="c" :interact="interact" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'Content',
  props: {
    content: {
      type: Object,
      required: true,
      default: null
    },
    selectedType: {
      type: String,
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
      this.content.comments = this.content.comments
        ? [event, ...this.content.comments]
        : [event]
    },
    likeChange (event) {
      this.content.likes = event
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
