<template>
  <div>
    <v-btn class="ma-2" color="primary" :to="{ path: '/blog', query: {} }" router>
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
  data () {
    return {
      blog: null,
      loading: false
    }
  },

  mounted () {
    this.loading = true
    const title = this.$route.params.title
      ? this.$route.params.title.replaceAll('-', ' ')
      : this.$route.params.title
    this.$axios
      .get(`${endpoints.getBlog}/${title}`)
      .then((resp) => {
        if (resp && resp.data) {
          this.blog = resp.data
        } else {
          throw new Error('No Blog')
        }
        this.loading = false
      })
      .catch((error) => {
        this.$store.dispatch('toastError', error)
        this.loading = false
        this.$router.push({ path: '/blog' })
        this.$router.go(1)
      })
  },
  head () {
    return {
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true
        }
      ]
    }
  }
}
</script>

<style>
</style>
