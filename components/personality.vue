<template>
  <div>
    {{ selectedType }}

    <v-card>
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
        <v-card-title v-if="item.img" class="pic-box">
          <img
            :src="`https://personality-app.s3.amazonaws.com/${item.img}`"
            class="pic-display"
          >
        </v-card-title>
        <v-card-text v-if="item.text">
          <p class="user-comment">
            {{ item.text }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn> Comment </v-btn>
        </v-card-actions>
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
        paramName: 'file',
        acceptedFiles: {
          extensions: ['image/*'],
          message: 'You are uploading an invalid file'
        }
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
      const post = this.newPost
      formData.append('text', post)
      formData.append('img', this.src)
      // this.$axios.setHeader('Content-Type', 'multipart/form-data', ['post'])

      await this.$axios.post(`${endpoints.postContent}/${this.type}`, formData)

      this.$store.dispatch('toastSuccess', 'Post Submitted')
      this.$store.dispatch('getPosts', this.selectedType)
    },

    uploadImage () {
      this.imgLoading = true

      const fileElem = document.getElementById('fileElem')
      if (fileElem && fileElem.files) {
        const width = 500
        const height = 300
        // const fileName = fileElem.files[0].name
        const reader = new FileReader()
        reader.readAsDataURL(fileElem.files[0])
        reader.onload = (event) => {
          const img = new Image()
          img.src = event.target.result
          // this.src = fileElem.files[0]
          this.showElem = event.target.result
          img.onload = () => {
            // const elem = document.get('canvas')
            // const elem = document.createElement('canvas')
            const elem = document.getElementById('c')
            elem.width = width
            elem.height = height
            const ctx = elem.getContext('2d')
            // img.width and img.height will contain the original dimensions
            ctx.drawImage(img, 0, 0, width, height)
            // ctx.canvas.toBlob(
            //   (blob) => {
            //     const file = new File([blob], fileName, {
            //       type: 'image/jpeg',
            //       lastModified: Date.now()
            //     })
            //   },
            //   'image/jpeg',
            //   1
            // )
            // const dataURL = elem.toDataURL('image/jpeg', 0.7) // or canvas.toDataURL('image/png');
            // this.src = dataURL
            this.src = fileElem.files[0]
            // toDataURL("image/jpeg",0.7);
            this.imgLoading = false
          }
          reader.onerror = error => console.log(error)
        }
      }
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
