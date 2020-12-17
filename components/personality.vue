<template>
  <div>
    {{ selectedType }}

    <v-card v-if="selectedType === $auth.user.enneagramId">
      <v-card-title v-if="showElem">
        <canvas id="c" />
      </v-card-title>
      <v-card-text>
        <heartbeat v-if="imgLoading" class="heart" />

        <input
          id="fileElem"
          ref="fileElem"
          type="file"
          multiple
          accept="image/*"
          style="display: none"
          @change="uploadImage($event)"
        >
        <v-textarea
          v-model="newPost"
          type="text"
          placeholder="Post somefin"
          outlined
          rows="1"
          auto-grow
          dense
          hide-details
          class="user-comment"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!newPost && !showElem" @click="submitPost">
          Post
        </v-btn>
        <v-btn @click="$refs.fileElem.click()">
          {{ showElem ? 'Re-Upload File' : 'Upload File' }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-tabs v-model="tab">
      <v-tab>Feed</v-tab>
      <v-tab>Images</v-tab>
      <v-tab>Text</v-tab>
    </v-tabs>
    <v-card>
      <v-card v-for="(item, i) in selectedPosts" :key="i">
        <v-card-title>
          <img
            v-if="item.img"
            :src="`https://personality-app.s3.amazonaws.com/${item.img}`"
            class="pic-box pic-display"
          >

          <p v-if="item.text" class="user-comment">
            {{ item.text }}
          </p>
        </v-card-title>

        <interact
          v-if="selectedType === $auth.user.enneagramId"
          :post="item"
          @emitComment="newComment($event)"
        />

        <div class="comment-div">
          <v-expansion-panels v-if="item.comments && item.comments.length">
            <v-expansion-panel>
              <v-expansion-panel-header>
                {{ item.comments.length }} Comments
              </v-expansion-panel-header>
              <v-expansion-panel-content
                v-for="(c, j) in item.comments"
                :key="j"
              >
                <comment :comment="c" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { endpoints } from '../models/endpoints'
import Heartbeat from './shared/heart'
export default {
  name: 'Personality',
  components: { Heartbeat },
  data () {
    return {
      selectedType: null,
      props: {
        files: [
          {
            name: 'test',
            status: false
          }
        ]
      },
      options: {
        url: '/upload',
        paramName: 'file'
      },
      newPost: '',
      src: null,
      imgLoading: false,
      tab: 'null',
      selectedPosts: [],
      showElem: false
    }
  },
  computed: {
    type () {
      return this.$route.params.type
    },
    posts () {
      return this.$store.getters.getPosts
    }
  },
  watch: {
    type (val) {
      this.selectedType = val
    },
    tab (val) {
      console.log(val)
    },
    posts (vals) {
      if (vals) {
        this.selectedPosts = vals[this.type]
      } else {
        this.selectedPosts = []
      }
    }
  },
  mounted () {
    this.selectedType = this.$route.params.type
    if (!this.posts) {
      this.$store.dispatch('getPosts', this.selectedType)
    }
  },
  methods: {
    async submitPost () {
      const formData = new FormData()
      if (this.newPost) {
        formData.append('text', this.newPost)
      }
      if (this.src) {
        formData.append('img', this.src)
      }
      formData.append('enneagramType', this.selectedType)

      const resp = await this.$axios.post(
        `${endpoints.postContent}/${this.type}`,
        formData
      )
      if (resp && resp.data) {
        this.$store.commit('setPosts', {
          type: this.selectedType,
          data: resp.data
        })
        this.newPost = ''
        this.showElem = false
        this.src = null

        this.$store.dispatch('toastSuccess', 'Post Submitted')
      }
    },

    uploadImage () {
      this.imgLoading = true

      const fileElem = document.getElementById('fileElem')
      if (fileElem && fileElem.files) {
        const width = 500
        const height = 300
        const reader = new FileReader()
        reader.readAsDataURL(fileElem.files[0])
        reader.onload = (event) => {
          const img = new Image()
          img.src = event.target.result
          this.showElem = event.target.result
          img.onload = () => {
            const elem = document.getElementById('c')
            elem.width = width
            elem.height = height
            const ctx = elem.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            this.src = fileElem.files[0]
            this.imgLoading = false
          }
          reader.onerror = error => console.log(error)
        }
      }
    },

    newComment (event) {
      console.log(event)
    }
  }
}
</script>

<style>
.border {
  border: 1px solid blue;
}
.pic-display {
  max-width: 1000px;
}
.pic-box {
  display: flex;
  justify-content: center;
}
</style>
