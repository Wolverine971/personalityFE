<template>
  <v-row v-if="articles.length">
    <feed-card
      v-for="(article, index) in articles"
      :key="article.title + index"
      :blog="article"
    />
  </v-row>
  <v-row v-else>
    <h1>No blogs at this time</h1>
  </v-row>
</template>

<script>
import { endpoints } from '../../models/endpoints'

export default {
  name: 'Feed',

  components: {
    FeedCard: () => import('@/components/blog/FeedCard')
  },

  data: () => ({
    layout: [4, 3, 2, 4, 2, 3, 3, 4, 3, 2, 3, 4, 2, 3, 2, 4, 2, 3, 3, 2, 4, 2, 3, 3, 4, 3, 2],
    articles: [],
    count: 0
  }),

  computed: {
    blogs () {
      return this.$store.getters.blogs
    }
  },

  created () {
    if (!this.blogs) {
      this.$axios.get(`${endpoints.getBlogs}/`).then((data) => {
        if (data && data.data) {
          this.articles = data.data.blog
          this.count = data.data.count
        }
      })
    }
  }
}
</script>
