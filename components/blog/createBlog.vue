/* eslint-disable no-undef */
<template>
  <div class="col-md-12 form-wrapper">
    <h2>Create Blog Post</h2>
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
// import axios from 'axios'
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
      this.markedContent = marked(val)
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

      this.$axios.post(endpoints.createBlog, formData).then((data) => {
        alert('success' + data)
      })
    },
    _submitToServer (data) {
      this.$axios.post(endpoints.createBlog, data).then((data) => {
        // router.push({ name: 'home' })
        alert('success' + data)
      })
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
