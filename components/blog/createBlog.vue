/* eslint-disable no-undef */
<template>
  <div class="col-md-12 form-wrapper">
    <h2 class="secondary--text">
      {{ label }}
    </h2>
    <v-text-field
      v-model="createdBlog.title"
      label="Title"
      type="text"
      name="title"
      required
      placeholder="Enter title"
    />
    <v-text-field
      v-model="createdBlog.description"
      label="Description"
      type="text"
      name="Description"
      required
      placeholder="Enter Description"
    />
    <v-text-field v-model="createdBlog.size" label="Size" type="number" />
    <feed-card
      v-if="createdBlog.img"
      :blog="{
        img: createdBlog.img,
        body: markedContent,
        title: createdBlog.title,
        description: createdBlog.description,
        dateCreated: new Date(),
        size: parseInt(createdBlog.size),
      }"
    />
    <image-upload
      :parent-width="picWidth"
      class="margin-bot"
      @image="createdBlog.img = $event"
    />
    <!-- preview = true -->
    <div class="row">
      <div id="c-box" style="width: 45%">
        <v-textarea
          v-model="createdBlog.body"
          type="text"
          placeholder="Blog it"
          outlined
          rows="10"
          auto-grow
          dense
          hide-details
          label="Write it"
          counter
        />
      </div>
      <div style="width: 45%">
        <v-textarea
          style="display: block"
          rows="10"
          placeholder="What it looks like"
          type="html"
          auto-grow
          outlined
          dense
          hide-details
          label="What it looks like"
          v-html="markedContent"
        />
      </div>
    </div>
    <div class="form-group col-md-4 pull-right">
      <v-btn class="btn btn-success" @click="createPost">
        Save
      </v-btn>
    </div>
  </div>
</template>

<script>
import { endpoints } from '~/models/endpoints'
export default {
  name: 'CreateBlog',
  components: {
    ImageUpload: () => import('../shared/imageUpload.vue'),
    FeedCard: () => import('./FeedCard.vue')
  },
  props: {
    blog: {
      type: Object,
      default: () => ({})
    },
    label: {
      type: String,
      default: 'Create Blog'
    },
    preview: {
      type: Boolean,
      default: true
    }
  },

  middleware: ['accessToken', 'isAdmin'],
  data () {
    return {
      createdBlog: '',
      markedContent: '',
      picWidth: 0
    }
  },
  watch: {
    'createdBlog.body' (val) {
      // eslint-disable-next-line no-undef
      const firstPass = marked(val)
      this.markedContent = this.addStyles(firstPass)
    },
    blog (val) {
      // debugger
      this.createdBlog = val
    }
  },
  mounted () {
    this.createdBlog = this.blog
    const box = document.getElementById('c-box')
    this.picWidth = box.clientWidth
  },

  methods: {
    createPost () {
      const formData = new FormData()
      formData.append('title', this.createdBlog.title)
      formData.append('description', this.createdBlog.description)
      formData.append('body', this.createdBlog.body)
      formData.append('size', parseInt(this.createdBlog.size))

      if (this.createdBlog.img) {
        const fileElem = document.getElementById('fileElem')
        formData.append('img', fileElem.files[0] ? fileElem.files[0] : this.createdBlog.img)
      }
      if (this.createdBlog.id) {
        this.$axios
          .post(`${endpoints.updateBlog}/${this.createdBlog.id}`, formData)
          .then(() => {
            this.$router.push({
              path: `/blog/${this.createdBlog.title}`
            })
            this.$store.dispatch('toastSuccess', 'Blog Updated')
            this.$emit('updated', this.createdBlog)
          })
      } else {
        this.$axios.post(endpoints.createBlog, formData).then(() => {
          this.$router.push({
            path: '/blog/'
          })
          this.$store.dispatch('toastSuccess', 'Blog Created')
        })
      }
    },
    addStyles (html) {
      const h1Filter = html.replace('<h1', '<h1 class="primary_v--text"')
      const h2Filter = h1Filter.replace('<h2', '<h2 class="secondary--text"')
      const h3Filter = h2Filter.replace('<h3', '<h3 class="primary_v--text"')
      const h4Filter = h3Filter.replace('<h4', '<h4 class="secondary--text"')
      const h5Filter = h4Filter.replace('<h5', '<h5 class="primary_v--text"')

      return h5Filter
    }
  }
}
</script>
