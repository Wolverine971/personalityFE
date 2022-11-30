<template>
  <client-only>
    <feed :blogs="articles" :count="count" />
  </client-only>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'All',
  components: {
    Feed: () => import('../../components/blog/Feed.vue'),
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
    } else {
      articles = store.getters.blogs
      count = store.getters.blogs.length
    }
    return {
      articles,
      count,
    }
  },
  computed: {
    blogs() {
      return this.$store.getters.blogs
    },
  },

  head() {
    const title = '9takes Blog'
    const description = 'Blog for Enneagram people'
    const href = 'https://9takes.com/blog'

    return {
      titleTemplate: title,
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          property: 'og:url',
          content: href,
        },
        {
          property: 'og:description',
          content: description,
        },
        { property: 'og:title', content: title },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:site',
          content: '@9takesdotcom',
        },
      ],
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true,
        },
      ],
      link: [{ rel: 'canonical', href }],
    }
  },
}
</script>

<style></style>
