<template>
  <div v-if="blog" class="blogDiv">
    <h3 class="title font-weight-bold mb-2 primary_v--text">
      {{ blog.title }}
    </h3>
    <div class="caption">
      Author:
      {{
        blog.author ? blog.author.firstName + ' ' + blog.author.lastName : ''
      }}
      <br>
      Date: {{ getTime(blog.dateCreated) }}
    </div>
    <div v-html="blog.body" />
    <a
      id="b"
      :href="`https://twitter.com/intent/tweet?original_referer=${url}blog/${$route.params.title}&amp;ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&amp;text=Checkout this article entitled '${blog.title}'&amp;url=${url}blog/${$route.params.title}`"
      class="twitter twitter-share-button"
    ><i /><span id="l" class="label">Tweet</span></a>

    <v-img
      :src="blog.img"
      height="100%"
      gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
    />
  </div>
</template>

<script>
import { msToDate } from '../../utils'
export default {
  name: 'Blog',
  props: {
    blog: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      url: ''
    }
  },
  mounted () {
    this.url = this.$axios.defaults.headers['Access-Control-Allow-Origin'][0]
    // console.log(env)
  },
  methods: {
    getTime (time) {
      return msToDate(time)
    }
  }
}
</script>

<style lang="scss">
.v-image__image {
  transition: 0.3s linear;
}
@media (min-width: 960px) {
  .blogDiv {
    margin: 0 20%;
  }
}
</style>
