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
      title: 'Bloggy Blog'
    }
  }
}
</script>

<style>
</style>
