<template>
  <div>
    <h1>All Questions</h1>
    <div>
      <v-col />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllQuestions',
  props: {
    questions: {
      type: Object,
      required: true,
      default: null
    }
  },
  data: () => ({

  }),
  computed: {}

}
</script>

<style>

</style>
