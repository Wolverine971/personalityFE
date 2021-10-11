<template>
  <div v-if="blog && !editing" class="blogDiv">
    <h3 class="title font-weight-bold mb-2 primary_v--text">
      {{ blog.title }}
      <v-btn
        v-if="user && blog && blog.author.id === user.id"
        color="secondary"
        elevation="1"
        fab
        small
        @click="editing = true"
      >
        <v-icon> edit </v-icon>
      </v-btn>
    </h3>
    <div class="caption">
      Author:
      {{
        blog.author ? blog.author.firstName + ' ' + blog.author.lastName : ''
      }}
      <br>
      Date: {{ getTime(blog.dateCreated) }}
    </div>
    <div v-html="blogContent" />
    <a
      id="b"
      :href="`https://twitter.com/intent/tweet?original_referer=${url}&amp;ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&amp;text=Checkout this article entitled '${blog.title}'&amp;url=${url}`"
      class="twitter twitter-share-button"
    ><i /><span id="l" class="label">Tweet</span></a>

    <v-img
      :src="blog.img"
      height="100%"
      gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
    />
  </div>
  <div v-else-if="blog" class="blogDiv">
    <div>
      <v-btn
        v-if="user && blog && blog.author.id === user.id"
        color="secondary"
        elevation="1"
        @click="editing = false"
      >
        Cancel
      </v-btn>
    </div>
    <create-blog :blog="blog" :label="'Edit Post'" @updated="editing = false" />
  </div>
</template>

<script>
import { msToDate } from '../../utils'
export default {
  name: 'Blog',
  components: {
    CreateBlog: () => import('./createBlog.vue')
  },
  props: {
    blog: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      url: '',
      editing: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    blogContent () {
      // eslint-disable-next-line no-undef
      return marked(this.blog.body)
    }
  },
  mounted () {
    this.url = `${this.$axios.defaults.headers['Access-Control-Allow-Origin'][0]}blog/${this.$route.params.title}`
    // console.log(env)
  },
  methods: {
    getTime (time) {
      return msToDate(time)
    }
  },
  head () {
    const title = this.blog ? this.blog.title : 'Blog'
    const description = this.blog ? this.blog.description : 'Personality Blog'
    const href = this.url ? this.url : ''

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          property: 'og:description',
          content: description
        },
        { property: 'og:title', content: title },
        {
          name: 'twitter:description',
          content: description
        },
        {
          name: 'twitter:title',
          content: title
        }
      ],
      link: [{ rel: 'canonical', href }]
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
