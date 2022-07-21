<template>
  <v-card style="margin: 10px" flat>
    <h1>Share with others</h1>
    <share-buttons :question="question" :meta="meta" />
  </v-card>
</template>

<script>
export default {
  name: 'Share',
  components: {
    ShareButtons: () => import('../sharedButtons/shareButtons.vue')
  },
  props: {
    question: {
      type: String,
      required: true,
      default: null
    },
    meta: {
      type: Object,
      required: false,
      default: null
    }
  }
}
</script>
