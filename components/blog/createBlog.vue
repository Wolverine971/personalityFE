/* eslint-disable no-undef */
<template>
  <div class="col-md-12 form-wrapper">
    <h2 class="secondary--text">
      Create Blog Post
    </h2>
    <v-text-field
      v-model="title"
      label="Title"
      type="text"
      name="title"
      required
      placeholder="Enter title"
    />
    <v-text-field
      v-model="description"
      label="Description"
      type="text"
      name="Description"
      required
      placeholder="Enter Description"
    />
    <v-text-field v-model="size" label="Size" type="number" />
    <feed-card
      v-if="imgSrc"
      :preview="true"
      :value="{
        img: imgSrc,
        body: markedContent,
        title,
        description,
        preview: markedContent.slice(0, 50),
        dateCreated: new Date(),
        size: parseInt(size)
      }"
    />
    <image-upload
      :parent-width="picWidth"
      class="margin-bot"
      @image="imgSrc = $event"
    />
    <div class="row">
      <div id="c-box" style="width: 45%">
        <v-textarea
          v-model="blog"
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
        Create Post
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

  middleware: ['accessToken', 'isAdmin'],
  data () {
    return {
      title: '',
      description: '',
      body: '',
      blog: '',
      markedContent: '',
      imgSrc: '',
      picWidth: 0,
      size: 2
    }
  },
  watch: {
    blog (val) {
      // eslint-disable-next-line no-undef
      const firstPass = marked(val)
      this.markedContent = this.addStyles(firstPass)
    }
  },
  mounted () {
    const box = document.getElementById('c-box')
    this.picWidth = box.clientWidth
  },

  methods: {
    createPost () {
      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('body', this.markedContent)
      formData.append('size', parseInt(this.size))

      if (this.imgSrc) {
        const fileElem = document.getElementById('fileElem')
        formData.append('img', fileElem.files[0])
      }
      formData.append('enneagramType', this.selectedType)

      this.$axios.post(endpoints.createBlog, formData).then(() => {
        this.$store.dispatch('toastSuccess', 'Blog Created')
      })
    },
    addStyles (html) {
      const h1Filter = html.replace('<h1', '<h1 class="primary_v--text"')
      const h2Filter = h1Filter.replace('<h2', '<h2 class="secondary--text"')
      const h3Filter = h2Filter.replace('<h3', '<h3 class="primary_v--text"')
      const h4Filter = h3Filter.replace('<h4', '<h4 class="secondary--text"')
      const h5Filter = h4Filter.replace('<h5', '<h5 class="primary_v--text"')

      return h5Filter
    }
  },
  head () {
    return {
      title: 'Bloggy Blog',
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js'
        }
      ]
    }
  }
}
</script>
