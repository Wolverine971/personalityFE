<template>
  <div id="c-box">
    <h1 class="brick-background">
      &nbsp;&nbsp;{{ selectedType }} Wall
    </h1>
    <v-card v-if="interact">
      <v-card-title v-if="showElem">
        <img id="img" :src="src" alt="">
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
      <div v-for="(item, i) in selectedPosts" :key="i">
        <Content :content="item" :selected-type="selectedType" :interact="interact" />
      </div>
    </v-card>
  </div>
</template>

<script>
import { endpoints } from '../models/endpoints'
import Content from './content.vue'
import Heartbeat from './shared/heart'
export default {
  name: 'Personality',
  components: { Heartbeat, Content },
  middleware: ['accessToken'],
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
      showElem: false,
      picWidth: 0,
      interact: false
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
      if (!this.posts[this.selectedType]) {
        this.$store.dispatch('getPosts', this.selectedType)
      }
      this.canInteract()
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
    this.init()
  },
  methods: {
    init () {
      this.selectedType = this.$route.params.type
      if (!this.posts || !this.posts[this.selectedType]) {
        this.$store.dispatch('getPosts', this.selectedType)
      } else {
        this.selectedPosts = this.posts[this.selectedType]
      }
      const box = document.getElementById('c-box')
      this.picWidth = box.clientWidth
      this.canInteract()
    },
    async submitPost () {
      const formData = new FormData()
      if (this.newPost) {
        formData.append('text', this.newPost)
      }
      if (this.src) {
        const fileElem = document.getElementById('fileElem')
        formData.append('img', fileElem.files[0])
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
        const reader = new FileReader()
        reader.readAsDataURL(fileElem.files[0])
        this.showElem = true
        reader.onload = (event) => {
          this.src = event.target.result
          this.imgLoading = false
          const img = document.getElementById('img')
          img.width = this.picWidth - 30
        }
        reader.onerror = error => console.log(error)
      }
    },

    canInteract () {
      this.interact = !!((this.$auth.user && this.selectedType === this.$auth.user.enneagramId))
    }
  }
}
</script>

<style>

.brick-background {
  background: url('https://api.iconify.design/bi:bricks.svg?color=pink&height=47');
}
</style>
