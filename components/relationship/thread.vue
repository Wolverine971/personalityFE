<template>
  <div>
    <h2>Thread</h2>
    {{ thread.text }}
    <interact :post="thread" @emitComment="newComment($event)" />
  </div>
</template>

<script>

export default {
  name: 'Thread',
  components: {
    Interact: () => import('../shared/interact')
  },
  props: {
    thread: {
      type: Object,
      default () {
        return {}
      },
      required: false
    }
  },
  methods: {
    newComment (comment) {
      console.log(comment)
    }
  }

}
</script>

<style>

</style>
