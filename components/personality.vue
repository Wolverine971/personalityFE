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
    <h3 v-if="count">
      {{ "Total Posts " + count }}
    </h3>
    <h3 v-else>
      {{ $auth.user ? "Total Posts 0" : "No Content For You!" }}
    </h3>
    <v-col>
      <v-card>
        <div v-for="(item, i) in selectedPosts" :key="i">
          <Content
            :content="item"
            :interact="interact"
          />
        </div>
      </v-card>
      <v-row v-if="currentCount < count && !contentLoading" @click="loadMore">
        <v-btn>Load More</v-btn>
      </v-row>
      <v-progress-linear v-else-if="contentLoading" indeterminate />
    </v-col>
  </div>
</template>

<script>
import { endpoints } from '../models/endpoints'
export default {
  name: 'Personality',
  components: { Heartbeat: () => import('./shared/heart'), Content: () => import('./content.vue') },
  middleware: ['accessToken'],
  data () {
    return {
      selectedType: null,
      newPost: '',
      src: null,
      imgLoading: false,
      tab: 'null',
      selectedPosts: [],
      showElem: false,
      picWidth: 0,
      interact: false,
      count: 0,
      lastDate: '',
      contentLoading: false,
      currentCount: 0
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
        if (vals[this.type]) {
          this.parseContent(vals[this.type].content)
          this.count = vals[this.type].count
        } else {
          this.selectedPosts = []
          this.count = 0
        }
      } else {
        this.selectedPosts = []
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.contentLoading = true
      this.selectedType = this.$route.params.type
      if (!this.posts || !this.posts[this.selectedType]) {
        const success = await this.$store.dispatch('getPosts', this.selectedType)
        if (!success) {
          this.contentLoading = false
        }
      } else {
        this.parseContent(this.posts[this.selectedType].content)
        // this.selectedPosts = this.posts[this.selectedType].content
        // this.lastDate = this.selectedPosts[this.selectedPosts.length - 1].dateCreated
        this.count = this.posts[this.selectedType].count
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
        this.selectedPosts = [resp.data, ...this.selectedPosts]
        this.count += 1
        this.currentCount += 1
        this.$store.commit('setPosts', {
          [this.selectedType]: {
            content: this.selectedPosts,
            count: this.count
          }
        })
        this.newPost = ''
        this.showElem = false
        this.src = null

        this.$store.dispatch('toastSuccess', 'Post Submitted')
      } else {
        this.$store.dispatch('toastError', 'Post Submit Fail')
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
      this.interact = !!(
        this.$auth.user && this.selectedType === this.$auth.user.enneagramId
      )
    },
    loadMore () {
      this.contentLoading = true
      return this.$axios
        .get(`${endpoints.getPosts}/${this.selectedType}/${this.lastDate || ''}`)
        .then((resp) => {
          if (resp && resp.data) {
            const content = [...this.selectedPosts, ...resp.data.content]
            this.$store.commit('setPosts', {
              [this.selectedType]: {
                content,
                count: this.count
              }
            })
          }
        })
    },
    parseContent (content) {
      if (content && content.length) {
        this.lastDate = content[content.length - 1].dateCreated
        this.selectedPosts = [...content]
      } else {
        this.lastDate = null
        this.selectedPosts = []
      }
      this.currentCount += content.length
      this.contentLoading = false
    }
  }
}
</script>

<style>
.brick-background {
  background: url('https://api.iconify.design/bi:bricks.svg?color=pink&height=47');
}
</style>
