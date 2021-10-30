<template>
  <div>
    <v-card v-if="interact">
      <v-card-title v-if="src">
        <img id="img" :src="src" alt="">
      </v-card-title>
      <v-card-text>
        <v-textarea
          v-model="newPost"
          type="text"
          placeholder="Post something"
          outlined
          rows="1"
          auto-grow
          dense
          hide-details
          maxlength="500"
          counter
        />
      </v-card-text>
      <v-card-actions>
        <v-btn outlined :disabled="!newPost && !showElem" @click="submitPost">
          Post
        </v-btn>
        <image-upload :parent-width="picWidth" @image="src=$event, showElem=true" />
      </v-card-actions>
    </v-card>
    <v-tabs v-model="tab">
      <v-tab>Feed</v-tab>
      <v-tab>Images</v-tab>
      <v-tab>Text</v-tab>
    </v-tabs>
    <h3 class="primary_v--text">
      {{ "Total Posts " + count }}
    </h3>
    <div class="m-col">
      <v-card id="c-box">
        <div v-for="(item, i) in selectedPosts" :key="i">
          <Content
            :content="item"
            :interact="interact"
          />
        </div>
      </v-card>
      <div v-if="currentCount < count && !contentLoading" class="row" @click="loadMore">
        <v-btn outlined color="secondary">
          Load More
        </v-btn>
      </div>
      <v-progress-linear v-else-if="contentLoading" indeterminate />
    </div>
  </div>
</template>

<script>
import { endpoints } from '../models/endpoints'
export default {
  name: 'Personality',
  components: { Content: () => import('./content.vue'), ImageUpload: () => import('./shared/imageUpload.vue') },
  props: {
    type: {
      type: Number,
      default: 0,
      required: true
    }
  },
  middleware: ['accessToken'],
  data () {
    return {
      selectedType: null,
      newPost: '',
      src: null,
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
    posts () {
      return this.$store.getters.getPosts
    },
    user () {
      return this.$store.getters.getUser
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
      this.selectedType = this.type.toString()
      if (!this.posts || !this.posts[this.selectedType]) {
        const success = await this.$store.dispatch('getPosts', this.selectedType)
        if (!success) {
          this.contentLoading = false
        }
      } else {
        this.parseContent(this.posts[this.selectedType].content)
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

    canInteract () {
      if (this.user) {
        this.interact = !!(
          this.user && this.selectedType === this.user.enneagramId
        )
      } else {
        this.interact = false
      }
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
</style>
