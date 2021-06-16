<template>
  <feed />
</template>

<script>
export default {
  name: 'All',

  components: {
    Feed: () => import('../../components/blog/Feed.vue')
  }
}
</script>

<style>
</style>
