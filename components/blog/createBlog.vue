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
    <div class="row">
      <div style="width: 45%">
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

  middleware: ['accessToken', 'isAdmin'],
  data () {
    return {
      title: '',
      description: '',
      body: '',
      blog: '',
      markedContent: ''
    }
  },
  watch: {
    blog (val) {
      // eslint-disable-next-line no-undef
      this.markedContent = marked(val)
    }
  },

  methods: {
    createPost () {
      const postData = {
        title: this.title,
        description: this.description,
        body: this.markedContent
      }
      this._submitToServer(postData)
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
