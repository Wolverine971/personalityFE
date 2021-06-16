<template>
  <div v-if="blog" class="blogDiv">
    <h3 class="title font-weight-bold mb-2">
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
