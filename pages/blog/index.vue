<template>
  <feed :blogs="articles" :count="count"/>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'All',
  components: {
    Feed: () => import('../../components/blog/Feed.vue'),
  },
  computed: {
    blogs() {
      return this.$store.getters.blogs
    },
  },

  async asyncData({ $axios, store }) {
      let articles
      let count
      if (!store.getters.blogs || !store.getters.blogs.length) {
        const resp = await $axios.get(`${endpoints.getBlogs}/`)
        if (resp && resp.data) {
          articles = resp.data.blog
          count = resp.data.count
        }
      }else {
          articles = store.getters.blogs
          count = store.getters.blogs.length
        }
    return {
      articles,
      count,
    }
  },
  head() {
    return {
      title: 'Bloggy Blog',
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true,
        },
      ],
    }
  },
}
</script>

<style>
</style>
