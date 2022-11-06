<template>
  <div>
    <v-row style="justify-content: center" v-if="blogs.length">
      <feed-card
        v-for="(blog, index) in blogs"
        :key="blog.title + index"
        :blog="blog"
      />
    </v-row>
    <v-row v-else-if="loading">
      <h1>Loading...</h1>
    </v-row>
    <v-row v-else>
      <h1>No blogs at this time</h1>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Feed',

  components: {
    FeedCard: () => import('@/components/blog/FeedCard'),
  },
  props: {
    blogs: {
      type: Array,
      default: () => [],
    },
    count: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    layout: [
      4,
      3,
      2,
      4,
      2,
      3,
      3,
      4,
      3,
      2,
      3,
      4,
      2,
      3,
      2,
      4,
      2,
      3,
      3,
      2,
      4,
      2,
      3,
      3,
      4,
      3,
      2,
    ],
    loading: false,
  }),
}
</script>
