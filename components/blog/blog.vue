<template>
  <div>
    <v-card v-if="displayedBlog && !editing" class="blogDiv">
      <v-img
        :src="`https://personality-app.s3.amazonaws.com/${displayedBlog.img}`"
        height="450"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      />
      <v-card-title class="primary_v--text">
        {{ displayedBlog.title }}
        <v-btn
          v-if="
            user && displayedBlog.author && displayedBlog.author.id === user.id
          "
          color="secondary"
          elevation="1"
          fab
          small
          @click="editing = true"
        >
          <v-icon> edit </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle class="caption">
        Author:
        {{
          displayedBlog.author
            ? displayedBlog.author.firstName +
              ' ' +
              displayedBlog.author.lastName
            : ''
        }}
        <br>
        Date: {{ getTime(displayedBlog.dateCreated) }}
      </v-card-subtitle>
      <v-card-text v-html="blogContent" />
      <interact
        :post="displayedBlog"
        :type="'blog'"
        @emitComment="newComment($event)"
        @likeChange="likeChange"
      />

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
      <v-card-actions>
        <a
          id="b"
          :href="`https://twitter.com/intent/tweet?original_referer=${url}&amp;ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&amp;text=Checkout this article called '${displayedBlog.title}'&amp;url=${url} @9takesdotcom`"
          class="twitter twitter-share-button"
        ><i /><span id="l" class="label">Tweet</span></a>
      </v-card-actions>
    </v-card>
    <div v-else-if="displayedBlog" class="blogDiv">
      <v-card-actions>
        <v-btn
          v-if="
            user && displayedBlog.author && displayedBlog.author.id === user.id
          "
          color="secondary"
          elevation="1"
          @click="editing = false"
        >
          Cancel
        </v-btn>
      </v-card-actions>
      <create-blog
        :blog="displayedBlog"
        :label="'Edit Post'"
        @updated=";(displayedBlog = $event), (editing = false)"
      />
    </div>
  </div>
</template>

<script>
import { msToDate } from '../../utils'
// const marked = require('marked')
const marked = require('marked/lib/marked.cjs')
export default {
  name: 'Blog',
  components: {
    CreateBlog: () => import('../admin/createBlog.vue'),
    comments: () => import('../questions/comments.vue'),
    Interact: () => import('../shared/interact')
  },
  props: {
    blog: {
      type: Object,
      default: () => ({})
    }
  },
  // async asyncData ({ $content, params, error }) {
  //   const url = params.slug ? `/blog/${params.slug}` : 'index'
  //   const page = await $content(url)
  //     .fetch()
  //     .catch((err) => {
  //       console.log(err)
  //       error({ statusCode: 404, message: 'Page not found' })
  //     })

  //   return {
  //     url,
  //     page
  //   }
  // },
  data () {
    return {
      url: '',
      editing: false,
      displayedBlog: null
    }
  },
  computed: {
    user () {
      return this.$auth.user
    },
    blogContent () {
      // eslint-disable-next-line no-undef
      if (marked) {
        // eslint-disable-next-line no-undef
        return marked.parse(this.displayedBlog.body)
      } else {
        return ''
      }
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
    this.url = `${process.env.ORIGIN}blog/${this.$route.params.title}`
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
