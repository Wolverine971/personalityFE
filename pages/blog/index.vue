<template>
  <feed />
</template>

<script>
export default {
  name: 'All',

  components: {
    Feed: () => import('../../components/blog/Feed.vue')
  },
  head () {
    return {
      title: 'Bloggy Blog',
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js'
        }
      ]
    }
  }
}
</script>

<style>
</style>
