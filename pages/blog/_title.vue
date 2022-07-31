<template>
  <div>
    <v-btn
      class="ma-2"
      color="primary"
      :to="{ path: '/blog', query: {} }"
      router
    >
      <v-icon> keyboard_backspace</v-icon>
      All Blogs
    </v-btn>
    <blog :blog="blog" />
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'BlogTitle',
  components: {
    Blog: () => import('@/components/blog/blog')
  },
  async asyncData ({ params, $axios, env }) {
    const title = params.title
      ? params.title.replace('/-/g', ' ')
      : params.title

    const url = `${env.ORIGIN}blog/${params.title}`
    const blog = await $axios
      .get(`${endpoints.getBlog}/${title}`)
      .then((resp) => {
        if (resp && resp.data) {
          return resp.data
        } else {
          throw new Error('No Blog')
        }
      })
      .catch((error) => {
        console.log(error)
      })
      const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: title,
      url: `https://9takes.com${title}`,
      description: blog.description,
      publisher: {
        '@type': 'Person',
        name: blog && blog.author ? `${blog.author.firstName} ${blog.author.lastName}` : 'Unknown'
      }
    }
    return { url, blog, structuredData }
  },
  data () {
    return {
      loading: false
    }
  },
  // jsonld () {
  //   return {
  //     '@context': 'https://schema.org',
  //     '@type': 'Blog',
  //     name: this.blog.title,
  //     url: `https://9takes.com${this.$route.params.title}`,
  //     description: this.blog.description,
  //     publisher: {
  //       '@type': 'Person',
  //       name: this.blog && this.blog.author ? `${this.blog.author.firstName} ${this.blog.author.lastName}` : 'Unknown'
  //     }
  //   }
  // },

  mounted () {
  },

  head () {
    const title = this.blog ? this.blog.title : 'Blog'
    const description = this.blog ? this.blog.description : 'Personality Blog'
    const href = this.url ? this.url : ''

    return {
      titleTemplate: title,
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          property: 'og:url',
          content: href
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
        },
        {
          name: 'twitter:site',
          content: '@9takesdotcom'
        }
      ],
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true
        },
        {type: 'application/ld+json', json: this.structuredData}
      ],
      link: [{ rel: 'canonical', href }]
    }
  }
}
</script>

<style>
</style>
