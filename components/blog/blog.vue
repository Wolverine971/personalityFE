<template>
  <div v-if="displayedBlog && !editing" class="blogDiv">
    <v-img
      :src="`https://personality-app.s3.amazonaws.com/${displayedBlog.img}`"
      height="450"
      gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
    />
    <h3 class="title font-weight-bold mb-2 primary_v--text">
      {{ displayedBlog.title }}
      <v-btn
        v-if="user && displayedBlog && displayedBlog.author.id === user.id"
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
        displayedBlog.author
          ? displayedBlog.author.firstName + ' ' + displayedBlog.author.lastName
          : ''
      }}
      <br>
      Date: {{ getTime(displayedBlog.dateCreated) }}
    </div>
    <div v-html="blogContent" />
    <interact
      v-if="user ? true : false"
      :post="displayedBlog"
      :type="'blog'"
      @emitComment="newComment($event)"
      @likeChange="likeChange"
    />

    <div class="comment-div">
      <v-expansion-panels
        v-if="displayedBlog.comments && displayedBlog.comments.count"
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ displayedBlog.comments.count }} Comments
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <comments
              v-if="displayedBlog.comments.comments"
              :comments="displayedBlog.comments"
              :parent-id="displayedBlog.id"
              :display-count="false"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <a
      id="b"
      :href="`https://twitter.com/intent/tweet?original_referer=${url}&amp;
      ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&amp;
      text=Checkout this article entitled '${displayedBlog.title}'&amp;url=${url}`"
      class="twitter twitter-share-button"
    ><i /><span id="l" class="label">Tweet</span></a>
  </div>
  <div v-else-if="displayedBlog" class="blogDiv">
    <div>
      <v-btn
        v-if="user && displayedBlog && displayedBlog.author.id === user.id"
        color="secondary"
        elevation="1"
        @click="editing = false"
      >
        Cancel
      </v-btn>
    </div>
    <create-blog
      :blog="displayedBlog"
      :label="'Edit Post'"
      @updated=";(displayedBlog = $event), (editing = false)"
    />
  </div>
</template>

<script>
import { msToDate } from '../../utils'
export default {
  name: 'Blog',
  components: {
    CreateBlog: () => import('./createBlog.vue'),
    comments: () => import('../questions/comments.vue')
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
      editing: false,
      displayedBlog: null
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    blogContent () {
      // eslint-disable-next-line no-undef
      return marked(this.displayedBlog.body)
    }
  },
  watch: {
    blog (val) {
      if (val) {
        this.displayedBlog = val
      }
    }
  },
  mounted () {
    this.url = `${this.$axios.defaults.headers['Access-Control-Allow-Origin'][0]}blog/${this.$route.params.title}`
    this.displayedBlog = this.blog
  },
  methods: {
    getTime (time) {
      return msToDate(time)
    },
    newComment (event) {
      let newComments
      if (this.displayedBlog.comments.comments) {
        newComments = [event, ...this.displayedBlog.comments.comments]
      } else {
        newComments = [event]
      }

      this.displayedBlog.comments = Object.assign(
        {},
        this.displayedBlog.comments,
        {
          comments: newComments
        }
      )
      this.displayedBlog.comments.count += 1
    },
    likeChange (event) {
      this.displayedBlog.likes = event
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
